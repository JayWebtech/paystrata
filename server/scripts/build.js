#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting StarkPay Backend Build Process...\n');

try {
  // Step 1: TypeScript Compilation
  console.log('📦 Step 1: Compiling TypeScript...');
  execSync('tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed\n');




  console.log('🎉 Build process completed successfully!');
  console.log('🚀 Server is ready to start with: npm start');
  console.log('📝 Note: Database setup will happen automatically on first run');
  
} catch (error) {
  console.error('💥 Build process failed:', error.message);
  process.exit(1);
}
