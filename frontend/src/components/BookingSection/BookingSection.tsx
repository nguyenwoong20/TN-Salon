import { Link } from 'react-router-dom';
import { BookingForm } from '../BookingForm/BookingForm';
import './BookingSection.css';

export function BookingSection() {
  return (
    <section className="booking-section section" id="booking" aria-label="Đặt lịch nhanh">
      <div className="booking-section__bg" aria-hidden="true" />
      <div className="container booking-section__inner">
        <div className="booking-section__header reveal">
          <h2 className="section-title">
            Đặt Lịch <span className="brand-accent">Ngay Hôm Nay</span>
          </h2>
          <p className="section-sub">
            Chọn thời gian, stylist và dịch vụ phù hợp — xác nhận ngay trong vài bước đơn giản.
          </p>
          <Link to="/booking" className="btn btn-outline booking-section__full-link">
            Mở trang đặt lịch đầy đủ →
          </Link>
        </div>

        <div className="booking-section__form-wrapper reveal-right">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
