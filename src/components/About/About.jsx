import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>

        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/Web.png")} alt="Web icon" />
            <div className={styles.aboutItemText}>
              <h3>Web Application Developer</h3>
              <p>
                I'm a Web Application developer with experience in building responsive
                and optimized sites
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/Analyst.png")} alt="Analyst icon" />
            <div className={styles.aboutItemText}>
              <h3>Data Analyst</h3>
              <p>
               I'm a data analyst who loves diving into data to uncover insights, drive smart decisions, and turn complex information into clear, actionable visuals
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/BI.png")} alt="BI icon" />
            <div className={styles.aboutItemText}>
              <h3>BI Developer</h3>
              <p>
              As a BI developer, I transform raw data into dynamic dashboards and reports, empowering teams to make data-driven decisions with clarity and precision.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/Visualization.png")} alt="Visualization icon" />
            <div className={styles.aboutItemText}>
              <h3>Data Visualization Engineer</h3>
              <p>
              As a Data Visualization Engineer, I craft compelling visual narratives from complex data, enabling stakeholders to quickly grasp insights and make informed decisions.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
