import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { researchWorkflow } from './workflows/researchWorkflow';
import { learningExtractionAgent } from './agents/learningExtractionAgent';
import { evaluationAgent } from './agents/evaluationAgent';
import { reportAgent } from './agents/reportAgent';
import { researchAgent } from './agents/researchAgent';
import { webSummarizationAgent } from './agents/webSummarizationAgent';
import { nftResearchAgent } from './agents/nftResearchAgent';
import { generateReportWorkflow } from './workflows/generateReportWorkflow';
import { nftResearchWorkflow } from './workflows/nftResearchWorkflow';
import { mainNftWorkflow } from './workflows/mainNftWorkflow';

export const mastra = new Mastra({
  storage: new LibSQLStore({
    url: 'file:../mastra.db',
  }),
  agents: {
    researchAgent,
    reportAgent,
    evaluationAgent,
    learningExtractionAgent,
    webSummarizationAgent,
    nftResearchAgent,
  },
  workflows: { 
    generateReportWorkflow, 
    researchWorkflow,
    nftResearchWorkflow,
    mainNftWorkflow,
  },
});
