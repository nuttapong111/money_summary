'use client'

import { 
  BellAlertIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowUpTrayIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function PaymentProofPage() {
  // Mock data
  const selectedPlan = {
    name: 'Premium Plan',
    price: 599,
    features: ['ทุกฟีเจอร์ใน Basic', 'AI Advisor', 'การวิเคราะห์ขั้นสูง', 'รายงานแบบกำหนดเอง', 'การสนับสนุน 24/7'],
    duration: '1 เดือน'
  }

  const paymentInfo = {
    accountNumber: '123-4-56789-0',
    accountName: 'บริษัท เงินลงทุน จำกัด',
    bank: 'ธนาคารกรุงเทพ',
    amount: 599,
    reference: 'REF-2024-001'
  }

  const submittedProofs = [
    {
      id: '1',
      plan: 'Premium Plan',
      amount: 599,
      date: '2024-01-20',
      status: 'pending',
      proofFile: 'payment_proof_001.jpg',
      submittedAt: '2024-01-20 14:30:00'
    },
    {
      id: '2',
      plan: 'Basic Plan',
      amount: 299,
      date: '2024-01-15',
      status: 'approved',
      proofFile: 'payment_proof_002.jpg',
      submittedAt: '2024-01-15 10:15:00',
      approvedAt: '2024-01-16 09:00:00'
    },
    {
      id: '3',
      plan: 'Basic Plan',
      amount: 299,
      date: '2024-01-10',
      status: 'rejected',
      proofFile: 'payment_proof_003.jpg',
      submittedAt: '2024-01-10 16:45:00',
      rejectedAt: '2024-01-11 11:30:00',
      reason: 'หลักฐานไม่ชัดเจน กรุณาส่งใหม่'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอตรวจสอบ'
      case 'approved': return 'อนุมัติแล้ว'
      case 'rejected': return 'ปฏิเสธ'
      default: return 'ไม่ระบุ'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon
      case 'approved': return CheckCircleIcon
      case 'rejected': return XCircleIcon
      default: return InformationCircleIcon
    }
  }

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เลือกแพ็คเกจที่ต้องการสมัคร</h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{selectedPlan.name}</h4>
              <p className="text-2xl font-bold text-primary-600">฿{selectedPlan.price}/เดือน</p>
              <p className="text-sm text-gray-600">ระยะเวลา: {selectedPlan.duration}</p>
            </div>
            
            <div className="text-right">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                แพ็คเกจที่เลือก
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-700 mb-2">ฟีเจอร์ที่ได้รับ:</h5>
            <ul className="space-y-1">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors">
            เปลี่ยนแพ็คเกจ
          </button>
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
              <div className="flex justify-between">
                <span className="text-gray-600">จำนวนเงิน:</span>
                <span className="font-semibold text-green-600">฿{paymentInfo.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เลขที่อ้างอิง:</span>
                <span className="font-mono font-medium">{paymentInfo.reference}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำการโอนเงิน</h4>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">ขั้นตอนการโอนเงิน</p>
                  <ol className="text-sm text-blue-700 space-y-1 mt-2">
                    <li>1. โอนเงินตามจำนวนที่ระบุ</li>
                    <li>2. เก็บสลิปการโอนเงิน</li>
                    <li>3. อัปโหลดหลักฐานการโอน</li>
                    <li>4. รอการตรวจสอบและอนุมัติ</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">หมายเหตุสำคัญ</p>
                  <p className="text-sm text-yellow-700">
                    กรุณาใส่เลขที่อ้างอิงในการโอนเงินเพื่อให้ตรวจสอบได้ง่าย
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Payment Proof */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">อัปโหลดหลักฐานการชำระเงิน</h3>
        <div className="space-y-6">
          {/* Payment Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่โอนเงิน
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เวลาที่โอนเงิน
              </label>
              <input 
                type="time" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue="12:00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนเงินที่โอน
              </label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={paymentInfo.amount}
                placeholder="จำนวนเงิน"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ธนาคารที่โอน
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>เลือกธนาคาร</option>
                <option>ธนาคารกรุงเทพ</option>
                <option>ธนาคารกสิกรไทย</option>
                <option>ธนาคารกรุงไทย</option>
                <option>ธนาคารไทยพาณิชย์</option>
                <option>ธนาคารกรุงศรี</option>
                <option>อื่นๆ</option>
              </select>
            </div>
          </div>
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อัปโหลดหลักฐานการโอนเงิน
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">คลิกเพื่ออัปโหลดสลิปการโอนเงิน</p>
              <p className="text-xs text-gray-500 mt-1">รองรับไฟล์ JPG, PNG, PDF ขนาดไม่เกิน 5MB</p>
              <button className="mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                เลือกไฟล์
              </button>
            </div>
          </div>
          
          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ข้อมูลเพิ่มเติม (ไม่บังคับ)
            </label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="ระบุข้อมูลเพิ่มเติม เช่น หมายเหตุการโอนเงิน, ข้อมูลติดต่อกลับ"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
              <BellAlertIcon className="w-5 h-5" />
              <span>ส่งหลักฐานการชำระเงิน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Proofs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">หลักฐานการชำระเงินที่ส่งแล้ว</h3>
        <div className="space-y-4">
          {submittedProofs.map((proof) => {
            const IconComponent = getStatusIcon(proof.status)
            
            return (
              <div key={proof.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${
                      proof.status === 'approved' ? 'text-green-600' :
                      proof.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{proof.plan}</h4>
                      <p className="text-sm text-gray-500">ส่งเมื่อ: {proof.submittedAt}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(proof.status)}`}>
                      {getStatusText(proof.status)}
                    </span>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      ฿{proof.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ไฟล์หลักฐาน:</span>
                    <span className="font-medium ml-2">{proof.proofFile}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">วันที่โอน:</span>
                    <span className="font-medium ml-2">{proof.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">สถานะ:</span>
                    <span className={`font-medium ml-2 ${
                      proof.status === 'approved' ? 'text-green-600' :
                      proof.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {getStatusText(proof.status)}
                    </span>
                  </div>
                </div>
                
                {proof.status === 'approved' && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">อนุมัติแล้ว</p>
                        <p className="text-sm text-green-700">อนุมัติเมื่อ: {proof.approvedAt}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {proof.status === 'rejected' && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-900">ปฏิเสธ</p>
                        <p className="text-sm text-red-700">ปฏิเสธเมื่อ: {proof.rejectedAt}</p>
                        <p className="text-sm text-red-700">เหตุผล: {proof.reason}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>ดูไฟล์</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1">
                      <DocumentTextIcon className="w-4 h-4" />
                      <span>ดาวน์โหลด</span>
                    </button>
                  </div>
                  
                  {proof.status === 'rejected' && (
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      ส่งใหม่
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status Tracking */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ติดตามสถานะ</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">ขั้นตอนการตรวจสอบ</p>
              <ol className="text-sm text-gray-700 space-y-1 mt-2">
                <li>1. <strong>ส่งหลักฐาน</strong> - คุณส่งหลักฐานการชำระเงิน</li>
                <li>2. <strong>รอตรวจสอบ</strong> - แอดมินตรวจสอบหลักฐาน (1-2 วันทำการ)</li>
                <li>3. <strong>อนุมัติ/ปฏิเสธ</strong> - แอดมินตัดสินใจและแจ้งผล</li>
                <li>4. <strong>เปิดใช้งาน</strong> - ระบบเปิดใช้งานแพ็คเกจใหม่ (หากอนุมัติ)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
