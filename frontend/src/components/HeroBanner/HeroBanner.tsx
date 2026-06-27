import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

interface Slide {
  readonly id: string;
  readonly headline: string;
  readonly accent: string;
  readonly sub: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly image?: string;
  readonly video?: string; // Optional background video
  readonly tag: string;
}

const SLIDES: ReadonlyArray<Slide> = [
  {
    id: 'slide-1',
    video: '/videos/reel-6.mp4', // Real video background
    tag: 'Không Gian & Phong Cách',
    headline: 'JUOY HAIR\nChúng Mình Phục Vụ',
    accent: 'Theo Lịch Hẹn',
    sub: 'Đừng quên đặt lịch trước khi đến để được phục vụ tốt nhất và nhận ngay tư vấn kiểu tóc miễn phí.',
    ctaLabel: 'Đặt Lịch Ngay',
    ctaHref: '/booking',
  },
  {
    id: 'slide-2',
    video: '/videos/reel-3.mp4', // Real video background
    tag: 'Mẫu Tóc Đẹp',
    headline: 'Phong Cách Của Bạn,\nĐỉnh Cao Từng',
    accent: 'Chi Tiết',
    sub: 'Biến hóa phong cách tóc với những xu hướng thời thượng nhất, cá nhân hóa cho từng khuôn mặt.',
    ctaLabel: 'Khám Phá Dịch Vụ',
    ctaHref: '/#services',
  },
  {
    id: 'slide-3',
    video: '/videos/reel-4.mp4', // Real video background
    tag: 'Xu Hướng Mới',
    headline: 'Màu Sắc Rực Rỡ,\nTự Tin Tỏa',
    accent: 'Sáng',
    sub: 'Chúng mình sử dụng các dòng sản phẩm cao cấp hàng đầu để bảo vệ và chăm sóc tóc bóng mượt lâu dài.',
    ctaLabel: 'Xem Các Mẫu Tóc',
    ctaHref: '/#gallery',
  },
];

const INTERVAL_MS = 8000; // Give more time for video slides to play

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState<'entering' | 'visible' | 'exiting'>('visible');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const goTo = useCallback((index: number) => {
    setAnimState('exiting');
    setTimeout(() => {
      setCurrent(index);
      setAnimState('entering');
      setTimeout(() => setAnimState('visible'), 50);
    }, 350);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(timerRef.current);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="hero" aria-label="Banner chính" id="home">
      {/* Background media layers */}
      <div className="hero__images">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`hero__img-layer${i === current ? ' is-active' : ''}`}
            aria-hidden="true"
          >
            {s.video != null ? (
              <video
                src={s.video}
                className="hero__img"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img src={s.image} alt="" className="hero__img" />
            )}
          </div>
        ))}
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={`hero__content container hero__content--${animState}`}>
        <p className="hero__tag">
          <span className="hero__tag-dot" aria-hidden="true" />
          {slide.tag}
        </p>

        <h1 className="hero__headline">
          <span className="hero__headline-main">{slide.headline} </span>
          <span className="hero__headline-accent">{slide.accent}</span>
        </h1>

        <p className="hero__sub">{slide.sub}</p>

        <div className="hero__actions">
          {slide.ctaHref.startsWith('/') && !slide.ctaHref.includes('#') ? (
            <Link to={slide.ctaHref} className="btn btn-primary hero__btn-primary">
              {slide.ctaLabel}
              <ArrowIcon />
            </Link>
          ) : (
            <a href={slide.ctaHref} className="btn btn-primary hero__btn-primary">
              {slide.ctaLabel}
              <ArrowIcon />
            </a>
          )}
          <Link to="/my-appointments" className="btn hero__btn-ghost">
            Lịch Của Tôi
          </Link>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          {[
            { num: '1,200+', label: 'Khách hài lòng' },
            { num: '10+', label: 'Stylist chuyên nghiệp' },
            { num: '5★', label: 'Đánh giá trung bình' },
          ].map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-num">{s.num}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="hero__dots" role="tablist" aria-label="Điều hướng banner">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`hero__dot${i === current ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hero__progress" aria-hidden="true">
        <div key={current} className="hero__progress-bar" style={{ animationDuration: `${INTERVAL_MS}ms` }} />
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll-cue" aria-hidden="true">
        <div className="hero__scroll-icon"><span /></div>
        <span className="hero__scroll-label">Cuộn xuống</span>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true">
      <path d="M2.278 1.908L13.157 2.343L13.592 13.222M12.432 3.068L1.843 13.657"
        stroke="currentColor" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
}
