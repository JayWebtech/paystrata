const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'starkpay',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

async function populateSwaps() {
  try {
    // Check if swap_jobs table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'swap_jobs'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ swap_jobs table does not exist. Creating it...');
      
      await pool.query(`
        CREATE TABLE swap_jobs (
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
      
      console.log('✅ swap_jobs table created');
    }

    // Check if there are already swaps
    const existingSwaps = await pool.query('SELECT COUNT(*) FROM swap_jobs');
    if (parseInt(existingSwaps.rows[0].count) > 0) {
      console.log('✅ Sample swaps already exist');
      return;
    }

    // Sample swap data
    const sampleSwaps = [
      {
        status: 'completed',
        amount: '100.5',
        from_token: 'STRK',
        to_token: 'USDC',
        user_address: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        refcode: 'SWAP001',
        result: { transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890' }
      },
      {
        status: 'pending',
        amount: '50.25',
        from_token: 'USDC',
        to_token: 'STRK',
        user_address: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        refcode: 'SWAP002'
      },
      {
        status: 'processing',
        amount: '75.0',
        from_token: 'STRK',
        to_token: 'USDC',
        user_address: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        refcode: 'SWAP003'
      },
      {
        status: 'failed',
        amount: '25.0',
        from_token: 'USDC',
        to_token: 'STRK',
        user_address: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        refcode: 'SWAP004',
        error: 'Insufficient liquidity'
      },
      {
        status: 'completed',
        amount: '200.0',
        from_token: 'STRK',
        to_token: 'USDC',
        user_address: '0x1111111111111111111111111111111111111111111111111111111111111111',
        refcode: 'SWAP005',
        result: { transactionHash: '0x2222222222222222222222222222222222222222222222222222222222222222' }
      }
    ];

    // Insert sample swaps
    for (const swap of sampleSwaps) {
      await pool.query(`
        INSERT INTO swap_jobs (status, amount, from_token, to_token, user_address, refcode, result, error)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        swap.status,
        swap.amount,
        swap.from_token,
        swap.to_token,
        swap.user_address,
        swap.refcode,
        swap.result ? JSON.stringify(swap.result) : null,
        swap.error || null
      ]);
    }

    console.log('✅ Sample swaps created successfully');
    console.log('📊 Created swaps:');
    sampleSwaps.forEach((swap, index) => {
      console.log(`  ${index + 1}. ${swap.refcode} - ${swap.status} - ${swap.amount} ${swap.from_token} → ${swap.to_token}`);
    });

  } catch (error) {
    console.error('❌ Error populating swaps:', error);
  } finally {
    await pool.end();
  }
}

populateSwaps();
