'use client'

import { useState } from 'react'
import { 
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Risk Assessment Popup Component
function RiskAssessmentPopup({ isOpen, onClose, onComplete }: {
  isOpen: boolean
  onClose: () => void
  onComplete: (score: number, riskLevel: string) => void
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions = [
    {
      id: 'age',
      question: 'คุณอายุเท่าไร?',
      options: [
        { value: 1, label: 'ต่ำกว่า 25 ปี', score: 5 },
        { value: 2, label: '25-35 ปี', score: 4 },
        { value: 3, label: '36-45 ปี', score: 3 },
        { value: 4, label: '46-55 ปี', score: 2 },
        { value: 5, label: 'มากกว่า 55 ปี', score: 1 }
      ]
    },
    {
      id: 'investment_horizon',
      question: 'คุณวางแผนจะลงทุนนานเท่าไร?',
      options: [
        { value: 1, label: 'น้อยกว่า 1 ปี', score: 1 },
        { value: 2, label: '1-3 ปี', score: 2 },
        { value: 3, label: '3-5 ปี', score: 3 },
        { value: 4, label: '5-10 ปี', score: 4 },
        { value: 5, label: 'มากกว่า 10 ปี', score: 5 }
      ]
    },
    {
      id: 'risk_tolerance',
      question: 'คุณยอมรับความผันผวนของผลตอบแทนได้มากน้อยเพียงไร?',
      options: [
        { value: 1, label: 'ยอมรับได้น้อยมาก (ต้องการความเสถียร)', score: 1 },
        { value: 2, label: 'ยอมรับได้น้อย', score: 2 },
        { value: 3, label: 'ยอมรับได้ปานกลาง', score: 3 },
        { value: 4, label: 'ยอมรับได้มาก', score: 4 },
        { value: 5, label: 'ยอมรับได้มากมาก (ต้องการผลตอบแทนสูง)', score: 5 }
      ]
    },
    {
      id: 'financial_goals',
      question: 'เป้าหมายการเงินหลักของคุณคืออะไร?',
      options: [
        { value: 1, label: 'รักษาทุน (Capital Preservation)', score: 1 },
        { value: 2, label: 'สร้างรายได้ (Income Generation)', score: 2 },
        { value: 3, label: 'เติบโตปานกลาง (Moderate Growth)', score: 3 },
        { value: 4, label: 'เติบโตสูง (High Growth)', score: 4 },
        { value: 5, label: 'เติบโตสูงมาก (Aggressive Growth)', score: 5 }
      ]
    },
    {
      id: 'emergency_fund',
      question: 'คุณมีเงินออมฉุกเฉินกี่เดือน?',
      options: [
        { value: 1, label: 'ไม่มี', score: 1 },
        { value: 2, label: '1-3 เดือน', score: 2 },
        { value: 3, label: '3-6 เดือน', score: 3 },
        { value: 4, label: '6-12 เดือน', score: 4 },
        { value: 5, label: 'มากกว่า 12 เดือน', score: 5 }
      ]
    },
    {
      id: 'debt_level',
      question: 'ระดับหนี้สินของคุณเป็นอย่างไร?',
      options: [
        { value: 1, label: 'ไม่มีหนี้', score: 5 },
        { value: 2, label: 'หนี้ต่ำ (น้อยกว่า 20% ของรายได้)', score: 4 },
        { value: 3, label: 'หนี้ปานกลาง (20-40% ของรายได้)', score: 3 },
        { value: 4, label: 'หนี้สูง (40-60% ของรายได้)', score: 2 },
        { value: 5, label: 'หนี้สูงมาก (มากกว่า 60% ของรายได้)', score: 1 }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 5
    return Math.round((totalScore / maxScore) * 100)
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'สูงมาก'
    if (score >= 60) return 'สูง'
    if (score >= 40) return 'ปานกลาง'
    if (score >= 20) return 'ต่ำ'
    return 'ต่ำมาก'
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('กรุณาตอบคำถามให้ครบทุกข้อ')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const score = calculateScore()
      const riskLevel = getRiskLevel(score)
      onComplete(score, riskLevel)
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / questions.length) * 100

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">การประเมิน Risk Profile</h2>
              <p className="text-primary-100 mt-1">ประเมินความเสี่ยงเพื่อการลงทุนที่เหมาะสม</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-primary-100 mb-2">
              <span>ขั้นตอนที่ {currentStep} จาก {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep <= questions.length ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {questions[currentStep - 1].question}
                </h3>
                <p className="text-gray-600">เลือกคำตอบที่ตรงกับสถานการณ์ของคุณ</p>
              </div>

              <div className="space-y-3">
                {questions[currentStep - 1].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[currentStep - 1].id, option.score)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      answers[questions[currentStep - 1].id] === option.score
                        ? 'border-primary-500 bg-primary-50 text-primary-900'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {answers[questions[currentStep - 1].id] === option.score && (
                        <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900">เสร็จสิ้นการประเมิน</h3>
              <p className="text-gray-600">กรุณาตรวจสอบคำตอบของคุณก่อนส่ง</p>
              
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-3">สรุปคำตอบ:</h4>
                <div className="space-y-2 text-sm">
                  {questions.map((q, index) => (
                    <div key={q.id} className="flex justify-between">
                      <span className="text-gray-600">{q.question}</span>
                      <span className="font-medium">
                        {q.options.find(opt => opt.score === answers[q.id])?.label || 'ยังไม่ได้ตอบ'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg border transition-colors ${
                currentStep === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              ก่อนหน้า
            </button>

            {currentStep < questions.length ? (
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentStep - 1].id]}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  !answers[questions[currentStep - 1].id]
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                ถัดไป
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length < questions.length}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isSubmitting || Object.keys(answers).length < questions.length
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังประมวลผล...</span>
                  </div>
                ) : (
                  'ส่งการประเมิน'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AIAdvisorPage() {
  const [isRiskAssessmentOpen, setIsRiskAssessmentOpen] = useState(false)
  const [riskAssessment, setRiskAssessment] = useState({
    completed: true,
    score: 75,
    riskLevel: 'medium',
    recommendations: [
      'ควรเพิ่มสัดส่วนหุ้นในประเทศเป็น 70%',
      'ลดสัดส่วนพันธบัตรเป็น 20%',
      'เพิ่มเงินออมฉุกเฉินเป็น 6 เดือน'
    ]
  })

  const portfolioRebalancing = {
    lastRebalanced: '2024-01-15',
    nextRebalancing: '2024-07-15',
    recommendations: [
      {
        action: 'เพิ่มหุ้น SET50',
        reason: 'ราคาปรับตัวลง 5% เหมาะสำหรับการซื้อเพิ่ม',
        priority: 'high',
        expectedImpact: 'positive'
      },
      {
        action: 'ลดสัดส่วนทองคำ',
        reason: 'สัดส่วนเกินเป้าหมายที่กำหนดไว้',
        priority: 'medium',
        expectedImpact: 'neutral'
      },
      {
        action: 'เพิ่มพันธบัตรรัฐบาล',
        reason: 'ดอกเบี้ยเริ่มปรับตัวขึ้น เหมาะสำหรับการลงทุน',
        priority: 'low',
        expectedImpact: 'positive'
      }
    ]
  }

  const investmentOpportunities = [
    {
      type: 'หุ้น',
      name: 'SET50',
      opportunity: 'ราคาปรับตัวลง 5%',
      recommendation: 'ซื้อเพิ่ม (DCA)',
      risk: 'medium',
      expectedReturn: '8-12%'
    },
    {
      type: 'กองทุนรวม',
      name: 'กองทุนอสังหาฯ',
      opportunity: 'ราคาปรับตัวลง 3%',
      recommendation: 'พิจารณาซื้อเพิ่ม',
      risk: 'high',
      expectedReturn: '6-10%'
    },
    {
      type: 'พันธบัตร',
      name: 'พันธบัตรรัฐบาล 5 ปี',
      opportunity: 'ดอกเบี้ยเริ่มปรับตัวขึ้น',
      recommendation: 'ลงทุนระยะสั้น',
      risk: 'low',
      expectedReturn: '3-5%'
    }
  ]

  const peerComparison = {
    ageGroup: '30-40 ปี',
    incomeGroup: '50,000-100,000 บาท/เดือน',
    comparison: {
      savingsRate: { user: 30, peer: 25, status: 'better' },
      investmentAllocation: { user: 60, peer: 55, status: 'better' },
      emergencyFund: { user: 4, peer: 6, status: 'worse' },
      debtRatio: { user: 16, peer: 20, status: 'better' }
    }
  }

  const taxEfficientInvesting = [
    {
      strategy: 'SSF (Super Savings Fund)',
      benefit: 'ลดหย่อนภาษีได้ 200,000 บาท/ปี',
      recommendation: 'เพิ่มการลงทุนใน SSF',
      expectedTaxSavings: '฿20,000/ปี'
    },
    {
      strategy: 'RMF (Retirement Mutual Fund)',
      benefit: 'ลดหย่อนภาษีได้ 500,000 บาท/ปี',
      recommendation: 'พิจารณาเพิ่ม RMF',
      expectedTaxSavings: '฿50,000/ปี'
    },
    {
      strategy: 'การขายขาดทุน',
      benefit: 'ลดภาษีจากการขายกำไร',
      recommendation: 'พิจารณาขายหุ้นที่ขาดทุน',
      expectedTaxSavings: '฿5,000/ปี'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'สูง'
      case 'medium': return 'ปานกลาง'
      case 'low': return 'ต่ำ'
      default: return 'ไม่ระบุ'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'better': return 'text-green-600'
      case 'worse': return 'text-red-600'
      case 'same': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'better': return 'ดีกว่า'
      case 'worse': return 'ต่ำกว่า'
      case 'same': return 'เท่ากัน'
      default: return 'ไม่ระบุ'
    }
  }

  return (
    <div className="space-y-6">
      {/* Risk Profile Assessment */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การประเมิน Risk Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                riskAssessment.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  riskAssessment.completed ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {riskAssessment.score}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">คะแนนความเสี่ยง</h4>
                <p className="text-sm text-gray-600">ระดับ: {riskAssessment.riskLevel}</p>
                <p className="text-sm text-gray-600">สถานะ: {riskAssessment.completed ? 'ประเมินแล้ว' : 'ยังไม่ประเมิน'}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsRiskAssessmentOpen(true)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {riskAssessment.completed ? 'ประเมินใหม่' : 'เริ่มประเมิน'}
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำจาก AI</h4>
            <div className="space-y-2">
              {riskAssessment.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <LightBulbIcon className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Rebalancing */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การปรับสมดุลพอร์ต (Rebalancing)</h3>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">รีบาลานซ์ล่าสุด: {portfolioRebalancing.lastRebalanced}</p>
              <p className="text-sm text-blue-700">รีบาลานซ์ครั้งถัดไป: {portfolioRebalancing.nextRebalancing}</p>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              รีบาลานซ์ตอนนี้
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {portfolioRebalancing.recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.action}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(rec.priority)}`}>
                  {getPriorityText(rec.priority)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">ผลกระทบที่คาดหวัง:</span>
                <span className={`text-sm font-medium ${
                  rec.expectedImpact === 'positive' ? 'text-green-600' : 
                  rec.expectedImpact === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {rec.expectedImpact === 'positive' ? 'ดี' : 
                   rec.expectedImpact === 'negative' ? 'ไม่ดี' : 'ไม่มีผล'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Opportunities */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">โอกาสการลงทุน</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investmentOpportunities.map((opportunity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  opportunity.risk === 'low' ? 'bg-green-100 text-green-800' :
                  opportunity.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {opportunity.risk === 'low' ? 'ความเสี่ยงต่ำ' :
                   opportunity.risk === 'medium' ? 'ความเสี่ยงปานกลาง' : 'ความเสี่ยงสูง'}
                </span>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{opportunity.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{opportunity.opportunity}</p>
              <p className="text-sm font-medium text-blue-600 mb-2">คำแนะนำ: {opportunity.recommendation}</p>
              <p className="text-sm text-gray-500">ผลตอบแทนที่คาดหวัง: {opportunity.expectedReturn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Comparison */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เปรียบเทียบกับคนในกลุ่มเดียวกัน</h3>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">กลุ่มอายุ:</span>
              <span className="font-medium ml-2">{peerComparison.ageGroup}</span>
            </div>
            <div>
              <span className="text-gray-600">กลุ่มรายได้:</span>
              <span className="font-medium ml-2">{peerComparison.incomeGroup}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">การเปรียบเทียบ</h4>
            <div className="space-y-3">
              {Object.entries(peerComparison.comparison).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {key === 'savingsRate' ? 'อัตราการออม' :
                     key === 'investmentAllocation' ? 'สัดส่วนการลงทุน' :
                     key === 'emergencyFund' ? 'เงินออมฉุกเฉิน (เดือน)' :
                     'อัตราส่วนหนี้สิน'}
                  </span>
                  <div className="text-right">
                    <span className="font-medium">{value.user}%</span>
                    <span className={`ml-2 text-sm ${getStatusColor(value.status)}`}>
                      ({getStatusText(value.status)} {value.peer}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">คำแนะนำจาก AI</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <UserGroupIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">การปรับปรุง</p>
                    <p className="text-sm text-blue-700">เพิ่มเงินออมฉุกเฉินเป็น 6 เดือนเพื่อให้เทียบเท่าคนในกลุ่ม</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">จุดแข็ง</p>
                    <p className="text-sm text-green-700">คุณมีอัตราการออมและการลงทุนที่ดีกว่าคนในกลุ่ม</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax-efficient Investing */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การลงทุนเพื่อลดภาษี (Tax-efficient Investing)</h3>
        <div className="space-y-4">
          {taxEfficientInvesting.map((strategy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{strategy.strategy}</h4>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ประหยัดภาษีได้ ฿{strategy.expectedTaxSavings}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{strategy.benefit}</p>
              <p className="text-sm font-medium text-blue-600">คำแนะนำ: {strategy.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเชิงลึกจาก AI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <LightBulbIcon className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-purple-900 mb-2">การปรับพอร์ต</h5>
                <p className="text-sm text-purple-700">แนะนำให้รีบาลานซ์พอร์ตในเดือนหน้าเพื่อรักษาสัดส่วนการลงทุนที่เหมาะสม</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-indigo-900 mb-2">การจัดการความเสี่ยง</h5>
                <p className="text-sm text-indigo-700">พิจารณาเพิ่มการกระจายความเสี่ยงในต่างประเทศเพื่อลดความเสี่ยงรวม</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment Popup */}
      <RiskAssessmentPopup
        isOpen={isRiskAssessmentOpen}
        onClose={() => setIsRiskAssessmentOpen(false)}
        onComplete={(score, riskLevel) => {
          setRiskAssessment({
            ...riskAssessment,
            score,
            riskLevel,
            completed: true
          })
        }}
      />
    </div>
  )
}
