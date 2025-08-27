'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'
import { register } from '@/lib/auth'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'free'
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    plan: selectedPlan,
    agreeToTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: '฿0',
      period: '30 วัน',
      features: ['Dashboard พื้นฐาน', 'ติดตามรายรับรายจ่าย', 'เป้าหมายทางการเงิน 3 รายการ'],
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '฿299',
      period: 'เดือน',
      features: ['ทุกอย่างใน Free Trial', 'วิเคราะห์สุขภาพทางการเงิน', 'เป้าหมายทางการเงินไม่จำกัด', 'แผนภาษีพื้นฐาน'],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '฿599',
      period: 'เดือน',
      features: ['ทุกอย่างใน Basic', 'การลงทุนขั้นสูง', 'แผนภาษีขั้นสูง', 'ที่ปรึกษาการเงินส่วนตัว'],
      popular: false
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await register(formData)
      
      if (result.success && result.user) {
        // Redirect to dashboard
        window.location.href = '/dashboard/financial-dashboard'
      } else {
        // Show error message
        alert(result.error || 'เกิดข้อผิดพลาดในการลงทะเบียน')
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลงทะเบียน')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            สร้างบัญชีใหม่
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            หรือ{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">ข้อมูลส่วนตัว</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field mt-1"
                      placeholder="ชื่อ"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field mt-1"
                      placeholder="นามสกุล"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    placeholder="081-234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input-field mt-1 pr-10"
                      placeholder="รหัสผ่าน"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    ยืนยันรหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="input-field mt-1 pr-10"
                      placeholder="ยืนยันรหัสผ่าน"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                    ฉันยอมรับ{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                      ข้อกำหนดการใช้งาน
                    </Link>{' '}
                    และ{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}
                </button>
              </form>
            </div>

            {/* Plan Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">เลือกแพคเกจ</h3>
              
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`card cursor-pointer transition-all duration-200 ${
                      formData.plan === plan.id
                        ? 'ring-2 ring-primary-500 border-primary-500'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, plan: plan.id }))}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                          {plan.popular && (
                            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                              ยอดนิยม
                            </span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-primary-600">{plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="ml-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.plan === plan.id
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.plan === plan.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">เริ่มต้นใช้งานฟรี 30 วัน</h4>
                <p className="text-sm text-blue-700">
                  ทดลองใช้ฟีเจอร์ทั้งหมดได้ฟรี 30 วัน ไม่มีค่าใช้จ่ายใดๆ 
                  ยกเลิกได้ทุกเมื่อ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
