'use client'

import { useState, useEffect } from 'react'
import { 
  TagIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export default function FinancialGoalsPage() {
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

  // Mock data
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'short': return 'text-blue-600'
      case 'medium': return 'text-yellow-600'
      case 'long': return 'text-green-600'
      case 'very-long': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'short': return 'ระยะสั้น (1-2 ปี)'
      case 'medium': return 'ระยะกลาง (3-5 ปี)'
      case 'long': return 'ระยะยาว (5+ ปี)'
      case 'very-long': return 'ระยะยาวมาก (10+ ปี)'
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

  // ข้อมูลสำหรับกราฟ
  const chartData = goals.map(goal => ({
    name: goal.name,
    target: goal.target,
    current: goal.current,
    remaining: goal.target - goal.current,
    progress: ((goal.current / goal.target) * 100).toFixed(1)
  }))

  const pieData = goals.map(goal => ({
    name: goal.name,
    value: goal.monthlyInvestment,
    color: goal.priority === 'high' ? '#ef4444' : 
           goal.priority === 'medium' ? '#f59e0b' : '#10b981'
  }))

  const monthlyProgressData = [
    { month: 'ม.ค.', target: 100000, actual: 95000 },
    { month: 'ก.พ.', target: 100000, actual: 98000 },
    { month: 'มี.ค.', target: 100000, actual: 102000 },
    { month: 'เม.ย.', target: 100000, actual: 98000 },
    { month: 'พ.ค.', target: 100000, actual: 105000 },
    { month: 'มิ.ย.', target: 100000, actual: 101000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">เป้าหมายการเงิน</h1>
          <p className="text-gray-600">จัดการและติดตามเป้าหมายการเงินของคุณ</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>เพิ่มเป้าหมาย</span>
        </button>
      </div>

      {/* Goals Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">สรุปเป้าหมายการเงิน</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">เป้าหมายทั้งหมด</p>
            <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">มูลค่าเป้าหมายรวม</p>
            <p className="text-2xl font-bold text-blue-600">฿{goals.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ออมได้แล้ว</p>
            <p className="text-2xl font-bold text-green-600">฿{goals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ลงทุนรายเดือน</p>
            <p className="text-2xl font-bold text-purple-600">฿{totalMonthlyInvestment.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Goals by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Short-term Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">เป้าหมายระยะสั้น (1-2 ปี)</h3>
          <div className="space-y-4">
            {goals.filter(goal => goal.type === 'short').map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{goal.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                      {getPriorityText(goal.priority)}
                    </span>
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
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>฿{goal.current.toLocaleString()}</span>
                    <span>฿{goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">เป้าหมาย:</span>
                    <span className="font-medium ml-2">{goal.deadline}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ลงทุน/เดือน:</span>
                    <span className="font-medium ml-2">฿{goal.monthlyInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium-term Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">เป้าหมายระยะกลาง (3-5 ปี)</h3>
          <div className="space-y-4">
            {goals.filter(goal => goal.type === 'medium').map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{goal.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                      {getPriorityText(goal.priority)}
                    </span>
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
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>฿{goal.current.toLocaleString()}</span>
                    <span>฿{goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">เป้าหมาย:</span>
                    <span className="font-medium ml-2">{goal.deadline}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ลงทุน/เดือน:</span>
                    <span className="font-medium ml-2">฿{goal.monthlyInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Long-term Goals */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เป้าหมายระยะยาว (5+ ปี)</h3>
        <div className="space-y-4">
          {goals.filter(goal => goal.type === 'long' || goal.type === 'very-long').map((goal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{goal.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(goal.type)}`}>
                    {getTypeText(goal.type)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
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
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>฿{goal.current.toLocaleString()}</span>
                  <span>฿{goal.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.type === 'long' ? 'bg-green-600' : 'bg-purple-600'
                    }`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">เป้าหมาย:</span>
                  <span className="font-medium ml-2">{goal.deadline}</span>
                </div>
                <div>
                  <span className="text-gray-600">ลงทุน/เดือน:</span>
                  <span className="font-medium ml-2">฿{goal.monthlyInvestment.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">ความคืบหน้า:</span>
                  <span className="font-medium ml-2">{((goal.current / goal.target) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Investment Calculator */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">คำนวณจำนวนเงินที่ต้องลงทุนรายเดือน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">สรุปการลงทุนรายเดือน</h4>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{goal.name}</span>
                  <span className="font-semibold text-gray-900">฿{goal.monthlyInvestment.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวมรายเดือน</span>
                <span className="text-blue-600">฿{totalMonthlyInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำ</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">การจัดลำดับความสำคัญ</p>
                    <p className="text-sm text-blue-700">เน้นเป้าหมายที่มีความสำคัญสูงก่อน เช่น เงินออมฉุกเฉิน</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">การปรับแผน</p>
                    <p className="text-sm text-green-700">ปรับแผนทุก 6 เดือนตามสถานการณ์การเงินที่เปลี่ยนแปลง</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Progress Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">กราฟความคืบหน้าเป้าหมาย</h3>
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `฿${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `฿${value.toLocaleString()}`,
                    name === 'target' ? 'เป้าหมาย' : name === 'current' ? 'เก็บแล้ว' : 'เหลือ'
                  ]}
                  labelFormatter={(label) => `เป้าหมาย: ${label}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="target" fill="#3b82f6" name="เป้าหมาย" />
                <Bar dataKey="current" fill="#10b981" name="เก็บแล้ว" />
                <Bar dataKey="remaining" fill="#f59e0b" name="เหลือ" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly Investment Distribution Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การกระจายการลงทุนรายเดือน</h3>
          {mounted && (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `฿${value.toLocaleString()}`,
                      'ลงทุนรายเดือน'
                    ]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-700 font-medium">
                      {entry.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      (฿{entry.value.toLocaleString()})
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Monthly Progress Line Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ความคืบหน้ารายเดือน</h3>
        {mounted && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyProgressData}>
              <defs>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `฿${value.toLocaleString()}`,
                  name === 'target' ? 'เป้าหมาย' : 'จริง'
                ]}
                labelFormatter={(label) => `เดือน: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorTarget)"
                name="เป้าหมาย"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorActual)"
                name="จริง"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Add/Edit Goal Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingGoal ? 'แก้ไขเป้าหมาย' : 'เพิ่มเป้าหมายใหม่'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingGoal(null)
                  setNewGoal({
                    name: '',
                    target: '',
                    deadline: '',
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
