import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const evaluateResultTool = createTool({
  id: 'evaluate-result',
  description: 'Evaluate project ideas, market viability, and strategic recommendations using Echo (Audience Analyst) expertise',
  inputSchema: z.object({
    query: z.string().describe('The project or research query to evaluate'),
    result: z
      .object({
        title: z.string(),
        url: z.string(),
        content: z.string(),
      })
      .describe('The search result to evaluate'),
    existingUrls: z.array(z.string()).describe('URLs that have already been processed').optional(),
  }),
  execute: async ({ context, mastra }) => {
    try {
      const { query, result, existingUrls = [] } = context;
      console.log('Evaluating result', { context });

      // Check if URL already exists (only if existingUrls was provided)
      if (existingUrls && existingUrls.includes(result.url)) {
        return {
          isRelevant: false,
          reason: 'URL already processed',
        };
      }

      const echoAgent = mastra!.getAgent('echoAgent');

      const response = await echoAgent.generate(
        [
          {
            role: 'user',
            content: `Evaluate whether this search result is relevant and will help answer the query: "${query}".

        Search result:
        Title: ${result.title}
        URL: ${result.url}
        Content snippet: ${result.content.substring(0, 500)}...

        Respond with a JSON object containing:
        - isRelevant: boolean indicating if the result is relevant
        - reason: brief explanation of your decision`,
          },
        ],
        {
          experimental_output: z.object({
            isRelevant: z.boolean(),
            reason: z.string(),
          }),
        },
      );

      return response.object;
    } catch (error) {
      console.error('Error evaluating result:', error);
      return {
        isRelevant: false,
        reason: 'Error in evaluation',
      };
    }
  },
});
