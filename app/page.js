'use client';
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('S10');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Daftar produk simulasi (Nanti bisa dihubungkan ke Digiflazz)
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
      
      // Mengirim data langsung ke database Supabase melalui API bawaan
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/transaksi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          nomor_hp: phone,
          kode_produk: product,
          harga_jual: selectedProduct.price,
          status: 'PENDING'
        })
      });

      if (res.ok) {
        setMessage('✅ Transaksi Berhasil Dicatat! Menunggu Proses...');
        setPhone('');
      } else {
        setMessage('❌ Gagal mengirim transaksi ke database.');
      }
    } catch (error) {
      setMessage('❌ Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>⚡ Sentral App ⚡</h2>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>Isi Pulsa Praktis Langsung dari HP</p>
      
      <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nomor HP Tujuan:</label>
          <input 
            type="number" 
            placeholder="08123456xxx" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Pilih Nominal:</label>
          <select 
            value={product} 
            onChange={(e) => setProduct(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            {products.map(p => (
              <option key={p.code} value={p.code}>{p.name} — Rp {p.price.toLocaleString()}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Memproses...' : 'BELI SEKARANG'}
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '15px', padding: '10px', borderRadius: '6px', textAlign: 'center', backgroundColor: message.includes('✅') ? '#e6f4ea' : '#fce8e6', color: message.includes('✅') ? '#137333' : '#c5221f', fontWeight: 'bold', fontSize: '14px' }}>
          {message}
        </div>
      )}
    </div>
  );
}
