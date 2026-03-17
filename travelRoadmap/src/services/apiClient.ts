/**
 * Centralized API client for Time2Travel Express backend.
 *
 * JWT is now stored in an HttpOnly cookie — the browser sends it automatically.
 * This file has NO token-reading / localStorage logic; that was the XSS risk.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// USER_KEY is still used to cache the user *object* (not the token) for instant UI restore.
// Unlike the token, the user object contains no secret — knowing your own name/email/role
// does not grant access. The actual authorization happens server-side via the HttpOnly cookie.
export const USER_KEY = 'tt_user';

export const clearUserCache = () => localStorage.removeItem(USER_KEY);

// ── Core fetch wrapper ─────────────────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function apiRequest<T = unknown>(
    method: HttpMethod,
    path: string,
    body?: unknown,
): Promise<{ success: boolean; data: T; status: number }> {
    const response = await fetch(`${API_BASE}${path}`, {
        method,
        credentials: 'include',   // ← sends the HttpOnly cookie on every request
        headers: { 'Content-Type': 'application/json' },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    try {
        const data = await response.json();
        return { success: response.ok, data, status: response.status };
    } catch (e) {
        // Fallback for non-JSON responses (e.g. 413 Payload Too Large HTML page)
        return { 
            success: false, 
            data: { message: `Server error: ${response.statusText}` } as unknown as T, 
            status: response.status 
        };
    }
}

// ── Public helpers ─────────────────────────────────────────────────────────

export const apiGet = <T = unknown>(path: string) =>
    apiRequest<T>('GET', path);

export const apiPost = <T = unknown>(path: string, body: unknown) =>
    apiRequest<T>('POST', path, body);

export const apiPut = <T = unknown>(path: string, body: unknown) =>
    apiRequest<T>('PUT', path, body);

export const apiPatch = <T = unknown>(path: string, body: unknown) =>
    apiRequest<T>('PATCH', path, body);

export const apiDelete = <T = unknown>(path: string) =>
    apiRequest<T>('DELETE', path);
