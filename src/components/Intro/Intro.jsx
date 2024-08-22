import React from "react";

import styles from "./Intro.module.css";
import { getImageUrl } from "../../utils";

export const Intro = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi,there! Welcome to my Portfolio</h1>
        <p className={styles.description}>
        I’m Dheeraj Pulijala, a Data Wizard with 4+ years of experience in turning numbers into actionable insights. 
        Right now, I’m making data magic happen at the State of New Mexico, where I create slick Power BI dashboards and build robust ETL pipelines that keep the data flowing seamlessly. 
        Whether it’s crunching complex SQL queries or whipping up data marts, I’m all about transforming raw data into strategic gold.
        I’ve got a toolkit full of tech goodies like Azure Data Factory, SQL Server, and Tableau, which I use to streamline processes and deliver insights that actually matter. 
        Certified in Power BI, Azure Data Engineering, and Business Intelligence, I live for data visualization, statistical analysis, and all things cloud. 
        I’m passionate about leveraging data to make smarter business moves and I’m always on the lookout for the next challenge where I can make an impact. 
        Let’s connect and geek out over data! Check out my portfolio for more information about me !
        </p>
        <a href="#contact" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("Intro/heroImage.jpeg")}
        alt="My Image"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
