'use client'

import { useState } from 'react'
import {
  BanknotesIcon, PlusIcon, FunnelIcon, CalendarIcon,
  ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon,
  XMarkIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: string
  isRecurring: boolean
}

interface CategorySummary {
  category: string
  total: number
  count: number
  percentage: number
}

export default function IncomeExpensesPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    search: ''
  })

  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'เงินเดือน',
      amount: 45000,
      description: 'เงินเดือนประจำเดือน',
      date: '2024-01-15',
      isRecurring: true
    },
    {
      id: '2',
      type: 'income',
      category: 'เงินปันผล',
      amount: 2500,
      description: 'เงินปันผลจากหุ้น',
      date: '2024-01-10',
      isRecurring: false
    },
    {
      id: '3',
      type: 'income',
      category: 'ดอกเบี้ย',
      amount: 1500,
      description: 'ดอกเบี้ยเงินฝาก',
      date: '2024-01-20',
      isRecurring: true
    },
    {
      id: '4',
      type: 'income',
      category: 'งานพิเศษ',
      amount: 8000,
      description: 'งานสอนพิเศษ',
      date: '2024-01-25',
      isRecurring: false
    },
    {
      id: '5',
      type: 'expense',
      category: 'ค่าอาหาร',
      amount: 8000,
      description: 'ค่าอาหารประจำเดือน',
      date: '2024-01-15',
      isRecurring: true
    },
    {
      id: '6',
      type: 'expense',
      category: 'ค่าที่พัก',
      amount: 15000,
      description: 'ค่าเช่าห้องพัก',
      date: '2024-01-01',
      isRecurring: true
    },
    {
      id: '7',
      type: 'expense',
      category: 'ค่าขนส่ง',
      amount: 3000,
      description: 'ค่าแท็กซี่และรถเมล์',
      date: '2024-01-15',
      isRecurring: true
    },
    {
      id: '8',
      type: 'expense',
      category: 'ค่าไฟฟ้า',
      amount: 2500,
      description: 'ค่าไฟฟ้าประจำเดือน',
      date: '2024-01-20',
      isRecurring: true
    },
    {
      id: '9',
      type: 'expense',
      category: 'ค่าน้ำ',
      amount: 800,
      description: 'ค่าน้ำประปา',
      date: '2024-01-20',
      isRecurring: true
    },
    {
      id: '10',
      type: 'expense',
      category: 'ค่าโทรศัพท์',
      amount: 1200,
      description: 'ค่าโทรศัพท์มือถือ',
      date: '2024-01-15',
      isRecurring: true
    },
    {
      id: '11',
      type: 'expense',
      category: 'ค่าอินเทอร์เน็ต',
      amount: 800,
      description: 'ค่าอินเทอร์เน็ตบ้าน',
      date: '2024-01-15',
      isRecurring: true
    },
    {
      id: '12',
      type: 'expense',
      category: 'ค่าสันทนาการ',
      amount: 5000,
      description: 'ค่าดูหนังและทานอาหารนอกบ้าน',
      date: '2024-01-22',
      isRecurring: false
    }
  ])

  const incomeCategories = [
    'เงินเดือน', 'เงินปันผล', 'ดอกเบี้ย', 'ค่าเช่า', 'งานพิเศษ', 'อื่นๆ'
  ]

  const expenseCategories = [
    'ค่าอาหาร', 'ค่าที่พัก', 'ค่าขนส่ง', 'ค่าไฟฟ้า', 'ค่าน้ำ', 'ค่าโทรศัพท์', 'ค่าอินเทอร์เน็ต', 'ค่าสันทนาการ', 'อื่นๆ'
  ]

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.description) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
      isRecurring: newTransaction.isRecurring
    }

    setTransactions(prev => [transaction, ...prev])
    setNewTransaction({
      type: 'income',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false
    })
    setShowAddForm(false)
    setCurrentPage(1) // Reset to first page when adding new transaction
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setNewTransaction({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: transaction.date,
      isRecurring: transaction.isRecurring
    })
    setShowAddForm(true)
  }

  const handleUpdateTransaction = () => {
    if (!editingTransaction) return

    const updatedTransaction: Transaction = {
      ...editingTransaction,
      type: newTransaction.type,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
      isRecurring: newTransaction.isRecurring
    }

    setTransactions(prev => 
      prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t)
    )
    
    setEditingTransaction(null)
    setNewTransaction({
      type: 'income',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false
    })
    setShowAddForm(false)
  }

  const handleDeleteTransaction = (id: string) => {
    if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      setTransactions(prev => prev.filter(t => t.id !== id))
      // Reset to first page if current page becomes empty
      const totalPages = Math.ceil((filteredTransactions.length - 1) / itemsPerPage)
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages)
      }
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false
    if (filters.category !== 'all' && transaction.category !== filters.category) return false
    if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false
    if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false
    if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  // Calculate category summaries
  const getCategorySummary = (type: 'income' | 'expense'): CategorySummary[] => {
    const typeTransactions = filteredTransactions.filter(t => t.type === type)
    const total = typeTransactions.reduce((sum, t) => sum + t.amount, 0)
    
    const categoryMap = new Map<string, number>()
    typeTransactions.forEach(t => {
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount)
    })
    
    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        total: amount,
        count: typeTransactions.filter(t => t.category === category).length,
        percentage: total > 0 ? (amount / total) * 100 : 0
      }))
      .sort((a, b) => b.total - a.total)
  }

  const incomeSummary = getCategorySummary('income')
  const expenseSummary = getCategorySummary('expense')

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const netAmount = totalIncome - totalExpense

  const resetFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      dateRange: 'all',
      minAmount: '',
      maxAmount: '',
      search: ''
    })
    setCurrentPage(1) // Reset to first page when clearing filters
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">รายรับ-รายจ่าย</h1>
          <p className="text-gray-600">จัดการรายรับและรายจ่ายของคุณ</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>เพิ่มรายการ</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <ArrowTrendingUpIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">รายรับรวม</p>
              <p className="text-2xl font-bold text-green-900">฿{totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <ArrowTrendingDownIcon className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-red-600">รายจ่ายรวม</p>
              <p className="text-2xl font-bold text-red-900">฿{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className={`card ${netAmount >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center space-x-3">
            <ChartBarIcon className={`w-8 h-8 ${netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            <div>
              <p className={`text-sm ${netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>ยอดสุทธิ</p>
              <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                ฿{netAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
            <span>รายรับตามประเภท</span>
          </h3>
          {incomeSummary.length > 0 ? (
            <div className="space-y-3">
              {incomeSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">{item.count} รายการ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">฿{item.total.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              ไม่มีรายรับในหมวดหมู่ที่เลือก
            </div>
          )}
        </div>

        {/* Expense Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />
            <span>รายจ่ายตามประเภท</span>
          </h3>
          {expenseSummary.length > 0 ? (
            <div className="space-y-3">
              {expenseSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">{item.count} รายการ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-semibold">฿{item.total.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              ไม่มีรายจ่ายในหมวดหมู่ที่เลือก
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">ตัวกรองข้อมูล</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FunnelIcon className="w-5 h-5" />
            <span>{showFilters ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ประเภท</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">ทั้งหมด</option>
                <option value="income">รายรับ</option>
                <option value="expense">รายจ่าย</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">ทั้งหมด</option>
                {filters.type === 'income' || filters.type === 'all' ? 
                  incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>) : null
                }
                {filters.type === 'expense' || filters.type === 'all' ? 
                  expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>) : null
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ช่วงวันที่</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">ทั้งหมด</option>
                <option value="today">วันนี้</option>
                <option value="week">สัปดาห์นี้</option>
                <option value="month">เดือนนี้</option>
                <option value="year">ปีนี้</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงินขั้นต่ำ</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงินสูงสุด</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                placeholder="ไม่จำกัด"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค้นหา</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="ค้นหาจากคำอธิบาย"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                รีเซ็ตตัวกรอง
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Transaction Form */}
      {showAddForm && (
        <div className="card border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingTransaction ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingTransaction(null)
                setNewTransaction({
                  type: 'income',
                  category: '',
                  amount: '',
                  description: '',
                  date: new Date().toISOString().split('T')[0],
                  isRecurring: false
                })
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ประเภท</label>
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction(prev => ({ 
                  ...prev, 
                  type: e.target.value as 'income' | 'expense',
                  category: '' // Reset category when type changes
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="income">รายรับ</option>
                <option value="expense">รายจ่าย</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">เลือกหมวดหมู่</option>
                {newTransaction.type === 'income' ? 
                  incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>) :
                  expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนเงิน</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">วันที่</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">คำอธิบาย</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                placeholder="อธิบายรายการนี้"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newTransaction.isRecurring}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, isRecurring: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">รายการที่เกิดขึ้นเป็นประจำ</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingTransaction(null)
                setNewTransaction({
                  type: 'income',
                  category: '',
                  amount: '',
                  description: '',
                  date: new Date().toISOString().split('T')[0],
                  isRecurring: false
                })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {editingTransaction ? 'อัปเดต' : 'เพิ่มรายการ'}
            </button>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">รายการทั้งหมด</h2>
          <p className="text-sm text-gray-600">
            แสดง {filteredTransactions.length} รายการจากทั้งหมด {transactions.length} รายการ
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  คำอธิบาย
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนเงิน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>{transaction.description}</span>
                      {transaction.isRecurring && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ประจำ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="แก้ไข"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="ลบ"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              แสดง {startIndex + 1} ถึง {Math.min(endIndex, filteredTransactions.length)} จาก {filteredTransactions.length} รายการ
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          page === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-2 text-gray-400">...</span>
                  }
                  return null
                })}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <BanknotesIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">ไม่พบรายการที่ตรงกับตัวกรอง</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-primary-600 hover:text-primary-700"
            >
              ล้างตัวกรอง
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
