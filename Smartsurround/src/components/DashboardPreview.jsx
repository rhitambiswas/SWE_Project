import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import MonitorCard from "./MonitorCard.jsx";
import EventItem from "./EventItem.jsx";

export default function DashboardPreview() {

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.45,
      }}
    >

      <div className="dashboard-glow"></div>

      <div className="dashboard">

        {/* Dashboard top bar */}

        <div className="dashboard-topbar">

          <div className="browser-dots">

            <span></span>
            <span></span>
            <span></span>

          </div>

          <div className="dashboard-url">
            smartsurround / monitoring
          </div>

          <div className="dashboard-status">
            <span></span>
            System Online
          </div>

        </div>


        <div className="dashboard-body">

          {/* Sidebar */}

          <aside className="dashboard-sidebar">

            <div className="side-logo">

              <div className="mini-logo">
                <Activity size={14} />
              </div>

              <span>SmartSurround</span>

            </div>

            <div className="sidebar-title">
              MONITORING
            </div>

            <div className="side-link active">
              <Activity size={15} />
              Overview
            </div>

            <div className="side-link">
              <Wind size={15} />
              Environment
            </div>

            <div className="side-link">
              <Camera size={15} />
              AI Vision
            </div>

            <div className="side-link">
              <Mic size={15} />
              Sound
            </div>

            <div className="side-link">
              <MapPin size={15} />
              Location
            </div>

            <div className="sidebar-title second-title">
              SYSTEM
            </div>

            <div className="side-link">
              <ShieldCheck size={15} />
              Safety
            </div>

          </aside>


          {/* Main dashboard */}

          <main className="dashboard-main">

            <div className="dashboard-heading">

              <div>
                <div className="small-label">
                  SMART ENVIRONMENT
                </div>

                <h3>
                  Surrounding Intelligence
                </h3>

                <p>
                  A unified view of your environment
                </p>
              </div>

              <div className="dashboard-live">
                <span></span>
                LIVE SYSTEM
              </div>

            </div>


            {/* Feature cards */}

            <div className="monitor-cards">

              <MonitorCard
                icon={<Wind />}
                title="Air Quality"
                text="Continuous environmental monitoring"
              />

              <MonitorCard
                icon={<Activity />}
                title="Environment"
                text="Connected atmospheric sensors"
              />

              <MonitorCard
                icon={<Camera />}
                title="AI Vision"
                text="Intelligent visual monitoring"
              />

              <MonitorCard
                icon={<Mic />}
                title="Sound"
                text="Surrounding noise awareness"
              />

            </div>


            {/* Lower dashboard */}

            <div className="dashboard-lower">

              {/* AI card */}

              <div className="ai-card">

                <div className="card-header">

                  <div>
                    <div className="card-label">
                      INTELLIGENT ANALYSIS
                    </div>

                    <h4>
                      AI Monitoring
                    </h4>
                  </div>

                  <div className="ai-icon">
                    <BrainCircuit size={17} />
                  </div>

                </div>

                <div className="ai-visual">

                  <div className="ai-orbit orbit-one"></div>
                  <div className="ai-orbit orbit-two"></div>

                  <div className="ai-center">
                    <Sparkles size={22} />
                  </div>

                </div>

                <div className="ai-footer">
                  <span>
                    Cloud AI Processing
                  </span>

                  <span className="ai-active">
                    Active
                  </span>
                </div>

              </div>


              {/* Location card */}

              <div className="location-card">

                <div className="card-header">

                  <div>
                    <div className="card-label">
                      LOCATION INTELLIGENCE
                    </div>

                    <h4>
                      Live Location
                    </h4>
                  </div>

                  <div className="location-icon">
                    <MapPin size={17} />
                  </div>

                </div>

                <div className="map-placeholder">

                  <div className="map-grid"></div>

                  <div className="map-road road-one"></div>
                  <div className="map-road road-two"></div>
                  <div className="map-road road-three"></div>

                  <div className="map-pin">
                    <MapPin size={20} />
                  </div>

                </div>

              </div>

            </div>


            {/* Event row */}

            <div className="event-row">

              <EventItem
                icon={<Flame />}
                title="Fire Detection"
                text="Safety monitoring enabled"
              />

              <EventItem
                icon={<CloudRain />}
                title="Rain Detection"
                text="Weather awareness enabled"
              />

              <EventItem
                icon={<ShieldCheck />}
                title="Safety Monitoring"
                text="Continuous protection"
              />

            </div>

          </main>

        </div>

      </div>


      {/* Floating cards */}

      <div className="floating-card floating-left">

        <div className="floating-icon">
          <Sparkles size={17} />
        </div>

        <div>
          <span>AI Intelligence</span>
          <strong>Enabled</strong>
        </div>

      </div>


      <div className="floating-card floating-right">

        <div className="floating-icon orange">
          <ShieldCheck size={17} />
        </div>

        <div>
          <span>Safety System</span>
          <strong>Active</strong>
        </div>

      </div>

    </motion.div>
  );
}


/* =========================================================
   MONITOR CARD
========================================================= */

