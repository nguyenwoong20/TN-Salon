import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Stylist, SalonService } from '../../types';
import { fetchStylists, fetchServices, createAppointment } from '../../api/salon';
import './BookingForm.css';

type Step = 1 | 2 | 3 | 4;

interface FormState {
  customerName: string;
  customerPhone: string;
  stylistId: number | null;
  serviceId: number | null;
  date: string;
  time: string;
  notes: string;
}

const INITIAL_FORM: FormState = {
  customerName: '',
  customerPhone: '',
  stylistId: null,
  serviceId: null,
  date: '',
  time: '',
  notes: '',
};

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

export function BookingForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch data with AbortController cleanup (react-hooks skill)
  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const load = async () => {
      const [stylistRes, serviceRes] = await Promise.all([fetchStylists(), fetchServices()]);
      if (!mounted) return;
      if (stylistRes.kind === 'err' || serviceRes.kind === 'err') {
        setFetchError('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối backend.');
        return;
      }
      setStylists(stylistRes.data);
      setServices(serviceRes.data);
    };

    load();
    return () => { mounted = false; controller.abort(); };
  }, []);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectedStylist = useMemo(
    () => stylists.find((s) => s.id === form.stylistId) ?? null,
    [stylists, form.stylistId]
  );
  const selectedService = useMemo(
    () => services.find((s) => s.id === form.serviceId) ?? null,
    [services, form.serviceId]
  );

  const minDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
  }, []);

  const canGoNext = useMemo((): boolean => {
    switch (step) {
      case 1: return form.customerName.trim().length >= 2 && /^0\d{9}$/.test(form.customerPhone);
      case 2: return form.stylistId !== null && form.serviceId !== null;
      case 3: return form.date !== '' && form.time !== '';
      case 4: return true;
    }
  }, [step, form]);

  const handleSubmit = useCallback(async () => {
    if (form.stylistId == null || form.serviceId == null) return;
    setLoading(true);
    setSubmitError(null);

    const startTime = `${form.date}T${form.time}`;
    const result = await createAppointment({
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      stylistId: form.stylistId,
      serviceId: form.serviceId,
      startTime,
      notes: form.notes.trim() || undefined,
    });

    setLoading(false);
    if (result.kind === 'ok') {
      setSuccess(true);
      setForm(INITIAL_FORM);
      setStep(1);
    } else {
      setSubmitError(result.message);
    }
  }, [form]);

  if (success) {
    return <SuccessScreen onReset={() => setSuccess(false)} />;
  }

  return (
    <div className="booking-form">
      {/* Steps indicator */}
      <StepIndicator current={step} />

      {fetchError != null && (
        <div className="booking-form__alert booking-form__alert--error" role="alert">
          ⚠️ {fetchError}
        </div>
      )}

      {/* Step panels */}
      <div className="booking-form__panel">
        {step === 1 && (
          <Step1 form={form} update={update} />
        )}
        {step === 2 && (
          <Step2
            form={form}
            stylists={stylists}
            services={services}
            update={update}
          />
        )}
        {step === 3 && (
          <Step3 form={form} minDate={minDate} update={update} />
        )}
        {step === 4 && (
          <Step4
            form={form}
            stylist={selectedStylist}
            service={selectedService}
            error={submitError}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="booking-form__nav">
        {step > 1 && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setStep((s) => (s - 1) as Step)}
          >
            ← Quay lại
          </button>
        )}
        <div style={{ flex: 1 }} />
        {step < 4 ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canGoNext}
            onClick={() => setStep((s) => (s + 1) as Step)}
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={loading || !canGoNext}
            onClick={handleSubmit}
          >
            {loading ? 'Đang xử lý...' : '✓ Xác Nhận Đặt Lịch'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps = ['Thông tin', 'Dịch vụ', 'Thời gian', 'Xác nhận'];
  return (
    <ol className="booking-form__steps" aria-label="Các bước đặt lịch">
      {steps.map((label, i) => {
        const n = (i + 1) as Step;
        const status = n < current ? 'done' : n === current ? 'active' : 'pending';
        return (
          <li key={label} className={`booking-form__step booking-form__step--${status}`} aria-current={status === 'active' ? 'step' : undefined}>
            <span className="booking-form__step-num">
              {status === 'done' ? '✓' : n}
            </span>
            <span className="booking-form__step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

interface FormUpdater {
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}

function Step1({ form, update }: { form: FormState } & FormUpdater) {
  return (
    <fieldset className="booking-form__fieldset">
      <legend className="booking-form__legend">Thông tin khách hàng</legend>
      <div className="booking-form__row">
        <div className="form-group">
          <label htmlFor="bf-name" className="form-label">Họ và tên *</label>
          <input
            id="bf-name"
            type="text"
            className="form-input"
            placeholder="Nguyễn Văn A"
            value={form.customerName}
            onChange={(e) => update('customerName', e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bf-phone" className="form-label">Số điện thoại *</label>
          <input
            id="bf-phone"
            type="tel"
            className="form-input"
            placeholder="0901234567"
            value={form.customerPhone}
            onChange={(e) => update('customerPhone', e.target.value)}
            autoComplete="tel"
            required
          />
          {form.customerPhone.length > 0 && !/^0\d{9}$/.test(form.customerPhone) && (
            <span className="booking-form__field-error">SĐT phải có 10 số và bắt đầu bằng 0</span>
          )}
        </div>
      </div>
    </fieldset>
  );
}

interface Step2Props extends FormUpdater {
  form: FormState;
  stylists: Stylist[];
  services: SalonService[];
}

function Step2({ form, stylists, services, update }: Step2Props) {
  return (
    <fieldset className="booking-form__fieldset">
      <legend className="booking-form__legend">Chọn stylist & dịch vụ</legend>

      <div className="form-group">
        <label className="form-label">Chọn stylist *</label>
        <div className="booking-form__stylist-grid">
          {stylists.length === 0 && <p className="booking-form__empty">Đang tải...</p>}
          {stylists.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`booking-form__stylist-card${form.stylistId === s.id ? ' is-selected' : ''}${s.status === 'BUSY' ? ' is-busy' : ''}`}
              onClick={() => update('stylistId', s.id)}
              disabled={s.status === 'BUSY'}
              aria-pressed={form.stylistId === s.id}
            >
              <div className="booking-form__stylist-avatar">
                {s.name.charAt(0).toUpperCase()}
              </div>
              <div className="booking-form__stylist-info">
                <span className="booking-form__stylist-name">{s.name}</span>
                <span className={`booking-form__stylist-status${s.status === 'AVAILABLE' ? ' is-available' : ''}`}>
                  {s.status === 'AVAILABLE' ? '● Rảnh' : '● Đang bận'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bf-service" className="form-label">Chọn dịch vụ *</label>
        <select
          id="bf-service"
          className="form-select"
          value={form.serviceId ?? ''}
          onChange={(e) => update('serviceId', e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">-- Chọn dịch vụ --</option>
          {services.map((svc) => (
            <option key={svc.id} value={svc.id}>
              {svc.name}
              {svc.durationMinutes != null ? ` (${svc.durationMinutes} phút)` : ''}
              {svc.price != null ? ` — ${svc.price.toLocaleString('vi-VN')}đ` : ''}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}

function Step3({ form, minDate, update }: { form: FormState; minDate: string } & FormUpdater) {
  return (
    <fieldset className="booking-form__fieldset">
      <legend className="booking-form__legend">Chọn ngày & giờ</legend>
      <div className="booking-form__row">
        <div className="form-group">
          <label htmlFor="bf-date" className="form-label">Ngày hẹn *</label>
          <input
            id="bf-date"
            type="date"
            className="form-input"
            value={form.date}
            min={minDate}
            onChange={(e) => update('date', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Chọn giờ *</label>
        <div className="booking-form__time-grid">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              className={`booking-form__time-slot${form.time === t ? ' is-selected' : ''}`}
              onClick={() => update('time', t)}
              aria-pressed={form.time === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bf-notes" className="form-label">Ghi chú (tùy chọn)</label>
        <textarea
          id="bf-notes"
          className="form-textarea"
          rows={3}
          placeholder="Yêu cầu đặc biệt, kiểu tóc mong muốn..."
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
        />
      </div>
    </fieldset>
  );
}

interface Step4Props {
  form: FormState;
  stylist: Stylist | null;
  service: SalonService | null;
  error: string | null;
}

function Step4({ form, stylist, service, error }: Step4Props) {
  return (
    <fieldset className="booking-form__fieldset">
      <legend className="booking-form__legend">Xác nhận thông tin</legend>
      <dl className="booking-form__summary">
        <Row label="Khách hàng" value={form.customerName} />
        <Row label="Điện thoại" value={form.customerPhone} />
        <Row label="Stylist" value={stylist?.name ?? '—'} />
        <Row label="Dịch vụ" value={service?.name ?? '—'} />
        <Row label="Ngày hẹn" value={form.date ? new Date(form.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—'} />
        <Row label="Giờ hẹn" value={form.time || '—'} />
        {form.notes && <Row label="Ghi chú" value={form.notes} />}
      </dl>
      {error != null && (
        <div className="booking-form__alert booking-form__alert--error" role="alert">
          ❌ {error}
        </div>
      )}
    </fieldset>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="booking-form__summary-label">{label}</dt>
      <dd className="booking-form__summary-value">{value}</dd>
    </>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="booking-form__success" role="status">
      <div className="booking-form__success-icon" aria-hidden="true">✓</div>
      <h3 className="booking-form__success-title">Đặt lịch thành công!</h3>
      <p className="booking-form__success-sub">
        Cảm ơn bạn đã tin tưởng LN Salon. Chúng tôi sẽ liên hệ xác nhận lịch hẹn sớm nhất.
      </p>
      <button type="button" className="btn btn-primary" onClick={onReset}>
        Đặt lịch thêm
      </button>
    </div>
  );
}
