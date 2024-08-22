import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "dheerajunni", 
        "portfolio_template_id", 
        {
          to_name: "Dheeraj Pulijala", 
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
        },
        "M4ORSNOluE2xaEeXW" 
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message Sent Successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the message. Please try again.");
        }
      );

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.contactHeading}>Contact Me</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </footer>
  );
};
