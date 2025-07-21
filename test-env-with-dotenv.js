// Test environment variables with dotenv loading
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '.env');

console.log('🔍 Loading .env from:', envPath);
const result = config({ path: envPath });

if (result.error) {
  console.log('❌ Error loading .env:', result.error.message);
} else {
  console.log('✅ .env file loaded successfully');
}

console.log('\n🔍 Checking Environment Variables...\n');

const requiredKeys = [
  'MISTRAL_API_KEY',
  'EXA_API_KEY', 
  'UNLEASHNFTS_API_KEY'
];

requiredKeys.forEach(key => {
  const value = process.env[key];
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 8)}...${value.substring(value.length - 4)} (${value.length} chars)`);
  } else {
    console.log(`❌ ${key}: NOT SET`);
  }
});

console.log('\n📁 Current working directory:', process.cwd());
