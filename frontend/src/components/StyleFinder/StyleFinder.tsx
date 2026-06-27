import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './StyleFinder.css';

type Step = 1 | 2 | 3 | 'result';

interface StyleRecommendation {
  readonly name: string;
  readonly image: string;
  readonly reason: string;
  readonly tips: string;
}

export function StyleFinder() {
  const [step, setStep] = useState<Step>(1);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);
  const [hairType, setHairType] = useState<string | null>(null);

  const handleReset = useCallback(() => {
    setFaceShape(null);
    setVibe(null);
    setHairType(null);
    setStep(1);
  }, []);

  // Rules based recommendation engine
  const recommendation = useMemo((): StyleRecommendation => {
    if (faceShape === 'round') {
      if (vibe === 'gentleman') {
        return {
          name: 'Comma Hair Hàn Quốc',
          image: '/images/fb-model-1.jpg',
          reason: 'Mái tóc chia 7/3 uốn dấu phẩy giúp trán trông cao hơn, tạo hiệu ứng khuôn mặt dài ra và thanh tú hơn.',
          tips: 'Nên sấy phồng chân tóc mái để tạo nếp rõ ràng hơn.',
        };
      }
      return {
        name: 'Textured Crop Gọn Gàng',
        image: '/images/fb-model-6.jpg',
        reason: 'Phần tóc hai bên cắt ngắn gọn gàng giúp thu hẹp chiều rộng khuôn mặt tròn, tạo nét nam tính.',
        tips: 'Dùng một chút sáp tạo nếp đan xen ở đỉnh đầu để tạo cấu trúc tóc.',
      };
    }

    if (faceShape === 'long') {
      if (vibe === 'modern') {
        return {
          name: 'Modern Mullet Platinum Silver',
          image: '/images/fb-model-2.jpg',
          reason: 'Phần đuôi tóc gáy dài giúp cân bằng tỷ lệ chiều dài khuôn mặt, màu tẩy khói cá tính tôn da sáng.',
          tips: 'Sấy nhẹ phần gáy ôm vào cổ và sấy phồng nhẹ hai bên mai.',
        };
      }
      return {
        name: 'Two-Block Side Part Lãng Tử',
        image: '/images/fb-model-5.jpg',
        reason: 'Kiểu tóc chia ngôi giúp chia cắt chiều dài khuôn mặt, phần mai cắt gọn vừa phải che khuyết điểm trán cao.',
        tips: 'Vuốt keo giữ nếp mềm để tóc có độ rủ tự nhiên.',
      };
    }

    // Default or Square jaw
    if (vibe === 'clean') {
      return {
        name: 'Short Quiff / Textured Crop',
        image: '/images/fb-model-10.jpg',
        reason: 'Phần quai hàm góc cạnh vuông vức của bạn sẽ được tôn lên hoàn hảo nhờ kiểu tóc ngắn vuốt dựng mạnh mẽ.',
        tips: 'Sấy tóc ngược lên và khóa nếp bằng gôm xịt giữ nếp cứng.',
      };
    }

    return {
      name: 'Layer Layer Texture Nâu Khói',
      image: '/images/fb-model-12.jpg',
      reason: 'Kiểu tỉa layer đan xen làm mềm mại các đường nét góc cạnh ở quai hàm, mang lại phong thái trẻ trung.',
      tips: 'Nên dùng dầu dưỡng trước khi sấy để các lọn layer vào nếp bóng mượt.',
    };
  }, [faceShape, vibe]);

  return (
    <section className="style-finder section" id="style-finder" aria-label="Bộ gợi ý kiểu tóc">
      <div className="container">
        
        {/* Header */}
        <div className="section-header centered">
          <span className="style-finder__tag">Tính Năng Độc Quyền</span>
          <h2 className="section-title">
            Gợi Ý Kiểu Tóc <span className="brand-accent">Hợp Khuôn Mặt</span>
          </h2>
          <p className="section-sub">
            Chỉ với 3 câu hỏi nhanh, hệ thống AI của JUOY HAIR sẽ gợi ý kiểu tóc tối ưu nhất dành riêng cho khuôn mặt và chất tóc của bạn.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="style-finder__card">
          
          {/* Progress Indicators */}
          {step !== 'result' && (
            <div className="style-finder__progress">
              <span className={`style-finder__progress-dot${step >= 1 ? ' is-active' : ''}`} />
              <span className={`style-finder__progress-line${step >= 2 ? ' is-active' : ''}`} />
              <span className={`style-finder__progress-dot${step >= 2 ? ' is-active' : ''}`} />
              <span className={`style-finder__progress-line${step >= 3 ? ' is-active' : ''}`} />
              <span className={`style-finder__progress-dot${step >= 3 ? ' is-active' : ''}`} />
            </div>
          )}

          {/* Step 1: Face Shape */}
          {step === 1 && (
            <div className="style-finder__step">
              <h3 className="style-finder__question">1. Dáng khuôn mặt của bạn như thế nào?</h3>
              <div className="style-finder__options">
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setFaceShape('round'); setStep(2); }}
                >
                  <span className="style-finder__option-icon">⚪</span>
                  <span className="style-finder__option-title">Mặt tròn trịa</span>
                  <span className="style-finder__option-desc">Trán và cằm ngắn, má đầy đặn</span>
                </button>
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setFaceShape('long'); setStep(2); }}
                >
                  <span className="style-finder__option-icon">🥚</span>
                  <span className="style-finder__option-title">Mặt thuôn dài</span>
                  <span className="style-finder__option-desc">Trán cao, mặt dài, cằm hơi nhọn</span>
                </button>
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setFaceShape('square'); setStep(2); }}
                >
                  <span className="style-finder__option-icon">🔲</span>
                  <span className="style-finder__option-title">Mặt góc cạnh / vuông</span>
                  <span className="style-finder__option-desc">Xương quai hàm sắc nét, nam tính</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preferred Vibe */}
          {step === 2 && (
            <div className="style-finder__step">
              <h3 className="style-finder__question">2. Bạn muốn hướng tới phong cách nào?</h3>
              <div className="style-finder__options">
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setVibe('gentleman'); setStep(3); }}
                >
                  <span className="style-finder__option-icon">🤵</span>
                  <span className="style-finder__option-title">Thư sinh, Lịch lãm</span>
                  <span className="style-finder__option-desc">Comma hair, uốn nhẹ Hàn Quốc</span>
                </button>
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setVibe('modern'); setStep(3); }}
                >
                  <span className="style-finder__option-icon">⚡</span>
                  <span className="style-finder__option-title">Cá tính, Nổi loạn</span>
                  <span className="style-finder__option-desc">Mullet, nhuộm tẩy màu khói</span>
                </button>
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setVibe('clean'); setStep(3); }}
                >
                  <span className="style-finder__option-icon">💇‍♂️</span>
                  <span className="style-finder__option-title">Gọn gàng, Nam tính</span>
                  <span className="style-finder__option-desc">Cắt quiff ngắn, crop gọn gàng</span>
                </button>
              </div>
              <button type="button" className="btn btn-ghost style-finder__back-btn" onClick={() => setStep(1)}>
                ← Quay lại bước trước
              </button>
            </div>
          )}

          {/* Step 3: Hair Texture */}
          {step === 3 && (
            <div className="style-finder__step">
              <h3 className="style-finder__question">3. Chất tóc hiện tại của bạn?</h3>
              <div className="style-finder__options">
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setHairType('soft'); setStep('result'); }}
                >
                  <span className="style-finder__option-icon">🍃</span>
                  <span className="style-finder__option-title">Tóc tơ, mềm mỏng</span>
                  <span className="style-finder__option-desc">Tóc mỏng, dễ xẹp, cần uốn phồng</span>
                </button>
                <button
                  type="button"
                  className="style-finder__option-btn"
                  onClick={() => { setHairType('coarse'); setStep('result'); }}
                >
                  <span className="style-finder__option-icon">🪵</span>
                  <span className="style-finder__option-title">Tóc dày, cứng</span>
                  <span className="style-finder__option-desc">Tóc dày rễ tre, chỉa mai, cần ép side</span>
                </button>
              </div>
              <button type="button" className="btn btn-ghost style-finder__back-btn" onClick={() => setStep(2)}>
                ← Quay lại bước trước
              </button>
            </div>
          )}

          {/* Results Screen */}
          {step === 'result' && (
            <div className="style-finder__result animate-pop-in">
              <div className="style-finder__result-grid">
                
                <div className="style-finder__result-media">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="style-finder__result-img"
                  />
                </div>

                <div className="style-finder__result-info">
                  <span className="style-finder__result-badge">Gợi ý tốt nhất cho bạn</span>
                  <h3 className="style-finder__result-title">{recommendation.name}</h3>
                  
                  <div className="style-finder__result-section">
                    <h4>💡 Lý do đề xuất:</h4>
                    <p>{recommendation.reason}</p>
                  </div>

                  <div className="style-finder__result-section">
                    <h4>⚡ Mẹo tạo kiểu tại nhà:</h4>
                    <p>{recommendation.tips}</p>
                  </div>

                  <div className="style-finder__result-actions">
                    <Link to="/booking" className="btn btn-primary">
                      ✂ Đặt Lịch Làm Kiểu Này Ngay
                    </Link>
                    <button type="button" className="btn btn-outline" onClick={handleReset}>
                      🔄 Chọn lại khuôn mặt
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
