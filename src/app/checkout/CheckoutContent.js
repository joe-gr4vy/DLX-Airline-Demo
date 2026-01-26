// src/app/checkout/CheckoutContent.js
'use client';
import { useState, useEffect, useRef } from 'react';

export default function CheckoutContent({ 
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
}) {
  const [Embed, setEmbed] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const embedRef = useRef(null);

  const totalFloat = parseFloat(total) || 0;
  const totalCents = Math.round(totalFloat * 100);

  // Currency mapping
  const currencies = {
    IE: { symbol: '€', code: 'EUR' },
    GB: { symbol: '£', code: 'GBP' },
    US: { symbol: '$', code: 'USD' },
    BR: { symbol: 'R$', code: 'BRL' },
    AE: { symbol: 'د.إ', code: 'AED' }
  };

  // Country code mapping for Gr4vy
  const countryMapping = {
    IE: 'IE',
    GB: 'GB',
    US: 'US',
    BR: 'BR',
    AE: 'AE'
  };

  const currency = currencies[market];
  const countryCode = countryMapping[market];

  // Parse addons
  const selectedAddons = JSON.parse(addons);

  // Fetch token
  useEffect(() => {
    console.log('Fetching token for amount:', totalCents, 'cents, currency:', currency.code, 'country:', countryCode);
    
    fetch(`/api/token?amount=${totalCents}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Token error:', data.error);
          setError(data.error);
        } else {
          console.log('Token received');
          setToken(data.token);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, [totalCents, currency.code, countryCode]);

  // Load SDK
  useEffect(() => {
    if (!token) return;
    
    import('@gr4vy/embed-react').then((mod) => {
      setEmbed(() => mod.default || mod.Embed);
    }).catch(err => setError(err.message));
  }, [token]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div style={{ padding: '40px', background: '#fee', color: '#c00', borderRadius: '8px' }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main style={{
      background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '40px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#1a237e',
          color: 'white',
          padding: '24px 20px',
          textAlign: 'center'
        }}>
          <svg width="177" height="32" viewBox="0 0 177 32" style={{ height: '32px', width: 'auto', marginBottom: '8px' }}>
            <g>
              <path fill="white" d="M12,18.3l.4-.8c0-.2-.2-.7-.2-1.4s0-1.2.2-1.4l-.4-.8-6-7-.8-.4H.7l-.4.4v1.7l6.4,7v.9L.3,23.6v1.8l.4.4h4.5l.8-.4,6-7.1Z"/>
              <path fill="white" d="M13.8,12.2l.8.4c.2,0,.7-.2,1.4-.2s1.2,0,1.4.2l.8-.4,7-6,.4-.7V.9l-.4-.4h-1.8l-7,6.4h-.9L8.5.6h-1.8l-.4.4v4.5l.4.7,7.1,6h0Z"/>
              <path fill="white" d="M31.7,8.7v-1.8l-.4-.4h-4.5l-.8.4-6,7-.4.8c0,.2.2.7.2,1.4s0,1.2-.2,1.4l.4.8,6,7,.8.4h4.5l.4-.4v-1.8l-6.4-7v-.9l6.4-7h0Z"/>
              <path fill="white" d="M18.2,20.1l-.8-.4c-.2,0-.7.2-1.4.2s-1.2,0-1.4-.2l-.8.4-7,6-.4.7v4.5l.4.4h1.8l7-6.4h.9l7,6.4h1.8l.4-.4v-4.5l-.4-.7-7.1-6h0Z"/>
              <path fill="white" d="M45.7,6.8v18.8h2c6.3,0,10.3-4.1,10.3-9.4s-3.4-9.4-10.5-9.4c0,0-1.8,0-1.8,0ZM40.1,1.6h8c9.9,0,15.4,6.3,15.4,14.5s-6.3,14.5-15.2,14.5h-8.2V1.7h0Z"/>
              <path fill="white" d="M81,20.7c0-2.9-2.2-5.3-5.1-5.3s-5.4,2.3-5.4,5.3,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4ZM65.2,20.8c0-7,5.1-10.4,9.6-10.4s6,2.3,6,2.3v-1.9h5.5v19.9h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.3-9.6-10.3h0Z"/>
              <path fill="white" d="M88.7,10.8h3.4v-4.6l5.5-3v7.6h3.8v4.9h-3.8v6.3c0,3.1.4,3.6,3.8,3.6v5.1h-.8c-6.4,0-8.4-2.1-8.4-8.6v-6.4h-3.4v-4.9h0Z"/>
              <path fill="white" d="M118.6,20.7c0-2.9-2.2-5.3-5.1-5.3s-5.4,2.3-5.4,5.3,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4ZM102.9,20.8c0-7,5.1-10.4,9.6-10.4s6,2.3,6,2.3v-1.9h5.5v19.9h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.3-9.6-10.3"/>
              <path fill="white" d="M132.2,1.6h-5.5v29h5.5V1.6Z"/>
              <path fill="white" d="M140,18.1h9.4c-.8-1.9-2.5-2.9-4.6-2.9s-3.9,1.2-4.8,2.9h0ZM134.4,20.7c0-5.7,4.6-10.3,10.4-10.3s10.4,4.7,10.4,10.4v1.7h-15.5c.6,2.3,2.4,3.9,5.1,3.9s3.5-.9,4.2-2.4h5.8c-1.6,4.4-4.9,7-10.1,7s-10.3-4.6-10.3-10.3"/>
              <path fill="white" d="M169.4,10.8l-3.8,5.6-3.9-5.6h-6.7l7.1,9.8-7.4,10.1h6.7l4.1-5.8,4.2,5.8h6.7l-7.5-10.1,6.9-9.8h-6.4Z"/>
            </g>
          </svg>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            Complete Your Booking
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Order Summary - Show first on mobile */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              background: '#f8f9fa',
              border: '2px solid #1a237e',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{ 
                color: '#1a237e', 
                fontSize: '18px', 
                marginBottom: '16px',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '10px'
              }}>
                Order Summary
              </h3>

              {/* Flights */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px', fontWeight: 'bold' }}>
                  Outbound
                </div>
                <div style={{ fontSize: '15px', color: '#333', marginBottom: '3px' }}>
                  {outboundFlight} • {outboundFare}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    {formatDate(outboundDate)}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#667eea' }}>
                    {currency.symbol}{outboundPrice}
                  </span>
                </div>
              </div>

              <div style={{ 
                marginBottom: '12px',
                borderTop: '1px solid #e0e0e0',
                paddingTop: '12px'
              }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px', fontWeight: 'bold' }}>
                  Return
                </div>
                <div style={{ fontSize: '15px', color: '#333', marginBottom: '3px' }}>
                  {returnFlight} • {returnFare}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    {formatDate(returnDate)}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#667eea' }}>
                    {currency.symbol}{returnPrice}
                  </span>
                </div>
              </div>

              {/* Add-ons */}
              {Object.keys(selectedAddons).length > 0 && (
                <div style={{ 
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>
                    Add-ons
                  </div>
                  {Object.entries(selectedAddons).map(([id, price]) => (
                    <div key={id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '13px'
                    }}>
                      <span style={{ color: '#666' }}>{id}</span>
                      <span style={{ color: '#333', fontWeight: 'bold' }}>
                        {currency.symbol}{price}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div style={{ 
                borderTop: '2px solid #1a237e',
                paddingTop: '12px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>
                    Total
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                    {currency.symbol}{totalFloat.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h2 style={{ color: '#1a237e', marginBottom: '16px', fontSize: '20px' }}>
              Payment Details
            </h2>

            {!token || !Embed ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                Loading payment options...
              </div>
            ) : (
              <form id="dlx-payment-form" style={{ minHeight: '400px' }}>
                <Embed
                  ref={embedRef}
                  gr4vyId="partners"
                  environment="sandbox"
                  token={token}
                  amount={totalCents}
                  currency={currency.code}
                  country={countryCode}
                  form="dlx-payment-form"
                  onEvent={(name, data) => {
                    console.log(`EVENT [${name}]:`, data);
                  }}
                  onComplete={(transaction) => {
                    console.log('Transaction:', transaction);
                    const params = new URLSearchParams({
                      market,
                      outboundFlight,
                      returnFlight,
                      total: totalFloat.toFixed(2),
                      txn: transaction.id
                    });
                    window.location.href = `/success?${params.toString()}`;
                    return false;
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error);
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}