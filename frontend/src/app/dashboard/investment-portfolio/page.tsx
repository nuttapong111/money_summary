'use client'

import { useState, useEffect } from 'react'
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts'
import { Select, Input, Button, Modal, Form, InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface Investment {
  name: string
  value: number
  change: number
  type: string
  allocation: number
  risk: string
}

export default function InvestmentPortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    value: '',
    pricePerUnit: '',
    units: '',
    type: 'stock',
    risk: 'medium',
    market: '',
    stockName: ''
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  useEffect(() => {
    setMounted(true)
  }, [])


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
    { name: 'อสังหาฯ', value: 800000, change: 6.8, type: 'realestate', allocation: 30, risk: 'high' },
    { name: 'หุ้น PTT', value: 95000, change: 4.3, type: 'stock', allocation: 18, risk: 'medium' },
    { name: 'หุ้น SCB', value: 125000, change: -1.8, type: 'stock', allocation: 22, risk: 'medium' },
    { name: 'หุ้น AOT', value: 75000, change: 7.2, type: 'stock', allocation: 14, risk: 'medium' },
    { name: 'กองทุนรวมหุ้นไทย', value: 65000, change: 3.9, type: 'fund', allocation: 12, risk: 'medium' },
    { name: 'กองทุนรวมพันธบัตร', value: 55000, change: 2.1, type: 'fund', allocation: 10, risk: 'very-low' },
    { name: 'หุ้น CP', value: 110000, change: 6.5, type: 'stock', allocation: 20, risk: 'medium' },
    { name: 'หุ้น BBL', value: 85000, change: -0.8, type: 'stock', allocation: 16, risk: 'medium' },
    { name: 'หุ้น KBANK', value: 135000, change: 4.7, type: 'stock', allocation: 24, risk: 'medium' },
    { name: 'หุ้น TRUE', value: 70000, change: 8.9, type: 'stock', allocation: 13, risk: 'high' },
    { name: 'หุ้น ADVANC', value: 90000, change: 2.3, type: 'stock', allocation: 17, risk: 'medium' },
    { name: 'หุ้น BDMS', value: 115000, change: 5.8, type: 'stock', allocation: 21, risk: 'medium' },
    { name: 'หุ้น CPALL', value: 105000, change: 3.4, type: 'stock', allocation: 19, risk: 'medium' },
    { name: 'หุ้น DTAC', value: 80000, change: 1.7, type: 'stock', allocation: 15, risk: 'medium' },
    { name: 'หุ้น EGAT', value: 95000, change: 4.2, type: 'stock', allocation: 18, risk: 'medium' },
    { name: 'หุ้น GULF', value: 125000, change: 6.1, type: 'stock', allocation: 22, risk: 'high' },
    { name: 'หุ้น INTUCH', value: 110000, change: 2.8, type: 'stock', allocation: 20, risk: 'medium' }
  ])

  // Filtered and paginated investments
  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || investment.type === filterType
    const matchesRisk = filterRisk === 'all' || investment.risk === filterRisk
    return matchesSearch && matchesType && matchesRisk
  })

  const totalPages = Math.ceil(filteredInvestments.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentInvestments = filteredInvestments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

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

  // ข้อมูลตลาดหุ้น
  const stockMarkets = [
    { value: 'SET', label: 'ตลาดหลักทรัพย์แห่งประเทศไทย (SET)' },
    { value: 'MAI', label: 'ตลาดหลักทรัพย์เพื่อการลงทุนในธุรกิจใหม่ (MAI)' },
    { value: 'BOND', label: 'ตลาดพันธบัตร' },
    { value: 'FOREIGN', label: 'ตลาดต่างประเทศ' }
  ]

  // ข้อมูลหุ้นในตลาด SET
  const setStocks = [
    { value: 'SET50', label: 'SET50 Index Fund' },
    { value: 'PTT', label: 'PTT Public Company Limited' },
    { value: 'SCB', label: 'Siam Commercial Bank' },
    { value: 'CPALL', label: 'CP All Public Company Limited' },
    { value: 'ADVANC', label: 'Advanced Info Service' },
    { value: 'AOT', label: 'Airports of Thailand' },
    { value: 'TRUE', label: 'True Corporation' },
    { value: 'KBANK', label: 'Kasikornbank' },
    { value: 'BBL', label: 'Bangkok Bank' },
    { value: 'CPF', label: 'Charoen Pokphand Foods' }
  ]

  // ข้อมูลหุ้นในตลาด MAI
  const maiStocks = [
    { value: 'MAI', label: 'MAI Index Fund' },
    { value: 'TICON', label: 'TICON Industrial Connection' },
    { value: 'SPALI', label: 'Supalai' },
    { value: 'SIRI', label: 'Sansiri' },
    { value: 'ANAN', label: 'Ananda Development' }
  ]

  // ข้อมูลกองทุนรวม
  const mutualFunds = [
    { value: 'KTAM-SET50', label: 'KTAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'KTAM-SET100', label: 'KTAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'SCBAM-SET50', label: 'SCBAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'SCBAM-SET100', label: 'SCBAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'BAM-SET50', label: 'BAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'BAM-SET100', label: 'BAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'TMBAM-SET50', label: 'TMBAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'TMBAM-SET100', label: 'TMBAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'AAM-SET50', label: 'AAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'AAM-SET100', label: 'AAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'MFCAM-SET50', label: 'MFCAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'MFCAM-SET100', label: 'MFCAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'UOBAM-SET50', label: 'UOBAM - กองทุนเปิด SET50 Index Fund' },
    { value: 'UOBAM-SET100', label: 'UOBAM - กองทุนเปิด SET100 Index Fund' },
    { value: 'INVESCO-SET50', label: 'INVESCO - กองทุนเปิด SET50 Index Fund' },
    { value: 'INVESCO-SET100', label: 'INVESCO - กองทุนเปิด SET100 Index Fund' },
    { value: 'KTAM-BOND', label: 'KTAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'SCBAM-BOND', label: 'SCBAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'BAM-BOND', label: 'BAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'TMBAM-BOND', label: 'TMBAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'AAM-BOND', label: 'AAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'MFCAM-BOND', label: 'MFCAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'UOBAM-BOND', label: 'UOBAM - กองทุนเปิดพันธบัตรรัฐบาล' },
    { value: 'INVESCO-BOND', label: 'INVESCO - กองทุนเปิดพันธบัตรรัฐบาล' }
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

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงประเภทการลงทุน
  const handleInvestmentTypeChange = (type: string) => {
    setNewInvestment(prev => ({
      ...prev,
      type,
      market: '',
      stockName: ''
    }))
  }

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงตลาด
  const handleMarketChange = (market: string) => {
    setNewInvestment(prev => ({
      ...prev,
      market,
      stockName: ''
    }))
  }

  // ฟังก์ชันสำหรับคำนวณมูลค่ารวม
  const calculateTotalValue = (pricePerUnit: string, units: string) => {
    const price = parseFloat(pricePerUnit) || 0
    const unitCount = parseFloat(units) || 0
    return (price * unitCount).toFixed(2)
  }

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงราคาต่อหน่วย
  const handlePricePerUnitChange = (value: number | null) => {
    const pricePerUnit = value ? value.toString() : ''
    const totalValue = calculateTotalValue(pricePerUnit, newInvestment.units)
    setNewInvestment(prev => ({
      ...prev,
      pricePerUnit,
      value: totalValue
    }))
  }

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงจำนวนหน่วย
  const handleUnitsChange = (value: number | null) => {
    const units = value ? value.toString() : ''
    const totalValue = calculateTotalValue(newInvestment.pricePerUnit, units)
    setNewInvestment(prev => ({
      ...prev,
      units,
      value: totalValue
    }))
  }

  // ฟังก์ชันสำหรับดึงรายการหุ้นตามตลาด
  const getStocksByMarket = (market: string) => {
    switch (market) {
      case 'SET': return setStocks
      case 'MAI': return maiStocks
      default: return []
    }
  }

  // ฟังก์ชันสำหรับดึงรายการกองทุนรวม
  const getMutualFunds = () => {
    return mutualFunds
  }

  const handleAddInvestment = () => {
    if (!newInvestment.pricePerUnit || !newInvestment.units || !newInvestment.value) {
      alert('กรุณากรอกราคาต่อหน่วยและจำนวนหน่วยให้ครบถ้วน')
      return
    }

    // ตรวจสอบข้อมูลตามประเภทการลงทุน
    if (newInvestment.type === 'stock') {
      if (!newInvestment.market || !newInvestment.stockName) {
        alert('กรุณาเลือกตลาดและชื่อหุ้นให้ครบถ้วน')
        return
      }
    } else if (newInvestment.type === 'fund') {
      if (!newInvestment.stockName) {
        alert('กรุณาเลือกชื่อกองทุนให้ครบถ้วน')
        return
      }
    }

    const value = parseFloat(newInvestment.value)
    
    // สร้างชื่อการลงทุนจากข้อมูลที่เลือก
    let investmentName = newInvestment.name
    if (newInvestment.type === 'stock' && newInvestment.stockName) {
      const stock = getStocksByMarket(newInvestment.market).find(s => s.value === newInvestment.stockName)
      investmentName = stock ? stock.label : newInvestment.name
    } else if (newInvestment.type === 'fund' && newInvestment.stockName) {
      const fund = getMutualFunds().find(f => f.value === newInvestment.stockName)
      investmentName = fund ? fund.label : newInvestment.name
    }

    const newInv: Investment = {
      name: investmentName,
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
      pricePerUnit: '',
      units: '',
      type: 'stock',
      risk: 'medium',
      market: '',
      stockName: ''
    })
    setShowAddForm(false)
  }



  // สร้าง Pie Chart ด้วย Recharts
  const createPieChart = () => {
    // แปลงข้อมูลให้เข้ากับ Recharts format
    const pieData = assetAllocation.map(asset => ({
      name: asset.type,
      value: asset.percentage,
      color: asset.color === 'bg-blue-500' ? '#3b82f6' :
             asset.color === 'bg-green-500' ? '#10b981' :
             asset.color === 'bg-yellow-500' ? '#f59e0b' :
             asset.color === 'bg-purple-500' ? '#8b5cf6' :
             asset.color === 'bg-red-500' ? '#ef4444' : '#6b7280',
      amount: asset.value
    }))

    return (
      <div className="w-full h-full flex items-center justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            outerRadius={150}
            innerRadius={0}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="white"
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any, name: any, props: any) => [
              `${props.payload.name}: ${value}% (฿${props.payload.amount?.toLocaleString()})`,
              'สัดส่วน'
            ]}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px'
            }}
          />
        </PieChart>
      </div>
    )
  }

  // สร้าง Line Chart ด้วย Recharts
  const createLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={portfolioHistory}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
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
            tickFormatter={(value) => `฿${value.toLocaleString()}`}
          />
          <Tooltip 
            formatter={(value: any) => [`฿${value.toLocaleString()}`, 'มูลค่า']}
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
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorValue)"
            dot={{
              fill: '#ffffff',
              stroke: '#3b82f6',
              strokeWidth: 3,
              r: 6,
            }}
            activeDot={{
              r: 8,
              stroke: '#3b82f6',
              strokeWidth: 3,
              fill: '#ffffff',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
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
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ 
                      backgroundColor: asset.color === 'bg-blue-500' ? '#3b82f6' :
                                  asset.color === 'bg-green-500' ? '#10b981' :
                                  asset.color === 'bg-yellow-500' ? '#f59e0b' :
                                  asset.color === 'bg-purple-500' ? '#8b5cf6' :
                                  asset.color === 'bg-red-500' ? '#ef4444' : '#6b7280'
                    }}
                  ></div>
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
          <div className="h-[500px] flex items-center justify-center">
            <div className="relative flex items-center justify-center w-full">
              {/* Pie Chart */}
              {mounted && createPieChart()}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Categories */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดการลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* หุ้นไทย */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">หุ้นไทย</h4>
                  <p className="text-sm text-gray-600">หุ้นในตลาดหลักทรัพย์ไทย SET, MAI</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ปานกลาง
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+4.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿1,235,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">15 รายการ</span>
              </div>
            </div>
          </div>

          {/* กองทุนรวม */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">กองทุนรวม</h4>
                  <p className="text-sm text-gray-600">กองทุนรวมในประเทศไทยและต่างประเทศ</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ต่ำ
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿687,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">4 รายการ</span>
              </div>
            </div>
          </div>

          {/* พันธบัตร */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">พันธบัตร</h4>
                  <p className="text-sm text-gray-600">พันธบัตรรัฐบาลและเอกชน</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ต่ำมาก
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+3.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿550,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">2 รายการ</span>
              </div>
            </div>
          </div>

          {/* ทองคำ */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ChartPieIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">ทองคำ</h4>
                  <p className="text-sm text-gray-600">สินค้าโภคภัณฑ์และโลหะมีค่า</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ต่ำ
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+8.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿275,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">1 รายการ</span>
              </div>
            </div>
          </div>

          {/* อสังหาฯ */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">อสังหาฯ</h4>
                  <p className="text-sm text-gray-600">อสังหาริมทรัพย์และ REITs</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                สูง
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+6.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿825,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">3 รายการ</span>
              </div>
            </div>
          </div>

          {/* ETF */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">ETF</h4>
                  <p className="text-sm text-gray-600">Exchange Traded Funds</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ปานกลาง
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">สัดส่วน:</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ผลตอบแทน:</span>
                <span className="text-sm font-medium text-green-600">+5.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">มูลค่า:</span>
                <span className="text-lg font-bold text-gray-900">฿412,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">จำนวนรายการ:</span>
                <span className="text-sm font-medium text-gray-900">2 รายการ</span>
              </div>
            </div>
          </div>
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
        <div className="h-80 w-full overflow-hidden">
          {mounted && createLineChart()}
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

      {/* All Investments List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-primary-600" />
            <span>รายการการลงทุนทั้งหมด</span>
          </h3>
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 hover:bg-primary-700"
          >
            เพิ่มการลงทุน
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="ค้นหาการลงทุน..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filterType}
              onChange={(value) => {
                setFilterType(value)
                handleFilterChange()
              }}
              className="w-32"
              placeholder="ประเภท"
            >
              <Select.Option value="all">ทุกประเภท</Select.Option>
              {investmentTypes.map(type => (
                <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>
              ))}
            </Select>
            <Select
              value={filterRisk}
              onChange={(value) => {
                setFilterRisk(value)
                handleFilterChange()
              }}
              className="w-32"
              placeholder="ความเสี่ยง"
            >
              <Select.Option value="all">ทุกระดับ</Select.Option>
              {riskLevels.map(risk => (
                <Select.Option key={risk.value} value={risk.value}>{risk.label}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Investments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การลงทุน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  มูลค่า (บาท)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สัดส่วน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผลตอบแทน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ความเสี่ยง
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentInvestments.map((investment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {investmentTypes.find(t => t.value === investment.type)?.label || investment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ฿{investment.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {investment.allocation}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {investment.change >= 0 ? '+' : ''}{investment.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      investment.risk === 'very-low' ? 'bg-green-100 text-green-800' :
                      investment.risk === 'low' ? 'bg-blue-100 text-blue-800' :
                      investment.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {riskLevels.find(r => r.value === investment.risk)?.label || investment.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">แสดง</span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="w-20"
            >
              <Select.Option value={5}>5</Select.Option>
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={20}>20</Select.Option>
              <Select.Option value={50}>50</Select.Option>
            </Select>
            <span className="text-sm text-gray-700">รายการต่อหน้า</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              แสดง {startIndex + 1}-{Math.min(endIndex, filteredInvestments.length)} จาก {filteredInvestments.length} รายการ
            </span>
            <div className="flex space-x-1">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1"
                size="small"
              >
                ก่อนหน้า
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                if (page > totalPages) return null
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    type={page === currentPage ? 'primary' : 'default'}
                    className="px-3 py-1"
                    size="small"
                  >
                    {page}
                  </Button>
                )
              })}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1"
                size="small"
              >
                ถัดไป
              </Button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ราคาต่อหน่วย (บาท)</label>
                <InputNumber
                  value={newInvestment.pricePerUnit ? parseFloat(newInvestment.pricePerUnit) : undefined}
                  onChange={handlePricePerUnitChange}
                  className="w-full"
                  placeholder="0"
                  formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => parseFloat(value!.replace(/฿\s?|(,*)/g, ''))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนหน่วย</label>
                <InputNumber
                  value={newInvestment.units ? parseFloat(newInvestment.units) : undefined}
                  onChange={handleUnitsChange}
                  className="w-full"
                  placeholder="0"
                  min={0}
                  step={0.01}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">มูลค่ารวม (บาท)</label>
                <InputNumber
                  value={newInvestment.value ? parseFloat(newInvestment.value) : undefined}
                  onChange={(value) => setNewInvestment(prev => ({ ...prev, value: value ? value.toString() : '' }))}
                  className="w-full"
                  placeholder="0"
                  formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => parseFloat(value!.replace(/฿\s?|(,*)/g, ''))}
                  min={0}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทการลงทุน</label>
                <Select
                  value={newInvestment.type}
                  onChange={handleInvestmentTypeChange}
                  className="w-full"
                  placeholder="พิมพ์ค้นหาและเลือกประเภทการลงทุน (เช่น หุ้น, กองทุนรวม, พันธบัตร, ทองคำ)"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={investmentTypes}
                  notFoundContent="ไม่พบประเภทการลงทุนที่ค้นหา"
                />
              </div>

              {/* แสดงตลาดเมื่อเลือกหุ้น */}
              {(newInvestment.type === 'stock') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ตลาด</label>
                  <Select
                    value={newInvestment.market}
                    onChange={handleMarketChange}
                    className="w-full"
                    placeholder="พิมพ์ค้นหาและเลือกตลาด (เช่น SET, MAI, พันธบัตร, ต่างประเทศ)"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={stockMarkets}
                    notFoundContent="ไม่พบตลาดที่ค้นหา"
                  />
                </div>
              )}

              {/* แสดงชื่อหุ้นเมื่อเลือกตลาด */}
              {(newInvestment.type === 'stock' && newInvestment.market) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อหุ้น</label>
                  <Select
                    value={newInvestment.stockName}
                    onChange={(value) => setNewInvestment(prev => ({ ...prev, stockName: value }))}
                    className="w-full"
                    placeholder="พิมพ์ค้นหาและเลือกหุ้น (เช่น SET50, PTT, SCB, CPALL)"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={getStocksByMarket(newInvestment.market)}
                    notFoundContent="ไม่พบหุ้นที่ค้นหา"
                  />
                </div>
              )}

              {/* แสดงชื่อกองทุนเมื่อเลือกกองทุนรวม */}
              {(newInvestment.type === 'fund') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อกองทุน</label>
                  <Select
                    value={newInvestment.stockName}
                    onChange={(value) => setNewInvestment(prev => ({ ...prev, stockName: value }))}
                    className="w-full"
                    placeholder="พิมพ์ค้นหาและเลือกกองทุน (เช่น KTAM, SCBAM, SET50, พันธบัตร)"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={getMutualFunds()}
                    notFoundContent="ไม่พบกองทุนที่ค้นหา"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ระดับความเสี่ยง</label>
                <Select
                  value={newInvestment.risk}
                  onChange={(value) => setNewInvestment(prev => ({ ...prev, risk: value }))}
                  className="w-full"
                  placeholder="พิมพ์ค้นหาและเลือกระดับความเสี่ยง (เช่น ต่ำมาก, ต่ำ, ปานกลาง, สูง)"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={riskLevels}
                  notFoundContent="ไม่พบระดับความเสี่ยงที่ค้นหา"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2"
              >
                ยกเลิก
              </Button>
              <Button
                type="primary"
                onClick={handleAddInvestment}
                className="px-4 py-2"
              >
                เพิ่มรายการ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
