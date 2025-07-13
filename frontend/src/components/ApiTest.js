import { useState } from "react"
import axios from "axios"

const ApiTest = () => {
  const [healthStatus, setHealthStatus] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testHealth = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/health")
      setHealthStatus(response.data)
      console.log("Health check response:", response.data)
    } catch (error) {
      console.error("Health check failed:", error)
      setHealthStatus({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testSuggestSkills = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/suggest-skills", {
        jobTitle: "Software Engineer"
      })
      setTestResult(response.data)
      console.log("Suggest skills response:", response.data)
    } catch (error) {
      console.error("Suggest skills failed:", error)
      setTestResult({ error: error.response?.data?.error || error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px", borderRadius: "8px" }}>
      <h3>API Test Panel</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={testHealth} 
          disabled={loading}
          style={{ marginRight: "10px", padding: "10px" }}
        >
          {loading ? "Testing..." : "Test Health Check"}
        </button>
        
        <button 
          onClick={testSuggestSkills} 
          disabled={loading}
          style={{ padding: "10px" }}
        >
          {loading ? "Testing..." : "Test Suggest Skills"}
        </button>
      </div>

      {healthStatus && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Health Check Result:</h4>
          <pre style={{ background: "white", padding: "10px", borderRadius: "4px" }}>
            {JSON.stringify(healthStatus, null, 2)}
          </pre>
        </div>
      )}

      {testResult && (
        <div>
          <h4>Suggest Skills Result:</h4>
          <pre style={{ background: "white", padding: "10px", borderRadius: "4px" }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiTest 