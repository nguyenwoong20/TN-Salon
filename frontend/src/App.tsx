import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import './styles/globals.css';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-appointments" element={<MyAppointmentsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main style={{
      minHeight: '100svh',
      paddingTop: 'var(--nav-height)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <span style={{ fontSize: '4rem' }} aria-hidden="true">✂️</span>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800 }}>404 — Trang không tồn tại</h1>
      <p style={{ color: 'var(--color-ink-muted)' }}>Có vẻ trang bạn tìm không có tại đây.</p>
      <a href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Về trang chủ
      </a>
    </main>
  );
}
