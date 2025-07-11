class ProviderB{
    constructor(){
        this.name = "ProviderB";

    }
    async send(to,subject,body)
    {
        if(Math.random() < 0.5) {
            throw new Error('Random failure in ProviderB');
        }
        console.log(`Sending email via ${this.name} to ${to} with subject "${subject}" and body "${body}"`);
    }
}

module.exports = ProviderB;