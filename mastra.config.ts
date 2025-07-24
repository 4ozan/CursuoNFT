import { defineConfig } from 'mastra';

export default defineConfig({
  name: 'template-deep-research',
  version: '1.0.0',
  entry: 'src/mastra/index.ts',
  build: {
    outDir: '.mastra/.build',
  },
});
