# 🚀 Quick Setup Guide

## Current Issue: Mistral Rate Limits
You're hitting Mistral's rate limits. Here are your options:

### Option 1: Wait and Use Mistral (Recommended)
1. **Wait 1 hour** for rate limits to reset
2. **Add your API keys** to `.env`:
   ```env
   MISTRAL_API_KEY=your_actual_key_here
   EXA_API_KEY=your_actual_key_here
   UNLEASHNFTS_API_KEY=your_actual_key_here
   ```
3. **Restart your dev server**

### Option 2: Switch to OpenAI (Quick Fix)
1. **Add OpenAI key** to `.env`:
   ```env
   OPENAI_API_KEY=your_openai_key_here
   EXA_API_KEY=your_exa_key_here
   UNLEASHNFTS_API_KEY=your_unleashnfts_key_here
   ```
2. I can quickly switch your agents back to OpenAI

### Option 3: Use NFT Analysis Functions Directly
Your NFT analysis functions in `src/nftAnalysis.ts` are ready to use:

```javascript
import { analyzeNFTCollection, quickNFTAnalysis } from './src/nftAnalysis';

// Quick analysis
const result = await quickNFTAnalysis('Bored Ape Yacht Club');
console.log(result);

// Full analysis
const fullResult = await analyzeNFTCollection('CryptoPunks', {
  timeRange: '7d',
  includeMarketTrends: true
});
console.log(fullResult);
```

## 🔑 Get API Keys:
- **Mistral**: https://console.mistral.ai/
- **OpenAI**: https://platform.openai.com/api-keys
- **Exa**: https://exa.ai/
- **UnleashNFTs**: https://api.unleashnfts.com/

## ✅ Test Your Setup:
After adding keys, run:
```bash
node test-env-with-dotenv.js
```

**Which option would you like to proceed with?**
