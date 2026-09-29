import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import StatTile from "../components/StatTile.jsx";

export default function LocationPage({ gps }) {

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">LOCATION INTELLIGENCE</div>
          <h1>GPS · NEO-8M</h1>
          <p>Live position data from the connected GPS module.</p>
        </div>

        <div className="dashboard-live">
          <span></span>
          {gps.fix || "No Fix"}
        </div>
      </div>

      <div className="map-placeholder large">
        <div className="map-grid"></div>
        <div className="map-road road-one"></div>
        <div className="map-road road-two"></div>
        <div className="map-road road-three"></div>
        <div className="map-pin">
          <MapPin size={22} />
        </div>
      </div>

      <div className="tile-grid three">
        <StatTile label="Latitude" value={fmt(gps.lat, 5)} unit="°" icon={<Compass size={16} />} />
        <StatTile label="Longitude" value={fmt(gps.lng, 5)} unit="°" icon={<Compass size={16} />} />
        <StatTile label="Altitude" value={fmt(gps.alt, 1)} unit="m" icon={<Navigation size={16} />} />
        <StatTile label="Speed" value={fmt(gps.speed, 1)} unit="km/h" icon={<Activity size={16} />} />
        <StatTile label="Course" value={fmt(gps.course, 0)} unit="°" icon={<Compass size={16} />} />
        <StatTile label="Satellites" value={gps.sats ?? "--"} unit="in view" icon={<Satellite size={16} />} />
        <StatTile label="HDOP" value={fmt(gps.hdop, 2)} unit="" icon={<Gauge size={16} />} />
        <StatTile label="Fix Type" value={gps.fix || "--"} unit="" icon={<MapPin size={16} />} />
        <StatTile label="UTC Time" value={gps.time || "--"} unit="" icon={<Satellite size={16} />} />
      </div>

    </div>
  );
}


