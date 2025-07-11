const axios = require("axios");

async function testAPI() {
  const baseURL = "http://localhost:3000";

  const response = await axios.post(`${baseURL}/send`, {
    to: "abc@example.com",
    subject: "Test Email",
    body: "Hello!",
    idempotencyKey: "email-001",
  });

  console.log("POST /send →", response.data);

  const statusRes = await axios.get(`${baseURL}/status/email-001`);
  console.log("GET /status/email-001 →", statusRes.data);
}

testAPI().catch(console.error);
