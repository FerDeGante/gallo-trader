import { enrollmentRepository } from './enrollment.repository';
import { programRepository } from '../program/program.repository';
import { trackEvent } from '@/server/lib/analytics-setup';

export class EnrollmentService {
  /**
   * Activar acceso a un programa para un usuario
   */
  async activateAccess(data: {
    userId: string;
    programId: string;
    paymentId?: string;
    source?: 'PAYMENT' | 'ADMIN' | 'COMP';
    notes?: string;
  }) {
    // Verificar si ya tiene acceso activo
    const existingEnrollment = await enrollmentRepository.findActiveByUserAndProgram(
      data.userId,
      data.programId
    );

    if (existingEnrollment) {
      return existingEnrollment; // Ya tiene acceso
    }

    // Crear nuevo enrollment
    const enrollment = await enrollmentRepository.create({
      userId: data.userId,
      programId: data.programId,
      status: 'ACTIVE',
      source: data.source || 'PAYMENT',
      paymentId: data.paymentId,
      notes: data.notes,
    });

    // Tracking: Acceso activado (checkout completado si es por pago)
    const program = await programRepository.findById(data.programId);
    
    if (data.source === 'PAYMENT' && data.paymentId) {
      trackEvent({
        event: 'checkout_completed',
        userId: data.userId,
        programId: data.programId,
        programSlug: program?.slug,
        programTitle: program?.title,
        programPrice: program?.priceUsd,
        enrollmentId: enrollment.id,
        enrollmentStatus: 'ACTIVE',
        paymentId: data.paymentId,
      });
    }

    return enrollment;
  }

  /**
   * Verificar si un usuario tiene acceso a un programa
   */
  async hasAccess(userId: string, programId: string): Promise<boolean> {
    return enrollmentRepository.hasActiveAccess(userId, programId);
  }

  /**
   * Revocar acceso a un programa
   */
  async revokeAccess(enrollmentId: string, reason?: string) {
    return enrollmentRepository.updateStatus(enrollmentId, 'REVOKED', reason);
  }
}

export const enrollmentService = new EnrollmentService();
