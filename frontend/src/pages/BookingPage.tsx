import { BookingForm } from '../components/BookingForm/BookingForm';
import './BookingPage.css';

export function BookingPage() {
  return (
    <main className="booking-page">
      <div className="booking-page__hero">
        <div className="container">
          <h1 className="booking-page__title">
            Đặt Lịch <span className="brand-accent">Tại LN Salon</span>
          </h1>
          <p className="booking-page__sub">
            Chọn stylist, dịch vụ và thời gian phù hợp — chúng tôi sẽ sẵn sàng chào đón bạn!
          </p>
        </div>
      </div>

      <div className="container booking-page__body">
        <div className="booking-page__card">
          <BookingForm />
        </div>
        <aside className="booking-page__info">
          <InfoCard
            icon="🕐"
            title="Giờ Mở Cửa"
            lines={['Thứ 2 – Thứ 6: 8:00 – 20:00', 'Thứ 7 – Chủ nhật: 8:00 – 21:00']}
          />
          <InfoCard
            icon="📍"
            title="Địa Chỉ"
            lines={['123 Đường Nguyễn Huệ', 'Quận 1, TP. Hồ Chí Minh']}
          />
          <InfoCard
            icon="📞"
            title="Liên Hệ"
            lines={['0901 234 567', 'info@lnsalon.vn']}
          />
          <InfoCard
            icon="💡"
            title="Lưu Ý"
            lines={[
              'Đặt trước 30 phút để được phục vụ tốt nhất.',
              'Hủy lịch vui lòng báo trước ít nhất 2 tiếng.',
            ]}
          />
        </aside>
      </div>
    </main>
  );
}

interface InfoCardProps {
  icon: string;
  title: string;
  lines: string[];
}

function InfoCard({ icon, title, lines }: InfoCardProps) {
  return (
    <div className="booking-page__info-card">
      <span className="booking-page__info-icon" aria-hidden="true">{icon}</span>
      <div>
        <h3 className="booking-page__info-title">{title}</h3>
        {lines.map((line) => (
          <p key={line} className="booking-page__info-line">{line}</p>
        ))}
      </div>
    </div>
  );
}
