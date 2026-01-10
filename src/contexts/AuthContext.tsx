'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types'
import api from '@/lib/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('auth_token')
    if (token) {
      api.setToken(token)
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error)
      // Clear invalid token
      api.clearToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password)
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data
        api.setToken(token)
        localStorage.setItem('refresh_token', refreshToken)
        setUser(user)
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.register(username, email, password)
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data
        api.setToken(token)
        localStorage.setItem('refresh_token', refreshToken)
        setUser(user)
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    api.clearToken()
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}