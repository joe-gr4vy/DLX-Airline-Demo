'use client';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CheckoutContent from './CheckoutContent';

function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const market = searchParams.get('market') || 'US';
  const outboundDate = searchParams.get('outboundDate');
  const returnDate = searchParams.get('returnDate');
  const outboundFlight = searchParams.get('outboundFlight');
  const outboundFare = searchParams.get('outboundFare');
  const outboundPrice = searchParams.get('outboundPrice');
  const returnFlight = searchParams.get('returnFlight');
  const returnFare = searchParams.get('returnFare');
  const returnPrice = searchParams.get('returnPrice');
  const addons = searchParams.get('addons') || '{}';
  const total = searchParams.get('total');

  console.log('Checkout page received:', {
    market, outboundDate, returnDate, outboundFlight, outboundFare, outboundPrice,
    returnFlight, returnFare, returnPrice, addons, total
  });

  const handleMarketChange = (newMarket) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('market', newMarket);
    router.push(`/checkout?${params.toString()}`);
  };

  const markets = [
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' }
  ];

  return (
    <>
      {/* Market Selector Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(26, 35, 126, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        <span style={{ 
          color: 'white', 
          fontSize: '14px', 
          fontWeight: '500',
          marginRight: '8px'
        }}>
          Market:
        </span>
        {markets.map(m => (
          <button
            key={m.code}
            onClick={() => handleMarketChange(m.code)}
            style={{
              padding: '8px 16px',
              background: market === m.code 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'rgba(255,255,255,0.1)',
              border: market === m.code 
                ? '2px solid #667eea'
                : '2px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: market === m.code ? 'bold' : 'normal',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              if (market !== m.code) {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (market !== m.code) {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            <span>{m.flag}</span>
            <span>{m.code}</span>
          </button>
        ))}
      </div>

      {/* Add padding to account for fixed header */}
      <div style={{ paddingTop: '70px' }}>
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
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading checkout...</div>}>
      <CheckoutWrapper />
    </Suspense>
  );
}