#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Starting StarkPay Backend Setup...\n');

async function runStartup() {
  try {
    // Step 1: Database Setup
    console.log('🗄️  Step 1: Setting up database...');
    execSync('node scripts/init-db.js', { stdio: 'inherit' });
    console.log('✅ Database setup completed\n');

    // Step 2: Admin User Setup
    console.log('👤 Step 2: Setting up admin user...');
    execSync('node scripts/setup-admin.js', { stdio: 'inherit' });
    console.log('✅ Admin user setup completed\n');

    console.log('🎉 Startup process completed successfully!');
    console.log('🚀 Server is ready to start with: npm start');
    
  } catch (error) {
    console.error('💥 Startup process failed:', error.message);
    // Don't exit with error code, just log the issue
    console.log('⚠️  Continuing with server startup...');
  }
}

// Run startup if this script is executed directly
if (require.main === module) {
  runStartup();
}

module.exports = { runStartup };
