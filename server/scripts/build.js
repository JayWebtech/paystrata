#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting StarkPay Backend Build Process...\n');

try {
  // Step 1: TypeScript Compilation
  console.log('📦 Step 1: Compiling TypeScript...');
  execSync('tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed\n');

  // Step 2: Database Setup
  console.log('🗄️  Step 2: Setting up database...');
  execSync('node scripts/init-db.js', { stdio: 'inherit' });
  console.log('✅ Database setup completed\n');

  // Step 3: Admin User Setup
  console.log('👤 Step 3: Setting up admin user...');
  execSync('node scripts/setup-admin.js', { stdio: 'inherit' });
  console.log('✅ Admin user setup completed\n');


  console.log('🎉 Build process completed successfully!');
  console.log('🚀 Server is ready to start with: npm start');
  
} catch (error) {
  console.error('💥 Build process failed:', error.message);
  process.exit(1);
}
