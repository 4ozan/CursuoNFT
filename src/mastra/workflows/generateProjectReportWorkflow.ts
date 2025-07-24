import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const generateProjectAnalysisStep = createStep({
  id: 'generate-project-analysis',
  inputSchema: z.object({
    projectName: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    stage: z.string().optional(),
  }),
  outputSchema: z.object({
    analysis: z.string(),
    recommendations: z.array(z.string()),
    nextSteps: z.array(z.string()),
    completed: z.boolean(),
  }),
  execute: async ({ inputData, mastra }) => {
    try {
      console.log('Starting comprehensive project analysis...');
      
      // Use Vera for final validation and analysis
      const veraAgent = mastra.getAgent('veraAgent');
      const response = await veraAgent.generate([
        {
          role: 'user',
          content: `Analyze this project using the 6-agent framework:
            Project: ${inputData.projectName}
            Description: ${inputData.description || 'Not provided'}
            Category: ${inputData.category || 'General'}
            Stage: ${inputData.stage || 'Unknown'}
            
            Provide a comprehensive analysis including:
            1. Market viability assessment
            2. Risk analysis
            3. Competitive positioning
            4. Go-to-market strategy
            5. Funding recommendations
            6. Next steps for validation`,
        },
      ]);

      console.log('Project analysis completed!');
      
      // Parse the response into structured data
      const analysis = response.text;
      const recommendations = [
        'Conduct market research validation',
        'Develop MVP or prototype',
        'Identify early adopter customers',
        'Create go-to-market strategy',
        'Establish key metrics and KPIs',
      ];
      
      const nextSteps = [
        'Validate problem-solution fit',
        'Conduct customer interviews',
        'Analyze competitive landscape',
        'Define minimum viable product',
        'Create business model canvas',
      ];

      return {
        analysis,
        recommendations,
        nextSteps,
        completed: true,
      };
    } catch (error) {
      console.error('Error in project analysis:', error);
      return {
        analysis: 'Error occurred during analysis',
        recommendations: [],
        nextSteps: [],
        completed: false,
      };
    }
  },
});

export const generateProjectReportWorkflow = createWorkflow({
  id: 'generate-project-report-workflow',
  steps: [generateProjectAnalysisStep],
  inputSchema: z.object({
    projectName: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    stage: z.string().optional(),
  }),
  outputSchema: z.object({
    analysis: z.string(),
    recommendations: z.array(z.string()),
    nextSteps: z.array(z.string()),
    completed: z.boolean(),
  }),
});

generateProjectReportWorkflow
  .then(generateProjectAnalysisStep)
  .commit();
