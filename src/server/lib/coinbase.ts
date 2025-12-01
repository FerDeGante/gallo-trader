// Coinbase Commerce Client
// Nota: El paquete oficial está deprecated, pero lo usamos como ejemplo
// En producción, considera usar la API REST directamente

let Client: unknown = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const coinbase = require('coinbase-commerce-node');
  Client = coinbase.Client;
  
  if (process.env.COINBASE_COMMERCE_API_KEY && Client && typeof (Client as Record<string, unknown>).init === 'function') {
    (Client as Record<string, (key: string) => void>).init(process.env.COINBASE_COMMERCE_API_KEY);
  }
} catch (error) {
  console.warn('Coinbase Commerce no está disponible:', error);
}

export const coinbaseClient = Client as Record<string, unknown> | null;

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
