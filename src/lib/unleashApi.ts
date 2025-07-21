interface MarketMetricsParams {
  currency?: string;
  blockchain?: number;
  metrics: string[];
  time_range?: '15m' | '30m' | '24h' | '7d' | '30d' | '90d' | 'all';
  include_washtrade?: boolean;
}

interface MarketTrendParams {
  currency?: string;
  blockchain?: number;
  metrics: string[];
  time_range?: '15m' | '30m' | '24h' | '7d' | '30d' | '90d' | 'range';
  time_range_start?: string;
  time_range_end?: string;
  include_washtrade?: boolean;
}

interface TopDealsParams {
  limit?: number;
  blockchain?: number;
  time_range?: '24h' | '7d' | '30d';
}

export class UnleashNFTsAPI {
  private baseUrl = 'https://api.unleashnfts.com/api/v1';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, v.toString()));
          } else {
            url.searchParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`UnleashNFTs API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get aggregate market metrics
   */
  async getMarketMetrics(params: MarketMetricsParams) {
    return this.makeRequest('/market/metrics', params);
  }

  /**
   * Get market trend data
   */
  async getMarketTrends(params: MarketTrendParams) {
    return this.makeRequest('/market/trend', params);
  }

  /**
   * Get top NFT deals
   */
  async getTopDeals(params?: TopDealsParams) {
    return this.makeRequest('/nfts/top_deals', params);
  }

  /**
   * Get collection statistics (if available)
   */
  async getCollectionStats(slug: string) {
    return this.makeRequest(`/collections/${slug}/stats`);
  }

  /**
   * Get NFT activity data
   */
  async getNFTActivity(params?: { limit?: number; blockchain?: number }) {
    return this.makeRequest('/nft_activity', params);
  }

  /**
   * Get wallet information
   */
  async getWalletInfo(walletAddress: string) {
    return this.makeRequest(`/wallet/${walletAddress}/info`);
  }
}

// Singleton instance
let unleashApiInstance: UnleashNFTsAPI | null = null;

export function getUnleashAPI(): UnleashNFTsAPI {
  if (!unleashApiInstance) {
    const apiKey = process.env.UNLEASHNFTS_API_KEY;
    if (!apiKey) {
      throw new Error('UNLEASHNFTS_API_KEY environment variable is required');
    }
    unleashApiInstance = new UnleashNFTsAPI(apiKey);
  }
  return unleashApiInstance;
}
