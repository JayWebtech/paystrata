import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      hash, 
      refcode, 
      wallet_address, 
      amount,
      stark_amount,
      txn_type,
      status = 'pending'
    } = body;

    // Validate required fields
    if (!hash || !refcode || !wallet_address || !amount || !stark_amount || !txn_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('pending_transactions')
      .insert([{
        hash,
        refcode,
        wallet_address,
        amount,
        stark_amount,
        txn_type,
        status,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error storing pending transaction:', error);
      return NextResponse.json(
        { error: `Failed to store pending transaction: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error in store-pending-transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 