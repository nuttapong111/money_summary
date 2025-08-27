'use client'

import { useState } from 'react'
import {
  ChartBarIcon, BanknotesIcon, ArrowTrendingUpIcon, TagIcon,
  CalendarIcon, UserIcon, CogIcon, BellIcon, HomeIcon,
  DocumentTextIcon, CreditCardIcon, ShieldCheckIcon, ChartPieIcon,
  CurrencyDollarIcon, BuildingOfficeIcon, LightBulbIcon, Cog6ToothIcon,
  BellAlertIcon, ClockIcon, ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { id: 'financial-dashboard', name: 'แดชบอร์ดหลัก', icon: HomeIcon, path: '/dashboard/financial-dashboard' },
  { id: 'income-expenses', name: 'รายรับ-รายจ่าย', icon: BanknotesIcon, path: '/dashboard/income-expenses' },
  { id: 'investment-portfolio', name: 'พอร์ตการลงทุน', icon: ArrowTrendingUpIcon, path: '/dashboard/investment-portfolio' },
  { id: 'financial-goals', name: 'เป้าหมายการเงิน', icon: TagIcon, path: '/dashboard/financial-goals' },
  { id: 'investment-planning', name: 'วางแผนการลงทุน', icon: CalendarIcon, path: '/dashboard/investment-planning' },
  { id: 'ai-advisor', name: 'คำแนะนำอัจฉริยะ', icon: LightBulbIcon, path: '/dashboard/ai-advisor' },
  { id: 'financial-health', name: 'สุขภาพการเงิน', icon: ShieldCheckIcon, path: '/dashboard/financial-health' },
  { id: 'debts-liabilities', name: 'หนี้สินและสินเชื่อ', icon: CreditCardIcon, path: '/dashboard/debts-liabilities' },
  { id: 'reports-analytics', name: 'รายงานและวิเคราะห์', icon: DocumentTextIcon, path: '/dashboard/reports-analytics' },
  { id: 'subscription', name: 'แพ็คเกจและการสมัคร', icon: BuildingOfficeIcon, path: '/dashboard/subscription' },
  { id: 'payment-proof', name: 'ส่งหลักฐานการชำระ', icon: BellAlertIcon, path: '/dashboard/payment-proof' }
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [notifications, setNotifications] = useState(1) // Mock notification count
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [showSettingDropdown, setShowSettingDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const pathname = usePathname()

  // Mock notification data
  const notificationItems = [
    {
      id: 1,
      title: 'การชำระเงินได้รับการอนุมัติ',
      message: 'การชำระเงินแพ็คเกจ Premium ได้รับการอนุมัติแล้ว',
      time: '2 นาทีที่แล้ว',
      type: 'success'
    }
  ]

  // Mock setting options - เอาข้อมูลส่วนบุคคลออก และเพิ่มลิงก์ไปยังหน้าต่างๆ
  const settingOptions = [
    { id: 1, name: 'การแจ้งเตือน', icon: BellIcon, description: 'ตั้งค่าการแจ้งเตือนอีเมล, SMS', path: '/dashboard/settings/notifications' },
    { id: 2, name: 'ความปลอดภัย', icon: ShieldCheckIcon, description: 'เปลี่ยนรหัสผ่าน, 2FA', path: '/dashboard/settings/security' },
    { id: 3, name: 'การแสดงผล', icon: CogIcon, description: 'ธีม, ภาษา, ขนาดตัวอักษร', path: '/dashboard/settings/appearance' },
    { id: 4, name: 'การเชื่อมต่อบัญชีธนาคาร', icon: CreditCardIcon, description: 'เชื่อมต่อ/ยกเลิกการเชื่อมต่อ', path: '/dashboard/settings/bank-connections' },
    { id: 5, name: 'การส่งออกข้อมูล', icon: DocumentTextIcon, description: 'ดาวน์โหลดข้อมูลทั้งหมด', path: '/dashboard/settings/data-export' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header - รวมทุกอย่างไว้ในแถวเดียว */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        {/* แถวเดียวรวม Logo, เมนู, และ User Actions */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo และชื่อระบบ */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MIS</h1>
                <p className="text-xs text-gray-500">Money Investment System</p>
              </div>
            </div>

            {/* Navigation Menu - เมนูทั้งหมด (ไม่มีหน้าตั้งค่า) */}
            <nav className="hidden lg:flex space-x-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right side actions - รวมกับชื่อระบบ */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="relative p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowNotificationDropdown(!showNotificationDropdown)
                  setShowSettingDropdown(false)
                  setShowProfileDropdown(false)
                }}
              >
                <BellIcon className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">การแจ้งเตือน</h3>
                    <div className="space-y-3">
                      {notificationItems.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700">
                        ดูการแจ้งเตือนทั้งหมด
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowSettingDropdown(!showSettingDropdown)
                  setShowNotificationDropdown(false)
                  setShowProfileDropdown(false)
                }}
              >
                <CogIcon className="w-6 h-6" />
              </button>

              {/* Setting Dropdown - รวมการตั้งค่าทั้งหมด และสามารถกดไปในแต่ละหน้าได้ */}
              {showSettingDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">การตั้งค่า</h3>
                    <div className="space-y-2">
                      {settingOptions.map((option) => (
                        <Link
                          key={option.id}
                          href={option.path}
                          className="w-full flex items-start space-x-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setShowSettingDropdown(false)}
                        >
                          <option.icon className="w-5 h-5 text-gray-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{option.name}</p>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center space-x-3 p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown)
                  setShowNotificationDropdown(false)
                  setShowSettingDropdown(false)
                }}
              >
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Nuttapong Silwuti</p>
                  <p className="text-xs text-gray-500">หัวหน้าแผนก</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link 
                      href="/dashboard/user-settings"
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <UserIcon className="w-4 h-4 text-gray-500" />
                      <span>โปรไฟล์ส่วนตัว</span>
                    </Link>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span>เวลาการใช้งาน เหลืออีก <span className="text-green-600 font-medium">14 วัน</span></span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* เมนูสำหรับ Mobile */}
        <div className="lg:hidden px-4 py-2 border-t border-gray-200">
          <nav className="flex space-x-1 overflow-x-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content - ลดระยะห่างจาก topbar */}
      <div className="pt-24"> {/* ลดจาก 32 เป็น 24 (96px) */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Overlay สำหรับปิด dropdown เมื่อคลิกข้างนอก */}
      {(showNotificationDropdown || showSettingDropdown || showProfileDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotificationDropdown(false)
            setShowSettingDropdown(false)
            setShowProfileDropdown(false)
          }}
        />
      )}
    </div>
  )
}
