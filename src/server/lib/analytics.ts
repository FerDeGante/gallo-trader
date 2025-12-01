// Event tracking system para GA4, Meta Pixel y futuros analytics

export type AnalyticsEvent =
  // Eventos de usuario
  | 'user_registered'
  | 'user_login'
  | 'user_logout'
  
  // Eventos de programa
  | 'program_viewed'
  | 'program_detail_viewed'
  | 'program_outline_viewed'
  
  // Eventos de checkout
  | 'checkout_started'
  | 'checkout_completed'
  | 'checkout_failed'
  | 'payment_method_selected'
  
  // Eventos de contenido
  | 'lesson_accessed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'lesson_progress_updated'
  | 'module_completed'
  | 'program_completed'
  
  // Eventos de admin
  | 'admin_access_granted'
  | 'admin_access_revoked'
  | 'admin_enrollment_created';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  
  // Props específicas del evento
  programId?: string;
  programSlug?: string;
  programTitle?: string;
  programPrice?: number;
  
  moduleId?: string;
  moduleTitle?: string;
  
  lessonId?: string;
  lessonTitle?: string;
  lessonType?: string;
  lessonDuration?: number;
  
  paymentId?: string;
  paymentProvider?: string;
  paymentAmount?: number;
  paymentCurrency?: string;
  
  enrollmentId?: string;
  enrollmentStatus?: string;
  
  // Metadata adicional
  source?: string;
  timestamp?: Date;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsProvider {
  name: string;
  track(data: AnalyticsEventData): Promise<void> | void;
  identify?(userId: string, traits: Record<string, unknown>): Promise<void> | void;
}

/**
 * Analytics Manager
 * Centraliza el envío de eventos a múltiples proveedores
 */
class AnalyticsManager {
  private providers: AnalyticsProvider[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  /**
   * Registrar un proveedor de analytics
   */
  register(provider: AnalyticsProvider) {
    this.providers.push(provider);
    console.log(`✅ Analytics provider registrado: ${provider.name}`);
  }

  /**
   * Enviar evento a todos los proveedores
   */
  async track(data: AnalyticsEventData) {
    if (!this.isEnabled) {
      console.log('📊 [Analytics Debug]', data);
      return;
    }

    const enrichedData: AnalyticsEventData = {
      ...data,
      timestamp: data.timestamp || new Date(),
    };

    await Promise.all(
      this.providers.map(async (provider) => {
        try {
          await provider.track(enrichedData);
        } catch (error) {
          console.error(`Error en provider ${provider.name}:`, error);
        }
      })
    );
  }

  /**
   * Identificar usuario en todos los proveedores
   */
  async identify(userId: string, traits: Record<string, unknown>) {
    if (!this.isEnabled) {
      console.log('👤 [Analytics Identify]', { userId, traits });
      return;
    }

    await Promise.all(
      this.providers.map(async (provider) => {
        try {
          if (provider.identify) {
            await provider.identify(userId, traits);
          }
        } catch (error) {
          console.error(`Error identificando en ${provider.name}:`, error);
        }
      })
    );
  }
}

export const analytics = new AnalyticsManager();

/**
 * Helper: Emitir evento de analytics
 */
export function trackEvent(data: AnalyticsEventData) {
  // Fire and forget - no esperamos respuesta
  void analytics.track(data);
}

/**
 * Helper: Identificar usuario
 */
export function identifyUser(userId: string, traits: Record<string, unknown>) {
  void analytics.identify(userId, traits);
}
