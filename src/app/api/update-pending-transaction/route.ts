import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hash, refcode, status } = body;

    // Validate required fields
    if (!hash || !refcode || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('pending_transactions')
      .update({ 
        status,
        completed_at: status !== 'pending' ? new Date().toISOString() : null
      })
      .eq('hash', hash)
      .eq('refcode', refcode)
      .select()
      .single();

    if (error) {
      console.error('Error updating pending transaction:', error);
      return NextResponse.json(
        { error: `Failed to update pending transaction: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error in update-pending-transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 