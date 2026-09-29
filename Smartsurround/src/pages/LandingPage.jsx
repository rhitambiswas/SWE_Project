import React from "react";
import { AnimatePresence } from "../lib/smartSurroundShared.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import AISection from "../components/AISection.jsx";
import Contact from "../components/Contact.jsx";
import PdfViewerModal from "../components/PdfViewerModal.jsx";
import Footer from "../components/Footer.jsx";

export default function LandingPage({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogoutClick,
  onDashboardClick,
  onExplore,
}) {
  const [pdfOpen, setPdfOpen] = React.useState(false);

  return (
    <div className="app">
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onDashboardClick={onDashboardClick}
        onPdfClick={() => setPdfOpen(true)}
      />

      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <AISection />
        <Contact onExplore={onExplore} />
      </main>

      <Footer />

      <AnimatePresence>
        {pdfOpen && <PdfViewerModal onClose={() => setPdfOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
