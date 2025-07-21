// Quick test to verify Mistral API key is working
import { mistral } from '@ai-sdk/mistral';
import { generateText } from 'ai';

async function testMistralKey() {
  try {
    console.log('Testing Mistral API key...');
    
    const result = await generateText({
      model: mistral('mistral-large-latest'),
      prompt: 'Say "Hello from Mistral!" if you can read this.',
    });
    
    console.log('✅ Mistral API key is working!');
    console.log('Response:', result.text);
  } catch (error) {
    console.error('❌ Mistral API key error:', error.message);
  }
}

testMistralKey();
