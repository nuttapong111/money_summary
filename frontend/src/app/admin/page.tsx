'use client'

import { useState } from 'react'
import { 
  UsersIcon, 
  CubeIcon,
  CreditCardIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = {
    totalUsers: 1250,
    activeUsers: 980,
    totalRevenue: 1250000,
    pendingPayments: 15
  }

  const recentUsers = [
    { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', plan: 'Basic', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'สมหญิง รักดี', email: 'somying@example.com', plan: 'Premium', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'สมศักดิ์ มั่นคง', email: 'somsak@example.com', plan: 'Free', status: 'trial', joinDate: '2024-01-13' },
    { id: 4, name: 'สมปอง ใจเย็น', email: 'sompong@example.com', plan: 'Basic', status: 'inactive', joinDate: '2024-01-12' }
  ]

  const packages = [
    { id: 1, name: 'Free Trial', price: 0, duration: '30 วัน', features: ['Dashboard พื้นฐาน', 'ติดตามรายรับรายจ่าย'], status: 'active' },
    { id: 2, name: 'Basic', price: 299, duration: 'เดือน', features: ['ทุกอย่างใน Free Trial', 'วิเคราะห์สุขภาพทางการเงิน'], status: 'active' },
    { id: 3, name: 'Premium', price: 599, duration: 'เดือน', features: ['ทุกอย่างใน Basic', 'การลงทุนขั้นสูง'], status: 'active' },
    { id: 4, name: 'Enterprise', price: 1299, duration: 'เดือน', features: ['ทุกอย่างใน Premium', 'API Access'], status: 'draft' }
  ]

  const payments = [
    { id: 1, user: 'สมชาย ใจดี', email: 'somchai@example.com', plan: 'Basic', amount: 299, status: 'pending', date: '2024-01-15' },
    { id: 2, user: 'สมหญิง รักดี', email: 'somying@example.com', plan: 'Premium', amount: 599, status: 'approved', date: '2024-01-14' },
    { id: 3, user: 'สมศักดิ์ มั่นคง', email: 'somsak@example.com', plan: 'Basic', amount: 299, status: 'rejected', date: '2024-01-13' },
    { id: 4, user: 'สมปอง ใจเย็น', email: 'sompong@example.com', plan: 'Premium', amount: 599, status: 'pending', date: '2024-01-12' }
  ]

  const tabs = [
    { id: 'overview', name: 'ภาพรวม', icon: ChartBarIcon },
    { id: 'users', name: 'จัดการผู้ใช้งาน', icon: UsersIcon },
    { id: 'packages', name: 'จัดการแพคเกจ', icon: CubeIcon },
    { id: 'payments', name: 'การชำระเงิน', icon: CreditCardIcon }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ผู้ใช้งานทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ผู้ใช้งานที่ใช้งาน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">รายได้รวม</p>
              <p className="text-2xl font-bold text-gray-900">฿{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">รอการอนุมัติ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ผู้ใช้งานล่าสุด</h3>
          <div className="space-y-3">
            {recentUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'ใช้งาน' : user.status === 'trial' ? 'ทดลอง' : 'ไม่ใช้งาน'}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{user.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การชำระเงินล่าสุด</h3>
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{payment.user}</p>
                  <p className="text-sm text-gray-500">{payment.plan}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status === 'approved' ? 'อนุมัติแล้ว' : 
                     payment.status === 'pending' ? 'รอการอนุมัติ' : 'ปฏิเสธ'}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">฿{payment.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">จัดการผู้ใช้งาน</h3>
        <button className="btn-primary">เพิ่มผู้ใช้งาน</button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ใช้งาน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">แพคเกจ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่สมัคร</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.plan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'ใช้งาน' : user.status === 'trial' ? 'ทดลอง' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">แก้ไข</button>
                    <button className="text-red-600 hover:text-red-900">ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPackages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">จัดการแพคเกจ</h3>
        <button className="btn-primary">เพิ่มแพคเกจ</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {pkg.status === 'active' ? 'ใช้งาน' : 'ร่าง'}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-primary-600">
                {pkg.price === 0 ? 'ฟรี' : `฿${pkg.price}`}
              </span>
              <span className="text-gray-500 ml-2">/{pkg.duration}</span>
            </div>

            <ul className="space-y-2 mb-4">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex space-x-2">
              <button className="btn-secondary flex-1">แก้ไข</button>
              <button className="btn-primary flex-1">จัดการ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">การชำระเงิน</h3>
        <div className="flex space-x-2">
          <button className="btn-secondary">ส่งออก</button>
          <button className="btn-primary">อนุมัติทั้งหมด</button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ใช้งาน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">แพคเกจ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนเงิน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.user}</div>
                      <div className="text-sm text-gray-500">{payment.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{payment.plan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">฿{payment.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status === 'approved' ? 'อนุมัติแล้ว' : 
                       payment.status === 'pending' ? 'รอการอนุมัติ' : 'ปฏิเสธ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 mr-3">อนุมัติ</button>
                        <button className="text-red-600 hover:text-red-900">ปฏิเสธ</button>
                      </>
                    )}
                    {payment.status === 'approved' && (
                      <span className="text-green-600">อนุมัติแล้ว</span>
                    )}
                    {payment.status === 'rejected' && (
                      <span className="text-red-600">ปฏิเสธแล้ว</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'users':
        return renderUsers()
      case 'packages':
        return renderPackages()
      case 'payments':
        return renderPayments()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}
