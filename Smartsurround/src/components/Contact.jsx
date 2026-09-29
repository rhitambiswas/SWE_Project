import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function Contact({ onExplore }) {

  return (

    <section id="contact" className="contact-section">

      <div className="contact-box">

        <div className="contact-glow"></div>

        <div className="contact-content">

          <div className="contact-icon">
            <Activity size={22} />
          </div>

          <div className="section-tag">
            <span></span>
            SMARTER SURROUNDINGS
          </div>

          <h2>
            Make your surroundings
            <br />
            <span>
              more intelligent.
            </span>
          </h2>

          <p>
            SmartSurround connects sensing, AI and location
            intelligence to create a smarter approach to
            environmental and safety monitoring.
          </p>

          <a
            href="#home"
            className="primary-button"
            onClick={(event) => {
              event.preventDefault();
              onExplore();
            }}
          >
            Explore SmartSurround
            <ArrowUpRight size={17} />
          </a>

        </div>

      </div>

    </section>

  );
}


/* =========================================================
   PDF VIEWER MODAL
========================================================= */

