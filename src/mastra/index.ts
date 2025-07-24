import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { researchWorkflow } from './workflows/researchWorkflow';
import 'dotenv/config';
import { sparkAgent } from './agents/sparkAgent';
import { novaAgent } from './agents/novaAgent';
import { echoAgent } from './agents/echoAgent';
import { veraAgent } from './agents/veraAgent';
import { lunaAgent } from './agents/lunaAgent';
import { sageAgent } from './agents/sageAgent';
import { generateProjectReportWorkflow } from './workflows/generateProjectReportWorkflow';
import { projectResearchWorkflow } from './workflows/projectResearchWorkflow';
import { mainProjectWorkflow } from './workflows/mainProjectWorkflow';

export const mastra = new Mastra({
  storage: new LibSQLStore({
    url: 'file:../mastra.db',
  }),
  agents: {
    sageAgent,
    sparkAgent,
    novaAgent,
    lunaAgent,
    echoAgent,
    veraAgent,
  },
  workflows: {
    researchWorkflow,
    generateProjectReportWorkflow,
    projectResearchWorkflow,
    mainProjectWorkflow,
  },
});
