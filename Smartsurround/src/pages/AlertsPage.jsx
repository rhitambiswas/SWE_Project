import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import StatTile from "../components/StatTile.jsx";

export default function AlertsPage({ alerts, alertSettings, onSave, onReset }) {

  const [form, setForm] = React.useState(alertSettings);

  React.useEffect(() => {
    setForm(alertSettings);
  }, [alertSettings]);

  const activeCount = alerts.filter((a) => a.level === "Warning" || a.level === "Danger").length;

  const highest = alerts.some((a) => a.level === "Danger")
    ? "Danger"
    : alerts.some((a) => a.level === "Warning")
      ? "Warning"
      : "Normal";

  function field(key, label, step) {
    return (
      <label className="threshold-field" key={key}>
        <span>{label}</span>
        <input
          type="number"
          step={step || 1}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
        />
      </label>
    );
  }

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">SAFETY</div>
          <h1>Alerts &amp; Thresholds</h1>
          <p>Configure warning and danger levels for each sensor.</p>
        </div>
      </div>

      <div className="tile-grid three">
        <StatTile label="Active Alerts" value={activeCount} unit="" icon={<Bell size={16} />} />
        <StatTile label="Highest Level" value={highest} unit="" icon={<ShieldCheck size={16} />} />
        <StatTile
          label="Last Check"
          value={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          unit=""
          icon={<Activity size={16} />}
        />
      </div>

      <div className="alerts-list">

        {alerts.map((a, i) => (
          <div className="alert-row" key={i}>
            <div className="alert-icon">{a.icon}</div>
            <div>
              <strong>{a.title}</strong>
              <span>{a.message}</span>
            </div>
            <div className={"alert-level level-" + a.level.toLowerCase()}>{a.level}</div>
          </div>
        ))}

      </div>

      <div className="threshold-card">

        <h4>Threshold Settings</h4>

        <div className="threshold-grid">
          {field("pm25Warn", "PM2.5 Warning")}
          {field("pm25Danger", "PM2.5 Danger")}
          {field("pm10Warn", "PM10 Warning")}
          {field("pm10Danger", "PM10 Danger")}
          {field("iaqWarn", "IAQ Warning")}
          {field("iaqDanger", "IAQ Danger")}
          {field("co2Warn", "CO2 Warning")}
          {field("co2Danger", "CO2 Danger")}
          {field("vocWarn", "VOC Warning", 0.01)}
          {field("vocDanger", "VOC Danger", 0.01)}
          {field("humMin", "Humidity Min")}
          {field("humMax", "Humidity Max")}
          {field("tempMin", "Temp Min")}
          {field("tempMax", "Temp Max")}
        </div>

        <div className="threshold-actions">

          <button type="button" className="primary-button small" onClick={() => onSave(form)}>
            <Save size={14} /> Save Settings
          </button>

          <button type="button" className="secondary-button small" onClick={onReset}>
            <RotateCcw size={14} /> Reset to Default
          </button>

        </div>

      </div>

    </div>
  );
}


