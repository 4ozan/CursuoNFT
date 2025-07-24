import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

// Project Research Workflow
// Uses the 6-agent system for comprehensive project research
export const projectResearchWorkflow = createWorkflow({
  id: 'project-research-workflow',
  inputSchema: z.object({
    projectName: z.string().describe('Project name to research'),
    description: z.string().optional().describe('Project description'),
    category: z.string().optional().describe('Project category'),
  }),
  outputSchema: z.object({
    researchData: z.any().describe('Comprehensive project research data'),
    insights: z.array(z.string()).describe('Key insights from research'),
    sources: z.array(z.string()).describe('Research sources used'),
  }),
});
