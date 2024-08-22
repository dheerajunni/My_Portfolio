import React from "react";
import styles from "./Education.module.css";

export const Education = () => {
  const educationData = [
    {
      title: "Master's in Computer Information Systems",
      institution: "Colorado State University",
      cgpa: "CGPA: 3.8/4"
    },
    {
      title: "Bachelors in Electronics and Communication Engineering",
      institution: "Jawaharlal Nehru Technological University",
      cgpa: "CGPA: 8.6/10"
    }
  ];

  return (
    <section className={styles.container} id="education">
      <h2 className={styles.title}>Education</h2>
      <div className={styles.content}>
        {educationData.map((education, index) => (
          <div key={index} className={styles.educationItem}>
            <h3 className={styles.educationTitle}>{education.title}</h3>
            <p className={styles.educationDetails}>{education.institution}</p>
            <p className={styles.educationDetails}>{education.cgpa}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
