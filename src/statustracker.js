class StatusTracker {
  constructor() {
    this.statusMap = {};
  }

  set(id, status) {
    this.statusMap[id] = status;
  }

  get(id) {
    return this.statusMap[id] || "unknown";
  }
}

module.exports = StatusTracker;
