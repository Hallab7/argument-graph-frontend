import { ApiResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add any additional headers
    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Request failed')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; token: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(username: string, email: string, password: string) {
    return this.request<{ user: any; token: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    })
  }

  async forgotPassword(email: string) {
    return this.request<{ sent: boolean; expiresIn: number }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async verifyResetOTP(email: string, otp: string) {
    return this.request<{ resetToken: string; email: string }>('/auth/verify-reset-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    })
  }

  async resetPassword(resetToken: string, newPassword: string) {
    return this.request<{ email: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ resetToken, newPassword }),
    })
  }

  async refreshToken(refreshToken: string) {
    return this.request<{ user: any; token: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me')
  }

  async updateProfile(data: any, avatar?: File) {
    const formData = new FormData()
    
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })

    if (avatar) {
      formData.append('avatar', avatar)
    }

    return this.request<{ user: any }>('/auth/profile', {
      method: 'PUT',
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    })
  }

  // Debate endpoints
  async getDebates(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
    return this.request<any[]>(`/debates${queryString}`)
  }

  async getDebate(id: string) {
    return this.request<any>(`/debates/${id}`)
  }

  async createDebate(data: any) {
    return this.request<any>('/debates', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateDebate(id: string, data: any) {
    return this.request<any>(`/debates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteDebate(id: string) {
    return this.request<void>(`/debates/${id}`, {
      method: 'DELETE',
    })
  }

  // Argument endpoints
  async getArguments(debateId: string) {
    return this.request<any[]>(`/debates/${debateId}/arguments`)
  }

  async createArgument(debateId: string, data: any) {
    return this.request<any>(`/debates/${debateId}/arguments`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateArgument(id: string, data: any) {
    return this.request<any>(`/arguments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteArgument(id: string) {
    return this.request<void>(`/arguments/${id}`, {
      method: 'DELETE',
    })
  }

  async rateArgument(id: string, rating: any) {
    return this.request<any>(`/arguments/${id}/ratings`, {
      method: 'POST',
      body: JSON.stringify(rating),
    })
  }

  // User endpoints
  async getUsers(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
    return this.request<any[]>(`/users${queryString}`)
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`)
  }

  async followUser(id: string) {
    return this.request<void>(`/users/${id}/follow`, {
      method: 'POST',
    })
  }

  async unfollowUser(id: string) {
    return this.request<void>(`/users/${id}/unfollow`, {
      method: 'POST',
    })
  }

  // Search endpoints
  async search(query: string, filters?: any) {
    const params = { query, ...filters }
    const queryString = new URLSearchParams(params).toString()
    return this.request<any>(`/search?${queryString}`)
  }

  // AI endpoints
  async analyzeArgument(argumentId: string) {
    return this.request<any>(`/ai/analyze/${argumentId}`)
  }

  async checkFallacies(text: string) {
    return this.request<any>('/ai/check-fallacies', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  }

  async factCheck(text: string) {
    return this.request<any>('/ai/fact-check', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  }

  async suggestCounter(argumentId: string) {
    return this.request<any>(`/ai/suggest-counter/${argumentId}`)
  }

  // Admin endpoints
  async getAdminStats() {
    return this.request<any>('/admin/stats')
  }

  async getModerationQueue() {
    return this.request<any[]>('/admin/moderation')
  }

  async reportContent(contentType: string, contentId: string, reason: string, description: string) {
    return this.request<any>('/admin/report', {
      method: 'POST',
      body: JSON.stringify({ contentType, contentId, reason, description }),
    })
  }
}

export const api = new ApiClient(API_BASE_URL)
export default api