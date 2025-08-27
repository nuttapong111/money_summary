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
  XMarkIcon
} from '@heroicons/react/24/outline'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export default function InvestmentPlanningPage() {
  const [mounted, setMounted] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<any>(null)
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
  }, [])

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
      {/* Monthly Investment Plan */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนการลงทุนรายเดือน</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">รายได้รวม</p>
            <p className="text-xl font-bold text-green-600">฿{monthlyPlan.totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">รายจ่าย</p>
            <p className="text-xl font-bold text-red-600">฿{monthlyPlan.expenses.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">เงินออม</p>
            <p className="text-xl font-bold text-blue-600">฿{monthlyPlan.savings.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">การลงทุน</p>
            <p className="text-xl font-bold text-purple-600">฿{monthlyPlan.investment.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">เงินฉุกเฉิน</p>
            <p className="text-xl font-bold text-yellow-600">฿{monthlyPlan.emergency.toLocaleString()}</p>
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

      {/* Monthly Investment Plan */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">แผนการลงทุนรายเดือน</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>เพิ่มแผนการลงทุน</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Summary */}
          <div className="lg:col-span-2">
            <h4 className="font-medium text-gray-700 mb-4 text-center lg:text-left">สรุปการลงทุนรายเดือน</h4>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority).replace('bg-', 'bg-').replace('text-', 'bg-')}`}></div>
                      <span className="font-medium text-gray-900">{goal.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">฿{goal.monthlyInvestment.toLocaleString()}</span>
                      <button
                        onClick={() => {
                          setEditingGoal(goal)
                          setNewGoal({
                            name: goal.name,
                            target: goal.target.toString(),
                            deadline: goal.deadline ? dayjs(goal.deadline, 'YYYY') : null,
                            type: goal.type,
                            monthlyInvestment: goal.monthlyInvestment.toString(),
                            priority: goal.priority,
                            description: ''
                          })
                          setShowAddForm(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.name)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>เป้าหมาย: ฿{goal.target.toLocaleString()}</span>
                    <span>เก็บแล้ว: ฿{goal.current.toLocaleString()}</span>
                    <span>ความคืบหน้า: {((goal.current / goal.target) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900">รวมการลงทุนรายเดือน</span>
                  <span className="text-2xl font-bold text-blue-600">฿{totalMonthlyInvestment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Investment Tips */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">คำแนะนำการลงทุน</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">การจัดลำดับความสำคัญ</p>
                    <p className="text-sm text-blue-700">เน้นเป้าหมายที่มีความสำคัญสูงก่อน เช่น เงินออมฉุกเฉิน</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">การปรับแผน</p>
                    <p className="text-sm text-green-700">ปรับแผนทุก 6 เดือนตามสถานการณ์การเงินที่เปลี่ยนแปลง</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <ChartBarIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">การกระจายความเสี่ยง</p>
                    <p className="text-sm text-yellow-700">กระจายการลงทุนในหลายเป้าหมายเพื่อลดความเสี่ยง</p>
                  </div>
                </div>
              </div>
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
    </div>
  )
}
