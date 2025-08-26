'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon,
  UserIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'คุณสมบัติ', href: '#features' },
  { name: 'แพ็คเกจ', href: '#pricing' },
  { name: 'เกี่ยวกับเรา', href: '#about' },
  { name: 'บล็อก', href: '#blog' },
  { name: 'ติดต่อ', href: '#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-surface/80 backdrop-blur-md border-b border-space-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Money App</span>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-space font-bold text-xl">M</span>
              </div>
              <span className="font-space font-bold text-2xl bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
                Money App
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-space-text hover:text-space-primary transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-space-surface border border-space-border hover:border-space-primary transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-warning-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-space-primary" />
            )}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg bg-space-surface border border-space-border hover:border-space-primary transition-colors duration-200">
                <UserIcon className="h-5 w-5 text-space-primary" />
                <span className="hidden sm:block text-sm font-medium">
                  {user?.firstName}
                </span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-space-surface border border-space-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                  >
                    <ChartBarIcon className="h-4 w-4 mr-3" />
                    แดชบอร์ด
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                  >
                    <UserIcon className="h-4 w-4 mr-3" />
                    โปรไฟล์
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                  >
                    <CogIcon className="h-4 w-4 mr-3" />
                    ตั้งค่า
                  </Link>
                  <hr className="border-space-border my-2" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-danger-400 hover:bg-danger-400/10 transition-colors duration-200"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex lg:gap-x-4">
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-space-text hover:text-space-primary transition-colors duration-200"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-space-primary to-cosmic-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                ลงทะเบียน
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-space-text"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-y-0 right-0 z-50 w-full bg-space-surface border-l border-space-border"
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-space font-bold text-lg">M</span>
                </div>
                <span className="font-space font-bold text-xl bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
                  Money App
                </span>
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-space-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flow-root px-6 py-6">
              <div className="-my-6 divide-y divide-space-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="px-3 py-2">
                        <p className="text-sm text-space-text-secondary">
                          สวัสดี, {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        แดชบอร์ด
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-danger-400 hover:bg-danger-400/10 transition-colors duration-200"
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-space-text hover:bg-space-primary/10 hover:text-space-primary transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        เข้าสู่ระบบ
                      </Link>
                      <Link
                        href="/register"
                        className="block w-full rounded-lg bg-gradient-to-r from-space-primary to-cosmic-primary px-4 py-3 text-base font-semibold text-white text-center shadow-sm hover:shadow-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ลงทะเบียน
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

