'use client'

import { useState } from 'react'
import {
  ShieldCheckIcon, KeyIcon, DevicePhoneMobileIcon,
  CheckCircleIcon, ArrowLeftIcon, EyeIcon, EyeSlashIcon,
  ExclamationTriangleIcon, ClockIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SecuritySettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('30')

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [loginHistory] = useState([
    {
      id: 1,
      device: 'iPhone 14 Pro',
      location: 'กรุงเทพฯ, ประเทศไทย',
      ip: '192.168.1.100',
      time: '2024-01-15 14:30:00',
      status: 'success'
    },
    {
      id: 2,
      device: 'MacBook Pro',
      location: 'กรุงเทพฯ, ประเทศไทย',
      ip: '192.168.1.101',
      time: '2024-01-15 10:15:00',
      status: 'success'
    },
    {
      id: 3,
      device: 'Unknown Device',
      location: 'สิงคโปร์',
      ip: '203.0.113.45',
      time: '2024-01-14 22:45:00',
      status: 'failed'
    }
  ])

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }))
  }

  const changePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน')
      return
    }
    // TODO: Implement password change
    console.log('Changing password...')
  }

  const enableTwoFactor = () => {
    setTwoFactorEnabled(true)
    // TODO: Implement 2FA setup
    console.log('Enabling 2FA...')
  }

  const disableTwoFactor = () => {
    setTwoFactorEnabled(false)
    // TODO: Implement 2FA disable
    console.log('Disabling 2FA...')
  }

  const revokeSession = (sessionId: number) => {
    // TODO: Implement session revocation
    console.log('Revoking session:', sessionId)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">การตั้งค่าความปลอดภัย</h1>
          <p className="text-gray-600">จัดการความปลอดภัยของบัญชีและรหัสผ่าน</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <KeyIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">เปลี่ยนรหัสผ่าน</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รหัสผ่านปัจจุบัน
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="รหัสผ่านปัจจุบัน"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="รหัสผ่านใหม่"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ยืนยันรหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="ยืนยันรหัสผ่านใหม่"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={changePassword}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">การยืนยันตัวตนแบบ 2 ขั้นตอน</h2>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Google Authenticator</h3>
            <p className="text-sm text-gray-600">
              ใช้แอป Google Authenticator เพื่อสร้างรหัสยืนยันตัวตน
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 text-sm rounded-full ${
              twoFactorEnabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {twoFactorEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
            </span>
            {twoFactorEnabled ? (
              <button
                onClick={disableTwoFactor}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                ปิดใช้งาน
              </button>
            ) : (
              <button
                onClick={enableTwoFactor}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                เปิดใช้งาน
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <ClockIcon className="w-6 h-6 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-900">การจัดการเซสชัน</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">เวลาหมดอายุเซสชัน</h3>
              <p className="text-sm text-gray-600">
                ตั้งค่าเวลาที่เซสชันจะหมดอายุหลังจากไม่มีการใช้งาน
              </p>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="15">15 นาที</option>
              <option value="30">30 นาที</option>
              <option value="60">1 ชั่วโมง</option>
              <option value="120">2 ชั่วโมง</option>
              <option value="480">8 ชั่วโมง</option>
            </select>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">ประวัติการเข้าสู่ระบบ</h2>
        </div>
        <div className="space-y-3">
          {loginHistory.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {session.status === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{session.device}</h3>
                  <p className="text-sm text-gray-600">
                    {session.location} • {session.ip} • {session.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => revokeSession(session.id)}
                className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                ยกเลิกเซสชัน
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <ShieldCheckIcon className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">คำแนะนำความปลอดภัย</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• ใช้รหัสผ่านที่แข็งแกร่งและไม่ซ้ำกับบัญชีอื่น</li>
              <li>• เปิดใช้งานการยืนยันตัวตนแบบ 2 ขั้นตอน</li>
              <li>• ตรวจสอบประวัติการเข้าสู่ระบบเป็นประจำ</li>
              <li>• ไม่แชร์ข้อมูลการเข้าสู่ระบบกับผู้อื่น</li>
              <li>• ออกจากระบบเมื่อใช้งานเสร็จ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ยกเลิก
        </Link>
        <button
          onClick={() => console.log('Saving security settings...')}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  )
}
