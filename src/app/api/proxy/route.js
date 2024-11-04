// app/api/dextools/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://public-api.dextools.io/advanced/v2/token/ether/0x5200B34E6a519F289f5258dE4554eBd3dB12E822/info';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY, 
      },
    });

    if (!response.ok) {
      // Capture the status and error message if the request fails
      const errorText = await response.text();
      return NextResponse.json({ error: `Failed to fetch data: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 });
  }
}
