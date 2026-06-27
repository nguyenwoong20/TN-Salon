import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: ReadonlyArray<{ label: string; href: string }>;
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Đặt Lịch', href: '/booking' },
  {
    label: 'Dịch Vụ',
    href: '#services',
    children: [
      { label: 'Cắt & Tạo Kiểu', href: '/#services' },
      { label: 'Nhuộm & Highlight', href: '/#services' },
      { label: 'Chăm Sóc Tóc', href: '/#services' },
      { label: 'Combo Trọn Gói', href: '/#services' },
    ],
  },
  { label: 'Lịch Của Tôi', href: '/my-appointments' },
];

const BRAND_NAME = 'JUOY HAIR';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label={`${BRAND_NAME} - Trang chủ`}>
          <img
            src="/salon-logo.jpg"
            alt="JUOY HAIR logo"
            className="navbar__logo-img"
            width={42}
            height={42}
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-juoy">JUOY</span>
            <span className="navbar__logo-hair">HAIR</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Menu chính">
          <ul className="navbar__list" role="list">
            {NAV_ITEMS.map((item) => (
              <NavItemComponent
                key={item.label}
                item={item}
                currentPath={pathname}
              />
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/booking" className="btn btn-primary navbar__cta">
            ✂ Đặt Lịch Ngay
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${mobileOpen ? ' is-open' : ''}`}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${mobileOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Menu di động">
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('/') ? (
                  <Link
                    to={item.href}
                    className={`navbar__mobile-link${pathname === item.href ? ' is-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="navbar__mobile-link">
                    {item.label}
                  </a>
                )}
                {item.children != null && (
                  <ul className="navbar__mobile-sub" role="list">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} className="navbar__mobile-sub-link">
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Sub-component: individual nav item ──────────────────────────────────────

interface NavItemProps {
  item: NavItem;
  currentPath: string;
}

function NavItemComponent({ item, currentPath }: NavItemProps) {
  const isActive = item.href === currentPath;
  const hasChildren = item.children != null && item.children.length > 0;

  return (
    <li className={`navbar__item${hasChildren ? ' has-dropdown' : ''}`}>
      {item.href.startsWith('/') && !hasChildren ? (
        <Link
          to={item.href}
          className={`navbar__link${isActive ? ' is-active' : ''}`}
        >
          {item.label}
        </Link>
      ) : hasChildren ? (
        <>
          <button className="navbar__link navbar__dropdown-trigger" type="button">
            {item.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ul className="navbar__dropdown" role="list">
            {item.children!.map((child) => (
              <li key={child.label}>
                <a href={child.href} className="navbar__dropdown-link">
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <a href={item.href} className="navbar__link">
          {item.label}
        </a>
      )}
    </li>
  );
}
