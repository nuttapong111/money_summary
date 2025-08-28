'use client'

import { useState, useEffect } from 'react'
import {
  BanknotesIcon, PlusIcon, FunnelIcon, CalendarIcon,
  ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon,
  XMarkIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon,
  CogIcon, ExclamationTriangleIcon, CheckCircleIcon
} from '@heroicons/react/24/outline'

// กำหนดโครงสร้างหมวดหมู่จากแผนการเงิน
interface FinancialCategory {
  id: string
  name: string
  percentage: number
  amount: number
  color: string
  description: string
}

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

interface MonthlyBudget {
  category: string
  budget: number
  spent: number
  remaining: number
  status: 'under' | 'over' | 'warning'
  linkedToFinancialPlan: boolean
  financialPlanCategory?: string // เพิ่มฟิลด์ใหม่
}

interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: 'low' | 'medium' | 'high'
  description: string
}

export default function IncomeExpensesPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showBudgetSettings, setShowBudgetSettings] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  // เพิ่ม state สำหรับแผนการเงิน
  const [financialPlanCategories, setFinancialPlanCategories] = useState<FinancialCategory[]>([])
  const [monthlyIncome, setMonthlyIncome] = useState(50000)
  
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

  // Monthly budget settings - ปรับปรุงให้เชื่อมโยงกับแผนการเงิน
  const [monthlyBudgets, setMonthlyBudgets] = useState<MonthlyBudget[]>([
    { category: 'ค่าอาหาร', budget: 15000, spent: 8000, remaining: 7000, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าที่พัก', budget: 20000, spent: 15000, remaining: 5000, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าขนส่ง', budget: 5000, spent: 3000, remaining: 2000, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าไฟฟ้า', budget: 3000, spent: 2500, remaining: 500, status: 'warning', linkedToFinancialPlan: false },
    { category: 'ค่าน้ำ', budget: 1000, spent: 800, remaining: 200, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าโทรศัพท์', budget: 1500, spent: 1200, remaining: 300, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าอินเทอร์เน็ต', budget: 1000, spent: 800, remaining: 200, status: 'under', linkedToFinancialPlan: false },
    { category: 'ค่าสันทนาการ', budget: 8000, spent: 5000, remaining: 3000, status: 'under', linkedToFinancialPlan: false }
  ])

  // Monthly data for charts
  const [monthlyData, setMonthlyData] = useState([
    { month: 'ม.ค. 2024', income: 57000, expenses: 43000, balance: 14000 },
    { month: 'ก.พ. 2024', income: 57000, expenses: 41000, balance: 16000 },
    { month: 'มี.ค. 2024', income: 57000, expenses: 45000, balance: 12000 },
    { month: 'เม.ย. 2024', income: 57000, expenses: 42000, balance: 15000 },
    { month: 'พ.ค. 2024', income: 57000, expenses: 48000, balance: 9000 },
    { month: 'มิ.ย. 2024', income: 57000, expenses: 40000, balance: 17000 },
    { month: 'ก.ค. 2024', income: 57000, expenses: 44000, balance: 13000 },
    { month: 'ส.ค. 2024', income: 57000, expenses: 46000, balance: 11000 },
    { month: 'ก.ย. 2024', income: 57000, expenses: 42000, balance: 15000 },
    { month: 'ต.ค. 2024', income: 57000, expenses: 45000, balance: 12000 },
    { month: 'พ.ย. 2024', income: 57000, expenses: 43000, balance: 14000 },
    { month: 'ธ.ค. 2024', income: 57000, expenses: 47000, balance: 10000 }
  ])

  // Budget management states
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [editingBudget, setEditingBudget] = useState<MonthlyBudget | null>(null)
  const [newBudget, setNewBudget] = useState({
    category: '',
    budget: '',
    spent: '',
    linkedToFinancialPlan: false,
    financialPlanCategory: ''
  })

  // เพิ่มฟังก์ชันสำหรับโหลดข้อมูลแผนการเงิน
  useEffect(() => {
    loadFinancialPlanData()
  }, [])

  const loadFinancialPlanData = () => {
    // Mock data - ในอนาคตจะดึงจาก API หรือ localStorage
    const mockFinancialPlan = [
      {
        id: '1',
        name: 'ความต้องการจำเป็น',
        percentage: 50,
        amount: monthlyIncome * 0.5,
        color: '#EF4444',
        description: 'ค่าผ่อนรถ, ค่าบ้าน, อาหาร, ค่าสาธารณูปโภค'
      },
      {
        id: '2',
        name: 'ความต้องการ',
        percentage: 30,
        amount: monthlyIncome * 0.3,
        color: '#F59E0B',
        description: 'บันเทิง, ช้อปปิ้ง, ท่องเที่ยว, งานอดิเรก'
      },
      {
        id: '3',
        name: 'การออมและลงทุน',
        percentage: 20,
        amount: monthlyIncome * 0.2,
        color: '#3B82F6',
        description: 'เงินออม, ลงทุน, เงินฉุกเฉิน, ประกัน'
      }
    ]
    
    setFinancialPlanCategories(mockFinancialPlan)
  }

  // ฟังก์ชันตรวจสอบยอดรวมไม่เกินที่ตั้งไว้
  const checkBudgetLimit = (category: string, newBudget: number): boolean => {
    const financialCategory = financialPlanCategories.find(cat => cat.name === category)
    if (!financialCategory) return true // ถ้าไม่ใช่หมวดหมู่จากแผนการเงิน ให้ผ่าน
    
    const totalBudgetForCategory = monthlyBudgets
      .filter(budget => budget.linkedToFinancialPlan && budget.financialPlanCategory === category)
      .reduce((sum, budget) => sum + budget.budget, 0)
    
    const newTotal = totalBudgetForCategory + newBudget
    return newTotal <= financialCategory.amount
  }

  // ฟังก์ชันคำนวณยอดคงเหลือจากแผนการเงิน
  const getRemainingFromFinancialPlan = (category: string): number => {
    const financialCategory = financialPlanCategories.find(cat => cat.name === category)
    if (!financialCategory) return 0
    
    const totalBudgetForCategory = monthlyBudgets
      .filter(budget => budget.linkedToFinancialPlan && budget.financialPlanCategory === category)
      .reduce((sum, budget) => sum + budget.budget, 0)
    
    return financialCategory.amount - totalBudgetForCategory
  }

  // Financial Goals states
  const [showFinancialGoals, setShowFinancialGoals] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null)
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: ''
  })

  // Mock data for financial goals
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      name: 'ซื้อบ้าน',
      targetAmount: 5000000,
      currentAmount: 1500000,
      deadline: '2028-12-31',
      category: 'อสังหาฯ',
      priority: 'high',
      description: 'เก็บเงินซื้อบ้านหลังแรก'
    },
    {
      id: '2',
      name: 'รถยนต์ใหม่',
      targetAmount: 800000,
      currentAmount: 300000,
      deadline: '2025-06-30',
      category: 'ยานพาหนะ',
      priority: 'medium',
      description: 'เปลี่ยนรถยนต์เก่าเป็นรถใหม่'
    },
    {
      id: '3',
      name: 'ทุนการศึกษา',
      targetAmount: 200000,
      currentAmount: 80000,
      deadline: '2026-08-31',
      category: 'การศึกษา',
      priority: 'high',
      description: 'เก็บเงินเรียนต่อปริญญาโท'
    },
    {
      id: '4',
      name: 'เงินฉุกเฉิน',
      targetAmount: 300000,
      currentAmount: 250000,
      deadline: '2024-12-31',
      category: 'เงินฉุกเฉิน',
      priority: 'high',
      description: 'เงินสำรองสำหรับกรณีฉุกเฉิน'
    }
  ])

  // ฟังก์ชันสำหรับจัดการเป้าหมายทางการเงิน
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const goal: FinancialGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority,
      description: newGoal.description
    }

    setFinancialGoals(prev => [...prev, goal])
    setNewGoal({
      name: '',
      targetAmount: '',
      deadline: '',
      category: '',
      priority: 'medium',
      description: ''
    })
    setShowAddGoal(false)
  }

  const handleEditGoal = () => {
    if (!editingGoal) return

    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const updatedGoal: FinancialGoal = {
      ...editingGoal,
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority,
      description: newGoal.description
    }

    setFinancialGoals(prev => prev.map(goal => 
      goal.id === editingGoal.id ? updatedGoal : goal
    ))
    setEditingGoal(null)
    setNewGoal({
      name: '',
      targetAmount: '',
      deadline: '',
      category: '',
      priority: 'medium',
      description: ''
    })
    setShowAddGoal(false)
  }

  const handleDeleteGoal = (id: string) => {
    if (confirm('คุณต้องการลบเป้าหมายนี้หรือไม่?')) {
      setFinancialGoals(prev => prev.filter(goal => goal.id !== id))
    }
  }

  const handleAddMoneyToGoal = (goalId: string, amount: number) => {
    setFinancialGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    ))
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
      const newTotalPages = Math.ceil((filteredTransactions.length - 1) / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
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

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

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

  // Budget management functions
  const handleAddBudget = () => {
    if ((newBudget.linkedToFinancialPlan && newBudget.financialPlanCategory) || (!newBudget.linkedToFinancialPlan && newBudget.category)) {
      if (!newBudget.budget) {
        alert('กรุณากรอกงบประมาณ')
        return
      }

      const budget = parseFloat(newBudget.budget)
      const spent = parseFloat(newBudget.spent) || 0
      const remaining = budget - spent
      
      // ตรวจสอบว่างบประมาณไม่เกินที่ตั้งไว้ในแผนการเงิน
      if (newBudget.linkedToFinancialPlan && newBudget.financialPlanCategory) {
        const selectedCategory = financialPlanCategories.find(cat => cat.name === newBudget.financialPlanCategory)
        if (selectedCategory) {
          const totalBudgetForCategory = monthlyBudgets
            .filter(b => b.linkedToFinancialPlan && b.financialPlanCategory === newBudget.financialPlanCategory)
            .reduce((sum, b) => sum + b.budget, 0)
          
          if (totalBudgetForCategory + budget > selectedCategory.amount) {
            alert(`งบประมาณรวมจะเกินที่ตั้งไว้ในแผนการเงิน (${(totalBudgetForCategory + budget).toLocaleString()} > ${selectedCategory.amount.toLocaleString()})`)
            return
          }
        }
      }
      
      setMonthlyBudgets(prev => [...prev, {
        category: newBudget.linkedToFinancialPlan ? newBudget.financialPlanCategory! : newBudget.category,
        budget,
        spent,
        remaining,
        status: remaining < 0 ? 'over' : remaining < budget * 0.2 ? 'warning' : 'under',
        linkedToFinancialPlan: newBudget.linkedToFinancialPlan,
        financialPlanCategory: newBudget.financialPlanCategory
      }])
      
      setNewBudget({ category: '', budget: '', spent: '', linkedToFinancialPlan: false, financialPlanCategory: '' })
      setShowAddBudget(false)
    } else {
      alert('กรุณาเลือกหมวดหมู่หรือเชื่อมโยงกับแผนการเงิน')
    }
  }

  const handleEditBudget = (budget: MonthlyBudget) => {
    setEditingBudget(budget)
    setNewBudget({
      category: budget.category,
      budget: budget.budget.toString(),
      spent: budget.spent.toString(),
      linkedToFinancialPlan: budget.linkedToFinancialPlan,
      financialPlanCategory: budget.financialPlanCategory || ''
    })
    setShowAddBudget(true)
  }

  const handleUpdateBudget = () => {
    if (editingBudget && newBudget.category && newBudget.budget) {
      const budget = parseFloat(newBudget.budget)
      const spent = parseFloat(newBudget.spent) || 0
      const remaining = budget - spent
      
      setMonthlyBudgets(prev => prev.map(b => 
        b.category === editingBudget.category 
          ? { ...b, budget, spent, remaining, status: remaining < 0 ? 'over' : remaining < budget * 0.2 ? 'warning' : 'under', linkedToFinancialPlan: newBudget.linkedToFinancialPlan, financialPlanCategory: newBudget.financialPlanCategory }
          : b
      ))
      
      setNewBudget({ category: '', budget: '', spent: '', linkedToFinancialPlan: false, financialPlanCategory: '' })
      setEditingBudget(null)
      setShowAddBudget(false)
    }
  }

  const handleDeleteBudget = (category: string) => {
    if (confirm(`คุณต้องการลบหมวดหมู่ "${category}" หรือไม่?`)) {
      setMonthlyBudgets(prev => prev.filter(b => b.category !== category))
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">รายรับ-รายจ่าย</h1>
              <p className="text-sm sm:text-base text-gray-600">จัดการรายรับและรายจ่ายของคุณ</p>
            </div>
          </div>
        
        {/* Action Buttons - Full Width on Mobile */}
        <div className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => setShowFinancialGoals(true)}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
            >
              <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>เป้าหมายการเงิน</span>
            </button>

            <button
              onClick={() => setShowBudgetSettings(true)}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
            >
              <CogIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>ตั้งค่าค่าใช้จ่าย</span>
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
            >
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>เพิ่มรายการ</span>
            </button>
          </div>
        </div>
              </div>
        
        {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="card bg-green-50 border-green-200 p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ArrowTrendingUpIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-green-600">รายรับรวม</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-900 truncate">฿{totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200 p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ArrowTrendingDownIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-red-600">รายจ่ายรวม</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-900 truncate">฿{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className={`card ${netAmount >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} p-3 sm:p-4`}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ChartBarIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'} flex-shrink-0`} />
            <div className="min-w-0 flex-1">
              <p className={`text-xs sm:text-sm ${netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>ยอดสุทธิ</p>
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold ${netAmount >= 0 ? 'text-blue-900' : 'text-orange-900'} truncate`}>
                ฿{netAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Income vs Expenses Chart */}
      <div className="card">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
          <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
          <span className="text-sm sm:text-base">กราฟรายรับ-รายจ่ายรายเดือน (12 เดือนล่าสุด)</span>
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[1500px] sm:min-w-[800px] lg:min-w-[1200px] xl:min-w-[1500px]">
            {/* Chart Container with Y-axis */}
            <div className="relative">
              {/* Y-axis values - แสดงชัดเจนด้านซ้าย */}
              <div className="absolute left-0 top-0 h-48 sm:h-64 flex flex-col justify-between text-xs text-gray-600 z-10">
                <span className="whitespace-nowrap text-gray-800 font-medium bg-white px-2 py-1 rounded">฿60,000</span>
                <span className="whitespace-nowrap text-gray-800 font-medium bg-white px-2 py-1 rounded">฿45,000</span>
                <span className="whitespace-nowrap text-gray-800 font-medium bg-white px-2 py-1 rounded">฿30,000</span>
                <span className="whitespace-nowrap text-gray-800 font-medium bg-white px-2 py-1 rounded">฿15,000</span>
                <span className="whitespace-nowrap text-gray-800 font-medium bg-white px-2 py-1 rounded">฿0</span>
              </div>
              
              {/* Chart bars with proper spacing */}
              <div className="flex items-end justify-between h-48 sm:h-64 px-2 sm:px-4 pb-4 border-b border-l border-gray-300 ml-20 sm:ml-24">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-end space-x-1">
                    {/* Income Bar */}
                    <div className="relative group">
                      <div 
                        className="w-6 bg-green-500 rounded-t-sm transition-all duration-300 hover:bg-green-600 cursor-pointer"
                        style={{ height: `${(data.income / 60000) * 200}px` }}
                      ></div>
                      {/* Hover tooltip for income */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        <div className="font-medium">รายรับ</div>
                        <div>฿{data.income.toLocaleString()}</div>
                        <div className="text-xs opacity-75">{data.month}</div>
                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                      </div>
                    </div>
                    
                    {/* Expense Bar */}
                    <div className="relative group">
                      <div 
                        className="w-6 bg-red-500 rounded-t-sm transition-all duration-300 hover:bg-red-600 cursor-pointer"
                        style={{ height: `${(data.expenses / 60000) * 200}px` }}
                      ></div>
                      {/* Hover tooltip for expense */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        <div className="font-medium">รายจ่าย</div>
                        <div>฿{data.expenses.toLocaleString()}</div>
                        <div className="text-xs opacity-75">{data.month}</div>
                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* X-axis month labels */}
            <div className="flex justify-between px-2 sm:px-4 mt-2 ml-20 sm:ml-24">
              {monthlyData.map((data, index) => (
                <div key={index} className="text-xs text-gray-600 text-center w-8 sm:w-12">
                  <span className="hidden sm:inline">{data.month}</span>
                  <span className="sm:hidden">{data.month.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">รายรับ</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">รายจ่าย</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Income Categories */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
            <ArrowTrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm sm:text-base">รายรับตามประเภท</span>
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
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
            <ArrowTrendingDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm sm:text-base">รายจ่ายตามประเภท</span>
          </h3>
          {expenseSummary.length > 0 ? (
            <div className="space-y-3">
              {expenseSummary.map((item, index) => (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">ตัวกรองข้อมูล</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{showFilters ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
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

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingTransaction ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
              </h2>
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
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Transaction Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income' }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    newTransaction.type === 'income'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <ArrowTrendingUpIcon className="w-8 h-8" />
                    <span className="font-medium">รายรับ</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense' }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    newTransaction.type === 'expense'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-red-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <ArrowTrendingDownIcon className="w-8 h-8" />
                    <span className="font-medium">รายจ่าย</span>
                  </div>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    {newTransaction.type === 'income' ? (
                      incomeCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    ) : (
                      expenseCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนเงิน (บาท)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full pl-8 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">คำอธิบาย</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="เช่น เงินเดือนเดือนนี้, ค่าอาหารกลางวัน"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">วันที่</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newTransaction.isRecurring}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, isRecurring: e.target.checked }))}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700 font-medium">รายการประจำ</label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
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
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                ยกเลิก
              </button>
              <button
                onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                  newTransaction.type === 'income'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {editingTransaction ? 'อัปเดต' : 'เพิ่มรายการ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">รายการทั้งหมด</h2>
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            แสดง {filteredTransactions.length} รายการจากทั้งหมด {transactions.length} รายการ
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  คำอธิบาย
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนเงิน
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <span className="text-xs sm:text-sm">{transaction.description}</span>
                      {transaction.isRecurring && (
                        <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ประจำ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                        title="แก้ไข"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-900 transition-colors p-1"
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
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              แสดง {startIndex + 1} ถึง {Math.min(endIndex, filteredTransactions.length)} จาก {filteredTransactions.length} รายการ
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
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
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg ${
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
                    return <span key={page} className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">...</span>
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

      {/* Budget Settings Modal */}
      {showBudgetSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">ตั้งค่าค่าใช้จ่ายรายเดือน</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddBudget(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>เพิ่มหมวดหมู่</span>
                </button>
                <button
                  onClick={() => setShowBudgetSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {monthlyBudgets.map((budget, index) => (
                <div key={budget.category} className="border rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2 flex items-center space-x-1">
                    <button
                      onClick={() => handleEditBudget(budget)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="แก้ไข"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget.category)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="ลบ"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* แสดงสถานะการเชื่อมโยงกับแผนการเงิน */}
                  {budget.linkedToFinancialPlan && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        📊 แผนการเงิน
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-medium text-gray-900 mb-2 pr-16">{budget.category}</h3>
                  
                  {/* แสดงข้อมูลจากแผนการเงิน */}
                  {budget.linkedToFinancialPlan && budget.financialPlanCategory && (
                    <div className="mb-3 p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-xs text-blue-800">
                        <div className="font-medium">เชื่อมโยงกับ: {budget.financialPlanCategory}</div>
                        {(() => {
                          const financialCategory = financialPlanCategories.find(cat => cat.name === budget.financialPlanCategory)
                          if (!financialCategory) return null
                          
                          const totalBudgetForCategory = monthlyBudgets
                            .filter(b => b.linkedToFinancialPlan && b.financialPlanCategory === budget.financialPlanCategory)
                            .reduce((sum, b) => sum + b.budget, 0)
                          
                          const remainingFromPlan = financialCategory.amount - totalBudgetForCategory
                          
                          return (
                            <div className="mt-1 space-y-1">
                              <div>งบประมาณจากแผน: ฿{financialCategory.amount.toLocaleString()}</div>
                              <div>ใช้ไปแล้ว: ฿{totalBudgetForCategory.toLocaleString()}</div>
                              <div className={`font-medium ${remainingFromPlan >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                เหลือจากแผน: ฿{remainingFromPlan.toLocaleString()}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">งบประมาณ:</span>
                      <span className="font-medium">฿{budget.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ใช้ไปแล้ว:</span>
                      <span className="font-medium">฿{budget.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">เหลือ:</span>
                      <span className={`font-medium ${
                        budget.remaining < 0 ? 'text-red-600' : 
                        budget.remaining < budget.budget * 0.2 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        ฿{budget.remaining.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          budget.spent > budget.budget ? 'bg-red-500' : 
                          budget.spent > budget.budget * 0.8 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((budget.spent / budget.budget) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBudgetSettings(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 sm:mx-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBudget ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
              </h2>
              <button
                onClick={() => {
                  setShowAddBudget(false)
                  setEditingBudget(null)
                  setNewBudget({ category: '', budget: '', spent: '', linkedToFinancialPlan: false, financialPlanCategory: '' })
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* เลือกหมวดหมู่จากแผนการเงิน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เชื่อมโยงกับแผนการเงิน</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="linkToFinancialPlan"
                    checked={newBudget.linkedToFinancialPlan}
                    onChange={(e) => setNewBudget(prev => ({ 
                      ...prev, 
                      linkedToFinancialPlan: e.target.checked,
                      financialPlanCategory: e.target.checked ? prev.financialPlanCategory : ''
                    }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="linkToFinancialPlan" className="text-sm text-gray-700">
                    เชื่อมโยงกับหมวดหมู่จากแผนการเงินรายเดือน
                  </label>
                </div>
              </div>

              {/* Dropdown เลือกหมวดหมู่จากแผนการเงิน */}
              {newBudget.linkedToFinancialPlan && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่จากแผนการเงิน</label>
                  <select
                    value={newBudget.financialPlanCategory}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, financialPlanCategory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">เลือกหมวดหมู่จากแผนการเงิน</option>
                    {financialPlanCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name} ({category.percentage}% - ฿{category.amount.toLocaleString()})
                      </option>
                    ))}
                  </select>
                  
                  {/* แสดงข้อมูลหมวดหมู่ที่เลือก */}
                  {newBudget.financialPlanCategory && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800">
                        <strong>ข้อมูลหมวดหมู่:</strong>
                        {(() => {
                          const selectedCategory = financialPlanCategories.find(cat => cat.name === newBudget.financialPlanCategory)
                          if (!selectedCategory) return null
                          
                          const totalBudgetForCategory = monthlyBudgets
                            .filter(budget => budget.linkedToFinancialPlan && budget.financialPlanCategory === newBudget.financialPlanCategory)
                            .reduce((sum, budget) => sum + budget.budget, 0)
                          
                          const remaining = selectedCategory.amount - totalBudgetForCategory
                          
                          return (
                            <div className="mt-2 space-y-1">
                              <div>งบประมาณรวม: ฿{selectedCategory.amount.toLocaleString()}</div>
                              <div>ใช้ไปแล้ว: ฿{totalBudgetForCategory.toLocaleString()}</div>
                              <div className={`font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                เหลือ: ฿{remaining.toLocaleString()}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ชื่อหมวดหมู่ (ถ้าไม่เชื่อมโยงกับแผนการเงิน) */}
              {!newBudget.linkedToFinancialPlan && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อหมวดหมู่</label>
                  <input
                    type="text"
                    value={newBudget.category}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="เช่น ค่าอาหาร"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">งบประมาณ (บาท)</label>
                <input
                  type="number"
                  value={newBudget.budget}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                
                {/* แจ้งเตือนเมื่องบประมาณเกินที่ตั้งไว้ */}
                {newBudget.linkedToFinancialPlan && newBudget.financialPlanCategory && newBudget.budget && (
                  (() => {
                    const selectedCategory = financialPlanCategories.find(cat => cat.name === newBudget.financialPlanCategory)
                    if (!selectedCategory) return null
                    
                    const totalBudgetForCategory = monthlyBudgets
                      .filter(budget => budget.linkedToFinancialPlan && budget.financialPlanCategory === newBudget.financialPlanCategory)
                      .reduce((sum, budget) => sum + budget.budget, 0)
                    
                    const newTotal = totalBudgetForCategory + parseFloat(newBudget.budget || '0')
                    const isOverLimit = newTotal > selectedCategory.amount
                    
                    return (
                      <div className={`mt-2 p-2 rounded-lg border ${
                        isOverLimit ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                      }`}>
                        <div className={`text-sm ${isOverLimit ? 'text-red-800' : 'text-green-800'}`}>
                          <div className="flex items-center space-x-2">
                            {isOverLimit ? (
                              <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
                            ) : (
                              <CheckCircleIcon className="w-4 h-4 text-green-600" />
                            )}
                            <span>
                              {isOverLimit 
                                ? `⚠️ งบประมาณรวมจะเกินที่ตั้งไว้ (${newTotal.toLocaleString()} > ${selectedCategory.amount.toLocaleString()})`
                                : `✅ งบประมาณรวมอยู่ในขอบเขตที่กำหนด (${newTotal.toLocaleString()} ≤ ${selectedCategory.amount.toLocaleString()})`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })()
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ใช้ไปแล้ว (บาท)</label>
                <input
                  type="number"
                  value={newBudget.spent}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, spent: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddBudget(false)
                  setEditingBudget(null)
                  setNewBudget({ category: '', budget: '', spent: '', linkedToFinancialPlan: false, financialPlanCategory: '' })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ยกเลิก
              </button>
              <button
                onClick={editingBudget ? handleUpdateBudget : handleAddBudget}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingBudget ? 'อัปเดต' : 'เพิ่ม'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Financial Goals Modal */}
      {showFinancialGoals && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">เป้าหมายการเงิน</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>เพิ่มเป้าหมาย</span>
                </button>
                <button
                  onClick={() => setShowFinancialGoals(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Financial Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {financialGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                const remaining = goal.targetAmount - goal.currentAmount
                const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{goal.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                            {getPriorityText(goal.priority)}
                          </span>
                          <span className="text-xs text-gray-500">{goal.category}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => {
                            setEditingGoal(goal)
                            setNewGoal({
                              name: goal.name,
                              targetAmount: goal.targetAmount.toString(),
                              deadline: goal.deadline,
                              category: goal.category,
                              priority: goal.priority,
                              description: goal.description
                            })
                            setShowAddGoal(true)
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">ความคืบหน้า</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Amount Information */}
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">เป้าหมาย:</span>
                        <span className="font-medium ml-1">฿{goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">เก็บแล้ว:</span>
                        <span className="font-medium ml-1">฿{goal.currentAmount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">เหลือ:</span>
                        <span className="font-medium ml-1">฿{remaining.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">หมดเวลา:</span>
                        <span className="font-medium ml-1">{daysUntilDeadline > 0 ? `${daysUntilDeadline} วัน` : 'หมดเวลาแล้ว'}</span>
                      </div>
                    </div>

                    {/* Add Money Button */}
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="จำนวนเงิน"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        min="0"
                        step="100"
                        id={`amount-${goal.id}`}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`amount-${goal.id}`) as HTMLInputElement
                          const amount = parseFloat(input.value)
                          if (amount > 0) {
                            handleAddMoneyToGoal(goal.id, amount)
                            input.value = ''
                          }
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        เพิ่มเงิน
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 sm:mx-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingGoal ? 'แก้ไขเป้าหมาย' : 'เพิ่มเป้าหมายใหม่'}
              </h2>
              <button
                onClick={() => {
                  setShowAddGoal(false)
                  setEditingGoal(null)
                  setNewGoal({
                    name: '',
                    targetAmount: '',
                    deadline: '',
                    category: '',
                    priority: 'medium',
                    description: ''
                  })
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเป้าหมาย</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="เช่น ซื้อบ้าน, รถยนต์ใหม่"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงินเป้าหมาย (บาท)</label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เป้าหมาย</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  <option value="อสังหาฯ">อสังหาฯ</option>
                  <option value="ยานพาหนะ">ยานพาหนะ</option>
                  <option value="การศึกษา">การศึกษา</option>
                  <option value="เงินฉุกเฉิน">เงินฉุกเฉิน</option>
                  <option value="การลงทุน">การลงทุน</option>
                  <option value="การเดินทาง">การเดินทาง</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ความสำคัญ</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="low">ต่ำ</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="high">สูง</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="อธิบายรายละเอียดของเป้าหมาย"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddGoal(false)
                  setEditingGoal(null)
                  setNewGoal({
                    name: '',
                    targetAmount: '',
                    deadline: '',
                    category: '',
                    priority: 'medium',
                    description: ''
                  })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ยกเลิก
              </button>
              <button
                onClick={editingGoal ? handleEditGoal : handleAddGoal}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {editingGoal ? 'อัปเดต' : 'เพิ่ม'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
