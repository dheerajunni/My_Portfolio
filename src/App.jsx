import React from "react";
import { Welcome } from "./components/Welcome/Welcome";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
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
import Chat from "./components/Chat/Chat";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route
          path="/*"
          element={
            <div className={styles.App}>
              <Welcome />
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
            </div>
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;