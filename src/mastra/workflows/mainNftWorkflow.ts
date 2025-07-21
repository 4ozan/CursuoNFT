import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

// Main NFT Analysis Workflow - placeholder
// The actual NFT analysis is handled by the functions in nftAnalysis.ts
// Use: import { analyzeNFTCollection } from '../nftAnalysis';
export const mainNftWorkflow = createWorkflow({
  id: 'main-nft-workflow',
  inputSchema: z.object({
    input: z.string().describe('NFT collection to analyze'),
  }),
  outputSchema: z.object({
    result: z.string().describe('Analysis result'),
  }),
});
