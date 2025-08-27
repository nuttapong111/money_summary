'use client'

import { 
  BuildingOfficeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function SubscriptionPage() {
  // Mock data
  const currentSubscription = {
    plan: 'Basic Plan',
    price: 299,
    features: ['Dashboard พื้นฐาน', 'ติดตามการลงทุน', 'รายงานรายเดือน'],
    nextBilling: '2024-02-15',
    status: 'active',
    autoRenew: true
  }

  const availablePlans = [
    {
      name: 'Free Plan',
      price: 0,
      features: ['Dashboard พื้นฐาน', 'ติดตามการลงทุน', 'รายงานรายเดือน'],
      popular: false,
      recommended: false
    },
    {
      name: 'Basic Plan',
      price: 299,
      features: ['Dashboard พื้นฐาน', 'ติดตามการลงทุน', 'รายงานรายเดือน', 'การแจ้งเตือน', 'การวิเคราะห์พื้นฐาน'],
      popular: false,
      recommended: false
    },
    {
      name: 'Premium Plan',
      price: 599,
      features: ['ทุกฟีเจอร์ใน Basic', 'AI Advisor', 'การวิเคราะห์ขั้นสูง', 'รายงานแบบกำหนดเอง', 'การสนับสนุน 24/7'],
      popular: true,
      recommended: true
    },
    {
      name: 'Enterprise Plan',
      price: 1299,
      features: ['ทุกฟีเจอร์ใน Premium', 'API Access', 'การวิเคราะห์แบบ Real-time', 'การสนับสนุนเฉพาะ', 'การฝึกอบรม'],
      popular: false,
      recommended: false
    }
  ]

  const paymentHistory = [
    {
      date: '2024-01-15',
      plan: 'Basic Plan',
      amount: 299,
      status: 'completed',
      receipt: 'INV-001-2024'
    },
    {
      date: '2023-12-15',
      plan: 'Basic Plan',
      amount: 299,
      status: 'completed',
      receipt: 'INV-001-2023'
    },
    {
      date: '2023-11-15',
      plan: 'Free Plan',
      amount: 0,
      status: 'trial',
      receipt: 'TRIAL-001'
    }
  ]

  const paymentInfo = {
    accountNumber: '123-4-56789-0',
    accountName: 'บริษัท เงินลงทุน จำกัด',
    bank: 'ธนาคารกรุงเทพ',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'trial': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งานอยู่'
      case 'pending': return 'รอการอนุมัติ'
      case 'cancelled': return 'ยกเลิกแล้ว'
      case 'trial': return 'ทดลองใช้'
      case 'completed': return 'เสร็จสิ้น'
      default: return 'ไม่ระบุ'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircleIcon
      case 'pending': return ClockIcon
      case 'cancelled': return XCircleIcon
      case 'trial': return InformationCircleIcon
      case 'completed': return CheckCircleIcon
      default: return InformationCircleIcon
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แพ็คเกจปัจจุบัน</h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{currentSubscription.plan}</h4>
              <p className="text-2xl font-bold text-primary-600">฿{currentSubscription.price}/เดือน</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(currentSubscription.status)}`}>
                {getStatusText(currentSubscription.status)}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                บิลถัดไป: {currentSubscription.nextBilling}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-700 mb-2">ฟีเจอร์ที่ได้รับ:</h5>
            <ul className="space-y-1">
              {currentSubscription.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id="autoRenew" 
                checked={currentSubscription.autoRenew}
                className="rounded"
              />
              <label htmlFor="autoRenew" className="text-sm text-gray-700">
                ต่ออายุอัตโนมัติ
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                เปลี่ยนแพ็คเกจ
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                ยกเลิกการสมัคร
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">แพ็คเกจที่ใช้ได้</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePlans.map((plan, index) => (
            <div key={index} className={`border rounded-lg p-6 ${
              plan.recommended ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
            }`}>
              {plan.popular && (
                <span className="inline-block bg-primary-600 text-white text-xs px-2 py-1 rounded-full mb-3">
                  ยอดนิยม
                </span>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{plan.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">฿{plan.price}</span>
                  <span className="text-gray-600">/เดือน</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-2 px-4 rounded-lg transition-colors ${
                plan.recommended 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {plan.price === 0 ? 'ใช้งานฟรี' : 
                 plan.recommended ? 'อัปเกรดตอนนี้' : 'เลือกแพ็คเกจ'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เปรียบเทียบแพ็คเกจ</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ฟีเจอร์
                </th>
                {availablePlans.map((plan, index) => (
                  <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    plan.recommended ? 'bg-primary-100' : ''
                  }`}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Dashboard พื้นฐาน
                </td>
                {availablePlans.map((plan, index) => (
                  <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    plan.recommended ? 'bg-primary-50' : ''
                  }`}>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  AI Advisor
                </td>
                {availablePlans.map((plan, index) => (
                  <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    plan.recommended ? 'bg-primary-50' : ''
                  }`}>
                    {plan.features.includes('AI Advisor') ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  การวิเคราะห์ขั้นสูง
                </td>
                {availablePlans.map((plan, index) => (
                  <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    plan.recommended ? 'bg-primary-50' : ''
                  }`}>
                    {plan.features.includes('การวิเคราะห์ขั้นสูง') ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการชำระเงิน</h3>
        <div className="space-y-4">
          {paymentHistory.map((payment, index) => {
            const IconComponent = getStatusIcon(payment.status)
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${
                      payment.status === 'completed' ? 'text-green-600' :
                      payment.status === 'pending' ? 'text-yellow-600' :
                      payment.status === 'cancelled' ? 'text-red-600' :
                      'text-blue-600'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{payment.plan}</h4>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      ฿{payment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ใบเสร็จ: {payment.receipt}</span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    ดาวน์โหลดใบเสร็จ
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Payment Information */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลการโอนเงิน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ข้อมูลบัญชีธนาคาร</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ธนาคาร:</span>
                <span className="font-medium">{paymentInfo.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เลขบัญชี:</span>
                <span className="font-mono font-medium">{paymentInfo.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ชื่อบัญชี:</span>
                <span className="font-medium">{paymentInfo.accountName}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">คำแนะนำ</p>
                  <p className="text-sm text-blue-700">
                    กรุณาโอนเงินตามจำนวนที่ระบุและส่งหลักฐานการโอนเงินมาที่หน้า "ส่งหลักฐานการชำระ"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">QR Code สำหรับชำระเงิน</h4>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">QR Code</p>
                  <p className="text-sm text-gray-400">สแกนเพื่อชำระเงิน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การจัดการการสมัคร</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การอัปเกรด/ดาวน์เกรด</h4>
            <div className="space-y-3">
              <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                <ArrowUpIcon className="w-5 h-5" />
                <span>อัปเกรดเป็น Premium</span>
              </button>
              
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <ArrowDownIcon className="w-5 h-5" />
                <span>ดาวน์เกรดเป็น Basic</span>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การตั้งค่าการสมัคร</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">การต่ออายุอัตโนมัติ</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                  เปิดใช้งาน
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">การแจ้งเตือนก่อนหมดอายุ</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  เปิดใช้งาน
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">การแจ้งเตือนการชำระเงิน</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  เปิดใช้งาน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
