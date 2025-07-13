import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-demo",
})

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { jobTitle } = req.body

    if (!jobTitle) {
      return res.status(400).json({ error: 'Job title is required' })
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
    
    res.status(200).json({ skills })
  } catch (error) {
    console.error('Error in suggest-skills:', error)
    res.status(500).json({ error: "Failed to suggest skills" })
  }
} 