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
              <h3>.NET Application Developer</h3>
              <p>
                I build and maintain production ASP.NET Core MVC and Web API systems — writing C# business logic, designing SQL Server data models, and owning the full development lifecycle from requirements through deployment.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/Analyst.png")} alt="Analyst icon" />
            <div className={styles.aboutItemText}>
              <h3>AI Integration Developer</h3>
              <p>
                I integrate AI capabilities into real applications — including the assistant on this portfolio, built with OpenAI, React, and Netlify serverless functions. Currently upskilling in Azure OpenAI Service and Semantic Kernel for enterprise .NET applications.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/BI.png")} alt="BI icon" />
            <div className={styles.aboutItemText}>
              <h3>Cloud and Azure Developer</h3>
              <p>
                Microsoft Certified in Azure Data Engineering. I build on Azure App Services, Azure DevOps CI/CD, Azure AD, and Azure SQL — deploying secure, production-grade systems with zero-downtime release pipelines.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/Visualization.png")} alt="Visualization icon" />
            <div className={styles.aboutItemText}>
              <h3>Data and Reporting</h3>
              <p>
                Microsoft Certified Power BI Data Analyst. I build SSRS paginated reports, Power BI dashboards, and SSIS pipelines that replace manual reporting processes and give leadership real-time visibility into operations.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};