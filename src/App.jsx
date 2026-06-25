import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BlogList } from "./components/Blogs/BlogList";
import { BlogPost } from "./components/Blogs/BlogPost";
import { Navbar } from "./components/Navbar/Navbar";
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
import {Blogs} from "./components/Blogs/Blogs";
import { Footer } from "./components/Footer/Footer";
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
        Note: This website is in development. Many features are yet to come.Use desktop view for better expereince
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Contact />
      <Blogs/>
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

