import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// List of protected API routes that require transaction verification
const PROTECTED_ROUTES = [
  '/api/buy-airtime',
  '/api/buy-data',
  '/api/pay-cable',
  '/api/pay-utility'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only check protected routes
  if (!PROTECTED_ROUTES.includes(path)) {
    return NextResponse.next();
  }

  try {
    // Get the transaction hash from the request headers
    const txHash = request.headers.get('x-transaction-hash');
    const refcode = request.headers.get('x-reference-code');

    if (!txHash || !refcode) {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: 'Missing transaction verification headers'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // First check pending_transactions
    const { data: pendingTx, error: pendingError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('hash', txHash)
      .eq('refcode', refcode)
      .single();

    if (!pendingError && pendingTx) {
      // If found in pending_transactions, verify it's pending
      if (pendingTx.status !== 'pending') {
        return new NextResponse(
          JSON.stringify({
            status: false,
            message: 'Transaction already processed'
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      // Add transaction info to request headers for the API route to use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-transaction-verified', 'true');
      requestHeaders.set('x-transaction-id', pendingTx.id);
      requestHeaders.set('x-transaction-type', 'pending');

      // Continue to the API route
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // If not in pending_transactions, check transactions table
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('hash', txHash)
      .eq('refcode', refcode)
      .single();

    if (error || !transaction) {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: 'Invalid transaction'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Verify transaction status
    if (transaction.status !== 'success') {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: 'Transaction not successful'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Verify transaction hasn't been used before
    if (transaction.used) {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: 'Transaction already used'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Add transaction info to request headers for the API route to use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-transaction-verified', 'true');
    requestHeaders.set('x-transaction-id', transaction.id);
    requestHeaders.set('x-transaction-type', 'completed');

    // Continue to the API route
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Middleware error:', error);
    return new NextResponse(
      JSON.stringify({
        status: false,
        message: 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export const config = {
  matcher: [
    '/api/buy-airtime',
    '/api/buy-data',
    '/api/pay-cable',
    '/api/pay-utility'
  ]
}; 