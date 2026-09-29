/*
   ================================================================
   SmartSurround — MAIN SENSOR ESP32
   ================================================================

   Sensors:
   - BME680
   - PMS7003
   - NEO-8M GPS

   Local API:
   GET  /api/readings
   GET  /api/gps
   POST /camera-status

   Firebase:
   /sensors

   ================================================================
*/

#define ENABLE_DATABASE

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <ArduinoJson.h>
#include <TinyGPSPlus.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>

#include <WiFiClientSecure.h>
#include <FirebaseClient.h>

// ================================================================
// WIFI
// ================================================================

const char *ssid = "PHOENIX_2.4G";
const char *password = "akt@12345";

// ================================================================
// FIREBASE
// ================================================================

// Your Firebase Realtime Database URL
#define DATABASE_URL \
    "https://smartsurround-dc464-default-rtdb.asia-southeast1.firebasedatabase.app"

// NoAuth is used temporarily because your RTDB rules currently allow
// public read/write access until September 27, 2026.
//
// IMPORTANT:
// Before deploying the final system, we should secure the database
// rules and use proper authentication.

NoAuth no_auth;

FirebaseApp firebaseApp;

WiFiClientSecure firebaseSSL;

using AsyncClient = AsyncClientClass;

AsyncClient firebaseClient(firebaseSSL);

RealtimeDatabase Database;

unsigned long lastFirebaseUpload = 0;

// Upload every 5 seconds
const unsigned long FIREBASE_UPLOAD_INTERVAL = 5000;

// ================================================================
// BME680
// ================================================================

#define BME_SDA_PIN 22
#define BME_SCL_PIN 21

Adafruit_BME680 bme;

// ================================================================
// GPS NEO-8M
// ================================================================

// NEO-8M TX -> ESP32 GPIO16
// NEO-8M RX -> ESP32 GPIO17

#define GPS_RX_PIN 16
#define GPS_TX_PIN 17

#define GPS_BAUD 115200

HardwareSerial gpsSerial(2);
TinyGPSPlus gps;

// ================================================================
// PMS7003
// ================================================================

#define PMS_RX_PIN 26
#define PMS_TX_PIN 27
#define PMS_BAUD 9600

HardwareSerial pmsSerial(1);

// ================================================================
// SERVER
// ================================================================

WebServer server(80);

// ================================================================
// SENSOR DATA
// ================================================================

struct PmsData
{
    uint16_t pm1 = 0;
    uint16_t pm25 = 0;
    uint16_t pm10 = 0;
    bool valid = false;
};

PmsData pmsData;

// BME
float temperature = NAN;
float humidity = NAN;
float gasResistanceKOhm = NAN;

float iaqScore = NAN;
float co2Equivalent = NAN;
float vocEquivalent = NAN;

bool calibrating = true;

// ================================================================
// CAMERA STATUS
// ================================================================

String camIp = "";
unsigned long camLastSeen = 0;

const unsigned long CAMERA_TIMEOUT_MS = 15000;

// ================================================================
// TIMERS
// ================================================================

unsigned long bootTime = 0;

unsigned long lastBmeRead = 0;
unsigned long lastPmsRead = 0;

// ================================================================
// FIREBASE CALLBACK
// ================================================================

void firebaseCallback(AsyncResult &aResult)
{
    if (!aResult.isResult())
        return;

    if (aResult.isEvent())
    {
        Serial.printf(
            "[Firebase Event] %s\n",
            aResult.eventLog().message().c_str());
    }

    if (aResult.isDebug())
    {
        Serial.printf(
            "[Firebase Debug] %s\n",
            aResult.debug().c_str());
    }

    if (aResult.isError())
    {
        Serial.printf(
            "[Firebase ERROR] %s | code: %d\n",
            aResult.error().message().c_str(),
            aResult.error().code());
    }

    if (aResult.available())
    {
        Serial.printf(
            "[Firebase] %s\n",
            aResult.c_str());
    }
}

// ================================================================
// FIREBASE UPLOAD
// ================================================================

void uploadToFirebase()
{
    // Firebase must be ready
    if (!firebaseApp.ready())
        return;

    // Create JSON object
    object_t json;

    JsonWriter writer;

    object_t obj1;
    object_t obj2;
    object_t obj3;
    object_t obj4;
    object_t obj5;
    object_t obj6;
    object_t obj7;
    object_t obj8;
    object_t obj9;
    object_t obj10;

    // ------------------------------------------------------------
    // Temperature
    // ------------------------------------------------------------

    if (!isnan(temperature))
    {
        writer.create(
            obj1,
            "temperature",
            number_t(temperature, 2));
    }
    else
    {
        writer.create(
            obj1,
            "temperature",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // Humidity
    // ------------------------------------------------------------

    if (!isnan(humidity))
    {
        writer.create(
            obj2,
            "humidity",
            number_t(humidity, 2));
    }
    else
    {
        writer.create(
            obj2,
            "humidity",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // CO2 equivalent
    // ------------------------------------------------------------

    if (!isnan(co2Equivalent))
    {
        writer.create(
            obj3,
            "co2",
            number_t(co2Equivalent, 2));
    }
    else
    {
        writer.create(
            obj3,
            "co2",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // VOC equivalent
    // ------------------------------------------------------------

    if (!isnan(vocEquivalent))
    {
        writer.create(
            obj4,
            "voc",
            number_t(vocEquivalent, 2));
    }
    else
    {
        writer.create(
            obj4,
            "voc",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // PMS7003
    // ------------------------------------------------------------

    if (pmsData.valid)
    {
        writer.create(
            obj5,
            "pm1",
            pmsData.pm1);

        writer.create(
            obj6,
            "pm25",
            pmsData.pm25);

        writer.create(
            obj7,
            "pm10",
            pmsData.pm10);
    }
    else
    {
        writer.create(
            obj5,
            "pm1",
            object_t("null"));

        writer.create(
            obj6,
            "pm25",
            object_t("null"));

        writer.create(
            obj7,
            "pm10",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // IAQ
    // ------------------------------------------------------------

    if (!isnan(iaqScore))
    {
        writer.create(
            obj8,
            "iaq",
            number_t(iaqScore, 2));
    }
    else
    {
        writer.create(
            obj8,
            "iaq",
            object_t("null"));
    }

    // ------------------------------------------------------------
    // GPS
    // ------------------------------------------------------------

    object_t gpsObject;

    object_t gpsLat;
    object_t gpsLng;
    object_t gpsAlt;
    object_t gpsSpeed;
    object_t gpsCourse;
    object_t gpsSats;
    object_t gpsHdop;
    object_t gpsFix;
    object_t gpsTime;

    if (gps.location.isValid())
    {
        writer.create(
            gpsLat,
            "latitude",
            number_t(gps.location.lat(), 6));

        writer.create(
            gpsLng,
            "longitude",
            number_t(gps.location.lng(), 6));
    }
    else
    {
        writer.create(
            gpsLat,
            "latitude",
            object_t("null"));

        writer.create(
            gpsLng,
            "longitude",
            object_t("null"));
    }

    if (gps.altitude.isValid())
    {
        writer.create(
            gpsAlt,
            "altitude",
            number_t(gps.altitude.meters(), 2));
    }
    else
    {
        writer.create(
            gpsAlt,
            "altitude",
            object_t("null"));
    }

    if (gps.speed.isValid())
    {
        writer.create(
            gpsSpeed,
            "speed",
            number_t(gps.speed.kmph(), 2));
    }
    else
    {
        writer.create(
            gpsSpeed,
            "speed",
            object_t("null"));
    }

    // Course / heading in degrees
    if (gps.course.isValid())
    {
        writer.create(
            gpsCourse,
            "course",
            number_t(gps.course.deg(), 2));
    }
    else
    {
        writer.create(
            gpsCourse,
            "course",
            object_t("null"));
    }

    if (gps.satellites.isValid())
    {
        writer.create(
            gpsSats,
            "satellites",
            gps.satellites.value());
    }
    else
    {
        writer.create(
            gpsSats,
            "satellites",
            object_t("null"));
    }

    if (gps.hdop.isValid())
    {
        writer.create(
            gpsHdop,
            "hdop",
            number_t(gps.hdop.hdop(), 2));
    }
    else
    {
        writer.create(
            gpsHdop,
            "hdop",
            object_t("null"));
    }

    String fixStatus;

    if (gps.location.isValid())
    {
        if (
            gps.satellites.isValid() &&
            gps.satellites.value() >= 4)
        {
            fixStatus = "3D Fix";
        }
        else
        {
            fixStatus = "2D Fix";
        }
    }
    else
    {
        fixStatus = "No Fix";
    }

    writer.create(
        gpsFix,
        "fix",
        string_t(fixStatus));

    // UTC time from NEO-8M GPS
    if (gps.time.isValid())
    {
        char timeBuffer[20];

        snprintf(
            timeBuffer,
            sizeof(timeBuffer),
            "%02d:%02d:%02d UTC",
            gps.time.hour(),
            gps.time.minute(),
            gps.time.second());

        writer.create(
            gpsTime,
            "time",
            string_t(timeBuffer));
    }
    else
    {
        writer.create(
            gpsTime,
            "time",
            object_t("null"));
    }

    writer.join(
        gpsObject,
        9,
        gpsLat,
        gpsLng,
        gpsAlt,
        gpsSpeed,
        gpsCourse,
        gpsSats,
        gpsHdop,
        gpsFix,
        gpsTime);

    // ------------------------------------------------------------
    // Add GPS object
    // ------------------------------------------------------------

    writer.create(
        obj9,
        "gps",
        gpsObject);

    // ------------------------------------------------------------
    // Timestamp
    // ------------------------------------------------------------

    writer.create(
        obj10,
        "updatedAt",
        number_t((double)millis(), 0));

    // ------------------------------------------------------------
    // Combine everything
    // ------------------------------------------------------------

    writer.join(
        json,
        10,
        obj1,
        obj2,
        obj3,
        obj4,
        obj5,
        obj6,
        obj7,
        obj8,
        obj9,
        obj10);

    // ------------------------------------------------------------
    // Send to Firebase
    // ------------------------------------------------------------

    Database.set<object_t>(
        firebaseClient,
        "/sensors",
        json,
        firebaseCallback,
        "sensorUpload");

    Serial.println("Firebase sensor data upload requested.");
}

// ================================================================
// CORS
// ================================================================

void sendCORS()
{
    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*");

    server.sendHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS");

    server.sendHeader(
        "Access-Control-Allow-Headers",
        "Content-Type");
}

// ================================================================
// PMS7003
// ================================================================

void readPMS7003()
{
    static uint8_t buffer[32];
    static uint8_t index = 0;

    while (pmsSerial.available())
    {
        uint8_t b = pmsSerial.read();

        if (index == 0)
        {
            if (b != 0x42)
                continue;

            buffer[index++] = b;
            continue;
        }

        if (index == 1)
        {
            if (b != 0x4D)
            {
                index = 0;

                if (b == 0x42)
                {
                    buffer[index++] = b;
                }

                continue;
            }

            buffer[index++] = b;
            continue;
        }

        buffer[index++] = b;

        if (index >= 32)
        {
            index = 0;

            uint16_t frameLength =
                ((uint16_t)buffer[2] << 8) |
                buffer[3];

            if (frameLength != 28)
            {
                continue;
            }

            uint16_t checksum = 0;

            for (int i = 0; i < 30; i++)
            {
                checksum += buffer[i];
            }

            uint16_t receivedChecksum =
                ((uint16_t)buffer[30] << 8) |
                buffer[31];

            if (checksum != receivedChecksum)
            {
                continue;
            }

            pmsData.pm1 =
                ((uint16_t)buffer[10] << 8) |
                buffer[11];

            pmsData.pm25 =
                ((uint16_t)buffer[12] << 8) |
                buffer[13];

            pmsData.pm10 =
                ((uint16_t)buffer[14] << 8) |
                buffer[15];

            pmsData.valid = true;

            lastPmsRead = millis();
        }
    }
}

// ================================================================
// BME680
// ================================================================

void readBME680()
{
    if (!bme.performReading())
    {
        return;
    }

    temperature = bme.temperature;

    humidity = bme.humidity;

    gasResistanceKOhm =
        bme.gas_resistance / 1000.0;

    float g =
        constrain(
            gasResistanceKOhm,
            5.0,
            250.0);

    float score =
        map(
            g * 10,
            50,
            2500,
            500,
            20);

    iaqScore =
        constrain(
            score,
            0,
            500);

    co2Equivalent =
        400 +
        (500 - iaqScore) * 3.2;

    vocEquivalent =
        (500 - iaqScore) /
        500.0 *
        2.5;

    calibrating =
        (millis() - bootTime) <
        (5UL * 60UL * 1000UL);
}

// ================================================================
// GPS
// ================================================================

void readGPS()
{
    while (gpsSerial.available())
    {
        gps.encode(
            gpsSerial.read());
    }
}

// ================================================================
// PM STATUS
// ================================================================

String pm25Status(uint16_t pm25)
{
    if (pm25 <= 12)
        return "Good";

    if (pm25 <= 35)
        return "Moderate";

    if (pm25 <= 55)
        return "Unhealthy for Sensitive Groups";

    if (pm25 <= 150)
        return "Unhealthy";

    return "Hazardous";
}

// ================================================================
// GET /api/readings
// ================================================================

void handleReadings()
{
    sendCORS();

    StaticJsonDocument<768> doc;

    // PMS
    if (pmsData.valid)
    {
        doc["pm1"] = pmsData.pm1;
        doc["pm25"] = pmsData.pm25;
        doc["pm10"] = pmsData.pm10;

        doc["status"] =
            pm25Status(
                pmsData.pm25);
    }
    else
    {
        doc["pm1"] = nullptr;
        doc["pm25"] = nullptr;
        doc["pm10"] = nullptr;
        doc["status"] = nullptr;
    }

    // BME
    if (!isnan(temperature))
        doc["temperature"] = temperature;
    else
        doc["temperature"] = nullptr;

    if (!isnan(humidity))
        doc["humidity"] = humidity;
    else
        doc["humidity"] = nullptr;

    if (!isnan(iaqScore))
        doc["iaq"] = iaqScore;
    else
        doc["iaq"] = nullptr;

    if (!isnan(co2Equivalent))
        doc["co2"] = co2Equivalent;
    else
        doc["co2"] = nullptr;

    if (!isnan(vocEquivalent))
        doc["voc"] = vocEquivalent;
    else
        doc["voc"] = nullptr;

    doc["calibrating"] = calibrating;

    doc["iaqAccuracyText"] =
        calibrating
            ? "Calibrating"
            : "Calibrated";

    // Main ESP32 information
    doc["ip"] =
        WiFi.localIP().toString();

    doc["uptime"] =
        (unsigned long)((millis() - bootTime) / 1000);

    // Camera
    bool cameraOnline =
        camIp.length() > 0 &&
        (millis() - camLastSeen) <
            CAMERA_TIMEOUT_MS;

    if (camIp.length() > 0)
        doc["camIp"] = camIp;
    else
        doc["camIp"] = nullptr;

    doc["cameraOnline"] =
        cameraOnline;

    String output;

    serializeJson(
        doc,
        output);

    server.send(
        200,
        "application/json",
        output);
}

// ================================================================
// GET /api/gps
// ================================================================

void handleGPS()
{
    sendCORS();

    StaticJsonDocument<512> doc;

    // Location
    if (gps.location.isValid())
    {
        doc["lat"] =
            gps.location.lat();

        doc["lng"] =
            gps.location.lng();
    }
    else
    {
        doc["lat"] = nullptr;
        doc["lng"] = nullptr;
    }

    // Altitude
    if (gps.altitude.isValid())
    {
        doc["alt"] =
            gps.altitude.meters();
    }
    else
    {
        doc["alt"] = nullptr;
    }

    // Speed
    if (gps.speed.isValid())
    {
        doc["speed"] =
            gps.speed.kmph();
    }
    else
    {
        doc["speed"] = nullptr;
    }

    // Course
    if (gps.course.isValid())
    {
        doc["course"] =
            gps.course.deg();
    }
    else
    {
        doc["course"] = nullptr;
    }

    // Satellites
    if (gps.satellites.isValid())
    {
        doc["sats"] =
            gps.satellites.value();
    }
    else
    {
        doc["sats"] = nullptr;
    }

    // HDOP
    if (gps.hdop.isValid())
    {
        doc["hdop"] =
            gps.hdop.hdop();
    }
    else
    {
        doc["hdop"] = nullptr;
    }

    // FIX
    if (gps.location.isValid())
    {
        if (
            gps.satellites.isValid() &&
            gps.satellites.value() >= 4)
        {
            doc["fix"] = "3D Fix";
        }
        else
        {
            doc["fix"] = "2D Fix";
        }
    }
    else
    {
        doc["fix"] = "No Fix";
    }

    // GPS TIME
    if (gps.time.isValid())
    {
        char timeBuffer[20];

        snprintf(
            timeBuffer,
            sizeof(timeBuffer),
            "%02d:%02d:%02d UTC",
            gps.time.hour(),
            gps.time.minute(),
            gps.time.second());

        doc["time"] = timeBuffer;
    }
    else
    {
        doc["time"] = nullptr;
    }

    // Debug
    doc["charsProcessed"] =
        gps.charsProcessed();

    doc["sentencesWithFix"] =
        gps.sentencesWithFix();

    doc["failedChecksum"] =
        gps.failedChecksum();

    String output;

    serializeJson(
        doc,
        output);

    server.send(
        200,
        "application/json",
        output);
}

// ================================================================
// POST /camera-status
// ================================================================

void handleCameraStatus()
{
    sendCORS();

    if (!server.hasArg("plain"))
    {
        server.send(
            400,
            "application/json",
            "{\"ok\":false,\"error\":\"No JSON body\"}");

        return;
    }

    StaticJsonDocument<128> doc;

    DeserializationError error =
        deserializeJson(
            doc,
            server.arg("plain"));

    if (error)
    {
        server.send(
            400,
            "application/json",
            "{\"ok\":false,\"error\":\"Invalid JSON\"}");

        return;
    }

    if (!doc.containsKey("ip"))
    {
        server.send(
            400,
            "application/json",
            "{\"ok\":false,\"error\":\"Missing IP\"}");

        return;
    }

    camIp =
        doc["ip"].as<String>();

    camLastSeen =
        millis();

    Serial.print(
        "Camera heartbeat: ");

    Serial.println(
        camIp);

    server.send(
        200,
        "application/json",
        "{\"ok\":true}");
}

// ================================================================
// OPTIONS
// ================================================================

void handleOptions()
{
    sendCORS();

    server.send(
        204);
}

// ================================================================
// SETUP
// ================================================================

void setup()
{
    Serial.begin(115200);

    delay(1000);

    bootTime = millis();

    Serial.println();
    Serial.println(
        "========================================");

    Serial.println(
        " SmartSurround MAIN ESP32");

    Serial.println(
        "========================================");

    // ============================================================
    // BME680
    // ============================================================

    Wire.begin(
        BME_SDA_PIN,
        BME_SCL_PIN);

    if (!bme.begin())
    {
        Serial.println(
            "ERROR: BME680 not found!");
    }
    else
    {
        Serial.println(
            "BME680 OK");

        bme.setTemperatureOversampling(
            BME680_OS_8X);

        bme.setHumidityOversampling(
            BME680_OS_2X);

        bme.setPressureOversampling(
            BME680_OS_4X);

        bme.setIIRFilterSize(
            BME680_FILTER_SIZE_3);

        bme.setGasHeater(
            320,
            150);
    }

    // ============================================================
    // GPS
    // ============================================================

    gpsSerial.begin(
        GPS_BAUD,
        SERIAL_8N1,
        GPS_RX_PIN,
        GPS_TX_PIN);

    Serial.println(
        "GPS UART2 started");

    Serial.println(
        "GPS RX = GPIO16");

    Serial.println(
        "GPS TX = GPIO17");

    Serial.println(
        "GPS BAUD = 115200");

    // ============================================================
    // PMS
    // ============================================================

    pmsSerial.begin(
        PMS_BAUD,
        SERIAL_8N1,
        PMS_RX_PIN,
        PMS_TX_PIN);

    Serial.println(
        "PMS7003 UART1 started");

    // ============================================================
    // WIFI
    // ============================================================

    WiFi.mode(WIFI_STA);

    WiFi.begin(
        ssid,
        password);

    Serial.print(
        "Connecting WiFi");

    while (
        WiFi.status() != WL_CONNECTED)
    {
        delay(500);

        Serial.print(".");
    }

    Serial.println();

    Serial.println(
        "WiFi connected");

    Serial.print(
        "Main ESP32 IP: ");

    Serial.println(
        WiFi.localIP());

    // ============================================================
    // FIREBASE
    // ============================================================

    Serial.println();
    Serial.println(
        "Initializing Firebase...");

    // Temporary: skip certificate verification
    firebaseSSL.setInsecure();

    firebaseSSL.setInsecure();

    firebaseSSL.setHandshakeTimeout(10);

    initializeApp(
        firebaseClient,
        firebaseApp,
        getAuth(no_auth),
        firebaseCallback,
        "firebaseAuth");

    firebaseApp.getApp<RealtimeDatabase>(
        Database);

    Database.url(
        DATABASE_URL);

    Serial.println(
        "Firebase configured.");

    // ============================================================
    // ROUTES
    // ============================================================

    server.on(
        "/api/readings",
        HTTP_GET,
        handleReadings);

    server.on(
        "/api/readings",
        HTTP_OPTIONS,
        handleOptions);

    server.on(
        "/api/gps",
        HTTP_GET,
        handleGPS);

    server.on(
        "/api/gps",
        HTTP_OPTIONS,
        handleOptions);

    server.on(
        "/camera-status",
        HTTP_POST,
        handleCameraStatus);

    server.on(
        "/camera-status",
        HTTP_OPTIONS,
        handleOptions);

    server.begin();

    Serial.println(
        "HTTP server started");

    Serial.println();
    Serial.println(
        "========================================");
}

// ================================================================
// LOOP
// ================================================================

void loop()
{
    // Firebase background processing
    firebaseApp.loop();

    // Keep HTTP responsive
    server.handleClient();

    // GPS must be decoded continuously
    readGPS();

    // PMS
    readPMS7003();

    // BME
    if (
        millis() - lastBmeRead >=
        2000)
    {
        readBME680();

        lastBmeRead =
            millis();
    }

    // PMS timeout
    if (
        pmsData.valid &&
        millis() - lastPmsRead >
            15000)
    {
        pmsData.valid = false;
    }

    // ============================================================
    // FIREBASE UPLOAD
    // ============================================================

    if (
        millis() - lastFirebaseUpload >=
        FIREBASE_UPLOAD_INTERVAL)
    {
        lastFirebaseUpload =
            millis();

        uploadToFirebase();
    }
}