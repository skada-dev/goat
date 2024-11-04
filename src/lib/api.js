import axios from 'axios';

export async function fetchBlockchainData() {
  try {
    const response = await axios.get("https://public-api.dextools.io/free/v2/blockchains", {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY },
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY}`

    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blockchain data:", error);
    throw error;
  }
}
