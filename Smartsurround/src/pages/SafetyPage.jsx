import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import SafetyToggle from "../components/SafetyToggle.jsx";

export default function SafetyPage() {

  const [toggles, setToggles] = React.useState({
    fire: true,
    rain: true,
    safety: true,
  });

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">SYSTEM</div>
          <h1>Safety Monitoring</h1>
          <p>Enable or disable each protection system.</p>
        </div>
      </div>

      <div className="safety-toggle-list">

        <SafetyToggle
          icon={<Flame />}
          title="Fire Detection"
          text="Safety monitoring enabled"
          checked={toggles.fire}
          onChange={() => setToggles({ ...toggles, fire: !toggles.fire })}
        />

        <SafetyToggle
          icon={<CloudRain />}
          title="Rain Detection"
          text="Weather awareness enabled"
          checked={toggles.rain}
          onChange={() => setToggles({ ...toggles, rain: !toggles.rain })}
        />

        <SafetyToggle
          icon={<ShieldCheck />}
          title="Safety Monitoring"
          text="Continuous protection"
          checked={toggles.safety}
          onChange={() => setToggles({ ...toggles, safety: !toggles.safety })}
        />

      </div>

    </div>
  );
}


