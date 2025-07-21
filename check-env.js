// Check if environment variables are loaded
console.log('🔍 Checking Environment Variables...\n');

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
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'not set');
