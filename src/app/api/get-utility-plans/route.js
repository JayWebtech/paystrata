import axios from "axios";

export async function POST(req, res) {
  const { providerCode } = await req.json();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/APIElectricityDiscosV1.asp`,
      {
        params: {
          UserID: process.env.NEXT_USER_ID,
        },
      }
    );
    const allProviders = response.data?.ELECTRIC_COMPANY;

    if (!allProviders) {
      return new Response(
        JSON.stringify({ status: false, msg: "No electricity providers found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const selectedProvider = allProviders[providerCode]?.[0];

    if (!selectedProvider) {
      return new Response(
        JSON.stringify({ status: false, msg: "Provider not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ status: true, data: selectedProvider.PRODUCT }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message || "Error fetching electricity plans",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
