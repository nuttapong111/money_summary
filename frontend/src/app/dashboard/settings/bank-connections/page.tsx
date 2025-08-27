'use client'

import { useState } from 'react'
import {
  CreditCardIcon, BuildingLibraryIcon, ArrowPathIcon,
  CheckCircleIcon, ArrowLeftIcon, PlusIcon, XMarkIcon,
  ExclamationTriangleIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountType: string
  balance: number
  lastSync: string
  status: 'connected' | 'disconnected' | 'error'
  isDefault: boolean
}

export default function BankConnectionsPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'ธนาคารกรุงเทพ',
      accountNumber: 'xxx-xxx-1234',
      accountType: 'บัญชีออมทรัพย์',
      balance: 125000,
      lastSync: '2024-01-15 14:30:00',
      status: 'connected',
      isDefault: true
    },
    {
      id: '2',
      bankName: 'ธนาคารกสิกรไทย',
      accountNumber: 'xxx-xxx-5678',
      accountType: 'บัญชีกระแสรายวัน',
      balance: 45000,
      lastSync: '2024-01-15 12:15:00',
      status: 'connected',
      isDefault: false
    },
    {
      id: '3',
      bankName: 'ธนาคารไทยพาณิชย์',
      accountNumber: 'xxx-xxx-9012',
      accountType: 'บัญชีออมทรัพย์',
      balance: 89000,
      lastSync: '2024-01-14 18:45:00',
      status: 'error',
      isDefault: false
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountType: '',
    routingNumber: ''
  })

  const banks = [
    'ธนาคารกรุงเทพ',
    'ธนาคารกสิกรไทย',
    'ธนาคารไทยพาณิชย์',
    'ธนาคารกรุงไทย',
    'ธนาคารกรุงศรีอยุธยา',
    'ธนาคารทหารไทยธนชาต',
    'ธนาคารยูโอบี',
    'ธนาคารซีไอเอ็มบี ไทย',
    'ธนาคารออมสิน',
    'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร'
  ]

  const accountTypes = [
    'บัญชีออมทรัพย์',
    'บัญชีกระแสรายวัน',
    'บัญชีประจำ',
    'บัญชีเงินฝากพิเศษ',
    'บัญชีเงินฝากออมทรัพย์พิเศษ'
  ]

  const syncAccount = (accountId: string) => {
    setBankAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, lastSync: new Date().toLocaleString('th-TH') }
          : account
      )
    )
  }

  const disconnectAccount = (accountId: string) => {
    setBankAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, status: 'disconnected' as const }
          : account
      )
    )
  }

  const reconnectAccount = (accountId: string) => {
    setBankAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, status: 'connected' as const }
          : account
      )
    )
  }

  const setDefaultAccount = (accountId: string) => {
    setBankAccounts(prev => 
      prev.map(account => ({
        ...account,
        isDefault: account.id === accountId
      }))
    )
  }

  const addNewAccount = () => {
    if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.accountType) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const account: BankAccount = {
      id: Date.now().toString(),
      bankName: newAccount.bankName,
      accountNumber: newAccount.accountNumber,
      accountType: newAccount.accountType,
      balance: 0,
      lastSync: new Date().toLocaleString('th-TH'),
      status: 'connected',
      isDefault: bankAccounts.length === 0
    }

    setBankAccounts(prev => [...prev, account])
    setNewAccount({ bankName: '', accountNumber: '', accountType: '', routingNumber: '' })
    setShowAddForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'disconnected':
        return 'bg-gray-100 text-gray-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'เชื่อมต่อแล้ว'
      case 'disconnected':
        return 'ยกเลิกการเชื่อมต่อ'
      case 'error':
        return 'เกิดข้อผิดพลาด'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">การเชื่อมต่อบัญชีธนาคาร</h1>
          <p className="text-gray-600">จัดการการเชื่อมต่อบัญชีธนาคารและข้อมูลการเงิน</p>
        </div>
      </div>

      {/* Add New Account Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">บัญชีธนาคารที่เชื่อมต่อ</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>เพิ่มบัญชีธนาคาร</span>
        </button>
      </div>

      {/* Add New Account Form */}
      {showAddForm && (
        <div className="card border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">เพิ่มบัญชีธนาคารใหม่</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ธนาคาร
              </label>
              <select
                value={newAccount.bankName}
                onChange={(e) => setNewAccount(prev => ({ ...prev, bankName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">เลือกธนาคาร</option>
                {banks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทบัญชี
              </label>
              <select
                value={newAccount.accountType}
                onChange={(e) => setNewAccount(prev => ({ ...prev, accountType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">เลือกประเภทบัญชี</option>
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เลขที่บัญชี
              </label>
              <input
                type="text"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="กรอกเลขที่บัญชี"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เลขที่สาขา (ไม่บังคับ)
              </label>
              <input
                type="text"
                value={newAccount.routingNumber}
                onChange={(e) => setNewAccount(prev => ({ ...prev, routingNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="กรอกเลขที่สาขา"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={addNewAccount}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              เพิ่มบัญชี
            </button>
          </div>
        </div>
      )}

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bankAccounts.map((account) => (
          <div key={account.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BuildingLibraryIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
                  <p className="text-sm text-gray-600">{account.accountType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {account.isDefault && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    หลัก
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(account.status)}`}>
                  {getStatusText(account.status)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">เลขที่บัญชี:</span>
                <span className="text-sm font-medium text-gray-900">{account.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ยอดเงิน:</span>
                <span className="text-sm font-semibold text-gray-900">
                  ฿{account.balance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">อัปเดตล่าสุด:</span>
                <span className="text-sm text-gray-600">{account.lastSync}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => syncAccount(account.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="อัปเดตข้อมูล"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
                {account.status === 'connected' ? (
                  <button
                    onClick={() => disconnectAccount(account.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="ยกเลิกการเชื่อมต่อ"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => reconnectAccount(account.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="เชื่อมต่อใหม่"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex space-x-2">
                {!account.isDefault && (
                  <button
                    onClick={() => setDefaultAccount(account.id)}
                    className="px-3 py-1 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    ตั้งเป็นหลัก
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Information */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <ShieldCheckIcon className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">ความปลอดภัย</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• การเชื่อมต่อใช้เทคโนโลยีการเข้ารหัสแบบ SSL/TLS</li>
              <li>• ข้อมูลบัญชีธนาคารจะถูกเข้ารหัสและเก็บรักษาอย่างปลอดภัย</li>
              <li>• ระบบจะไม่เก็บรหัสผ่านของบัญชีธนาคาร</li>
              <li>• สามารถยกเลิกการเชื่อมต่อได้ทุกเมื่อ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Auto-Sync Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">การตั้งค่าการซิงค์อัตโนมัติ</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">ซิงค์ข้อมูลอัตโนมัติ</h3>
              <p className="text-sm text-gray-600">
                อัปเดตข้อมูลบัญชีธนาคารอัตโนมัติทุกวัน
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">แจ้งเตือนเมื่อยอดเงินเปลี่ยนแปลง</h3>
              <p className="text-sm text-gray-600">
                รับการแจ้งเตือนเมื่อมีการเปลี่ยนแปลงยอดเงินในบัญชี
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
            </button>
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
          onClick={() => console.log('Saving bank connection settings...')}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  )
}
