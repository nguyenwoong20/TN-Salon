import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import './ProcessSection.css';

interface ProcessStep {
  readonly id: string;
  readonly stepNum: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
}

const PROCESS_STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: 'step-1',
    stepNum: '01',
    title: 'Đón Tiếp & Tư Vấn',
    description: 'Chúng mình lắng nghe ý kiến và phân tích kỹ khuôn mặt để tư vấn kiểu tóc & màu nhuộm thời thượng nhất.',
    image: '/images/fb-model-3.jpg',
  },
  {
    id: 'step-2',
    stepNum: '02',
    title: 'Gội Đầu Thư Giãn',
    description: 'Trải nghiệm gội đầu dưỡng sinh, massage bấm huyệt da đầu nhẹ nhàng loại bỏ bụi bẩn và mệt mỏi.',
    image: '/images/fb-model-4.jpg',
  },
  {
    id: 'step-3',
    stepNum: '03',
    title: 'Cắt & Tạo Kiểu Kỹ Thuật Cao',
    description: 'Stylist chuyên nghiệp trực tiếp cắt tỉa tỉ mỉ, tinh tế mang lại form tóc sắc nét chuẩn chỉ nhất.',
    image: '/images/fb-model-5.jpg',
  },
  {
    id: 'step-4',
    stepNum: '04',
    title: 'Uốn/Nhuộm Dưỡng Chất',
    description: 'Sử dụng các dòng thuốc cao cấp kết hợp hấp collagen phục hồi tóc hư tổn, bảo vệ màu nhuộm lâu phai.',
    image: '/images/fb-model-6.jpg',
  },
  {
    id: 'step-5',
    stepNum: '05',
    title: 'Sấy Tạo Kiểu & Hoàn Thiện',
    description: 'Sấy phồng tạo kiểu, vuốt sáp/dầu dưỡng tóc và chia sẻ cách sấy tạo nếp tóc đơn giản tại nhà.',
    image: '/images/fb-model-7.jpg',
  },
];

export function ProcessSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2 });

  return (
    <section className="process section" id="process" aria-label="Quy trình phục vụ">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header centered reveal${headerInView ? '' : ' hidden'}`}
        >
          <h2 className="section-title">
            Quy Trình <span className="brand-accent">Phục Vụ Chuẩn 5★</span>
          </h2>
          <p className="section-sub">
            Trải nghiệm dịch vụ chu đáo, chuyên nghiệp từng bước một mang lại sự hài lòng tối đa tại JUOY HAIR.
          </p>
        </div>

        {/* Expandable Accordion Grid */}
        <div className="process__accordion">
          {PROCESS_STEPS.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isActive = isHovered || (!isAnyHovered && index === 2); // Default center active if none hovered

            return (
              <div
                key={step.id}
                className={`process__card${isActive ? ' is-active' : ''}${isAnyHovered && !isHovered ? ' is-dimmed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="process__image-wrapper">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="process__image"
                  />
                  <div className="process__overlay" />
                </div>

                <div className="process__content">
                  <span className="process__step-num">{step.stepNum}</span>
                  <div className="process__text-block">
                    <h3 className="process__step-title">{step.title}</h3>
                    <p className="process__step-desc">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
