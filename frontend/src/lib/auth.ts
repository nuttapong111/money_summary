// Mock Authentication System
// ใช้สำหรับทดสอบระบบก่อนที่จะเชื่อมต่อกับ backend

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  plan: 'free' | 'basic' | 'premium'
  status: 'active' | 'inactive' | 'trial'
  trialExpiresAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  plan: string
}

// Mock Users Database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    role: 'user',
    plan: 'basic',
    status: 'active',
    trialExpiresAt: '2024-12-31T23:59:59Z'
  },
  {
    id: '2',
    email: 'admin@example.com',
    firstName: 'แอดมิน',
    lastName: 'ระบบ',
    role: 'admin',
    plan: 'premium',
    status: 'active'
  },
  {
    id: '3',
    email: 'trial@example.com',
    firstName: 'ทดลอง',
    lastName: 'ใช้งาน',
    role: 'user',
    plan: 'free',
    status: 'trial',
    trialExpiresAt: '2024-02-15T23:59:59Z'
  }
]

// Mock Passwords (ในระบบจริงจะต้อง hash)
const mockPasswords: Record<string, string> = {
  'user@example.com': 'user123',
  'admin@example.com': 'admin123',
  'trial@example.com': 'trial123'
}

// Local Storage Keys
const AUTH_TOKEN_KEY = 'auth_token'
const USER_DATA_KEY = 'user_data'

// Authentication Functions
export const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const user = mockUsers.find(u => u.email === credentials.email)
  const password = mockPasswords[credentials.email]
  
  if (!user || !password || password !== credentials.password) {
    return {
      success: false,
      error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    }
  }
  
  // Generate mock token
  const token = `mock_token_${user.id}_${Date.now()}`
  
  // Store in localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
  
  return {
    success: true,
    user
  }
}

export const register = async (data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Check if email already exists
  if (mockUsers.find(u => u.email === data.email)) {
    return {
      success: false,
      error: 'อีเมลนี้มีผู้ใช้งานแล้ว'
    }
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'user',
    plan: data.plan as 'free' | 'basic' | 'premium',
    status: 'trial',
    trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
  }
  
  // Add to mock database
  mockUsers.push(newUser)
  mockPasswords[data.email] = mockPasswords[data.email] = data.password
  
  // Generate mock token
  const token = `mock_token_${newUser.id}_${Date.now()}`
  
  // Store in localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser))
  
  return {
    success: true,
    user: newUser
  }
}

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_DATA_KEY)
}

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY)
  if (!userData) return null
  
  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  return !!token
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

// Check if user has access to feature based on plan
export const hasFeatureAccess = (feature: string, user?: User): boolean => {
  const currentUser = user || getCurrentUser()
  if (!currentUser) return false
  
  const planFeatures: Record<string, string[]> = {
    free: ['dashboard', 'transactions', 'goals_basic'],
    basic: ['dashboard', 'transactions', 'goals_unlimited', 'financial_health', 'tax_planning_basic'],
    premium: ['dashboard', 'transactions', 'goals_unlimited', 'financial_health', 'tax_planning_advanced', 'investments', 'consultant']
  }
  
  return planFeatures[currentUser.plan]?.includes(feature) || false
}

// Check if user is admin
export const isAdmin = (user?: User): boolean => {
  const currentUser = user || getCurrentUser()
  return currentUser?.role === 'admin'
}

// Check if user is in trial period
export const isInTrial = (user?: User): boolean => {
  const currentUser = user || getCurrentUser()
  if (!currentUser || currentUser.plan !== 'free') return false
  
  if (!currentUser.trialExpiresAt) return false
  
  const trialEnd = new Date(currentUser.trialExpiresAt)
  const now = new Date()
  
  return now < trialEnd
}

// Get trial days remaining
export const getTrialDaysRemaining = (user?: User): number => {
  const currentUser = user || getCurrentUser()
  if (!currentUser || !currentUser.trialExpiresAt) return 0
  
  const trialEnd = new Date(currentUser.trialExpiresAt)
  const now = new Date()
  const diffTime = trialEnd.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}

// Mock API functions for other services
export const mockApiCall = async <T>(data: T, delay: number = 1000): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, delay))
  return data
}
