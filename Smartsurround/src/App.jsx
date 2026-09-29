import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  MapPin,
  Camera,
  Activity,
  CloudRain,
  Flame,
  Mic,
  Wind,
  BrainCircuit,
  User,
  Lock,
  Mail,
  LogOut,
  Eye,
  EyeOff,
  Thermometer,
  Droplets,
  Gauge,
  Satellite,
  Video,
  Table,
  Bell,
  Download,
  Play,
  Pause,
  Trash2,
  RotateCcw,
  Compass,
  Navigation,
  Save,
  Radio,
  FileText,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Settings,
  HelpCircle,
  Upload,
  Paperclip,
  MessageSquare,
  Moon,
  Sun,
  Monitor,
  CheckCircle2,
  Clock3,
  Send,
  UserRound,
} from "lucide-react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signOut,
  updateProfile,
  reload,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp, db } from "./firebaseClient";

import "./index.css";

const firebaseAuth = getAuth(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ isLoggedIn, currentUser, onLoginClick, onLogoutClick, onDashboardClick, onPdfClick }) {
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

function Hero() {
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

function DashboardPreview() {

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

function MonitorCard({ icon, title, text }) {

  return (
    <div className="monitor-card">

      <div className="monitor-icon">
        {icon}
      </div>

      <div>

        <h5>{title}</h5>

        <p>{text}</p>

      </div>

      <div className="card-arrow">
        <ArrowUpRight size={14} />
      </div>

    </div>
  );
}


/* =========================================================
   EVENT ITEM
========================================================= */

function EventItem({ icon, title, text }) {

  return (
    <div className="event-item">

      <div className="event-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <div className="event-check">
        <Check size={13} />
      </div>

    </div>
  );
}


/* =========================================================
   ABOUT
========================================================= */

function About() {

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


function Capability({ number, title, text, index = 0 }) {

  return (
    <motion.div
      className="capability"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >

      <div className="capability-progress-track">
        <motion.div
          className="capability-progress-fill"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.15 + 0.1 }}
        />
      </div>

      <span>{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>

    </motion.div>
  );
}


/* =========================================================
   FEATURES
========================================================= */

function Features() {

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

function HowItWorks() {

  const steps = [

    {
      number: "01",
      title: "Sense",
      text: "SmartSurround collects information from connected environmental and safety sensors.",
    },

    {
      number: "02",
      title: "Connect",
      text: "The monitoring device securely sends information to the central platform.",
    },

    {
      number: "03",
      title: "Analyze",
      text: "Cloud-based AI processes visual and environmental information.",
    },

    {
      number: "04",
      title: "Respond",
      text: "The system presents insights and can generate alerts when required.",
    },

  ];

  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [activeIndex, setActiveIndex] = React.useState(-1);

  const lineControls = useAnimation();
  const runnerControls = useAnimation();

  React.useEffect(() => {

    if (!isInView) return;

    let cancelled = false;

    async function playSequence() {

      while (!cancelled) {

        setActiveIndex(-1);

        lineControls.set({ width: "0%" });
        runnerControls.set({ left: "0%", opacity: 0 });

        await new Promise((r) => setTimeout(r, 500));

        for (let i = 0; i < steps.length; i++) {

          if (cancelled) return;

          setActiveIndex(i);

          const targetPercent = (i / (steps.length - 1)) * 100;

          await Promise.all([
            lineControls.start({
              width: `${targetPercent}%`,
              transition: { duration: 0.75, ease: "easeInOut" },
            }),
            runnerControls.start({
              left: `${targetPercent}%`,
              opacity: 1,
              transition: { duration: 0.75, ease: "easeInOut" },
            }),
          ]);

          if (cancelled) return;

          await new Promise((r) => setTimeout(r, 550));

        }

        if (cancelled) return;

        await new Promise((r) => setTimeout(r, 1200));

        runnerControls.start({
          opacity: 0,
          transition: { duration: 0.4 },
        });

        await new Promise((r) => setTimeout(r, 500));

      }

    }

    playSequence();

    return () => {
      cancelled = true;
    };

  }, [isInView]);

  return (

    <section id="how" className="how-section" ref={sectionRef}>

      <div className="section-container">

        <div className="how-heading">

          <div className="section-tag">
            <span></span>
            HOW IT WORKS
          </div>

          <h2>
            From sensing
            <br />
            <span>
              to intelligence.
            </span>
          </h2>

        </div>


        <div className="steps">

          <div className="steps-track">

            <motion.div
              className="steps-track-fill"
              initial={{ width: "0%" }}
              animate={lineControls}
            />

            <motion.div
              className="steps-track-runner"
              initial={{ left: "0%", opacity: 0 }}
              animate={runnerControls}
            />

          </div>

          {steps.map((step, index) => (

            <motion.div
              className={
                "step" +
                (activeIndex === index ? " step-active" : "") +
                (activeIndex > index ? " step-done" : "")
              }
              key={step.number}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >

              <motion.div
                className="step-number"
                animate={
                  activeIndex === index
                    ? { scale: [1, 1.18, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                {step.number}
              </motion.div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}


/* =========================================================
   AI SECTION
========================================================= */

function AISection() {

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

function Contact({ onExplore }) {

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

function PdfViewerModal({ onClose }) {

  const panelRef = React.useRef(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  React.useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      panelRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function handleClose() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    onClose();
  }

  return (
    <motion.div
      className="pdf-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleClose}
    >

      <motion.div
        ref={panelRef}
        className={"pdf-panel" + (isFullscreen ? " is-fullscreen" : "")}
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="pdf-panel-bar">

          <div className="pdf-panel-title">
            <FileText size={15} />
            Team ABISKAR — PPT
          </div>

          <div className="pdf-panel-actions">

            <button
              type="button"
              className="pdf-close-button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              type="button"
              className="pdf-close-button"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>

          </div>

        </div>

        <div className="pdf-panel-body">
          <iframe
            src={`${import.meta.env.BASE_URL}SmartSurround.pdf`}
            title="Team ABISKAR PPT"
          ></iframe>
        </div>

      </motion.div>

    </motion.div>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function Footer() {

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

function AuthPage({ onAuthSuccess, onAdminSuccess, onBack }) {

  const [mode, setMode] = React.useState("login"); // "login" | "signup" | "admin"
  const [showPassword, setShowPassword] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [adminPin, setAdminPin] = React.useState("");
  const [error, setError] = React.useState("");

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [pendingUser, setPendingUser] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [passwordResetSent, setPasswordResetSent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleForgotPassword() {
    setError("");
    setPasswordResetSent(false);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      setIsSubmitting(true);

      await sendPasswordResetEmail(firebaseAuth, cleanEmail);

      setPasswordResetSent(true);
    } catch (err) {
      console.error("Password reset error:", err.code, err.message);

      if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err?.code === "auth/user-not-found") {
        setError("No account was found for this email.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else if (err?.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err?.message || "Unable to send password reset email.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleAdminLogin() {
    const cleanPin = adminPin.trim();

    if (!cleanPin) {
      setError("Please enter the admin PIN.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("pin", cleanPin);

      let response;
      try {
        response = await fetch(`${BACKEND_URL}/login/creds`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
          cache: "no-store",
        });
      } catch (networkError) {
        throw new Error("Unable to connect to the SmartSurround backend. Start Flask on port 5000 and try again.");
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok || !data?.ok) {
        if (response.status === 429) {
          throw new Error(data?.message || "Too many attempts. Please wait and try again later.");
        }
        if (response.status === 403) {
          throw new Error(data?.message || "Invalid admin PIN.");
        }
        throw new Error(data?.message || `Admin login failed (HTTP ${response.status}).`);
      }

      try { window.localStorage.setItem("ss_admin_pin", cleanPin); } catch (_) {}
      try {
        const token = response.headers.get("X-Set-Auth-Token");
        if (token) window.sessionStorage.setItem("ss_admin_token", token);
      } catch (_) {}
      onAdminSuccess?.({ authenticated: true });
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err?.message || "Unable to authenticate as administrator.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (mode === "admin") {
      await handleAdminLogin();
      return;
    }

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || (mode === "signup" && !cleanName)) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        // ============================================
        // CREATE FIREBASE ACCOUNT
        // ============================================
        const { user } = await createUserWithEmailAndPassword(
          firebaseAuth,
          cleanEmail,
          password
        );

        // Save the user's name in Firebase Auth profile.
        if (cleanName) {
          await updateProfile(user, {
            displayName: cleanName,
          });
        }

        // Send Firebase email verification.
        await sendEmailVerification(user);

        // Do not allow an unverified account into the dashboard.
        await signOut(firebaseAuth);

        setPendingUser({
          name: cleanName || cleanEmail.split("@")[0],
          email: cleanEmail,
        });

        setSuccessMessage(
          "We sent a verification link to your email. Verify your email, then log in to continue."
        );

        setShowSuccess(true);
      } else {
        // ============================================
        // LOGIN
        // ============================================
        const { user } = await signInWithEmailAndPassword(
          firebaseAuth,
          cleanEmail,
          password
        );

        // Refresh the user so emailVerified is current.
        await reload(user);

        if (!user.emailVerified) {
          await signOut(firebaseAuth);

          setError(
            "Your email is not verified yet. Open the verification email we sent you, verify your email, then log in again."
          );

          return;
        }

        setPendingUser({
          name:
            user.displayName ||
            cleanEmail.split("@")[0],
          email: user.email || cleanEmail,
        });

        setSuccessMessage(
          "Your email is verified. Taking you to your live dashboard..."
        );

        setShowSuccess(true);
      }
    } catch (err) {
      console.error("Firebase authentication error:", err);

      const code = err?.code || "";

      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please log in.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a while and try again.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err?.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  React.useEffect(() => {
    if (!showSuccess || !pendingUser) return;

    // Signup must NOT automatically enter the dashboard because
    // the user still needs to verify their email first.
    if (mode === "signup") return;

    const timer = setTimeout(() => {
      onAuthSuccess(pendingUser);
    }, 1700);

    return () => clearTimeout(timer);
  }, [showSuccess, pendingUser, mode, onAuthSuccess]);

  function closeSuccess() {
    setShowSuccess(false);
    setPendingUser(null);
    setSuccessMessage("");

    if (mode === "signup") {
      setMode("login");
      setPassword("");
      setError("");
    }
  }

  return (
    <section className="auth-section">

      <div className="auth-glow"></div>

      <div className="auth-layout">

        <motion.div
          className="auth-box"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <button type="button" className="auth-back" onClick={onBack}>
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
            Back to site
          </button>

          <div className="auth-brand">
            <div className="brand-icon">
              <Activity size={19} strokeWidth={2.5} />
            </div>

            <div>
              <span className="brand-name">Smart</span>
              <span className="brand-name-light">Surround</span>
            </div>
          </div>

          <div className="auth-heading">
            <h2>
              {mode === "admin" ? "Administrator login" : mode === "login" ? "Welcome back" : "Create your account"}
            </h2>

            <p>
              {mode === "admin"
                ? "Use the secure administrator PIN to open the SmartSurround control panel."
                : mode === "login"
                  ? "Log in to view your live monitoring dashboard."
                  : "Sign up to start monitoring your surroundings."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
                setShowSuccess(false);
              }}
            >
              Log In
            </button>

            <button
              type="button"
              className={mode === "admin" ? "active" : ""}
              onClick={() => {
                setMode("admin");
                setError("");
                setShowSuccess(false);
              }}
            >
              Admin Login
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setError("");
                setShowSuccess(false);
              }}
            >
              Create Account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            {mode === "admin" ? (
              <label className="auth-field">
                <span>Admin PIN</span>
                <div className="auth-input">
                  <ShieldCheck size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter administrator PIN"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    autoComplete="current-password"
                    inputMode="numeric"
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide admin PIN" : "Show admin PIN"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            ) : (
              <>
            {mode === "signup" && (
              <label className="auth-field">
                <span>Full Name</span>

                <div className="auth-input">
                  <User size={16} />
                  <input
                    type="text"
                    placeholder="Jordan Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </label>
            )}

            <label className="auth-field">
              <span>Email</span>

              <div className="auth-input">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Password</span>

              <div className="auth-input">
                <Lock size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            </>
            )}

            {mode === "login" && (
              <div className="forgot-password-row">
                <button
                  type="button"
                  className="forgot-password-button"
                  onClick={handleForgotPassword}
                  disabled={isSubmitting}
                >
                  Forgot password?
                </button>
              </div>
            )}
            {mode === "login" && passwordResetSent && (
              <div className="password-reset-success">
                <div className="password-reset-success-title">
                  Check your email
                </div>

                <div className="password-reset-success-text">
                  We’ve sent a password reset link to your email address.
                  Please check your inbox and spam folder.
                </div>
              </div>
            )}


            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting
                ? "Please wait..."
                : mode === "admin"
                  ? "Open Admin Panel"
                  : mode === "login"
                    ? "Log In"
                    : "Create Account"}
              <ArrowRight size={16} />
            </button>

          </form>

          <div className="auth-switch">
            {mode === "admin" ? (
              <>
                Need a regular account?
                <button type="button" onClick={() => setMode("login")}>
                  User login
                </button>
              </>
            ) : mode === "login" ? (
              <>
                Don't have an account?
                <button type="button" onClick={() => setMode("signup")}>
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button type="button" onClick={() => setMode("login")}>
                  Log in
                </button>
              </>
            )}
          </div>

        </motion.div>

        <motion.div
          className="auth-showcase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >

          <div className="section-tag light">
            <span></span>
            WHAT YOU GET
          </div>

          <h3>
            Your live monitoring
            <br />
            dashboard, ready to go.
          </h3>

          <p>
            Air quality, AI vision, sound and location intelligence —
            all in one unified, real-time view.
          </p>

          <DashboardPreview />

        </motion.div>

      </div>

      {showSuccess && (
        <motion.div
          className="auth-success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={mode === "signup" ? closeSuccess : undefined}
        >

          <motion.div
            className="auth-success-card"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >

            <motion.div
              className="auth-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring" }}
            >
              <Check size={26} strokeWidth={3} />
            </motion.div>

            <h3>
              {mode === "login" ? "Login successful" : "Verify your email"}
            </h3>

            <p>
              {successMessage}
            </p>

            {mode === "signup" && (
              <button
                type="button"
                className="primary-button auth-submit"
                onClick={closeSuccess}
              >
                Continue to Login
                <ArrowRight size={16} />
              </button>
            )}

            {mode === "login" && (
              <div className="auth-success-bar">
                <motion.div
                  className="auth-success-bar-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "linear" }}
                />
              </div>
            )}

          </motion.div>

        </motion.div>
      )}

    </section>
  );
}



/* =========================================================
   LIVE DASHBOARD — SHARED HELPERS
========================================================= */

function pm25Status(v) {
  if (v <= 12) return "Good";
  if (v <= 35) return "Moderate";
  if (v <= 55) return "Poor";
  return "Unhealthy";
}

function statusClass(status) {
  if (status === "Good") return "good";
  if (status === "Unhealthy" || status === "Poor" || status === "Danger") return "danger";
  return "moderate";
}

function getIaqColor(iaq) {
  if (iaq <= 50) return "#16a34a";
  if (iaq <= 100) return "#84cc16";
  if (iaq <= 150) return "#eab308";
  if (iaq <= 200) return "#f97316";
  if (iaq <= 300) return "#ef4444";
  return "#991b1b";
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// No simulated/demo data — every value the dashboard shows comes only
// from the connected ESP32. Until it responds, fields stay null and
// render as "--".
const EMPTY_READING = {
  pm1: null,
  pm25: null,
  pm10: null,
  temperature: null,
  humidity: null,
  iaq: null,
  co2: null,
  voc: null,
  calibrating: false,
  iaqAccuracyText: null,
  ip: null,
  uptime: null,
  status: null,
};

const EMPTY_GPS = {
  lat: null,
  lng: null,
  alt: null,
  speed: null,
  course: null,
  sats: null,
  hdop: null,
  fix: null,
  time: null,
};

function fmt(v, decimals) {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return "--";
  return decimals === undefined ? String(v) : Number(v).toFixed(decimals);
}

function yVal(v, max) {
  return 194 - (v / max) * (194 - 14);
}

function buildPath(points) {
  if (!points.length) return "";

  let d = `M${points[0].x},${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const c = points[i];
    const m = (p.x + c.x) / 2;
    d += ` C${m},${p.y} ${m},${c.y} ${c.x},${c.y}`;
  }

  return d;
}

function buildAlerts(d, s) {
  const list = [];

  // No real reading yet — don't fabricate alerts.
  if (d.pm25 === null || d.pm25 === undefined) return list;

  function add(icon, title, message, level) {
    list.push({ icon, title, message, level });
  }

  if (Number(d.pm25) >= s.pm25Danger) {
    add("🚨", "PM2.5 danger level", `PM2.5 is ${d.pm25} µg/m³. Consider filtration and ventilation.`, "Danger");
  } else if (Number(d.pm25) >= s.pm25Warn) {
    add("⚠️", "PM2.5 warning", `PM2.5 is ${d.pm25} µg/m³. Air quality is becoming unhealthy.`, "Warning");
  }

  if (Number(d.pm10) >= s.pm10Danger) {
    add("🌪️", "PM10 danger level", `PM10 is ${d.pm10} µg/m³. Dust level is high.`, "Danger");
  } else if (Number(d.pm10) >= s.pm10Warn) {
    add("🌫️", "PM10 warning", `PM10 is ${d.pm10} µg/m³. Dust level is above your warning limit.`, "Warning");
  }

  if (Number(d.iaq) >= s.iaqDanger) {
    add("🛑", "IAQ danger level", `IAQ is ${Number(d.iaq).toFixed(0)}. Indoor air quality is unhealthy.`, "Danger");
  } else if (Number(d.iaq) >= s.iaqWarn) {
    add("⚠️", "IAQ warning", `IAQ is ${Number(d.iaq).toFixed(0)}. Air quality needs attention.`, "Warning");
  }

  if (Number(d.co2) >= s.co2Danger) {
    add("🫁", "CO2 danger level", `CO2 equivalent is ${Number(d.co2).toFixed(0)} ppm. Improve ventilation immediately.`, "Danger");
  } else if (Number(d.co2) >= s.co2Warn) {
    add("💨", "CO2 warning", `CO2 equivalent is ${Number(d.co2).toFixed(0)} ppm. Ventilation may be low.`, "Warning");
  }

  if (Number(d.voc) >= s.vocDanger) {
    add("🧪", "VOC danger level", `VOC equivalent is ${Number(d.voc).toFixed(2)} ppm. Possible chemical or odor source nearby.`, "Danger");
  } else if (Number(d.voc) >= s.vocWarn) {
    add("🧴", "VOC warning", `VOC equivalent is ${Number(d.voc).toFixed(2)} ppm. Check for perfumes, smoke, cleaners or solvents.`, "Warning");
  }

  if (Number(d.humidity) < s.humMin) {
    add("💧", "Low humidity", `Humidity is ${Number(d.humidity).toFixed(0)}%. Air may feel dry.`, "Warning");
  } else if (Number(d.humidity) > s.humMax) {
    add("💦", "High humidity", `Humidity is ${Number(d.humidity).toFixed(0)}%. Risk of discomfort or moisture buildup.`, "Warning");
  }

  if (Number(d.temperature) < s.tempMin) {
    add("❄️", "Low temperature", `Temperature is ${Number(d.temperature).toFixed(1)} °C. Room is below comfort limit.`, "Warning");
  } else if (Number(d.temperature) > s.tempMax) {
    add("🔥", "High temperature", `Temperature is ${Number(d.temperature).toFixed(1)} °C. Room is above comfort limit.`, "Warning");
  }

  if (list.length === 0) {
    add("✅", "All readings normal", "PM, IAQ, CO2, VOC, temperature and humidity are within the configured limits.", "Good");
  }

  add("📡", "Device status", "SmartSurround is serving live readings from the connected sensors.", "Info");

  return list;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: <Activity size={15} /> },
  { id: "airquality", label: "Air Quality", icon: <Wind size={15} /> },
  { id: "environment", label: "Environment", icon: <Thermometer size={15} /> },
  { id: "camera", label: "Camera", icon: <Video size={15} /> },
  { id: "location", label: "Location", icon: <MapPin size={15} /> },
  { id: "datalog", label: "Data Log", icon: <Table size={15} /> },
  { id: "alerts", label: "Alerts", icon: <Bell size={15} /> },
];

const DEFAULT_ALERT_SETTINGS = {
  pm25Warn: 35,
  pm25Danger: 55,
  pm10Warn: 80,
  pm10Danger: 150,
  iaqWarn: 100,
  iaqDanger: 200,
  co2Warn: 1000,
  co2Danger: 2000,
  vocWarn: 1.0,
  vocDanger: 2.0,
  humMin: 30,
  humMax: 70,
  tempMin: 18,
  tempMax: 32,
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? "" : "http://127.0.0.1:5000");
const BACKEND_DISPLAY_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

function accountStorageKey(prefix, uid) {
  return `${prefix}_${uid || "guest"}`;
}

function readAccountSettings(uid) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(accountStorageKey("smartsurround_account_settings", uid)) || "{}");
    return {
      appearance: "system",
      notifications: true,
      emailNotifications: true,
      language: "English",
      compactMode: false,
      ...saved,
    };
  } catch {
    return {
      appearance: "system",
      notifications: true,
      emailNotifications: true,
      language: "English",
      compactMode: false,
    };
  }
}

function readLocalAvatar(uid) {
  try {
    return window.localStorage.getItem(accountStorageKey("smartsurround_avatar", uid)) || "";
  } catch {
    return "";
  }
}

function saveLocalAvatar(uid, value) {
  try {
    window.localStorage.setItem(accountStorageKey("smartsurround_avatar", uid), value);
  } catch {
    // Storage may be unavailable/private mode; Firebase photoURL still works.
  }
}

function ProfileAvatar({ user, size = 44, className = "" }) {
  const [localAvatar, setLocalAvatar] = React.useState(() => readLocalAvatar(user?.id));
  React.useEffect(() => {
    setLocalAvatar(readLocalAvatar(user?.id));
  }, [user?.id, user?.photoURL]);

  const src = user?.photoURL || localAvatar;
  return (
    <span
      className={`account-avatar-button ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {src ? (
        <img src={src} alt="Profile" />
      ) : (
        <User size={Math.max(15, Math.round(size * 0.42))} />
      )}
    </span>
  );
}

function AccountMenu({ onSelect, onLogout }) {
  return (
    <motion.div
      className="account-dropdown"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.16 }}
    >
      <div className="account-dropdown-head">
        <div className="account-dropdown-icon"><UserRound size={16} /></div>
        <div>
          <strong>Account</strong>
          <span>Manage your SmartSurround account</span>
        </div>
      </div>
      <div className="account-menu-list">
        <button type="button" onClick={() => onSelect("profile")}>
          <span className="account-menu-icon"><UserRound size={16} /></span>
          <span><strong>Update Profile</strong><small>Personal information & avatar</small></span>
          <ChevronDown size={14} className="account-menu-chevron" />
        </button>
        <button type="button" onClick={() => onSelect("help")}>
          <span className="account-menu-icon"><HelpCircle size={16} /></span>
          <span><strong>Help Desk</strong><small>Complaints & ticket status</small></span>
          <ChevronDown size={14} className="account-menu-chevron" />
        </button>
        <button type="button" onClick={() => onSelect("settings")}>
          <span className="account-menu-icon"><Settings size={16} /></span>
          <span><strong>Settings</strong><small>Appearance & preferences</small></span>
          <ChevronDown size={14} className="account-menu-chevron" />
        </button>
        <div className="account-menu-divider" />
        <button type="button" className="account-menu-danger" onClick={onLogout}>
          <span className="account-menu-icon"><LogOut size={16} /></span>
          <span><strong>Logout</strong><small>Sign out of this dashboard</small></span>
          <ChevronDown size={14} className="account-menu-chevron" />
        </button>
      </div>
    </motion.div>
  );
}

function LogoutConfirmDialog({ onCancel, onConfirm, loading = false }) {
  return (
    <div className="account-confirm-backdrop" role="presentation">
      <motion.div
        className="account-confirm-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="account-confirm-icon"><LogOut size={20} /></div>
        <h3 id="logout-confirm-title">Are you sure you want to log out?</h3>
        <p>Your active SmartSurround session will be cleared.</p>
        <div className="account-confirm-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={loading}>Cancel</button>
          <button type="button" className="primary-button account-danger-button" onClick={onConfirm} disabled={loading}>
            <LogOut size={15} /> {loading ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AccountPanel({ currentUser, section, onClose, onUserUpdated, onAppearanceChange, onLogout, embedded = false }) {
  const [activeSection, setActiveSection] = React.useState(section || "profile");
  const [settings, setSettings] = React.useState(() => readAccountSettings(currentUser?.id));
  const [form, setForm] = React.useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: (() => {
      try { return window.localStorage.getItem(accountStorageKey("smartsurround_phone", currentUser?.id)) || ""; } catch { return ""; }
    })(),
    currentPassword: "",
    newPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = React.useState(currentUser?.photoURL || readLocalAvatar(currentUser?.id));
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [profileMessage, setProfileMessage] = React.useState({ type: "", text: "" });
  const [complaints, setComplaints] = React.useState([]);
  const [complaintForm, setComplaintForm] = React.useState({ subject: "", description: "", priority: "Normal" });
  const [attachment, setAttachment] = React.useState(null);
  const [loadingComplaints, setLoadingComplaints] = React.useState(false);
  const [submittingComplaint, setSubmittingComplaint] = React.useState(false);
  const [helpMessage, setHelpMessage] = React.useState({ type: "", text: "" });
  const [lastTicket, setLastTicket] = React.useState("");
  const [savingSettings, setSavingSettings] = React.useState(false);

  React.useEffect(() => {
    setActiveSection(section || "profile");
  }, [section]);

  React.useEffect(() => {
    if (!currentUser?.id) return;
    setSettings(readAccountSettings(currentUser.id));
    setForm((prev) => ({ ...prev, name: currentUser.name || prev.name, email: currentUser.email || prev.email }));
    setAvatarPreview(currentUser.photoURL || readLocalAvatar(currentUser.id));
  }, [currentUser?.id, currentUser?.name, currentUser?.email, currentUser?.photoURL]);

  const loadComplaints = React.useCallback(async () => {
    if (!currentUser?.id) return;
    setLoadingComplaints(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/complaints?user_id=${encodeURIComponent(currentUser.id)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Unable to load your complaints.");
      setComplaints(Array.isArray(data.complaints) ? data.complaints : []);
    } catch (err) {
      const networkError = err?.name === "TypeError" && /fetch/i.test(err?.message || "");
      setHelpMessage({
        type: "error",
        text: networkError
          ? `Help Desk server is unavailable. Start the SmartSurround backend at ${BACKEND_DISPLAY_URL} and try Refresh again.`
          : (err.message || "Unable to load Help Desk history."),
      });
    } finally {
      setLoadingComplaints(false);
    }
  }, [currentUser?.id]);

  React.useEffect(() => {
    if (activeSection === "help") loadComplaints();
  }, [activeSection, loadComplaints]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileMessage({ type: "error", text: "Please select an image file." });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setProfileMessage({ type: "error", text: "Profile pictures must be 2 MB or smaller." });
      return;
    }
    setAvatarFile(file);
    setProfileMessage({ type: "", text: "" });
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const authUser = firebaseAuth.currentUser;
    if (!authUser) {
      setProfileMessage({ type: "error", text: "Your session has expired. Please sign in again." });
      return;
    }
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name) {
      setProfileMessage({ type: "error", text: "Full Name is required." });
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setProfileMessage({ type: "error", text: "Enter a valid email address." });
      return;
    }
    if (form.newPassword && form.newPassword.length < 6) {
      setProfileMessage({ type: "error", text: "New password must contain at least 6 characters." });
      return;
    }
    if ((email !== authUser.email || form.newPassword) && !form.currentPassword) {
      setProfileMessage({ type: "error", text: "Enter your current password to change email or password." });
      return;
    }

    setSavingProfile(true);
    setProfileMessage({ type: "", text: "" });
    try {
      if ((email !== authUser.email || form.newPassword) && form.currentPassword) {
        const credential = EmailAuthProvider.credential(authUser.email || form.email, form.currentPassword);
        await reauthenticateWithCredential(authUser, credential);
      }

      if (email !== authUser.email) await updateEmail(authUser, email);
      if (form.newPassword) await updatePassword(authUser, form.newPassword);

      let photoURL = authUser.photoURL || "";
      let localAvatarValue = "";
      let avatarStorageFallback = false;
      if (avatarFile) {
        try {
          const ext = avatarFile.name.split(".").pop()?.toLowerCase() || "jpg";
          const avatarRef = storageRef(firebaseStorage, `profile-avatars/${authUser.uid}/${Date.now()}.${ext}`);
          const uploaded = await uploadBytes(avatarRef, avatarFile, { contentType: avatarFile.type });
          photoURL = await getDownloadURL(uploaded.ref);
        } catch {
          // Keep the profile usable even if Firebase Storage rules are not enabled yet.
          const fallbackReader = new FileReader();
          localAvatarValue = String(await new Promise((resolve, reject) => {
            fallbackReader.onload = () => resolve(String(fallbackReader.result || ""));
            fallbackReader.onerror = reject;
            fallbackReader.readAsDataURL(avatarFile);
          }) || "");
          avatarStorageFallback = true;
        }
      }

      await updateProfile(authUser, { displayName: name, photoURL: photoURL || null });
      if (photoURL) saveLocalAvatar(authUser.uid, photoURL);
      if (localAvatarValue) saveLocalAvatar(authUser.uid, localAvatarValue);
      try { window.localStorage.setItem(accountStorageKey("smartsurround_phone", authUser.uid), form.phone.trim()); } catch {}
      await reload(authUser);

      const updatedUser = {
        id: authUser.uid,
        name: authUser.displayName || name,
        email: authUser.email || email,
        photoURL: authUser.photoURL || photoURL || localAvatarValue || readLocalAvatar(authUser.uid),
      };
      onUserUpdated(updatedUser);
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "", email: updatedUser.email, name: updatedUser.name }));
      setAvatarFile(null);
      setProfileMessage({
        type: "success",
        text: avatarStorageFallback
          ? "Profile saved. Avatar is stored locally because Firebase Storage is not currently available."
          : "Profile updated successfully.",
      });
    } catch (err) {
      console.error("Profile update error:", err);
      const code = err?.code || "";
      const text = code === "auth/email-already-in-use"
        ? "That email address is already in use."
        : code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "Current password is incorrect."
          : code === "auth/requires-recent-login"
            ? "Please sign in again before changing sensitive account details."
            : err?.message || "Unable to update your profile.";
      setProfileMessage({ type: "error", text });
    } finally {
      setSavingProfile(false);
    }
  };

  const submitComplaint = async (event) => {
    event.preventDefault();
    const subject = complaintForm.subject.trim();
    const description = complaintForm.description.trim();
    if (!subject || !description) {
      setHelpMessage({ type: "error", text: "Subject and detailed description are required." });
      return;
    }
    if (description.length < 10) {
      setHelpMessage({ type: "error", text: "Please provide at least 10 characters of detail." });
      return;
    }
    setSubmittingComplaint(true);
    setHelpMessage({ type: "", text: "" });
    try {
      const data = new FormData();
      data.append("user_id", currentUser.id);
      data.append("user_name", currentUser.name || "User");
      data.append("email", currentUser.email || "");
      data.append("subject", subject);
      data.append("description", description);
      data.append("priority", complaintForm.priority);
      if (attachment) data.append("attachment", attachment);

      // Capture the reporting device's current GPS at submission time.
      // This is authoritative incident location data and is never typed manually.
      if (navigator.geolocation) {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              data.append("incident_latitude", String(position.coords.latitude));
              data.append("incident_longitude", String(position.coords.longitude));
              if (position.coords.accuracy != null) data.append("incident_accuracy", String(position.coords.accuracy));
              data.append("incident_gps_time", new Date(position.timestamp || Date.now()).toISOString());
              resolve();
            },
            () => resolve(),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
          );
        });
      }

      const response = await fetch(`${BACKEND_URL}/api/complaints`, { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Unable to submit complaint.");
      const ticket = result.complaint?.ticket_id || "";
      setLastTicket(ticket);
      setComplaintForm({ subject: "", description: "", priority: "Normal" });
      setAttachment(null);
      const fileInput = document.getElementById("account-help-attachment");
      if (fileInput) fileInput.value = "";
      setHelpMessage({ type: "success", text: ticket ? `Complaint submitted successfully. Ticket ${ticket} has been created.` : "Complaint submitted successfully." });
      await loadComplaints();
    } catch (err) {
      const networkError = err?.name === "TypeError" && /fetch/i.test(err?.message || "");
      setHelpMessage({
        type: "error",
        text: networkError
          ? `Unable to reach the Help Desk server at ${BACKEND_DISPLAY_URL}. Start the backend and try again.`
          : (err.message || "Unable to submit complaint."),
      });
    } finally {
      setSubmittingComplaint(false);
    }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      window.localStorage.setItem(accountStorageKey("smartsurround_account_settings", currentUser.id), JSON.stringify(settings));
      onAppearanceChange(settings.appearance);
      setHelpMessage({ type: "success", text: "Preferences saved successfully." });
      window.setTimeout(() => setHelpMessage((m) => m.text === "Preferences saved successfully." ? { type: "", text: "" } : m), 2200);
    } catch {
      setHelpMessage({ type: "error", text: "Unable to save preferences in this browser." });
    } finally {
      setSavingSettings(false);
    }
  };

  const sectionTitle = {
    profile: "Update Profile",
    help: "Help Desk",
    settings: "Settings",
  }[activeSection];

  const sectionDescription = {
    profile: "Manage your SmartSurround account information and profile picture.",
    help: "Submit a complaint, track its status, and read administrator replies.",
    settings: "Control the appearance and general dashboard preferences.",
  }[activeSection];

  const statusTone = (status) => {
    const value = String(status || "Open").toLowerCase();
    if (value === "resolved" || value === "closed") return "success";
    if (value === "in progress") return "warning";
    return "neutral";
  };

  return (
    <div className={embedded ? "account-page" : "account-panel-backdrop"} onMouseDown={(e) => { if (!embedded && e.target === e.currentTarget) onClose(); }}>
      <motion.div
        className={embedded ? "account-panel account-panel-embedded" : "account-panel"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-panel-title"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="account-panel-header">
          <div>
            <div className="small-label">ACCOUNT MANAGEMENT</div>
            <h2 id="account-panel-title">{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>
          <button type="button" className="account-close-button" onClick={onClose} aria-label="Close account management">
            <X size={18} />
          </button>
        </div>

        <div className="account-panel-body">
          <aside className="account-panel-nav account-panel-nav-settings-only">
            <button className={activeSection === "settings" ? "active" : ""} onClick={() => setActiveSection("settings")} type="button">
              <Settings size={17} /> Settings
            </button>
            <div className="account-panel-nav-divider" />
            <button className="account-panel-logout-link" onClick={onLogout} type="button">
              <LogOut size={17} /> Logout
            </button>
            <div className="account-panel-nav-note">Your profile, support tickets and preferences stay connected to this account.</div>
          </aside>

          <section className="account-panel-content">
            {activeSection === "profile" && (
              <form onSubmit={saveProfile} className="account-form">
                <div className="account-profile-hero">
                  <div className="account-profile-avatar-wrap">
                    {avatarPreview ? <img src={avatarPreview} alt="Profile preview" /> : <UserRound size={34} />}
                    <label className="account-avatar-upload" htmlFor="account-avatar-input" title="Change profile picture">
                      <Upload size={14} />
                    </label>
                    <input id="account-avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                  </div>
                  <div>
                    <strong>{form.name || "Your Name"}</strong>
                    <span>{form.email || "your@email.com"}</span>
                    <small>JPG, PNG, WEBP • Max 2 MB</small>
                  </div>
                </div>

                {profileMessage.text && <div className={`account-message ${profileMessage.type}`}>{profileMessage.text}</div>}

                <div className="account-form-grid">
                  <label><span>Full Name</span><input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Full Name" autoComplete="name" /></label>
                  <label><span>Email</span><input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="name@example.com" autoComplete="email" /></label>
                  <label><span>Phone Number</span><input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone number" autoComplete="tel" /></label>
                  <div className="account-field-spacer" />
                  <label><span>Current Password <em>required for password/email changes</em></span><input type="password" value={form.currentPassword} onChange={(e) => updateField("currentPassword", e.target.value)} placeholder="Current password" autoComplete="current-password" /></label>
                  <label><span>New Password</span><input type="password" value={form.newPassword} onChange={(e) => updateField("newPassword", e.target.value)} placeholder="Leave blank to keep current" autoComplete="new-password" /></label>
                </div>

                <div className="account-form-footer">
                  <span>Password changes use Firebase Authentication security checks.</span>
                  <div>
                    <button type="button" className="secondary-button" onClick={onClose} disabled={savingProfile}>Cancel</button>
                    <button type="submit" className="primary-button" disabled={savingProfile}>{savingProfile ? "Saving..." : "Save Changes"}</button>
                  </div>
                </div>
              </form>
            )}

            {activeSection === "help" && (
              <div className="account-help-layout">
                <form className="account-help-form" onSubmit={submitComplaint}>
                  <div className="account-section-heading"><MessageSquare size={18} /><div><strong>Submit a complaint</strong><span>Tell the administrator what needs attention.</span></div></div>
                  {helpMessage.text && <div className={`account-message ${helpMessage.type}`}>{helpMessage.text}</div>}
                  {lastTicket && <div className="account-ticket-callout"><CheckCircle2 size={17} /><div><strong>Ticket created</strong><span>{lastTicket}</span></div></div>}
                  <label><span>Subject / Complaint Title</span><input maxLength={160} value={complaintForm.subject} onChange={(e) => setComplaintForm((f) => ({ ...f, subject: e.target.value }))} placeholder="What do you need help with?" /></label>
                  <label><span>Detailed Description</span><textarea maxLength={8000} rows={6} value={complaintForm.description} onChange={(e) => setComplaintForm((f) => ({ ...f, description: e.target.value }))} placeholder="Describe the issue clearly..." /></label>
                  <div className="account-form-grid compact">
                    <label><span>Priority</span><select value={complaintForm.priority} onChange={(e) => setComplaintForm((f) => ({ ...f, priority: e.target.value }))}><option>Normal</option><option>Intermediate</option><option>Urgent</option></select></label>
                    <label><span>Attachment <em>optional</em></span><div className="account-file-input"><Paperclip size={15} /><input id="account-help-attachment" type="file" accept="image/*,.pdf,.txt" onChange={(e) => setAttachment(e.target.files?.[0] || null)} /><span>{attachment?.name || "Choose file"}</span></div></label>
                  </div>
                  <button type="submit" className="primary-button" disabled={submittingComplaint}><Send size={15} /> {submittingComplaint ? "Submitting..." : "Submit Complaint"}</button>
                </form>

                <div className="account-complaints-list">
                  <div className="account-section-heading"><Clock3 size={18} /><div><strong>My complaints</strong><span>Track tickets submitted from this account.</span></div><button type="button" className="icon-text-button" onClick={loadComplaints} disabled={loadingComplaints}>{loadingComplaints ? "Loading..." : "Refresh"}</button></div>
                  {loadingComplaints && complaints.length === 0 ? <div className="account-empty-state">Loading your tickets...</div> : complaints.length === 0 ? <div className="account-empty-state"><HelpCircle size={28} /><strong>No complaints yet</strong><span>Your submitted tickets will appear here.</span></div> : complaints.map((ticket) => (
                    <article key={ticket.id} className={`complaint-card priority-${String(ticket.priority || "Normal").toLowerCase()}`}>
                      <div className="complaint-card-top"><div><strong>{ticket.subject}</strong><span>{ticket.ticket_id}</span></div><span className={`complaint-priority ${String(ticket.priority || "Normal").toLowerCase()}`}>{ticket.priority}</span></div>
                      <p>{ticket.description}</p>
                      <div className="complaint-card-meta"><span className={`complaint-status ${statusTone(ticket.status)}`}>{ticket.status}</span><span>{new Date(ticket.created_at).toLocaleString()}</span></div>
                      {ticket.admin_reply && <div className="complaint-reply"><strong>Admin reply</strong><p>{ticket.admin_reply}</p></div>}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="account-settings">
                {helpMessage.text && <div className={`account-message ${helpMessage.type}`}>{helpMessage.text}</div>}
                <div className="account-setting-group">
                  <div className="account-setting-heading"><strong>Appearance</strong><span>Choose how the SmartSurround dashboard looks on this device.</span></div>
                  <div className="appearance-options">
                    {[
                      ["light", "Light Mode", Sun],
                      ["dark", "Dark Mode", Moon],
                      ["system", "System Default", Monitor],
                    ].map(([value, label, Icon]) => (
                      <button
                        type="button"
                        key={value}
                        className={settings.appearance === value ? "selected" : ""}
                        onClick={() => {
                          setSettings((s) => ({ ...s, appearance: value }));
                          try {
                            const existing = readAccountSettings(currentUser.id);
                            window.localStorage.setItem(
                              accountStorageKey("smartsurround_account_settings", currentUser.id),
                              JSON.stringify({ ...existing, appearance: value })
                            );
                          } catch {}
                          onAppearanceChange(value);
                        }}
                      >
                        <Icon size={18} /><strong>{label}</strong><span>{value === "system" ? "Follow your device" : value === "dark" ? "Use a dark interface" : "Use the current light interface"}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="account-setting-group">
                  <div className="account-setting-heading"><strong>Notifications</strong><span>Control how account and support updates are handled.</span></div>
                  <label className="setting-toggle-row"><div><strong>Dashboard notifications</strong><span>Show important SmartSurround alerts and account notices.</span></div><button type="button" className={`toggle-switch ${settings.notifications ? "on" : ""}`} onClick={() => setSettings((s) => ({ ...s, notifications: !s.notifications }))}><span /></button></label>
                  <label className="setting-toggle-row"><div><strong>Email notifications</strong><span>Allow email notifications for Help Desk updates when supported.</span></div><button type="button" className={`toggle-switch ${settings.emailNotifications ? "on" : ""}`} onClick={() => setSettings((s) => ({ ...s, emailNotifications: !s.emailNotifications }))}><span /></button></label>
                </div>
                <div className="account-setting-group">
                  <div className="account-setting-heading"><strong>Language</strong><span>Choose the dashboard language when translations are available.</span></div>
                  <select className="account-language-select" value={settings.language} onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}><option>English</option><option>Hindi</option><option>Bengali</option></select>
                </div>
                <div className="account-form-footer"><span>Preferences are stored for this account on this browser.</span><button type="button" className="primary-button" onClick={saveSettings} disabled={savingSettings}><Save size={15} /> {savingSettings ? "Saving..." : "Save Settings"}</button></div>
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
}


/* =========================================================
   LIVE READING PAGE (INTERNAL, POST-LOGIN)
========================================================= */

function LiveReadingPage({ currentUser, onLogout, onBackToSite, onUserUpdated }) {

  const [activePage, setActivePage] = React.useState("overview");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const [accountPanelSection, setAccountPanelSection] = React.useState("profile");
  const [accountPanelOpen, setAccountPanelOpen] = React.useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [appearance, setAppearance] = React.useState(() => readAccountSettings(currentUser?.id).appearance);
  const [systemDark, setSystemDark] = React.useState(() => (
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  ));
  const accountAreaRef = React.useRef(null);

  React.useEffect(() => {
    setAppearance(readAccountSettings(currentUser?.id).appearance);
  }, [currentUser?.id]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => setSystemDark(event.matches);
    setSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener?.("change", handleSystemThemeChange);
  }, []);

  React.useEffect(() => {
    const handleOutside = (event) => {
      if (accountAreaRef.current && !accountAreaRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isDarkTheme = appearance === "dark" || (appearance === "system" && systemDark);
  const isAccountPage = accountPanelOpen && activePage.startsWith("account-");

  const openAccountSection = (section) => {
    setAccountMenuOpen(false);
    setAccountPanelSection(section);
    setAccountPanelOpen(true);
    setActivePage(`account-${section}`);
    setMenuOpen(false);
  };

  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      await onLogout();
    } finally {
      setLoggingOut(false);
      setLogoutConfirmOpen(false);
    }
  };

  // ESP32 connection: enter the board's local IP (e.g. 192.168.1.42) to pull
  // real sensor data instead of the simulated demo values.
  const [esp32Ip, setEsp32Ip] = React.useState(
    () => (typeof window !== "undefined" && window.localStorage.getItem("esp32Ip")) || ""
  );
  const [esp32Input, setEsp32Input] = React.useState(esp32Ip);
  const [connectionStatus, setConnectionStatus] = React.useState(
    esp32Ip ? "connecting" : "disconnected"
  ); // "disconnected" | "connecting" | "connected" | "error"
  const lastFirebaseUpdate = React.useRef(0);
  const [latest, setLatest] = React.useState(EMPTY_READING);
  const [gps, setGps] = React.useState(EMPTY_GPS);
  const [cameraOnline, setCameraOnline] = React.useState(false);
  const [camIp, setCamIp] = React.useState(null);
  const [pmHistory, setPmHistory] = React.useState([]);

  const [logRows, setLogRows] = React.useState([]);
  const [loggerRunning, setLoggerRunning] = React.useState(false);
  const [loggerInterval, setLoggerInterval] = React.useState(5000);
  const [exportName, setExportName] = React.useState("air_quality_log");

  const [alertSettings, setAlertSettings] = React.useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("smartsurround_alert_settings"));
      return saved ? { ...DEFAULT_ALERT_SETTINGS, ...saved } : DEFAULT_ALERT_SETTINGS;
    } catch (e) {
      return DEFAULT_ALERT_SETTINGS;
    }
  });

  const latestRef = React.useRef(latest);
  React.useEffect(() => {
    latestRef.current = latest;
  }, [latest]);

  // Share the real device GPS with the admin control center. This uses the
  // existing Firebase Auth identity and never asks the user to type a location.
  React.useEffect(() => {
    if (!currentUser?.id || typeof navigator === "undefined" || !navigator.geolocation) return;

    let stopped = false;

    const api = (path) => `${BACKEND_URL}${path}`;

    const getUserToken = async () => {
      const authUser = firebaseAuth.currentUser;
      if (!authUser) return null;
      try {
        return await authUser.getIdToken();
      } catch (err) {
        console.error("Unable to obtain Firebase ID token for location sync:", err);
        return null;
      }
    };

    const syncUser = async () => {
      const token = await getUserToken();
      if (!token || stopped) return;
      try {
        await fetch(api("/api/user/sync"), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: currentUser.name || "",
            email: currentUser.email || "",
            status: "Working",
          }),
          cache: "no-store",
        });
      } catch (err) {
        console.debug("User sync unavailable:", err);
      }
    };

    const sendLocation = async (position) => {
      if (stopped) return;
      const token = await getUserToken();
      if (!token || stopped) return;
      try {
        const response = await fetch(api("/api/user/location"), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp || Date.now()).toISOString(),
            status: "working",
          }),
          cache: "no-store",
        });
        if (!response.ok) {
          console.debug("GPS sync rejected:", response.status);
        }
      } catch (err) {
        console.debug("GPS sync unavailable:", err);
      }
    };

    syncUser();

    const watchId = navigator.geolocation.watchPosition(
      sendLocation,
      (error) => {
        if (error?.code === 1) {
          console.info("Location permission denied; SmartSurround will not track browser GPS.");
        } else {
          console.debug("Location update unavailable:", error?.message);
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      }
    );

    const heartbeat = window.setInterval(() => {
      syncUser();
    }, 60000);

    return () => {
      stopped = true;
      navigator.geolocation.clearWatch(watchId);
      window.clearInterval(heartbeat);
    };
  }, [currentUser?.id, currentUser?.name, currentUser?.email]);

  // Persist real sensor readings for the admin reports workspace. No reading
  // is written until the Firebase dashboard has actually received a value.
  React.useEffect(() => {
    if (!currentUser?.id || typeof window === "undefined") return;
    const interval = window.setInterval(async () => {
      const reading = latestRef.current;
      if (!reading || Object.values(reading).every((v) => v === null || v === undefined || v === false || v === "")) return;
      const authUser = firebaseAuth.currentUser;
      if (!authUser) return;
      try {
        const token = await authUser.getIdToken();
        await fetch(`${BACKEND_URL}/api/user/environment`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...reading,
            device_id: reading.ip || "firebase-sensors",
            timestamp: new Date().toISOString(),
          }),
          cache: "no-store",
        });
      } catch (err) {
        console.debug("Environment sync unavailable:", err);
      }
    }, 15000);
    return () => window.clearInterval(interval);
  }, [currentUser?.id]);

  function handleConnect(e) {
    e.preventDefault();

    const trimmed = esp32Input.trim();

    setEsp32Ip(trimmed);

    if (typeof window !== "undefined") {
      if (trimmed) {
        window.localStorage.setItem("esp32Ip", trimmed);
      } else {
        window.localStorage.removeItem("esp32Ip");
      }
    }
  }

  function handleDisconnect() {
    setEsp32Ip("");
    setEsp32Input("");

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("esp32Ip");
    }
  }

  // =========================================================
  // FIREBASE REALTIME SENSOR DATA
  // ESP32 → Firebase Realtime Database → React dashboard
  //
  // Supports either of these Firebase layouts:
  //   /sensors/{...}
  //   /{temperature, humidity, pm25, ...}
  // GPS may be stored as /gps or /sensors/gps.
  // =========================================================
  React.useEffect(() => {
    const databaseRef = ref(db);

    const unsubscribe = onValue(
      databaseRef,
      (snapshot) => {
        const root = snapshot.val();

        lastFirebaseUpdate.current = Date.now();

        if (!root || typeof root !== "object") {
          setLatest(EMPTY_READING);
          setGps(EMPTY_GPS);
          setCameraOnline(false);
          setCamIp(null);
          setConnectionStatus("disconnected");
          return;
        }

        // If your ESP32 stores readings under /sensors, use that.
        // Otherwise use the database root directly.
        const source =
          root.sensors && typeof root.sensors === "object"
            ? root.sensors
            : root;

        const toNumberOrNull = (value) => {
          if (value === null || value === undefined || value === "") return null;
          const number = Number(value);
          return Number.isFinite(number) ? number : null;
        };

        const nextReading = {
          ...EMPTY_READING,

          pm1: toNumberOrNull(source.pm1),
          pm25: toNumberOrNull(source.pm25),
          pm10: toNumberOrNull(source.pm10),

          temperature: toNumberOrNull(source.temperature),
          humidity: toNumberOrNull(source.humidity),

          iaq: toNumberOrNull(source.iaq ?? source.iaqScore),
          co2: toNumberOrNull(source.co2 ?? source.co2Equivalent),
          voc: toNumberOrNull(source.voc ?? source.vocEquivalent),

          calibrating:
            source.calibrating !== undefined
              ? Boolean(source.calibrating)
              : false,

          iaqAccuracyText:
            source.iaqAccuracyText ?? source.iaqAccuracy ?? null,

          ip: source.ip ?? root.ip ?? null,
          uptime: toNumberOrNull(source.uptime),
          status: source.status ?? null,
        };

        setLatest(nextReading);

        // ---------------------------------------------------
        // GPS
        // ---------------------------------------------------
        const gpsSource =
          (source.gps && typeof source.gps === "object" && source.gps) ||
          (root.gps && typeof root.gps === "object" && root.gps) ||
          null;

        if (gpsSource) {
          setGps({
            lat: toNumberOrNull(
              gpsSource.latitude ?? gpsSource.lat
            ),
            lng: toNumberOrNull(
              gpsSource.longitude ?? gpsSource.lng ?? gpsSource.lon
            ),
            alt: toNumberOrNull(
              gpsSource.altitude ?? gpsSource.alt
            ),
            speed: toNumberOrNull(gpsSource.speed),
            course: toNumberOrNull(gpsSource.course),
            sats: toNumberOrNull(
              gpsSource.satellites ?? gpsSource.sats
            ),
            hdop: toNumberOrNull(gpsSource.hdop),
            fix: gpsSource.fix ?? null,
            time: gpsSource.time ?? null,
          });
        } else {
          // Also support flat GPS fields.
          const hasFlatGps =
            source.latitude !== undefined ||
            source.longitude !== undefined ||
            source.gpsValid !== undefined;

          if (hasFlatGps) {
            setGps({
              lat: toNumberOrNull(source.latitude),
              lng: toNumberOrNull(source.longitude),
              alt: toNumberOrNull(source.altitude),
              speed: toNumberOrNull(source.speed),
              course: toNumberOrNull(source.course),
              sats: toNumberOrNull(source.satellites),
              hdop: toNumberOrNull(source.hdop),
              fix:
                source.gpsValid === true
                  ? "Valid"
                  : source.gpsValid === false
                    ? "No Fix"
                    : null,
              time: source.gpsTime ?? null,
            });
          } else {
            setGps(EMPTY_GPS);
          }
        }

        // ---------------------------------------------------
        // Camera status
        // ---------------------------------------------------
        const cameraSource =
          source.camera && typeof source.camera === "object"
            ? source.camera
            : root.camera && typeof root.camera === "object"
              ? root.camera
              : null;

        const firebaseCamIp =
          source.camIp ??
          source.cameraIp ??
          cameraSource?.ip ??
          cameraSource?.camIp ??
          root.camIp ??
          null;

        const firebaseCameraOnline =
          source.cameraOnline ??
          cameraSource?.online ??
          root.cameraOnline;

        if (firebaseCamIp) setCamIp(String(firebaseCamIp));
        if (firebaseCameraOnline !== undefined) {
          setCameraOnline(Boolean(firebaseCameraOnline));
        }

        setConnectionStatus("connected");
      },
      (error) => {
        console.error("Firebase Realtime Database error:", error);
        setConnectionStatus("error");
      }
    );

    return () => unsubscribe();
  }, []);
  // =========================================================
  // ESP32 CONNECTION TIMEOUT
  // If Firebase stops receiving ESP32 updates for 15 seconds,
  // consider the ESP32 disconnected and clear old readings.
  // =========================================================
  React.useEffect(() => {
    const checkConnection = setInterval(() => {
      const lastUpdate = lastFirebaseUpdate.current;

      // No Firebase data has arrived yet
      if (lastUpdate === 0) {
        return;
      }

      const timeSinceLastUpdate = Date.now() - lastUpdate;

      // ESP32 normally updates every few seconds.
      // 15 seconds without an update = disconnected.
      if (timeSinceLastUpdate > 15000) {
        setConnectionStatus("disconnected");

        // Clear stale sensor values
        setLatest(EMPTY_READING);
        setGps(EMPTY_GPS);

        // Clear camera status
        setCameraOnline(false);
        setCamIp(null);
      }
    }, 3000);

    return () => clearInterval(checkConnection);
  }, []);
  // Roll a PM history buffer for the Air Quality chart — only once real
  // readings start arriving.
  React.useEffect(() => {
    if (latest.pm1 === null && latest.pm25 === null && latest.pm10 === null) return;

    setPmHistory((prev) => {
      const next = [
        ...prev,
        {
          label: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          pm1: Number(latest.pm1) || 0,
          pm25: Number(latest.pm25) || 0,
          pm10: Number(latest.pm10) || 0,
        },
      ];

      return next.slice(-30);
    });
  }, [latest]);

  // Data logger — only logs real readings, and only while connected.
  React.useEffect(() => {

    if (!loggerRunning || connectionStatus !== "connected") return;

    const interval = setInterval(() => {
      setLogRows((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          ...latest,
        },
        ...prev,
      ]);
    }, loggerInterval);

    return () => clearInterval(interval);

  }, [loggerRunning, loggerInterval, latest, connectionStatus]);

  function saveAlertSettings(next) {
    setAlertSettings(next);
    window.localStorage.setItem("smartsurround_alert_settings", JSON.stringify(next));
  }

  function resetAlertSettings() {
    setAlertSettings(DEFAULT_ALERT_SETTINGS);
    window.localStorage.removeItem("smartsurround_alert_settings");
  }

  const alerts = React.useMemo(() => buildAlerts(latest, alertSettings), [latest, alertSettings]);

  function exportLogExcel() {

    let html =
      "<html><head><meta charset='UTF-8'></head><body><table border='1'><tr><th colspan='9'>SmartSurround Air Quality Log</th></tr>";

    html +=
      "<tr><th>Time</th><th>PM1</th><th>PM2.5</th><th>PM10</th><th>Temp</th><th>Humidity</th><th>IAQ</th><th>CO2</th><th>VOC</th></tr>";

    logRows.forEach((r) => {
      html += `<tr><td>${r.time}</td><td>${r.pm1}</td><td>${r.pm25}</td><td>${r.pm10}</td><td>${Number(r.temperature).toFixed(1)}</td><td>${Number(r.humidity).toFixed(1)}</td><td>${Number(r.iaq).toFixed(0)}</td><td>${Number(r.co2).toFixed(0)}</td><td>${Number(r.voc).toFixed(2)}</td></tr>`;
    });

    html += "</table></body></html>";

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const name = (exportName || "air_quality_log").replace(/[^a-z0-9_-]/gi, "_");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name + ".xls";
    a.click();
  }

  const statusLabel =
    connectionStatus === "connected"
      ? "ESP32 LIVE"
      : connectionStatus === "connecting"
        ? "CONNECTING..."
        : connectionStatus === "error"
          ? "ESP32 UNREACHABLE"
          : "NOT CONNECTED";

  return (
    <div className={`live-shell${isDarkTheme ? " theme-dark" : ""}`}>

      <aside className={"live-sidebar" + (menuOpen ? " open" : "")}>

        {menuOpen && (
          <button
            type="button"
            className="live-sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        )}

        <div className="side-logo">
          <div className="mini-logo">
            <Activity size={14} />
          </div>
          <span>SmartSurround</span>
        </div>

        <div className="sidebar-title">MONITORING</div>

        {NAV_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={"side-link" + (activePage === item.id ? " active" : "")}
            onClick={() => {
              setAccountPanelOpen(false);
              setActivePage(item.id);
              setMenuOpen(false);
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="sidebar-title second-title">SYSTEM</div>

        <button
          type="button"
          className={"side-link" + (activePage === "safety" ? " active" : "")}
          onClick={() => {
            setAccountPanelOpen(false);
            setActivePage("safety");
            setMenuOpen(false);
          }}
        >
          <ShieldCheck size={15} />
          Safety
        </button>

        <div className="sidebar-footer-card">
          <div className="sidebar-footer-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <span>AI Intelligence</span>
            <strong>Enabled</strong>
          </div>
        </div>

      </aside>

      <div className="live-main-area">

        <div className="live-topbar">

          <button
            type="button"
            className="live-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>

          <div className="dashboard-url">
            smartsurround / {activePage}
          </div>

          <div className="live-topbar-right">

            <div className={`dashboard-status live-status-${connectionStatus}`}>
              <span></span>
              {statusLabel}
            </div>

            <div className="live-account-wrap" ref={accountAreaRef}>
              <button
                type="button"
                className="live-user profile-trigger"
                onClick={() => setAccountMenuOpen((open) => !open)}
                aria-expanded={accountMenuOpen}
                aria-haspopup="menu"
              >
                <ProfileAvatar user={currentUser} size={30} className="live-profile-avatar" />
                <span>{currentUser?.name || "Account"}</span>
                <ChevronDown size={14} className={accountMenuOpen ? "account-trigger-chevron open" : "account-trigger-chevron"} />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <AccountMenu
                    onSelect={openAccountSection}
                    onLogout={() => { setAccountMenuOpen(false); setLogoutConfirmOpen(true); }}
                  />
                )}
              </AnimatePresence>
            </div>

            <button type="button" className="secondary-button" onClick={onBackToSite}>
              Back to Site
            </button>

            <button
              type="button"
              className="nav-logout-button"
              onClick={() => setLogoutConfirmOpen(true)}
              aria-label="Log out"
            >
              <LogOut size={15} />
            </button>

          </div>

        </div>

        <div className={`live-page-content${isAccountPage ? " live-page-content-account" : ""}`}>

          {isAccountPage && (
            <AccountPanel
              currentUser={currentUser}
              section={accountPanelSection}
              embedded
              onAppearanceChange={(nextAppearance) => {
                setAppearance(nextAppearance);
                try {
                  const existing = readAccountSettings(currentUser?.id);
                  window.localStorage.setItem(accountStorageKey("smartsurround_account_settings", currentUser?.id), JSON.stringify({ ...existing, appearance: nextAppearance }));
                } catch {}
              }}
              onUserUpdated={onUserUpdated}
              onLogout={() => setLogoutConfirmOpen(true)}
              onClose={() => {
                setAccountPanelOpen(false);
                setActivePage("overview");
              }}
            />
          )}

          {!isAccountPage && activePage === "overview" && (
            <OverviewPage latest={latest} alerts={alerts} connectionStatus={connectionStatus} />
          )}

          {!isAccountPage && activePage === "airquality" && (
            <AirQualityPage latest={latest} pmHistory={pmHistory} />
          )}

          {!isAccountPage && activePage === "environment" && <EnvironmentPage latest={latest} />}

          {!isAccountPage && activePage === "camera" && <CameraPage camIp={camIp} cameraOnline={cameraOnline} />}

          {!isAccountPage && activePage === "location" && <LocationPage gps={gps} />}

          {!isAccountPage && activePage === "datalog" && (
            <DataLogPage
              logRows={logRows}
              loggerRunning={loggerRunning}
              loggerInterval={loggerInterval}
              setLoggerInterval={setLoggerInterval}
              exportName={exportName}
              setExportName={setExportName}
              isConnected={connectionStatus === "connected"}
              onStart={() => setLoggerRunning(true)}
              onStop={() => setLoggerRunning(false)}
              onClear={() => setLogRows([])}
              onExport={exportLogExcel}
              onAddNow={() =>
                setLogRows((prev) => [
                  {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }),
                    ...latest,
                  },
                  ...prev,
                ])
              }
            />
          )}

          {!isAccountPage && activePage === "alerts" && (
            <AlertsPage
              alerts={alerts}
              alertSettings={alertSettings}
              onSave={saveAlertSettings}
              onReset={resetAlertSettings}
            />
          )}

          {!isAccountPage && activePage === "safety" && <SafetyPage />}

        </div>

      </div>

      <AnimatePresence>
        {logoutConfirmOpen && (
          <LogoutConfirmDialog
            loading={loggingOut}
            onCancel={() => setLogoutConfirmOpen(false)}
            onConfirm={confirmLogout}
          />
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================================
   LIVE DASHBOARD — PAGE COMPONENTS
========================================================= */

function StatTile({ label, value, unit, icon, badge, badgeClass }) {
  return (
    <div className="stat-tile">

      <div className="monitor-icon">{icon}</div>

      <div className="tile-value">
        {value}
        <span>{unit}</span>
      </div>

      <div className="tile-label">{label}</div>

      {badge && <div className={"tile-badge " + (badgeClass || "moderate")}>{badge}</div>}

    </div>
  );
}


function OverviewPage({ latest, alerts, connectionStatus }) {

  const hasIaq = latest.iaq !== null && latest.iaq !== undefined;
  const iaq = hasIaq ? Number(latest.iaq) : 0;
  const gaugeDeg = hasIaq ? (clamp(iaq, 0, 500) / 500) * 360 : 0;
  const gaugeColor = hasIaq ? getIaqColor(iaq) : "#c9beb7";
  const pms = latest.pm25 !== null && latest.pm25 !== undefined ? pm25Status(Number(latest.pm25)) : null;

  const statusText =
    connectionStatus === "connected"
      ? "Connected"
      : connectionStatus === "connecting"
        ? "Connecting..."
        : connectionStatus === "error"
          ? "ESP32 unreachable"
          : "Not connected";

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">SMART ENVIRONMENT</div>
          <h1>Overview</h1>
          <p>Live readings from your connected sensors.</p>
        </div>

        <div className="dashboard-live">
          <span></span>
          {connectionStatus === "connected" ? "LIVE SYSTEM" : "AWAITING DEVICE"}
        </div>
      </div>

      <div className="gauge-row">

        <div className="gauge-card">

          <div
            className="iaq-gauge"
            style={{
              background: `conic-gradient(${gaugeColor} 0deg ${gaugeDeg}deg, rgba(33,20,15,0.08) ${gaugeDeg}deg 360deg)`,
            }}
          >
            <div className="iaq-gauge-inner">
              <div className="iaq-number">{hasIaq ? iaq.toFixed(0) : "--"}</div>
              <span>IAQ</span>
            </div>
          </div>

          <div className="gauge-text">
            <h3>{latest.status || pms || "Air quality"}{hasIaq ? "" : " — no data"}</h3>
            <p>
              {connectionStatus === "connected"
                ? "Live IAQ reading from your connected sensors."
                : "Connect your ESP32 below to see live readings here."}
            </p>

            <div
              className="iaq-badge"
              style={{
                color: gaugeColor,
                borderColor: gaugeColor + "55",
                background: gaugeColor + "14",
              }}
            >
              ● {statusText}
            </div>
          </div>

        </div>

        <div className="tile-grid">

          <StatTile label="PM1.0" value={fmt(latest.pm1, 0)} unit="µg/m³" icon={<Wind size={16} />} />

          <StatTile
            label="PM2.5"
            value={fmt(latest.pm25, 0)}
            unit="µg/m³"
            icon={<Wind size={16} />}
            badge={pms}
            badgeClass={pms ? statusClass(pms) : undefined}
          />

          <StatTile label="PM10" value={fmt(latest.pm10, 0)} unit="µg/m³" icon={<Wind size={16} />} />

          <StatTile
            label="Temperature"
            value={fmt(latest.temperature, 1)}
            unit="°C"
            icon={<Thermometer size={16} />}
          />

          <StatTile
            label="Humidity"
            value={fmt(latest.humidity, 0)}
            unit="%"
            icon={<Droplets size={16} />}
          />

          <StatTile
            label="CO2"
            value={fmt(latest.co2, 0)}
            unit="ppm"
            icon={<Gauge size={16} />}
          />

        </div>

      </div>

      <div className="device-status-row">

        <div>
          <span>Device</span>
          <strong>{connectionStatus === "connected" ? "Online" : "Offline"}</strong>
        </div>

        <div>
          <span>Calibration</span>
          <strong>{latest.iaqAccuracyText || "--"}</strong>
        </div>

        <div>
          <span>Last update</span>
          <strong>
            {connectionStatus === "connected"
              ? new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
              : "--"}
          </strong>
        </div>

      </div>

      {/* <div className="event-row">

        {alerts.length === 0 ? (
          <EventItem
            icon={<span>📡</span>}
            title="Waiting for ESP32"
            text="Connect your board to start seeing live alerts."
          />
        ) : (
          alerts.slice(0, 3).map((a, i) => (
            <EventItem key={i} icon={<span>{a.icon}</span>} title={a.title} text={a.message} />
          ))
        )}

      </div> */}

    </div>
  );
}


function AirQualityPage({ latest, pmHistory }) {

  const [range, setRange] = React.useState("Live");
  const [hover, setHover] = React.useState(null);

  const data =
    pmHistory.length < 2
      ? Array.from({ length: 20 }, () => ({ label: "--", pm1: 0, pm25: 0, pm10: 0 }))
      : pmHistory;

  const max = Math.max(1, ...data.flatMap((d) => [d.pm1, d.pm25, d.pm10])) * 1.15;

  const pts = data.map((d, i) => ({
    ...d,
    x: 14 + (i / Math.max(1, data.length - 1)) * 872,
    y1: yVal(d.pm1, max),
    y25: yVal(d.pm25, max),
    y10: yVal(d.pm10, max),
  }));

  function handleMove(e) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 900;

    let nearest = pts[0];
    let bestDist = Infinity;

    pts.forEach((p) => {
      const dist = Math.abs(p.x - x);
      if (dist < bestDist) {
        bestDist = dist;
        nearest = p;
      }
    });

    setHover(nearest);
  }

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">TRENDS</div>
          <h1>Air Quality</h1>
          <p>Particulate matter readings over time.</p>
        </div>

        <div className="range-buttons">
          {["Live", "1H", "6H"].map((r) => (
            <button
              key={r}
              type="button"
              className={"range-btn" + (range === r ? " active" : "")}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="tile-grid three">
        <StatTile label="PM1.0" value={fmt(latest.pm1, 0)} unit="µg/m³" icon={<Wind size={16} />} />
        <StatTile label="PM2.5" value={fmt(latest.pm25, 0)} unit="µg/m³" icon={<Wind size={16} />} />
        <StatTile label="PM10" value={fmt(latest.pm10, 0)} unit="µg/m³" icon={<Wind size={16} />} />
      </div>

      <div className="chart-card">

        <div className="chart-legend">
          <span><i style={{ background: "#22c55e" }}></i>PM1.0</span>
          <span><i style={{ background: "#f97316" }}></i>PM2.5</span>
          <span><i style={{ background: "#ef4444" }}></i>PM10</span>
        </div>

        <svg
          viewBox="0 0 900 210"
          preserveAspectRatio="none"
          className="pm-chart-svg"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >

          <path
            d={`${buildPath(pts.map((p) => ({ x: p.x, y: p.y25 })))} L886,194 L14,194 Z`}
            fill="rgba(255,116,23,0.12)"
          />

          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y1 })))} fill="none" stroke="#22c55e" strokeWidth="2.5" />
          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y25 })))} fill="none" stroke="#f97316" strokeWidth="2.5" />
          <path d={buildPath(pts.map((p) => ({ x: p.x, y: p.y10 })))} fill="none" stroke="#ef4444" strokeWidth="2.5" />

          {hover && (
            <>
              <line x1={hover.x} x2={hover.x} y1="14" y2="194" stroke="rgba(33,20,15,0.2)" />
              <circle cx={hover.x} cy={hover.y1} r="4" fill="#22c55e" />
              <circle cx={hover.x} cy={hover.y25} r="4" fill="#f97316" />
              <circle cx={hover.x} cy={hover.y10} r="4" fill="#ef4444" />
            </>
          )}

        </svg>

        {hover && (
          <div className="chart-tooltip-box">
            <strong>{hover.label}</strong>
            <span>PM1.0: {hover.pm1}</span>
            <span>PM2.5: {hover.pm25}</span>
            <span>PM10: {hover.pm10}</span>
          </div>
        )}

      </div>

    </div>
  );
}


function EnvironmentPage({ latest }) {

  const hasData = latest.temperature !== null && latest.humidity !== null;

  const comfort = hasData
    ? clamp(
      100 - Math.abs(latest.temperature - 25) * 5 - Math.abs(latest.humidity - 50) * 0.6,
      45,
      96
    )
    : null;

  const comfortLabel = !hasData
    ? "No data yet"
    : comfort > 75
      ? "Very Comfortable"
      : comfort > 60
        ? "Comfortable"
        : "Needs Improvement";

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">ENVIRONMENT</div>
          <h1>Atmospheric Conditions</h1>
          <p>Temperature, humidity and indoor air quality.</p>
        </div>
      </div>

      <div className="wide-card-row">

        <div className="wide-card">
          <Thermometer size={18} />
          <h3>
            {fmt(latest.temperature, 1)}
            <span className="unit">°C</span>
          </h3>
          <span>Temperature</span>
        </div>

        <div className="wide-card">
          <Droplets size={18} />
          <h3>
            {fmt(latest.humidity, 1)}
            <span className="unit">%</span>
          </h3>
          <span>Humidity</span>
        </div>

        <div className="wide-card">
          <Gauge size={18} />
          <h3>{fmt(latest.iaq, 0)}</h3>
          <span>IAQ Index</span>
        </div>

      </div>

      <div className="comfort-card">

        <div className="comfort-score">
          <strong>{hasData ? Math.round(comfort) + "%" : "--"}</strong>
        </div>

        <div>
          <h4>{comfortLabel}</h4>
          <p>
            {hasData
              ? "Temperature and humidity are within measured range."
              : "Connect your ESP32 to see comfort readings here."}
          </p>

          <div className="comfort-mini-grid">
            <div className="mini"><span>CO2 EQUIVALENT</span><strong>{fmt(latest.co2, 0)} ppm</strong></div>
            <div className="mini"><span>VOC EQUIVALENT</span><strong>{fmt(latest.voc, 2)} ppm</strong></div>
            <div className="mini"><span>CALIBRATION</span><strong>{latest.iaqAccuracyText || "--"}</strong></div>
            <div className="mini"><span>UPTIME</span><strong>{latest.uptime !== null ? latest.uptime + "s" : "--"}</strong></div>
          </div>
        </div>

      </div>

    </div>
  );
}



function CameraPage() {
  const CAMERA_IP = "192.168.1.103";

  const [frameUrl, setFrameUrl] = React.useState(
    `http://${CAMERA_IP}/capture?t=${Date.now()}`
  );

  const [cameraRunning, setCameraRunning] =
    React.useState(true);

  const [analysis, setAnalysis] =
    React.useState(null);

  const [analyzing, setAnalyzing] =
    React.useState(false);

  const [error, setError] =
    React.useState("");

  const frameTimer =
    React.useRef(null);


  // =========================================================
  // LIVE CAMERA
  // =========================================================

  React.useEffect(() => {

    if (!cameraRunning || analyzing) {
      return;
    }

    const updateFrame = () => {

      setFrameUrl(
        `http://${CAMERA_IP}/capture?t=${Date.now()}`
      );

    };

    frameTimer.current =
      setInterval(updateFrame, 250);

    return () => {

      if (frameTimer.current) {

        clearInterval(
          frameTimer.current
        );

        frameTimer.current = null;
      }

    };

  }, [cameraRunning, analyzing]);


  // =========================================================
  // CAPTURE + AI ANALYSIS
  // =========================================================

  const analyzeRoad = async () => {

    if (analyzing) {
      return;
    }

    console.log(
      "Stopping live camera frames..."
    );

    setAnalyzing(true);
    setError("");
    setAnalysis(null);

    setCameraRunning(false);

    if (frameTimer.current) {

      clearInterval(
        frameTimer.current
      );

      frameTimer.current = null;
    }


    try {

      /*
       * Wait for the last /capture request
       * to finish before calling /analyze.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );


      console.log(
        "Requesting AI analysis..."
      );


      const controller =
        new AbortController();


      const timeoutId =
        setTimeout(() => {

          controller.abort();

        }, 60000);


      const response =
        await fetch(
          `http://${CAMERA_IP}/analyze`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );


      clearTimeout(timeoutId);


      console.log(
        "AI HTTP status:",
        response.status
      );


      const data =
        await response.json();


      console.log(
        "AI RESULT:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data.message ||
          `AI server returned HTTP ${response.status}`
        );

      }


      if (!data.ok) {

        throw new Error(
          data.message ||
          "AI analysis failed."
        );

      }


      /*
       * IMPORTANT:
       * The AI result is now stored in React state.
       */
      setAnalysis(data);


    } catch (err) {

      console.error(
        "AI analysis error:",
        err
      );


      if (
        err.name ===
        "AbortError"
      ) {

        setError(
          "AI analysis timed out. Check ESP32-CAM and Flask server."
        );

      } else {

        setError(
          err.message ||
          "Unable to analyze the road."
        );

      }

    } finally {

      /*
       * Wait a little before restarting
       * the camera.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 500)
      );


      setFrameUrl(
        `http://${CAMERA_IP}/capture?t=${Date.now()}`
      );


      setCameraRunning(true);
      setAnalyzing(false);


      console.log(
        "Live camera restarted."
      );

    }

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="page-block">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-heading">

        <div>

          <div className="small-label">
            AI VISION
          </div>

          <h1>
            Live Camera Feed
          </h1>

          <p>
            Real-time road monitoring and
            AI analysis using ESP32-CAM.
          </p>

        </div>


        <div className="dashboard-live">

          <span></span>

          {analyzing
            ? "AI ANALYZING"
            : cameraRunning
              ? "ESP32 LIVE"
              : "CAMERA"}

        </div>

      </div>



      {/* =====================================================
          CAMERA
      ===================================================== */}

      <div className="camera-card">

        {cameraRunning ? (

          <img
            src={frameUrl}
            alt="ESP32-CAM live feed"
            className="camera-stream"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "400px",
              objectFit: "contain",
              background: "#080808",
              borderRadius: "16px",
              display: "block",
            }}
          />

        ) : (

          <div
            className="camera-placeholder"
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <Camera size={35} />

            <h4>

              {analyzing
                ? "Analyzing road..."
                : "Camera paused"}

            </h4>

            <p>

              {analyzing
                ? "The ESP32-CAM image is being processed by the AI model."
                : "Camera is preparing..."}

            </p>

          </div>

        )}


        <div className="camera-overlay-top">

          <span className="rec-dot"></span>

          {analyzing
            ? "ANALYZING"
            : cameraRunning
              ? "LIVE"
              : "PAUSED"}

        </div>

      </div>



      {/* =====================================================
          CAMERA INFORMATION
      ===================================================== */}

      <div className="tile-grid three">

        <StatTile
          label="Camera Status"
          value={
            analyzing
              ? "Analyzing"
              : cameraRunning
                ? "Online"
                : "Paused"
          }
          unit=""
          icon={
            <Video size={16} />
          }
        />


        <StatTile
          label="Camera IP"
          value={CAMERA_IP}
          unit=""
          icon={
            <Camera size={16} />
          }
        />


        <StatTile
          label="AI Model"
          value="Ready"
          unit=""
          icon={
            <BrainCircuit size={16} />
          }
        />

      </div>



      {/* =====================================================
          CAPTURE & ANALYZE BUTTON
      ===================================================== */}

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >

        <button
          type="button"
          className="primary-button"
          onClick={analyzeRoad}
          disabled={analyzing}
          style={{
            opacity:
              analyzing ? 0.65 : 1,
            cursor:
              analyzing
                ? "not-allowed"
                : "pointer",
          }}
        >

          <Camera size={17} />

          {analyzing
            ? "Capturing & Analyzing..."
            : "Capture & Analyze"}

        </button>

      </div>



      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div
          style={{
            padding:
              "15px 18px",
            marginBottom:
              "20px",
            borderRadius:
              "12px",
            background:
              "rgba(239,68,68,0.08)",
            border:
              "1px solid rgba(239,68,68,0.25)",
            color:
              "#dc2626",
          }}
        >

          <strong>
            Analysis Error
          </strong>

          <div
            style={{
              marginTop: "5px",
            }}
          >
            {error}
          </div>

        </div>

      )}



      {/* =====================================================
          AI RESULT
      ===================================================== */}

      {analysis && (

        <div
          className="wide-card"
          style={{
            width: "100%",
            padding: "24px",
            marginTop: "20px",
          }}
        >


          {/* =================================================
              RESULT HEADER
          ================================================= */}

          <div className="card-header">

            <div>

              <div className="card-label">
                AI ROAD ANALYSIS
              </div>

              <h3>
                Detection Result
              </h3>

            </div>

            <BrainCircuit
              size={20}
            />

          </div>



          {/* =================================================
              ROW 1
          ================================================= */}

          <div
            className="tile-grid three"
            style={{
              marginTop: "20px",
            }}
          >

            <StatTile
              label="Road Condition"
              value={
                analysis.road_condition ||
                "--"
              }
              unit=""
              icon={
                <Activity
                  size={16}
                />
              }
            />


            <StatTile
              label="Damage Type"
              value={
                analysis.damage_type ||
                "--"
              }
              unit=""
              icon={
                <ShieldCheck
                  size={16}
                />
              }
            />


            <StatTile
              label="Confidence"
              value={
                typeof analysis.confidence ===
                  "number"
                  ? (
                    analysis.confidence *
                    100
                  ).toFixed(1) + "%"
                  : "--"
              }
              unit=""
              icon={
                <Gauge
                  size={16}
                />
              }
            />

          </div>



          {/* =================================================
              ROW 2
          ================================================= */}

          <div
            className="tile-grid three"
            style={{
              marginTop: "15px",
            }}
          >

            <StatTile
              label="Severity"
              value={
                analysis.severity ||
                "--"
              }
              unit=""
              icon={
                <AlertTriangle
                  size={16}
                />
              }
            />


            <StatTile
              label="Admin Queue"
              value={
                analysis.queued_for_admin
                  ? "Queued"
                  : "Not Queued"
              }
              unit=""
              icon={
                <ShieldCheck
                  size={16}
                />
              }
            />


            <StatTile
              label="Detection ID"
              value={
                analysis.detection_id ??
                "--"
              }
              unit=""
              icon={
                <FileText
                  size={16}
                />
              }
            />

          </div>



          {/* =================================================
              ANALYZED IMAGE
          ================================================= */}

          {analysis.image && (

            <div
              style={{
                marginTop: "25px",
              }}
            >

              <div className="card-label">
                ANALYZED IMAGE
              </div>


              <img
                src={
                  `http://192.168.1.108:5000${analysis.image}`
                }
                alt="AI analyzed road"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  marginTop: "10px",
                  borderRadius: "14px",
                  display: "block",
                }}
              />

            </div>

          )}



          {/* =================================================
              RESULT MESSAGE
          ================================================= */}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "12px",
              background:
                analysis.road_condition ===
                  "damaged"
                  ? "rgba(249,115,22,0.10)"
                  : "rgba(34,197,94,0.10)",
            }}
          >

            <strong>

              {analysis.road_condition ===
                "damaged"
                ? "Road damage detected"
                : "Road classified as normal"}

            </strong>


            <p
              style={{
                marginBottom: 0,
                marginTop: "5px",
              }}
            >

              {analysis.queued_for_admin

                ? "This detection has been sent to the administrator verification queue."

                : "The image was successfully processed by the AI model."}

            </p>

          </div>

        </div>

      )}

    </div>

  );
}


function LocationPage({ gps }) {

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


function DataLogPage({
  logRows,
  loggerRunning,
  loggerInterval,
  setLoggerInterval,
  exportName,
  setExportName,
  isConnected,
  onStart,
  onStop,
  onClear,
  onExport,
  onAddNow,
}) {

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">DATA LOGGER</div>
          <h1>History &amp; Export</h1>
          <p>Record sensor readings over time and export them as a spreadsheet.</p>
        </div>
      </div>

      {!isConnected && (
        <div className="logger-warning">
          Connect your ESP32 above to start logging real readings — logging is disabled while offline.
        </div>
      )}

      <div className="logger-controls">

        <div className={"logger-status" + (loggerRunning ? " running" : "")}>
          <span className="logger-dot"></span>
          {loggerRunning ? "Logger Running" : "Logger Stopped"}
        </div>

        <label className="logger-field">
          <span>Interval</span>
          <select value={loggerInterval} onChange={(e) => setLoggerInterval(Number(e.target.value))}>
            <option value={2000}>2 seconds</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
          </select>
        </label>

        <div className="logger-buttons">

          <button type="button" className="primary-button small" onClick={onStart} disabled={loggerRunning || !isConnected}>
            <Play size={14} /> Start
          </button>

          <button type="button" className="secondary-button small" onClick={onStop} disabled={!loggerRunning}>
            <Pause size={14} /> Stop
          </button>

          <button type="button" className="secondary-button small" onClick={onAddNow} disabled={!isConnected}>
            Log Now
          </button>

        </div>

        <div className="logger-record-count">
          <span>Records</span>
          <strong>{logRows.length}</strong>
        </div>

      </div>

      <div className="export-row">

        <label className="logger-field">
          <span>File name</span>
          <input type="text" value={exportName} onChange={(e) => setExportName(e.target.value)} />
        </label>

        <button type="button" className="primary-button small" onClick={onExport}>
          <Download size={14} /> Export .xls
        </button>

        <button type="button" className="secondary-button small" onClick={onClear}>
          <Trash2 size={14} /> Clear
        </button>

      </div>

      <div className="log-table-wrap">
        <table className="log-table">

          <thead>
            <tr>
              <th>Time</th><th>PM1</th><th>PM2.5</th><th>PM10</th><th>Temp</th>
              <th>Humidity</th><th>IAQ</th><th>CO2</th><th>VOC</th>
            </tr>
          </thead>

          <tbody>

            {logRows.length === 0 && (
              <tr>
                <td colSpan={9} className="log-empty">
                  No records yet — start the logger or click "Log Now".
                </td>
              </tr>
            )}

            {logRows.map((r) => (
              <tr key={r.id}>
                <td>{r.time}</td>
                <td>{fmt(r.pm1, 0)}</td>
                <td>{fmt(r.pm25, 0)}</td>
                <td>{fmt(r.pm10, 0)}</td>
                <td>{fmt(r.temperature, 1)}°C</td>
                <td>{fmt(r.humidity, 1)}%</td>
                <td>{fmt(r.iaq, 1)}</td>
                <td>{fmt(r.co2, 0)}</td>
                <td>{fmt(r.voc, 2)}</td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}


function AlertsPage({ alerts, alertSettings, onSave, onReset }) {

  const [form, setForm] = React.useState(alertSettings);

  React.useEffect(() => {
    setForm(alertSettings);
  }, [alertSettings]);

  const activeCount = alerts.filter((a) => a.level === "Warning" || a.level === "Danger").length;

  const highest = alerts.some((a) => a.level === "Danger")
    ? "Danger"
    : alerts.some((a) => a.level === "Warning")
      ? "Warning"
      : "Normal";

  function field(key, label, step) {
    return (
      <label className="threshold-field" key={key}>
        <span>{label}</span>
        <input
          type="number"
          step={step || 1}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
        />
      </label>
    );
  }

  return (
    <div className="page-block">

      <div className="page-heading">
        <div>
          <div className="small-label">SAFETY</div>
          <h1>Alerts &amp; Thresholds</h1>
          <p>Configure warning and danger levels for each sensor.</p>
        </div>
      </div>

      <div className="tile-grid three">
        <StatTile label="Active Alerts" value={activeCount} unit="" icon={<Bell size={16} />} />
        <StatTile label="Highest Level" value={highest} unit="" icon={<ShieldCheck size={16} />} />
        <StatTile
          label="Last Check"
          value={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          unit=""
          icon={<Activity size={16} />}
        />
      </div>

      <div className="alerts-list">

        {alerts.map((a, i) => (
          <div className="alert-row" key={i}>
            <div className="alert-icon">{a.icon}</div>
            <div>
              <strong>{a.title}</strong>
              <span>{a.message}</span>
            </div>
            <div className={"alert-level level-" + a.level.toLowerCase()}>{a.level}</div>
          </div>
        ))}

      </div>

      <div className="threshold-card">

        <h4>Threshold Settings</h4>

        <div className="threshold-grid">
          {field("pm25Warn", "PM2.5 Warning")}
          {field("pm25Danger", "PM2.5 Danger")}
          {field("pm10Warn", "PM10 Warning")}
          {field("pm10Danger", "PM10 Danger")}
          {field("iaqWarn", "IAQ Warning")}
          {field("iaqDanger", "IAQ Danger")}
          {field("co2Warn", "CO2 Warning")}
          {field("co2Danger", "CO2 Danger")}
          {field("vocWarn", "VOC Warning", 0.01)}
          {field("vocDanger", "VOC Danger", 0.01)}
          {field("humMin", "Humidity Min")}
          {field("humMax", "Humidity Max")}
          {field("tempMin", "Temp Min")}
          {field("tempMax", "Temp Max")}
        </div>

        <div className="threshold-actions">

          <button type="button" className="primary-button small" onClick={() => onSave(form)}>
            <Save size={14} /> Save Settings
          </button>

          <button type="button" className="secondary-button small" onClick={onReset}>
            <RotateCcw size={14} /> Reset to Default
          </button>

        </div>

      </div>

    </div>
  );
}


function AdminPage({ onBackToSite, onBackToLogin, onLogout }) {
  const ADMIN_API = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? "" : "");
  const [pin] = React.useState(() => {
    try { return localStorage.getItem("ss_admin_pin") || ""; } catch (_) { return ""; }
  });
  const [authenticated, setAuthenticated] = React.useState(false);
  const [backendStatus, setBackendStatus] = React.useState("checking");
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [toast, setToast] = React.useState("");
  const [data, setData] = React.useState(null);

  const [workspace, setWorkspace] = React.useState("overview");
  const [tabs, setTabs] = React.useState({
    operations: "map",
    users: "database",
    monitoring: "environment",
    problems: "inbox",
    reports: "environment",
    communications: "drafts",
    system: "thresholds",
  });
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [userDetail, setUserDetail] = React.useState(null);
  const [selectedIncident, setSelectedIncident] = React.useState(null);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState("");
  const [incidentFilter, setIncidentFilter] = React.useState("all");
  const [reportType, setReportType] = React.useState("incidents");
  const [reportUser, setReportUser] = React.useState("");
  const [reportStart, setReportStart] = React.useState("");
  const [reportEnd, setReportEnd] = React.useState("");

  const [thresholdDraft, setThresholdDraft] = React.useState([]);
  const [recipientForm, setRecipientForm] = React.useState({
    name: "", department: "", role: "", email: "", notification_type: "Incident"
  });
  const [draftForm, setDraftForm] = React.useState(null);
  const [draftSaving, setDraftSaving] = React.useState(false);

  const adminFetch = React.useCallback(async (path, options = {}, retry = true) => {
    const adminPin = (() => {
      try { return localStorage.getItem("ss_admin_pin") || pin || ""; } catch (_) { return pin || ""; }
    })();
    if (!adminPin.trim()) throw new Error("Admin session not found. Please use Admin Login.");

    const token = (() => {
      try { return sessionStorage.getItem("ss_admin_token") || ""; } catch (_) { return ""; }
    })();

    let response;
    try {
      response = await fetch(`${ADMIN_API}${path}`, {
        credentials: "include",
        cache: "no-store",
        ...options,
        headers: {
          ...(options.headers || {}),
          "X-Admin-Pin": adminPin.trim(),
          ...(token ? { "X-Auth-Token": token } : {}),
        },
      });
    } catch (err) {
      setBackendStatus("offline");
      throw new Error(
        `Unable to connect to SmartSurround backend${ADMIN_API ? ` at ${ADMIN_API}` : ""}.`
      );
    }

    const type = response.headers.get("content-type") || "";
    const body = type.includes("application/json")
      ? await response.json()
      : await response.text();

    if (response.status === 401 && retry) {
      await loginWithPin(adminPin);
      return adminFetch(path, options, false);
    }

    if (!response.ok || (body && body.ok === false)) {
      const message = body?.message || body || `Admin request failed (HTTP ${response.status}).`;
      throw new Error(message);
    }

    return body;
  }, [ADMIN_API, pin]);

  const adminFetchBinary = async (path, options = {}, retry = true) => {
    const adminPin = (() => {
      try { return localStorage.getItem("ss_admin_pin") || pin || ""; } catch (_) { return pin || ""; }
    })();
    if (!adminPin.trim()) throw new Error("Admin session not found. Please use Admin Login.");
    const token = (() => {
      try { return sessionStorage.getItem("ss_admin_token") || ""; } catch (_) { return ""; }
    })();
    let response;
    try {
      response = await fetch(`${ADMIN_API}${path}`, {
        credentials: "include",
        cache: "no-store",
        ...options,
        headers: {
          ...(options.headers || {}),
          "X-Admin-Pin": adminPin.trim(),
          ...(token ? { "X-Auth-Token": token } : {}),
        },
      });
    } catch (_) {
      throw new Error("Unable to connect to SmartSurround backend.");
    }
    if (response.status === 401 && retry) {
      await loginWithPin(adminPin);
      return adminFetchBinary(path, options, false);
    }
    if (!response.ok) {
      const type = response.headers.get("content-type") || "";
      const body = type.includes("application/json") ? await response.json() : await response.text();
      throw new Error(body?.message || body || `Request failed (HTTP ${response.status}).`);
    }
    return response.blob();
  };

  const loginWithPin = async (adminPin) => {
    const form = new URLSearchParams();
    form.append("pin", adminPin.trim());
    let response;
    try {
      response = await fetch(`${ADMIN_API}/login/creds`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
        cache: "no-store",
      });
    } catch (_) {
      setBackendStatus("offline");
      throw new Error("Unable to connect to the SmartSurround backend.");
    }
    const type = response.headers.get("content-type") || "";
    const body = type.includes("application/json") ? await response.json() : {};
    if (!response.ok || !body?.ok) throw new Error(body?.message || "Administrator authentication failed.");
    try {
      localStorage.setItem("ss_admin_pin", adminPin.trim());
      const token = response.headers.get("X-Set-Auth-Token");
      if (token) sessionStorage.setItem("ss_admin_token", token);
    } catch (_) {}
    setAuthenticated(true);
    setBackendStatus("online");
  };

  const load = React.useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    setError("");
    try {
      if (!pin) throw new Error("Admin session not found. Please use Admin Login.");
      await loginWithPin(pin);
      const result = await adminFetch("/admin/api/control-center");
      setData(result);
      setThresholdDraft(Array.isArray(result.thresholds) ? result.thresholds : []);
      setAuthenticated(true);
      setBackendStatus("online");
    } catch (err) {
      console.error("Admin control center load failed:", err);
      setAuthenticated(false);
      setError(err?.message || "Unable to load administrator control center.");
    } finally {
      if (showSpinner) setLoading(false);
      setRefreshing(false);
    }
  }, [pin, adminFetch]);

  React.useEffect(() => {
    load(true);
    const interval = window.setInterval(() => load(false), 15000);
    return () => window.clearInterval(interval);
  }, [load]);

  React.useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const setWorkspaceAndClose = (id) => {
    setWorkspace(id);
    setMobileNavOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const refresh = async () => {
    setRefreshing(true);
    await load(false);
  };

  const resolveAlert = async (id) => {
    try {
      await adminFetch(`/admin/api/alerts/${id}/resolve`, { method: "POST" });
      setToast("Alert resolved.");
      await load(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUserAccount = async (userId, payload) => {
    try {
      await adminFetch(`/admin/api/users/${encodeURIComponent(userId)}/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setToast("User account updated.");
      const detail = await adminFetch(`/admin/api/users/${encodeURIComponent(userId)}`);
      setUserDetail(detail);
      await load(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const saveThresholds = async () => {
    try {
      const payload = thresholdDraft.map((row) => ({
        sensor: row.sensor,
        warning: row.warning === "" ? null : Number(row.warning),
        critical: row.critical === "" ? null : Number(row.critical),
        minimum: row.minimum === "" ? null : Number(row.minimum),
        maximum: row.maximum === "" ? null : Number(row.maximum),
        unit: row.unit || "",
      }));
      const result = await adminFetch("/admin/api/thresholds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thresholds: payload }),
      });
      setThresholdDraft(result.thresholds || []);
      setToast("Thresholds saved and recorded in Admin Activity.");
      await load(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addRecipient = async (e) => {
    e.preventDefault();
    try {
      const result = await adminFetch("/admin/api/recipients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipientForm),
      });
      setToast("Recipient added.");
      setRecipientForm({ name: "", department: "", role: "", email: "", notification_type: "Incident" });
      setData((prev) => prev ? { ...prev, recipients: [result.recipient, ...(prev.recipients || [])] } : prev);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteRecipient = async (id) => {
    try {
      await adminFetch(`/admin/api/recipients/${id}`, { method: "DELETE" });
      setToast("Recipient removed.");
      await load(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const generateDraft = async (incidentId, incidentKind = "") => {
    try {
      setDraftSaving(true);
      const result = await adminFetch("/admin/api/communications/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incident_id: incidentId, kind: incidentKind }),
      });
      setDraftForm(result.draft);
      setWorkspaceAndClose("communications");
      setTabs((t) => ({ ...t, communications: "drafts" }));
      setToast("Official draft generated from recorded incident data. Review before sending.");
      await load(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setDraftSaving(false);
    }
  };

  const saveDraft = async () => {
    if (!draftForm?.id) return;
    try {
      setDraftSaving(true);
      const result = await adminFetch(`/admin/api/communications/${draftForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: draftForm.subject,
          body: draftForm.body,
          recipient: draftForm.recipient || "",
        }),
      });
      setDraftForm(result.communication || draftForm);
      setToast("Draft saved.");
      await load(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setDraftSaving(false);
    }
  };

  const sendDraft = async () => {
    if (!draftForm?.id) return;
    if (!draftForm.recipient) {
      setError("Select a recipient before approving and sending.");
      return;
    }
    try {
      setDraftSaving(true);
      const result = await adminFetch(`/admin/api/communications/${draftForm.id}/send`, {
        method: "POST",
      });
      setToast(result?.message || "Email sent.");
      setDraftForm(null);
      await load(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setDraftSaving(false);
    }
  };

  const downloadReport = () => {
    const pinValue = (() => {
      try { return localStorage.getItem("ss_admin_pin") || pin || ""; } catch (_) { return pin || ""; }
    })();
    const token = (() => {
      try { return sessionStorage.getItem("ss_admin_token") || ""; } catch (_) { return ""; }
    })();
    const params = new URLSearchParams({ data: reportType });
    if (reportUser) params.set("user_id", reportUser);
    if (reportStart) params.set("start", reportStart);
    if (reportEnd) params.set("end", `${reportEnd}T23:59:59`);
    const url = `${ADMIN_API}/admin/api/report/export?${params.toString()}`;
    // Use fetch so the protected endpoint can send the existing auth headers.
    fetch(url, {
      credentials: "include",
      headers: {
        "X-Admin-Pin": pinValue,
        ...(token ? { "X-Auth-Token": token } : {}),
      },
    }).then(async (response) => {
      if (!response.ok) throw new Error(await response.text() || "Export failed.");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `smartsurround_${reportType}_report.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
      setToast("Excel report generated.");
      void load(false);
    }).catch((err) => setError(err.message || "Excel export failed."));
  };

  const selectUser = async (userId) => {
    setSelectedUserId(userId);
    setWorkspace("users");
    setTabs((t) => ({ ...t, users: "details" }));
    try {
      const result = await adminFetch(`/admin/api/users/${encodeURIComponent(userId)}`);
      setUserDetail(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const notifications = React.useMemo(() => {
    if (!data) return [];
    const items = [];
    (data.alerts || []).filter((a) => a.status === "Open").slice(0, 8).forEach((a) => {
      items.push({
        id: `a-${a.id}`,
        type: "alert",
        title: String(a.severity || "ALERT"),
        text: a.title,
        action: () => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "alerts" })); },
      });
    });
    (data.complaints || []).filter((c) => ["Urgent", "Intermediate"].includes(c.priority) && ["Open","In Progress"].includes(c.status)).slice(0, 6).forEach((c) => {
      items.push({
        id: `c-${c.id}`,
        type: "incident",
        title: "NEW INCIDENT",
        text: `${c.ticket_id} · ${c.subject}`,
        action: () => { setSelectedIncident(c); setWorkspaceAndClose("problems"); },
      });
    });
    (data.devices || []).filter((d) => String(d.connection).toUpperCase() !== "CONNECTED").slice(0, 5).forEach((d) => {
      items.push({
        id: `d-${d.device_id}`,
        type: "device",
        title: "DEVICE OFFLINE",
        text: d.device_id,
        action: () => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "sensors" })); },
      });
    });
    (data.locations || []).filter((l) => l.timestamp && (Date.now() - new Date(l.timestamp).getTime() > 120000)).slice(0, 5).forEach((l) => {
      items.push({
        id: `g-${l.user_id}`,
        type: "gps",
        title: "GPS UPDATE LOST",
        text: l.name || l.user_id,
        action: () => { setWorkspaceAndClose("operations"); setTabs((t) => ({ ...t, operations: "users" })); },
      });
    });
    (data.communications || []).filter((c) => String(c.status).toLowerCase() === "draft").slice(0, 3).forEach((c) => {
      items.push({
        id: `m-${c.id}`,
        type: "email",
        title: "EMAIL PENDING APPROVAL",
        text: c.subject,
        action: () => { setWorkspaceAndClose("communications"); setTabs((t) => ({ ...t, communications: "drafts" })); },
      });
    });
    return items.slice(0, 12);
  }, [data]);

  if (loading && !data) {
    return (
      <div className="sc-admin-loading">
        <div className="sc-admin-loading-mark"><Activity size={22} /></div>
        <div>
          <strong>Loading SmartSurround Control Center</strong>
          <span>Authenticating administrator and loading live system data…</span>
        </div>
      </div>
    );
  }

  if (!authenticated || !data) {
    return (
      <div className="sc-admin-gate">
        <div className="sc-admin-gate-card">
          <div className="sc-admin-gate-icon"><ShieldCheck size={24} /></div>
          <div className="sc-admin-eyebrow">ADMINISTRATION</div>
          <h1>Administrator access required</h1>
          <p>{error || "The administrator session is not active."}</p>
          <div className="sc-admin-gate-status">
            <span className={backendStatus === "online" ? "online" : ""}></span>
            Backend {backendStatus === "online" ? "connected" : backendStatus === "offline" ? "offline" : "checking"}
          </div>
          <button className="primary-button" type="button" onClick={onBackToLogin || onBackToSite}>
            Return to Admin Login <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const summary = data.summary || {};
  const locations = data.locations || [];
  const users = data.users || [];
  const complaints = data.complaints || [];
  const alerts = data.alerts || [];
  const devices = data.devices || [];
  const detections = data.detections || { pending: [], approved: [], rejected: [] };
  const incidentRows = [
    ...complaints.map((c) => ({
      ...c,
      lat: c.incident_latitude,
      lon: c.incident_longitude,
      accuracy: c.incident_accuracy,
      gps_time: c.incident_gps_time,
      verified_at: c.verified_at,
      verified_by: c.verified_by,
      verification_notes: c.verification_notes,
      _kind: "Problem",
      _time: c.created_at,
      _status: c.status,
      _urgency: c.priority,
      _title: c.subject
    })),
    ...(detections.pending || []).map((d) => ({ ...d, _kind: "AI Detection", _time: d.created_at, _status: d.status, _urgency: d.severity, _title: d.damage_class || "Road damage" })),
    ...(detections.approved || []).slice(0, 50).map((d) => ({ ...d, _kind: "AI Detection", _time: d.created_at, _status: d.status, _urgency: d.severity, _title: d.damage_class || "Road damage" })),
  ].sort((a, b) => new Date(b._time || 0) - new Date(a._time || 0));

  const filteredUsers = users.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return true;
    return [u.name, u.email, u.user_id, u.department, u.device_id].some((v) => String(v || "").toLowerCase().includes(q));
  });

  const filteredIncidents = incidentRows.filter((r) => {
    if (incidentFilter === "all") return true;
    if (incidentFilter === "urgent") return ["Urgent", "CRITICAL", "Critical"].includes(String(r._urgency));
    if (incidentFilter === "active") return ["Open", "In Progress", "pending"].includes(String(r._status));
    if (incidentFilter === "history") return ["Resolved", "Closed", "rejected"].includes(String(r._status));
    return true;
  });

  const live = data.live || null;
  const environmentValues = live ? [
    ["Temperature", live.temperature, "°C"],
    ["Humidity", live.humidity, "%"],
    ["Atmospheric Pressure", live.pressure, "hPa"],
    ["PM1.0", live.pm1, "µg/m³"],
    ["PM2.5", live.pm25, "µg/m³"],
    ["PM10", live.pm10, "µg/m³"],
    ["CO₂", live.co2, "ppm"],
    ["VOC", live.voc, "ppm"],
  ] : [];
  const thresholds = Object.fromEntries((data.thresholds || []).map((t) => [t.sensor, t]));
  const iaqValue = live?.iaq;
  const iaqThreshold = thresholds.IAQ;
  const iaqStatus = iaqValue == null ? "No data" : iaqThreshold?.critical != null && iaqValue >= iaqThreshold.critical ? "CRITICAL" : iaqThreshold?.warning != null && iaqValue >= iaqThreshold.warning ? "ATTENTION" : "GOOD";

  const mapLocations = locations
    .filter((l) => Number.isFinite(Number(l.latitude)) && Number.isFinite(Number(l.longitude)))
    .map((l) => {
      const user = users.find((u) => u.user_id === l.user_id);
      const env = (data.environment_history || []).find((r) => r.user_id === l.user_id);
      const incident = complaints.find((c) => c.user_id === l.user_id && ["Open","In Progress"].includes(c.status));
      const stale = l.timestamp ? (Date.now() - new Date(l.timestamp).getTime() > 120000) : true;
      const incidentPriority = incident?.priority || "";
      const marker_state = stale ? "OFFLINE"
        : incidentPriority === "Critical" ? "CRITICAL"
        : incidentPriority === "Urgent" ? "URGENT"
        : incidentPriority === "Intermediate" ? "ATTENTION"
        : "NORMAL";
      return {
        ...l,
        name: user?.name || l.name,
        email: user?.email,
        temperature: env?.temperature,
        humidity: env?.humidity,
        iaq: env?.iaq,
        incident: incident?.subject || null,
        marker_state,
      };
    });

  return (
    <div className="sc-admin-shell">
      {mobileNavOpen && <button className="sc-admin-mobile-backdrop" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" />}

      <aside className={`sc-admin-sidebar${mobileNavOpen ? " open" : ""}`}>
        <div className="sc-admin-brand">
          <div className="sc-admin-brand-mark"><Activity size={18} /></div>
          <div><strong>Smart<span>Surround</span></strong><small>ADMIN CONTROL CENTER</small></div>
        </div>

        <nav className="sc-admin-nav">
          <div className="sc-admin-nav-group">
            <span>OVERVIEW</span>
            <button className={workspace === "overview" ? "active" : ""} onClick={() => setWorkspaceAndClose("overview")}><Activity size={16} />Dashboard</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>OPERATIONS</span>
            <button className={workspace === "operations" ? "active" : ""} onClick={() => setWorkspaceAndClose("operations")}><Navigation size={16} />Live Operations</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>USERS</span>
            <button className={workspace === "users" ? "active" : ""} onClick={() => setWorkspaceAndClose("users")}><UserRound size={16} />Users</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>MONITORING</span>
            <button className={workspace === "monitoring" ? "active" : ""} onClick={() => setWorkspaceAndClose("monitoring")}><Wind size={16} />Monitoring</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>INCIDENTS</span>
            <button className={workspace === "problems" ? "active" : ""} onClick={() => setWorkspaceAndClose("problems")}><AlertTriangle size={16} />Problem Desk</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>REPORTS</span>
            <button className={workspace === "reports" ? "active" : ""} onClick={() => setWorkspaceAndClose("reports")}><FileText size={16} />Reports</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>COMMUNICATIONS</span>
            <button className={workspace === "communications" ? "active" : ""} onClick={() => setWorkspaceAndClose("communications")}><Mail size={16} />Communications</button>
          </div>
          <div className="sc-admin-nav-group">
            <span>SYSTEM</span>
            <button className={workspace === "system" ? "active" : ""} onClick={() => setWorkspaceAndClose("system")}><Settings size={16} />System</button>
          </div>
        </nav>

        <div className="sc-admin-sidebar-footer">
          <div>
            <span>ADMINISTRATOR</span>
            <strong>Secure Control</strong>
          </div>
          <button type="button" onClick={onLogout}><LogOut size={15} />Logout</button>
          <p>SmartSurround operations, environment and incident control.</p>
        </div>
      </aside>

      <main className="sc-admin-main">
        <header className="sc-admin-header">
          <div className="sc-admin-header-left">
            <button className="sc-admin-mobile-menu" onClick={() => setMobileNavOpen(true)}><Menu size={19} /></button>
            <div>
              <div className="sc-admin-breadcrumb">SmartSurround / Admin / {workspace === "overview" ? "Dashboard" : workspace.replace("problems","Problem Desk").replace("operations","Live Operations")}</div>
              <h2>{workspace === "overview" ? "Operations dashboard" : workspace === "problems" ? "Problem Desk" : workspace === "operations" ? "Live Operations" : workspace[0].toUpperCase() + workspace.slice(1)}</h2>
            </div>
          </div>
          <div className="sc-admin-header-right">
            <div className="sc-admin-connection"><span className={backendStatus === "online" ? "on" : ""}></span>{backendStatus === "online" ? "CONNECTED" : "CONNECTING"}</div>

            <div className="sc-admin-header-menu">
              <button className="sc-admin-icon-button" onClick={() => { setNotificationOpen((v) => !v); setProfileOpen(false); }} aria-label="Notifications">
                <Bell size={17} />
                {notifications.length > 0 && <b>{notifications.length > 9 ? "9+" : notifications.length}</b>}
              </button>
              {notificationOpen && (
                <div className="sc-admin-dropdown sc-admin-notifications">
                  <div className="sc-admin-dropdown-title"><strong>Notifications</strong><span>{notifications.length} active</span></div>
                  {notifications.length === 0 ? <AdminEmpty text="No active notifications." /> : notifications.map((n) => (
                    <button key={n.id} onClick={n.action}>
                      <span className={`sc-admin-notification-dot ${n.type}`}></span>
                      <div><strong>{n.title}</strong><small>{n.text}</small></div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="sc-admin-header-menu">
              <button className="sc-admin-profile-button" onClick={() => { setProfileOpen((v) => !v); setNotificationOpen(false); }}>
                <span className="sc-admin-avatar">A</span>
                <span><strong>Admin</strong><small>Administrator</small></span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="sc-admin-dropdown sc-admin-profile-dropdown">
                  <div className="sc-admin-profile-summary"><span className="sc-admin-avatar large">A</span><div><strong>Administrator</strong><small>SmartSurround Control Center</small></div></div>
                  <button onClick={() => setWorkspaceAndClose("overview")}><UserRound size={15} />Admin Profile</button>
                  <button onClick={() => setWorkspaceAndClose("system")}><Settings size={15} />Account / Security</button>
                  <button onClick={onLogout}><LogOut size={15} />Logout</button>
                </div>
              )}
            </div>

            <button className="secondary-button small" type="button" onClick={onBackToSite}>Back to Site</button>
            <button className="sc-admin-refresh" type="button" onClick={refresh} disabled={refreshing} title="Refresh">
              <RotateCcw size={15} className={refreshing ? "sc-admin-spin" : ""} />
            </button>
          </div>
        </header>

        <div className="sc-admin-content">
          {(error || toast) && (
            <div className={`sc-admin-banner ${error ? "error" : "success"}`}>
              <span>{error || toast}</span>
              <button onClick={() => { setError(""); setToast(""); }}><X size={14} /></button>
            </div>
          )}

          {workspace === "overview" && (
            <div className="sc-admin-workspace">
              <div className="sc-admin-title-row">
                <div><div className="sc-admin-eyebrow">OVERVIEW</div><h1>Command center</h1><p>Live system visibility across users, devices, environment and reported incidents.</p></div>
                <div className="sc-admin-live-badge"><span></span>LIVE OPERATIONS</div>
              </div>

              <div className="sc-admin-stat-grid">
                <AdminStat label="Total Users" value={summary.total_users ?? 0} icon={<UserRound size={18} />} onClick={() => setWorkspaceAndClose("users")} />
                <AdminStat label="Active Users" value={summary.active_users ?? 0} icon={<Activity size={18} />} onClick={() => setWorkspaceAndClose("users")} />
                <AdminStat label="Currently Working" value={summary.working_users ?? 0} icon={<Navigation size={18} />} onClick={() => { setWorkspaceAndClose("operations"); setTabs((t) => ({ ...t, operations: "users" })); }} />
                <AdminStat label="Active Incidents" value={summary.active_incidents ?? 0} icon={<AlertTriangle size={18} />} onClick={() => setWorkspaceAndClose("problems")} />
                <AdminStat label="Critical Incidents" value={summary.critical_incidents ?? 0} icon={<AlertTriangle size={18} />} onClick={() => { setWorkspaceAndClose("problems"); setIncidentFilter("urgent"); }} />
                <AdminStat label="Connected Devices" value={summary.connected_devices ?? 0} icon={<Radio size={18} />} onClick={() => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "sensors" })); }} />
                <AdminStat label="Offline Devices" value={summary.offline_devices ?? 0} icon={<CloudRain size={18} />} onClick={() => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "sensors" })); }} />
                <AdminStat label="Environmental Alerts" value={summary.environmental_alerts ?? 0} icon={<Bell size={18} />} onClick={() => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "alerts" })); }} />
              </div>

              <div className="sc-admin-grid-2">
                <AdminPanel title="Live GPS Map" subtitle="Authorized users · device-reported coordinates">
                  <AdminGeoMap locations={mapLocations} selected={selectedIncident?.latitude && selectedIncident?.longitude ? selectedIncident : null} />
                </AdminPanel>
                <AdminPanel title="Recent Incidents" subtitle="User reports and AI detections">
                  <div className="sc-admin-list">
                    {incidentRows.slice(0, 7).map((row) => (
                      <button key={`${row._kind}-${row.id}`} className="sc-admin-list-row" onClick={() => { setSelectedIncident(row); setWorkspaceAndClose("problems"); }}>
                        <span className={`sc-admin-severity ${String(row._urgency || "").toLowerCase().replace(/\s+/g,"-")}`}>{adminUrgencyLabel(row._urgency)}</span>
                        <div><strong>{row._title}</strong><small>{row.ticket_id || `INC-${row.id}`} · {row.user_name || row.source || "System"}</small></div>
                        <span className="sc-admin-row-time">{formatAdminTime(row._time)}</span>
                      </button>
                    ))}
                    {incidentRows.length === 0 && <AdminEmpty text="No incidents have been recorded." />}
                  </div>
                </AdminPanel>
              </div>

              <div className="sc-admin-grid-2">
                <AdminPanel title="Environmental Snapshot" subtitle={live ? "Current Firebase / sensor telemetry" : "No current telemetry available"}>
                  <div className="sc-admin-environment-grid">
                    {environmentValues.map(([label, value, unit]) => <AdminMetricCard key={label} label={label} value={value} unit={unit} />)}
                    <AdminMetricCard label="IAQ" value={live?.iaq} unit="" badge={iaqStatus} />
                  </div>
                </AdminPanel>
                <AdminPanel title="Recent Alerts" subtitle="Open environmental, device and system alerts">
                  <div className="sc-admin-list">
                    {alerts.filter((a) => a.status === "Open").slice(0, 7).map((a) => (
                      <button key={a.id} className="sc-admin-list-row alert" onClick={() => { setWorkspaceAndClose("monitoring"); setTabs((t) => ({ ...t, monitoring: "alerts" })); }}>
                        <span className={`sc-admin-alert-marker ${String(a.severity).toLowerCase()}`}></span>
                        <div><strong>{a.title}</strong><small>{a.message}</small></div>
                        <span className="sc-admin-row-time">{formatAdminTime(a.created_at)}</span>
                      </button>
                    ))}
                    {alerts.filter((a) => a.status === "Open").length === 0 && <AdminEmpty text="No active alerts." />}
                  </div>
                </AdminPanel>
              </div>
            </div>
          )}

          {workspace === "operations" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="OPERATIONS" title="Live Operations" description="Real-time user movement, device context and historical GPS evidence." />
              <AdminTabs items={[["map","LIVE MAP"],["users","LIVE USERS"],["history","LOCATION HISTORY"]]} active={tabs.operations} onChange={(v) => setTabs((t) => ({ ...t, operations: v }))} />
              {tabs.operations === "map" && <AdminPanel title="Live GPS Map" subtitle="Positions are recorded from authorized users' device GPS. No coordinates are invented."><AdminGeoMap locations={mapLocations} large /></AdminPanel>}
              {tabs.operations === "users" && <AdminPanel title="Live users" subtitle="Latest authorized device status and GPS synchronization">
                <div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Name</th><th>Status</th><th>GPS</th><th>Accuracy</th><th>Last update</th><th>Location</th><th>Incident</th></tr></thead><tbody>
                  {locations.map((u) => <tr key={u.user_id}>
                    <td><button className="sc-admin-table-link" onClick={() => selectUser(u.user_id)}><strong>{u.name || "User"}</strong><small>{u.email}</small></button></td>
                    <td><AdminStatus value={u.status || "Idle"} /></td>
                    <td><AdminStatus value={u.latitude != null && u.longitude != null ? ((u.timestamp && Date.now()-new Date(u.timestamp).getTime()>120000) ? "GPS Stale" : "GPS Active") : "Unavailable"} /></td>
                    <td>{u.accuracy != null ? `±${Number(u.accuracy).toFixed(0)} m` : "--"}</td>
                    <td>{formatAdminTime(u.timestamp)}</td>
                    <td>{u.latitude != null ? `${Number(u.latitude).toFixed(6)}, ${Number(u.longitude).toFixed(6)}` : "Location unavailable"}</td>
                    <td>{complaints.some((c) => c.user_id === u.user_id && ["Open","In Progress"].includes(c.status)) ? "Active" : "None"}</td>
                  </tr>)}
                  {locations.length === 0 && <tr><td colSpan="7"><AdminEmpty text="No live user GPS records are available yet." /></td></tr>}
                </tbody></table></div>
              </AdminPanel>}
              {tabs.operations === "history" && <AdminLocationHistory users={users} locations={mapLocations} adminFetch={adminFetch} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />}
            </div>
          )}

          {workspace === "users" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="USERS" title="User management" description="Authorized-user database, device context, GPS history and activity." />
              <AdminTabs items={[["database","DATABASE"],["details","USER DETAILS"],["activity","ACTIVITY"]]} active={tabs.users} onChange={(v) => setTabs((t) => ({ ...t, users: v }))} />
              {tabs.users === "database" && (
                <AdminPanel title="User Database" subtitle={`${filteredUsers.length} synchronized users`}>
                  <div className="sc-admin-toolbar"><div className="sc-admin-search"><Activity size={15} /><input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search by name, email, user ID or device" /></div><button className="secondary-button small" onClick={downloadReport}>Export</button></div>
                  <div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Profile</th><th>User ID</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>GPS</th><th>Last Active</th><th>Device</th><th>Account</th><th>Actions</th></tr></thead><tbody>
                    {filteredUsers.map((u) => {
                      const loc = locations.find((l) => l.user_id === u.user_id);
                      return <tr key={u.user_id}><td><div className="sc-admin-user-cell"><span className="sc-admin-avatar">{String(u.name || "U").trim().charAt(0).toUpperCase()}</span><strong>{u.name || "User"}</strong></div></td><td className="mono">{u.user_id}</td><td>{u.email || "--"}</td><td>{u.role || "user"}</td><td>{u.department || "--"}</td><td><AdminStatus value={u.status || "Idle"} /></td><td><AdminStatus value={loc?.latitude != null ? "Active" : "Unavailable"} /></td><td>{formatAdminTime(u.last_active)}</td><td>{u.device_id || "--"}</td><td><AdminStatus value={u.account_status || "Enabled"} /></td><td><button className="sc-admin-table-action" onClick={() => selectUser(u.user_id)}>View</button></td></tr>;
                    })}
                    {filteredUsers.length === 0 && <tr><td colSpan="11"><AdminEmpty text="No synchronized users. A verified Firebase user will appear after opening the dashboard and granting location access." /></td></tr>}
                  </tbody></table></div>
                </AdminPanel>
              )}
              {tabs.users === "details" && (
                <AdminUserDetails detail={userDetail} onBack={() => setTabs((t) => ({ ...t, users: "database" }))} onUpdate={updateUserAccount} onIncidentOpen={(row)=>setSelectedIncident(row)} />
              )}
              {tabs.users === "activity" && <AdminPanel title="User and system activity" subtitle="Administrative activity is recorded by the backend."><AdminActivityTable rows={data.activity || []} /></AdminPanel>}
            </div>
          )}

          {workspace === "monitoring" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="MONITORING" title="Environmental & device monitoring" description="Live sensor values, air quality, cameras, connected ESP32 devices and alerts." />
              <AdminTabs items={[["environment","ENVIRONMENT"],["air","AIR QUALITY"],["cameras","CAMERAS"],["sensors","SENSORS"],["alerts","ALERTS"]]} active={tabs.monitoring} onChange={(v) => setTabs((t) => ({ ...t, monitoring: v }))} />
              {tabs.monitoring === "environment" && <AdminEnvironment live={live} values={environmentValues} thresholds={thresholds} />}
              {tabs.monitoring === "air" && <AdminAirQuality live={live} iaqValue={iaqValue} iaqStatus={iaqStatus} thresholds={thresholds} />}
              {tabs.monitoring === "cameras" && <AdminCameras live={live} />}
              {tabs.monitoring === "sensors" && <AdminSensors devices={devices} />}
              {tabs.monitoring === "alerts" && <AdminAlerts alerts={alerts} onResolve={resolveAlert} />}
            </div>
          )}

          {workspace === "problems" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="INCIDENTS" title="Problem Desk" description="Incoming reports, verification, active incidents and verified history." />
              <AdminTabs items={[["inbox","INBOX"],["verification","VERIFICATION"],["active","ACTIVE"],["history","HISTORY"]]} active={tabs.problems} onChange={(v) => setTabs((t) => ({ ...t, problems: v }))} />
              <div className="sc-admin-toolbar sc-admin-problem-toolbar">
                <div className="sc-admin-filter-row">
                  {["all","urgent","active","history"].map((key) => <button key={key} className={incidentFilter === key ? "active" : ""} onClick={() => setIncidentFilter(key)}>{key === "all" ? "All" : key[0].toUpperCase()+key.slice(1)}</button>)}
                </div>
              </div>
              {(tabs.problems === "inbox" || tabs.problems === "active" || tabs.problems === "history") && (
                <AdminIncidentTable rows={filteredIncidents.filter((r) => tabs.problems === "active" ? ["Open","In Progress","pending"].includes(String(r._status)) : tabs.problems === "history" ? ["Resolved","Closed","rejected","approved"].includes(String(r._status)) : true)} onOpen={(row) => setSelectedIncident(row)} />
              )}
              {tabs.problems === "verification" && (
                <AdminVerificationQueue
                  rows={filteredIncidents.filter((r) => ["Open","In Progress","pending"].includes(String(r._status)))}
                  adminFetch={adminFetch}
                  onDone={async () => { await load(false); }}
                  onOpen={(row) => setSelectedIncident(row)}
                />
              )}
            </div>
          )}

          {workspace === "reports" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="REPORTS" title="Reports & exports" description="Historical environmental, user, incident, GPS, device and administrative reporting." />
              <AdminTabs items={[["environment","ENVIRONMENT"],["users","USERS"],["incidents","INCIDENTS"],["gps","GPS"],["devices","DEVICES"],["exports","EXPORTS"]]} active={tabs.reports} onChange={(v) => setTabs((t) => ({ ...t, reports: v }))} />
              {tabs.reports === "environment" && <AdminReportEnvironment history={data.environment_history || []} />}
              {tabs.reports === "users" && <AdminReportUsers users={users} />}
              {tabs.reports === "incidents" && <AdminIncidentReport rows={incidentRows} />}
              {tabs.reports === "gps" && <AdminReportGps locations={mapLocations} />}
              {tabs.reports === "devices" && <AdminSensors devices={devices} />}
              {tabs.reports === "exports" && <AdminExportPanel reportType={reportType} setReportType={setReportType} reportUser={reportUser} setReportUser={setReportUser} reportStart={reportStart} setReportStart={setReportStart} reportEnd={reportEnd} setReportEnd={setReportEnd} users={users} onExport={downloadReport} />}
            </div>
          )}

          {workspace === "communications" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="COMMUNICATIONS" title="Official communications" description="Create grounded drafts, review them, approve sending and maintain sent history." />
              <AdminTabs items={[["drafts","AI DRAFTS"],["recipients","RECIPIENTS"],["history","SENT HISTORY"]]} active={tabs.communications} onChange={(v) => setTabs((t) => ({ ...t, communications: v }))} />
              {tabs.communications === "drafts" && <AdminCommunicationsDrafts complaints={complaints} detections={detections} draftForm={draftForm} setDraftForm={setDraftForm} recipients={data.recipients || []} onGenerate={generateDraft} onSave={saveDraft} onSend={sendDraft} busy={draftSaving} />}
              {tabs.communications === "recipients" && <AdminRecipients recipients={data.recipients || []} form={recipientForm} setForm={setRecipientForm} onAdd={addRecipient} onDelete={deleteRecipient} />}
              {tabs.communications === "history" && <AdminCommunicationHistory rows={data.communications || []} />}
            </div>
          )}

          {workspace === "system" && (
            <div className="sc-admin-workspace">
              <AdminWorkspaceHeader eyebrow="SYSTEM" title="System administration" description="Threshold configuration, automatic alert logic, audit trail and system settings." />
              <AdminTabs items={[["thresholds","THRESHOLDS"],["activity","ADMIN ACTIVITY"],["settings","SETTINGS"]]} active={tabs.system} onChange={(v) => setTabs((t) => ({ ...t, system: v }))} />
              {tabs.system === "thresholds" && <AdminThresholds rows={thresholdDraft} setRows={setThresholdDraft} onSave={saveThresholds} />}
              {tabs.system === "activity" && <AdminPanel title="Admin Activity" subtitle="Sensitive administrator actions are recorded with time and target."><AdminActivityTable rows={data.activity || []} /></AdminPanel>}
              {tabs.system === "settings" && <AdminSystemSettings backendStatus={backendStatus} adminConfigured={data.system?.admin_configured} authDisabled={data.system?.auth_disabled} firebaseReady={data.system?.firebase_admin_ready} onRefresh={refresh} />}
            </div>
          )}
        </div>
      </main>

      {selectedIncident && (
        <AdminIncidentDrawer
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onGenerateDraft={generateDraft}
          adminFetch={adminFetch}
          adminFetchBinary={adminFetchBinary}
          onUpdated={async () => { setSelectedIncident(null); await load(false); }}
        />
      )}
    </div>
  );
}

function AdminStat({ label, value, icon, onClick }) {
  return (
    <button className="sc-admin-stat" type="button" onClick={onClick}>
      <span className="sc-admin-stat-icon">{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
      <em>Open workspace <ArrowUpRight size={12} /></em>
    </button>
  );
}

function AdminPanel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`sc-admin-panel ${className}`}>
      <div className="sc-admin-panel-head"><div><h3>{title}</h3><p>{subtitle}</p></div></div>
      {children}
    </section>
  );
}

function AdminWorkspaceHeader({ eyebrow, title, description }) {
  return <div className="sc-admin-title-row"><div><div className="sc-admin-eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div>;
}

function AdminTabs({ items, active, onChange }) {
  return <div className="sc-admin-tabs">{items.map(([id, label]) => <button key={id} className={id === active ? "active" : ""} onClick={() => onChange(id)}>{label}</button>)}</div>;
}

function AdminEmpty({ text }) {
  return <div className="sc-admin-empty"><span><Activity size={17} /></span><strong>{text}</strong></div>;
}

function AdminMetricCard({ label, value, unit, badge }) {
  const valid = value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  return <div className="sc-admin-metric"><small>{label}</small><strong>{valid ? Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "No data"}{valid && unit ? <em>{unit}</em> : null}</strong>{badge && <span className={`sc-admin-badge ${String(badge).toLowerCase()}`}>{badge}</span>}</div>;
}

function AdminStatus({ value }) {
  const v = String(value || "Unknown");
  const low = v.toLowerCase();
  const kind = low.includes("active") || low.includes("working") || low.includes("connected") || low === "enabled" || low === "resolved" ? "good" : low.includes("urgent") || low.includes("critical") || low.includes("error") || low.includes("offline") || low.includes("rejected") ? "bad" : "neutral";
  return <span className={`sc-admin-status ${kind}`}>{v}</span>;
}


function AdminGeoMap({ locations = [], selected = null, large = false }) {
  const mapContainerRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const markerLayerRef = React.useRef(null);
  const [mapReady, setMapReady] = React.useState(false);
  const [mapError, setMapError] = React.useState("");

  const points = locations.filter((p) =>
    Number.isFinite(Number(p.latitude)) &&
    Number.isFinite(Number(p.longitude))
  );

  React.useEffect(() => {
    let cancelled = false;
    const loadLeaflet = () => {
      if (window.L) {
        setMapReady(true);
        return;
      }
      const existingCss = document.querySelector('link[data-smart-surround-leaflet="1"]');
      if (!existingCss) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.dataset.smartSurroundLeaflet = "1";
        document.head.appendChild(link);
      }
      const existingScript = document.querySelector('script[data-smart-surround-leaflet="1"]');
      if (existingScript) {
        existingScript.addEventListener("load", () => !cancelled && setMapReady(true), { once: true });
        existingScript.addEventListener("error", () => !cancelled && setMapError("Map service could not be loaded."), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.dataset.smartSurroundLeaflet = "1";
      script.onload = () => !cancelled && setMapReady(true);
      script.onerror = () => !cancelled && setMapError("Map service could not be loaded.");
      document.body.appendChild(script);
    };
    loadLeaflet();
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (!mapReady || !mapContainerRef.current || !window.L) return;
    const L = window.L;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
        minZoom: 2,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);
      markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;
    markerLayerRef.current.clearLayers();

    if (points.length === 0) {
      map.setView([20, 78], 4);
      return;
    }

    const bounds = L.latLngBounds([]);
    points.forEach((point) => {
      const lat = Number(point.latitude);
      const lon = Number(point.longitude);
      bounds.extend([lat, lon]);
      const stale = point.timestamp ? (Date.now() - new Date(point.timestamp).getTime() > 120000) : true;
      const state = point.marker_state || (stale ? "OFFLINE" : "NORMAL");
      const stateColor = state === "CRITICAL" ? "#b42318" : state === "URGENT" ? "#d97706" : state === "ATTENTION" ? "#e6a400" : state === "OFFLINE" ? "#8f867f" : "#ff7417";
      const marker = L.circleMarker([lat, lon], {
        radius: state === "OFFLINE" ? 6 : 7,
        color: stateColor,
        weight: 2,
        fillColor: stateColor,
        fillOpacity: 0.88,
      });
      marker.bindPopup(
        `<strong>${escapeAdminHtml(point.name || "User")}</strong><br>` +
        `${escapeAdminHtml(point.status || "Working")} · ${escapeAdminHtml(point.marker_state || "NORMAL")}<br>` +
        `Accuracy: ${point.accuracy != null ? `±${Number(point.accuracy).toFixed(0)} m` : "Unavailable"}<br>` +
        `Updated: ${escapeAdminHtml(formatAdminTime(point.timestamp))}<br>` +
        `Temperature: ${point.temperature != null ? `${escapeAdminHtml(point.temperature)} °C` : "No data"} · Humidity: ${point.humidity != null ? `${escapeAdminHtml(point.humidity)} %` : "No data"}<br>` +
        `IAQ: ${point.iaq != null ? escapeAdminHtml(point.iaq) : "No data"} · Incident: ${escapeAdminHtml(point.incident || "None")}<br>` +
        `<code>${Number(point.latitude).toFixed(6)}, ${Number(point.longitude).toFixed(6)}</code>`
      );
      markerLayerRef.current.addLayer(marker);
    });

    if (selected && selected.latitude != null && selected.longitude != null) {
      map.setView([Number(selected.latitude), Number(selected.longitude)], 17);
    } else if (points.length === 1) {
      map.setView([Number(points[0].latitude), Number(points[0].longitude)], 16);
    } else {
      map.fitBounds(bounds.pad(0.18));
    }

    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(resizeTimer);
  }, [mapReady, locations, selected]);

  React.useEffect(() => () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerLayerRef.current = null;
    }
  }, []);

  return (
    <div className={`sc-admin-map${large ? " large" : ""}`}>
      {points.length === 0 ? (
        <div className="sc-admin-map-empty">
          <MapPin size={25} />
          <strong>Location unavailable</strong>
          <span>No real GPS records have been received.</span>
        </div>
      ) : (
        <>
          <div ref={mapContainerRef} className="sc-admin-leaflet-map" />
          {(!mapReady || mapError) && (
            <div className="sc-admin-map-overlay">
              {mapError || "Loading live map…"}
            </div>
          )}
          <div className="sc-admin-map-status"><span></span>{points.length} authorized GPS point{points.length === 1 ? "" : "s"}</div>
        </>
      )}
      {points.length > 0 && <div className="sc-admin-map-foot"><small>Precise locations are visible only inside the protected administrator workspace.</small><a href={`https://www.openstreetmap.org/?mlat=${points[0].latitude}&mlon=${points[0].longitude}#map=16/${points[0].latitude}/${points[0].longitude}`} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={12} /></a></div>}
    </div>
  );
}

function escapeAdminHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function AdminEnvironment({ live, values, thresholds }) {
  return (
    <div className="sc-admin-stack">
      <div className="sc-admin-environment-grid big">
        {values.map(([label, value, unit]) => {
          const th = thresholds[label];
          let badge = "No data";
          if (value != null) {
            if (th?.critical != null && Number(value) >= Number(th.critical)) badge = "CRITICAL";
            else if (th?.warning != null && Number(value) >= Number(th.warning)) badge = "ATTENTION";
            else if (th?.minimum != null && Number(value) < Number(th.minimum)) badge = "ATTENTION";
            else if (th?.maximum != null && Number(value) > Number(th.maximum)) badge = "ATTENTION";
            else badge = "GOOD";
          }
          return <AdminMetricCard key={label} label={label} value={value} unit={unit} badge={badge} />;
        })}
      </div>
      <AdminPanel title="Device connection context" subtitle={live ? `Source ${live.device_id || "Firebase sensors"} · Last snapshot ${formatAdminTime(live.timestamp)}` : "No connected sensor snapshot"}>
        {live ? <div className="sc-admin-detail-grid"><AdminMetricCard label="ESP32 IP" value={live.ip || "No data"} /><AdminMetricCard label="Camera" value={live.camera_online ? "Connected" : "Offline"} /><AdminMetricCard label="Device status" value={live.status || "Connected"} /></div> : <AdminEmpty text="Connect your ESP32 to see live readings." />}
      </AdminPanel>
    </div>
  );
}

function AdminAirQuality({ live, iaqValue, iaqStatus, thresholds }) {
  const rows = [["IAQ", live?.iaq, ""],["PM1.0",live?.pm1,"µg/m³"],["PM2.5",live?.pm25,"µg/m³"],["PM10",live?.pm10,"µg/m³"],["CO₂",live?.co2,"ppm"],["VOC",live?.voc,"ppm"]];
  return <div className="sc-admin-grid-2"><div className={`sc-admin-iaq-card ${String(iaqStatus).toLowerCase()}`}><div className="sc-admin-iaq-ring"><strong>{iaqValue != null ? Number(iaqValue).toFixed(0) : "--"}</strong><small>IAQ INDEX</small></div><h3>{iaqStatus}</h3><p>Calculated from administrator-configured thresholds.</p></div><AdminPanel title="Air quality variables" subtitle="Only values received from the connected sensor are shown."><div className="sc-admin-environment-grid">{rows.slice(1).map(([label,value,unit]) => <AdminMetricCard key={label} label={label} value={value} unit={unit} />)}</div></AdminPanel></div>;
}

function AdminCameras({ live }) {
  return <AdminPanel title="Authorized Cameras" subtitle="No camera is marked live unless an actual status is received from the backend."><div className="sc-admin-camera-grid"><div className="sc-admin-camera"><div className="sc-admin-camera-status"><span></span>{live?.camera_online ? "CONNECTED" : "CAMERA OFFLINE"}</div><Camera size={34}/><strong>{live?.camera_online ? "Authorized camera" : "No live camera feed"}</strong><small>{live?.camera_ip ? `Camera IP: ${live.camera_ip}` : "No authorized camera feed is configured."}</small>{live?.camera_online && <button className="secondary-button small" type="button" onClick={() => live?.camera_ip && window.open(`http://${live.camera_ip}`, "_blank", "noopener,noreferrer")}>Open camera</button>}</div></div></AdminPanel>;
}

function AdminSensors({ devices }) {
  return <AdminPanel title="ESP32 / sensor devices" subtitle={`${devices.length} registered device records`}><div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Device ID</th><th>Device Type</th><th>Assigned User</th><th>Connection</th><th>Last Update</th><th>Sensors</th><th>Battery</th></tr></thead><tbody>{devices.map((d) => <tr key={d.device_id}><td className="mono">{d.device_id}</td><td>{d.device_type || "ESP32"}</td><td>{d.assigned_user_id || "--"}</td><td><AdminStatus value={d.connection}/></td><td>{formatAdminTime(d.last_update)}</td><td>{d.sensor_availability || "No data"}</td><td>{d.battery != null ? `${d.battery}%` : "--"}</td></tr>)}{devices.length===0 && <tr><td colSpan="7"><AdminEmpty text="No sensor devices have synchronized yet." /></td></tr>}</tbody></table></div></AdminPanel>;
}

function AdminAlerts({ alerts, onResolve }) {
  return <div className="sc-admin-stack">{alerts.map((a) => <article className={`sc-admin-alert-card ${String(a.severity).toLowerCase()}`} key={a.id}><div><span className="sc-admin-eyebrow">{a.severity} · {a.alert_type}</span><h3>{a.title}</h3><p>{a.message}</p><small>{formatAdminTime(a.created_at)}{a.sensor ? ` · ${a.sensor}` : ""}</small></div><div>{a.status === "Open" && <button className="secondary-button small" onClick={() => onResolve(a.id)}>Resolve</button>}</div></article>)}{alerts.length===0 && <AdminPanel title="Alerts" subtitle="Environmental, device, GPS and incident alerts"><AdminEmpty text="No alerts have been recorded." /></AdminPanel>}</div>;
}

function adminUrgencyLabel(value) {
  const v = String(value || "").toLowerCase();
  if (v === "normal") return "ROUTINE";
  if (v === "intermediate") return "PRIORITY";
  if (v === "urgent" || v === "high") return "URGENT";
  if (v === "critical") return "CRITICAL";
  return String(value || "ROUTINE").toUpperCase();
}

function AdminIncidentTable({ rows, onOpen }) {
  return <AdminPanel title="Incident queue" subtitle={`${rows.length} records`}><div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Incident ID</th><th>User</th><th>Problem</th><th>Category</th><th>Urgency</th><th>GPS</th><th>Submitted</th><th>Status</th><th></th></tr></thead><tbody>{rows.map((r) => { const gps = r.lat != null && r.lon != null; return <tr key={`${r._kind}-${r.id}`}><td className="mono">{r.ticket_id || `INC-${r.id}`}</td><td>{r.user_name || r.source || "--"}</td><td><strong>{r._title}</strong></td><td>{r.category || r.hazard_type || "Road damage"}</td><td><span className={`sc-admin-urgency ${String(r._urgency).toLowerCase()}`}>{adminUrgencyLabel(r._urgency)}</span></td><td>{gps ? "GPS Active" : "Unavailable"}</td><td>{formatAdminTime(r._time)}</td><td><AdminStatus value={r._status || "Open"} /></td><td><button className="sc-admin-table-action" onClick={() => onOpen(r)}>View</button></td></tr>})}{rows.length===0 && <tr><td colSpan="9"><AdminEmpty text="No incidents match the current filters." /></td></tr>}</tbody></table></div></AdminPanel>;
}

function AdminVerificationQueue({ rows, adminFetch, onDone, onOpen }) {
  const [busyId,setBusyId]=React.useState(null);
  const act=async(row,action)=>{
    setBusyId(row.id);
    try{
      if(row._kind==="Problem"){
        if(action==="request_info"||action==="escalate"||action==="verify"||action==="resolve"||action==="reject"){
          const notes = action==="request_info"
            ? "Additional information requested from the reporting user."
            : action==="escalate"
              ? "Incident escalated for immediate administrative attention."
              : "";
          await adminFetch(`/admin/complaints/${row.id}/verify`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({action,notes})
          });
          if(action==="escalate"){
            await adminFetch(`/admin/complaints/${row.id}/update`,{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({status:"In Progress",priority:"Urgent"})
            });
          }
        }
      }else{
        await adminFetch(`/admin/${action}/${row.id}`,{method:"POST"});
      }
      await onDone();
    }catch(err){console.error(err);}finally{setBusyId(null);}
  };
  return <AdminPanel title="Verification queue" subtitle="Review recorded evidence before changing incident state.">
    <div className="sc-admin-verification-grid">
      {rows.map((r)=><article key={`${r._kind}-${r.id}`}>
        <div className="sc-admin-eyebrow">{r.ticket_id||`INC-${r.id}`} · {adminUrgencyLabel(r._urgency)}</div>
        <h3>{r._title}</h3>
        <p>{r.description || r.damage_class || "Recorded incident data."}</p>
        <div className="sc-admin-verification-meta">
          <span>{r.user_name || r.source || "System"}</span>
          <span>{r.lat != null && r.lon != null ? `GPS ${Number(r.lat).toFixed(5)}, ${Number(r.lon).toFixed(5)}` : "Location unavailable"}</span>
          <span>{formatAdminTime(r._time)}</span>
        </div>
        <div className="sc-admin-actions">
          <button className="secondary-button small" onClick={()=>onOpen(r)}>Details</button>
          {r._kind==="Problem" ? <>
            <button className="secondary-button small" disabled={busyId===r.id} onClick={()=>act(r,"verify")}>Verify</button>
            <button className="secondary-button small" disabled={busyId===r.id} onClick={()=>act(r,"request_info")}>Request info</button>
            <button className="secondary-button small" disabled={busyId===r.id} onClick={()=>act(r,"escalate")}>Escalate</button>
            <button className="primary-button small" disabled={busyId===r.id} onClick={()=>act(r,"resolve")}>Resolve</button>
          </> : <>
            <button className="secondary-button small" disabled={busyId===r.id} onClick={()=>act(r,"reject")}>Reject</button>
            <button className="primary-button small" disabled={busyId===r.id} onClick={()=>act(r,"approve")}>Approve</button>
          </>}
        </div>
      </article>)}
      {rows.length===0&&<AdminEmpty text="No incidents currently require verification."/>}
    </div>
  </AdminPanel>;
}

function AdminIncidentDrawer({ incident, onClose, onGenerateDraft, adminFetch, adminFetchBinary, onUpdated }) {
  const kind=incident._kind || (incident.ticket_id ? "Problem" : "AI Detection");
  const [status,setStatus]=React.useState(
    kind==="AI Detection"
      ? String(incident.status||incident._status||"pending").toLowerCase()
      : (incident.status||incident._status||"Open")
  );
  const [reply,setReply]=React.useState(incident.admin_reply||"");
  const [priority,setPriority]=React.useState(incident.priority||"Normal");
  const [notes,setNotes]=React.useState(incident.verification_notes||"");
  const [busy,setBusy]=React.useState(false);
  const [attachmentBusy,setAttachmentBusy]=React.useState(false);
  let environmentSnapshot={};
  try{ environmentSnapshot = incident.environment_snapshot_json ? JSON.parse(incident.environment_snapshot_json) : {}; }catch(_){ environmentSnapshot={}; }

  const openAttachment=async()=>{
    if(!incident.attachment_path || !adminFetchBinary) return;
    setAttachmentBusy(true);
    try{
      const blob=await adminFetchBinary(`/admin/complaints/${incident.id}/attachment`);
      const url=URL.createObjectURL(blob);
      window.open(url,"_blank","noopener,noreferrer");
      window.setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(err){ console.error(err); } finally { setAttachmentBusy(false); }
  };

  const save=async()=>{
    setBusy(true);
    try{
      if(kind==="Problem"){
        await adminFetch(`/admin/complaints/${incident.id}/update`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({status,admin_reply:reply,priority})
        });
        if(["Resolved","Closed","In Progress"].includes(status)){
          const action=status==="Resolved"?"resolve":status==="Closed"?"reject":"verify";
          await adminFetch(`/admin/complaints/${incident.id}/verify`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({action,notes})
          });
        }
      }else{
        const action=status==="approved"?"approve":status==="rejected"?"reject":null;
        if(action) await adminFetch(`/admin/${action}/${incident.id}`,{method:"POST"});
      }
      await onUpdated();
    }catch(err){console.error(err);}finally{setBusy(false);}
  };

  const gpsAvailable = incident.incident_latitude != null && incident.incident_longitude != null
    || incident.lat != null && incident.lon != null;

  return <div className="sc-admin-drawer-backdrop" onClick={onClose}>
    <aside className="sc-admin-drawer" onClick={(e)=>e.stopPropagation()}>
      <div className="sc-admin-drawer-head">
        <div>
          <div className="sc-admin-eyebrow">{kind==="Problem"?"PROBLEM DESK":"AI DETECTION"}</div>
          <h2>{incident.ticket_id||`INC-${incident.id}`}</h2>
        </div>
        <button className="sc-admin-icon-button" onClick={onClose}><X size={16}/></button>
      </div>

      <div className="sc-admin-drawer-body">
        <div className="sc-admin-drawer-block">
          <span>{kind==="Problem"?"Reported problem":"Detected condition"}</span>
          <strong>{incident.subject||incident.damage_class||"Recorded incident"}</strong>
          <p>{incident.description||"No description was recorded."}</p>
        </div>

        <div className="sc-admin-detail-grid">
          <AdminMetricCard label="User / Source" value={incident.user_name||incident.source||"System"}/>
          <AdminMetricCard label="Category" value={incident.category||incident.hazard_type||"Other"}/>
          <AdminMetricCard label="Urgency" value={adminUrgencyLabel(incident.priority||incident.severity)}/>
          <AdminMetricCard label="Submitted" value={formatAdminTime(incident.created_at||incident._time)}/>
          <AdminMetricCard label="Latitude" value={incident.lat ?? incident.incident_latitude}/>
          <AdminMetricCard label="Longitude" value={incident.lon ?? incident.incident_longitude}/>
          <AdminMetricCard label="GPS Accuracy" value={incident.accuracy != null ? `±${incident.accuracy} m` : incident.incident_accuracy != null ? `±${incident.incident_accuracy} m` : "Unavailable"}/>
          <AdminMetricCard label="Captured GPS time" value={formatAdminTime(incident.gps_time||incident.incident_gps_time)}/>
        </div>

        <AdminPanel title="Incident status" subtitle={gpsAvailable ? "The GPS snapshot remains fixed to the time of submission." : "No GPS snapshot was recorded."}>
          <div className="sc-admin-detail-grid">
            <AdminMetricCard label="Current status" value={incident.status||incident._status||"Open"}/>
            <AdminMetricCard label="Verified by" value={incident.verified_by||"Not verified"}/>
            <AdminMetricCard label="Verified at" value={formatAdminTime(incident.verified_at)}/>
            <AdminMetricCard label="Verification notes" value={incident.verification_notes||"No notes recorded"}/>
          </div>
        </AdminPanel>

        {incident.attachment_path&&<div className="sc-admin-drawer-attachment">
          <Paperclip size={15}/>
          <span>Attachment recorded</span>
          <button className="secondary-button small" type="button" onClick={openAttachment} disabled={attachmentBusy}>{attachmentBusy?"Opening…":"View attachment"}</button>
        </div>}

        {Object.keys(environmentSnapshot).some(k=>environmentSnapshot[k]!==null && environmentSnapshot[k]!==undefined && k!=="timestamp")&&
          <AdminPanel title="Environmental snapshot" subtitle={`Recorded near incident submission · ${formatAdminTime(environmentSnapshot.timestamp)}`}>
            <div className="sc-admin-environment-grid">
              {[
                ["Temperature","temperature","°C"],["Humidity","humidity","%"],["PM1.0","pm1","µg/m³"],
                ["PM2.5","pm25","µg/m³"],["PM10","pm10","µg/m³"],["CO₂","co2","ppm"],["VOC","voc","ppm"],["IAQ","iaq",""]
              ].filter(([,key])=>environmentSnapshot[key]!==null && environmentSnapshot[key]!==undefined)
               .map(([label,key,unit])=><AdminMetricCard key={key} label={label} value={environmentSnapshot[key]} unit={unit}/>)}
            </div>
          </AdminPanel>
        }

        {kind==="Problem" ? <div className="sc-admin-stack">
          <label className="sc-admin-field"><span>Urgency</span>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="Normal">ROUTINE</option>
              <option value="Intermediate">PRIORITY</option>
              <option value="Urgent">URGENT</option>
              <option value="Critical">CRITICAL</option>
            </select>
          </label>
          <label className="sc-admin-field"><span>Status</span>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
            </select>
          </label>
          <label className="sc-admin-field"><span>Verification notes</span>
            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows="4" placeholder="Record evidence review or administrative notes…"/>
          </label>
          <label className="sc-admin-field"><span>Administrative response</span>
            <textarea value={reply} onChange={(e)=>setReply(e.target.value)} rows="5" placeholder="Record a factual administrative response…"/>
          </label>
        </div> : <label className="sc-admin-field"><span>Detection status</span>
          <select value={status} onChange={(e)=>setStatus(e.target.value.toLowerCase())}>
            <option value="pending">PENDING</option>
            <option value="approved">APPROVED</option>
            <option value="rejected">REJECTED</option>
          </select>
        </label>}
      </div>

      <div className="sc-admin-drawer-foot">
        <button className="secondary-button small" onClick={onClose}>Cancel</button>
        <button className="primary-button small" disabled={busy} onClick={save}>{busy?"Saving…":"Apply Changes"}</button>
        {(incident.status==="Resolved"||incident.status==="approved"||incident._status==="approved")&&
          <button className="secondary-button small" onClick={()=>onGenerateDraft(incident.id,kind)}>Generate Draft</button>}
      </div>
    </aside>
  </div>;
}

function AdminUserDetails({ detail, onBack, onUpdate, onIncidentOpen }) {
  const user=detail?.user;
  if(!user) return <AdminPanel title="User Details" subtitle="Select a user from the Database tab."><AdminEmpty text="No user selected." /></AdminPanel>;
  const latest=Array.isArray(detail.locations)&&detail.locations[0];
  const [form,setForm]=React.useState({
    phone:user.phone||"",
    department:user.department||"",
    role:user.role||"user",
    status:user.status||"Idle",
    account_status:user.account_status||"Enabled",
  });
  React.useEffect(()=>setForm({
    phone:user.phone||"",
    department:user.department||"",
    role:user.role||"user",
    status:user.status||"Idle",
    account_status:user.account_status||"Enabled",
  }),[user.user_id,user.phone,user.department,user.role,user.status,user.account_status]);

  const save=()=>onUpdate(user.user_id,form);

  return <div className="sc-admin-grid-2">
    <AdminPanel title={user.name||"User"} subtitle={user.email||"Authorized user"}>
      <div className="sc-admin-profile-card">
        <span className="sc-admin-avatar large">{String(user.name||"U").charAt(0).toUpperCase()}</span>
        <div><h3>{user.name||"User"}</h3><p>{user.user_id}</p></div>
      </div>
      <div className="sc-admin-detail-grid">
        <AdminMetricCard label="Email" value={user.email||"Not set"}/>
        <AdminMetricCard label="Created" value={formatAdminTime(user.created_at)}/>
        <AdminMetricCard label="Last Active" value={formatAdminTime(user.last_active)}/>
      </div>
      <div className="sc-admin-form-grid">
        <label className="sc-admin-field"><span>Phone</span><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
        <label className="sc-admin-field"><span>Department</span><input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label>
        <label className="sc-admin-field"><span>Role</span><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="user">User</option><option value="staff">Authorized Staff</option><option value="admin">Admin</option></select></label>
        <label className="sc-admin-field"><span>Current status</span><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Working</option><option>Idle</option><option>Offline</option></select></label>
        <label className="sc-admin-field"><span>Account status</span><select value={form.account_status} onChange={e=>setForm({...form,account_status:e.target.value})}><option>Enabled</option><option>Disabled</option></select></label>
      </div>
      <div className="sc-admin-actions">
        <button className="primary-button small" onClick={save}><Save size={14}/>Save user changes</button>
        <button className="secondary-button small" onClick={onBack}>Back to database</button>
      </div>
    </AdminPanel>

    <AdminPanel title="Current GPS" subtitle="Authoritative device GPS records">
      <AdminGeoMap locations={latest?[latest]:[]}/>
      <div className="sc-admin-detail-grid">
        <AdminMetricCard label="Latitude" value={latest?.latitude}/>
        <AdminMetricCard label="Longitude" value={latest?.longitude}/>
        <AdminMetricCard label="Accuracy" value={latest?.accuracy!=null?`±${Number(latest.accuracy).toFixed(0)} m`:"Unavailable"}/>
        <AdminMetricCard label="Timestamp" value={formatAdminTime(latest?.timestamp)}/>
        <AdminMetricCard label="Status" value={latest?.status||"Unavailable"}/>
      </div>
    </AdminPanel>

    <AdminPanel title="Device & Environment" subtitle="Only recorded device and sensor information is shown.">
      <div className="sc-admin-detail-grid">
        <AdminMetricCard label="Device" value={user.device_id||"Not recorded"}/>
        <AdminMetricCard label="Environment readings" value={detail.environment?.length||0}/>
      </div>
      {detail.environment?.length ? <div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Timestamp</th><th>Temperature</th><th>Humidity</th><th>PM2.5</th><th>CO₂</th><th>IAQ</th></tr></thead><tbody>{detail.environment.slice(0,20).map(r=><tr key={r.id}><td>{formatAdminTime(r.timestamp)}</td><td>{r.temperature ?? "--"}</td><td>{r.humidity ?? "--"}</td><td>{r.pm25 ?? "--"}</td><td>{r.co2 ?? "--"}</td><td>{r.iaq ?? "--"}</td></tr>)}</tbody></table></div> : <AdminEmpty text="No environmental data is available for this user."/>}
    </AdminPanel>

    <AdminPanel title="User incidents" subtitle={`${detail.incidents?.length||0} reported incidents`}>
      <AdminIncidentTable rows={(detail.incidents||[]).map(c=>({...c,lat:c.incident_latitude,lon:c.incident_longitude,accuracy:c.incident_accuracy,_kind:"Problem",_time:c.created_at,_status:c.status,_urgency:c.priority,_title:c.subject}))} onOpen={onIncidentOpen||(()=>{})}/>
    </AdminPanel>
  </div>;
}

function AdminActivityTable({ rows }) {
  return <div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Admin</th><th>Action</th><th>Target</th><th>Timestamp</th><th>Details</th></tr></thead><tbody>{rows.map((r)=><tr key={r.id}><td>{r.admin}</td><td>{r.action}</td><td>{r.target||"--"}</td><td>{formatAdminTime(r.timestamp)}</td><td>{r.details||"--"}</td></tr>)}{rows.length===0&&<tr><td colSpan="5"><AdminEmpty text="No administrative activity recorded yet." /></td></tr>}</tbody></table></div>;
}

function AdminLocationHistory({ users, locations, adminFetch, selectedUserId, setSelectedUserId }) {
  const [rows,setRows]=React.useState([]);
  const [loading,setLoading]=React.useState(false);
  const loadHistory=async(id)=>{setSelectedUserId(id);setLoading(true);try{const r=await adminFetch(`/admin/api/locations/history?user_id=${encodeURIComponent(id)}`);setRows(r.locations||[]);}catch(err){console.error(err);}finally{setLoading(false);}};
  React.useEffect(()=>{if(selectedUserId) loadHistory(selectedUserId);},[]);
  return <AdminPanel title="Location history" subtitle="Select a user to inspect actual recorded GPS points."><div className="sc-admin-toolbar"><select className="sc-admin-select" value={selectedUserId||""} onChange={(e)=>e.target.value&&loadHistory(e.target.value)}><option value="">Select user</option>{users.map(u=><option key={u.user_id} value={u.user_id}>{u.name||u.email||u.user_id}</option>)}</select></div>{selectedUserId&&<><AdminGeoMap locations={rows.map(r=>({...r,user_id:selectedUserId,name:users.find(u=>u.user_id===selectedUserId)?.name}))} large/><div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Timestamp</th><th>Latitude</th><th>Longitude</th><th>Accuracy</th><th>Status</th></tr></thead><tbody>{rows.map((r,i)=><tr key={`${r.timestamp}-${i}`}><td>{formatAdminTime(r.timestamp)}</td><td>{Number(r.latitude).toFixed(6)}</td><td>{Number(r.longitude).toFixed(6)}</td><td>{r.accuracy!=null?`±${Number(r.accuracy).toFixed(0)} m`:"--"}</td><td>{r.status}</td></tr>)}{rows.length===0&&<tr><td colSpan="5"><AdminEmpty text="No GPS history is available for this user." /></td></tr>}</tbody></table></div></>}</AdminPanel>;
}

function AdminReportEnvironment({ history }) {
  const rows=Array.isArray(history)?history:[];
  const recent=rows.slice(0,30);
  const metrics=["temperature","humidity","pm25","pm10","co2","iaq"];
  return <div className="sc-admin-stack"><AdminPanel title="Environmental history" subtitle="Historical values recorded from real telemetry."><div className="sc-admin-chart-grid">{metrics.map((key)=>{const vals=recent.map(r=>Number(r[key])).filter(Number.isFinite); const max=Math.max(...vals,1); const last=vals[0]; return <div className="sc-admin-mini-chart" key={key}><span>{key.toUpperCase()}</span><strong>{last!=null?last.toFixed(2):"No data"}</strong><div>{vals.slice(0,16).reverse().map((v,i)=><i key={i} style={{height:`${Math.max(5,Math.min(100,(v/max)*100))}%`}} />)}</div></div>})}</div></AdminPanel></div>;
}
function AdminReportUsers({ users }) {
  const working=users.filter(u=>String(u.status).toLowerCase()==="working").length;
  const enabled=users.filter(u=>String(u.account_status).toLowerCase()==="enabled").length;
  return <div className="sc-admin-stat-grid three"><AdminStat label="Registered" value={users.length} icon={<UserRound size={18}/>} onClick={()=>{}}/><AdminStat label="Working" value={working} icon={<Navigation size={18}/>} onClick={()=>{}}/><AdminStat label="Enabled accounts" value={enabled} icon={<CheckCircle2 size={18}/>} onClick={()=>{}}/></div>;
}
function AdminIncidentReport({ rows }) {
  const categories={};const urgencies={};const statuses={};
  rows.forEach(r=>{const c=r.category||r.hazard_type||"Other";categories[c]=(categories[c]||0)+1;const u=r._urgency||"Routine";urgencies[u]=(urgencies[u]||0)+1;const st=r._status||"Open";statuses[st]=(statuses[st]||0)+1;});
  return <div className="sc-admin-grid-2"><AdminPanel title="By category" subtitle="Recorded incident distribution"><AdminDistribution data={categories}/></AdminPanel><AdminPanel title="By urgency" subtitle="Recorded urgency"><AdminDistribution data={urgencies}/><h4>Status</h4><AdminDistribution data={statuses}/></AdminPanel></div>;
}
function AdminDistribution({ data }) { const max=Math.max(...Object.values(data),1); return <div className="sc-admin-distribution">{Object.entries(data).map(([k,v])=><div key={k}><span>{k}</span><div><i style={{width:`${(v/max)*100}%`}}></i></div><strong>{v}</strong></div>)}{Object.keys(data).length===0&&<AdminEmpty text="No recorded data."/>}</div>; }
function AdminReportGps({ locations }) { return <AdminPanel title="Authorized GPS report" subtitle="Latest real device positions"><AdminGeoMap locations={locations} large/></AdminPanel>; }
function AdminExportPanel({ reportType,setReportType,reportUser,setReportUser,reportStart,setReportStart,reportEnd,setReportEnd,users,onExport }) {
  const options=[["users","User Database"],["incidents","Incidents"],["environment","Environmental Data"],["gps","GPS Location History"],["alerts","Alerts"],["devices","Device Data"],["admin_activity","Admin Activity"],["communications","Communication History"]];
  return <AdminPanel title="Excel export" subtitle="Generate a .xlsx workbook from backend records. No synthetic data is generated.">
    <div className="sc-admin-form-grid">
      <label className="sc-admin-field"><span>Data type</span><select value={reportType} onChange={(e)=>setReportType(e.target.value)}>{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="sc-admin-field"><span>User</span><select value={reportUser} onChange={(e)=>setReportUser(e.target.value)}><option value="">All users</option>{users.map(u=><option key={u.user_id} value={u.user_id}>{u.name||u.user_id}</option>)}</select></label>
      <label className="sc-admin-field"><span>Start date</span><input type="date" value={reportStart} onChange={e=>setReportStart(e.target.value)}/></label>
      <label className="sc-admin-field"><span>End date</span><input type="date" value={reportEnd} onChange={e=>setReportEnd(e.target.value)}/></label>
    </div>
    <button className="primary-button small" onClick={onExport}><Download size={15}/>Generate Excel</button>
  </AdminPanel>;
}

function AdminCommunicationsDrafts({ complaints,detections,draftForm,setDraftForm,recipients,onGenerate,onSave,onSend,busy }) {
  const verified=[
    ...(complaints||[]).filter(c=>["Resolved","Closed"].includes(c.status)).map(c=>({...c,_kind:"Problem"})),
    ...(detections?.approved||[]).map(d=>({...d,_kind:"AI Detection"}))
  ];
  return <div className="sc-admin-grid-2"><AdminPanel title="AI-assisted incident draft" subtitle="Drafts are grounded in recorded incident fields only and never auto-send.">{!draftForm?<><AdminEmpty text="Select a resolved/approved incident to generate an official draft."/><div className="sc-admin-stack">{verified.slice(0,8).map(i=><button className="sc-admin-incident-picker" key={`${i._kind}-${i.ticket_id||"d"}-${i.id}`} onClick={()=>onGenerate(i.id,i._kind)} disabled={busy}><div><strong>{i.ticket_id||`INC-${i.id}`}</strong><span>{i.subject||i.damage_class||"Incident"} · {i._kind}</span></div><ArrowRight size={15}/></button>)}</div></>:<div className="sc-admin-draft"><label className="sc-admin-field"><span>To</span><select value={draftForm.recipient||""} onChange={(e)=>setDraftForm({...draftForm,recipient:e.target.value})}><option value="">Choose recipient</option>{recipients.map(r=><option key={r.id} value={r.email}>{r.name} · {r.email}</option>)}</select></label><label className="sc-admin-field"><span>Subject</span><input value={draftForm.subject||""} onChange={(e)=>setDraftForm({...draftForm,subject:e.target.value})}/></label><label className="sc-admin-field"><span>Email body</span><textarea rows="16" value={draftForm.body||""} onChange={(e)=>setDraftForm({...draftForm,body:e.target.value})}/></label><div className="sc-admin-actions"><button className="secondary-button small" onClick={onSave} disabled={busy}>Save Draft</button><button className="primary-button small" onClick={onSend} disabled={busy}>Approve & Send</button><button className="secondary-button small" onClick={()=>setDraftForm(null)}>Cancel</button></div></div>}</AdminPanel><AdminPanel title="Approval rule" subtitle="Official communication control"><div className="sc-admin-rule"><CheckCircle2 size={18}/><div><strong>Manual approval required</strong><p>The backend will not send a communication until an administrator explicitly approves it.</p></div></div></AdminPanel></div>;
}
function AdminRecipients({ recipients,form,setForm,onAdd,onDelete }) { return <div className="sc-admin-grid-2"><AdminPanel title="Recipients" subtitle="People and teams authorized to receive official communications"><div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Name</th><th>Department</th><th>Role</th><th>Email</th><th>Type</th><th></th></tr></thead><tbody>{recipients.map(r=><tr key={r.id}><td>{r.name}</td><td>{r.department||"--"}</td><td>{r.role||"--"}</td><td>{r.email}</td><td>{r.notification_type}</td><td><button className="sc-admin-table-action danger" onClick={()=>onDelete(r.id)}>Remove</button></td></tr>)}{recipients.length===0&&<tr><td colSpan="6"><AdminEmpty text="Add a recipient to create official communications." /></td></tr>}</tbody></table></div></AdminPanel><AdminPanel title="Add recipient" subtitle="Store an email destination for incident communication"><form className="sc-admin-form-grid" onSubmit={onAdd}><label className="sc-admin-field"><span>Name</span><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label className="sc-admin-field"><span>Department</span><input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label><label className="sc-admin-field"><span>Role</span><input value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></label><label className="sc-admin-field"><span>Email</span><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label className="sc-admin-field"><span>Notification type</span><select value={form.notification_type} onChange={e=>setForm({...form,notification_type:e.target.value})}><option>Incident</option><option>Environmental</option><option>Emergency</option><option>All</option></select></label><button className="primary-button small" type="submit"><Save size={14}/>Add Recipient</button></form></AdminPanel></div>; }
function AdminCommunicationHistory({ rows }) {
  return <AdminPanel title="Sent history" subtitle="Final communications retained for auditability">
    <div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Incident</th><th>Recipient</th><th>Subject</th><th>Sent By</th><th>Sent</th><th>AI Generated</th><th>Edited</th><th>Status</th></tr></thead>
    <tbody>{rows.map(r=><tr key={r.id}><td>{r.incident_id||"--"}</td><td>{r.recipient||"--"}</td><td>{r.subject}</td><td>{r.sent_by||"Administrator"}</td><td>{formatAdminTime(r.sent_at||r.created_at)}</td><td>{r.ai_generated?"Yes":"No"}</td><td>{r.edited?"Yes":"No"}</td><td><AdminStatus value={r.status}/></td></tr>)}{rows.length===0&&<tr><td colSpan="8"><AdminEmpty text="No communications recorded." /></td></tr>}</tbody></table></div>
  </AdminPanel>;
}

function AdminThresholds({ rows,setRows,onSave }) {
  return <AdminPanel title="Environmental thresholds" subtitle="Values are stored in the backend and every change is recorded in Admin Activity."><div className="sc-admin-table-wrap"><table className="sc-admin-table"><thead><tr><th>Variable</th><th>Warning</th><th>Critical</th><th>Minimum</th><th>Maximum</th><th>Unit</th><th>Last modified</th></tr></thead><tbody>{rows.map((r,idx)=><tr key={r.sensor}><td><strong>{r.sensor}</strong></td><td><input className="sc-admin-inline-input" value={r.warning??""} onChange={e=>setRows(rows.map((x,i)=>i===idx?{...x,warning:e.target.value}:x))}/></td><td><input className="sc-admin-inline-input" value={r.critical??""} onChange={e=>setRows(rows.map((x,i)=>i===idx?{...x,critical:e.target.value}:x))}/></td><td><input className="sc-admin-inline-input" value={r.minimum??""} onChange={e=>setRows(rows.map((x,i)=>i===idx?{...x,minimum:e.target.value}:x))}/></td><td><input className="sc-admin-inline-input" value={r.maximum??""} onChange={e=>setRows(rows.map((x,i)=>i===idx?{...x,maximum:e.target.value}:x))}/></td><td>{r.unit}</td><td>{formatAdminTime(r.updated_at)}</td></tr>)}</tbody></table></div><div className="sc-admin-actions"><button className="primary-button small" onClick={onSave}><Save size={14}/>Save Changes</button><button className="secondary-button small" onClick={()=>setRows(rows.map(r=>({...r})))}>Reset View</button></div></AdminPanel>;
}
function AdminSystemSettings({ backendStatus,adminConfigured,authDisabled,firebaseReady,onRefresh }) {
  return <AdminPanel title="System settings" subtitle="Administrative system configuration is kept separate from user preferences.">
    <div className="sc-admin-detail-grid">
      <AdminMetricCard label="Backend" value={backendStatus==="online"?"Connected":"Unavailable"}/>
      <AdminMetricCard label="Admin PIN" value={adminConfigured?"Configured":"Not configured"}/>
      <AdminMetricCard label="Auth gate" value={authDisabled?"Disabled":"Enabled"}/>
      <AdminMetricCard label="Firebase Admin" value={firebaseReady?"Ready":"Not configured"}/>
      <AdminMetricCard label="Security" value="PIN + short-lived token"/>
      <AdminMetricCard label="GPS privacy" value="Admin-only precise access"/>
    </div>
    <div className="sc-admin-rule">
      <ShieldCheck size={18}/>
      <div><strong>Secure administrator access</strong><p>Admin actions require the existing administrator PIN and backend token. Precise user GPS remains restricted to this protected workspace.</p></div>
    </div>
    {!firebaseReady&&<div className="sc-admin-alert-card warning"><div><h3>Firebase Admin credentials are not configured</h3><p>User GPS sync and server-side Firebase telemetry cannot be verified/read until <code>FIREBASE_SERVICE_ACCOUNT_JSON</code> or <code>FIREBASE_SERVICE_ACCOUNT_PATH</code> is configured on the backend.</p></div></div>}
    <button className="secondary-button small" onClick={onRefresh}>Refresh system state</button>
  </AdminPanel>;
}

function formatAdminTime(value) {
  if (!value) return "No data";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"});
}

function SafetyPage() {

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


function SafetyToggle({ icon, title, text, checked, onChange }) {

  return (
    <div className="safety-toggle-row">

      <div className="event-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <button
        type="button"
        className={"toggle-switch" + (checked ? " on" : "")}
        onClick={onChange}
        aria-label={title}
      >
        <span></span>
      </button>

    </div>
  );
}




/* =========================================================
   APP
========================================================= */

export default function App() {

  const [view, setView] = React.useState(() => {
    try {
      return sessionStorage.getItem("ss_admin_token") ? "admin" : "site";
    } catch (_) {
      return "site";
    }
  }); // "site" | "auth" | "live" | "admin"
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pdfOpen, setPdfOpen] = React.useState(false);
  const [authInitialized, setAuthInitialized] = React.useState(false);

  // Restore Firebase login after refresh and react to auth changes.
  React.useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (!mounted) return;

      try {
        if (!user) {
          setCurrentUser(null);
          return;
        }

        try {
          await reload(user);
        } catch (err) {
          console.error("Firebase session refresh failed:", err);
        }

        if (!mounted) return;

        if (user.emailVerified) {
          setCurrentUser({
            id: user.uid,
            name: user.displayName || user.email?.split("@")[0] || "User",
            email: user.email || "",
            photoURL: user.photoURL || readLocalAvatar(user.uid),
          });
        } else {
          // Never keep an unverified account inside the dashboard.
          setCurrentUser(null);
        }
      } finally {
        if (mounted) setAuthInitialized(true);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  async function handleExploreSmartSurround() {
    // Wait until Firebase has finished restoring the persisted session.
    // This avoids incorrectly sending an already-authenticated visitor to Login
    // during the short window before onAuthStateChanged fires after page load.
    if (!authInitialized) {
      await new Promise((resolve) => {
        let unsubscribeOnce = () => {};
        unsubscribeOnce = onAuthStateChanged(firebaseAuth, () => {
          unsubscribeOnce();
          resolve();
        });
      });
    }

    const authUser = firebaseAuth.currentUser;

    if (!authUser) {
      setCurrentUser(null);
      setView("auth");
      return;
    }

    try {
      await reload(authUser);
    } catch (err) {
      console.error("Firebase session check failed:", err);
    }

    if (!authUser.emailVerified) {
      // The project already requires verified email before dashboard access.
      await signOut(firebaseAuth);
      setCurrentUser(null);
      setView("auth");
      return;
    }

    setCurrentUser({
      id: authUser.uid,
      name: authUser.displayName || authUser.email?.split("@")[0] || "User",
      email: authUser.email || "",
      photoURL: authUser.photoURL || readLocalAvatar(authUser.uid),
    });
    setView("live");
  }

  function handleAuthSuccess(user) {
    const authUser = firebaseAuth.currentUser;
    setCurrentUser({
      ...user,
      photoURL: authUser?.photoURL || user?.photoURL || readLocalAvatar(user?.id),
    });
    setView("live");
  }

  function handleAdminSuccess() {
    setView("admin");
  }

  async function handleAdminLogout() {
    try {
      await fetch(`${BACKEND_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: typeof window !== "undefined" && sessionStorage.getItem("ss_admin_token")
          ? { "X-Auth-Token": sessionStorage.getItem("ss_admin_token") }
          : {},
      });
    } catch (err) {
      console.error("Admin logout failed:", err);
    } finally {
      try { window.localStorage.removeItem("ss_admin_pin"); } catch (_) {}
      try { window.sessionStorage.removeItem("ss_admin_token"); } catch (_) {}
      setView("site");
    }
  }

  async function handleLogout() {
    try {
      await signOut(firebaseAuth);
    } catch (err) {
      console.error("Firebase logout failed:", err);
    }

    setCurrentUser(null);
    try { localStorage.removeItem("ss_admin_pin"); } catch (_) {}
    setView("site");
  }

  if (view === "auth") {
    return (
      <div className="app">
        <AuthPage
          onAuthSuccess={handleAuthSuccess}
          onAdminSuccess={handleAdminSuccess}
          onBack={() => setView("site")}
        />
      </div>
    );
  }

  if (view === "admin") {
    return (
      <div className="app admin-shell">
        <AdminPage
          onBackToSite={() => setView("site")}
          onBackToLogin={() => setView("auth")}
          onLogout={handleAdminLogout}
        />
      </div>
    );
  }

  if (view === "live" && currentUser) {
    return (
      <div className="app">
        <LiveReadingPage
          currentUser={currentUser}
          onLogout={handleLogout}
          onUserUpdated={(user) => setCurrentUser(user)}
          onBackToSite={() => setView("site")}
        />
      </div>
    );
  }

  return (

    <div className="app">

      <Navbar
        isLoggedIn={!!currentUser}
        currentUser={currentUser}
        onLoginClick={() => setView("auth")}
        onLogoutClick={handleLogout}
        onDashboardClick={() => setView("live")}
        onPdfClick={() => setPdfOpen(true)}
      />

      <main>

        <Hero />

        <About />

        <Features />

        <HowItWorks />

        <AISection />

        <Contact onExplore={handleExploreSmartSurround} />

      </main>

      <Footer />

      <AnimatePresence>
        {pdfOpen && <PdfViewerModal onClose={() => setPdfOpen(false)} />}
      </AnimatePresence>

    </div>

  );
}