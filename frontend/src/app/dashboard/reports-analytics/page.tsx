'use client'

import { 
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export default function ReportsAnalyticsPage() {
  // Mock data
  const reports = [
    {
      name: 'รายงานรายเดือน',
      type: 'monthly',
      format: 'PDF',
      lastGenerated: '2024-01-15',
      status: 'ready',
      size: '2.3 MB'
    },
    {
      name: 'รายงานรายไตรมาส',
      type: 'quarterly',
      format: 'Excel',
      lastGenerated: '2024-01-01',
      status: 'ready',
      size: '4.1 MB'
    },
    {
      name: 'รายงานรายปี',
      type: 'yearly',
      format: 'PDF',
      lastGenerated: '2024-01-01',
      status: 'ready',
      size: '8.7 MB'
    }
  ]

  const trends = {
    income: {
      current: 50000,
      previous: 48000,
      change: 4.2,
      trend: 'up'
    },
    expenses: {
      current: 35000,
      previous: 36000,
      change: -2.8,
      trend: 'down'
    },
    investment: {
      current: 10000,
      previous: 9000,
      change: 11.1,
      trend: 'up'
    },
    savings: {
      current: 15000,
      previous: 12000,
      change: 25.0,
      trend: 'up'
    }
  }

  const taxReport = {
    totalInvestmentIncome: 45000,
    dividends: 15000,
    interest: 8000,
    capitalGains: 22000,
    taxDeductions: 200000,
    estimatedTax: 8500
  }

  const yearComparison = {
    current: 2024,
    previous: 2023,
    metrics: [
      {
        name: 'รายได้รวม',
        current: 600000,
        previous: 576000,
        change: 4.2
      },
      {
        name: 'รายจ่ายรวม',
        current: 420000,
        previous: 432000,
        change: -2.8
      },
      {
        name: 'การลงทุน',
        current: 120000,
        previous: 108000,
        change: 11.1
      },
      {
        name: 'เงินออม',
        current: 180000,
        previous: 144000,
        change: 25.0
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'generating': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'พร้อมดาวน์โหลด'
      case 'generating': return 'กำลังสร้าง'
      case 'error': return 'เกิดข้อผิดพลาด'
      default: return 'ไม่ระบุ'
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingUpIcon
  }

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') {
      return change > 0 ? 'text-green-600' : 'text-red-600'
    } else {
      return change > 0 ? 'text-red-600' : 'text-green-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายงานและวิเคราะห์</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                  {getStatusText(report.status)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>รูปแบบ:</span>
                  <span className="font-medium">{report.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>สร้างล่าสุด:</span>
                  <span className="font-medium">{report.lastGenerated}</span>
                </div>
                <div className="flex justify-between">
                  <span>ขนาดไฟล์:</span>
                  <span className="font-medium">{report.size}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>ดาวน์โหลด</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <DocumentTextIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การวิเคราะห์แนวโน้ม</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(trends).map(([key, trend]) => {
            const IconComponent = getTrendIcon(trend.trend)
            const trendColor = getTrendColor(trend.trend, trend.change)
            
            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">
                    {key === 'income' ? 'รายได้' :
                     key === 'expenses' ? 'รายจ่าย' :
                     key === 'investment' ? 'การลงทุน' : 'เงินออม'}
                  </h4>
                  <IconComponent className={`w-5 h-5 ${trendColor}`} />
                </div>
                
                <div className="mb-2">
                  <p className="text-2xl font-bold text-gray-900">฿{trend.current.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">เดือนปัจจุบัน</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">เดือนก่อน: ฿{trend.previous.toLocaleString()}</span>
                  <span className={`text-sm font-medium ${trendColor}`}>
                    {trend.change >= 0 ? '+' : ''}{trend.change}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tax Report */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายงานภาษี</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">รายได้จากการลงทุน</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">เงินปันผล</span>
                <span className="font-semibold text-green-600">฿{taxReport.dividends.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ดอกเบี้ย</span>
                <span className="font-semibold text-green-600">฿{taxReport.interest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">กำไรจากการขาย</span>
                <span className="font-semibold text-green-600">฿{taxReport.capitalGains.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>รวมรายได้จากการลงทุน</span>
                <span className="text-green-600">฿{taxReport.totalInvestmentIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การลดหย่อนภาษี</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">การลดหย่อนรวม</span>
                <span className="font-semibold text-blue-600">฿{taxReport.taxDeductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ภาษีที่คาดว่าจะต้องจ่าย</span>
                <span className="font-semibold text-red-600">฿{taxReport.estimatedTax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">คำแนะนำ</p>
                  <p className="text-sm text-blue-700">
                    พิจารณาเพิ่มการลงทุนใน SSF และ RMF เพื่อเพิ่มการลดหย่อนภาษี
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year Comparison */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การเปรียบเทียบกับปีที่ผ่านมา</h3>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">เปรียบเทียบ {yearComparison.current} vs {yearComparison.previous}</p>
              <p className="text-sm text-gray-600">ดูการเปลี่ยนแปลงของตัวชี้วัดทางการเงิน</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {yearComparison.metrics.map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{metric.name}</h4>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  metric.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{yearComparison.previous}</p>
                  <p className="text-lg font-semibold text-gray-900">฿{metric.previous.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{yearComparison.current}</p>
                  <p className="text-lg font-semibold text-gray-900">฿{metric.current.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{yearComparison.previous}</span>
                  <span>{yearComparison.current}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((metric.current / metric.previous) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ส่งออกข้อมูล</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">รูปแบบการส่งออก</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="pdf" className="rounded" />
                <label htmlFor="pdf" className="text-sm text-gray-700">PDF (แนะนำสำหรับการพิมพ์)</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="excel" className="rounded" />
                <label htmlFor="excel" className="text-sm text-gray-700">Excel (สำหรับการวิเคราะห์เพิ่มเติม)</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="csv" className="rounded" />
                <label htmlFor="csv" className="text-sm text-gray-700">CSV (สำหรับการนำเข้าข้อมูล)</label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ช่วงเวลาที่ต้องการ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="radio" name="period" id="monthly" className="rounded" />
                <label htmlFor="monthly" className="text-sm text-gray-700">รายเดือน</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" name="period" id="quarterly" className="rounded" />
                <label htmlFor="quarterly" className="text-sm text-gray-700">รายไตรมาส</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" name="period" id="yearly" className="rounded" />
                <label htmlFor="yearly" className="text-sm text-gray-700">รายปี</label>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>สร้างรายงาน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แดชบอร์ดการวิเคราะห์</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟและแผนภูมิการวิเคราะห์ข้อมูล</p>
            <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
      </div>
    </div>
  )
}
