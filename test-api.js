// Test script to verify API endpoints
const axios = require('axios');

const BASE_URL = 'https://ai-job-craft-frontend.vercel.app'; // Your actual Vercel URL

async function testAPI() {
  console.log('Testing API endpoints...\n');

  // Test suggest-skills endpoint
  try {
    console.log('1. Testing /api/suggest-skills...');
    const skillsResponse = await axios.post(`${BASE_URL}/api/suggest-skills`, {
      jobTitle: 'Software Engineer'
    });
    console.log('✅ Skills suggestion working:', skillsResponse.data);
  } catch (error) {
    console.log('❌ Skills suggestion failed:', error.response?.data || error.message);
  }

  // Test generate-jd endpoint
  try {
    console.log('\n2. Testing /api/generate-jd...');
    const jdResponse = await axios.post(`${BASE_URL}/api/generate-jd`, {
      jobTitle: 'Software Engineer',
      skills: ['JavaScript', 'React', 'Node.js'],
      companyName: 'Test Company',
      location: 'Remote'
    });
    console.log('✅ JD generation working:', jdResponse.data.jobDescription.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ JD generation failed:', error.response?.data || error.message);
  }

  console.log('\nTest completed!');
}

testAPI(); 