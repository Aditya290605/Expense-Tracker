const API_BASE_URL = "https://expense-tracker-nvgm.onrender.com/api";

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
  };
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

  // Set token and save to localStorage
  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Clear token and remove from localStorage
  private clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get auth headers for API requests
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Signup user
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Set token on successful signup
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Set token on successful login
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user');
      }

      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updates: { name?: string; avatar?: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data.user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Logout user
  logout() {
    this.clearToken();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Check if token is valid (optional - you can call getCurrentUser to validate)
  async validateToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      this.clearToken();
      return false;
    }
  }

  // Income APIs
  async getIncome() {
    const response = await fetch(`${API_BASE_URL}/income`, {
      headers: this.getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch income');
    return data.income || [];
  }

  async addIncome(income: { amount: number; category: string; description?: string; date?: string }) {
    const response = await fetch(`${API_BASE_URL}/income`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(income),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add income');
    return data.income;
  }

  // Expense APIs
  async getExpenses() {
    const response = await fetch(`${API_BASE_URL}/expense`, {
      headers: this.getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch expenses');
    return data.expenses || [];
  }

  async addExpense(expense: { amount: number; category: string; description?: string; date?: string }) {
    const response = await fetch(`${API_BASE_URL}/expense`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(expense),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add expense');
    return data.expense;
  }
}

export const authService = new AuthService();
