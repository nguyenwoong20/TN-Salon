import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './ServicesSection.css';

interface ServiceCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly features: ReadonlyArray<string>;
  readonly featured?: boolean;
}

const SERVICES: ReadonlyArray<ServiceCard> = [
  {
    id: 'cut-style',
    title: 'Cắt & Tạo Kiểu',
    description: 'Từ những kiểu tóc cổ điển đến xu hướng hiện đại nhất, stylist của chúng tôi sẽ tạo nên phong cách hoàn hảo cho bạn.',
    features: ['Cắt tóc nam / nữ', 'Combo 7 bước', 'Tạo kiểu chuyên nghiệp', 'Tư vấn kiểu tóc miễn phí'],
  },
  {
    id: 'color',
    title: 'Nhuộm & Highlight',
    description: 'Kỹ thuật nhuộm màu hiện đại với sản phẩm cao cấp, an toàn cho tóc và mang lại màu sắc rực rỡ, lâu phai.',
    features: ['Nhuộm toàn bộ', 'Highlight / Balayage', 'Tẩy & nhuộm chuyên nghiệp', 'Phủ bóng, dưỡng màu'],
    featured: true,
  },
  {
    id: 'care',
    title: 'Chăm Sóc Tóc',
    description: 'Phục hồi tóc hư tổn, bổ sung dưỡng chất và tăng cường độ bóng mượt với các liệu trình chăm sóc chuyên sâu.',
    features: ['Hấp dầu phục hồi', 'Keratin trị thẳng', 'Gội đầu dưỡng sinh', 'Massage đầu thư giãn'],
  },
  {
    id: 'combo',
    title: 'Combo Trọn Gói',
    description: 'Trải nghiệm toàn diện với các gói dịch vụ kết hợp, tiết kiệm chi phí và tiết kiệm thời gian cho bạn.',
    features: ['Combo cắt + gội + sấy', 'Combo nhuộm + phục hồi', 'VIP full day treatment', 'Ưu đãi khách hàng thân thiết'],
  },
];

export function ServicesSection() {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3 });

  return (
    <section className="services section" id="services" aria-label="Dịch vụ của chúng tôi">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header centered reveal${headerInView ? '' : ' hidden'}`}
        >
          <h2 className="section-title">
            Dịch Vụ <span className="brand-accent">Của Chúng Tôi</span>
          </h2>
          <p className="section-sub">
            Chúng tôi cung cấp đầy đủ các dịch vụ làm tóc chuyên nghiệp, từ cắt tạo kiểu đến chăm sóc phục hồi tóc hư tổn.
          </p>
        </div>

        {/* Cards grid */}
        <ul className="services__grid" role="list">
          {SERVICES.map((svc, i) => (
            <ServiceCardItem key={svc.id} service={svc} index={i} />
          ))}
        </ul>

        {/* CTA */}
        <div className="services__cta reveal">
          <Link to="/booking" className="btn btn-primary services__cta-btn">
            Đặt Lịch Trải Nghiệm Ngay
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardItemProps {
  service: ServiceCard;
  index: number;
}

function ServiceCardItem({ service, index }: ServiceCardItemProps) {
  const { ref, inView } = useInView({ threshold: 0.2, once: true });
  const delay = index * 120;

  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      className={`services__card${service.featured ? ' services__card--featured' : ''}${inView ? '' : ' services__card--hidden'}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      <div className="services__card-icon" aria-hidden="true">
        <ServiceCardIcon id={service.id} />
      </div>
      <h3 className="services__card-title">{service.title}</h3>
      <p className="services__card-desc">{service.description}</p>
      <ul className="services__card-features" role="list">
        {service.features.map((f) => (
          <li key={f} className="services__card-feature">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>
      <Link to="/booking" className="services__card-link">
        Đặt lịch dịch vụ này →
      </Link>
    </li>
  );
}

// ─── Sub-components: Custom SVG Icons ─────────────────────────────────────────

function ServiceCardIcon({ id }: { id: string }) {
  switch (id) {
    case 'cut-style':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case 'color':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'care':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
          <path d="M12 12a3 3 0 0 0-3 3" />
        </svg>
      );
    case 'combo':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    default:
      return null;
  }
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
