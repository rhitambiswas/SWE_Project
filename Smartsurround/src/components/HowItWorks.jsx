import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

export default function HowItWorks() {

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

