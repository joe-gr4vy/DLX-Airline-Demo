// src/app/api/token/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount') || '10000';

    const privateKey = process.env.GR4VY_PRIVATE_KEY;
    
    if (!privateKey) {
      console.error('GR4VY_PRIVATE_KEY is not set');
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    // Create the embed token request
    const response = await fetch('https://api.sandbox.gr4vy.app/embed/buyer/single-use', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseInt(amount),
        currency: 'USD',
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gr4vy API error:', response.status, errorText);
      return NextResponse.json({ 
        error: `API error: ${response.status}` 
      }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      token: data.token 
    });

  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}