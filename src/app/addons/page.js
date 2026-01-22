// src/app/addons/page.js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

function AddonsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const market = searchParams.get('market') || 'US';
  const outboundDate = searchParams.get('outboundDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const outboundFlight = searchParams.get('outboundFlight') || '';
  const outboundFare = searchParams.get('outboundFare') || '';
  const outboundPrice = parseFloat(searchParams.get('outboundPrice')) || 0;
  const returnFlight = searchParams.get('returnFlight') || '';
  const returnFare = searchParams.get('returnFare') || '';
  const returnPrice = parseFloat(searchParams.get('returnPrice')) || 0;

  const [selectedAddons, setSelectedAddons] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    IE: 0.92, GB: 0.79, US: 1.0, BR: 5.0, AE: 3.67
  };

  // Add-ons catalog
  const addons = {
    meals: [
      { 
        id: 'meal-1', 
        name: 'Chicken & Rice', 
        description: 'Grilled chicken breast with jasmine rice',
        price: Math.round(12 * fareMultipliers[market]),
        icon: '🍗'
      },
      { 
        id: 'meal-2', 
        name: 'Pasta Bolognese', 
        description: 'Classic Italian pasta with meat sauce',
        price: Math.round(12 * fareMultipliers[market]),
        icon: '🍝'
      },
      { 
        id: 'meal-3', 
        name: 'Vegetarian Curry', 
        description: 'Aromatic vegetable curry with rice',
        price: Math.round(10 * fareMultipliers[market]),
        icon: '🍛'
      },
      { 
        id: 'meal-4', 
        name: 'Caesar Salad', 
        description: 'Fresh romaine with parmesan',
        price: Math.round(8 * fareMultipliers[market]),
        icon: '🥗'
      }
    ],
    services: [
      { 
        id: 'priority-boarding', 
        name: 'Priority Boarding', 
        description: 'Board before general passengers',
        price: Math.round(15 * fareMultipliers[market]),
        icon: '🎫'
      },
      { 
        id: 'fast-track', 
        name: 'Fast Track Security', 
        description: 'Skip the security queues',
        price: Math.round(20 * fareMultipliers[market]),
        icon: '⚡'
      }
    ],
    travel: [
      { 
        id: 'car-hire-economy', 
        name: 'Economy Car', 
        description: '3 days with unlimited miles',
        price: Math.round(89 * fareMultipliers[market]),
        icon: '🚗'
      },
      { 
        id: 'car-hire-suv', 
        name: 'SUV Car', 
        description: '3 days with unlimited miles',
        price: Math.round(149 * fareMultipliers[market]),
        icon: '🚙'
      },
      { 
        id: 'hotel-3star', 
        name: '3-Star Hotel', 
        description: '2 nights with breakfast',
        price: Math.round(120 * fareMultipliers[market]),
        icon: '🏨'
      },
      { 
        id: 'hotel-4star', 
        name: '4-Star Hotel', 
        description: '2 nights with breakfast',
        price: Math.round(200 * fareMultipliers[market]),
        icon: '🏩'
      }
    ]
  };

  const toggleAddon = (addonId, price) => {
    setSelectedAddons(prev => {
      const newAddons = { ...prev };
      if (newAddons[addonId]) {
        delete newAddons[addonId];
      } else {
        newAddons[addonId] = price;
      }
      return newAddons;
    });
  };

  const calculateTotal = () => {
    const flightTotal = outboundPrice + returnPrice;
    const addonsTotal = Object.values(selectedAddons).reduce((sum, price) => sum + price, 0);
    return flightTotal + addonsTotal;
  };

  const handleContinue = () => {
    const params = new URLSearchParams({
      market,
      outboundDate,
      returnDate,
      outboundFlight,
      outboundFare,
      outboundPrice,
      returnFlight,
      returnFare,
      returnPrice,
      addons: JSON.stringify(selectedAddons),
      total: calculateTotal()
    });

    window.location.href = `/checkout?${params.toString()}`;
  };

  const renderAddonCard = (addon) => {
    const isSelected = selectedAddons[addon.id] !== undefined;

    return (
      <div
        key={addon.id}
        onClick={() => toggleAddon(addon.id, addon.price)}
        style={{
          padding: '16px',
          border: isSelected ? '3px solid #667eea' : '2px solid #e0e0e0',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: isSelected ? '#f0f4ff' : 'white',
          position: 'relative',
          marginBottom: '12px'
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
        
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>
          {addon.icon}
        </div>
        <h4 style={{ 
          color: '#1a237e', 
          margin: '0 0 6px 0',
          fontSize: '15px',
          fontWeight: 'bold'
        }}>
          {addon.name}
        </h4>
        <p style={{ 
          color: '#666', 
          fontSize: '13px',
          margin: '0 0 10px 0',
          lineHeight: '1.3'
        }}>
          {addon.description}
        </p>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#667eea'
        }}>
          {currency.symbol}{addon.price}
        </div>
      </div>
    );
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <>
      <main style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
        minHeight: '100vh',
        padding: '20px',
        paddingBottom: isMobile ? '120px' : '40px'
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
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
            gap: '32px' 
          }}>
            {/* Main Content */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <h1 style={{ color: '#1a237e', fontSize: '32px', marginBottom: '32px' }}>
                Enhance Your Journey
              </h1>

              {/* Onboard Meals */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ 
                  color: '#1a237e', 
                  fontSize: '24px', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>🍽️</span> Onboard Meals
                </h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  Pre-order your meal and save time onboard
                </p>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '16px'
                }}>
                  {addons.meals.map(addon => renderAddonCard(addon))}
                </div>
              </div>

              {/* Airport Services */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ 
                  color: '#1a237e', 
                  fontSize: '24px', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>✈️</span> Airport Services
                </h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  Make your airport experience seamless
                </p>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '16px'
                }}>
                  {addons.services.map(addon => renderAddonCard(addon))}
                </div>
              </div>

              {/* Travel Extras */}
              <div>
                <h2 style={{ 
                  color: '#1a237e', 
                  fontSize: '24px', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>🚗</span> Car Hire & Hotels
                </h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  Complete your travel arrangements
                </p>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '16px'
                }}>
                  {addons.travel.map(addon => renderAddonCard(addon))}
                </div>
              </div>
            </div>

            {/* Sidebar - Hidden on mobile */}
            {!isMobile && (
              <div>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  position: 'sticky',
                  top: '20px'
                }}>
                  <h3 style={{ 
                    color: '#1a237e', 
                    fontSize: '20px', 
                    marginBottom: '20px',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '12px'
                  }}>
                    Booking Summary
                  </h3>

                  {/* Flight Details */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Outbound Flight
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                      {outboundFlight} • {outboundFare}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {formatDate(outboundDate)}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#667eea', textAlign: 'right' }}>
                      {currency.symbol}{outboundPrice}
                    </div>
                  </div>

                  <div style={{ 
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Return Flight
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                      {returnFlight} • {returnFare}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {formatDate(returnDate)}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#667eea', textAlign: 'right' }}>
                      {currency.symbol}{returnPrice}
                    </div>
                  </div>

                  {/* Add-ons Summary */}
                  {Object.keys(selectedAddons).length > 0 && (
                    <div style={{ 
                      borderTop: '1px solid #f0f0f0',
                      paddingTop: '16px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px', fontWeight: 'bold' }}>
                        Add-ons ({Object.keys(selectedAddons).length})
                      </div>
                      {Object.entries(selectedAddons).map(([id, price]) => {
                        const addon = [...addons.meals, ...addons.services, ...addons.travel]
                          .find(a => a.id === id);
                        return (
                          <div key={id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                            fontSize: '14px'
                          }}>
                            <span style={{ color: '#666' }}>{addon?.name}</span>
                            <span style={{ color: '#333', fontWeight: 'bold' }}>
                              {currency.symbol}{price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Total */}
                  <div style={{ 
                    borderTop: '2px solid #f0f0f0',
                    paddingTop: '16px',
                    marginBottom: '24px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                        Total
                      </span>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                        {currency.symbol}{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
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
                    Continue to Payment
                  </button>

                  <button
                    onClick={handleContinue}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'white',
                      color: '#1a237e',
                      border: '2px solid #1a237e',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Skip Add-ons
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Sticky Buttons - Only show on mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          padding: '16px 20px',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button
              onClick={handleContinue}
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
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                marginBottom: '8px'
              }}
            >
              Continue • {currency.symbol}{calculateTotal()}
            </button>
            <button
              onClick={handleContinue}
              style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                color: '#1a237e',
                border: '2px solid #1a237e',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Skip Add-ons
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function AddonsPage() {
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
        Loading add-ons...
      </div>
    }>
      <AddonsContent />
    </Suspense>
  );
}