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

function App() {
  return (
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
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;