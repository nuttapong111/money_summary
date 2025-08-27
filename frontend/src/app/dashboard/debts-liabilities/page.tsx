'use client'

import { 
  CreditCardIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalculatorIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function DebtsLiabilitiesPage() {
  // Mock data
  const totalDebts = {
    amount: 800000,
    monthlyPayment: 25000,
    interestRate: 8.5,
    debtToIncome: 16
  }

  const debts = [
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
  ]

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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายการหนี้ทั้งหมด</h3>
        <div className="space-y-4">
          {debts.map((debt, index) => (
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
    </div>
  )
}
