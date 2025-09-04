export type CalculateScoreResponse = {
    success: boolean;
    data?: {
        wallet: string;
        score: number;
        risk_level: 'low' | 'medium' | 'high';
        transaction_signature: string;
        computation_offset: string;
    };
    error?: string;
    timestamp: string;
};
export interface CipherSDKOptions {
    baseUrl?: string;
    apiKey?: string;
    fetch?: typeof fetch;
}
export declare class CipherSDK {
    private baseUrl;
    private apiKey;
    private _fetch;
    constructor(opts?: CipherSDKOptions);
    private requireApiKey;
    calculateFromWallet(walletAddress: string): Promise<CalculateScoreResponse>;
    calculateFromMetrics(metrics: {
        wallet_age_days: number;
        transaction_count: number;
        total_volume_usd: number;
        unique_protocols: number;
        defi_positions: number;
        nft_count: number;
        failed_txs: number;
        sol_balance: number;
    }): Promise<CalculateScoreResponse>;
    walletStatus(walletAddress: string): Promise<any>;
}
