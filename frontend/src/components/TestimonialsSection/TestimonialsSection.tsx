import { useState, useCallback } from 'react';
import './TestimonialsSection.css';

interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly rating: number;
  readonly text: string;
  readonly avatar: string;
  readonly verified: boolean;
}

const REVIEWS: ReadonlyArray<Testimonial> = [
  {
    id: 'rev-1',
    name: 'Nguyễn Minh Huy',
    date: '1 tuần trước',
    rating: 5,
    text: 'Stylist Hoàng Anh cắt tóc cực kỳ tỉ mỉ và tư vấn nhiệt tình. Kiểu Comma Hair cắt xong ai cũng khen hợp khuôn mặt. Không gian tiệm sáng sủa, sạch sẽ, nước uống free chu đáo.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Trần Thị Thanh Vy',
    date: '2 tuần trước',
    rating: 5,
    text: 'Lần đầu tiên mình nhuộm màu xám khói mà tóc vẫn bóng mượt không bị khô xơ nhờ có liệu trình hấp collagen phục hồi. Kỹ thuật tẩy tóc của tiệm rất chuyên nghiệp, không hề rát da đầu.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Lê Hoàng Nam',
    date: '3 tuần trước',
    rating: 5,
    text: 'Cực kỳ ưng ý với kiểu Pixie cut cá tính ở đây! Dịch vụ gội đầu massage bấm huyệt thảo dược siêu thư giãn, làm xong bao nhiêu mệt mỏi đều tan biến hết. Sẽ quay lại thường xuyên.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Phạm Đức Duy',
    date: '1 tháng trước',
    rating: 5,
    text: 'Tiệm phục vụ chuẩn chỉ theo lịch đặt trước, không phải chờ đợi lâu. Kỹ thuật của thợ rất đều tay, sấy uốn tạo nếp tự nhiên. Địa điểm ngay trung tâm Quận 10 rất tiện di chuyển.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&fit=crop&q=80',
    verified: true,
  },
];

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % REVIEWS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  }, []);

  // Display 3 visible cards in carousel loop
  const visibleReviews = [
    REVIEWS[startIndex],
    REVIEWS[(startIndex + 1) % REVIEWS.length],
    REVIEWS[(startIndex + 2) % REVIEWS.length],
  ];

  return (
    <section className="testimonials section" id="testimonials" aria-label="Đánh giá từ khách hàng">
      <div className="container">
        
        {/* Top Header Row with Google Rating & Navigation */}
        <div className="testimonials__header-row">
          <div className="testimonials__title-block">
            <span className="testimonials__tagline">Đánh Giá Khách Hài Lòng</span>
            <h2 className="section-title">
              Khách Hàng Nói Gì <span className="brand-accent">Về Chúng Tôi</span>
            </h2>
          </div>

          {/* Google aggregate score badge */}
          <div className="testimonials__google-badge">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Maps_icon_%282020%29.svg" 
              alt="Google Maps Logo" 
              className="testimonials__google-logo"
              width={24}
              height={24}
            />
            <div className="testimonials__google-info">
              <span className="testimonials__google-score">4.9 / 5.0 ★</span>
              <span className="testimonials__google-count">(120+ Đánh giá Google)</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Slider */}
        <div className="testimonials__slider">
          <ul className="testimonials__grid" role="list">
            {visibleReviews.map((rev) => (
              <li key={rev.id} className="testimonials__card-item">
                <div className="testimonials__card">
                  
                  {/* Rating Stars & Date */}
                  <div className="testimonials__card-header">
                    <div className="testimonials__stars" aria-label={`${rev.rating} sao`}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i} className="testimonials__star">★</span>
                      ))}
                    </div>
                    <span className="testimonials__date">{rev.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="testimonials__text">“{rev.text}”</p>

                  {/* User Profile */}
                  <div className="testimonials__user">
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      className="testimonials__user-avatar"
                      loading="lazy"
                    />
                    <div className="testimonials__user-info">
                      <span className="testimonials__user-name">{rev.name}</span>
                      {rev.verified && (
                        <span className="testimonials__user-status">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Khách đã làm tóc
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions Row */}
        <div className="testimonials__actions">
          <a 
            href="https://www.google.com/maps/place/JUOY+HAIR/@10.7725844,106.6691564,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f000dd880d7:0xf161c452c9aad1c1!8m2!3d10.7725844!4d106.6717313!16s%2Fg%2F11x0mswdtk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline testimonials__btn-link"
          >
            Viết Đánh Giá Của Bạn trên Google Maps ✍️
          </a>

          {/* Navigation Arrows */}
          <div className="testimonials__nav">
            <button 
              type="button" 
              className="testimonials__arrow" 
              onClick={handlePrev}
              aria-label="Đánh giá trước"
            >
              ←
            </button>
            <button 
              type="button" 
              className="testimonials__arrow" 
              onClick={handleNext}
              aria-label="Đánh giá tiếp theo"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
