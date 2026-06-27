import { useState, useCallback } from 'react';
import type { Appointment } from '../types';
import { fetchMyAppointments, cancelAppointment } from '../api/salon';
import './MyAppointmentsPage.css';

export function MyAppointmentsPage() {
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!/^0\d{9}$/.test(phone)) {
      setError('Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await fetchMyAppointments(phone.trim());
    setLoading(false);
    setSearched(true);
    if (result.kind === 'ok') {
      setAppointments(result.data);
    } else {
      setError(result.message);
      setAppointments([]);
    }
  }, [phone]);

  const handleCancel = useCallback(async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn hủy lịch hẹn này?')) return;
    const result = await cancelAppointment(id);
    if (result.kind === 'ok') {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED' as const } : a))
      );
    } else {
      alert(result.message);
    }
  }, []);

  return (
    <main className="my-appts-page">
      <div className="my-appts-page__hero">
        <div className="container">
          <h1 className="my-appts-page__title">
            Lịch Hẹn <span className="brand-accent">Của Tôi</span>
          </h1>
          <p className="my-appts-page__sub">
            Nhập số điện thoại để xem và quản lý lịch hẹn của bạn tại LN Salon.
          </p>
        </div>
      </div>

      <div className="container my-appts-page__body">
        {/* Search bar */}
        <div className="my-appts-page__search">
          <label htmlFor="ma-phone" className="form-label">Số điện thoại</label>
          <div className="my-appts-page__search-row">
            <input
              id="ma-phone"
              type="tel"
              className="form-input"
              placeholder="0901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              autoComplete="tel"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
          </div>
          {error != null && (
            <p className="my-appts-page__error" role="alert">{error}</p>
          )}
        </div>

        {/* Results */}
        {searched && !loading && (
          appointments.length === 0 ? (
            <div className="my-appts-page__empty">
              <span aria-hidden="true">📅</span>
              <p>Không tìm thấy lịch hẹn nào với số điện thoại này.</p>
            </div>
          ) : (
            <ul className="my-appts-page__list" role="list">
              {appointments.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onCancel={handleCancel}
                />
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
}

function AppointmentCard({ appointment: apt, onCancel }: AppointmentCardProps) {
  const statusLabel: Record<typeof apt.status, string> = {
    BOOKED: 'Đã đặt',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
  };

  const startDate = new Date(apt.startTime);
  const formattedDate = startDate.toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <li className={`apt-card apt-card--${apt.status.toLowerCase()}`}>
      <div className="apt-card__header">
        <div>
          <h3 className="apt-card__service">{apt.service.name}</h3>
          <p className="apt-card__stylist">✂️ {apt.stylist.name}</p>
        </div>
        <span className={`apt-card__status apt-card__status--${apt.status.toLowerCase()}`}>
          {statusLabel[apt.status]}
        </span>
      </div>
      <div className="apt-card__body">
        <p className="apt-card__info">📅 {formattedDate}</p>
        <p className="apt-card__info">🕐 {formattedTime}</p>
        {apt.notes && <p className="apt-card__info apt-card__notes">📝 {apt.notes}</p>}
      </div>
      {apt.status === 'BOOKED' && (
        <div className="apt-card__footer">
          <button
            type="button"
            className="btn btn-ghost apt-card__cancel-btn"
            onClick={() => onCancel(apt.id)}
          >
            Hủy lịch hẹn
          </button>
        </div>
      )}
    </li>
  );
}
