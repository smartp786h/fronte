const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Get Telegram WebApp instance
function getTelegramWebApp() {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    return (window as any).Telegram.WebApp;
  }
  return null;
}

// Get Telegram init data for authentication
function getTelegramInitData(): string | null {
  const tg = getTelegramWebApp();
  if (tg && tg.initData) {
    return tg.initData;
  }
  return null;
}

// Make authenticated API request
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const initData = getTelegramInitData();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(initData && { 'x-telegram-init-data': initData }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const api = {
  // Get user data
  getUser: () => apiRequest('/api/user'),
  
  // Handle click
  click: (coinsToAdd: number = 11) => 
    apiRequest('/api/click', {
      method: 'POST',
      body: JSON.stringify({ coinsToAdd }),
    }),
  
  // Update profit per hour
  updateProfitPerHour: (profitPerHour: number) =>
    apiRequest('/api/profit-per-hour', {
      method: 'POST',
      body: JSON.stringify({ profit_per_hour: profitPerHour }),
    }),
  
  // Claim daily reward
  claimDailyReward: (type: 'daily_reward' | 'daily_cipher' | 'daily_combo') =>
    apiRequest(`/api/daily-reward/${type}`, {
      method: 'POST',
    }),
};

