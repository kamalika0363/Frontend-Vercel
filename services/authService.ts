import { createApiUrl, ENDPOINTS } from '@/lib/api/config';

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(createApiUrl(ENDPOINTS.AUTH.LOGIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    cache: 'no-store', // Disabled caching for authentication (change later if required)
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}