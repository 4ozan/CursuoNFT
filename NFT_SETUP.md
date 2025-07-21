# NFT Research Assistant Setup Guide

## 🎯 Overview

Your NFT Research Assistant is now fully implemented with the following capabilities:

- **Live NFT market data analysis** via UnleashNFTs API
- **Web research** on project reputation using Mastra agents
- **Trust score calculation** with red flags and positive signals
- **Comprehensive markdown investment reports**
- **Multiple input formats**: URLs, contract addresses, collection names

## 🔧 Architecture

### Components Created:

1. **API Client** (`src/lib/unleashApi.ts`)
   - UnleashNFTs API wrapper with market metrics and trends
   - Handles authentication and error handling

2. **Tools**
   - `nftInsightsTool`: Analyzes market data and generates trust scores
   - `nftTopicAdapterTool`: Extracts collection info from various inputs

3. **Agents**
   - `nftResearchAgent`: Specialized NFT analysis agent
   - Enhanced `reportAgent`: Now handles both general and NFT reports

4. **Workflows**
   - `nftResearchWorkflow`: Core analysis pipeline
   - `mainNftWorkflow`: User-facing interactive workflow

## 🚀 Setup Instructions

### 1. Environment Variables

Add to your `.env` file:

```env
# UnleashNFTs API Key (required for market data)
UNLEASHNFTS_API_KEY=your_api_key_here

# Existing keys (already configured)
EXA_API_KEY=your_exa_key
MISTRAL_API_KEY=your_mistral_key
```

### 2. Install Dependencies

The following packages should already be installed, but verify:

```bash
bun install @ai-sdk/mistral zod
```

### 3. API Key Setup

1. Visit [UnleashNFTs API](https://api.unleashnfts.com/) to get your API key
2. Add the key to your `.env` file
3. Restart your development server

## 📊 Usage Examples

### Basic NFT Analysis (Recommended)

```typescript
import { analyzeNFTCollection } from './src/nftAnalysis';

// Analyze by collection name
const result = await analyzeNFTCollection('Bored Ape Yacht Club', {
  timeRange: '7d',
  includeMarketTrends: true,
});

console.log('Trust Score:', result.trustScore);
console.log('Recommendation:', result.recommendation);
console.log('Report:', result.report);
```

### Quick Analysis

```typescript
import { quickNFTAnalysis } from './src/nftAnalysis';

// Get quick insights
const quick = await quickNFTAnalysis('CryptoPunks');
console.log(quick); // { name, trustScore, recommendation, keyFlags }
```

### Batch Analysis

```typescript
import { batchAnalyzeNFTs } from './src/nftAnalysis';

// Analyze multiple collections
const results = await batchAnalyzeNFTs([
  'Bored Ape Yacht Club',
  'CryptoPunks',
  'Azuki'
], { timeRange: '24h' });
```

### Direct Tool Usage

```typescript
import { nftInsightsTool } from './src/mastra/tools/nftInsightsTool';

// Use tools directly
const insights = await nftInsightsTool.execute({
  context: {
    collectionSlug: 'cryptopunks',
    timeRange: '24h',
    includeMarketTrends: true,
  }
});
```

## 🎨 Input Formats Supported

1. **Collection Names**: "Bored Ape Yacht Club", "CryptoPunks"
2. **OpenSea URLs**: "https://opensea.io/collection/azuki"
3. **Contract Addresses**: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
4. **Other Marketplace URLs**: Blur, LooksRare, X2Y2

## 📈 Analysis Features

### Market Analysis
- Trading volume and price trends
- Buyer/seller diversity analysis
- Wash trading detection
- Floor price and top deal tracking

### Trust Score (0-100)
- **70+**: Proceed with caution
- **40-69**: High risk
- **<40**: Avoid

### Red Flags Detection
- Low buyer diversity (potential wash trading)
- Concentrated seller activity
- Extreme price outliers
- Single wallet multiple purchases

### Positive Signals
- High buyer diversity
- Healthy seller distribution
- Active trading volume
- Stable price patterns

## 📋 Report Structure

Generated reports include:

```markdown
# NFT Investment Analysis: [Collection Name]

## 🎯 Executive Summary
- Trust Score: X/100
- Recommendation: [PROCEED_WITH_CAUTION/HIGH_RISK/AVOID]

## 📊 Market Analysis
- Trading metrics and trust indicators
- Red flags and positive signals

## 🔍 Research Findings
- Team & development analysis
- Community sentiment
- Utility & roadmap assessment

## 💡 Investment Thesis
- Bull and bear cases

## 🎯 Final Verdict
- Detailed recommendation with risk levels
```

## 🔄 Workflow Process

1. **Parse Input** → Extract collection info from URL/name/contract
2. **Market Analysis** → Fetch and analyze UnleashNFTs data
3. **Generate Report** → Create comprehensive investment analysis

## 🧪 Testing

Run the NFT analysis examples to test your setup:

```bash
# Run the main analysis function
bun run -e "import('./src/nftAnalysis.js').then(m => m.runNFTAnalysisExamples())"
```

Or test individual functions:

```bash
# Quick test
bun run -e "import('./src/nftAnalysis.js').then(m => m.quickNFTAnalysis('Bored Ape Yacht Club').then(console.log))"
```

## 🛠 Customization

### Adjust Trust Score Weights

Edit `src/mastra/tools/nftInsightsTool.ts`:

```typescript
// Modify scoring logic
if (buyerDiversity > 0.8) {
  trustScore += 15; // Adjust weight
}
```

### Add New Market Metrics

Extend `UnleashNFTsAPI` in `src/lib/unleashApi.ts`:

```typescript
async getNewMetric(params: any) {
  return this.makeRequest('/new_endpoint', params);
}
```

### Custom Report Templates

Modify `reportAgent` instructions in `src/mastra/agents/reportAgent.ts`

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Validate all user inputs before processing
- Rate limit API calls to avoid quota issues

## 🎯 Next Steps

1. **Set up your UnleashNFTs API key**
2. **Test with the example file**
3. **Run interactive analysis on real collections**
4. **Customize scoring algorithms as needed**
5. **Deploy for production use**

## 🆘 Troubleshooting

### Common Issues:

1. **"API Key not found"**: Check `.env` file and restart server
2. **"No results found"**: Verify collection name/URL format
3. **TypeScript errors**: Ensure all dependencies are installed
4. **Rate limiting**: Add delays between API calls if needed

### Debug Mode:

Enable detailed logging by adding to your workflow:

```typescript
console.log('Debug:', JSON.stringify(result, null, 2));
```

---

🎉 **Your NFT Research Assistant is ready to use!**

For questions or issues, check the implementation files or run the example to verify everything is working correctly.
