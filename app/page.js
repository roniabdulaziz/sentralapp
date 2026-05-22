'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('dashboard');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('S10');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const saldo = 1873910; 

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#f4f7fa';
  }, []);

  const products = [
    { code: 'S5', name: 'Telkomsel 5.000', price: 6000 },
    { code: 'S10', name: 'Telkomsel 10.000', price: 11000 },
    { code: 'S20', name: 'Telkomsel 20.000', price: 20500 },
  ];

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setMessage('❌ Nomor HP tidak valid!');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const selectedProduct = products.find(p => p.code === product);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/transaksi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          nomor_hp: phone,
          kode_produk: product,
          harga_jual: selectedProduct.price,
          status: 'PENDING'
        })
      });

      if (res.ok) {
        setMessage('✅ Transaksi Sukses Dicatat ke Database!');
        setPhone('');
      } else {
        setMessage('❌ Database menolak transaksi.');
      }
    } catch (error) {
      setMessage('❌ Gagal terhubung ke server database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '80px', boxSizing: 'border-box' }}>
      
      {/* TAMPILAN 1: DASHBOARD UTAMA */}
      {currentView === 'dashboard' && (
        <>
          {/* HEADER BLUE BAR (Padding kiri-kanan 0 supaya elemen di dalamnya bisa menempel ke ujung) */}
          <div style={{ backgroundColor: '#1e90ff', padding: '25px 0px 20px 0px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', color: 'white' }}>
            
            {/* Nama & Notifikasi (Tetap diberi jarak dalam 20px agar teks tidak menempel layar) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 20px' }}>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Selamat Datang,</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Roni Abdul Aziz</div>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>

            {/* KOTAK SALDO PUTIH: SEKARANG MELEBAR PENUH (MENEMPEL KIRI KANAN) */}
            <div style={{ backgroundColor: 'white', color: '#333', padding: '18px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                081936046191
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e90ff' }}>Rp {saldo.toLocaleString('id-ID')}</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}><div style={{ backgroundColor: '#e6f2ff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e90ff" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><div style={{ fontSize: '11px', marginTop: '4px', color: '#1e90ff', fontWeight: '500' }}>Top Up</div></div>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}><div style={{ backgroundColor: '#e6f2ff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e90ff" strokeWidth="2"><polyline points="12 8 12 12 14 14"></polyline><circle cx="12" cy="12" r="10"></circle></svg></div><div style={{ fontSize: '11px', marginTop: '4px', color: '#1e90ff', fontWeight: '500' }}>Mutasi</div></div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#00cc66', marginTop: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                Update Saldo
              </div>
            </div>
          </div>

          {/* BANNER PROMO */}
          <div style={{ padding: '0 15px', marginTop: '15px' }}>
            <div style={{ background: 'linear-gradient(135deg, #00c6ff, #0072ff)', padding: '18px 15px', borderRadius: '14px', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Pulsa & Paket Data Murah</div>
              <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '5px' }}>Transaksi 100% Instan & Aman</div>
            </div>
          </div>

          {/* GRID MENU UTAMA */}
          <div style={{ padding: '0 15px', marginTop: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px 15px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '18px', color: '#333' }}>Isi Ulang & Tagihan</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px 15px', textAlign: 'center' }}>
                
                <div onClick={() => setCurrentView('pulsa')} style={{ cursor: 'pointer' }}>
                  <div style={{ backgroundColor: '#e6f2ff', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e90ff" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '8px', color: '#444', fontWeight: '500' }}>Pulsa</div>
                </div>

                <div style={{ opacity: 0.5 }}><div style={{ backgroundColor: '#f0f5fa', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg></div><div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Paket Data</div></div>
                <div style={{ opacity: 0.5 }}><div style={{ backgroundColor: '#f0f5fa', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect></svg></div><div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>E-wallet</div></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAMPILAN 2: FORM TRANSAKSI PULSA */}
      {currentView === 'pulsa' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }} onClick={() => { setCurrentView('dashboard'); setMessage(''); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <h3 style={{ margin: 0, color: '#333' }}>Isi Pulsa Reguler</h3>
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Nomor HP Pembeli:</label>
                <input type="number" placeholder="0812345xxx" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Pilih Nominal Pulsa:</label>
                <select value={product} onChange={(e) => setProduct(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', backgroundColor: '#fff' }}>
                  {products.map(p => (
                    <option key={p.code} value={p.code}>{p.name} — Rp {p.price.toLocaleString('id-ID')}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
                {loading ? 'Sedang Memproses...' : 'KIRIM PULSA'}
              </button>
            </form>

            {message && (
              <div style={{ marginTop: '15px', padding: '12px', borderRadius: '8px', textAlign: 'center', backgroundColor: message.includes('✅') ? '#e6f4ea' : '#fce8e6', color: message.includes('✅') ? '#137333' : '#c5221f', fontWeight: 'bold', fontSize: '14px' }}>
                {message}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 1000 }}>
        <div onClick={() => { setActiveTab('home'); setCurrentView('dashboard'); }} style={{ textAlign: 'center', color: activeTab === 'home' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Home</div>
        </div>
        <div onClick={() => setActiveTab('pricelist')} style={{ textAlign: 'center', color: activeTab === 'pricelist' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto' }}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line></svg>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Pricelist</div>
        </div>
        <div onClick={() => setActiveTab('history')} style={{ textAlign: 'center', color: activeTab === 'history' ? '#1e90ff' : '#999', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Riwayat</div>
        </div>
      </div>

    </div>
  );
}
