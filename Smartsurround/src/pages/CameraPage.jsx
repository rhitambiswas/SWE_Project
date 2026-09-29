import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import StatTile from "../components/StatTile.jsx";

export default function CameraPage() {
  const CAMERA_IP = "192.168.1.103";

  const [frameUrl, setFrameUrl] = React.useState(
    `http://${CAMERA_IP}/capture?t=${Date.now()}`
  );

  const [cameraRunning, setCameraRunning] =
    React.useState(true);

  const [analysis, setAnalysis] =
    React.useState(null);

  const [analyzing, setAnalyzing] =
    React.useState(false);

  const [error, setError] =
    React.useState("");

  const frameTimer =
    React.useRef(null);


  // =========================================================
  // LIVE CAMERA
  // =========================================================

  React.useEffect(() => {

    if (!cameraRunning || analyzing) {
      return;
    }

    const updateFrame = () => {

      setFrameUrl(
        `http://${CAMERA_IP}/capture?t=${Date.now()}`
      );

    };

    frameTimer.current =
      setInterval(updateFrame, 250);

    return () => {

      if (frameTimer.current) {

        clearInterval(
          frameTimer.current
        );

        frameTimer.current = null;
      }

    };

  }, [cameraRunning, analyzing]);


  // =========================================================
  // CAPTURE + AI ANALYSIS
  // =========================================================

  const analyzeRoad = async () => {

    if (analyzing) {
      return;
    }

    console.log(
      "Stopping live camera frames..."
    );

    setAnalyzing(true);
    setError("");
    setAnalysis(null);

    setCameraRunning(false);

    if (frameTimer.current) {

      clearInterval(
        frameTimer.current
      );

      frameTimer.current = null;
    }


    try {

      /*
       * Wait for the last /capture request
       * to finish before calling /analyze.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );


      console.log(
        "Requesting AI analysis..."
      );


      const controller =
        new AbortController();


      const timeoutId =
        setTimeout(() => {

          controller.abort();

        }, 60000);


      const response =
        await fetch(
          `http://${CAMERA_IP}/analyze`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );


      clearTimeout(timeoutId);


      console.log(
        "AI HTTP status:",
        response.status
      );


      const data =
        await response.json();


      console.log(
        "AI RESULT:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data.message ||
          `AI server returned HTTP ${response.status}`
        );

      }


      if (!data.ok) {

        throw new Error(
          data.message ||
          "AI analysis failed."
        );

      }


      /*
       * IMPORTANT:
       * The AI result is now stored in React state.
       */
      setAnalysis(data);


    } catch (err) {

      console.error(
        "AI analysis error:",
        err
      );


      if (
        err.name ===
        "AbortError"
      ) {

        setError(
          "AI analysis timed out. Check ESP32-CAM and Flask server."
        );

      } else {

        setError(
          err.message ||
          "Unable to analyze the road."
        );

      }

    } finally {

      /*
       * Wait a little before restarting
       * the camera.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 500)
      );


      setFrameUrl(
        `http://${CAMERA_IP}/capture?t=${Date.now()}`
      );


      setCameraRunning(true);
      setAnalyzing(false);


      console.log(
        "Live camera restarted."
      );

    }

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="page-block">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-heading">

        <div>

          <div className="small-label">
            AI VISION
          </div>

          <h1>
            Live Camera Feed
          </h1>

          <p>
            Real-time road monitoring and
            AI analysis using ESP32-CAM.
          </p>

        </div>


        <div className="dashboard-live">

          <span></span>

          {analyzing
            ? "AI ANALYZING"
            : cameraRunning
              ? "ESP32 LIVE"
              : "CAMERA"}

        </div>

      </div>



      {/* =====================================================
          CAMERA
      ===================================================== */}

      <div className="camera-card">

        {cameraRunning ? (

          <img
            src={frameUrl}
            alt="ESP32-CAM live feed"
            className="camera-stream"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "400px",
              objectFit: "contain",
              background: "#080808",
              borderRadius: "16px",
              display: "block",
            }}
          />

        ) : (

          <div
            className="camera-placeholder"
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <Camera size={35} />

            <h4>

              {analyzing
                ? "Analyzing road..."
                : "Camera paused"}

            </h4>

            <p>

              {analyzing
                ? "The ESP32-CAM image is being processed by the AI model."
                : "Camera is preparing..."}

            </p>

          </div>

        )}


        <div className="camera-overlay-top">

          <span className="rec-dot"></span>

          {analyzing
            ? "ANALYZING"
            : cameraRunning
              ? "LIVE"
              : "PAUSED"}

        </div>

      </div>



      {/* =====================================================
          CAMERA INFORMATION
      ===================================================== */}

      <div className="tile-grid three">

        <StatTile
          label="Camera Status"
          value={
            analyzing
              ? "Analyzing"
              : cameraRunning
                ? "Online"
                : "Paused"
          }
          unit=""
          icon={
            <Video size={16} />
          }
        />


        <StatTile
          label="Camera IP"
          value={CAMERA_IP}
          unit=""
          icon={
            <Camera size={16} />
          }
        />


        <StatTile
          label="AI Model"
          value="Ready"
          unit=""
          icon={
            <BrainCircuit size={16} />
          }
        />

      </div>



      {/* =====================================================
          CAPTURE & ANALYZE BUTTON
      ===================================================== */}

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >

        <button
          type="button"
          className="primary-button"
          onClick={analyzeRoad}
          disabled={analyzing}
          style={{
            opacity:
              analyzing ? 0.65 : 1,
            cursor:
              analyzing
                ? "not-allowed"
                : "pointer",
          }}
        >

          <Camera size={17} />

          {analyzing
            ? "Capturing & Analyzing..."
            : "Capture & Analyze"}

        </button>

      </div>



      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div
          style={{
            padding:
              "15px 18px",
            marginBottom:
              "20px",
            borderRadius:
              "12px",
            background:
              "rgba(239,68,68,0.08)",
            border:
              "1px solid rgba(239,68,68,0.25)",
            color:
              "#dc2626",
          }}
        >

          <strong>
            Analysis Error
          </strong>

          <div
            style={{
              marginTop: "5px",
            }}
          >
            {error}
          </div>

        </div>

      )}



      {/* =====================================================
          AI RESULT
      ===================================================== */}

      {analysis && (

        <div
          className="wide-card"
          style={{
            width: "100%",
            padding: "24px",
            marginTop: "20px",
          }}
        >


          {/* =================================================
              RESULT HEADER
          ================================================= */}

          <div className="card-header">

            <div>

              <div className="card-label">
                AI ROAD ANALYSIS
              </div>

              <h3>
                Detection Result
              </h3>

            </div>

            <BrainCircuit
              size={20}
            />

          </div>



          {/* =================================================
              ROW 1
          ================================================= */}

          <div
            className="tile-grid three"
            style={{
              marginTop: "20px",
            }}
          >

            <StatTile
              label="Road Condition"
              value={
                analysis.road_condition ||
                "--"
              }
              unit=""
              icon={
                <Activity
                  size={16}
                />
              }
            />


            <StatTile
              label="Damage Type"
              value={
                analysis.damage_type ||
                "--"
              }
              unit=""
              icon={
                <ShieldCheck
                  size={16}
                />
              }
            />


            <StatTile
              label="Confidence"
              value={
                typeof analysis.confidence ===
                  "number"
                  ? (
                    analysis.confidence *
                    100
                  ).toFixed(1) + "%"
                  : "--"
              }
              unit=""
              icon={
                <Gauge
                  size={16}
                />
              }
            />

          </div>



          {/* =================================================
              ROW 2
          ================================================= */}

          <div
            className="tile-grid three"
            style={{
              marginTop: "15px",
            }}
          >

            <StatTile
              label="Severity"
              value={
                analysis.severity ||
                "--"
              }
              unit=""
              icon={
                <AlertTriangle
                  size={16}
                />
              }
            />


            <StatTile
              label="Admin Queue"
              value={
                analysis.queued_for_admin
                  ? "Queued"
                  : "Not Queued"
              }
              unit=""
              icon={
                <ShieldCheck
                  size={16}
                />
              }
            />


            <StatTile
              label="Detection ID"
              value={
                analysis.detection_id ??
                "--"
              }
              unit=""
              icon={
                <FileText
                  size={16}
                />
              }
            />

          </div>



          {/* =================================================
              ANALYZED IMAGE
          ================================================= */}

          {analysis.image && (

            <div
              style={{
                marginTop: "25px",
              }}
            >

              <div className="card-label">
                ANALYZED IMAGE
              </div>


              <img
                src={
                  `http://192.168.1.108:5000${analysis.image}`
                }
                alt="AI analyzed road"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  marginTop: "10px",
                  borderRadius: "14px",
                  display: "block",
                }}
              />

            </div>

          )}



          {/* =================================================
              RESULT MESSAGE
          ================================================= */}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "12px",
              background:
                analysis.road_condition ===
                  "damaged"
                  ? "rgba(249,115,22,0.10)"
                  : "rgba(34,197,94,0.10)",
            }}
          >

            <strong>

              {analysis.road_condition ===
                "damaged"
                ? "Road damage detected"
                : "Road classified as normal"}

            </strong>


            <p
              style={{
                marginBottom: 0,
                marginTop: "5px",
              }}
            >

              {analysis.queued_for_admin

                ? "This detection has been sent to the administrator verification queue."

                : "The image was successfully processed by the AI model."}

            </p>

          </div>

        </div>

      )}

    </div>

  );
}


