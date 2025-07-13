import express from "express"
import cors from "cors"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize OpenAI client (will be validated on first API call)
let openai = null

const initializeOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === "sk-dummy-key-for-demo") {
    return null
  }
  return new OpenAI({ apiKey })
}

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/api/health", (req, res) => {
  const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-dummy-key-for-demo"
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasApiKey: !!hasApiKey,
    environment: process.env.NODE_ENV || "development"
  })
})



app.post("/api/suggest-skills", async (req, res) => {
  try {
    const { jobTitle } = req.body

    if (!jobTitle || !jobTitle.trim()) {
      return res.status(400).json({ 
        error: "Job title is required",
        details: "Please provide a valid job title to get skill suggestions"
      })
    }

    // Initialize OpenAI on each request
    if (!openai) {
      openai = initializeOpenAI()
    }

    if (!openai) {
      return res.status(500).json({
        error: "OpenAI API key not configured",
        details: "Please set the OPENAI_API_KEY environment variable in your Vercel dashboard."
      })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional HR assistant. Suggest 5-8 relevant skills for the given job title. Return only a comma-separated list of skills, no additional text.",
        },
        {
          role: "user",
          content: `Suggest relevant skills for: ${jobTitle}`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    const skills = completion.choices[0].message.content
      .trim()
      .split(",")
      .map((skill) => skill.trim())
    res.json({ skills })
  } catch (error) {
    console.error("OpenAI API Error:", error.message)
    console.error("Error details:", error)
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: "API quota exceeded",
        details: "Your OpenAI API quota has been exceeded. Please check your account or upgrade your plan."
      })
    } else if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: "Invalid API key",
        details: "The OpenAI API key is invalid. Please check your configuration."
      })
    } else if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: "Rate limit exceeded",
        details: "Too many requests. Please wait a moment and try again."
      })
    } else if (error.message && error.message.includes('fetch')) {
      return res.status(500).json({ 
        error: "Network error",
        details: "Unable to connect to OpenAI API. Please check your internet connection and try again."
      })
    } else {
      return res.status(500).json({ 
        error: "Failed to suggest skills",
        details: `An error occurred: ${error.message || 'Unknown error'}`
      })
    }
  }
})

app.post("/api/generate-jd", async (req, res) => {
  try {
    const { jobTitle, skills, companyName, location, workMode, companyOverview } = req.body

    if (!jobTitle || !jobTitle.trim()) {
      return res.status(400).json({ 
        error: "Job title is required",
        details: "Please provide a valid job title to generate a job description"
      })
    }

    // Initialize OpenAI on each request
    if (!openai) {
      openai = initializeOpenAI()
    }

    if (!openai) {
      return res.status(500).json({
        error: "OpenAI API key not configured",
        details: "Please set the OPENAI_API_KEY environment variable in your Vercel dashboard."
      })
    }

    const skillsText = skills && skills.length > 0 ? `Required skills: ${skills.join(", ")}` : ""
    const companyText = companyName ? `Company: ${companyName}` : ""
    const locationText = location ? `Location: ${location}` : ""
    const workModeText = workMode ? `Work Mode: ${workMode}` : ""

    const additionalInfo = [companyText, locationText, workModeText, skillsText].filter(Boolean).join(". ")

    const systemPrompt = companyOverview
      ? "You are a professional HR specialist. Create a comprehensive, well-structured job description that includes: job title, job summary, key responsibilities, required qualifications, preferred qualifications, and benefits. Do NOT include a company overview section as it will be provided separately. Format it professionally and incorporate the provided company details."
      : "You are a professional HR specialist. Create a comprehensive, well-structured job description that includes: job title, company overview, job summary, key responsibilities, required qualifications, preferred qualifications, and benefits. Format it professionally and incorporate the provided company details."

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create a detailed job description for: ${jobTitle}. ${additionalInfo}`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    let jobDescription = completion.choices[0].message.content.trim()

    if (companyOverview) {
      if (jobDescription.includes("**Job Summary:**")) {
        jobDescription = jobDescription.replace(
          "**Job Summary:**",
          `**Company Overview:**\n\n${companyOverview}\n\n**Job Summary:**`,
        )
      } else {
        jobDescription = `**Company Overview:**\n\n${companyOverview}\n\n${jobDescription}`
      }
    }

    res.json({ jobDescription })
  } catch (error) {
    console.error("OpenAI API Error:", error.message)
    console.error("Error details:", error)
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: "API quota exceeded",
        details: "Your OpenAI API quota has been exceeded. Please check your account or upgrade your plan."
      })
    } else if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: "Invalid API key",
        details: "The OpenAI API key is invalid. Please check your configuration."
      })
    } else if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: "Rate limit exceeded",
        details: "Too many requests. Please wait a moment and try again."
      })
    } else if (error.message && error.message.includes('fetch')) {
      return res.status(500).json({ 
        error: "Network error",
        details: "Unable to connect to OpenAI API. Please check your internet connection and try again."
      })
    } else {
      return res.status(500).json({ 
        error: "Failed to generate job description",
        details: `An error occurred: ${error.message || 'Unknown error'}`
      })
    }
  }
})

app.listen(PORT, () => {})

// Export for Vercel
export default app;
