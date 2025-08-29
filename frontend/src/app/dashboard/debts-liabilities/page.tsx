'use client'

import { useState } from 'react'
import { 
  CreditCardIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalculatorIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Add Debt Popup Component
function AddDebtPopup({ isOpen, onClose, onAdd }: {
  isOpen: boolean
  onClose: () => void
  onAdd: (debt: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    interest: '',
    dueDate: '',
    type: 'credit',
    monthlyPayment: '',
    priority: 'medium'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const debtTypes = [
    { value: 'credit', label: 'บัตรเครดิต' },
    { value: 'car', label: 'รถยนต์' },
    { value: 'house', label: 'บ้าน' },
    { value: 'personal', label: 'ส่วนบุคคล' },
    { value: 'business', label: 'ธุรกิจ' },
    { value: 'other', label: 'อื่นๆ' }
  ]

  const priorities = [
    { value: 'high', label: 'สูง' },
    { value: 'medium', label: 'ปานกลาง' },
    { value: 'low', label: 'ต่ำ' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newDebt = {
        ...formData,
        amount: parseInt(formData.amount),
        interest: parseFloat(formData.interest),
        monthlyPayment: parseInt(formData.monthlyPayment),
        status: 'active',
        id: Date.now()
      }
      onAdd(newDebt)
      setIsSubmitting(false)
      onClose()
      setFormData({
        name: '',
        amount: '',
        interest: '',
        dueDate: '',
        type: 'credit',
        monthlyPayment: '',
        priority: 'medium'
      })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">เพิ่มรายการหนี้สินใหม่</h2>
              <p className="text-red-100 mt-1">กรอกข้อมูลหนี้สินเพื่อเพิ่มเข้าระบบ</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Debt Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อหนี้สิน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="เช่น บัตรเครดิต, สินเชื่อรถ, สินเชื่อบ้าน"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนเงิน (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อัตราดอกเบี้ย (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.0"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันครบกำหนด <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Monthly Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชำระรายเดือน (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="monthlyPayment"
                value={formData.monthlyPayment}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            {/* Debt Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทหนี้สิน
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {debtTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ความสำคัญ
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.value === 'high' ? 'สูง' :
                     priority.value === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>กำลังเพิ่ม...</span>
                </div>
              ) : (
                'เพิ่มหนี้สิน'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DebtsLiabilitiesPage() {
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false)
  const [debts, setDebts] = useState([
    {
      name: 'บัตรเครดิต',
      amount: 15000,
      interest: 18,
      dueDate: '2024-01-25',
      type: 'credit',
      monthlyPayment: 3000,
      status: 'active',
      priority: 'high'
    },
    {
      name: 'สินเชื่อรถ',
      amount: 300000,
      interest: 6.5,
      dueDate: '2024-01-30',
      type: 'car',
      monthlyPayment: 8000,
      status: 'active',
      priority: 'medium'
    },
    {
      name: 'สินเชื่อบ้าน',
      amount: 485000,
      interest: 4.2,
      dueDate: '2024-02-01',
      type: 'house',
      monthlyPayment: 14000,
      status: 'active',
      priority: 'low'
    }
  ])

  // Filter states
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
    search: ''
  })

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter and pagination logic
  const filteredDebts = debts.filter(debt => {
    const matchesType = filters.type === 'all' || debt.type === filters.type
    const matchesPriority = filters.priority === 'all' || debt.priority === filters.priority
    const matchesStatus = filters.status === 'all' || debt.status === filters.status
    const matchesSearch = debt.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         debt.type.toLowerCase().includes(filters.search.toLowerCase())

    return matchesType && matchesPriority && matchesStatus && matchesSearch
  })

  const totalPages = Math.ceil(filteredDebts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDebts = filteredDebts.slice(startIndex, endIndex)

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const totalDebts = {
    amount: 800000,
    monthlyPayment: 25000,
    interestRate: 8.5,
    debtToIncome: 16
  }

  const debtStrategies = {
    snowball: {
      name: 'Debt Snowball',
      description: 'ชำระหนี้ที่มีจำนวนน้อยที่สุดก่อน',
      advantages: ['เห็นผลเร็ว', 'สร้างแรงจูงใจ', 'ลดความเครียด'],
      disadvantages: ['อาจเสียดอกเบี้ยมากกว่า', 'ไม่ประหยัดในระยะยาว'],
      recommended: false
    },
    avalanche: {
      name: 'Debt Avalanche',
      description: 'ชำระหนี้ที่มีดอกเบี้ยสูงที่สุดก่อน',
      advantages: ['ประหยัดดอกเบี้ยมากที่สุด', 'มีประสิทธิภาพในระยะยาว'],
      disadvantages: ['เห็นผลช้า', 'อาจท้อแท้'],
      recommended: true
    }
  }

  const refinancingOpportunities = [
    {
      debt: 'บัตรเครดิต',
      currentRate: 18,
      newRate: 12,
      monthlySavings: 750,
      annualSavings: 9000,
      recommendation: 'รีไฟแนนซ์ทันที'
    },
    {
      debt: 'สินเชื่อรถ',
      currentRate: 6.5,
      newRate: 5.8,
      monthlySavings: 200,
      annualSavings: 2400,
      recommendation: 'พิจารณารีไฟแนนซ์'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'credit': return 'bg-red-100 text-red-800'
      case 'car': return 'bg-yellow-100 text-yellow-800'
      case 'house': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'credit': return 'บัตรเครดิต'
      case 'car': return 'รถยนต์'
      case 'house': return 'บ้าน'
      default: return 'ไม่ระบุ'
    }
  }

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
      case 'active': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'paid': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ชำระปกติ'
      case 'overdue': return 'ค้างชำระ'
      case 'paid': return 'ชำระแล้ว'
      default: return 'ไม่ระบุ'
    }
  }

  const handleAddDebt = (newDebt: any) => {
    setDebts(prev => [...prev, newDebt])
  }

  return (
    <div className="space-y-6">
      {/* Total Debt Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ภาพรวมหนี้สินทั้งหมด</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">หนี้สินรวม</p>
            <p className="text-2xl font-bold text-red-600">฿{totalDebts.amount.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">ชำระรายเดือน</p>
            <p className="text-2xl font-bold text-blue-600">฿{totalDebts.monthlyPayment.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">ดอกเบี้ยเฉลี่ย</p>
            <p className="text-2xl font-bold text-yellow-600">{totalDebts.interestRate}%</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">อัตราส่วนหนี้สิน</p>
            <p className="text-2xl font-bold text-green-600">{totalDebts.debtToIncome}%</p>
          </div>
        </div>
      </div>

      {/* Debt List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">รายการหนี้ทั้งหมด</h3>
          <button
            onClick={() => setIsAddDebtOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>เพิ่มหนี้สิน</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-3">ตัวกรองข้อมูล</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ค้นหา</label>
              <input
                type="text"
                placeholder="ชื่อหนี้สิน..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ประเภท</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="all">ทั้งหมด</option>
                <option value="credit">บัตรเครดิต</option>
                <option value="car">รถยนต์</option>
                <option value="house">บ้าน</option>
                <option value="personal">ส่วนบุคคล</option>
                <option value="business">ธุรกิจ</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ความสำคัญ</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="all">ทั้งหมด</option>
                <option value="high">สูง</option>
                <option value="medium">ปานกลาง</option>
                <option value="low">ต่ำ</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">สถานะ</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="all">ทั้งหมด</option>
                <option value="active">ชำระปกติ</option>
                <option value="overdue">ค้างชำระ</option>
                <option value="paid">ชำระแล้ว</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    type: 'all',
                    priority: 'all',
                    status: 'all',
                    search: ''
                  })
                  setCurrentPage(1)
                }}
                className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                ล้างตัวกรอง
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            แสดง {startIndex + 1}-{Math.min(endIndex, filteredDebts.length)} จาก {filteredDebts.length} รายการ
          </div>
          <div className="text-sm text-gray-600">
            หน้าระหว่าง {currentPage} จาก {totalPages}
          </div>
        </div>

        {/* Debt Items */}
        <div className="space-y-4">
          {currentDebts.map((debt, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{debt.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(debt.type)}`}>
                    {getTypeText(debt.type)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(debt.priority)}`}>
                    ความสำคัญ: {getPriorityText(debt.priority)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(debt.status)}`}>
                    {getStatusText(debt.status)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">จำนวนเงิน:</span>
                  <span className="font-semibold ml-2">฿{debt.amount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">ดอกเบี้ย:</span>
                  <span className="font-semibold ml-2">{debt.interest}%</span>
                </div>
                <div>
                  <span className="text-gray-600">ครบกำหนด:</span>
                  <span className="font-semibold ml-2">{debt.dueDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">ชำระ/เดือน:</span>
                  <span className="font-semibold ml-2">฿{debt.monthlyPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center">
            <nav className="flex items-center space-x-2">
              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                ก่อนหน้า
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    page === currentPage
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                ถัดไป
              </button>
            </nav>
          </div>
        )}

        {/* No Results */}
        {filteredDebts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <CreditCardIcon className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">ไม่พบรายการหนี้สินที่ตรงกับเงื่อนไขการค้นหา</p>
            <button
              onClick={() => {
                setFilters({
                  type: 'all',
                  priority: 'all',
                  status: 'all',
                  search: ''
                })
                setCurrentPage(1)
              }}
              className="mt-2 text-red-600 hover:text-red-700 text-sm"
            >
              ล้างตัวกรอง
            </button>
          </div>
        )}
      </div>

      {/* Debt Repayment Strategies */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนการชำระหนี้</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(debtStrategies).map(([key, strategy]) => (
            <div key={key} className={`border rounded-lg p-4 ${
              strategy.recommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{strategy.name}</h4>
                {strategy.recommended && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    แนะนำ
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">ข้อดี</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {strategy.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">ข้อเสีย</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {strategy.disadvantages.map((disadvantage, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                      <span>{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {strategy.recommended && (
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    แนะนำให้ใช้ {strategy.name} เพื่อประหยัดดอกเบี้ยในระยะยาว
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interest and Monthly Costs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ดอกเบี้ยและค่าใช้จ่ายรายเดือน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">สรุปค่าใช้จ่าย</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ชำระหนี้รายเดือน</span>
                <span className="font-semibold">฿{totalDebts.monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ดอกเบี้ยรายเดือน</span>
                <span className="font-semibold text-red-600">฿{(totalDebts.amount * totalDebts.interestRate / 100 / 12).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ดอกเบี้ยรายปี</span>
                <span className="font-semibold text-red-600">฿{(totalDebts.amount * totalDebts.interestRate / 100).toFixed(0)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวมค่าใช้จ่ายรายเดือน</span>
                <span className="text-red-600">฿{(totalDebts.monthlyPayment + (totalDebts.amount * totalDebts.interestRate / 100 / 12)).toFixed(0)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำการลดดอกเบี้ย</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">บัตรเครดิต</p>
                    <p className="text-sm text-yellow-700">ชำระเต็มจำนวนทุกเดือนเพื่อหลีกเลี่ยงดอกเบี้ย</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">สินเชื่อรถ</p>
                    <p className="text-sm text-blue-700">พิจารณาชำระเพิ่มเพื่อลดระยะเวลาการผ่อน</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refinancing Opportunities */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">โอกาสการรีไฟแนนซ์</h3>
        <div className="space-y-4">
          {refinancingOpportunities.map((opportunity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{opportunity.debt}</h4>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {opportunity.recommendation}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ดอกเบี้ยปัจจุบัน:</span>
                  <span className="font-semibold ml-2">{opportunity.currentRate}%</span>
                </div>
                <div>
                  <span className="text-gray-600">ดอกเบี้ยใหม่:</span>
                  <span className="font-semibold text-green-600 ml-2">{opportunity.newRate}%</span>
                </div>
                <div>
                  <span className="text-gray-600">ประหยัด/เดือน:</span>
                  <span className="font-semibold text-green-600 ml-2">฿{opportunity.monthlySavings.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">ประหยัด/ปี:</span>
                  <span className="font-semibold text-green-600 ml-2">฿{opportunity.annualSavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Debt Restructuring */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การปรับโครงสร้างหนี้</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ตัวเลือกการปรับโครงสร้าง</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CalculatorIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">รวมหนี้หลายรายการ</p>
                    <p className="text-sm text-blue-700">รวมหนี้ที่มีดอกเบี้ยสูงเป็นก้อนเดียว</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">ขยายระยะเวลาผ่อน</p>
                    <p className="text-sm text-green-700">ลดภาระรายเดือนแต่เพิ่มดอกเบี้ยรวม</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">การเจรจาต่อรอง</p>
                    <p className="text-sm text-yellow-700">ติดต่อธนาคารเพื่อขอลดดอกเบี้ย</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำจาก AI</h4>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-purple-900">กลยุทธ์การจัดการหนี้</p>
                  <p className="text-sm text-purple-700">
                    แนะนำให้ใช้ Debt Avalanche method และรีไฟแนนซ์บัตรเครดิตก่อน 
                    เพื่อลดดอกเบี้ยรวมและประหยัดเงินในระยะยาว
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debt Progress Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">กราฟความคืบหน้าการชำระหนี้</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟแสดงความคืบหน้าการชำระหนี้แต่ละรายการ</p>
            <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
      </div>

      {/* Add Debt Button */}
      <button
        onClick={() => setIsAddDebtOpen(true)}
        className="fixed bottom-20 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Add Debt Popup */}
      <AddDebtPopup
        isOpen={isAddDebtOpen}
        onClose={() => setIsAddDebtOpen(false)}
        onAdd={handleAddDebt}
      />
    </div>
  )
}
