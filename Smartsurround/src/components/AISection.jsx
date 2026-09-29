import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function AISection() {

  return (

    <section className="ai-section">

      <div className="ai-section-glow"></div>

      <div className="section-container">

        <div className="ai-layout">

          <div>

            <div className="section-tag light">
              <span></span>
              CLOUD AI INTELLIGENCE
            </div>

            <h2>
              Sensors collect.
              <br />
              <span>
                AI understands.
              </span>
            </h2>

            <p>
              SmartSurround is designed so that computationally
              intensive AI processing can be performed on a
              server or cloud platform rather than directly on
              the edge device.
            </p>

            <div className="ai-points">

              <div>
                <Check size={15} />
                AI-powered visual analysis
              </div>

              <div>
                <Check size={15} />
                Environmental event detection
              </div>

              <div>
                <Check size={15} />
                Intelligent safety alerts
              </div>

            </div>

          </div>


          <div className="ai-visual-large">

            <div className="ai-ring ring-large"></div>
            <div className="ai-ring ring-medium"></div>
            <div className="ai-ring ring-small"></div>

            <div className="ai-core">
              <BrainCircuit size={35} />
              <span>AI</span>
            </div>

            <div className="ai-node node-one">
              <Camera size={16} />
            </div>

            <div className="ai-node node-two">
              <Wind size={16} />
            </div>

            <div className="ai-node node-three">
              <MapPin size={16} />
            </div>

            <div className="ai-node node-four">
              <Mic size={16} />
            </div>

          </div>

        </div>

      </div>

    </section>

  );
}


/* =========================================================
   CONTACT CTA
========================================================= */

