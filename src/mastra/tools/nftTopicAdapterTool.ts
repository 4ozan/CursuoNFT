import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface NFTTopicData {
  collectionSlug?: string;
  contractAddress?: string;
  collectionName?: string;
  platform?: 'opensea' | 'blur' | 'looksrare' | 'x2y2' | 'unknown';
  extractedFrom: 'url' | 'contract' | 'name';
}

export const nftTopicAdapterTool = createTool({
  id: 'nft-topic-adapter',
  description: 'Extracts NFT collection information from URLs, contract addresses, or collection names',
  inputSchema: z.object({
    input: z.string().describe('URL, contract address, or collection name to analyze'),
  }),
  execute: async ({ context }) => {
    const { input } = context;
    try {
      const result: NFTTopicData = {
        extractedFrom: 'name', // default
      };

      const cleanInput = input.trim().toLowerCase();

      // Check if input is a URL
      if (cleanInput.startsWith('http') || cleanInput.includes('.')) {
        result.extractedFrom = 'url';
        
        // OpenSea URL patterns
        if (cleanInput.includes('opensea.io')) {
          result.platform = 'opensea';
          
          // Extract collection slug from OpenSea URL
          // Examples: 
          // https://opensea.io/collection/bored-ape-yacht-club
          // https://opensea.io/assets/ethereum/0x123.../456
          const openseaMatch = cleanInput.match(/opensea\.io\/collection\/([^\/\?]+)/);
          if (openseaMatch) {
            result.collectionSlug = openseaMatch[1];
            result.collectionName = openseaMatch[1].replace(/-/g, ' ');
          }
          
          // Extract contract from asset URL
          const assetMatch = cleanInput.match(/opensea\.io\/assets\/ethereum\/(0x[a-f0-9]{40})/i);
          if (assetMatch) {
            result.contractAddress = assetMatch[1];
          }
        }
        
        // Blur URL patterns
        else if (cleanInput.includes('blur.io')) {
          result.platform = 'blur';
          const blurMatch = cleanInput.match(/blur\.io\/collection\/([^\/\?]+)/);
          if (blurMatch) {
            result.collectionSlug = blurMatch[1];
            result.collectionName = blurMatch[1].replace(/-/g, ' ');
          }
        }
        
        // LooksRare URL patterns
        else if (cleanInput.includes('looksrare.org')) {
          result.platform = 'looksrare';
          const looksrareMatch = cleanInput.match(/looksrare\.org\/collections\/(0x[a-f0-9]{40})/i);
          if (looksrareMatch) {
            result.contractAddress = looksrareMatch[1];
          }
        }
        
        // X2Y2 URL patterns
        else if (cleanInput.includes('x2y2.io')) {
          result.platform = 'x2y2';
          const x2y2Match = cleanInput.match(/x2y2\.io\/collection\/(0x[a-f0-9]{40})/i);
          if (x2y2Match) {
            result.contractAddress = x2y2Match[1];
          }
        }
        
        else {
          result.platform = 'unknown';
        }
      }
      
      // Check if input is a contract address
      else if (/^0x[a-f0-9]{40}$/i.test(cleanInput)) {
        result.extractedFrom = 'contract';
        result.contractAddress = cleanInput;
      }
      
      // Treat as collection name
      else {
        result.extractedFrom = 'name';
        result.collectionName = input.trim();
        // Generate a potential slug from the name
        result.collectionSlug = input.trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
      }

      // Generate collection name from slug if we have slug but no name
      if (result.collectionSlug && !result.collectionName) {
        result.collectionName = result.collectionSlug.replace(/-/g, ' ');
      }

      return {
        success: true,
        data: result,
        summary: `Extracted NFT topic data: ${result.collectionName || result.contractAddress || 'Unknown'} from ${result.extractedFrom}`,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse NFT topic',
        data: null,
      };
    }
  },
});
