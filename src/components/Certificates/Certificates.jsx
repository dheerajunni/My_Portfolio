import React from "react";
import styles from "./Certificates.module.css";

const certifications = [
  {
    title: "Microsoft Certified PowerBI Data Analyst",
    pdfLink: "public/Certificates/PowerBI_certificate.pdf",
  },
  {
    title: "Colorado State University Certified IT Project Manager",
    pdfLink: "public/Certificates/CSU_ITPM.pdf",
  },
  {
    title: "Microsoft Certified Azure Data Engineer",
    pdfLink: "https://example.com/cert3.pdf",
  },
  {
    title: "Colorado State University Certified BI Developer",
    pdfLink: "public/Certificates/CSU_BI.pdf",
  },
  {
    title: "Colorado State University Transcripts",
    pdfLink: "public/Certificates/Transcripts.pdf",
  },
  {
    title: "Colorado State University Master's in Computer Information Systems",
    pdfLink: "public/Certificates/Degree.pdf",
  },
];

export const Certificates = () => {
  return (
    <section className={styles.container} id="certificates">
      <h2 className={styles.sectionTitle}>Certifications</h2>
      <div className={styles.certificates}>
        {certifications.map((cert, id) => (
          <div key={id} className={styles.card}>
            <h3 className={styles.title}>{cert.title}</h3>
            <a href={cert.pdfLink} className={styles.button} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
