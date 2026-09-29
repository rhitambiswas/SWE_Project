import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function Navbar({ isLoggedIn, currentUser, onLoginClick, onLogoutClick, onDashboardClick, onPdfClick }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Features", "#features"],
    ["How It Works", "#how"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Logo */}

        <a href="#home" className="brand">
          <div className="brand-icon">
            <Activity size={19} strokeWidth={2.5} />
          </div>

          <div>
            <span className="brand-name">Smart</span>
            <span className="brand-name-light">Surround</span>
          </div>
        </a>

        {/* Desktop navigation */}

        <div className="desktop-nav">
          {links.map(([name, href]) => (
            <a href={href} key={name}>
              {name}
            </a>
          ))}

          <button type="button" className="nav-pdf-link" onClick={onPdfClick}>
            <FileText size={14} />
            PPT
          </button>
        </div>

        <a href="#contact" className="nav-button">
          Explore System
          <ArrowUpRight size={16} />
        </a>

        {isLoggedIn ? (
          <div className="nav-user">
            <button
              type="button"
              className="nav-user-pill"
              onClick={onDashboardClick}
            >
              <span className="nav-user-avatar">
                <User size={13} />
              </span>
              {currentUser?.name || "Account"}
            </button>

            <button
              type="button"
              className="nav-logout-button"
              onClick={onLogoutClick}
              aria-label="Log out"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="nav-login-button"
            onClick={onLoginClick}
          >
            <User size={15} />
            Login
          </button>
        )}

        {/* Mobile */}

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">

          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}

          <button
            type="button"
            className="mobile-menu-cta secondary"
            onClick={() => {
              setMenuOpen(false);
              onPdfClick();
            }}
          >
            <FileText size={15} />
            PPT
          </button>

          <a
            href="#contact"
            className="mobile-menu-cta"
            onClick={() => setMenuOpen(false)}
          >
            Explore System
          </a>

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="mobile-menu-cta mobile-menu-login"
                onClick={() => {
                  setMenuOpen(false);
                  onDashboardClick();
                }}
              >
                <User size={15} />
                {currentUser?.name || "Account"}
              </button>

              <button
                type="button"
                className="mobile-menu-cta mobile-menu-login secondary"
                onClick={() => {
                  setMenuOpen(false);
                  onLogoutClick();
                }}
              >
                <LogOut size={15} />
                Log Out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mobile-menu-cta mobile-menu-login"
              onClick={() => {
                setMenuOpen(false);
                onLoginClick();
              }}
            >
              <User size={15} />
              Login
            </button>
          )}

        </div>
      )}
    </header>
  );
}


/* =========================================================
   HERO
========================================================= */

