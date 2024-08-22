import React from "react";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Intro } from "./components/Intro/Intro";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import { Education } from "./components/Education/Education";
import { Certificates } from "./components/Certificates/Certificates";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

