const ProviderA = require("./providc/providerA");
const ProviderB = require("./providc/providerB");
const delay = require("./utils/delay");
const Ratelimiter = require("./ratelimiter");
const StatusTracker = require("./statustracker"); // FIX: renamed to uppercase
const { v4: uuidv4 } = require("uuid");

class EmailService {
  constructor() {
    this.providers = [new ProviderA(), new ProviderB()];
    this.ratelimiter = new Ratelimiter(5, 60000);
    this.statusTracker = new StatusTracker(); // FIX: initialize properly
    this.sentids = new Set();
  }

  async sendEmail(to, subject, body, idempotencyKey) {
    const emailid = idempotencyKey || uuidv4();

    if (this.sentids.has(emailid)) {
      return { status: "duplicate", emailid };
    }

    if (!this.ratelimiter.allow()) {
      return { status: "ratelimited", emailid };
    }

    for (let provider of this.providers) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await provider.send(to, subject, body);
          this.statusTracker.set(emailid, "sent"); // FIX: use method
          this.sentids.add(emailid);
          return { status: "success", emailid };
        } catch (error) {
          console.warn(
            `[Retry] ${provider.name} attempt ${attempt + 1} failed`
          );
          await delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    this.statusTracker.set(emailid, "failed"); // FIX: use method
    return { status: "failed", emailid };
  }

  getStatus(emailid) {
    return this.statusTracker.get(emailid); // FIX: use method
  }
}

module.exports = EmailService;
