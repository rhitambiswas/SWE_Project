import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import StatTile from "../components/StatTile.jsx";

export default function AirQualityPage({ latest, pmHistory }) {

  const [range, setRange] = React.useState("Live");
  const [hover, setHover] = React.useState(null);

  const data =
    pmHistory.length < 2
      ? Array.from({ length: 20 }, () => ({ label: "--", pm1: 0, pm25: 0, pm10: 0 }))
      : pmHistory;

  const max = Math.max(1, ...data.flatMap((d) => [d.pm1, d.pm25, d.pm10])) * 1.15;

  const pts = data.map((d, i) => ({
    ...d,
    x: 14 + (i / Math.max(1, data.length - 1)) * 872,
    y1: yVal(d.pm1, max),
    y25: yVal(d.pm25, max),
    y10: yVal(d.pm10, max),
  }));

  function handleMove(e) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 900;

    let nearest = pts[0];
    let bestDist = Infinity;

    pts.forEach((p) => {
      const dist = Math.abs(p.x - x);
      if (dist < bestDist) {
        bestDist = dist;
        nearest = p;
      }
    });

    setHover(nearest);
  }

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">TRENDS</div>
          <h1>Air Quality</h1>
          <p>Particulate matter readings over time.</p>
        </div>

        <div className="range-buttons">
          {["Live", "1H", "6H"].map((r) => (
            <button
              key={r}
              type="button"
              className={"range-btn" + (range === r ? " active" : "")}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="tile-grid three">
        <StatTile label="PM1.0" value={fmt(latest.pm1, 0)} unit="µg/m³" icon={<Wind size={16} />} />
        <StatTile label="PM2.5" value={fmt(latest.pm25, 0)} unit="µg/m³" icon={<Wind size={16} />} />
        <StatTile label="PM10" value={fmt(latest.pm10, 0)} unit="µg/m³" icon={<Wind size={16} />} />
      </div>

      <div className="chart-card">

        <div className="chart-legend">
          <span><i style={{ background: "#22c55e" }}></i>PM1.0</span>
          <span><i style={{ background: "#f97316" }}></i>PM2.5</span>
          <span><i style={{ background: "#ef4444" }}></i>PM10</span>
        </div>

        <svg
          viewBox="0 0 900 210"
          preserveAspectRatio="none"
          className="pm-chart-svg"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >

          <path
            d={`${buildPath(pts.map((p) => ({ x: p.x, y: p.y25 })))} L886,194 L14,194 Z`}
            fill="rgba(255,116,23,0.12)"
          />

          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y1 })))} fill="none" stroke="#22c55e" strokeWidth="2.5" />
          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y25 })))} fill="none" stroke="#f97316" strokeWidth="2.5" />
          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y10 })))} fill="none" stroke="#ef4444" strokeWidth="2.5" />

          {hover && (
            <>
              <line x1={hover.x} x2={hover.x} y1="14" y2="194" stroke="rgba(33,20,15,0.2)" />
              <circle cx={hover.x} cy={hover.y1} r="4" fill="#22c55e" />
              <circle cx={hover.x} cy={hover.y25} r="4" fill="#f97316" />
              <circle cx={hover.x} cy={hover.y10} r="4" fill="#ef4444" />
            </>
          )}

        </svg>

        {hover && (
          <div className="chart-tooltip-box">
            <strong>{hover.label}</strong>
            <span>PM1.0: {hover.pm1}</span>
            <span>PM2.5: {hover.pm25}</span>
            <span>PM10: {hover.pm10}</span>
          </div>
        )}

      </div>

    </div>
  );
}


