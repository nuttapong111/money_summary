'use client'

import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">92</div>
            <div className="text-sm font-medium text-green-800">การออม</div>
            <div className="text-xs text-green-600">ดีมาก</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">85</div>
            <div className="text-sm font-medium text-blue-800">การลงทุน</div>
            <div className="text-xs text-blue-600">ดี</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">78</div>
            <div className="text-sm font-medium text-yellow-800">การจัดการหนี้</div>
            <div className="text-xs text-yellow-600">ควรปรับปรุง</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">88</div>
            <div className="text-sm font-medium text-purple-800">การป้องกันความเสี่ยง</div>
            <div className="text-xs text-purple-600">ดี</div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="card">
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
      </div>

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
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">กราฟแสดงความคืบหน้าการปรับปรุงสุขภาพการเงิน</p>
            <p className="text-sm text-gray-400">จะแสดงกราฟจริงเมื่อเชื่อมต่อ backend</p>
          </div>
        </div>
      </div>
    </div>
  )
}
