import { nftTopicAdapterTool } from './mastra/tools/nftTopicAdapterTool';
import { nftInsightsTool } from './mastra/tools/nftInsightsTool';
import { mastra } from './mastra';

/**
 * Simplified NFT Analysis Function
 * 
 * This provides a direct way to analyze NFT collections without complex workflows
 */

export interface NFTAnalysisResult {
  collection: {
    name: string;
    slug?: string;
    contractAddress?: string;
    platform?: string;
  };
  trustScore: number;
  recommendation: 'PROCEED_WITH_CAUTION' | 'HIGH_RISK' | 'AVOID';
  redFlags: string[];
  positiveSignals: string[];
  marketData: {
    topDealPrice?: number;
    volume24h?: number;
    floorPrice?: number;
    totalSales?: number;
  };
  report: string;
  timestamp: string;
}

export async function analyzeNFTCollection(
  input: string,
  options: {
    timeRange?: '24h' | '7d' | '30d';
    includeMarketTrends?: boolean;
  } = {}
): Promise<NFTAnalysisResult> {
  
  const { timeRange = '24h', includeMarketTrends = true } = options;

  try {
    console.log(`🔍 Analyzing NFT collection: ${input}`);

    // Step 1: Parse the input to extract collection information
    console.log('📝 Parsing collection information...');
    let topicResult: any;
    try {
      topicResult = await (nftTopicAdapterTool as any).execute({
        input,
        runtimeContext: {},
      });
    } catch (error) {
      console.error('Topic adapter error:', error);
      throw new Error(`Failed to parse collection info: ${error}`);
    }

    if (!topicResult?.success) {
      throw new Error(`Failed to parse collection info: ${topicResult?.error || 'Unknown error'}`);
    }

    const nftTopic = topicResult.data as any;
    console.log(`✅ Identified collection: ${nftTopic?.collectionName || nftTopic?.collectionSlug || 'Unknown'}`);

    // Step 2: Analyze market data and generate insights
    console.log('📊 Analyzing market data...');
    let insightsResult: any;
    try {
      insightsResult = await (nftInsightsTool as any).execute({
        collectionSlug: nftTopic?.collectionSlug,
        contractAddress: nftTopic?.contractAddress,
        timeRange,
        includeMarketTrends,
        runtimeContext: {},
      });
    } catch (error) {
      console.error('Insights tool error:', error);
      throw new Error(`Failed to analyze market data: ${error}`);
    }

    if (!insightsResult?.success) {
      throw new Error(`Failed to analyze market data: ${insightsResult?.error || 'Unknown error'}`);
    }

    const insights = insightsResult.data as any;
    console.log(`📈 Trust Score: ${insights.trustScore}/100`);

    // Step 3: Generate recommendation
    const recommendation = insights.trustScore >= 70 ? 'PROCEED_WITH_CAUTION' : 
                          insights.trustScore >= 40 ? 'HIGH_RISK' : 'AVOID';

    // Step 4: Generate comprehensive report using report agent
    console.log('📄 Generating investment report...');
    const collectionName = nftTopic.collectionName || nftTopic.collectionSlug || 'Unknown Collection';
    
    const reportData = {
      collection: {
        name: collectionName,
        slug: nftTopic?.collectionSlug,
        contractAddress: nftTopic?.contractAddress,
        platform: nftTopic?.platform,
      },
      marketAnalysis: {
        trustScore: insights?.trustScore || 0,
        redFlags: insights?.redFlags || [],
        positiveSignals: insights?.positiveSignals || [],
        marketData: insights?.marketData || {},
      },
      metadata: {
        analysisTimestamp: new Date().toISOString(),
        timeRange,
      },
    };

    const reportAgent = mastra.getAgent('reportAgent');
    const reportResponse = await reportAgent.generate([
      {
        role: 'user',
        content: `Generate a comprehensive NFT investment report based on the following analysis data:

${JSON.stringify(reportData, null, 2)}

Please format this as a professional NFT investment analysis report with clear recommendations, risk assessment, and investment thesis.`,
      },
    ]);

    console.log('✅ Analysis complete!');

    return {
      collection: {
        name: collectionName,
        slug: nftTopic?.collectionSlug,
        contractAddress: nftTopic?.contractAddress,
        platform: nftTopic?.platform,
      },
      trustScore: insights?.trustScore || 0,
      recommendation,
      redFlags: insights?.redFlags || [],
      positiveSignals: insights?.positiveSignals || [],
      marketData: insights?.marketData || {},
      report: reportResponse.text,
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    console.error('❌ Error during NFT analysis:', error);
    throw error;
  }
}

/**
 * Quick NFT analysis with minimal output
 */
export async function quickNFTAnalysis(input: string): Promise<{
  name: string;
  trustScore: number;
  recommendation: string;
  keyFlags: string[];
}> {
  const result = await analyzeNFTCollection(input, { timeRange: '24h', includeMarketTrends: false });
  
  return {
    name: result.collection.name,
    trustScore: result.trustScore,
    recommendation: result.recommendation,
    keyFlags: [...result.redFlags, ...result.positiveSignals].slice(0, 3),
  };
}

/**
 * Batch analyze multiple NFT collections
 */
export async function batchAnalyzeNFTs(
  collections: string[],
  options: { timeRange?: '24h' | '7d' | '30d' } = {}
): Promise<NFTAnalysisResult[]> {
  console.log(`🚀 Starting batch analysis of ${collections.length} collections...`);
  
  const results: NFTAnalysisResult[] = [];
  
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    console.log(`\n📊 Analyzing ${i + 1}/${collections.length}: ${collection}`);
    
    try {
      const result = await analyzeNFTCollection(collection, options);
      results.push(result);
      
      // Add delay to avoid rate limiting
      if (i < collections.length - 1) {
        console.log('⏳ Waiting 2 seconds to avoid rate limiting...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Failed to analyze ${collection}:`, error);
    }
  }
  
  console.log(`\n✅ Batch analysis complete! Analyzed ${results.length}/${collections.length} collections.`);
  return results;
}

// Example usage
export async function runNFTAnalysisExamples() {
  console.log('🎨 NFT Analysis Examples\n');
  
  try {
    // Example 1: Single collection analysis
    console.log('='.repeat(50));
    console.log('Example 1: Analyzing Bored Ape Yacht Club');
    console.log('='.repeat(50));
    
    const bayc = await analyzeNFTCollection('Bored Ape Yacht Club', {
      timeRange: '7d',
      includeMarketTrends: true,
    });
    
    console.log(`\n📊 Results for ${bayc.collection.name}:`);
    console.log(`Trust Score: ${bayc.trustScore}/100`);
    console.log(`Recommendation: ${bayc.recommendation}`);
    console.log(`Red Flags: ${bayc.redFlags.length}`);
    console.log(`Positive Signals: ${bayc.positiveSignals.length}`);
    
    // Example 2: Quick analysis
    console.log('\n' + '='.repeat(50));
    console.log('Example 2: Quick Analysis of CryptoPunks');
    console.log('='.repeat(50));
    
    const punks = await quickNFTAnalysis('https://opensea.io/collection/cryptopunks');
    console.log('\n📊 Quick Results:', punks);
    
    // Example 3: Batch analysis
    console.log('\n' + '='.repeat(50));
    console.log('Example 3: Batch Analysis');
    console.log('='.repeat(50));
    
    const batchResults = await batchAnalyzeNFTs([
      'Azuki',
      'Doodles',
      'Cool Cats'
    ], { timeRange: '24h' });
    
    console.log('\n📊 Batch Results Summary:');
    batchResults.forEach(result => {
      console.log(`${result.collection.name}: ${result.trustScore}/100 (${result.recommendation})`);
    });
    
  } catch (error) {
    console.error('❌ Example failed:', error);
  }
}
