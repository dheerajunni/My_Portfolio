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

The assistant is live at [dheerajpulijala.com](https://dheerajpulijala.com). Visitors can ask things like "what databases has Dheeraj worked with" or "tell me about his Azure experience" and get accurate, specific answers grounded in my actual background.

Total cost to run: fractions of a cent per conversation using GPT-4o-mini at 300 max tokens per response.

## What's Next

The natural next step is adding RAG — storing my resume and project documentation as vector embeddings in a vector database, then retrieving the most relevant chunks before each API call. This would allow longer, more detailed responses without hitting token limits. I plan to implement this using Azure AI Search, which aligns with my Azure upskilling path toward the AZ-305 certification.
    `
  },
  {
  id: "ai-tools-for-developers-2026",
  title: "AI Tools That Actually Make Developers More Productive in 2026",
  date: "June 25, 2026",
  readTime: "8 min read",
  category: "Developer Productivity",
  summary: "Not every AI tool lives up to the hype. Here's an honest breakdown of the tools I actually use day-to-day as a .NET and full stack developer — what works, what doesn't, and what's worth your time in 2026.",
  content: `
The AI developer tools space has exploded. Every week there's a new assistant, a new plugin, a new platform promising to make you 10x more productive. Most of it is noise.

I've been a .NET and full stack developer for six years, currently building production systems for a state government agency. Over the past year I've integrated AI tooling into my actual workflow — not in demos, but in real day-to-day development. Here's what I've found actually works.

## GitHub Copilot — Still the Most Useful Daily Driver

If you're not using Copilot yet, start here. Not because it writes perfect code — it doesn't — but because it eliminates the low-value keystrokes that eat your day.

Where it genuinely helps:
- Boilerplate code: controllers, DTOs, service interfaces, entity models — Copilot handles the repetitive scaffold so you can focus on business logic
- Test generation: give it a method signature and it'll draft the NUnit or xUnit test cases, including edge cases you might miss
- SQL queries: describe what you want in a comment and it produces a reasonable T-SQL starting point

Where it fails:
- Complex business logic it has no context for
- Anything involving your specific database schema or internal APIs
- Security-sensitive code — always review what it generates before committing

The honest ROI: I estimate Copilot saves me 45-60 minutes per day on pure typing and boilerplate. That's real time back on problem-solving.

## Claude (Anthropic) — Better Than ChatGPT for Technical Reasoning

I use Claude for anything requiring extended reasoning or code review. The context window is large enough to paste an entire C# class and ask meaningful questions about it.

What I use it for:
- Code review: paste a method, ask it to identify security issues, performance problems, or edge cases
- Architecture decisions: describe a system design problem and talk through tradeoffs
- Debugging: paste an error trace and the relevant code — it's remarkably good at identifying root causes
- Writing technical documentation and README files

The key difference from ChatGPT in my experience: Claude is less likely to confidently hallucinate. It will tell you when it's uncertain, which matters when you're making production decisions.

## Azure OpenAI Service — For Building AI Into Your Own Apps

This is where things get interesting for .NET developers specifically. Azure OpenAI Service lets you call GPT-4o and other models from your C# code, with enterprise security controls, Azure AD integration, and data residency guarantees that matter for regulated environments like government and healthcare.

I built the AI assistant on this portfolio site using the standard OpenAI API, but for production enterprise work — especially in state government or regulated industries — Azure OpenAI is the right choice because:
- Your data doesn't train OpenAI's models
- It sits inside your existing Azure security boundary
- You can use managed identities instead of API keys
- Compliance teams are far more comfortable with it

The learning curve from standard OpenAI API to Azure OpenAI is minimal — the API shape is nearly identical. The main difference is the endpoint URL format and authentication.

## Semantic Kernel — The Missing Piece for .NET AI Integration

If you're a .NET developer and you haven't looked at Semantic Kernel yet, this is the one to prioritize. It's Microsoft's open-source SDK for building AI-powered applications in C#, and it's designed to work exactly the way .NET developers already think.

What it gives you:
- A clean abstraction over different LLM providers (Azure OpenAI, OpenAI, Hugging Face)
- Plugin architecture that lets you expose your existing C# methods as tools the AI can call
- Memory and context management for multi-turn conversations
- Built-in support for RAG (Retrieval Augmented Generation) patterns

The practical use case: imagine your ASP.NET Core application has a method that queries your SQL Server database for claims data. With Semantic Kernel, you can expose that as a plugin and let an LLM call it in response to natural language queries. That's the pattern that's going to define enterprise AI applications for the next several years.

## Cursor — Worth Trying if You Write a Lot of New Code

Cursor is a VS Code fork with AI deeply integrated into the editor. The killer feature is that it understands your entire codebase — not just the file you have open — which means its suggestions are far more contextually accurate than Copilot for complex projects.

The honest caveat: I use VS Code with Copilot for most of my work because the ecosystem and extensions matter. Cursor is worth a trial if you're starting a greenfield project and want to see what deeply integrated AI editing feels like.

## What I Don't Bother With

A few categories that get a lot of hype but haven't earned a place in my workflow:

- **AI code review bots**: the signal-to-noise ratio is too low; they flag too many false positives and miss the things that actually matter in domain-specific code
- **Auto-generated unit tests from AI tools** (as a complete solution): useful as a starting draft, but they miss business rule edge cases that only someone who understands the domain can write
- **AI-generated architecture diagrams**: still not reliable enough to trust without heavy manual correction

## The Honest Bottom Line

AI tools won't replace developers who understand systems, business domains, and architecture. What they will replace is the developer who only writes CRUD code and doesn't adapt.

The developers who will be hardest to replace are the ones who know how to integrate AI into systems — not just use AI tools to write code faster. That's a meaningful distinction. Learning to call an LLM API, manage context, build RAG pipelines, and think about prompt engineering as a system design problem is the real upskilling opportunity right now.

Start with Copilot for daily productivity. Learn the OpenAI API by building something small and real. Then look at Semantic Kernel if you're a .NET developer. That's the sequence that makes sense.
  `
}
];