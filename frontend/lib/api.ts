import { getToken } from './auth';

const API_URL = 'http://localhost:4000/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers);

  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}

export function apiGet<T>(
  endpoint: string,
): Promise<T> {
  return request<T>(endpoint, {
    method: 'GET',
  });
}

export function apiPost<T>(
  endpoint: string,
  body: unknown,
): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function apiPatch<T>(
  endpoint: string,
  body: unknown,
): Promise<T> {
  return request<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function apiDelete<T>(
  endpoint: string,
): Promise<T> {
  return request<T>(endpoint, {
    method: 'DELETE',
  });
}