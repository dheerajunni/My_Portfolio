import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",       
    message: "",
  });
  const [sending, setSending] = useState(false);

  // Init EmailJS once with PUBLIC key
  useEffect(() => {
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!pk) {
      console.warn("Missing VITE_EMAILJS_PUBLIC_KEY");
    } else {
      emailjs.init(pk);
    }
  }, []);


  //console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
  //console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
//console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;   
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;  

      if (!serviceId || !templateId) {
        throw new Error("Missing SERVICE_ID or TEMPLATE_ID env vars");
      }

     
      const params = {
        title:   formData.title || "Portfolio Contact",
        name:    `${formData.firstName} ${formData.lastName}`.trim(),
        email:   formData.email,
        message: formData.message,
        time:    new Date().toLocaleString(),
      };

      const res = await emailjs.send(serviceId, templateId, params); 
      console.log("EmailJS OK:", res);
      alert("Message Sent Successfully!");
      setFormData({ firstName: "", lastName: "", email: "", title: "", message: "" });
    } catch (err) {
      console.error("EmailJS FAIL:", err);
      alert("Failed to send the message. Check console for details.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.contactHeading}>Contact Me</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <input
              type="text" name="firstName" placeholder="First Name"
              value={formData.firstName} onChange={handleChange} required
            />
            <input
              type="text" name="lastName" placeholder="Last Name"
              value={formData.lastName} onChange={handleChange} required
            />
          </div>

          <div className={styles.fieldGroup}>
            <input
              type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange} required
            />
          </div>

          {/* Subject for {{title}} */}
          <div className={styles.fieldGroup}>
            <input
              type="text" name="title" placeholder="Subject"
              value={formData.title} onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <textarea
              name="message" placeholder="Message"
              value={formData.message} onChange={handleChange} required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </footer>
  );
};
