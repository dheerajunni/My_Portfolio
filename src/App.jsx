import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Intro } from "./components/Intro/Intro";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Education } from "./components/Education/Education";
import { Certificates } from "./components/Certificates/Certificates";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { BlogList } from "./components/Blogs/BlogList";
import { BlogPost } from "./components/Blogs/BlogPost";
import { Welcome } from "./components/Welcome/Welcome";
import Chat from "./components/Chat/Chat";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        position: "fixed",
        bottom: "88px",
        right: "26px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--toggle-bg)",
        border: "1px solid var(--color-border)",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

const MainLayout = () => {
  return (
    <div className={styles.App}>
      <Welcome />
      <p style={{ textAlign: "center", background: "#6c3de8", color: "white", padding: "8px", margin: 0, fontSize: "13px" }}>
        Note: This website is in development. Many features are yet to come. Use desktop view for better experience.
      </p>
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Contact />
      <Footer />
      <Chat />
      <ThemeToggle />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;