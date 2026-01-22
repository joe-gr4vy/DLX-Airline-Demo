// src/app/flights/page.js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

function FlightsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const market = searchParams.get('market') || 'US';
  const outboundDate = searchParams.get('outboundDate') || '';
  const returnDate = searchParams.get('returnDate') || '';

  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedOutboundFare, setSelectedOutboundFare] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedReturnFare, setSelectedReturnFare] = useState(null);

  // Currency mapping
  const currencies = {
    IE: { symbol: '€', code: 'EUR' },
    GB: { symbol: '£', code: 'GBP' },
    US: { symbol: '$', code: 'USD' },
    BR: { symbol: 'R$', code: 'BRL' },
    AE: { symbol: 'د.إ', code: 'AED' }
  };

  const currency = currencies[market];

  // Price multipliers for different markets
  const fareMultipliers = {
    IE: 0.92,
    GB: 0.79,
    US: 1.0,
    BR: 5.0,
    AE: 3.67
  };

  const multiplier = fareMultipliers[market];

  // Fare families with market-adjusted prices
  const fareFamily = {
    basic: {
      name: 'Basic',
      price: Math.round(199 * multiplier),
      baggage: '1 Carry-on',
      seat: 'Random',
      changes: 'Not Allowed'
    },
    standard: {
      name: 'Standard',
      price: Math.round(279 * multiplier),
      baggage: '1 Carry-on + 1 Checked',
      seat: 'Standard Selection',
      changes: 'Fee Applies'
    },
    flex: {
      name: 'Flex',
      price: Math.round(399 * multiplier),
      baggage: '2 Carry-on + 2 Checked',
      seat: 'Premium Selection',
      changes: 'Free Changes'
    }
  };

  const flights = [
    { id: 'DLX101', departure: '08:00', arrival: '11:30', duration: '3h 30m' },
    { id: 'DLX102', departure: '12:00', arrival: '15:30', duration: '3h 30m' },
    { id: 'DLX103', departure: '16:00', arrival: '19:30', duration: '3h 30m' },
    { id: 'DLX104', departure: '20:00', arrival: '23:30', duration: '3h 30m' }
  ];

  const handleContinue = () => {
    if (!selectedOutbound || !selectedOutboundFare || !selectedReturn || !selectedReturnFare) {
      alert('Please select both outbound and return flights with fare families');
      return;
    }

    const params = new URLSearchParams({
      market,
      outboundDate,
      returnDate,
      outboundFlight: selectedOutbound,
      outboundFare: selectedOutboundFare,
      outboundPrice: fareFamily[selectedOutboundFare].price,
      returnFlight: selectedReturn,
      returnFare: selectedReturnFare,
      returnPrice: fareFamily[selectedReturnFare].price
    });

    router.push(`/addons?${params.toString()}`);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const renderFlightSelection = (flight, isSelected, onSelect) => {
    return (
      <div
        key={flight.id}
        onClick={() => onSelect(flight.id)}
        style={{
          padding: '16px 20px',
          background: isSelected ? '#f0f4ff' : 'white',
          border: isSelected ? '2px solid #667eea' : '1px solid #e0e0e0',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e', marginBottom: '4px' }}>
            {flight.id}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {flight.departure} - {flight.arrival} ({flight.duration})
          </div>
        </div>
        {isSelected && (
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#667eea',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
        )}
      </div>
    );
  };

  const renderFareCard = (fareKey, isSelected, onSelect) => {
    const fare = fareFamily[fareKey];
    return (
      <div
        key={fareKey}
        onClick={() => onSelect(fareKey)}
        style={{
          flex: 1,
          padding: '20px',
          background: isSelected ? '#f0f4ff' : 'white',
          border: isSelected ? '3px solid #667eea' : '2px solid #e0e0e0',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          minWidth: '200px'
        }}
      >
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#667eea',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
        )}
        
        <h4 style={{ 
          color: '#1a237e', 
          fontSize: '20px', 
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          {fare.name}
        </h4>
        <div style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#667eea',
          marginBottom: '16px'
        }}>
          {currency.symbol}{fare.price}
        </div>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Baggage:</strong> {fare.baggage}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Seat:</strong> {fare.seat}
          </div>
          <div>
            <strong>Changes:</strong> {fare.changes}
          </div>
        </div>
      </div>
    );
  };

  const renderCollapsedSelection = (label, flightId, fareType, onEdit) => {
    const flight = flights.find(f => f.id === flightId);
    const fare = fareFamily[fareType];
    
    return (
      <div style={{
        background: '#f0f4ff',
        border: '2px solid #667eea',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#667eea', fontWeight: 'bold', marginBottom: '8px' }}>
              {label} ✓
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e', marginBottom: '4px' }}>
              {flight.id} • {fare.name}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {flight.departure} - {flight.arrival} • {currency.symbol}{fare.price}
            </div>
          </div>
          <button
            onClick={onEdit}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '2px solid #667eea',
              borderRadius: '6px',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Change
          </button>
        </div>
      </div>
    );
  };

  return (
    <main style={{
      background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
      minHeight: '100vh',
      padding: '20px',
      paddingBottom: '120px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <svg width="177" height="32" viewBox="0 0 177 32" style={{ height: '32px', width: 'auto' }}>
                <g>
                  <path fill="#17333b" d="M12,18.3l.4-.8c0-.2-.2-.7-.2-1.4s0-1.2.2-1.4l-.4-.8-6-7-.8-.4H.7l-.4.4v1.7l6.4,7v.9L.3,23.6v1.8l.4.4h4.5l.8-.4,6-7.1Z"/>
                  <path fill="#17333b" d="M13.8,12.2l.8.4c.2,0,.7-.2,1.4-.2s1.2,0,1.4.2l.8-.4,7-6,.4-.7V.9l-.4-.4h-1.8l-7,6.4h-.9L8.5.6h-1.8l-.4.4v4.5l.4.7,7.1,6h0Z"/>
                  <path fill="#17333b" d="M31.7,8.7v-1.8l-.4-.4h-4.5l-.8.4-6,7-.4.8c0,.2.2.7.2,1.4s0,1.2-.2,1.4l.4.8,6,7,.8.4h4.5l.4-.4v-1.8l-6.4-7v-.9l6.4-7h0Z"/>
                  <path fill="#17333b" d="M18.2,20.1l-.8-.4c-.2,0-.7.2-1.4.2s-1.2,0-1.4-.2l-.8.4-7,6-.4.7v4.5l.4.4h1.8l7-6.4h.9l7,6.4h1.8l.4-.4v-4.5l-.4-.7-7.1-6h0Z"/>
                  <path fill="#17333b" d="M45.7,6.8v18.8h2c6.3,0,10.3-4.1,10.3-9.4s-3.4-9.4-10.5-9.4c0,0-1.8,0-1.8,0ZM40.1,1.6h8c9.9,0,15.4,6.3,15.4,14.5s-6.3,14.5-15.2,14.5h-8.2V1.7h0Z"/>
                  <path fill="#17333b" d="M81,20.7c0-2.9-2.2-5.3-5.1-5.3s-5.4,2.3-5.4,5.3,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4ZM65.2,20.8c0-7,5.1-10.4,9.6-10.4s6,2.3,6,2.3v-1.9h5.5v19.9h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.3-9.6-10.3h0Z"/>
                  <path fill="#17333b" d="M88.7,10.8h3.4v-4.6l5.5-3v7.6h3.8v4.9h-3.8v6.3c0,3.1.4,3.6,3.8,3.6v5.1h-.8c-6.4,0-8.4-2.1-8.4-8.6v-6.4h-3.4v-4.9h0Z"/>
                  <path fill="#17333b" d="M118.6,20.7c0-2.9-2.2-5.3-5.1-5.3s-5.4,2.3-5.4,5.3,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4ZM102.9,20.8c0-7,5.1-10.4,9.6-10.4s6,2.3,6,2.3v-1.9h5.5v19.9h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.3-9.6-10.3"/>
                  <path fill="#17333b" d="M132.2,1.6h-5.5v29h5.5V1.6Z"/>
                  <path fill="#17333b" d="M140,18.1h9.4c-.8-1.9-2.5-2.9-4.6-2.9s-3.9,1.2-4.8,2.9h0ZM134.4,20.7c0-5.7,4.6-10.3,10.4-10.3s10.4,4.7,10.4,10.4v1.7h-15.5c.6,2.3,2.4,3.9,5.1,3.9s3.5-.9,4.2-2.4h5.8c-1.6,4.4-4.9,7-10.1,7s-10.3-4.6-10.3-10.3"/>
                  <path fill="#17333b" d="M169.4,10.8l-3.8,5.6-3.9-5.6h-6.7l7.1,9.8-7.4,10.1h6.7l4.1-5.8,4.2,5.8h6.7l-7.5-10.1,6.9-9.8h-6.4Z"/>
                </g>
              </svg>
            </div>
            <button
              onClick={() => router.back()}
              style={{
                padding: '10px 20px',
                background: 'white',
                border: '2px solid #1a237e',
                borderRadius: '8px',
                color: '#1a237e',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{ color: '#1a237e', fontSize: '32px', marginBottom: '32px', textAlign: 'center' }}>
            Select Your Flights
          </h1>

          {/* Outbound Flight Section */}
          {!selectedOutbound || !selectedOutboundFare ? (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#1a237e', fontSize: '24px', marginBottom: '16px' }}>
                Outbound Flight - {formatDate(outboundDate)}
              </h2>

              {!selectedOutbound ? (
                <div>
                  <p style={{ color: '#666', marginBottom: '16px' }}>Choose your departure flight:</p>
                  {flights.map(flight => renderFlightSelection(
                    flight,
                    selectedOutbound === flight.id,
                    setSelectedOutbound
                  ))}
                </div>
              ) : (
                <div>
                  <p style={{ color: '#666', marginBottom: '16px' }}>Choose your fare:</p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}>
                    {Object.keys(fareFamily).map(fareKey => 
                      renderFareCard(
                        fareKey,
                        selectedOutboundFare === fareKey,
                        setSelectedOutboundFare
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            renderCollapsedSelection(
              'Outbound Flight',
              selectedOutbound,
              selectedOutboundFare,
              () => {
                setSelectedOutbound(null);
                setSelectedOutboundFare(null);
              }
            )
          )}

          {/* Return Flight Section */}
          {selectedOutbound && selectedOutboundFare && (
            <>
              {!selectedReturn || !selectedReturnFare ? (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ color: '#1a237e', fontSize: '24px', marginBottom: '16px' }}>
                    Return Flight - {formatDate(returnDate)}
                  </h2>

                  {!selectedReturn ? (
                    <div>
                      <p style={{ color: '#666', marginBottom: '16px' }}>Choose your return flight:</p>
                      {flights.map(flight => renderFlightSelection(
                        flight,
                        selectedReturn === flight.id,
                        setSelectedReturn
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p style={{ color: '#666', marginBottom: '16px' }}>Choose your fare:</p>
                      <div style={{ 
                        display: 'flex', 
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}>
                        {Object.keys(fareFamily).map(fareKey => 
                          renderFareCard(
                            fareKey,
                            selectedReturnFare === fareKey,
                            setSelectedReturnFare
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                renderCollapsedSelection(
                  'Return Flight',
                  selectedReturn,
                  selectedReturnFare,
                  () => {
                    setSelectedReturn(null);
                    setSelectedReturnFare(null);
                  }
                )
              )}
            </>
          )}

          {/* Continue Button */}
          {selectedOutbound && selectedOutboundFare && selectedReturn && selectedReturnFare && (
            <button
              onClick={handleContinue}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                marginTop: '24px'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Continue to Add-ons →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function FlightsPage() {
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
        Loading flights...
      </div>
    }>
      <FlightsContent />
    </Suspense>
  );
}