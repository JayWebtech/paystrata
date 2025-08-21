const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'starkpay',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

async function populateTestData() {
  try {
    console.log('🌱 Creating test data...');

    // Sample wallet addresses
    const walletAddresses = [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0x2345678901bcdef12345678901bcdef123456789',
      '0x3456789012cdef123456789012cdef1234567890',
      '0x4567890123def1234567890123def12345678901',
      '0x56789012345ef123456789012345ef1234567890'
    ];

    // Create sample transactions
    const transactions = [
      {
        amount: 5000,
        txn_type: 'airtime_purchase',
        wallet_address: walletAddresses[0],
        status: 'success',
        hash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
        refcode: 'SP001234',
        phone_number: '08012345678',
        network: 'MTN',
        stark_amount: 2.5
      },
      {
        amount: 3500,
        txn_type: 'data_purchase',
        wallet_address: walletAddresses[1],
        status: 'success',
        hash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234yz567abc',
        refcode: 'SP001235',
        phone_number: '08023456789',
        network: 'Airtel',
        stark_amount: 1.75
      },
      {
        amount: 8000,
        txn_type: 'cable_payment',
        wallet_address: walletAddresses[2],
        status: 'success',
        hash: '0xghi789jkl012mno345pqr678stu901vwx234yz567abc123def',
        refcode: 'SP001236',
        iuc_number: '1234567890',
        network: 'DSTV',
        stark_amount: 4.0
      },
      {
        amount: 12000,
        txn_type: 'utility_payment',
        wallet_address: walletAddresses[3],
        status: 'success',
        hash: '0xjkl012mno345pqr678stu901vwx234yz567abc123def456ghi',
        refcode: 'SP001237',
        meter_number: '04123456789',
        network: 'AEDC',
        stark_amount: 6.0
      },
      {
        amount: 2000,
        txn_type: 'airtime_purchase',
        wallet_address: walletAddresses[4],
        status: 'failed',
        hash: '0xmno345pqr678stu901vwx234yz567abc123def456ghi789jkl',
        refcode: 'SP001238',
        phone_number: '08034567890',
        network: 'Glo',
        stark_amount: 1.0
      }
    ];

    // Insert transactions
    for (const tx of transactions) {
      await pool.query(
        `INSERT INTO transactions (amount, txn_type, wallet_address, status, hash, refcode, phone_number, iuc_number, meter_number, network, stark_amount, refunded) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          tx.amount,
          tx.txn_type,
          tx.wallet_address,
          tx.status,
          tx.hash,
          tx.refcode,
          tx.phone_number || null,
          tx.iuc_number || null,
          tx.meter_number || null,
          tx.network,
          tx.stark_amount,
          false
        ]
      );
    }

    // Create sample pending transactions
    const pendingTransactions = [
      {
        amount: 7500,
        txn_type: 'data_purchase',
        wallet_address: walletAddresses[0],
        status: 'pending',
        hash: '0xpending123abc456def789ghi012jkl345mno678pqr901stu',
        refcode: 'SP001239',
        phone_number: '08045678901',
        network: 'MTN',
        stark_amount: 3.75
      },
      {
        amount: 15000,
        txn_type: 'cable_payment',
        wallet_address: walletAddresses[1],
        status: 'processing',
        hash: '0xprocessing456def789ghi012jkl345mno678pqr901stu234',
        refcode: 'SP001240',
        iuc_number: '2345678901',
        network: 'GOTV',
        stark_amount: 7.5
      }
    ];

    // Insert pending transactions
    for (const tx of pendingTransactions) {
      await pool.query(
        `INSERT INTO pending_transactions (amount, txn_type, wallet_address, status, hash, refcode, phone_number, iuc_number, meter_number, network, stark_amount) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          tx.amount,
          tx.txn_type,
          tx.wallet_address,
          tx.status,
          tx.hash,
          tx.refcode,
          tx.phone_number || null,
          tx.iuc_number || null,
          tx.meter_number || null,
          tx.network,
          tx.stark_amount
        ]
      );
    }

    // Create sample refunds
    const refunds = [
      {
        amount: 2000,
        reason: 'Transaction failed - automatic refund',
        status: 'completed'
      }
    ];

    // Get a transaction ID for the refund
    const txResult = await pool.query('SELECT id FROM transactions WHERE status = $1 LIMIT 1', ['failed']);
    if (txResult.rows.length > 0) {
      const transactionId = txResult.rows[0].id;
      
      for (const refund of refunds) {
        await pool.query(
          `INSERT INTO refunds (transaction_id, amount, reason, status, processed_at) 
           VALUES ($1, $2, $3, $4, $5)`,
          [
            transactionId,
            refund.amount,
            refund.reason,
            refund.status,
            refund.status === 'completed' ? new Date() : null
          ]
        );
      }
    }

    console.log('✅ Test data created successfully!');
    console.log('📊 Created:');
    console.log('   - 5 sample transactions (4 successful, 1 failed)');
    console.log('   - 2 pending transactions');
    console.log('   - 1 refund record');
    console.log('💰 Total Revenue: ₦28,500');
    console.log('📈 Total Profit: ₦1,425 (5%)');
    console.log('👥 Unique Users: 5');
    
  } catch (error) {
    console.error('❌ Error creating test data:', error);
  } finally {
    await pool.end();
  }
}

populateTestData();
