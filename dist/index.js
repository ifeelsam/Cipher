function getEnv(name) {
    try {
        // Works in Node/Next; bundlers may inline process.env
        // @ts-ignore
        return typeof process !== 'undefined' ? process.env?.[name] : undefined;
    }
    catch {
        return undefined;
    }
}
export class CipherSDK {
    constructor(opts = {}) {
        const defaultBase = getEnv('CIPHERSCORE_BASE_URL') || 'https://api.cipherscore.xyz';
        this.baseUrl = (opts.baseUrl ?? defaultBase).replace(/\/$/, '');
        this.apiKey = opts.apiKey ?? getEnv('CIPHERSCORE_API_KEY');
        this._fetch = opts.fetch || fetch;
    }
    requireApiKey() {
        if (!this.apiKey) {
            throw new Error('CipherSDK: API key is required. Set CIPHERSCORE_API_KEY or pass apiKey in the constructor.');
        }
    }
    async calculateFromWallet(walletAddress) {
        this.requireApiKey();
        const res = await this._fetch(`${this.baseUrl}/calculate_credit_score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey,
            },
            body: JSON.stringify({ wallet_address: walletAddress })
        });
        return res.json();
    }
    async calculateFromMetrics(metrics) {
        this.requireApiKey();
        const res = await this._fetch(`${this.baseUrl}/calculate_credit_score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey,
            },
            body: JSON.stringify(metrics)
        });
        return res.json();
    }
    async walletStatus(walletAddress) {
        this.requireApiKey();
        const res = await this._fetch(`${this.baseUrl}/wallet_status/${walletAddress}`, {
            headers: {
                'X-API-Key': this.apiKey,
            }
        });
        return res.json();
    }
}
