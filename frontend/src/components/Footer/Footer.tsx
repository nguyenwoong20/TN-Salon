import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact" aria-label="Footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="JUOY HAIR - Trang chủ">
            <img src="/salon-logo.jpg" alt="JUOY HAIR" className="footer__logo-img" width={48} height={48} />
            <div className="footer__logo-text">
              <span className="footer__logo-juoy">JUOY</span>
              <span className="footer__logo-hair">HAIR</span>
            </div>
          </Link>
          <p className="footer__tagline">
            JUOY HAIR — Salon tóc chuyên nghiệp tại TP.HCM. Nơi phong cách của bạn được nâng tầm mỗi ngày.
          </p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/people/JUOY-HAIR/61573336061916/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/juoyhair/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@juoyhair" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer__social-link">
              <TikTokIcon />
            </a>
          </div>
        </div>

        <nav className="footer__links" aria-label="Điều hướng footer">
          <div className="footer__col">
            <h3 className="footer__col-title">Dịch Vụ</h3>
            <ul role="list">
              <li><a href="/#services">Cắt & Tạo Kiểu</a></li>
              <li><a href="/#services">Nhuộm & Highlight</a></li>
              <li><a href="/#services">Chăm Sóc Tóc</a></li>
              <li><a href="/#services">Combo Trọn Gói</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Liên Kết</h3>
            <ul role="list">
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/booking">Đặt Lịch</Link></li>
              <li><Link to="/my-appointments">Lịch Của Tôi</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Liên Hệ</h3>
            <address className="footer__address">
              <p>📍 123 Đường Nguyễn Huệ, Q.1, TP.HCM</p>
              <p>📞 <a href="tel:+84901234567">0901 234 567</a></p>
              <p>✉️ <a href="mailto:info@juoyhair.vn">info@juoyhair.vn</a></p>
              <p>🕐 Thứ 2 – Chủ nhật: 8:00 – 20:00</p>
            </address>
          </div>
        </nav>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          © {year} JUOY HAIR. Tất cả quyền được bảo lưu.
        </p>
        <p className="footer__made">
          Crafted with ❤️ in Việt Nam
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.56V6.78a4.85 4.85 0 0 1-1.06-.09z"/>
    </svg>
  );
}
