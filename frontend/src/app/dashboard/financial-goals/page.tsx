'use client'

import { 
  TagIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function FinancialGoalsPage() {
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

  return (
    <div className="space-y-6">
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
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
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
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
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

      {/* Goal Progress Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">กราฟความคืบหน้าเป้าหมาย</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟแสดงความคืบหน้าของแต่ละเป้าหมาย</p>
            <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
      </div>
    </div>
  )
}
