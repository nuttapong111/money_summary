'use client'

import { 
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline'

export default function InvestmentPlanningPage() {
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
      <div className="card">
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
    </div>
  )
}
