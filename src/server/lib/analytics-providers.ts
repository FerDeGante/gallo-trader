import type { AnalyticsProvider, AnalyticsEventData } from './analytics';

/**
 * Provider para Google Analytics 4 (GA4)
 * Utiliza Measurement Protocol para server-side tracking
 */
export class GA4Provider implements AnalyticsProvider {
  name = 'Google Analytics 4';
  private measurementId: string;
  private apiSecret: string;

  constructor(measurementId: string, apiSecret: string) {
    this.measurementId = measurementId;
    this.apiSecret = apiSecret;
  }

  async track(data: AnalyticsEventData): Promise<void> {
    try {
      const payload = {
        client_id: data.userId || 'anonymous',
        events: [
          {
            name: data.event,
            params: {
              user_id: data.userId,
              program_id: data.programId,
              program_title: data.programTitle,
              lesson_id: data.lessonId,
              payment_amount: data.paymentAmount,
              payment_currency: data.paymentCurrency,
              timestamp_micros: data.timestamp
                ? Math.floor(data.timestamp.getTime() * 1000)
                : Date.now() * 1000,
              ...data.metadata,
            },
          },
        ],
      };

      const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error enviando a GA4:', error);
    }
  }
}

/**
 * Provider para Meta Pixel (Facebook)
 * Utiliza Conversions API para server-side tracking
 */
export class MetaPixelProvider implements AnalyticsProvider {
  name = 'Meta Pixel';
  private pixelId: string;
  private accessToken: string;

  constructor(pixelId: string, accessToken: string) {
    this.pixelId = pixelId;
    this.accessToken = accessToken;
  }

  async track(data: AnalyticsEventData): Promise<void> {
    try {
      // Mapear eventos a eventos estándar de Facebook
      const eventName = this.mapEventName(data.event);
      
      if (!eventName) return; // No mapear eventos no relevantes para Meta

      const payload = {
        data: [
          {
            event_name: eventName,
            event_time: data.timestamp
              ? Math.floor(data.timestamp.getTime() / 1000)
              : Math.floor(Date.now() / 1000),
            user_data: {
              em: data.userEmail ? this.hashEmail(data.userEmail) : undefined,
              external_id: data.userId,
            },
            custom_data: {
              currency: data.paymentCurrency || 'USD',
              value: data.paymentAmount ? data.paymentAmount / 100 : undefined,
              content_name: data.programTitle || data.lessonTitle,
              content_ids: [data.programId || data.lessonId].filter(Boolean),
            },
            action_source: 'website',
          },
        ],
      };

      const url = `https://graph.facebook.com/v18.0/${this.pixelId}/events?access_token=${this.accessToken}`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error enviando a Meta Pixel:', error);
    }
  }

  private mapEventName(event: string): string | null {
    const mapping: Record<string, string> = {
      checkout_started: 'InitiateCheckout',
      checkout_completed: 'Purchase',
      program_viewed: 'ViewContent',
      program_detail_viewed: 'ViewContent',
      lesson_started: 'ViewContent',
      user_registered: 'CompleteRegistration',
      payment_method_selected: 'AddPaymentInfo',
    };

    return mapping[event] || null;
  }

  private hashEmail(email: string): string {
    // En producción, usar crypto para hash SHA-256
    // Por ahora retornamos directamente (Meta acepta plain o hashed)
    return email.toLowerCase().trim();
  }
}

/**
 * Provider genérico para logging en consola (desarrollo)
 */
export class ConsoleProvider implements AnalyticsProvider {
  name = 'Console Logger';

  track(data: AnalyticsEventData): void {
    console.log('📊 Analytics Event:', {
      event: data.event,
      user: data.userId,
      program: data.programTitle,
      lesson: data.lessonTitle,
      payment: data.paymentAmount ? `$${data.paymentAmount / 100}` : undefined,
    });
  }

  identify(userId: string, traits: Record<string, unknown>): void {
    console.log('👤 Analytics Identify:', { userId, traits });
  }
}
