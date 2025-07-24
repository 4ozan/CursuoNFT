import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

export const mainProjectWorkflow = createWorkflow({
  id: 'main-project-workflow',
  inputSchema: z.object({
    projectName: z.string().describe('Project name or concept to analyze'),
    description: z.string().optional().describe('Project description'),
    category: z.string().optional().describe('Project category/industry'),
    stage: z.string().optional().describe('Current project stage'),
  }),
  outputSchema: z.object({
    analysis: z.string().describe('Comprehensive project analysis'),
    recommendations: z.array(z.string()).describe('Action recommendations'),
    nextSteps: z.array(z.string()).describe('Next steps for project'),
  }),
});
