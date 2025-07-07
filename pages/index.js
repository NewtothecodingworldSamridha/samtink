
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://www.scorebat.com/video-api/v3/')
      .then(res => res.json())
      .then(data => setArticles(data.response.slice(0, 6)))
      .catch(err => console.error('Error loading news:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/xayrnnoe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      alert('Error sending message.');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ff69b4, #8a2be2)', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <Head>
        <title>Samtink</title>
        <meta name='description' content='Samtink Sports News & Help' />
      </Head>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src='/logo.png' alt='Samtink Logo' style={{ height: '80px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Samtink</h1>
        <p>Your Daily Dose of Sports & Help</p>
      </header>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {articles.length > 0 ? articles.map((article, idx) => (
          <div key={idx} style={{ background: '#fff', color: '#000', borderRadius: '1rem', padding: '1rem' }}>
            <h2>{article.title || 'Sports Highlight'}</h2>
            <video controls style={{ width: '100%' }}>
              <source src={article.videos?.[0]?.embed || ''} type='video/mp4' />
            </video>
          </div>
        )) : <p>Loading news...</p>}
      </section>
      <section style={{ background: '#fff', color: '#000', borderRadius: '1rem', padding: '1.5rem', marginTop: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
        <h2>Contact Us</h2>
        {submitted ? <p style={{ color: 'green' }}>Thanks for reaching out!</p> : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required />
            <input type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} required />
            <textarea name='message' placeholder='Message' value={form.message} onChange={handleChange} required />
            <button type='submit' style={{ backgroundColor: '#ff69b4', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>Send</button>
          </form>
        )}
      </section>
      <footer style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>
        © 2025 Samtink.com — All rights reserved.
      </footer>
    </div>
  );
}
