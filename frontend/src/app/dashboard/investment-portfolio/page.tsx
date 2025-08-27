'use client'

import { 
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function InvestmentPortfolioPage() {
  // Mock data
  const portfolio = {
    totalValue: 275000,
    totalReturn: 12.5,
    benchmark: 8.2,
    performance: 'outperform'
  }

  const investments = [
    { name: 'หุ้น SET50', value: 150000, change: 5.2, type: 'stock', allocation: 25, risk: 'medium' },
    { name: 'กองทุนรวม', value: 80000, change: -2.1, type: 'fund', allocation: 15, risk: 'low' },
    { name: 'ทองคำ', value: 45000, change: 8.7, type: 'gold', allocation: 10, risk: 'low' },
    { name: 'พันธบัตรรัฐบาล', value: 120000, change: 3.1, type: 'bond', allocation: 20, risk: 'very-low' },
    { name: 'อสังหาฯ', value: 800000, change: 6.8, type: 'realestate', allocation: 30, risk: 'high' }
  ]

  const assetAllocation = [
    { type: 'หุ้น', percentage: 25, color: 'bg-blue-500' },
    { type: 'กองทุนรวม', percentage: 15, color: 'bg-green-500' },
    { type: 'ทองคำ', percentage: 10, color: 'bg-yellow-500' },
    { type: 'พันธบัตร', percentage: 20, color: 'bg-purple-500' },
    { type: 'อสังหาฯ', percentage: 30, color: 'bg-red-500' }
  ]

  const portfolioHistory = [
    { month: 'ม.ค.', value: 250000 },
    { month: 'ก.พ.', value: 255000 },
    { month: 'มี.ค.', value: 248000 },
    { month: 'เม.ย.', value: 260000 },
    { month: 'พ.ค.', value: 268000 },
    { month: 'มิ.ย.', value: 275000 }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very-low': return 'bg-green-100 text-green-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'very-low': return 'ต่ำมาก'
      case 'low': return 'ต่ำ'
      case 'medium': return 'ปานกลาง'
      case 'high': return 'สูง'
      default: return 'ไม่ระบุ'
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ภาพรวมพอร์ตการลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">มูลค่ารวม</p>
            <p className="text-2xl font-bold text-gray-900">฿{portfolio.totalValue.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ผลตอบแทนรวม</p>
            <p className={`text-2xl font-bold ${portfolio.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.totalReturn >= 0 ? '+' : ''}{portfolio.totalReturn}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Benchmark</p>
            <p className="text-2xl font-bold text-blue-600">{portfolio.benchmark}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ประสิทธิภาพ</p>
            <span className={`px-3 py-1 text-sm rounded-full ${
              portfolio.performance === 'outperform' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {portfolio.performance === 'outperform' ? 'ดีกว่า' : 'ต่ำกว่า'} Benchmark
            </span>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">สัดส่วนการกระจายการลงทุน</h3>
          <div className="space-y-3">
            {assetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{asset.type}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{asset.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation Pie Chart</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartPieIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Pie Chart แสดงสัดส่วนการลงทุน</p>
              <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Details */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดการลงทุน</h3>
        <div className="space-y-4">
          {investments.map((investment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{investment.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(investment.risk)}`}>
                    {getRiskText(investment.risk)}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-semibold ${
                    investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {investment.change >= 0 ? '+' : ''}{investment.change}%
                  </span>
                  <p className="text-sm text-gray-500">฿{investment.value.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ประเภท:</span>
                  <span className="font-medium ml-2">{investment.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">สัดส่วน:</span>
                  <span className="font-medium ml-2">{investment.allocation}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance vs Benchmark */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การเปรียบเทียบกับ Benchmark</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">พอร์ตของคุณ</p>
            <p className="text-2xl font-bold text-blue-600">{portfolio.totalReturn}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">SET Index</p>
            <p className="text-2xl font-bold text-gray-600">{portfolio.benchmark}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ผลต่าง</p>
            <p className={`text-2xl font-bold ${portfolio.totalReturn > portfolio.benchmark ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.totalReturn > portfolio.benchmark ? '+' : ''}{(portfolio.totalReturn - portfolio.benchmark).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio History Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติมูลค่าพอร์ต</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟเส้นแสดงการเติบโตของพอร์ต</p>
            <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-2 text-center">
          {portfolioHistory.map((item, index) => (
            <div key={index} className="text-sm">
              <p className="text-gray-600">{item.month}</p>
              <p className="font-medium text-gray-900">฿{item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">คำแนะนำการลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 mb-2">การปรับสมดุลพอร์ต</h5>
                <p className="text-sm text-blue-700">แนะนำให้รีบาลานซ์พอร์ตในเดือนหน้าเพื่อรักษาสัดส่วนการลงทุนที่เหมาะสม</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-green-900 mb-2">โอกาสการลงทุน</h5>
                <p className="text-sm text-green-700">หุ้น SET50 ปรับตัวลง 5% เหมาะสำหรับการซื้อเพิ่ม (DCA)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
