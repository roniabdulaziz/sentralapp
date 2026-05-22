'use client';
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // Simulasi data saldo (Nanti bisa diambil dari database Supabase)
  const saldo = 1873910; 

  const menus = [
    { icon: '📱', label: 'Pulsa' },
    { icon: '🌐', label: 'Paket Data' },
    { icon: '💳', label: 'E-wallet' },
    { icon: '⚡', label: 'Token PLN' },
    { icon: '🎮', label: 'Game' },
    { icon: '📅', label: 'Masa Aktif' },
    { icon: '📞', label: 'Paket Telp' },
    { icon: '📺', label: 'TV Berbayar' },
    { icon: '🧾', label: 'Tagihan' },
  ];

  return (
    <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '80px' }}>
      
      {/* HEADER BLUE BAR */}
      <div style={{ backgroundColor: '#1e90ff', padding: '20px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Selamat Datang,</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Roni Abdul Aziz</div>
          </div>
          <div style={{ fontSize: '20px' }}>🔔</div>
        </div>

        {/* SALDO CARD */}
        <div style={{ backgroundColor: 'white', color: '#333', padding: '15px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
            💳 081936046191
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e90ff' }}>
              Rp {saldo.toLocaleString('id-ID')}
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', backgroundColor: '#e6f2ff', padding: '8px', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContents: 'center', margin: '0 auto' }}>➕</div>
                <div style={{ fontSize: '11px', marginTop: '4px', color: '#1e90ff', fontWeight: '500' }}>Top Up</div>
              </div>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', backgroundColor: '#e6f2ff', padding: '8px', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContents: 'center', margin: '0 auto' }}>🕒</div>
                <div style={{ fontSize: '11px', marginTop: '4px', color: '#1e90ff', fontWeight: '500' }}>Mutasi</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#00cc66', marginTop: '8px', cursor: 'pointer' }}>🔄 Update Saldo</div>
        </div>
      </div>

      {/* BANNER PROMO */}
      <div style={{ padding: '0 15px', marginTop: '15px' }}>
        <div style={{ background: 'linear-gradient(135deg, #00c6ff, #0072ff)', padding: '15px', borderRadius: '12px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', maxWidth: '60%' }}>Pulsa, Paket Data, Token Listrik Murah?</div>
          <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '5px' }}>Transaksi di SENTRAL 100% Aman & Cepat</div>
          <div style={{ position: 'absolute', right: '10px', bottom: '5px', fontSize: '60px', opacity: 0.2 }}>⚡</div>
        </div>
      </div>

      {/* GRID MENU UTAMA */}
      <div style={{ padding: '0 15px', marginTop: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px 15px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Isi Ulang & Tagihan</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
            {menus.map((m, index) => (
              <div key={index} style={{ cursor: 'pointer' }} onClick={() => m.label === 'Pulsa' && alert('Fitur transaksi pulsa sedang dihubungkan!')}>
                <div style={{ fontSize: '24px', backgroundColor: '#f0f5fa', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContents: 'center', margin: '0 auto', transition: 'all 0.2s' }}>
                  <span style={{margin:'auto'}}>{m.icon}</span>
                </div>
                <div style={{ fontSize: '12px', marginTop: '8px', color: '#444' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROMO KHUSUS */}
      <div style={{ padding: '0 15px', marginTop: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', color: '#555', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          🔥 Cek! Promo Khusus Nomor Tertentu
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 1000 }}>
        <div onClick={() => setActiveTab('home')} style={{ textAlign: 'center', color: activeTab === 'home' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px' }}>🏠</div>
          <div style={{ fontSize: '10px', marginTop: '2px' }}>Home</div>
        </div>
        <div onClick={() => setActiveTab('pricelist')} style={{ textAlign: 'center', color: activeTab === 'pricelist' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px' }}>📋</div>
          <div style={{ fontSize: '10px', marginTop: '2px' }}>Pricelist</div>
        </div>
        <div onClick={() => setActiveTab('history')} style={{ textAlign: 'center', color: activeTab === 'history' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px' }}>🧾</div>
          <div style={{ fontSize: '10px', marginTop: '2px' }}>Riwayat</div>
        </div>
        <div onClick={() => setActiveTab('account')} style={{ textAlign: 'center', color: activeTab === 'account' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px' }}>👤</div>
          <div style={{ fontSize: '10px', marginTop: '2px' }}>Akun</div>
        </div>
      </div>

    </div>
  );
}
