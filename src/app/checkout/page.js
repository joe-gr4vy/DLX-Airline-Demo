// src/app/checkout/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

function CheckoutWrapper() {
  const searchParams = useSearchParams();
  
  const market = searchParams.get('market') || 'US';
  const outboundDate = searchParams.get('outboundDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const outboundFlight = searchParams.get('outboundFlight') || '';
  const outboundFare = searchParams.get('outboundFare') || '';
  const outboundPrice = searchParams.get('outboundPrice') || '0';
  const returnFlight = searchParams.get('returnFlight') || '';
  const returnFare = searchParams.get('returnFare') || '';
  const returnPrice = searchParams.get('returnPrice') || '0';
  const addons = searchParams.get('addons') || '{}';
  const total = searchParams.get('total') || '0';

  console.log('Checkout page received:', {
    market,
    outboundDate,
    returnDate,
    outboundFlight,
    outboundFare,
    outboundPrice,
    returnFlight,
    returnFare,
    returnPrice,
    addons,
    total
  });

  return (
    <CheckoutContent
      market={market}
      outboundDate={outboundDate}
      returnDate={returnDate}
      outboundFlight={outboundFlight}
      outboundFare={outboundFare}
      outboundPrice={outboundPrice}
      returnFlight={returnFlight}
      returnFare={returnFare}
      returnPrice={returnPrice}
      addons={addons}
      total={total}
    />
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading checkout...
      </div>
    }>
      <CheckoutWrapper />
    </Suspense>
  );
}