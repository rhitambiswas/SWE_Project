import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function Features() {

  const features = [

    {
      icon: Wind,
      title: "Environmental Monitoring",
      text: "Monitor air quality and surrounding environmental conditions through connected sensors.",
    },

    {
      icon: Camera,
      title: "AI Vision",
      text: "Use camera-based intelligence to understand visual events and changes in the surroundings.",
    },

    {
      icon: Mic,
      title: "Sound Awareness",
      text: "Monitor surrounding sound levels and identify when noise conditions move beyond configured limits.",
    },

    {
      icon: Flame,
      title: "Fire Detection",
      text: "Safety-focused sensing helps detect potential fire-related events and trigger alerts.",
    },

    {
      icon: CloudRain,
      title: "Rain Detection",
      text: "Weather-aware monitoring provides information about rainfall conditions around the system.",
    },

    {
      icon: MapPin,
      title: "GPS Intelligence",
      text: "Location information connects environmental events with their physical surroundings.",
    },

  ];

  return (

    <section id="features" className="features-section">

      <div className="section-container">

        <div className="features-heading">

          <div>

            <div className="section-tag">
              <span></span>
              SYSTEM CAPABILITIES
            </div>

            <h2>
              One system.
              <br />
              <span>
                Complete awareness.
              </span>
            </h2>

          </div>

          <p>
            SmartSurround combines multiple sensing technologies
            into a single intelligent monitoring ecosystem.
          </p>

        </div>


        <div className="feature-grid">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >

                <div className="feature-icon">
                  <Icon size={20} />
                </div>

                <div className="feature-number">
                  0{index + 1}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

                <div className="feature-arrow">
                  <ArrowUpRight size={16} />
                </div>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>

  );
}


/* =========================================================
   HOW IT WORKS
========================================================= */

