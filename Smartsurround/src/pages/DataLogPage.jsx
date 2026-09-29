import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function DataLogPage({
  logRows,
  loggerRunning,
  loggerInterval,
  setLoggerInterval,
  exportName,
  setExportName,
  isConnected,
  onStart,
  onStop,
  onClear,
  onExport,
  onAddNow,
}) {

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">DATA LOGGER</div>
          <h1>History &amp; Export</h1>
          <p>Record sensor readings over time and export them as a spreadsheet.</p>
        </div>
      </div>

      {!isConnected && (
        <div className="logger-warning">
          Connect your ESP32 above to start logging real readings — logging is disabled while offline.
        </div>
      )}

      <div className="logger-controls">

        <div className={"logger-status" + (loggerRunning ? " running" : "")}>
          <span className="logger-dot"></span>
          {loggerRunning ? "Logger Running" : "Logger Stopped"}
        </div>

        <label className="logger-field">
          <span>Interval</span>
          <select value={loggerInterval} onChange={(e) => setLoggerInterval(Number(e.target.value))}>
            <option value={2000}>2 seconds</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
          </select>
        </label>

        <div className="logger-buttons">

          <button type="button" className="primary-button small" onClick={onStart} disabled={loggerRunning || !isConnected}>
            <Play size={14} /> Start
          </button>

          <button type="button" className="secondary-button small" onClick={onStop} disabled={!loggerRunning}>
            <Pause size={14} /> Stop
          </button>

          <button type="button" className="secondary-button small" onClick={onAddNow} disabled={!isConnected}>
            Log Now
          </button>

        </div>

        <div className="logger-record-count">
          <span>Records</span>
          <strong>{logRows.length}</strong>
        </div>

      </div>

      <div className="export-row">

        <label className="logger-field">
          <span>File name</span>
          <input type="text" value={exportName} onChange={(e) => setExportName(e.target.value)} />
        </label>

        <button type="button" className="primary-button small" onClick={onExport}>
          <Download size={14} /> Export .xls
        </button>

        <button type="button" className="secondary-button small" onClick={onClear}>
          <Trash2 size={14} /> Clear
        </button>

      </div>

      <div className="log-table-wrap">
        <table className="log-table">

          <thead>
            <tr>
              <th>Time</th><th>PM1</th><th>PM2.5</th><th>PM10</th><th>Temp</th>
              <th>Humidity</th><th>IAQ</th><th>CO2</th><th>VOC</th>
            </tr>
          </thead>

          <tbody>

            {logRows.length === 0 && (
              <tr>
                <td colSpan={9} className="log-empty">
                  No records yet — start the logger or click "Log Now".
                </td>
              </tr>
            )}

            {logRows.map((r) => (
              <tr key={r.id}>
                <td>{r.time}</td>
                <td>{fmt(r.pm1, 0)}</td>
                <td>{fmt(r.pm25, 0)}</td>
                <td>{fmt(r.pm10, 0)}</td>
                <td>{fmt(r.temperature, 1)}°C</td>
                <td>{fmt(r.humidity, 1)}%</td>
                <td>{fmt(r.iaq, 1)}</td>
                <td>{fmt(r.co2, 0)}</td>
                <td>{fmt(r.voc, 2)}</td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}


