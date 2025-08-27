'use client'

import { 
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function UserSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock data
  const userProfile = {
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'user@example.com',
    phone: '081-234-5678',
    age: 35,
    occupation: 'พนักงานบริษัท',
    income: '50,000-100,000',
    address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110'
  }

  const riskTolerance = {
    level: 'medium',
    score: 75,
    description: 'คุณยอมรับความเสี่ยงในระดับปานกลาง',
    recommendations: [
      'กระจายการลงทุนในหุ้น 60%',
      'พันธบัตรรัฐบาล 25%',
      'กองทุนรวม 10%',
      'เงินสด 5%'
    ]
  }

  const investmentGoals = [
    {
      name: 'เกษียณอายุ',
      priority: 'high',
      targetAmount: 10000000,
      targetYear: 2045,
      monthlyContribution: 30000
    },
    {
      name: 'บ้านหลังแรก',
      priority: 'medium',
      targetAmount: 2000000,
      targetYear: 2026,
      monthlyContribution: 25000
    },
    {
      name: 'การศึกษาบุตร',
      priority: 'medium',
      targetAmount: 1500000,
      targetYear: 2030,
      monthlyContribution: 20000
    }
  ]

  const notificationSettings = {
    email: {
      enabled: true,
      types: ['การแจ้งเตือนสำคัญ', 'รายงานรายเดือน', 'การแจ้งเตือนการลงทุน']
    },
    push: {
      enabled: true,
      types: ['การแจ้งเตือนด่วน', 'การแจ้งเตือนการชำระเงิน']
    },
    sms: {
      enabled: false,
      types: ['การแจ้งเตือนสำคัญ']
    }
  }

  const bankConnections = [
    {
      bank: 'ธนาคารกรุงเทพ',
      accountType: 'บัญชีออมทรัพย์',
      accountNumber: '123-4-56789-0',
      status: 'connected',
      lastSync: '2024-01-20 15:30:00'
    },
    {
      bank: 'ธนาคารกสิกรไทย',
      accountType: 'บัญชีกระแสรายวัน',
      accountNumber: '987-6-54321-0',
      status: 'pending',
      lastSync: '2024-01-19 10:15:00'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'สูง'
      case 'medium': return 'ปานกลาง'
      case 'low': return 'ต่ำ'
      default: return 'ไม่ระบุ'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'disconnected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'เชื่อมต่อแล้ว'
      case 'pending': return 'รอการยืนยัน'
      case 'disconnected': return 'ยกเลิกการเชื่อมต่อ'
      default: return 'ไม่ระบุ'
    }
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลส่วนบุคคล</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.firstName}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              นามสกุล
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.lastName}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อีเมล
            </label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.email}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เบอร์โทรศัพท์
            </label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.phone}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อายุ
            </label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.age}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อาชีพ
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.occupation}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รายได้ต่อเดือน
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue={userProfile.income}
            >
              <option value="">เลือกช่วงรายได้</option>
              <option value="ต่ำกว่า 25,000">ต่ำกว่า 25,000</option>
              <option value="25,000-50,000">25,000-50,000</option>
              <option value="50,000-100,000">50,000-100,000</option>
              <option value="100,000-200,000">100,000-200,000</option>
              <option value="มากกว่า 200,000">มากกว่า 200,000</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ที่อยู่
            </label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              defaultValue={userProfile.address}
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
            บันทึกข้อมูล
          </button>
        </div>
      </div>

      {/* Risk Tolerance Setting */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ความเสี่ยงที่ยอมรับได้ (Risk Tolerance)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">ระดับความเสี่ยง</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  riskTolerance.level === 'low' ? 'bg-green-100 text-green-800' :
                  riskTolerance.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {riskTolerance.level === 'low' ? 'ต่ำ' :
                   riskTolerance.level === 'medium' ? 'ปานกลาง' : 'สูง'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${riskTolerance.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{riskTolerance.description}</p>
            </div>
            
            <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              ประเมินความเสี่ยงใหม่
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำการลงทุน</h4>
            <div className="space-y-2">
              {riskTolerance.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Goals */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เป้าหมายการลงทุน</h3>
        <div className="space-y-4">
          {investmentGoals.map((goal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{goal.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                  ความสำคัญ: {getPriorityText(goal.priority)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">เป้าหมาย:</span>
                  <span className="font-medium ml-2">฿{goal.targetAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">ปีเป้าหมาย:</span>
                  <span className="font-medium ml-2">{goal.targetYear}</span>
                </div>
                <div>
                  <span className="text-gray-600">ลงทุน/เดือน:</span>
                  <span className="font-medium ml-2">฿{goal.monthlyContribution.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  แก้ไข
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  ลบ
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors">
            + เพิ่มเป้าหมายใหม่
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือน</h3>
        <div className="space-y-6">
          {Object.entries(notificationSettings).map(([type, settings]) => (
            <div key={type} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">
                  {type === 'email' ? 'อีเมล' :
                   type === 'push' ? 'Push Notification' : 'SMS'}
                </h4>
                <button className={`px-3 py-1 rounded-full text-xs ${
                  settings.enabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {settings.enabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </button>
              </div>
              
              <div className="space-y-2">
                {settings.types.map((notificationType, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id={`${type}-${index}`}
                      checked={settings.enabled}
                      className="rounded"
                    />
                    <label htmlFor={`${type}-${index}`} className="text-sm text-gray-700">
                      {notificationType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Account Connections */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การเชื่อมต่อบัญชีธนาคาร</h3>
        <div className="space-y-4">
          {bankConnections.map((connection, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{connection.bank}</h4>
                  <p className="text-sm text-gray-600">{connection.accountType}</p>
                  <p className="text-sm text-gray-500">{connection.accountNumber}</p>
                </div>
                
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(connection.status)}`}>
                    {getStatusText(connection.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    อัปเดตล่าสุด: {connection.lastSync}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {connection.status === 'connected' ? 'จัดการ' : 'เชื่อมต่อ'}
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  ยกเลิกการเชื่อมต่อ
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors">
            + เชื่อมต่อบัญชีธนาคารใหม่
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ความปลอดภัย</h3>
        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">เปลี่ยนรหัสผ่าน</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่านปัจจุบัน
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-10"
                    placeholder="รหัสผ่านปัจจุบัน"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-10"
                    placeholder="รหัสผ่านใหม่"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-10"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-end">
                <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การยืนยันตัวตนแบบ 2 ขั้นตอน</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เพิ่มความปลอดภัยให้กับบัญชีของคุณ</p>
                <p className="text-xs text-gray-500">ใช้แอป Google Authenticator หรือ SMS</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                เปิดใช้งาน
              </button>
            </div>
          </div>
          
          {/* Login History */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ประวัติการเข้าสู่ระบบ</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">การเข้าสู่ระบบล่าสุด</p>
                  <p className="text-sm text-gray-700">IP: 192.168.1.100 | เวลา: 2024-01-20 15:30:00</p>
                  <p className="text-sm text-gray-700">อุปกรณ์: Chrome on Windows 10</p>
                </div>
              </div>
            </div>
            <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
              ดูประวัติทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* Data Export and Deletion */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การจัดการข้อมูล</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ส่งออกข้อมูล</h4>
            <p className="text-sm text-gray-600 mb-3">
              ดาวน์โหลดข้อมูลทั้งหมดของคุณในรูปแบบ JSON หรือ CSV
            </p>
            <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              ส่งออกข้อมูล
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ลบบัญชี</h4>
            <p className="text-sm text-gray-600 mb-3">
              การลบบัญชีจะลบข้อมูลทั้งหมดและไม่สามารถกู้คืนได้
            </p>
            <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
              ลบบัญชี
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
