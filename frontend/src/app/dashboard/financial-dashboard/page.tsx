'use client'

import { 
  ChartBarIcon, 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  TagIcon,
  CalendarIcon,
  UserIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

export default function FinancialDashboardPage() {
  // Mock data
  const financialStatus = {
    cash: 150000,
    debts: 800000,
    assets: 2500000,
    netWorth: 1700000
  }

  const investmentPerformance = {
    current: 1800000,
    target: 2000000,
    return: 12.5,
    benchmark: 8.2
  }

  const financialHealth = {
    score: 85,
    status: 'ดีมาก',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    grade: 'A'
  }

  const alerts = [
    { type: 'warning', message: 'ครบกำหนดชำระบัตรเครดิตใน 3 วัน', icon: ExclamationTriangleIcon },
    { type: 'info', message: 'แผนการลงทุนรายเดือนล่าช้า 2 เดือน', icon: ClockIcon },
    { type: 'success', message: 'เงินปันผลหุ้น SET50 รับแล้ว', icon: CheckCircleIcon }
  ]

  const marketNews = [
    { title: 'SET Index ปิดขึ้น 1.2% หลัง Fed ประกาศนโยบาย', impact: 'positive' },
    { title: 'กองทุนรวมอสังหาฯ คาดการณ์ผลตอบแทน 8-10%', impact: 'neutral' },
    { title: 'ทองคำปรับตัวขึ้น 2.5% หลังความไม่แน่นอนทางการเมือง', impact: 'positive' }
  ]

  return (
    <div className="space-y-6">
      {/* Financial Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BanknotesIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">เงินสด</p>
              <p className="text-2xl font-bold text-gray-900">฿{financialStatus.cash.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">หนี้สิน</p>
              <p className="text-2xl font-bold text-gray-900">฿{financialStatus.debts.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">สินทรัพย์</p>
              <p className="text-2xl font-bold text-gray-900">฿{financialStatus.assets.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">สินทรัพย์สุทธิ</p>
              <p className="text-2xl font-bold text-gray-900">฿{financialStatus.netWorth.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ผลการดำเนินงานการลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">มูลค่าปัจจุบัน</p>
            <p className="text-2xl font-bold text-green-600">฿{investmentPerformance.current.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">เป้าหมาย</p>
            <p className="text-2xl font-bold text-blue-600">฿{investmentPerformance.target.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ผลตอบแทน</p>
            <p className="text-2xl font-bold text-green-600">{investmentPerformance.return}%</p>
            <p className="text-sm text-gray-500">Benchmark: {investmentPerformance.benchmark}%</p>
          </div>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">สุขภาพการเงิน</h3>
        <div className="flex items-center space-x-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">คะแนนรวม</span>
              <span className={`text-sm font-medium ${financialHealth.color}`}>
                {financialHealth.status} (เกรด {financialHealth.grade})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${financialHealth.bgColor} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${financialHealth.score}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              คุณมีสุขภาพการเงินที่ดี ควรรักษาระดับนี้ไว้และพัฒนาต่อ
            </p>
          </div>
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full ${financialHealth.bgColor} flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${financialHealth.color}`}>{financialHealth.score}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">คะแนน</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือนสำคัญ</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
              <alert.icon className={`w-5 h-5 mr-3 ${
                alert.type === 'warning' ? 'text-yellow-500' : 
                alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
              }`} />
              <span className="text-sm text-gray-700">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Market News */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข่าวสารและแนวโน้มตลาด</h3>
        <div className="space-y-3">
          {marketNews.map((news, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">{news.title}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  news.impact === 'positive' ? 'bg-green-100 text-green-800' :
                  news.impact === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {news.impact === 'positive' ? 'ดี' : news.impact === 'negative' ? 'ไม่ดี' : 'ปกติ'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
