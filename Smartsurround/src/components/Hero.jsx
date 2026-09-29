import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import DashboardPreview from "./DashboardPreview.jsx";

export default function Hero() {
  return (
    <section id="home" className="hero">

      {/* Background */}

      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      <div className="hero-grid"></div>

      <div className="hero-content">

        {/* Badge */}

        <motion.div
          className="announcement"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="announcement-dot"></span>

          <span>AI Powered Environmental Intelligence</span>

          <ArrowRight size={14} />
        </motion.div>


        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Monitor your
          <br />

          <span className="hero-highlight">
            surroundings smarter.
          </span>
        </motion.h1>


        {/* Description */}

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          SmartSurround is an AI-powered environmental and safety
          monitoring system designed to understand the world around you.
        </motion.p>


        <motion.p
          className="hero-description second"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          It combines connected sensors, intelligent vision,
          sound monitoring and GPS-based location awareness into
          one unified platform.
        </motion.p>


        {/* CTA */}

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >

          <a href="#about" className="primary-button">
            Discover SmartSurround
            <ArrowRight size={17} />
          </a>

          <a href="#features" className="secondary-button">
            Explore Features
          </a>

        </motion.div>


        {/* Trust / info */}

        <motion.div
          className="hero-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >

          <div className="trust-icons">

            <div className="trust-circle">
              <Wind size={15} />
            </div>

            <div className="trust-circle">
              <Camera size={15} />
            </div>

            <div className="trust-circle">
              <MapPin size={15} />
            </div>

          </div>

          <span>Environmental</span>
          <span className="trust-divider">|</span>
          <span>AI Vision</span>
          <span className="trust-divider">|</span>
          <span>Location Intelligence</span>

        </motion.div>

      </div>


      {/* Dashboard preview */}

      <DashboardPreview />

    </section>
  );
}


/* =========================================================
   DASHBOARD PREVIEW
   NO SENSOR READINGS
========================================================= */

