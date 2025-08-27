'use client'

import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function IncomeExpensesPage() {
  // Mock data
  const monthlyIncome = {
    salary: 45000,
    investment: 3000,
    passive: 2000,
    total: 50000
  }

  const monthlyExpenses = {
    fixed: {
      car: 8000,
      utilities: 5000,
      insurance: 3000,
      total: 16000
    },
    variable: {
      food: 12000,
      entertainment: 10000,
      shopping: 5000,
      total: 27000
    },
    total: 43000
  }

  const budgetCategories = [
    { name: 'ค่าผ่อนรถ', budget: 8000, spent: 8000, remaining: 0, status: 'completed' },
    { name: 'ค่าอาหาร', budget: 15000, spent: 12000, remaining: 3000, status: 'good' },
    { name: 'ค่าบันเทิง', budget: 8000, spent: 10000, remaining: -2000, status: 'over' },
    { name: 'ค่าสาธารณูปโภค', budget: 6000, spent: 5000, remaining: 1000, status: 'good' },
    { name: 'ค่าประกัน', budget: 3000, spent: 3000, remaining: 0, status: 'completed' }
  ]

  const spendingAnalysis = {
    topCategory: 'ค่าอาหาร',
    topAmount: 12000,
    recommendation: 'ลองทำอาหารทานเองเพื่อลดค่าใช้จ่าย',
    trend: 'up',
    trendAmount: 5.2
  }

  return (
    <div className="space-y-6">
      {/* Income Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายรับ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">รายได้หลัก</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>เงินเดือน</span>
                <span className="font-semibold text-green-600">฿{monthlyIncome.salary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>เงินปันผล</span>
                <span className="font-semibold text-green-600">฿{monthlyIncome.investment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>รายได้อื่นๆ</span>
                <span className="font-semibold text-green-600">฿{monthlyIncome.passive.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวม</span>
                <span className="text-green-600">฿{monthlyIncome.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">รายได้จากการลงทุน</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>หุ้น</span>
                <span className="font-semibold text-green-600">฿1,500</span>
              </div>
              <div className="flex justify-between">
                <span>กองทุนรวม</span>
                <span className="font-semibold text-green-600">฿800</span>
              </div>
              <div className="flex justify-between">
                <span>ดอกเบี้ย</span>
                <span className="font-semibold text-green-600">฿700</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายจ่าย</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ค่าใช้จ่ายคงที่</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ค่าผ่อนรถ</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.fixed.car.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าสาธารณูปโภค</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.fixed.utilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าประกัน</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.fixed.insurance.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวม</span>
                <span className="text-red-600">฿{monthlyExpenses.fixed.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ค่าใช้จ่ายไม่คงที่</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ค่าอาหาร</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.variable.food.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าบันเทิง</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.variable.entertainment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าช้อปปิ้ง</span>
                <span className="font-semibold text-red-600">฿{monthlyExpenses.variable.shopping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวม</span>
                <span className="text-red-600">฿{monthlyExpenses.variable.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Tracking */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ติดตามงบประมาณ</h3>
        <div className="space-y-4">
          {budgetCategories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  category.status === 'completed' ? 'bg-green-100 text-green-800' :
                  category.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {category.status === 'completed' ? 'ครบแล้ว' : 
                   category.status === 'good' ? 'ดี' : 'เกินงบ'}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>฿{category.spent.toLocaleString()}</span>
                  <span>฿{category.budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      category.status === 'completed' ? 'bg-green-600' :
                      category.status === 'good' ? 'bg-blue-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">งบประมาณ</span>
                <span className={`font-semibold ${
                  category.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {category.remaining >= 0 ? 'เหลือ ฿' : 'เกิน ฿'}{Math.abs(category.remaining).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การวิเคราะห์รูปแบบการใช้จ่าย</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">สรุปการวิเคราะห์</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">หมวดหมู่ที่ใช้จ่ายมากที่สุด</p>
                  <p className="text-sm text-gray-600">{spendingAnalysis.topCategory}: ฿{spendingAnalysis.topAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">แนวโน้มการใช้จ่าย</p>
                  <p className="text-sm text-gray-600">เพิ่มขึ้น {spendingAnalysis.trendAmount}% จากเดือนที่แล้ว</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำการลดรายจ่าย</h4>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">คำแนะนำ</p>
                  <p className="text-sm text-blue-700">{spendingAnalysis.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income vs Expenses Chart Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">กราฟแนวโน้มรายรับ-รายจ่าย</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟแสดงแนวโน้มรายรับ-รายจ่ายรายเดือน</p>
            <p className="text-sm text-gray-400">จะแสดงข้อมูลจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
      </div>
    </div>
  )
}
