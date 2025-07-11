const EmailService = require("./EmailService");

const emailService = new EmailService();

(async () => {
  const result = await emailService.sendEmail(
    "abc@example.com",
    "Test Email",
    "Hello!",
    "custom-id-001"
  );
  console.log("Result:", result);

  const status = emailService.getStatus(result.emailId);
  console.log("Status:", status);
})();
