exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages } = JSON.parse(event.body);

  const SYSTEM_PROMPT = `You are an AI assistant for Dheeraj Pulijala's portfolio website. 
Answer questions about Dheeraj based only on the information below. 
Be concise, professional, and helpful. If asked something not covered below, say you don't have that information.

ABOUT DHEERAJ:
- Full Stack .NET Developer and Data professional with 6+ years of experience
- Currently IT Application Developer at State of New Mexico Workers Compensation Administration since July 2024
- Strong Data Analytics background: Power BI, Azure Data Factory, Snowflake, PySpark, SQL Server

SKILLS:
- Backend: C#, ASP.NET Core MVC, Web API, Entity Framework Core
- Frontend: React, Angular, JavaScript, HTML, CSS
- Data: Power BI, Tableau, Azure Data Factory, SSIS, Apache Spark, PySpark, dbt
- Databases: SQL Server, Snowflake, PostgreSQL, MySQL, Azure SQL
- Cloud: Azure Data Engineer Associate certified, AWS, GCP
- Other: SharePoint Online SPFx, Azure DevOps, Docker, Kubernetes

EXPERIENCE:
1. IT Application Developer - State of New Mexico WCA (July 2024 - Present)
2. Data Analyst - State of New Mexico (August 2023 - July 2024)
3. Data Analyst - JBS USA (Jan 2023 - July 2023)
4. Data Analyst - Accenture, Client Cisco (July 2021 - Aug 2022)
5. Data Analyst Engineer - Accenture (May 2019 - June 2021)

EDUCATION:
- MS Computer Information Systems - Colorado State University GPA 3.8
- BTech Electronics and Communication Engineering

CERTIFICATIONS:
- Microsoft Power BI Data Analyst Associate
- Microsoft Azure Data Engineer Associate
- Google Professional Data Engineer`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};