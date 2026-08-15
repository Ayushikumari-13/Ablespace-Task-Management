const TOKEN_KEY = 'ablespace_access_token';
const OLD_TOKEN_KEY = 'accessToken';

export function saveToken(token: string): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(OLD_TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;

  return (
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem(OLD_TOKEN_KEY)
  );
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(OLD_TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}