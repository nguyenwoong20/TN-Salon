import { useRef } from 'react';
import { useInView, useCountUp } from '../../hooks/useInView';
import './StatsSection.css';

interface Stat {
  readonly id: string;
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly description: string;
}

const STATS: ReadonlyArray<Stat> = [
  { id: 'clients', value: 1200, suffix: '+', label: 'Khách Hài Lòng', description: 'Khách hàng đã tin tưởng chúng tôi' },
  { id: 'founded', value: 2019, suffix: '', label: 'Năm Thành Lập', description: 'Hơn 5 năm kinh nghiệm phục vụ' },
  { id: 'projects', value: 5000, suffix: '+', label: 'Lần Phục Vụ', description: 'Dịch vụ hoàn thành xuất sắc' },
  { id: 'stylists', value: 12, suffix: '+', label: 'Stylist Chuyên Nghiệp', description: 'Đội ngũ được đào tạo bài bản' },
];

export function StatsSection() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2, once: true });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="stats section"
      aria-label="Thống kê"
    >
      <div className="container">
        <ul className="stats__grid stagger-children" role="list">
          {STATS.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} shouldCount={inView} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface StatItemProps {
  stat: Stat;
  shouldCount: boolean;
  index: number;
}

function StatItem({ stat, shouldCount }: StatItemProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const count = useCountUp(stat.value, 2000, shouldCount);

  return (
    <li className="stats__item">
      <div className="stats__glow" aria-hidden="true" />
      <div ref={displayRef} className="stats__value" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
        <span aria-hidden="true">{count.toLocaleString('vi-VN')}{stat.suffix}</span>
      </div>
      <div className="stats__label">{stat.label}</div>
      <div className="stats__desc">{stat.description}</div>
    </li>
  );
}
