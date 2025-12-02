export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const url = `${baseUrl}/api/v1${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      return { error: errorData.error || `Error: ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Client Error:', error);
    return { error: 'Error de conexión con el servidor' };
  }
}
