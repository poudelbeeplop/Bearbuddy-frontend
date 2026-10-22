const SESSION_KEY = 'bb.session';

// Teammate: replace with a real backend call, e.g.
// const { user } = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export async function login({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // fake latency
  return { user: { email } };
}

export function signInWithUCCentral() {
  // TODO: window.location.href = `${API_BASE_URL}/api/auth/sso/start`;
}

export async function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
}

// Keeps the session across page refreshes (cleared when the tab closes).
export function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // storage unavailable; the session just won't survive a refresh
  }
}
