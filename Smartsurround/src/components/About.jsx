import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import Capability from "./Capability.jsx";

export default function About() {

  const pings = [
    { top: "16%", left: "60%", delay: 0 },
    { top: "64%", left: "70%", delay: 0.8 },
    { top: "38%", left: "82%", delay: 1.6 },
    { top: "78%", left: "46%", delay: 2.4 },
    { top: "26%", left: "38%", delay: 1.2 },
  ];

  return (
    <section id="about" className="about-section">

      <div className="about-bg">

        <div className="about-bg-grid"></div>

        <motion.div
          className="about-bg-blob about-bg-blob-one"
          animate={{ x: [0, 22, 0], y: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="about-bg-blob about-bg-blob-two"
          animate={{ x: [0, -18, 0], y: [0, -14, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {pings.map((p, i) => (
          <span
            key={i}
            className="about-ping"
            style={{ top: p.top, left: p.left, "--delay": `${p.delay}s` }}
          ></span>
        ))}

      </div>

      <div className="section-container">

        <motion.div
          className="section-tag"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span></span>
          ABOUT SMARTSURROUND
        </motion.div>

        <div className="about-grid">

          <div className="about-left">

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Understanding your
              <br />
              surroundings,
              <span>
                intelligently.
              </span>
            </motion.h2>

            <motion.div
              className="about-visual"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >

              <div className="about-visual-grid"></div>

              <div className="radar-sweep"></div>

              <div className="radar-ring ring-a"></div>
              <div className="radar-ring ring-b"></div>
              <div className="radar-ring ring-c"></div>

              <div className="radar-core">
                <Activity size={22} />
              </div>

              <div className="about-float chip-wind">
                <Wind size={16} />
              </div>

              <div className="about-float chip-camera">
                <Camera size={16} />
              </div>

              <div className="about-float chip-map">
                <MapPin size={16} />
              </div>

              <div className="about-float chip-mic">
                <Mic size={16} />
              </div>

              <svg className="about-visual-lines" viewBox="0 0 400 300">
                <line x1="120" y1="120" x2="60" y2="45" />
                <line x1="120" y1="120" x2="320" y2="65" />
                <line x1="120" y1="120" x2="330" y2="235" />
                <line x1="120" y1="120" x2="85" y2="260" />
              </svg>

            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            <p className="large-paragraph">
              SmartSurround is a connected environmental monitoring
              platform that brings physical sensors, AI and location
              intelligence together.
            </p>

            <p>
              The system continuously observes environmental conditions,
              surrounding sound and visual information to help identify
              potential risks and changes around a monitored area.
            </p>

            <p>
              Instead of simply collecting data, SmartSurround is designed
              to transform that information into meaningful insights,
              alerts and intelligent decisions.
            </p>

          </motion.div>

        </div>


        {/* Stats without readings */}

        <div className="capability-grid">

          {[
            {
              number: "01",
              title: "Sense",
              text: "Connected sensors observe environmental conditions.",
            },
            {
              number: "02",
              title: "Understand",
              text: "AI analyzes visual and environmental information.",
            },
            {
              number: "03",
              title: "Locate",
              text: "GPS provides location awareness for the system.",
            },
            {
              number: "04",
              title: "Respond",
              text: "Intelligent alerts help identify potential risks.",
            },
          ].map((cap, index, arr) => (
            <React.Fragment key={cap.number}>

              <Capability
                number={cap.number}
                title={cap.title}
                text={cap.text}
                index={index}
              />

              {index < arr.length - 1 && (
                <motion.div
                  className="capability-arrow"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.35 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

    </section>
  );
}


