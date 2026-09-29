import React from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Sparkles, ShieldCheck, MapPin, Camera, Activity, CloudRain, Flame, Mic, Wind, BrainCircuit, User, Lock, Mail, LogOut, Eye, EyeOff, Thermometer, Droplets, Gauge, Satellite, Video, Table, Bell, Download, Play, Pause, Trash2, RotateCcw, Compass, Navigation, Save, Radio, FileText, Maximize2, Minimize2, AlertTriangle, Settings, HelpCircle, Upload, Paperclip, MessageSquare, Moon, Sun, Monitor, CheckCircle2, Clock3, Send, UserRound, motion, useAnimation, useInView, AnimatePresence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, fetchSignInMethodsForEmail, onAuthStateChanged, signOut, updateProfile, reload, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, onValue, ref, getStorage, storageRef, uploadBytes, getDownloadURL, firebaseApp, db, firebaseAuth, firebaseStorage, BACKEND_URL, BACKEND_DISPLAY_URL, EMPTY_READING, EMPTY_GPS, NAV_ITEMS, DEFAULT_ALERT_SETTINGS, pm25Status, statusClass, getIaqColor, clamp, fmt, yVal, buildPath, buildAlerts, accountStorageKey, readAccountSettings, readLocalAvatar, saveLocalAvatar, formatAdminTime
} from "../lib/smartSurroundShared.jsx";

import DashboardPreview from "../components/DashboardPreview.jsx";
import { useNavigate } from "../router.jsx";

export default function AuthPage({ onAuthSuccess, onAdminSuccess, onBack, initialMode = "login" }) {
  const navigate = useNavigate();

  // Role: "user" | "admin"
  const [role, setRole] = React.useState(initialMode === "admin" ? "admin" : "user");
  // User sub-tab: "login" | "signup"
  const [userTab, setUserTab] = React.useState(initialMode === "signup" ? "signup" : "login");

  React.useEffect(() => {
    if (initialMode === "admin") {
      setRole("admin");
    } else {
      setRole("user");
      setUserTab(initialMode === "signup" ? "signup" : "login");
    }
  }, [initialMode]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showAdminPassword, setShowAdminPassword] = React.useState(false);

  // User form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Admin form states (Admin Email + Password only, no signup)
  const [adminEmail, setAdminEmail] = React.useState("");
  const [adminPassword, setAdminPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [pendingUser, setPendingUser] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [passwordResetSent, setPasswordResetSent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setError("");
    setShowSuccess(false);
    if (nextRole === "admin") {
      navigate("/admin-login");
    } else {
      navigate(userTab === "signup" ? "/register" : "/login");
    }
  };

  const handleUserTabSwitch = (nextTab) => {
    setUserTab(nextTab);
    setError("");
    setShowSuccess(false);
    navigate(nextTab === "signup" ? "/register" : "/login");
  };

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
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPassword = adminPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both admin email and password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("email", cleanEmail);
      formData.append("password", cleanPassword);
      formData.append("pin", cleanPassword);

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
          throw new Error(data?.message || "Invalid admin email or password.");
        }
        throw new Error(data?.message || `Admin login failed (HTTP ${response.status}).`);
      }

      try {
        window.localStorage.setItem("ss_admin_pin", cleanPassword);
        window.localStorage.setItem("ss_admin_email", cleanEmail);
      } catch (_) {}
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

    if (role === "admin") {
      await handleAdminLogin();
      return;
    }

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || (userTab === "signup" && !cleanName)) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (userTab === "signup") {
        const { user } = await createUserWithEmailAndPassword(
          firebaseAuth,
          cleanEmail,
          password
        );

        if (cleanName) {
          await updateProfile(user, {
            displayName: cleanName,
          });
        }

        await sendEmailVerification(user);
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
        const { user } = await signInWithEmailAndPassword(
          firebaseAuth,
          cleanEmail,
          password
        );

        await reload(user);

        if (!user.emailVerified) {
          await signOut(firebaseAuth);
          setError(
            "Your email is not verified yet. Open the verification email we sent you, verify your email, then log in again."
          );
          return;
        }

        setPendingUser({
          name: user.displayName || cleanEmail.split("@")[0],
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
    if (userTab === "signup") return;

    const timer = setTimeout(() => {
      onAuthSuccess(pendingUser);
    }, 1700);

    return () => clearTimeout(timer);
  }, [showSuccess, pendingUser, userTab, onAuthSuccess]);

  function closeSuccess() {
    setShowSuccess(false);
    setPendingUser(null);
    setSuccessMessage("");

    if (userTab === "signup") {
      handleUserTabSwitch("login");
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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

          {/* Top-Level Selector: User and Admin */}
          <div className="auth-role-tabs">
            <button
              type="button"
              className={role === "user" ? "active" : ""}
              onClick={() => handleRoleSwitch("user")}
            >
              <User size={15} />
              User
            </button>
            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => handleRoleSwitch("admin")}
            >
              <ShieldCheck size={15} />
              Admin
            </button>
          </div>

          <div className="auth-heading">
            <h2>
              {role === "admin"
                ? "Admin Login"
                : userTab === "login"
                  ? "Welcome back"
                  : "Create account"}
            </h2>

            <p>
              {role === "admin"
                ? "Enter administrator credentials to access the control panel."
                : userTab === "login"
                  ? "Log in to view your live monitoring dashboard."
                  : "Sign up to start monitoring your surroundings."}
            </p>
          </div>

          {/* Under User: Sub-toggle for Log In and Create Account */}
          {role === "user" && (
            <div className="auth-subtabs">
              <button
                type="button"
                className={userTab === "login" ? "active" : ""}
                onClick={() => handleUserTabSwitch("login")}
              >
                Log In
              </button>
              <button
                type="button"
                className={userTab === "signup" ? "active" : ""}
                onClick={() => handleUserTabSwitch("signup")}
              >
                Create Account
              </button>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {role === "admin" ? (
              <>
                <label className="auth-field">
                  <span>Admin Email</span>
                  <div className="auth-input">
                    <Mail size={16} />
                    <input
                      type="email"
                      placeholder="admin@smartsurround.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label className="auth-field">
                  <span>Admin Password</span>
                  <div className="auth-input">
                    <Lock size={16} />
                    <input
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      aria-label={showAdminPassword ? "Hide password" : "Show password"}
                    >
                      {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>
              </>
            ) : (
              <>
                {userTab === "signup" && (
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
                      required
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
                      autoComplete={userTab === "login" ? "current-password" : "new-password"}
                      required
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

                {userTab === "login" && (
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

                {userTab === "login" && passwordResetSent && (
                  <div className="password-reset-success">
                    <div className="password-reset-success-title">
                      Check your email
                    </div>
                    <div className="password-reset-success-text">
                      We’ve sent a password reset link to your email address.
                    </div>
                  </div>
                )}
              </>
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
                : role === "admin"
                  ? "Admin Log In"
                  : userTab === "login"
                    ? "Log In"
                    : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Under User only: Link to switch between Log In and Sign Up. NO account creation or switch for Admin! */}
          {role === "user" && (
            <div className="auth-switch">
              {userTab === "login" ? (
                <>
                  Don't have an account?
                  <button type="button" onClick={() => handleUserTabSwitch("signup")}>
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?
                  <button type="button" onClick={() => handleUserTabSwitch("login")}>
                    Log in
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          className="auth-showcase"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
          onClick={userTab === "signup" ? closeSuccess : undefined}
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
              {userTab === "login" ? "Login successful" : "Verify your email"}
            </h3>

            <p>{successMessage}</p>

            {userTab === "signup" && (
              <button
                type="button"
                className="primary-button auth-submit"
                onClick={closeSuccess}
              >
                Continue to Login
                <ArrowRight size={16} />
              </button>
            )}

            {userTab === "login" && (
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

