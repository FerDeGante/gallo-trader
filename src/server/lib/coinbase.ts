// Coinbase Commerce Client
// Nota: Funcionalidad deshabilitada temporalmente
// En producción, considera usar la API REST directamente

export const coinbaseClient = null;

// Tipos para Coinbase Commerce
export type CoinbaseCharge = {
  id: string;
  code: string;
  name: string;
  description: string;
  pricing_type: 'fixed_price' | 'no_price';
  local_price: {
    amount: string;
    currency: string;
  };
  hosted_url: string;
  metadata: Record<string, string>;
  timeline: Array<{
    time: string;
    status: string;
  }>;
};

export type CoinbaseWebhookEvent = {
  id: string;
  scheduled_for: string;
  event: {
    id: string;
    resource: string;
    type: string;
    api_version: string;
    created_at: string;
    data: CoinbaseCharge;
  };
};
