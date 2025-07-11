class Ratelimiter {
  constructor(limit, interval) {
    this.limit = limit; // Maximum number of requests
    this.interval = interval; // Time window in milliseconds
    this.tokens = limit;
    this.lastfill = Date.now();
  }
  allow() {
    const now = Date.now();
    const elapsed = now - this.lastfill;
    if (elapsed > this.interval) {
      this.tokens = this.limit;
      this.lastfill = now;
    }
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }
}
module.exports = Ratelimiter;
