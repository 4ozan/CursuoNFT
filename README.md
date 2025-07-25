<img width="1178" height="204" alt="image" src="https://github.com/user-attachments/assets/6b44d7b7-9c34-435d-9df6-a16a663e92a2" /> <span><svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m0 24c15.2548 0 24-8.7452 24-24 0 15.2548 8.7452 24 24 24-15.2548 0-24 8.7452-24 24 0-15.2548-8.7452-24-24-24z" fill="#0A0D12" fill-rule="evenodd"/></svg></span>

<svg fill="none" height="48" viewBox="0 0 40 48" width="40" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m20 4c11.0457 0 20 8.9543 20 20s-8.9543 20-20 20-20-8.9543-20-20 8.9543-20 20-20zm15 20c0 8.2843-6.7157 15-15 15v-30c8.2843 0 15 6.7157 15 15z" fill="#4a1fb8" fill-rule="evenodd"/></svg>

# Project Research & Validation System with ChainOpera

🏆 **Hackathon Project - Powered by ChainOpera AI**

This hackathon project showcases the power of ChainOpera AI's advanced language models in a comprehensive AI-powered project research and validation system. Built with Mastra's multi-agent architecture, it demonstrates how ChainOpera's cutting-edge AI technology can orchestrate complex multi-agent workflows to deliver end-to-end project analysis from initial idea validation to technical implementation planning.

**Special thanks to ChainOpera AI for providing the intelligent foundation that makes this 6-agent collaborative system possible.**

## 🤖 ChainOpera AI Integration

This project leverages **ChainOpera AI's powerful language models** to create intelligent, context-aware agents that can:

- 🧠 **Strategic Thinking**: Process complex business requirements and generate actionable insights
- 🔍 **Market Research**: Analyze vast amounts of web data to identify trends and opportunities
- 🎨 **Creative Problem Solving**: Generate innovative solutions for branding and technical challenges
- 📊 **Data Synthesis**: Transform raw research into comprehensive, structured reports
- 🤝 **Collaborative Intelligence**: Enable seamless multi-agent communication and workflow orchestration

ChainOpera's advanced AI capabilities enable each agent to maintain specialized expertise while contributing to a unified, intelligent research ecosystem.

## 6-Agent Research Team

Powered by ChainOpera AI, the system employs six specialized agents, each with distinct roles and expertise:

### 🧠 **Sage - The Strategist**
- **Role**: Founder/Product Manager mindset
- **Focus**: Project scope definition, MVP features, goal alignment
- **Tools**: Web search, project insights analysis
- **Output**: Strategic briefs, scope definitions, feature prioritization

### ⚡ **Spark - The Toolsmith** 
- **Role**: CTO/Technical Architect
- **Focus**: Tech stack recommendations, no-code/low-code solutions
- **Tools**: Web search, project insights analysis
- **Output**: Technical architecture, tool recommendations, implementation timelines

### 🎨 **Nova - The Brand Crafter**
- **Role**: Brand Consultant/Visual Creative
- **Focus**: Brand identity, visual design, storytelling
- **Tools**: Web search, project insights analysis
- **Output**: Brand guidelines, visual concepts, design systems

### 👥 **Echo - The Audience Analyst**
- **Role**: Marketing Strategist/Audience Expert
- **Focus**: ICP development, target segments, emotional triggers
- **Tools**: Web search, result evaluation, project insights analysis
- **Output**: Customer personas, audience strategies, market insights

### ✅ **Vera - The Validator**
- **Role**: Investor/Product Analyst
- **Focus**: Market viability, risk assessment, launch readiness
- **Tools**: Web search, project insights analysis
- **Output**: Market analysis, risk assessments, launch briefs

### ✍️ **Luna - The Wordsmith**
- **Role**: Copywriter/Report Generator
- **Focus**: Persuasive copy, comprehensive reporting, synthesis
- **Tools**: Learning extraction, project insights analysis
- **Output**: Landing page copy, detailed reports, strategic narratives

## Workflow Architecture

The system uses Mastra's workflow capabilities for orchestrated multi-agent collaboration:

- **`mainProjectWorkflow`**: Coordinates the entire project analysis process
- **`projectResearchWorkflow`**: Handles comprehensive project research
- **`generateProjectReportWorkflow`**: Synthesizes findings into actionable reports
- **`researchWorkflow`**: Manages general research tasks with human-in-the-loop

## Custom Tools & Capabilities

- **`webSearchTool`**: Powered by Exa API for market research and competitive analysis
- **`projectInsightsTool`**: Advanced project analysis and strategic insights
- **`evaluateResultTool`**: AI-powered relevance assessment for research results
- **`extractLearningsTool`**: Key insight extraction and follow-up question generation
- **`projectTopicAdapterTool`**: Intelligent topic adaptation and refinement

## Key Benefits of Multi-Agent Architecture

1. **Specialized Expertise**: Each agent brings domain-specific knowledge and perspective to project analysis

2. **Comprehensive Coverage**: From strategy to technical implementation, branding to market validation

3. **Collaborative Intelligence**: Agents work together through workflows to provide holistic insights

4. **Human-in-the-Loop**: Interactive workflows allow for user guidance and iterative refinement

5. **Scalable & Modular**: Each agent and tool can be independently upgraded and customized

6. **Real-time Research**: Live web search capabilities ensure up-to-date market intelligence

## How to Use

```bash
# Install dependencies
bun install
# or
pnpm install

# Start the development server
bun run dev
# or
pnpm run dev
```

### Typical Workflow:

1. **Project Input**: Provide your project idea or concept
2. **Agent Collaboration**: The 6-agent team researches and analyzes different aspects
3. **Strategic Analysis**: Sage defines scope and MVP features
4. **Technical Planning**: Spark recommends tools and architecture
5. **Brand Development**: Nova creates visual identity concepts
6. **Audience Research**: Echo develops customer personas and market insights
7. **Validation**: Vera assesses viability and risks
8. **Report Generation**: Luna synthesizes everything into actionable reports

## Required Environment Variables

Create a `.env` file with:

```
OPENAI_API_KEY="your-openai-api-key"
EXA_API_KEY="your-exa-api-key"
```

## Tech Stack

### Core Framework
- **Mastra**: Multi-agent orchestration and workflow management
- **TypeScript**: Type-safe development
- **Bun/pnpm**: Fast package management and runtime

### AI & Models
- **@ai-sdk/openai**: OpenAI GPT models integration
- **@ai-sdk/mistral**: Mistral AI models support
- **TensorOpera API**: Alternative OpenAI-compatible endpoint

### Tools & Integrations
- **Exa API**: Advanced web search and content retrieval
- **LibSQL**: Lightweight database for agent state management
- **Zod**: Runtime type validation and schema definition

### Agent Capabilities
- **Web Search**: Real-time market research and competitive analysis
- **Project Analysis**: Strategic insights and technical recommendations
- **Result Evaluation**: AI-powered relevance assessment
- **Learning Extraction**: Key insight synthesis and report generation

## Project Structure

```
src/mastra/
├── agents/          # 6 specialized AI agents
├── tools/           # Custom tools for research and analysis
├── workflows/       # Multi-agent orchestration workflows
└── index.ts         # Main Mastra configuration
```
