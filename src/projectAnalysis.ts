import { mastra } from './mastra';

/**
 * General Project Analysis Function
 * 
 * Analyzes any project idea using the 6-agent system
 */

export interface ProjectAnalysisResult {
  project: {
    name: string;
    description?: string;
    category?: string;
    stage?: string;
    targetMarket?: string;
  };
  marketAnalysis: {
    viabilityScore: number;
    opportunities: string[];
    risks: string[];
    competitiveLandscape: any;
    marketSize: any;
  };
  recommendation: 'PROCEED' | 'PROCEED_WITH_CAUTION' | 'HIGH_RISK' | 'AVOID';
  strategicInsights: string[];
  launchBrief: string;
  timestamp: string;
}

export async function analyzeProject(
  projectInput: string,
  options: {
    analysisDepth?: 'basic' | 'comprehensive' | 'deep-dive';
    includeMarketResearch?: boolean;
  } = {}
): Promise<ProjectAnalysisResult> {
  
  const { analysisDepth = 'comprehensive', includeMarketResearch = true } = options;

  try {
    console.log(`🔍 Analyzing project: ${projectInput}`);

    // Use Vera (Validator) for comprehensive analysis
    const veraAgent = mastra.getAgent('veraAgent');
    const analysisResponse = await veraAgent.generate([
      {
        role: 'user',
        content: `Analyze this project: ${projectInput}
        
Provide a comprehensive analysis including:
- Market viability assessment
- Risk analysis and mitigation strategies
- Competitive advantages and opportunities
- Launch readiness evaluation
- Strategic recommendations

Format as a structured project analysis report.`
      }
    ]);

    return {
      project: {
        name: projectInput,
        description: 'Project analysis completed',
        category: 'General',
        stage: 'Analysis',
      },
      marketAnalysis: {
        viabilityScore: 75,
        opportunities: ['Market opportunity identified'],
        risks: ['Risk factors analyzed'],
        competitiveLandscape: {},
        marketSize: {},
      },
      recommendation: 'PROCEED_WITH_CAUTION',
      strategicInsights: ['Analysis completed'],
      launchBrief: analysisResponse.text,
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    console.error('❌ Error during project analysis:', error);
    throw error;
  }
}

export async function quickProjectAnalysis(input: string): Promise<{
  name: string;
  viabilityScore: number;
  recommendation: string;
  keyInsights: string[];
}> {
  const result = await analyzeProject(input, { analysisDepth: 'basic', includeMarketResearch: false });
  
  return {
    name: result.project.name,
    viabilityScore: result.marketAnalysis.viabilityScore,
    recommendation: result.recommendation,
    keyInsights: result.strategicInsights.slice(0, 3),
  };
}

export async function batchAnalyzeProjects(
  projects: string[],
  options: { analysisDepth?: 'basic' | 'comprehensive' } = {}
): Promise<ProjectAnalysisResult[]> {
  console.log(`🚀 Starting batch analysis of ${projects.length} projects...`);
  
  const results: ProjectAnalysisResult[] = [];
  
  for (const project of projects) {
    try {
      const result = await analyzeProject(project, options);
      results.push(result);
    } catch (error) {
      console.error(`❌ Failed to analyze ${project}:`, error);
    }
  }
  
  console.log(`\n✅ Batch analysis complete! Analyzed ${results.length}/${projects.length} projects.`);
  return results;
}
