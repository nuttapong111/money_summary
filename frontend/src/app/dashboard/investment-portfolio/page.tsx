'use client'

import { useState } from 'react'
import { 
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Investment {
  name: string
  value: number
  change: number
  type: string
  allocation: number
  risk: string
}

export default function InvestmentPortfolioPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    value: '',
    type: 'stock',
    risk: 'medium'
  })

  // Mock data
  const portfolio = {
    totalValue: 275000,
    totalReturn: 12.5,
    benchmark: 8.2,
    performance: 'outperform'
  }

  const [investments, setInvestments] = useState<Investment[]>([
    { name: 'หุ้น SET50', value: 150000, change: 5.2, type: 'stock', allocation: 25, risk: 'medium' },
    { name: 'กองทุนรวม', value: 80000, change: -2.1, type: 'fund', allocation: 15, risk: 'low' },
    { name: 'ทองคำ', value: 45000, change: 8.7, type: 'gold', allocation: 10, risk: 'low' },
    { name: 'พันธบัตรรัฐบาล', value: 120000, change: 3.1, type: 'bond', allocation: 20, risk: 'very-low' },
    { name: 'อสังหาฯ', value: 800000, change: 6.8, type: 'realestate', allocation: 30, risk: 'high' }
  ])

  const assetAllocation = [
    { type: 'หุ้น', percentage: 25, color: 'bg-blue-500', value: 150000 },
    { type: 'กองทุนรวม', percentage: 15, color: 'bg-green-500', value: 80000 },
    { type: 'ทองคำ', percentage: 10, color: 'bg-yellow-500', value: 45000 },
    { type: 'พันธบัตร', percentage: 20, color: 'bg-purple-500', value: 120000 },
    { type: 'อสังหาฯ', percentage: 30, color: 'bg-red-500', value: 800000 }
  ]

  const portfolioHistory = [
    { month: 'ม.ค.', value: 250000 },
    { month: 'ก.พ.', value: 255000 },
    { month: 'มี.ค.', value: 248000 },
    { month: 'เม.ย.', value: 260000 },
    { month: 'พ.ค.', value: 268000 },
    { month: 'มิ.ย.', value: 275000 }
  ]

  const investmentTypes = [
    { value: 'stock', label: 'หุ้น' },
    { value: 'fund', label: 'กองทุนรวม' },
    { value: 'bond', label: 'พันธบัตร' },
    { value: 'gold', label: 'ทองคำ' },
    { value: 'realestate', label: 'อสังหาฯ' },
    { value: 'crypto', label: 'คริปโต' }
  ]

  const riskLevels = [
    { value: 'very-low', label: 'ต่ำมาก' },
    { value: 'low', label: 'ต่ำ' },
    { value: 'medium', label: 'ปานกลาง' },
    { value: 'high', label: 'สูง' }
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

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.value) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const value = parseFloat(newInvestment.value)
    const newInv: Investment = {
      name: newInvestment.name,
      value,
      change: 0, // เริ่มต้นที่ 0%
      type: newInvestment.type,
      allocation: 0, // จะคำนวณใหม่
      risk: newInvestment.risk
    }

    setInvestments(prev => [...prev, newInv])
    setNewInvestment({
      name: '',
      value: '',
      type: 'stock',
      risk: 'medium'
    })
    setShowAddForm(false)
  }

  // สร้าง Pie Chart SVG แบบ Modern
  const createPieChart = () => {
    const radius = 80
    const centerX = 100
    const centerY = 100
    let currentAngle = 0

    return assetAllocation.map((asset, index) => {
      const percentage = asset.percentage
      const angle = (percentage / 100) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      
      currentAngle = endAngle

      const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180)
      const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
      const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180)
      const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)

      const largeArcFlag = angle > 180 ? 1 : 0

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ')

      // สร้าง shadow effect และ gradient
      return (
        <g key={index}>
          {/* Shadow */}
          <path
            d={pathData}
            fill="rgba(0,0,0,0.1)"
            transform="translate(2,2)"
          />
          {/* Main slice */}
          <path
            d={pathData}
            fill={asset.color.replace('bg-', '').replace('-500', '')}
            className="hover:opacity-80 transition-all duration-300 cursor-pointer drop-shadow-lg"
            stroke="white"
            strokeWidth="2"
          />
        </g>
      )
    })
  }

  // สร้าง Line Chart SVG แบบ Modern
  const createLineChart = () => {
    const width = 600
    const height = 200
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    const maxValue = Math.max(...portfolioHistory.map(item => item.value))
    const minValue = Math.min(...portfolioHistory.map(item => item.value))
    const valueRange = maxValue - minValue

    const points = portfolioHistory.map((item, index) => {
      const x = padding + (index / (portfolioHistory.length - 1)) * chartWidth
      const y = padding + ((maxValue - item.value) / valueRange) * chartHeight
      return { x, y, value: item.value, month: item.month }
    })

    const pathData = points.map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      return `L ${point.x} ${point.y}`
    }).join(' ')

    // สร้าง gradient สำหรับ line
    const gradientId = "lineGradient"

    return (
      <svg width={width} height={height} className="w-full h-full">
        {/* Definitions for gradients */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8"/>
          </linearGradient>
        </defs>

        {/* Background grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i / 4) * chartHeight}
            x2={width - padding}
            y2={padding + (i / 4) * chartHeight}
            stroke="#f3f4f6"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
        
        {/* Area fill under line */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
          fill="url(#lineGradient)"
          opacity="0.1"
        />
        
        {/* Main line chart */}
        <path
          d={pathData}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-lg"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points with modern design */}
        {points.map((point, index) => (
          <g key={index}>
            {/* Point shadow */}
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="rgba(0,0,0,0.1)"
              transform="translate(1,1)"
            />
            {/* Main point */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="#3b82f6"
              strokeWidth="2"
              className="hover:r-6 transition-all duration-200 cursor-pointer drop-shadow-md"
            />
          </g>
        ))}
        
        {/* Y-axis labels with better positioning */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = Math.round(minValue + (i / 4) * valueRange)
          const y = padding + (i / 4) * chartHeight
          return (
            <g key={i}>
              <line
                x1={padding - 5}
                y1={y}
                x2={padding}
                y2={y}
                stroke="#d1d5db"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#6b7280"
                className="font-medium"
              >
                ฿{value.toLocaleString()}
              </text>
            </g>
          )
        })}
        
        {/* X-axis labels with better positioning */}
        {points.map((point, index) => (
          <g key={index}>
            <line
              x1={point.x}
              y1={height - padding}
              x2={point.x}
              y2={height - padding + 5}
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <text
              x={point.x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
              className="font-medium"
            >
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">พอร์ตการลงทุน</h1>
          <p className="text-gray-600">จัดการและติดตามการลงทุนของคุณ</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>เพิ่มรายการการลงทุน</span>
        </button>
      </div>

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
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{asset.percentage}%</span>
                  <p className="text-xs text-gray-500">฿{asset.value?.toLocaleString() || '0'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation Pie Chart</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative">
              {/* Pie Chart SVG */}
              <svg width="200" height="200" className="mx-auto">
                {createPieChart()}
              </svg>
              
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">฿{portfolio.totalValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">มูลค่ารวม</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {assetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                <span className="text-gray-700">{asset.type}</span>
                <span className="text-gray-500">({asset.percentage}%)</span>
              </div>
            ))}
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
        <div className="h-64 flex items-center justify-center">
          {createLineChart()}
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

      {/* Add Investment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">เพิ่มรายการการลงทุน</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อการลงทุน</label>
                <input
                  type="text"
                  value={newInvestment.name}
                  onChange={(e) => setNewInvestment(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น หุ้น SET50, กองทุนรวม"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">มูลค่า (บาท)</label>
                <input
                  type="number"
                  value={newInvestment.value}
                  onChange={(e) => setNewInvestment(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทการลงทุน</label>
                <select
                  value={newInvestment.type}
                  onChange={(e) => setNewInvestment(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {investmentTypes?.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ระดับความเสี่ยง</label>
                <select
                  value={newInvestment.risk}
                  onChange={(e) => setNewInvestment(prev => ({ ...prev, risk: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {riskLevels?.map(risk => (
                    <option key={risk.value} value={risk.value}>{risk.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddInvestment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                เพิ่มรายการ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
