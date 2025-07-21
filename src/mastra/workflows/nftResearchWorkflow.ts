import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

// Simplified NFT Research Workflow - just a placeholder
// The actual NFT analysis is handled by the functions in nftAnalysis.ts
export const nftResearchWorkflow = createWorkflow({
  id: 'nft-research-workflow',
  inputSchema: z.object({
    input: z.string().describe('NFT collection to research'),
  }),
  outputSchema: z.object({
    result: z.string().describe('Research result'),
  }),
});
