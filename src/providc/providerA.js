class ProviderA {
  constructor() {
    this.name = "ProviderA";
  }
  async send(to, subject, body) {
    if (Math.random() < 0.5) {
      throw new Error("Random failure in ProviderA");
    }
    console.log(
      `Sending email via ${this.name} to ${to} with subject "${subject}" and body "${body}"`
    );
  }
}
module.exports = ProviderA;
