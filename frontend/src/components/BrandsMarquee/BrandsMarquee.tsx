import './BrandsMarquee.css';

interface Brand {
  readonly id: string;
  readonly name: string;
  readonly origin: string;
  readonly style: React.CSSProperties;
}

const BRANDS: ReadonlyArray<Brand> = [
  { id: 'b-1', name: "L'ORÉAL", origin: 'Professionnel Paris', style: { letterSpacing: '0.25em', fontWeight: 800 } },
  { id: 'b-2', name: 'davines', origin: 'Italia Care', style: { fontFamily: 'serif', letterSpacing: '0.05em', fontStyle: 'italic', fontWeight: 500 } },
  { id: 'b-3', name: 'GOLDWELL.', origin: 'Germany Professional', style: { letterSpacing: '0.1em', fontWeight: 900 } },
  { id: 'b-4', name: 'TIGI', origin: 'Bed Head USA', style: { letterSpacing: '0.15em', fontWeight: 900 } },
  { id: 'b-5', name: 'MOROCCANOIL', origin: 'Treatment oil', style: { letterSpacing: '0.08em', fontWeight: 700 } },
  { id: 'b-6', name: 'OLAPLEX', origin: 'Bond Multiplier', style: { letterSpacing: '0.2em', fontWeight: 400 } },
  { id: 'b-7', name: 'KEVIN.MURPHY', origin: 'Australia Care', style: { letterSpacing: '0.05em', fontWeight: 600 } },
  { id: 'b-8', name: 'Schwarzkopf', origin: 'Professional', style: { fontFamily: 'cursive', letterSpacing: '0.02em', fontWeight: 700 } },
];

export function BrandsMarquee() {
  // Duplicate list to create seamless infinite loop effect
  const doubleBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="marquee-section" aria-label="Thương hiệu liên kết">
      <div className="marquee-section__title container">
        <p className="marquee-section__sub">Thương hiệu cao cấp sử dụng tại salon</p>
      </div>

      <div className="marquee" role="marquee">
        <div className="marquee__track">
          {doubleBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="marquee__item">
              <div className="marquee__brand-logo" style={brand.style}>
                {brand.name}
              </div>
              <span className="marquee__brand-origin">{brand.origin}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
