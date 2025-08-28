'use client'

import { useState, useEffect } from 'react'
import { 
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  CalculatorIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

// กำหนดประเภทแผนการเงิน
type FinancialPlanType = '503020' | '6jars' | 'custom'

// กำหนดโครงสร้างหมวดหมู่
interface Category {
  id: string
  name: string
  percentage: number
  amount: number
  color: string
  description: string
}

export default function InvestmentPlanningPage() {
  const [mounted, setMounted] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAllocationForm, setShowAllocationForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<FinancialPlanType>('503020')
  const [monthlyIncome, setMonthlyIncome] = useState(50000)
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState({
    name: '',
    percentage: 0,
    color: '#3B82F6',
    description: ''
  })
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: null as any,
    type: 'medium',
    monthlyInvestment: '',
    priority: 'medium',
    description: ''
  })

  useEffect(() => {
    setMounted(true)
    initializeDefaultPlan()
  }, [])

  // ฟังก์ชันเริ่มต้นแผนการเงินเริ่มต้น
  const initializeDefaultPlan = () => {
    if (selectedPlan === '503020') {
      setCategories([
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
      ])
    } else if (selectedPlan === '6jars') {
      setCategories([
        {
          id: '1',
          name: 'ความต้องการจำเป็น',
          percentage: 55,
          amount: monthlyIncome * 0.55,
          color: '#EF4444',
          description: 'ค่าผ่อนรถ, ค่าบ้าน, อาหาร, ค่าสาธารณูปโภค'
        },
        {
          id: '2',
          name: 'ความต้องการ',
          percentage: 10,
          amount: monthlyIncome * 0.1,
          color: '#F59E0B',
          description: 'บันเทิง, ช้อปปิ้ง, ท่องเที่ยว'
        },
        {
          id: '3',
          name: 'การออม',
          percentage: 10,
          amount: monthlyIncome * 0.1,
          color: '#10B981',
          description: 'เงินออมระยะสั้น, เงินฉุกเฉิน'
        },
        {
          id: '4',
          name: 'การลงทุน',
          percentage: 10,
          amount: monthlyIncome * 0.1,
          color: '#3B82F6',
          description: 'หุ้น, พันธบัตร, กองทุน'
        },
        {
          id: '5',
          name: 'การศึกษา',
          percentage: 10,
          amount: monthlyIncome * 0.1,
          color: '#8B5CF6',
          description: 'คอร์สเรียน, หนังสือ, การพัฒนาตัวเอง'
        },
        {
          id: '6',
          name: 'การให้',
          percentage: 5,
          amount: monthlyIncome * 0.05,
          color: '#EC4899',
          description: 'บริจาค, ของขวัญ, การช่วยเหลือผู้อื่น'
        }
      ])
    }
  }

  // ฟังก์ชันเปลี่ยนแผนการเงิน
  const handlePlanChange = (plan: FinancialPlanType) => {
    setSelectedPlan(plan)
    if (plan === 'custom') {
      setCategories([])
    } else {
      initializeDefaultPlan()
    }
  }

  // ฟังก์ชันปรับสัดส่วนหมวดหมู่
  const handlePercentageChange = (categoryId: string, newPercentage: number) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          percentage: newPercentage,
          amount: (monthlyIncome * newPercentage) / 100
        }
      }
      return cat
    })
    setCategories(updatedCategories)
  }

  // ฟังก์ชันปรับสัดส่วนแบบอัตโนมัติเพื่อให้รวมเป็น 100%
  const handleAutoBalance = () => {
    if (categories.length === 0) return
    
    const totalCurrent = categories.reduce((sum, cat) => sum + cat.percentage, 0)
    if (totalCurrent === 100) return
    
    const diff = 100 - totalCurrent
    const lastCategory = categories[categories.length - 1]
    
    const updatedCategories = categories.map((cat, index) => {
      if (index === categories.length - 1) {
        return {
          ...cat,
          percentage: Math.max(0, cat.percentage + diff),
          amount: (monthlyIncome * Math.max(0, cat.percentage + diff)) / 100
        }
      }
      return cat
    })
    
    setCategories(updatedCategories)
  }

  // ฟังก์ชันรีเซ็ตแผนการเงิน
  const handleResetPlan = () => {
    if (confirm('คุณต้องการรีเซ็ตแผนการเงินเป็นค่าเริ่มต้นหรือไม่?')) {
      initializeDefaultPlan()
    }
  }

  // ฟังก์ชันเพิ่มหมวดหมู่ใหม่
  const handleAddCategory = () => {
    if (!newCategory.name || newCategory.percentage <= 0) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0) + newCategory.percentage
    if (totalPercentage > 100) {
      alert('สัดส่วนรวมต้องไม่เกิน 100%')
      return
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      percentage: newCategory.percentage,
      amount: (monthlyIncome * newCategory.percentage) / 100,
      color: newCategory.color,
      description: newCategory.description
    }

    setCategories([...categories, category])
    setNewCategory({
      name: '',
      percentage: 0,
      color: '#3B82F6',
      description: ''
    })
    setShowAllocationForm(false)
  }

  // ฟังก์ชันลบหมวดหมู่
  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('คุณต้องการลบหมวดหมู่นี้หรือไม่?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId))
    }
  }

  // ฟังก์ชันปรับรายได้รวม
  const handleIncomeChange = (newIncome: number) => {
    setMonthlyIncome(newIncome)
    const updatedCategories = categories.map(cat => ({
      ...cat,
      amount: (newIncome * cat.percentage) / 100
    }))
    setCategories(updatedCategories)
  }

  // คำนวณสัดส่วนรวม
  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0)
  const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0)

  // Mock data for financial goals
  const goals = [
    { 
      name: 'บ้านหลังแรก', 
      target: 2000000, 
      current: 800000, 
      deadline: '2026', 
      type: 'long',
      monthlyInvestment: 25000,
      priority: 'high'
    },
    { 
      name: 'รถยนต์', 
      target: 800000, 
      current: 300000, 
      deadline: '2024', 
      type: 'short',
      monthlyInvestment: 15000,
      priority: 'medium'
    },
    { 
      name: 'เงินออมฉุกเฉิน', 
      target: 300000, 
      current: 250000, 
      deadline: '2024', 
      type: 'short',
      monthlyInvestment: 5000,
      priority: 'high'
    },
    { 
      name: 'การศึกษาบุตร', 
      target: 1500000, 
      current: 200000, 
      deadline: '2030', 
      type: 'long',
      monthlyInvestment: 20000,
      priority: 'medium'
    },
    { 
      name: 'เกษียณอายุ', 
      target: 10000000, 
      current: 1500000, 
      deadline: '2045', 
      type: 'very-long',
      monthlyInvestment: 30000,
      priority: 'low'
    }
  ]

  const totalMonthlyInvestment = goals.reduce((sum, goal) => sum + goal.monthlyInvestment, 0)

  // ฟังก์ชันสำหรับจัดการเป้าหมาย
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline || !newGoal.monthlyInvestment) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const goal = {
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline ? dayjs(newGoal.deadline).format('YYYY') : '',
      type: newGoal.type,
      monthlyInvestment: parseFloat(newGoal.monthlyInvestment),
      priority: newGoal.priority,
      description: newGoal.description
    }

    goals.push(goal)
    setNewGoal({
      name: '',
      target: '',
      deadline: null,
      type: 'medium',
      monthlyInvestment: '',
      priority: 'medium',
      description: ''
    })
    setShowAddForm(false)
  }

  const handleEditGoal = () => {
    if (!editingGoal) return

    if (!newGoal.name || !newGoal.target || !newGoal.deadline || !newGoal.monthlyInvestment) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const goalIndex = goals.findIndex(g => g.name === editingGoal.name)
    if (goalIndex !== -1) {
      goals[goalIndex] = {
        ...editingGoal,
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        deadline: newGoal.deadline ? dayjs(newGoal.deadline).format('YYYY') : '',
        type: newGoal.type,
        monthlyInvestment: parseFloat(newGoal.monthlyInvestment),
        priority: newGoal.priority,
        description: newGoal.description
      }
    }

    setEditingGoal(null)
    setNewGoal({
      name: '',
      target: '',
      deadline: null,
      type: 'medium',
      monthlyInvestment: '',
      priority: 'medium',
      description: ''
    })
    setShowAddForm(false)
  }

  const handleDeleteGoal = (goalName: string) => {
    if (confirm('คุณต้องการลบเป้าหมายนี้หรือไม่?')) {
      const goalIndex = goals.findIndex(g => g.name === goalName)
      if (goalIndex !== -1) {
        goals.splice(goalIndex, 1)
      }
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

  // Mock data
  const monthlyPlan = {
    totalIncome: 50000,
    expenses: 35000,
    savings: 15000,
    investment: 10000,
    emergency: 5000
  }

  const rule503020 = {
    needs: { percentage: 50, amount: 25000, description: 'ความต้องการจำเป็น (ค่าผ่อนรถ, ค่าบ้าน, อาหาร)' },
    wants: { percentage: 30, amount: 15000, description: 'ความต้องการ (บันเทิง, ช้อปปิ้ง, ท่องเที่ยว)' },
    savings: { percentage: 20, amount: 10000, description: 'การออมและลงทุน (เงินออม, ลงทุน, เงินฉุกเฉิน)' }
  }

  const riskProfile = {
    age: 35,
    riskTolerance: 'medium',
    investmentHorizon: '20+ years',
    recommendedAllocation: {
      stocks: 60,
      bonds: 25,
      realEstate: 10,
      cash: 5
    }
  }

  const investmentScenarios = [
    {
      name: 'Conservative',
      monthlyInvestment: 8000,
      expectedReturn: 5,
      projectedValue: 3200000,
      risk: 'low'
    },
    {
      name: 'Moderate',
      monthlyInvestment: 10000,
      expectedReturn: 8,
      projectedValue: 4500000,
      risk: 'medium'
    },
    {
      name: 'Aggressive',
      monthlyInvestment: 12000,
      expectedReturn: 12,
      projectedValue: 6500000,
      risk: 'high'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'ต่ำ'
      case 'medium': return 'ปานกลาง'
      case 'high': return 'สูง'
      default: return 'ไม่ระบุ'
    }
  }

  return (
    <div className="space-y-6">
      {/* Custom CSS for Sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-webkit-slider-track {
          background: transparent;
          border-radius: 8px;
        }
        
        .slider::-moz-range-track {
          background: transparent;
          border-radius: 8px;
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* Monthly Investment Plan */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนการลงทุนรายเดือน</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">รายได้รวม</p>
            <p className="text-xl font-bold text-green-600">฿{monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">รายจ่าย</p>
            <p className="text-xl font-bold text-red-600">฿{(monthlyIncome * 0.8).toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">เงินออม</p>
            <p className="text-xl font-bold text-blue-600">฿{(monthlyIncome * 0.15).toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">การลงทุน</p>
            <p className="text-xl font-bold text-purple-600">฿{(monthlyIncome * 0.05).toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">เงินฉุกเฉิน</p>
            <p className="text-xl font-bold text-yellow-600">฿{(monthlyIncome * 0.05).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 50/30/20 Rule */}
      {/* <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">50/30/20 Rule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">{rule503020.needs.percentage}%</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">ความต้องการจำเป็น</h4>
            <p className="text-2xl font-bold text-blue-600 mb-2">฿{rule503020.needs.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{rule503020.needs.description}</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">{rule503020.wants.percentage}%</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">ความต้องการ</h4>
            <p className="text-2xl font-bold text-yellow-600 mb-2">฿{rule503020.wants.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{rule503020.wants.description}</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">{rule503020.savings.percentage}%</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">การออมและลงทุน</h4>
            <p className="text-2xl font-bold text-green-600 mb-2">฿{rule503020.savings.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{rule503020.savings.description}</p>
          </div>
        </div>
      </div> */}

      {/* Financial Planning Strategies */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">แผนการเงินรายเดือน</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAllocationForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              <span>ปรับแต่งแผน</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Strategy Selection */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">เลือกแผนการเงิน</h4>
            <div className="space-y-3">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPlan === '503020' 
                    ? 'bg-blue-100 border-blue-300' 
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}
                onClick={() => handlePlanChange('503020')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-blue-900">50/30/20 Rule</h5>
                    <p className="text-sm text-blue-700">แผนการเงินแบบดั้งเดิม</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-600">50% 30% 20%</div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPlan === '6jars' 
                    ? 'bg-green-100 border-green-300' 
                    : 'bg-green-50 border-green-200 hover:bg-green-100'
                }`}
                onClick={() => handlePlanChange('6jars')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-green-900">6 Jars Method</h5>
                    <p className="text-sm text-green-700">แบ่งเงินเป็น 6 หมวดหมู่</p>
                  </div>
                  <div className="text-xs text-green-600">6 หมวดหมู่</div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPlan === 'custom' 
                    ? 'bg-purple-100 border-purple-300' 
                    : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                }`}
                onClick={() => handlePlanChange('custom')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-purple-900">Custom Plan</h5>
                    <p className="text-sm text-purple-700">ปรับแต่งตามต้องการ</p>
                  </div>
                  <div className="text-xs text-purple-600">ปรับเอง</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Plan Display */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">
                แผนการเงินปัจจุบัน ({selectedPlan === '503020' ? '50/30/20' : selectedPlan === '6jars' ? '6 Jars' : 'Custom'})
              </h4>
              <div className="flex space-x-2">
                {selectedPlan === 'custom' && (
                  <button
                    onClick={() => setShowAllocationForm(true)}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 inline mr-1" />
                    เพิ่มหมวดหมู่
                  </button>
                )}
                {totalPercentage !== 100 && categories.length > 0 && (
                  <button
                    onClick={handleAutoBalance}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    title="ปรับสมดุลอัตโนมัติให้รวมเป็น 100%"
                  >
                    <CalculatorIcon className="w-4 h-4 inline mr-1" />
                    ปรับสมดุล
                  </button>
                )}
                <button
                  onClick={handleResetPlan}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                  title="รีเซ็ตแผนการเงินเป็นค่าเริ่มต้น"
                >
                  <PencilIcon className="w-4 h-4 inline mr-1" />
                  รีเซ็ต
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Income Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">รายได้รวมรายเดือน</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => handleIncomeChange(Number(e.target.value))}
                      className="w-24 px-2 py-1 text-right border border-gray-300 rounded text-lg font-bold text-green-600"
                    />
                    <span className="text-lg font-bold text-green-600">฿</span>
                  </div>
                </div>
              </div>
              
              {/* Categories Display */}
              {categories.length > 0 ? (
                <div className="space-y-4">
                  {/* Visual Bar Chart */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-3">ภาพรวมการจัดสรรเงิน</h5>
                    <div className="flex h-12 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-center text-white text-xs font-medium relative group cursor-pointer transition-all duration-200 hover:brightness-110"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.color
                          }}
                          title={`${category.name}: ${category.percentage}% (฿${category.amount.toLocaleString()})`}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold">
                            {category.percentage}%
                          </span>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20"></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                    
                    {/* Category Legend */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2 text-xs">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-gray-700">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Categories */}
                  {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-lg p-4 border border-gray-200 group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <h5 className="font-semibold text-gray-900">{category.name}</h5>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">฿{category.amount.toLocaleString()}</span>
                          <span className="text-lg font-bold" style={{ color: category.color }}>
                            {category.percentage}%
                          </span>
                          {selectedPlan === 'custom' && (
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                              title="ลบหมวดหมู่นี้"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Enhanced Percentage Slider */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">ปรับสัดส่วน</span>
                          <span className="text-sm font-medium" style={{ color: category.color }}>
                            {category.percentage}%
                          </span>
                        </div>
                        
                        {/* Single Slider with Visual Feedback */}
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={category.percentage}
                            onChange={(e) => handlePercentageChange(category.id, Number(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${category.percentage}%, #e5e7eb ${category.percentage}%, #e5e7eb 100%)`
                            }}
                          />
                          
                          {/* Slider Value Indicator */}
                          <div className="absolute -top-8 left-0 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {category.percentage}%
                            </div>
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 mx-auto"></div>
                          </div>
                        </div>
                        

                      </div>
                      
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  ))}
                  
                  {/* Enhanced Summary */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">สรุปการจัดสรรเงิน</span>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                          {totalPercentage}%
                        </div>
                        <div className="text-sm text-gray-600">฿{totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3 relative overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ease-out ${
                          totalPercentage === 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                      ></div>
                      
                      {/* Animated stripes for 100% completion */}
                      {totalPercentage === 100 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Percentage Scale */}
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    
                    {totalPercentage !== 100 && (
                      <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <div>
                          <span>สัดส่วนรวมต้องเท่ากับ 100% (ปัจจุบัน: {totalPercentage}%)</span>
                          <div className="mt-1 text-xs text-red-500">
                            ยังขาดอีก {100 - totalPercentage}% เพื่อให้สมบูรณ์
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {totalPercentage === 100 && (
                      <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
                        <CheckCircleIcon className="w-4 h-4" />
                        <div>
                          <span>สัดส่วนรวมสมบูรณ์แล้ว! ✅</span>
                          <div className="mt-1 text-xs text-green-500">
                            แผนการเงินของคุณพร้อมใช้งานแล้ว
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {totalPercentage > 100 && (
                      <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <div>
                          <span>สัดส่วนรวมเกิน 100% (ปัจจุบัน: {totalPercentage}%)</span>
                          <div className="mt-1 text-xs text-orange-500">
                            เกินมา {totalPercentage - 100}% กรุณาปรับลดสัดส่วน
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedPlan === 'custom' ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <PlusIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p>ยังไม่มีหมวดหมู่</p>
                      <button
                        onClick={() => setShowAllocationForm(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        เพิ่มหมวดหมู่แรก
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto">
                        <ChartBarIcon className="w-8 h-8 text-blue-400" />
                      </div>
                      <p>กำลังโหลดแผนการเงิน...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Profile Assessment */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การประเมิน Risk Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ข้อมูลพื้นฐาน</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">อายุ</span>
                <span className="font-medium">{riskProfile.age} ปี</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ความเสี่ยงที่ยอมรับได้</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(riskProfile.riskTolerance)}`}>
                  {getRiskText(riskProfile.riskTolerance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ระยะเวลาการลงทุน</span>
                <span className="font-medium">{riskProfile.investmentHorizon}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การจัดสรรที่แนะนำ</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">หุ้น</span>
                <span className="font-medium">{riskProfile.recommendedAllocation.stocks}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">พันธบัตร</span>
                <span className="font-medium">{riskProfile.recommendedAllocation.bonds}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">อสังหาริมทรัพย์</span>
                <span className="font-medium">{riskProfile.recommendedAllocation.realEstate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เงินสด</span>
                <span className="font-medium">{riskProfile.recommendedAllocation.cash}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Scenarios */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การจำลองสถานการณ์การลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investmentScenarios.map((scenario, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{scenario.name}</h4>
                <span className={`px-3 py-1 text-sm rounded-full ${getRiskColor(scenario.risk)}`}>
                  ความเสี่ยง: {getRiskText(scenario.risk)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ลงทุน/เดือน:</span>
                  <span className="font-semibold">฿{scenario.monthlyInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ผลตอบแทนที่คาดหวัง:</span>
                  <span className="font-semibold text-green-600">{scenario.expectedReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">มูลค่าในอนาคต:</span>
                  <span className="font-semibold text-blue-600">฿{scenario.projectedValue.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {scenario.name === 'Conservative' && 'เหมาะสำหรับผู้ที่ต้องการความปลอดภัยสูง'}
                  {scenario.name === 'Moderate' && 'สมดุลระหว่างความเสี่ยงและผลตอบแทน'}
                  {scenario.name === 'Aggressive' && 'เหมาะสำหรับผู้ที่ยอมรับความเสี่ยงสูงเพื่อผลตอบแทนสูง'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">คำแนะนำการลงทุน</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <LightBulbIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">การกระจายความเสี่ยง</h4>
              <p className="text-sm text-blue-800">
                กระจายการลงทุนในหลายประเภทสินทรัพย์เพื่อลดความเสี่ยงรวมของพอร์ต
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-green-900 mb-2">การลงทุนระยะยาว</h4>
              <p className="text-sm text-green-800">
                ลงทุนในระยะยาวเพื่อให้ได้ผลตอบแทนที่ดีขึ้นและลดผลกระทบจากความผันผวนระยะสั้น
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-2">การติดตามและปรับสมดุล</h4>
              <p className="text-sm text-yellow-800">
                ติดตามผลการดำเนินงานและปรับสมดุลพอร์ตเป็นประจำเพื่อรักษาสัดส่วนการลงทุนที่เหมาะสม
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-adjustment Plan */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนการปรับอัตโนมัติ</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CalculatorIcon className="w-6 h-6 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900">การปรับสมดุลอัตโนมัติ</h4>
                <p className="text-sm text-gray-600">ปรับสมดุลพอร์ตทุก 3 เดือน</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">เปิดใช้งาน</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ChartBarIcon className="w-6 h-6 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900">การแจ้งเตือนการลงทุน</h4>
                <p className="text-sm text-gray-600">แจ้งเตือนเมื่อราคาสินทรัพย์เปลี่ยนแปลงมาก</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">เปิดใช้งาน</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-6 h-6 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900">การปรับแผนรายเดือน</h4>
                <p className="text-sm text-gray-600">ปรับแผนการลงทุนตามสถานการณ์ทางการเงิน</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">รอการตั้งค่า</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Goal Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingGoal ? 'แก้ไขแผนการลงทุน' : 'เพิ่มแผนการลงทุนใหม่'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingGoal(null)
                  setNewGoal({
                    name: '',
                    target: '',
                    deadline: null,
                    type: 'medium',
                    monthlyInvestment: '',
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อเป้าหมาย</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="เช่น ซื้อบ้าน, รถยนต์ใหม่"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนเงินเป้าหมาย (บาท)</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เป้าหมาย</label>
                <DatePicker
                  value={newGoal.deadline}
                  onChange={(date) => setNewGoal(prev => ({ ...prev, deadline: date }))}
                  className="w-full"
                  placeholder="เลือกปีเป้าหมาย"
                  picker="year"
                  format="YYYY"
                  allowClear
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลา</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="short">ระยะสั้น (1-2 ปี)</option>
                  <option value="medium">ระยะกลาง (3-5 ปี)</option>
                  <option value="long">ระยะยาว (5+ ปี)</option>
                  <option value="very-long">ระยะยาวมาก (10+ ปี)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ลงทุนรายเดือน (บาท)</label>
                <input
                  type="number"
                  value={newGoal.monthlyInvestment}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, monthlyInvestment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ความสำคัญ</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="low">ต่ำ</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="high">สูง</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="อธิบายรายละเอียดของเป้าหมาย"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingGoal(null)
                  setNewGoal({
                    name: '',
                    target: '',
                    deadline: null,
                    type: 'medium',
                    monthlyInvestment: '',
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
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                {editingGoal ? 'อัปเดต' : 'เพิ่ม'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAllocationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">เพิ่มหมวดหมู่ใหม่</h2>
              <button
                onClick={() => {
                  setShowAllocationForm(false)
                  setNewCategory({
                    name: '',
                    percentage: 0,
                    color: '#3B82F6',
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อหมวดหมู่</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="เช่น การศึกษา, การท่องเที่ยว"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">สัดส่วน (%)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newCategory.percentage}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, percentage: Number(e.target.value) }))}
                    className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, ${newCategory.color} 0%, ${newCategory.color} ${newCategory.percentage}%, #e5e7eb ${newCategory.percentage}%, #e5e7eb 100%)`
                    }}
                  />
                  <span className="w-16 text-center font-bold text-lg" style={{ color: newCategory.color }}>
                    {newCategory.percentage}%
                  </span>
                </div>
                

                
                <div className="text-sm text-gray-500 mt-2">
                  จำนวนเงิน: ฿{((monthlyIncome * newCategory.percentage) / 100).toLocaleString()}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">สี</label>
                <div className="grid grid-cols-8 gap-2">
                  {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#06B6D4'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        newCategory.color === color ? 'border-gray-800 shadow-lg' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`เลือกสี ${color}`}
                    />
                  ))}
                </div>
                
                {/* Color Preview */}
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">สีที่เลือก:</span>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: newCategory.color }}
                    ></div>
                    <span className="text-sm font-mono text-gray-700">{newCategory.color}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="อธิบายรายละเอียดของหมวดหมู่นี้"
                  rows={3}
                />
              </div>
              
              {categories.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-yellow-800">
                    <strong>หมายเหตุ:</strong> สัดส่วนรวมปัจจุบัน: {totalPercentage}%
                    
                    {/* Current Total Progress */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            totalPercentage <= 100 ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    {totalPercentage + newCategory.percentage > 100 && (
                      <div className="text-red-600 mt-2 p-2 bg-red-50 rounded border border-red-200">
                        <div className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          <span>⚠️ สัดส่วนรวมจะเกิน 100% หากเพิ่มหมวดหมู่นี้</span>
                        </div>
                        <div className="mt-1 text-xs">
                          สัดส่วนรวมใหม่: {totalPercentage + newCategory.percentage}%
                        </div>
                        
                        {/* Warning Progress Bar */}
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-red-500 transition-all duration-300"
                              style={{ width: `${Math.min(totalPercentage + newCategory.percentage, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>0%</span>
                            <span>100%</span>
                            <span className="text-red-600">+{(totalPercentage + newCategory.percentage - 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {totalPercentage + newCategory.percentage === 100 && (
                      <div className="text-green-600 mt-2 p-2 bg-green-50 rounded border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span>✅ สัดส่วนรวมสมบูรณ์แล้ว!</span>
                        </div>
                        
                        {/* Success Progress Bar */}
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-500 transition-all duration-300"
                              style={{ width: '100%' }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAllocationForm(false)
                  setNewCategory({
                    name: '',
                    percentage: 0,
                    color: '#3B82F6',
                    description: ''
                  })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.name || newCategory.percentage <= 0}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                เพิ่มหมวดหมู่
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
