// src/app/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [market, setMarket] = useState('US');
  const [outboundDate, setOutboundDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    if (!outboundDate || !returnDate) {
      alert('Please select both departure and return dates');
      return;
    }

    const params = new URLSearchParams({
      market,
      outboundDate,
      returnDate
    });

    router.push(`/flights?${params.toString()}`);
  };

  return (
    <main style={{
      background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '100%'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <svg width="177" height="32" viewBox="0 0 177 32" style={{ height: '48px', width: 'auto' }}>
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
          <p style={{ color: '#1a237e', marginTop: '12px', fontSize: '16px', fontWeight: '500' }}>
            Airline
          </p>
        </div>

        <h1 style={{ 
          color: '#1a237e', 
          fontSize: '28px', 
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Book Your Flight
        </h1>

        {/* Market Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            color: '#1a237e', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Market
          </label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '16px',
              color: '#1a237e',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="US">United States (USD)</option>
            <option value="IE">Ireland (EUR)</option>
            <option value="GB">United Kingdom (GBP)</option>
            <option value="BR">Brazil (BRL)</option>
            <option value="AE">United Arab Emirates (AED)</option>
          </select>
        </div>

        {/* Departure Date */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            color: '#1a237e', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Departure Date
          </label>
          <input
            type="date"
            value={outboundDate}
            onChange={(e) => setOutboundDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '16px',
              color: '#1a237e',
              backgroundColor: 'white',
              colorScheme: 'light'
            }}
          />
        </div>

        {/* Return Date */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            color: '#1a237e', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={outboundDate || new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '16px',
              color: '#1a237e',
              backgroundColor: 'white',
              colorScheme: 'light'
            }}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
          }}
        >
          Search Flights
        </button>
      </div>

      {/* Footer */}
      <p style={{ 
        color: 'white', 
        marginTop: '40px', 
        opacity: 0.7, 
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        Powered by 
        <svg width="148" height="29.4" viewBox="0 0 148 29.4" style={{ height: '14px', width: 'auto' }}>
          <g>
            <path fill="white" d="M5.7,5.1v18.9h1.9c6.5,0,10.3-4,10.3-9.4S14.3,5.1,7.3,5.1h-1.9s.3,0,.3,0ZM0,0h8.1C17.8,0,23.5,6.5,23.5,14.6s-6.2,14.6-15.4,14.6H0V0Z"/>
            <polygon fill="white" points="141.6 9.1 137.9 14.6 134.2 9.1 127.5 9.1 134.4 18.9 127.2 29 133.9 29 137.9 23.2 141.1 18.9 148 9.1 141.6 9.1"/>
          </g>
          <polygon fill="white" points="27.2 29 43.7 29 43.7 24.2 32.5 24.2 32.5 0 27.2 0 27.2 29"/>
          <g>
            <polygon fill="white" points="64.7 14.1 74.3 0 72.9 0 67.6 0 66.3 0 60.4 8.8 64.2 14.1 60.4 19.7 66.5 29 67.9 29 73.7 29 74.8 29 64.7 14.1"/>
            <polygon fill="white" points="62.8 14.1 53 0 46.3 0 55.9 14.1 45.8 29 52.7 29 62.8 14.1"/>
          </g>
          <path fill="white" d="M120.4,19c0-3-2.2-5.4-5.1-5.4s-5.4,2.3-5.4,5.4,2.3,5.4,5.4,5.4,5.1-2.4,5.1-5.4M104.6,19c0-7.1,5.2-10.3,9.7-10.4s5.9,2.4,5.9,2.4v-2h5.5v20h-5.5v-2.2c-1.3,1.6-3.4,2.6-6,2.6-4.2,0-9.6-3.4-9.6-10.4"/>
          <path fill="white" d="M89.7,29.1v-9.9h5.1c2.1,0,4-.3,5.6-1.1,1.6-.8,4.5-2.6,4.5-8.5S101.1,0,94.8,0h-10.4v29h0M98.2,13c-.8.8-2.1,1.3-4,1.3h-4.5V4.3h4.3c1.9,0,3.5.5,4.3,1.3s1.3,2.1,1.3,3.7-.5,2.9-1.3,3.7h-.1Z"/>
        </svg>
      </p>
    </main>
  );
}