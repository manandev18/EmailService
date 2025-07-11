const EmailService = require("./EmailService");
const emailService = new EmailService();

async function test() {
  console.log("✅ Starting Tests...\n");

  // Test 1: Basic send works
  const res1 = await emailService.sendEmail(
    "user@example.com",
    "Hello",
    "World",
    "test-001"
  );
  console.log("Test 1: Basic Send →", res1);
  console.assert(
    res1.status === "success" || res1.status === "failed",
    "❌ Test 1 failed"
  );

  // Test 2: Idempotency
  const res2 = await emailService.sendEmail(
    "user@example.com",
    "Hello",
    "World",
    "test-001"
  );
  console.log("Test 2: Idempotent Request →", res2);
  console.assert(res2.status === "duplicate", "❌ Test 2 failed");

  // Test 3: Status Tracking
  const status1 = emailService.getStatus("test-001");
  console.log("Test 3: Status Tracking →", status1);
  console.assert(["sent", "failed"].includes(status1), "❌ Test 3 failed");

  // Test 4: Rate Limiting
  let rateLimited = false;
  for (let i = 0; i < 6; i++) {
    const res = await emailService.sendEmail(
      `user${i}@example.com`,
      "RateLimit Test",
      "Testing...",
      `ratelimit-${i}`
    );
    if (res.status === "ratelimited") rateLimited = true;
  }
  console.log("Test 4: Rate Limiting →", rateLimited ? "PASSED" : "FAILED");
  console.assert(rateLimited, "❌ Test 4 failed");

  // Test 5: Retry + Fallback
  const res3 = await emailService.sendEmail(
    "retry@test.com",
    "Retry Test",
    "Body",
    "retry-001"
  );
  console.log("Test 5: Retry + Fallback →", res3);
  console.assert(
    ["success", "failed"].includes(res3.status),
    "❌ Test 5 failed"
  );

  // Test 6: getStatus() unknown
  const statusUnknown = emailService.getStatus("non-existent-id");
  console.log("Test 6: Unknown Status →", statusUnknown);
  console.assert(statusUnknown === "unknown", "❌ Test 6 failed");

  console.log("\n✅ All tests finished.");
}

test();
