// src/app/success/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  
  const market = searchParams.get('market') || 'US';
  const outboundFlight = searchParams.get('outboundFlight') || '';
  const returnFlight = searchParams.get('returnFlight') || '';
  const total = searchParams.get('total') || '0';
  const txn = searchParams.get('txn') || '';

  const currencies = {
    IE: { symbol: '€', code: 'EUR' },
    GB: { symbol: '£', code: 'GBP' },
    US: { symbol: '$', code: 'USD' },
    BR: { symbol: 'R$', code: 'BRL' },
    AE: { symbol: 'د.إ', code: 'AED' }
  };

  const currency = currencies[market];

  return (
    <main style={{
      background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '60px 40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px'
        }}>
          ✓
        </div>

        <h1 style={{ color: '#1a237e', fontSize: '32px', marginBottom: '16px' }}>
          Booking Confirmed!
        </h1>

        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
          Your payment has been processed successfully
        </p>

        {/* Booking Details */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#1a237e', fontSize: '18px', marginBottom: '16px' }}>
            Booking Details
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Outbound Flight
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              {outboundFlight}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Return Flight
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              {returnFlight}
            </div>
          </div>

          <div style={{ 
            borderTop: '2px solid #e0e0e0',
            marginTop: '16px',
            paddingTop: '16px'
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Total Paid
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {currency.symbol}{parseFloat(total).toFixed(2)}
            </div>
          </div>

          {txn && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Transaction ID
              </div>
              <div style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace' }}>
                {txn}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => window.location.href = '/'}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            marginBottom: '12px'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Book Another Flight
        </button>

        <p style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
          A confirmation email has been sent to your inbox
        </p>

        <p style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          Powered by 
          <svg width="148" height="29.4" viewBox="0 0 148 29.4" style={{ height: '16px', width: 'auto' }}>
            <g>
              <path fill="#17333b" d="M5.7,5.1v18.9h1.9c6.5,0,10.3-4,10.3-9.4S14.3,5.1,7.3,5.1h-1.9s.3,0,.3,0ZM0,0h8.1C17.8,0,23.5,6.5,23.5,14.6s-6.2,14.6-15.4,14.6H0V0Z"/>
              <polygon fill="#17333b" points="141.6 9.1 137.9 14.6 134.2 9.1 127.5 9.1 134.4 18.9 127.2 29 133.9 29 137.9 23.2 141.1 18.9 148 9.1 141.6 9.1"/>
            </g>
            <polygon fill="#17333b" points="27.2 29 43.7 29 43.7 24.2 32.5 24.2 32.5 0 27.2 0 27.2 29"/>
            <g>
              <polygon fill="#17333b" points="64.7 14.1 74.3 0 72.9 0 67.6 0 66.3 0 60.4 8.8 64.2 14.1 60.4 19.7 66.5 29 67.9 29 73.7 29 74.8 29 64.7 14.1"/>
              <polygon fill="#17333b" points="62.8 14.1 53 0 46.3 0 55.9 14.1 45.8 29 52.7 29 62.8 14.1"/>
            </g>
            <path fill="#17333b" d="M120.4,19c0-3-2.2-5.4-5.1-5.4s-5.4,2.3-5.4,5.4,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4M104.6,19c0-7.1,5.2-10.3,9.7-10.4s5.9,2.4,5.9,2.4v-2h5.5v20h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.4-9.6-10.4"/>
            <path fill="#17333b" d="M89.7,29.1v-9.9h5.1c2.1,0,4-.3,5.6-1.1,1.6-.8,4.5-2.6,4.5-8.5S101.1,0,94.8,0h-10.4v29h0M98.2,13c-.8.8-2.1,1.3-4,1.3h-4.5V4.3h4.3c1.9,0,3.5.5,4.3,1.3s1.3,2.1,1.3,3.7-.5,2.9-1.3,3.7h-.1Z"/>
          </svg>
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
        color: 'white'
      }}>
        Loading...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}