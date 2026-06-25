export const blogs = [
  {
    id: "ai-portfolio-assistant",
    title: "How I Built an AI Assistant Into My Portfolio Using OpenAI and Netlify Functions",
    date: "June 25, 2026",
    readTime: "6 min read",
    category: "AI Integration",
    summary: "A practical walkthrough of integrating GPT-4o-mini into a static React portfolio site using Netlify serverless functions — including the security decisions, debugging process, and what I learned.",
    content: `
When I decided to add an AI assistant to my portfolio, I had one constraint: the site is fully static, hosted on Netlify, with no backend server. The challenge was integrating OpenAI's API without exposing my API key in the browser.

## The Problem With Direct API Calls

The naive approach — calling the OpenAI API directly from React — would expose your API key in the browser. Anyone could open DevTools, copy the key, and run up your bill. Not acceptable for a public site.

The solution: a Netlify serverless function that acts as a secure proxy between the browser and OpenAI.

## The Architecture

The final architecture is straightforward:

\`\`\`
Browser (React) → /.netlify/functions/chat → OpenAI API
\`\`\`

The API key lives only in Netlify's environment variables, marked as a secret value. It never touches the browser.

## Building the Netlify Function

The function lives at \`netlify/functions/chat.js\`. It receives the conversation history from the React frontend, injects a system prompt with my portfolio content, and forwards the request to OpenAI:

\`\`\`javascript
exports.handler = async function (event) {
  const { messages } = JSON.parse(event.body);
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
    }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
\`\`\`

The system prompt is the key part — it contains my full work history, skills, certifications, and projects. The model answers only from that content, which prevents hallucination about things I haven't done.

## The React Chat Component

The chat widget is a fixed-position component that renders a floating button and a chat window. State is managed with \`useState\` — conversation history, input value, and loading state. A \`useEffect\` with a ref handles auto-scrolling to the latest message.

The suggested questions feature appears only on the first message, giving visitors a starting point without needing to think of a question themselves.

## What I Learned

**The biggest debugging challenge** was a \`package.json\` \`"type": "module"\` conflict. My Vite project used ES modules, but Netlify's function runtime expected CommonJS. The fix was removing \`"type": "module"\` from \`package.json\` and using \`exports.handler\` syntax in the function — Vite doesn't need that field to handle ES modules correctly.

**Prompt engineering matters more than I expected.** The first version of the system prompt produced generic, vague answers. Structuring it with explicit sections — SKILLS, EXPERIENCE, PROJECTS, CERTIFICATIONS — dramatically improved response quality and specificity.

**Native fetch works fine in Node 18+.** I initially reached for \`node-fetch\` out of habit, but Netlify functions run on Node 18 which has native fetch built in. No extra dependency needed.

## The Result

The assistant is live at [dheerajpulijala.netlify.app](https://dheerajpulijala.netlify.app). Visitors can ask things like "what databases has Dheeraj worked with" or "tell me about his Azure experience" and get accurate, specific answers grounded in my actual background.

Total cost to run: fractions of a cent per conversation using GPT-4o-mini at 300 max tokens per response.

## What's Next

The natural next step is adding RAG — storing my resume and project documentation as vector embeddings in a vector database, then retrieving the most relevant chunks before each API call. This would allow longer, more detailed responses without hitting token limits. I plan to implement this using Azure AI Search, which aligns with my Azure upskilling path toward the AZ-305 certification.
    `
  }
];