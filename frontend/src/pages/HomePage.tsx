import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import { StatsSection } from '../components/StatsSection/StatsSection';
import { ServicesSection } from '../components/ServicesSection/ServicesSection';
import { GallerySection } from '../components/GallerySection/GallerySection';
import { ProcessSection } from '../components/ProcessSection/ProcessSection';
import { BrandsMarquee } from '../components/BrandsMarquee/BrandsMarquee';
import { TestimonialsSection } from '../components/TestimonialsSection/TestimonialsSection';
import { BookingSection } from '../components/BookingSection/BookingSection';
import './HomePage.css';

export function HomePage() {
  return (
    <main>
      <HeroBanner />
      <StatsSection />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <ProcessSection />
      <BrandsMarquee />
      <TestimonialsSection />
      <BookingSection />
    </main>
  );
}

function AboutSection() {
  return (
    <section className="about section" id="about" aria-label="Về chúng tôi">
      <div className="container">
        <div className="about__grid">
          <div className="about__content reveal reveal-left">
            <h2 className="section-title">
              Chúng Tôi Là <span className="brand-accent">JUOY HAIR</span>
            </h2>
            <p className="about__text">
              JUOY HAIR là địa điểm chăm sóc tóc chuyên nghiệp, tận tâm hàng đầu tại TP.HCM. Với đội ngũ stylist tay nghề cao, được đào tạo bài bản, chúng tôi mang lại những kiểu tóc hiện đại, sáng tạo và cá nhân hóa tối đa cho phong cách của bạn.
            </p>
            <p className="about__text">
              Chúng tôi cam kết sử dụng các sản phẩm chăm sóc tóc cao cấp, ứng dụng công nghệ và kỹ thuật mới nhất giúp tóc giữ nếp, bền màu và luôn bóng khỏe.
            </p>
            <ul className="about__values" role="list">
              {['Màu nhuộm thời thượng', 'Stylist tay nghề đỉnh cao', 'Short reels thực tế', 'Tư vấn kiểu tóc hợp khuôn mặt'].map((v) => (
                <li key={v} className="about__value-item">
                  <span className="about__value-dot" aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="about__visual reveal reveal-right">
            <div className="about__visual-card">
              <img src="/about-bg.png" alt="JUOY HAIR salon exterior" />
            </div>
            <div className="about__badge">
              <span className="about__badge-num">5★</span>
              <span className="about__badge-text">Đánh giá trung bình</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
