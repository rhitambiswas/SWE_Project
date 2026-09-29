#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>

// =====================================================
// WIFI
// =====================================================

const char* ssid = "PHOENIX_2.4G";
const char* password = "akt@12345";

// =====================================================
// MAIN ESP32
// =====================================================

const char* MAIN_ESP32_IP = "192.168.1.104";

// =====================================================
// SMARTSURROUND AI SERVER
// =====================================================

const char* AI_SERVER_HOST = "192.168.1.108";
const uint16_t AI_SERVER_PORT = 5000;
const char* AI_SERVER_PATH = "/api/camera/analyze";
const char* CAMERA_API_KEY = "";

// =====================================================
// HEARTBEAT
// =====================================================

#define HEARTBEAT_INTERVAL 5000

TaskHandle_t heartbeatTaskHandle = NULL;

// =====================================================
// WEB SERVER
// =====================================================

WebServer server(80);

// =====================================================
// AI THINKER ESP32-CAM PINS
// =====================================================

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1

#define XCLK_GPIO_NUM      0

#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36

#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5

#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// =====================================================
// CORS
// =====================================================

void sendCORS()
{
    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.sendHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    server.sendHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );
}

// =====================================================
// CAMERA INITIALIZATION
// =====================================================

bool initCamera()
{
    camera_config_t config;

    config.ledc_channel =
        LEDC_CHANNEL_0;

    config.ledc_timer =
        LEDC_TIMER_0;

    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;

    config.pin_xclk =
        XCLK_GPIO_NUM;

    config.pin_pclk =
        PCLK_GPIO_NUM;

    config.pin_vsync =
        VSYNC_GPIO_NUM;

    config.pin_href =
        HREF_GPIO_NUM;

    config.pin_sccb_sda =
        SIOD_GPIO_NUM;

    config.pin_sccb_scl =
        SIOC_GPIO_NUM;

    config.pin_pwdn =
        PWDN_GPIO_NUM;

    config.pin_reset =
        RESET_GPIO_NUM;

    config.xclk_freq_hz =
        20000000;

    config.pixel_format =
        PIXFORMAT_JPEG;

    // =================================================
    // PSRAM
    // =================================================

    if (psramFound())
    {
        Serial.println(
            "PSRAM: OK"
        );

        config.frame_size =
            FRAMESIZE_VGA;

        config.jpeg_quality =
            12;

        config.fb_count =
            2;

        config.fb_location =
            CAMERA_FB_IN_PSRAM;

        config.grab_mode =
            CAMERA_GRAB_LATEST;
    }
    else
    {
        Serial.println(
            "PSRAM: NOT FOUND"
        );

        config.frame_size =
            FRAMESIZE_QVGA;

        config.jpeg_quality =
            15;

        config.fb_count =
            1;

        config.fb_location =
            CAMERA_FB_IN_DRAM;

        config.grab_mode =
            CAMERA_GRAB_WHEN_EMPTY;
    }

    // =================================================
    // CAMERA INIT
    // =================================================

    esp_err_t result =
        esp_camera_init(
            &config
        );

    if (result != ESP_OK)
    {
        Serial.print(
            "CAMERA INIT FAILED: 0x"
        );

        Serial.println(
            result,
            HEX
        );

        return false;
    }

    Serial.println(
        "CAMERA INITIALIZED"
    );

    // =================================================
    // COLOR CONFIGURATION
    // =================================================

    sensor_t* sensor =
        esp_camera_sensor_get();

    if (sensor != nullptr)
    {
        sensor->set_brightness(
            sensor,
            0
        );

        sensor->set_contrast(
            sensor,
            0
        );

        sensor->set_saturation(
            sensor,
            1
        );

        sensor->set_whitebal(
            sensor,
            1
        );

        sensor->set_awb_gain(
            sensor,
            1
        );

        sensor->set_exposure_ctrl(
            sensor,
            1
        );

        sensor->set_gain_ctrl(
            sensor,
            1
        );

        sensor->set_aec2(
            sensor,
            1
        );

        sensor->set_bpc(
            sensor,
            1
        );

        sensor->set_wpc(
            sensor,
            1
        );

        sensor->set_raw_gma(
            sensor,
            1
        );

        sensor->set_lenc(
            sensor,
            1
        );

        Serial.println(
            "COLOR SENSOR SETTINGS OK"
        );
    }

    return true;
}

// =====================================================
// ROOT PAGE
// =====================================================

void handleRoot()
{
    sendCORS();

    String html = R"rawliteral(
<!DOCTYPE html>

<html>

<head>

<meta name="viewport"
content="width=device-width, initial-scale=1">

<title>SmartSurround Camera</title>

<style>

body {
    background:#111;
    color:white;
    text-align:center;
    font-family:Arial;
}

img {
    width:95%;
    max-width:800px;
    border-radius:10px;
}

</style>

</head>

<body>

<h1>SmartSurround Camera</h1>

<p>Continuous Live Color Video</p>

<img src="/stream">

</body>

</html>
)rawliteral";

    server.send(
        200,
        "text/html",
        html
    );
}

// =====================================================
// STREAM
// =====================================================

void handleStream()
{
    WiFiClient client =
        server.client();

    // Important for continuous streaming
    client.setNoDelay(true);

    client.setTimeout(2000);

    client.print(
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: multipart/x-mixed-replace; boundary=frame\r\n"
        "Cache-Control: no-cache, no-store, must-revalidate\r\n"
        "Pragma: no-cache\r\n"
        "Expires: 0\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Connection: close\r\n"
        "\r\n"
    );

    Serial.println(
        "================================"
    );

    Serial.println(
        "STREAM STARTED"
    );

    Serial.print(
        "Client: "
    );

    Serial.println(
        client.remoteIP()
    );

    unsigned long frameCount = 0;

    while (
        client.connected()
    )
    {
        // =============================================
        // Capture
        // =============================================

        camera_fb_t* fb =
            esp_camera_fb_get();

        if (!fb)
        {
            Serial.println(
                "Camera frame failed"
            );

            delay(100);

            continue;
        }

        // =============================================
        // Send MJPEG frame
        // =============================================

        client.print(
            "--frame\r\n"
        );

        client.print(
            "Content-Type: image/jpeg\r\n"
        );

        client.print(
            "Content-Length: "
        );

        client.print(
            fb->len
        );

        client.print(
            "\r\n\r\n"
        );

        size_t written =
            client.write(
                fb->buf,
                fb->len
            );

        client.print(
            "\r\n"
        );

        // =============================================
        // Return frame buffer
        // =============================================

        esp_camera_fb_return(
            fb
        );

        frameCount++;

        // =============================================
        // Check connection
        // =============================================

        if (!client.connected())
        {
            break;
        }

        // =============================================
        // Allow background tasks
        // =============================================

        delay(30);

        yield();

        // Debug every 100 frames
        if (
            frameCount % 100 == 0
        )
        {
            Serial.print(
                "Frames: "
            );

            Serial.print(
                frameCount
            );

            Serial.print(
                " | Heap: "
            );

            Serial.println(
                ESP.getFreeHeap()
            );
        }
    }

    Serial.println(
        "STREAM STOPPED"
    );

    Serial.print(
        "Total frames: "
    );

    Serial.println(
        frameCount
    );
}

// =====================================================
// CAPTURE
// =====================================================

void handleCapture()
{
    sendCORS();

    camera_fb_t* fb =
        esp_camera_fb_get();

    if (!fb)
    {
        server.send(
            503,
            "text/plain",
            "Camera capture failed"
        );

        return;
    }

    server.setContentLength(
        fb->len
    );

    server.send(
        200,
        "image/jpeg",
        ""
    );

    WiFiClient client =
        server.client();

    client.write(
        fb->buf,
        fb->len
    );

    esp_camera_fb_return(
        fb
    );
}

// =====================================================
// SEND CAPTURED JPEG TO SMARTSURROUND AI
// =====================================================

bool sendFrameToAI(camera_fb_t* fb, String& response)
{
    if (WiFi.status() != WL_CONNECTED)
    {
        response = "{\"ok\":false,\"message\":\"WiFi disconnected\"}";
        return false;
    }

    WiFiClient client;

    Serial.println("Connecting to SmartSurround AI...");
    Serial.print("AI server: http://");
    Serial.print(AI_SERVER_HOST);
    Serial.print(":");
    Serial.print(AI_SERVER_PORT);
    Serial.println(AI_SERVER_PATH);

    if (!client.connect(AI_SERVER_HOST, AI_SERVER_PORT))
    {
        Serial.println("AI SERVER CONNECTION FAILED");
        response = "{\"ok\":false,\"message\":\"Cannot connect to AI server\"}";
        return false;
    }

    client.setTimeout(30000);

    String boundary = "----SmartSurroundESP32Boundary";
    String head = "--" + boundary + "\r\n" "Content-Disposition: form-data; name=\"image\"; filename=\"road.jpg\"\r\n" "Content-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--" + boundary + "--\r\n";
    size_t contentLength = head.length() + fb->len + tail.length();

    client.print("POST "); client.print(AI_SERVER_PATH); client.println(" HTTP/1.1");
    client.print("Host: "); client.print(AI_SERVER_HOST); client.print(":"); client.println(AI_SERVER_PORT);
    client.println("Connection: close");
    client.print("Content-Type: multipart/form-data; boundary="); client.println(boundary);
    client.print("Content-Length: "); client.println(contentLength);
    if (strlen(CAMERA_API_KEY) > 0) { client.print("X-Camera-Key: "); client.println(CAMERA_API_KEY); }
    client.println();
    client.print(head);

    size_t sent = 0;
    while (sent < fb->len)
    {
        size_t chunk = fb->len - sent;
        if (chunk > 4096) chunk = 4096;
        size_t written = client.write(fb->buf + sent, chunk);
        if (written == 0)
        {
            client.stop();
            response = "{\"ok\":false,\"message\":\"Image upload failed\"}";
            return false;
        }
        sent += written;
        yield();
    }

    client.print(tail);
    Serial.println("Image sent. Waiting for AI response...");

    String statusLine = client.readStringUntil('\n');
    statusLine.trim();
    Serial.print("HTTP: "); Serial.println(statusLine);

    while (client.connected())
    {
        String line = client.readStringUntil('\n');
        if (line == "\r" || line.length() == 0) break;
    }

    response = "";
    unsigned long start = millis();
    while (client.connected() || client.available())
    {
        while (client.available()) { response += (char)client.read(); start = millis(); }
        if (millis() - start > 30000) break;
        delay(1);
    }
    client.stop();
    Serial.println("AI RESPONSE:"); Serial.println(response);
    return true;
}

// =====================================================
// CAPTURE + AI ANALYSIS
// =====================================================

void handleAnalyze()
{
    sendCORS();
    Serial.println();
    Serial.println("========================================");
    Serial.println(" AI ROAD ANALYSIS REQUEST");
    Serial.println("========================================");

    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb)
    {
        server.send(503, "application/json", "{\"ok\":false,\"message\":\"Camera capture failed\"}");
        return;
    }

    Serial.print("Captured JPEG: "); Serial.print(fb->len); Serial.println(" bytes");
    String response;
    bool success = sendFrameToAI(fb, response);
    esp_camera_fb_return(fb);

    server.send(success ? 200 : 502, "application/json", response);
}


// =====================================================
// CAMERA STATUS
// =====================================================

void handleStatus()
{
    sendCORS();

    String json = "{";

    json +=
        "\"status\":\"online\",";

    json +=
        "\"ip\":\"";

    json +=
        WiFi.localIP().toString();

    json +=
        "\",";

    json +=
        "\"rssi\":";

    json +=
        WiFi.RSSI();

    json +=
        ",";

    json +=
        "\"heap\":";

    json +=
        ESP.getFreeHeap();

    json +=
        "}";

    server.send(
        200,
        "application/json",
        json
    );
}

// =====================================================
// HEARTBEAT FUNCTION
// =====================================================

void sendHeartbeat()
{
    if (
        WiFi.status() != WL_CONNECTED
    )
    {
        Serial.println(
            "Heartbeat: WiFi disconnected"
        );

        return;
    }

    HTTPClient http;

    String url =
        String("http://") +
        MAIN_ESP32_IP +
        "/camera-status";

    http.begin(
        url
    );

    http.setTimeout(
        2000
    );

    http.addHeader(
        "Content-Type",
        "application/json"
    );

    String body =
        "{\"ip\":\"" +
        WiFi.localIP().toString() +
        "\"}";

    int code =
        http.POST(
            body
        );

    if (code > 0)
    {
        Serial.print(
            "Heartbeat -> Main ESP32: HTTP "
        );

        Serial.println(
            code
        );
    }
    else
    {
        Serial.print(
            "Heartbeat FAILED: "
        );

        Serial.println(
            http.errorToString(
                code
            )
        );
    }

    http.end();
}

// =====================================================
// HEARTBEAT TASK
// =====================================================
//
// This runs independently from the normal Arduino loop.
// Therefore heartbeat continues while /stream is blocking.
//

void heartbeatTask(
    void* parameter
)
{
    Serial.println(
        "Heartbeat task started"
    );

    while (true)
    {
        sendHeartbeat();

        vTaskDelay(
            pdMS_TO_TICKS(
                HEARTBEAT_INTERVAL
            )
        );
    }
}

// =====================================================
// SETUP
// =====================================================

void setup()
{
    Serial.begin(
        115200
    );

    delay(2000);

    Serial.println();
    Serial.println(
        "========================================"
    );

    Serial.println(
        " SmartSurround ESP32-CAM"
    );

    Serial.println(
        " CONTINUOUS COLOR STREAM"
    );

    Serial.println(
        "========================================"
    );

    // =================================================
    // CAMERA
    // =================================================

    if (!initCamera())
    {
        Serial.println(
            "CAMERA FAILED"
        );

        while (true)
        {
            delay(1000);
        }
    }

    // =================================================
    // WIFI
    // =================================================

    WiFi.mode(
        WIFI_STA
    );

    // Disable WiFi sleep
    WiFi.setSleep(
        false
    );

    WiFi.begin(
        ssid,
        password
    );

    Serial.print(
        "Connecting WiFi"
    );

    while (
        WiFi.status() != WL_CONNECTED
    )
    {
        delay(500);

        Serial.print(
            "."
        );
    }

    Serial.println();

    Serial.println(
        "WIFI CONNECTED"
    );

    // =================================================
    // IP
    // =================================================

    Serial.print(
        "Camera IP: "
    );

    Serial.println(
        WiFi.localIP()
    );

    Serial.print(
        "Stream: http://"
    );

    Serial.print(
        WiFi.localIP()
    );

    Serial.println(
        "/stream"
    );

    Serial.print(
        "Capture: http://"
    );

    Serial.print(
        WiFi.localIP()
    );

    Serial.println(
        "/capture"
    );

    Serial.print(
        "Analyze: http://"
    );

    Serial.print(
        WiFi.localIP()
    );

    Serial.println(
        "/analyze"
    );

    Serial.print(
        "Status: http://"
    );

    Serial.print(
        WiFi.localIP()
    );

    Serial.println(
        "/status"
    );

    // =================================================
    // ROUTES
    // =================================================

    server.on(
        "/",
        HTTP_GET,
        handleRoot
    );

    server.on(
        "/stream",
        HTTP_GET,
        handleStream
    );

    server.on(
        "/capture",
        HTTP_GET,
        handleCapture
    );

    server.on(
        "/analyze",
        HTTP_GET,
        handleAnalyze
    );

    server.on(
        "/status",
        HTTP_GET,
        handleStatus
    );

    // =================================================
    // SERVER
    // =================================================

    server.begin();

    Serial.println(
        "WEB SERVER STARTED"
    );

    // =================================================
    // START HEARTBEAT TASK
    // =================================================

    xTaskCreatePinnedToCore(
        heartbeatTask,
        "HeartbeatTask",
        8192,
        NULL,
        1,
        &heartbeatTaskHandle,
        0
    );

    Serial.println(
        "HEARTBEAT TASK STARTED"
    );

    Serial.println();
    Serial.println(
        "========================================"
    );

    Serial.println(
        " CAMERA READY"
    );

    Serial.println(
        " Continuous streaming enabled"
    );

    Serial.println(
        "========================================"
    );
}

// =====================================================
// LOOP
// =====================================================

void loop()
{
    server.handleClient();

    delay(1);

    yield();
}