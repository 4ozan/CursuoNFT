import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface ProjectTopicData {
  projectName: string;
  description?: string;
  category?: string;
  stage?: string;
  targetMarket?: string;
  extractedFrom: 'text' | 'url' | 'structured';
}

export const projectTopicAdapterTool = createTool({
  id: 'project-topic-adapter',
  description: 'Parse and structure project information from user input for analysis',
  inputSchema: z.object({
    input: z.string().describe('The user input describing the project or business idea'),
  }),
  execute: async ({ context }) => {
    const { input } = context;
    try {
      const result: ProjectTopicData = {
        projectName: '',
        extractedFrom: 'text',
      };

      // Parse project information from text input
      const cleanInput = input.trim();
      
      // Extract project name (first sentence or main concept)
      const sentences = cleanInput.split(/[.!?]/);
      result.projectName = sentences[0]?.trim() || cleanInput;
      
      // Extract category from keywords
      const categoryKeywords = ['saas', 'fintech', 'healthcare', 'ecommerce', 'ai', 'blockchain', 'mobile', 'social', 'b2b', 'b2c'];
      const lowerInput = cleanInput.toLowerCase();
      for (const keyword of categoryKeywords) {
        if (lowerInput.includes(keyword)) {
          result.category = keyword;
          break;
        }
      }
      
      // Extract stage from keywords
      const stageKeywords = ['idea', 'mvp', 'prototype', 'beta', 'launch', 'growth', 'scaling'];
      for (const keyword of stageKeywords) {
        if (lowerInput.includes(keyword)) {
          result.stage = keyword;
          break;
        }
      }
      
      // Extract target market
      const marketKeywords = ['consumers', 'businesses', 'enterprises', 'startups', 'developers', 'patients', 'students'];
      for (const keyword of marketKeywords) {
        if (lowerInput.includes(keyword)) {
          result.targetMarket = keyword;
          break;
        }
      }

      return {
        success: true,
        data: result,
        summary: `Parsed project: ${result.projectName} (category: ${result.category || 'general'}, stage: ${result.stage || 'unknown'})`,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse project topic',
        data: null,
      };
    }
  },
});
