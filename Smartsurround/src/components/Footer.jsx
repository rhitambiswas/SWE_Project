import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-glow"></div>

      <div className="footer-container">

        <div className="footer-brand">

          <a href="#home" className="brand">

            <div className="brand-icon">
              <Activity size={19} />
            </div>

            <div>
              <span className="brand-name">Smart</span>
              <span className="brand-name-light">
                Surround
              </span>
            </div>

          </a>

          <p>
            AI-powered environmental and safety
            monitoring for smarter surroundings.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <strong>Platform</strong>

            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
          </div>

          <div>
            <strong>System</strong>

            <a href="#features">AI Vision</a>
            <a href="#features">Environment</a>
            <a href="#features">GPS</a>
          </div>

          <div>
            <strong>Contact</strong>

            <a href="#contact">Get Started</a>
            <a href="mailto:hello@smartsurround.ai">
              Email
            </a>
          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © 2026 SmartSurround. All rights reserved.
        </span>

        <span>
          AI × IoT × Environmental Intelligence
        </span>

      </div>

    </footer>

  );
}


/* =========================================================
   AUTH PAGE (LOGIN / CREATE ACCOUNT)
========================================================= */

