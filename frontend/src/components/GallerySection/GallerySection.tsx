import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './GallerySection.css';

interface GalleryPhoto {
  readonly id: string;
  readonly src: string;
  readonly title: string;
  readonly category: string;
}

interface GalleryVideo {
  readonly id: string;
  readonly src: string;
  readonly title: string;
  readonly description: string;
}

// 24 model images from Facebook downloads
const PHOTO_ITEMS: ReadonlyArray<GalleryPhoto> = Array.from({ length: 24 }, (_, i) => ({
  id: `photo-${i + 1}`,
  src: `/images/fb-model-${i + 1}.jpg`,
  title: `Mẫu Tóc ${i + 1}`,
  category: i % 2 === 0 ? 'Tạo kiểu' : 'Nhuộm màu',
}));

// 6 real Reels videos from downloads
const VIDEO_ITEMS: ReadonlyArray<GalleryVideo> = [
  {
    id: 'vid-1',
    src: '/videos/reel-3.mp4',
    title: 'Juoy Hair X Pixie cho anh trai Sĩ Vương',
    description: '#tocdep #juoyhair #haircut',
  },
  {
    id: 'vid-2',
    src: '/videos/reel-4.mp4',
    title: 'Layer Ngắn X Nâu Khói cực ngầu',
    description: '#layertexture #tocdep #haircut #juoyhair',
  },
  {
    id: 'vid-3',
    src: '/videos/reel-5.mp4',
    title: 'Pixie Cut chất lừ cho anh em tham khảo',
    description: '#juoyhair #pixie #barbershop',
  },
  {
    id: 'vid-4',
    src: '/videos/reel-6.mp4',
    title: 'Tổng hợp những kiểu tóc hot nhất 2026',
    description: '#tocdep #juoyhair #reels',
  },
  {
    id: 'vid-5',
    src: '/videos/reel-2.mp4',
    title: 'Hoàng Trung X Juoy Hair',
    description: 'Trải nghiệm dịch vụ chu đáo chuẩn chỉ tại salon.',
  },
  {
    id: 'vid-6',
    src: '/videos/reel-1.mp4',
    title: 'Do nhu cầu mở rộng, Juoy Hair tuyển dụng',
    description: 'Gia nhập đội ngũ stylist đẳng cấp của chúng mình nhé!',
  },
];

const PHOTOS_PER_PAGE = 8;

export function GallerySection() {
  const [activeTab, setActiveTab] = useState<'photos' | 'reels'>('photos');
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(PHOTOS_PER_PAGE);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.15 });

  const loadMorePhotos = useCallback(() => {
    setVisiblePhotosCount((prev) => Math.min(prev + PHOTOS_PER_PAGE, PHOTO_ITEMS.length));
  }, []);

  const openVideo = useCallback((url: string) => {
    setSelectedVideo(url);
  }, []);

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <section className="gallery section" id="gallery" aria-label="Thư viện hình ảnh và reels">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header centered reveal${headerInView ? '' : ' hidden'}`}
        >
          <h2 className="section-title">
            Bộ Sưu Tập <span className="brand-accent">Mẫu & Reels</span>
          </h2>
          <p className="section-sub">
            Xem ngay các tác phẩm tóc thực tế và các video ngắn (Short Reels) biến hình cực chất được thực hiện bởi JUOY HAIR.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="gallery__tabs">
          <button
            type="button"
            className={`gallery__tab-btn${activeTab === 'photos' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            📸 Mẫu Tóc Hot ({PHOTO_ITEMS.length})
          </button>
          <button
            type="button"
            className={`gallery__tab-btn${activeTab === 'reels' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            🎥 Short Reels ({VIDEO_ITEMS.length})
          </button>
        </div>

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="gallery__photos-pane">
            <ul className="gallery__photos-grid" role="list">
              {PHOTO_ITEMS.slice(0, visiblePhotosCount).map((photo) => (
                <li key={photo.id} className="gallery__photo-card">
                  <div className="gallery__photo-wrapper">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="gallery__photo-img"
                      loading="lazy"
                    />
                    <div className="gallery__photo-overlay">
                      <span className="gallery__photo-category">{photo.category}</span>
                      <h3 className="gallery__photo-title">{photo.title}</h3>
                      <Link to="/booking" className="btn btn-primary btn-sm gallery__photo-btn">
                        Đặt lịch kiểu này
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {visiblePhotosCount < PHOTO_ITEMS.length && (
              <div className="gallery__actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={loadMorePhotos}
                >
                  Xem thêm hình ảnh
                </button>
              </div>
            )}
          </div>
        )}

        {/* Reels Tab */}
        {activeTab === 'reels' && (
          <div className="gallery__reels-pane">
            <ul className="gallery__reels-grid" role="list">
              {VIDEO_ITEMS.map((video) => (
                <li key={video.id} className="gallery__reel-card">
                  <ReelCardItem video={video} onOpenVideo={openVideo} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {selectedVideo != null && (
        <div className="gallery__modal" role="dialog" aria-modal="true" onClick={closeVideo}>
          <div className="gallery__modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery__modal-close"
              onClick={closeVideo}
              aria-label="Đóng video"
            >
              ×
            </button>
            <video
              src={selectedVideo}
              className="gallery__modal-video"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Sub-component: ReelCardItem with hover play behavior ─────────────────────

interface ReelCardItemProps {
  video: GalleryVideo;
  onOpenVideo: (url: string) => void;
}

function ReelCardItem({ video, onOpenVideo }: ReelCardItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current != null) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current != null) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="gallery__reel-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenVideo(video.src)}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="gallery__reel-preview"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="gallery__reel-overlay">
        <div className="gallery__reel-play-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="gallery__reel-info">
          <h3 className="gallery__reel-title">{video.title}</h3>
          <p className="gallery__reel-desc">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
