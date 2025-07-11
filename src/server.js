const express = require("express");
const EmailService = require("./EmailService");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const emailService = new EmailService();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { to, subject, body, idempotencyKey } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const result = await emailService.sendEmail(
    to,
    subject,
    body,
    idempotencyKey
  );
  res.json(result);
});

app.get("/status/:emailId", (req, res) => {
  const emailId = req.params.emailId;
  const status = emailService.getStatus(emailId);
  res.json({ emailId, status });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
