import axios from 'axios';
import { NextRequest } from 'next/server';

// Cache configuration
export const revalidate = 300; // Cache for 5 minutes (300 seconds)

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COINGECKO_URL}/simple/price?vs_currencies=ngn&ids=starknet`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
        },
      }
    );

    const data = response?.data;
    
    if (!data) {
      return new Response(JSON.stringify({ status: false, message: 'An error occured please try again' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ status: true, data: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message || 'Error fetching rate',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
