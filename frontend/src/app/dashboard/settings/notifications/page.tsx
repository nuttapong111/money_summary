'use client'

import { useState } from 'react'
import {
  BellIcon, EnvelopeIcon, DevicePhoneMobileIcon,
  CheckCircleIcon, XCircleIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NotificationsSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    loginAlerts: true,
    paymentUpdates: true,
    investmentAlerts: true,
    marketNews: false,
    weeklyReports: true,
    securityAlerts: true
  })

  const [smsNotifications, setSmsNotifications] = useState({
    loginAlerts: false,
    paymentUpdates: true,
    securityAlerts: true
  })

  const [pushNotifications, setPushNotifications] = useState({
    loginAlerts: true,
    paymentUpdates: true,
    investmentAlerts: true,
    marketNews: false
  })

  const handleToggle = (type: string, key: string, value: boolean) => {
    switch (type) {
      case 'email':
        setEmailNotifications(prev => ({ ...prev, [key]: value }))
        break
      case 'sms':
        setSmsNotifications(prev => ({ ...prev, [key]: value }))
        break
      case 'push':
        setPushNotifications(prev => ({ ...prev, [key]: value }))
        break
    }
  }

  const saveSettings = () => {
    // TODO: Save to backend
    console.log('Saving notification settings...')
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
          <h1 className="text-2xl font-bold text-gray-900">การตั้งค่าการแจ้งเตือน</h1>
          <p className="text-gray-600">จัดการการแจ้งเตือนต่างๆ ของระบบ</p>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <EnvelopeIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">การแจ้งเตือนทางอีเมล</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  {key === 'loginAlerts' && 'แจ้งเตือนการเข้าสู่ระบบ'}
                  {key === 'paymentUpdates' && 'อัปเดตการชำระเงิน'}
                  {key === 'investmentAlerts' && 'แจ้งเตือนการลงทุน'}
                  {key === 'marketNews' && 'ข่าวสารตลาด'}
                  {key === 'weeklyReports' && 'รายงานรายสัปดาห์'}
                  {key === 'securityAlerts' && 'แจ้งเตือนความปลอดภัย'}
                </h3>
                <p className="text-sm text-gray-600">
                  {key === 'loginAlerts' && 'รับการแจ้งเตือนเมื่อมีการเข้าสู่ระบบจากอุปกรณ์ใหม่'}
                  {key === 'paymentUpdates' && 'รับการอัปเดตสถานะการชำระเงินและแพ็คเกจ'}
                  {key === 'investmentAlerts' && 'รับการแจ้งเตือนเกี่ยวกับการลงทุนและผลตอบแทน'}
                  {key === 'marketNews' && 'รับข่าวสารและแนวโน้มตลาดที่เกี่ยวข้อง'}
                  {key === 'weeklyReports' && 'รับรายงานสรุปการเงินรายสัปดาห์'}
                  {key === 'securityAlerts' && 'รับการแจ้งเตือนเกี่ยวกับความปลอดภัยของบัญชี'}
                </p>
              </div>
              <button
                onClick={() => handleToggle('email', key, !value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">การแจ้งเตือนทาง SMS</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(smsNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  {key === 'loginAlerts' && 'แจ้งเตือนการเข้าสู่ระบบ'}
                  {key === 'paymentUpdates' && 'อัปเดตการชำระเงิน'}
                  {key === 'securityAlerts' && 'แจ้งเตือนความปลอดภัย'}
                </h3>
                <p className="text-sm text-gray-600">
                  {key === 'loginAlerts' && 'รับการแจ้งเตือนทาง SMS เมื่อมีการเข้าสู่ระบบ'}
                  {key === 'paymentUpdates' && 'รับการอัปเดตสถานะการชำระเงินทาง SMS'}
                  {key === 'securityAlerts' && 'รับการแจ้งเตือนความปลอดภัยทาง SMS'}
                </p>
              </div>
              <button
                onClick={() => handleToggle('sms', key, !value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <BellIcon className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">การแจ้งเตือนแบบ Push</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  {key === 'loginAlerts' && 'แจ้งเตือนการเข้าสู่ระบบ'}
                  {key === 'paymentUpdates' && 'อัปเดตการชำระเงิน'}
                  {key === 'investmentAlerts' && 'แจ้งเตือนการลงทุน'}
                  {key === 'marketNews' && 'ข่าวสารตลาด'}
                </h3>
                <p className="text-sm text-gray-600">
                  {key === 'loginAlerts' && 'รับการแจ้งเตือนแบบ Push เมื่อมีการเข้าสู่ระบบ'}
                  {key === 'paymentUpdates' && 'รับการอัปเดตสถานะการชำระเงินแบบ Push'}
                  {key === 'investmentAlerts' && 'รับการแจ้งเตือนการลงทุนแบบ Push'}
                  {key === 'marketNews' && 'รับข่าวสารตลาดแบบ Push'}
                </p>
              </div>
              <button
                onClick={() => handleToggle('push', key, !value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">การตั้งค่าการแจ้งเตือนเพิ่มเติม</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เวลาที่เหมาะสมสำหรับการแจ้งเตือน
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="9-18">9:00 - 18:00</option>
              <option value="8-20">8:00 - 20:00</option>
              <option value="24h">ตลอด 24 ชั่วโมง</option>
              <option value="custom">กำหนดเอง</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ความถี่ของการแจ้งเตือน
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="immediate">ทันที</option>
              <option value="hourly">ทุกชั่วโมง</option>
              <option value="daily">รายวัน</option>
              <option value="weekly">รายสัปดาห์</option>
            </select>
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
          onClick={saveSettings}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  )
}
