const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'starkpay',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

async function initDatabase() {
  try {
    console.log('🗄️  Initializing database tables...');

    // Create admin_users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ admin_users table created/verified');

    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        amount DECIMAL(20, 2) NOT NULL,
        txn_type VARCHAR(100) NOT NULL,
        wallet_address VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        hash VARCHAR(255),
        refcode VARCHAR(100) UNIQUE,
        phone_number VARCHAR(20),
        iuc_number VARCHAR(50),
        meter_number VARCHAR(50),
        network VARCHAR(50),
        stark_amount DECIMAL(20, 8),
        refunded BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ transactions table created/verified');

    // Create pending_transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pending_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        amount DECIMAL(20, 2) NOT NULL,
        txn_type VARCHAR(100) NOT NULL,
        wallet_address VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        hash VARCHAR(255),
        refcode VARCHAR(100) UNIQUE,
        phone_number VARCHAR(20),
        iuc_number VARCHAR(50),
        meter_number VARCHAR(50),
        network VARCHAR(50),
        stark_amount DECIMAL(20, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ pending_transactions table created/verified');

    // Create refunds table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS refunds (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        transaction_id UUID NOT NULL REFERENCES transactions(id),
        amount DECIMAL(20, 2) NOT NULL,
        reason TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        processed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ refunds table created/verified');

    // Create swap_jobs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS swap_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        amount VARCHAR(255) NOT NULL,
        from_token VARCHAR(255) NOT NULL,
        to_token VARCHAR(255) NOT NULL,
        user_address VARCHAR(255) NOT NULL,
        refcode VARCHAR(255),
        result JSONB,
        error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ swap_jobs table created/verified');

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if this script is executed directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('✅ Database setup completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { initDatabase };
