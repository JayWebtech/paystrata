import axios from 'axios';
import { NextRequest } from 'next/server';

interface UtilityResponse {
  status: boolean;
  data?: any;
  msg?: string;
  message?: string;
}

const getNetworkCode = (networkCode: string) => {
  switch (networkCode) {
    case 'MTN':
      return '01';
    case 'Glo':
      return '02';
    case 'Airtel':
      return '04';
    case 'm_9mobile':
      return '03';
    default:
      return '01';
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const { networkCode, phoneNumber, amount } = await req.json();


  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/APIAirtimeV1.asp`,
      {
        params: {
          UserID: process.env.NEXT_USER_ID,
          MobileNetwork: getNetworkCode(networkCode),
          MobileNumber: phoneNumber,
          Amount: amount,
          APIKey: process.env.NEXT_PRIVATE_KEY,
        },
      }
    );

    return new Response(JSON.stringify({ status: true, data: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


    // return new Response(JSON.stringify({ status: true, data: selectedProvider.PRODUCT }), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message || 'Error buying airtime',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
