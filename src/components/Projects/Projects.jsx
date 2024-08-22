import React, { useRef } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const projectsRef = useRef(null);

  const scroll = (direction) => {
    if (projectsRef.current) {
      projectsRef.current.scrollBy({
        left: direction === "left" ? -300 : 300, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <span className={styles.arrowIcon}>←</span>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <span className={styles.arrowIcon}>→</span>
      </button>
      <div className={styles.projects} ref={projectsRef}>
        {projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
    </section>
  );
};
