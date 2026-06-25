import { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";

const SUGGESTED_QUESTIONS = [
  "What are Dheeraj's strongest skills?",
  "What databases has he worked with?",
  "Tell me about his cloud experience",
  "What certifications does he have?",
];

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Unni,  Dheeraj's AI assistant. Ask me anything about his skills, experience, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role !== "assistant" || newMessages.indexOf(m) > 0),
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <span>Ask about Dheeraj</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${m.role === "user" ? styles.user : styles.assistant}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className={`${styles.message} ${styles.assistant}`}>Thinking...</div>}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className={styles.suggestion}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}

      <button className={styles.fab} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}