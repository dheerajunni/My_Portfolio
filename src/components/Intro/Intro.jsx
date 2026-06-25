import React from "react";

import styles from "./Intro.module.css";
import { getImageUrl } from "../../utils";

export const Intro = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi,there! Welcome to my Portfolio</h1>
        <p className={styles.description}>
        I'm a data-driven professional with 6+ years of experience in Data Analysis, Business Intelligence, and Advanced Analytics, delivering impactful solutions across diverse industries including healthcare, supply chain, and finance.

My strength lies in designing and optimizing end-to-end data pipelines—from ETL development using tools like Azure Data Factory, SSIS, Apache Spark, and Airflow, to building interactive dashboards with Power BI and Tableau that empower decision-makers with real-time insights.
I bring deep expertise in SQL across Snowflake, SQL Server, PostgreSQL, and MySQL, and thrive on tuning complex queries and building efficient data models and marts. I’ve also developed predictive ML models using Python libraries like Pandas, NumPy, Scikit-learn, and TensorFlow, supporting use cases such as churn prediction, anomaly detection, and forecasting.
Cloud-native and big data savvy, I have hands-on experience with AWS (Redshift, S3), Azure (Databricks, Data Lake), and GCP (BigQuery, Dataflow)—ensuring secure, scalable data solutions. I’ve deployed containerized ML pipelines using Docker and Kubernetes, integrated REST APIs, and maintained high data quality standards through QA, data validation, and governance practices.
I love collaborating with cross-functional teams using Agile/Scrum methodologies and take pride in turning complex data challenges into simple, business-ready solutions. Whether it’s CI/CD with Git and Azure DevOps, versioning Power BI assets, or automating analytics workflows—I’m always looking for ways to make data more accessible, reliable, and actionable.

💡 Let’s connect to discuss opportunities in Data Analysis , cloud technologies, and business intelligence! 🚀
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

