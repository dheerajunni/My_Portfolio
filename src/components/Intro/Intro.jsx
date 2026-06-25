import React from "react";
import styles from "./Intro.module.css";
import { getImageUrl } from "../../utils";

export const Intro = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Dheeraj Pulijala</h1>
        <p className={styles.description}>
          Application Developer with 6+ years of experience building and maintaining production .NET systems for state government and enterprise environments. I specialize in ASP.NET Core, C#, SQL Server, and Azure — and I integrate AI capabilities into real applications using OpenAI and serverless architectures.
          Currently serving as the primary developer for five production web systems at the State of New Mexico, independently owning the full software lifecycle from requirements through deployment. I bring the same ownership mindset to every system I build — whether it's a public-facing MVC application, a REST API, or an AI-powered portfolio assistant like the one on this site.
          Open to Application Developer and Full Stack .NET roles in both state government and private sector. Open to relocation.
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
