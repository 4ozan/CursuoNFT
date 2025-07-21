import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getUnleashAPI } from '../../lib/unleashApi';

interface NFTInsights {
  trustScore: number;
  redFlags: string[];
  positiveSignals: string[];
  marketData: {
    topDealPrice?: number;
    volume24h?: number;
    floorPrice?: number;
    totalSales?: number;
  };
  researchPrompts: string[];
}

export const nftInsightsTool = createTool({
  id: 'nft-insights',
  description: 'Analyzes NFT market data and generates trust scores, flags, and research prompts',
  inputSchema: z.object({
    collectionSlug: z.string().optional().describe('Collection slug or identifier'),
    contractAddress: z.string().optional().describe('NFT contract address'),
    timeRange: z.enum(['24h', '7d', '30d']).default('24h').describe('Time range for analysis'),
    includeMarketTrends: z.boolean().default(true).describe('Include market trend analysis'),
  }),
  execute: async ({ context }) => {
    const { collectionSlug, contractAddress, timeRange, includeMarketTrends } = context;
    try {
      const api = getUnleashAPI();
      const insights: NFTInsights = {
        trustScore: 0,
        redFlags: [],
        positiveSignals: [],
        marketData: {},
        researchPrompts: [],
      };

      // Get top deals data
      const topDeals = await api.getTopDeals({ 
        limit: 20, 
        time_range: timeRange 
      });

      // Get market metrics
      const marketMetrics = await api.getMarketMetrics({
        metrics: ['volume', 'sales_count', 'average_price', 'unique_buyers'],
        time_range: timeRange,
        include_washtrade: false,
      });

      // Get market trends if requested
      let marketTrends = null;
      if (includeMarketTrends) {
        marketTrends = await api.getMarketTrends({
          metrics: ['volume', 'sales_count', 'average_price'],
          time_range: timeRange,
          include_washtrade: false,
        });
      }

      // Analyze top deals for patterns
      if (topDeals?.data?.length > 0) {
        const deals = topDeals.data;
        const prices = deals.map((deal: any) => deal.price || 0);
        const buyers = deals.map((deal: any) => deal.buyer_address).filter(Boolean);
        const sellers = deals.map((deal: any) => deal.seller_address).filter(Boolean);

        // Calculate market data
        insights.marketData.topDealPrice = Math.max(...prices);
        insights.marketData.totalSales = deals.length;

        // Analyze buyer/seller patterns
        const uniqueBuyers = new Set(buyers).size;
        const uniqueSellers = new Set(sellers).size;
        const buyerDiversity = uniqueBuyers / buyers.length;
        const sellerDiversity = uniqueSellers / sellers.length;

        // Trust score calculation (0-100)
        let trustScore = 50; // Base score

        // Positive signals
        if (buyerDiversity > 0.8) {
          trustScore += 15;
          insights.positiveSignals.push('High buyer diversity - low wash trading risk');
        }

        if (sellerDiversity > 0.7) {
          trustScore += 10;
          insights.positiveSignals.push('Healthy seller distribution');
        }

        if (deals.length > 10) {
          trustScore += 10;
          insights.positiveSignals.push(`Active trading volume (${deals.length} sales)`);
        }

        // Red flags
        if (buyerDiversity < 0.3) {
          trustScore -= 25;
          insights.redFlags.push('Low buyer diversity - potential wash trading');
        }

        if (sellerDiversity < 0.2) {
          trustScore -= 15;
          insights.redFlags.push('Concentrated seller activity - potential manipulation');
        }

        // Price analysis
        const avgPrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
        const maxPrice = Math.max(...prices);
        if (maxPrice > avgPrice * 5) {
          trustScore -= 10;
          insights.redFlags.push('Extreme price outliers detected');
        }

        // Check for rapid consecutive sales from same wallet
        const buyerCounts = buyers.reduce((acc: Record<string, number>, buyer: string) => {
          acc[buyer] = (acc[buyer] || 0) + 1;
          return acc;
        }, {});

        const maxBuyerActivity = Math.max(...Object.values(buyerCounts) as number[]);
        if (maxBuyerActivity > 3) {
          trustScore -= 20;
          insights.redFlags.push(`Single wallet made ${maxBuyerActivity} purchases - suspicious activity`);
        }

        insights.trustScore = Math.max(0, Math.min(100, trustScore));
      }

      // Add market metrics to insights
      if (marketMetrics?.data) {
        const metrics = marketMetrics.data;
        insights.marketData.volume24h = metrics.volume;
        insights.marketData.floorPrice = metrics.average_price;
      }

      // Generate research prompts based on findings
      const collectionName = collectionSlug || contractAddress || 'this NFT collection';
      
      insights.researchPrompts = [
        `Who is the team behind ${collectionName} and what is their track record?`,
        `What is the community sentiment around ${collectionName} on Twitter and Discord?`,
        `What utility or roadmap does ${collectionName} offer to holders?`,
        `Are there any red flags or controversies surrounding ${collectionName}?`,
      ];

      // Add specific prompts based on red flags
      if (insights.redFlags.length > 0) {
        insights.researchPrompts.push(
          `Is ${collectionName} involved in wash trading or market manipulation?`,
          `What do NFT analysts say about ${collectionName}'s trading patterns?`
        );
      }

      // Add trend-based prompts if we have trend data
      if (marketTrends?.data) {
        insights.researchPrompts.push(
          `How does ${collectionName} compare to overall NFT market trends?`,
          `What factors are driving ${collectionName}'s recent price action?`
        );
      }

      return {
        success: true,
        data: insights,
        summary: `Analyzed ${collectionName} with trust score: ${insights.trustScore}/100. Found ${insights.redFlags.length} red flags and ${insights.positiveSignals.length} positive signals.`,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        data: null,
      };
    }
  },
});
