import type { Stylist, SalonService, Appointment, CreateAppointmentPayload, ApiResult } from '../types';
import api from './client';

// ─── Stylists ────────────────────────────────────────────────────────────────

export async function fetchStylists(): Promise<ApiResult<Stylist[]>> {
  try {
    const { data } = await api.get<Stylist[]>('/stylists');
    return { kind: 'ok', data };
  } catch (err: unknown) {
    return { kind: 'err', message: extractMessage(err) };
  }
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function fetchServices(): Promise<ApiResult<SalonService[]>> {
  try {
    const { data } = await api.get<SalonService[]>('/services');
    return { kind: 'ok', data };
  } catch (err: unknown) {
    return { kind: 'err', message: extractMessage(err) };
  }
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<ApiResult<Appointment>> {
  try {
    const { data } = await api.post<Appointment>('/appointments', payload);
    return { kind: 'ok', data };
  } catch (err: unknown) {
    return { kind: 'err', message: extractMessage(err) };
  }
}

export async function fetchMyAppointments(phone: string): Promise<ApiResult<Appointment[]>> {
  try {
    const { data } = await api.get<Appointment[]>('/appointments/my', { params: { phone } });
    return { kind: 'ok', data };
  } catch (err: unknown) {
    return { kind: 'err', message: extractMessage(err) };
  }
}

export async function cancelAppointment(id: number): Promise<ApiResult<Appointment>> {
  try {
    const { data } = await api.patch<Appointment>(`/appointments/${id}/cancel`);
    return { kind: 'ok', data };
  } catch (err: unknown) {
    return { kind: 'err', message: extractMessage(err) };
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function extractMessage(err: unknown): string {
  if (err instanceof Error) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    return axiosErr.response?.data?.message ?? err.message;
  }
  return 'Có lỗi xảy ra, vui lòng thử lại.';
}
