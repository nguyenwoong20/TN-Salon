// ─── Domain types — strict TypeScript, no enums ──────────────────────────────

export interface Stylist {
  readonly id: number;
  readonly name: string;
  readonly specialty?: string;
  readonly status: 'AVAILABLE' | 'BUSY';
  readonly imageUrl?: string;
}

export interface SalonService {
  readonly id: number;
  readonly name: string;
  readonly price?: number;
  readonly durationMinutes?: number;
  readonly description?: string;
}

export interface Customer {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
}

export type AppointmentStatus = 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  readonly id: number;
  readonly customer: Customer;
  readonly stylist: Stylist;
  readonly service: SalonService;
  readonly startTime: string;   // ISO 8601
  readonly endTime?: string;
  readonly status: AppointmentStatus;
  readonly notes?: string;
}

// ─── API request/response shapes ────────────────────────────────────────────

export interface CreateAppointmentPayload {
  customerName: string;
  customerPhone: string;
  stylistId: number;
  serviceId: number;
  startTime: string;  // "yyyy-MM-dd'T'HH:mm"
  notes?: string;
}

// ─── API result wrapper ──────────────────────────────────────────────────────

export type ApiResult<T> =
  | { kind: 'ok'; data: T }
  | { kind: 'err'; message: string };
