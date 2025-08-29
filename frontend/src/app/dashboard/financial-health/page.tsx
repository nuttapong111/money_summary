'use client'

import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

export default function FinancialHealthPage() {
  // Mock data
  const financialHealth = {
    overallScore: 85,
    grade: 'A',
    status: 'ดีมาก',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }

  const financialRatios = {
    emergencyFund: {
      value: 4.2,
      target: 6,
      status: 'warning',
      description: 'เงินสำรองฉุกเฉิน (เดือน)',
      recommendation: 'ควรเพิ่มเป็น 6 เดือน'
    },
    debtToIncome: {
      value: 16,
      target: 28,
      status: 'good',
      description: 'อัตราส่วนหนี้สินต่อรายได้ (%)',
      recommendation: 'อยู่ในระดับที่ดี'
    },
    investmentToIncome: {
      value: 36,
      target: 20,
      status: 'excellent',
      description: 'อัตราส่วนการลงทุนต่อรายได้ (%)',
      recommendation: 'ดีมาก ควรรักษาระดับนี้ไว้'
    },
    savingsRate: {
      value: 30,
      target: 20,
      status: 'excellent',
      description: 'อัตราการออม (%)',
      recommendation: 'ดีมาก ควรรักษาระดับนี้ไว้'
    },
    // เพิ่มเกณฑ์ชี้วัดใหม่
    netWorthRatio: {
      value: 2.8,
      target: 2.0,
      status: 'excellent',
      description: 'อัตราส่วนมูลค่าสินทรัพย์สุทธิต่อรายได้ (ปี)',
      recommendation: 'ดีมาก มีมูลค่าสินทรัพย์สุทธิสูง'
    },
    liquidityRatio: {
      value: 3.2,
      target: 2.5,
      status: 'excellent',
      description: 'อัตราส่วนสภาพคล่อง (สินทรัพย์หมุนเวียน/หนี้สินระยะสั้น)',
      recommendation: 'ดีมาก มีสภาพคล่องสูง'
    },
    housingExpenseRatio: {
      value: 22,
      target: 28,
      status: 'excellent',
      description: 'อัตราส่วนค่าใช้จ่ายที่อยู่อาศัยต่อรายได้ (%)',
      recommendation: 'ดีมาก ค่าใช้จ่ายที่อยู่อาศัยเหมาะสม'
    },
    transportationExpenseRatio: {
      value: 8,
      target: 15,
      status: 'excellent',
      description: 'อัตราส่วนค่าใช้จ่ายการเดินทางต่อรายได้ (%)',
      recommendation: 'ดีมาก ค่าใช้จ่ายการเดินทางต่ำ'
    },
    insuranceCoverage: {
      value: 8.5,
      target: 10,
      status: 'good',
      description: 'ความคุ้มครองประกันชีวิต (เท่าของรายได้ต่อปี)',
      recommendation: 'ควรเพิ่มความคุ้มครองเป็น 10 เท่า'
    },
    retirementReadiness: {
      value: 65,
      target: 80,
      status: 'warning',
      description: 'ความพร้อมสำหรับการเกษียณอายุ (%)',
      recommendation: 'ควรเพิ่มการออมเพื่อการเกษียณอายุ'
    },
    creditScore: {
      value: 720,
      target: 750,
      status: 'good',
      description: 'คะแนนเครดิต (Credit Score)',
      recommendation: 'ดี ควรเพิ่มเป็น 750+ เพื่อได้อัตราดอกเบี้ยที่ดี'
    },
    taxEfficiency: {
      value: 75,
      target: 80,
      status: 'good',
      description: 'ประสิทธิภาพการลดหย่อนภาษี (%)',
      recommendation: 'ดี ควรใช้สิทธิ์ลดหย่อนภาษีให้ครบถ้วน'
    }
  }

  const ageBasedStandards = {
    '20-30': {
      emergencyFund: '3-6 เดือน',
      debtToIncome: '25%',
      investmentToIncome: '15%',
      savingsRate: '15%'
    },
    '30-40': {
      emergencyFund: '6-9 เดือน',
      debtToIncome: '28%',
      investmentToIncome: '20%',
      savingsRate: '20%'
    },
    '40-50': {
      emergencyFund: '9-12 เดือน',
      debtToIncome: '25%',
      investmentToIncome: '25%',
      savingsRate: '25%'
    },
    '50+': {
      emergencyFund: '12+ เดือน',
      debtToIncome: '20%',
      investmentToIncome: '30%',
      savingsRate: '30%'
    }
  }

  const userAgeGroup = '30-40'

  // ข้อมูลสำหรับกราฟ
  const progressData = [
    { month: 'ม.ค.', emergencyFund: 3.5, debtRatio: 18, investmentRatio: 32, savingsRate: 28 },
    { month: 'ก.พ.', emergencyFund: 3.8, debtRatio: 17, investmentRatio: 33, savingsRate: 29 },
    { month: 'มี.ค.', emergencyFund: 4.0, debtRatio: 16.5, investmentRatio: 34, savingsRate: 29.5 },
    { month: 'เม.ย.', emergencyFund: 4.1, debtRatio: 16.2, investmentRatio: 35, savingsRate: 30 },
    { month: 'พ.ค.', emergencyFund: 4.2, debtRatio: 16, investmentRatio: 36, savingsRate: 30 },
    { month: 'มิ.ย.', emergencyFund: 4.2, debtRatio: 16, investmentRatio: 36, savingsRate: 30 }
  ]

  const categoryScores = [
    { name: 'การออม', score: 92, fill: '#10B981' },
    { name: 'การลงทุน', score: 85, fill: '#3B82F6' },
    { name: 'การจัดการหนี้', score: 78, fill: '#F59E0B' },
    { name: 'การป้องกันความเสี่ยง', score: 88, fill: '#8B5CF6' }
  ]

  const monthlyComparison = [
    { month: 'ม.ค.', income: 85000, expenses: 59500, savings: 25500, investment: 30600 },
    { month: 'ก.พ.', income: 87000, expenses: 60900, savings: 26100, investment: 31320 },
    { month: 'มี.ค.', income: 89000, expenses: 62300, savings: 26700, investment: 32040 },
    { month: 'เม.ย.', income: 91000, expenses: 63700, savings: 27300, investment: 32760 },
    { month: 'พ.ค.', income: 93000, expenses: 65100, savings: 27900, investment: 33480 },
    { month: 'มิ.ย.', income: 95000, expenses: 66500, savings: 28500, investment: 34200 }
  ]

  const riskProfileData = [
    { metric: 'ความเสี่ยงสูง', current: 15, target: 10 },
    { metric: 'ความเสี่ยงปานกลาง', current: 45, target: 40 },
    { metric: 'ความเสี่ยงต่ำ', current: 40, target: 50 }
  ]

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'danger': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'ดีมาก'
      case 'good': return 'ดี'
      case 'warning': return 'ควรปรับปรุง'
      case 'danger': return 'ต้องปรับปรุง'
      default: return 'ไม่ระบุ'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircleIcon
      case 'good': return CheckCircleIcon
      case 'warning': return ExclamationTriangleIcon
      case 'danger': return ExclamationCircleIcon
      default: return InformationCircleIcon
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Financial Health Score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">คะแนนสุขภาพการเงินรวม</h3>
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className={`w-32 h-32 rounded-full ${financialHealth.bgColor} flex items-center justify-center mx-auto mb-4`}>
              <div className="text-center">
                <span className={`text-4xl font-bold ${financialHealth.color}`}>{financialHealth.overallScore}</span>
                <p className={`text-lg font-medium ${financialHealth.color}`}>/100</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${financialHealth.bgColor} inline-block`}>
              <span className={`text-lg font-bold ${financialHealth.color}`}>เกรด {financialHealth.grade}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{financialHealth.status}</h4>
            <p className="text-gray-600 mb-4">
              คุณมีสุขภาพการเงินที่ดี ควรรักษาระดับนี้ไว้และพัฒนาต่อไป
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${financialHealth.bgColor} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${financialHealth.overallScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ความคืบหน้า: {financialHealth.overallScore}% ของเป้าหมาย
            </p>
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">อัตราส่วนทางการเงินสำคัญ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(financialRatios).map(([key, ratio]) => {
            const IconComponent = getStatusIcon(ratio.status)
            const progress = (ratio.value / ratio.target) * 100
            
            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">{ratio.description}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ratio.status)}`}>
                    {getStatusText(ratio.status)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className={`w-6 h-6 ${
                    ratio.status === 'excellent' ? 'text-green-600' :
                    ratio.status === 'good' ? 'text-blue-600' :
                    ratio.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{ratio.value}</span>
                    <span className="text-gray-500 ml-1">
                      {key === 'emergencyFund' ? ' เดือน' : 
                       key === 'netWorthRatio' ? ' เท่า' :
                       key === 'liquidityRatio' ? ' เท่า' :
                       key === 'insuranceCoverage' ? ' เท่า' :
                       key === 'creditScore' ? '' : '%'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>เป้าหมาย: {ratio.target}{key === 'emergencyFund' ? ' เดือน' : 
                      key === 'netWorthRatio' ? ' เท่า' :
                      key === 'liquidityRatio' ? ' เท่า' :
                      key === 'insuranceCoverage' ? ' เท่า' :
                      key === 'creditScore' ? '' : '%'}</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        ratio.status === 'excellent' ? 'bg-green-600' :
                        ratio.status === 'good' ? 'bg-blue-600' :
                        ratio.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">{ratio.recommendation}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Financial Wellness Score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">คะแนนสุขภาพการเงินแยกตามหมวดหมู่</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={categoryScores}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Radar
                  name="คะแนนสุขภาพการเงิน"
                  dataKey="score"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  formatter={(value, name) => [`${value}/100`, 'คะแนน']}
                  labelFormatter={(label) => `${label}`}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Score Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 mb-3">รายละเอียดคะแนน</h4>
            {categoryScores.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.fill }}
                  ></div>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: category.fill }}>
                    {category.score}
                  </div>
                  <div className="text-sm text-gray-500">/100</div>
                </div>
              </div>
            ))}
            
            {/* Overall Score */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(categoryScores.reduce((sum, cat) => sum + cat.score, 0) / categoryScores.length)}
                </div>
                <div className="text-sm font-medium text-purple-800">คะแนนรวมเฉลี่ย</div>
                <div className="text-xs text-purple-600">สุขภาพการเงินโดยรวม</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      {/* <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การประเมินความเสี่ยง</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ความเสี่ยงทางการเงิน</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-900">ความเสี่ยงสูง</span>
                <span className="text-sm text-red-600">ต่ำ</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-900">ความเสี่ยงปานกลาง</span>
                <span className="text-sm text-yellow-600">ปานกลาง</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">ความเสี่ยงต่ำ</span>
                <span className="text-sm text-green-600">สูง</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ความสามารถในการรับความเสี่ยง</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">ความสามารถในการรับความเสี่ยง</span>
                <span className="text-sm text-blue-600">สูง</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">ความเหมาะสมของพอร์ต</span>
                <span className="text-sm text-green-600">เหมาะสม</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-900">ความสมดุลของพอร์ต</span>
                <span className="text-sm text-purple-600">สมดุล</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Age-based Standards */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">มาตรฐานตามช่วงอายุ</h3>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">กลุ่มอายุของคุณ: {userAgeGroup}</p>
              <p className="text-sm text-blue-700">เปรียบเทียบกับมาตรฐานของคนในกลุ่มอายุเดียวกัน</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เกณฑ์
                </th>
                {Object.keys(ageBasedStandards).map(ageGroup => (
                  <th key={ageGroup} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    ageGroup === userAgeGroup ? 'bg-blue-100' : ''
                  }`}>
                    {ageGroup === userAgeGroup ? `${ageGroup} (คุณ)` : ageGroup}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  เงินออมฉุกเฉิน
                </td>
                {Object.entries(ageBasedStandards).map(([ageGroup, standards]) => (
                  <td key={ageGroup} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    ageGroup === userAgeGroup ? 'bg-blue-50' : ''
                  }`}>
                    {standards.emergencyFund}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  อัตราส่วนหนี้สิน
                </td>
                {Object.entries(ageBasedStandards).map(([ageGroup, standards]) => (
                  <td key={ageGroup} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    ageGroup === userAgeGroup ? 'bg-blue-50' : ''
                  }`}>
                    {standards.debtToIncome}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  อัตราส่วนการลงทุน
                </td>
                {Object.entries(ageBasedStandards).map(([ageGroup, standards]) => (
                  <td key={ageGroup} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    ageGroup === userAgeGroup ? 'bg-blue-50' : ''
                  }`}>
                    {standards.investmentToIncome}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  อัตราการออม
                </td>
                {Object.entries(ageBasedStandards).map(([ageGroup, standards]) => (
                  <td key={ageGroup} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    ageGroup === userAgeGroup ? 'bg-blue-50' : ''
                  }`}>
                    {standards.savingsRate}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis and Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การวิเคราะห์และคำแนะนำปรับปรุง</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">จุดแข็ง</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">อัตราการออม</p>
                    <p className="text-sm text-green-700">คุณมีอัตราการออม 30% ซึ่งสูงกว่ามาตรฐาน 20%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">การลงทุน</p>
                    <p className="text-sm text-green-700">คุณมีการลงทุน 36% ของรายได้ ซึ่งสูงกว่ามาตรฐาน 20%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">การจัดการหนี้สิน</p>
                    <p className="text-sm text-green-700">อัตราส่วนหนี้สินต่อรายได้ 16% ต่ำกว่ามาตรฐาน 28%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">จุดที่ควรปรับปรุง</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">เงินออมฉุกเฉิน</p>
                    <p className="text-sm text-yellow-700">ควรเพิ่มจาก 4.2 เดือนเป็น 6 เดือนตามมาตรฐาน</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">การกระจายความเสี่ยง</p>
                    <p className="text-sm text-blue-700">พิจารณาเพิ่มการลงทุนในต่างประเทศเพื่อกระจายความเสี่ยง</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนการปรับปรุง</h3>
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h5 className="font-medium text-purple-900 mb-2">ระยะสั้น (1-3 เดือน)</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• เพิ่มเงินออมฉุกเฉินเป็น 6 เดือน</li>
              <li>• ตรวจสอบและปรับปรุงแผนการลงทุน</li>
              <li>• ตั้งเป้าหมายการออมรายเดือน</li>
            </ul>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h5 className="font-medium text-indigo-900 mb-2">ระยะกลาง (3-12 เดือน)</h5>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• เพิ่มการกระจายความเสี่ยงในการลงทุน</li>
              <li>• พิจารณาการลงทุนในต่างประเทศ</li>
              <li>• ปรับปรุงแผนการเกษียณอายุ</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">ระยะยาว (1+ ปี)</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• เพิ่มเงินออมฉุกเฉินเป็น 9 เดือน</li>
              <li>• พัฒนาแหล่งรายได้เพิ่มเติม</li>
              <li>• วางแผนการส่งมอบมรดก</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การติดตามความคืบหน้า</h3>
        
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
            <div className="text-sm text-green-700">ความคืบหน้าทั้งหมด</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
            <div className="text-sm text-blue-700">เดือนที่ติดตาม</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">+12%</div>
            <div className="text-sm text-purple-700">การปรับปรุงเฉลี่ย</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">4</div>
            <div className="text-sm text-orange-700">เป้าหมายที่บรรลุ</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Financial Ratios Progress */}
          <div className="card bg-white">
            <h4 className="font-medium text-gray-700 mb-4">ความคืบหน้าการปรับปรุงอัตราส่วนทางการเงิน</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    domain={[0, 40]}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'emergencyFund' ? `${value} เดือน` : `${value}%`, 
                      name === 'emergencyFund' ? 'เงินออมฉุกเฉิน' :
                      name === 'debtRatio' ? 'อัตราส่วนหนี้สิน' :
                      name === 'investmentRatio' ? 'อัตราส่วนการลงทุน' :
                      'อัตราการออม'
                    ]}
                    labelFormatter={(label) => `เดือน: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emergencyFund" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="เงินออมฉุกเฉิน"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="debtRatio" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="อัตราส่วนหนี้สิน"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="investmentRatio" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="อัตราส่วนการลงทุน"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savingsRate" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="อัตราการออม"
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart - Monthly Income vs Expenses */}
          <div className="card bg-white">
            <h4 className="font-medium text-gray-700 mb-4">รายได้ vs รายจ่าย รายเดือน</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `฿${value.toLocaleString()}`, 
                      name === 'income' ? 'รายได้' :
                      name === 'expenses' ? 'รายจ่าย' :
                      name === 'savings' ? 'เงินออม' :
                      'การลงทุน'
                    ]}
                    labelFormatter={(label) => `เดือน: ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stackId="1"
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.3}
                    name="รายได้"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="1"
                    stroke="#EF4444" 
                    fill="#EF4444" 
                    fillOpacity={0.3}
                    name="รายจ่าย"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                    name="เงินออม"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="investment" 
                    stackId="1"
                    stroke="#8B5CF6" 
                    fill="#8B82F6" 
                    fillOpacity={0.3}
                    name="การลงทุน"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart - Risk Profile Comparison */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-4">เปรียบเทียบโปรไฟล์ความเสี่ยง: ปัจจุบัน vs เป้าหมาย</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskProfileData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="metric" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 60]}
                />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name === 'current' ? 'ปัจจุบัน' : 'เป้าหมาย']}
                />
                <Legend />
                <Bar 
                  dataKey="current" 
                  fill="#3B82F6" 
                  name="ปัจจุบัน"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="#8B5CF6" 
                  name="เป้าหมาย"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3">สรุปความคืบหน้า</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 mb-1">✅ ดีขึ้น</div>
              <div className="text-blue-700">เงินออมฉุกเฉิน, อัตราการออม, การลงทุน</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 mb-1">🔄 คงที่</div>
              <div className="text-green-700">อัตราส่วนหนี้สิน, ค่าใช้จ่าย</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600 mb-1">📈 เป้าหมาย</div>
              <div className="text-yellow-700">เพิ่มเงินออมฉุกเฉินเป็น 6 เดือน</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
