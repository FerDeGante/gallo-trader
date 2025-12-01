/**
 * Inicialización de Analytics Providers
 * Ejecutar este archivo al iniciar la aplicación
 */

import { analytics } from './analytics';
import {
  GA4Provider,
  MetaPixelProvider,
  ConsoleProvider,
} from './analytics-providers';

// Siempre usar ConsoleProvider en desarrollo
if (process.env.NODE_ENV !== 'production') {
  analytics.register(new ConsoleProvider());
}

// Google Analytics 4
if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
  analytics.register(
    new GA4Provider(
      process.env.GA4_MEASUREMENT_ID,
      process.env.GA4_API_SECRET
    )
  );
  console.log('✅ GA4 analytics configurado');
}

// Meta Pixel (Facebook Conversions API)
if (process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN) {
  analytics.register(
    new MetaPixelProvider(
      process.env.META_PIXEL_ID,
      process.env.META_ACCESS_TOKEN
    )
  );
  console.log('✅ Meta Pixel analytics configurado');
}

export { analytics, trackEvent, identifyUser } from './analytics';
