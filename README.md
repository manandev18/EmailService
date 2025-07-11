# Resilient Email Service (Node.js)

This is a resilient email-sending service built in Node.js that includes:

- Retry with exponential backoff
- Fallback between providers
- Idempotency handling
- Basic rate limiting
- Status tracking

## 📦 How to Run

```bash
npm install
node src/index.js
