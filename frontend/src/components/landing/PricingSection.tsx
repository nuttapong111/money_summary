'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'เริ่มต้นใช้งานฟรีสำหรับผู้ใช้ทั่วไป',
    features: [
      'แดชบอร์ดพื้นฐาน',
      'ติดตามรายรับ-รายจ่าย',
      '1 พอร์ตการลงทุน',
      'รายงานพื้นฐาน',
      'การแจ้งเตือนพื้นฐาน'
    ],
    popular: false,
    color: 'from-stardust-400 to-stardust-600'
  },
  {
    name: 'Basic',
    price: '299',
    description: 'เหมาะสำหรับผู้ที่ต้องการฟีเจอร์เพิ่มเติม',
    features: [
      'ทุกฟีเจอร์ใน Free',
      '5 พอร์ตการลงทุน',
      'การวิเคราะห์ขั้นสูง',
      'การวางแผนการเงิน',
      'การแจ้งเตือนแบบ Custom',
      'การส่งออกข้อมูล'
    ],
    popular: true,
    color: 'from-space-primary to-nebula-primary'
  },
  {
    name: 'Premium',
    price: '599',
    description: 'สำหรับผู้ที่ต้องการฟีเจอร์ครบครัน',
    features: [
      'ทุกฟีเจอร์ใน Basic',
      'พอร์ตการลงทุนไม่จำกัด',
      'AI Advisor',
      'การวิเคราะห์ขั้นสูงสุด',
      'การเชื่อมต่อบัญชีธนาคาร',
      'การสนับสนุนแบบ Priority',
      'การสำรองข้อมูลอัตโนมัติ'
    ],
    popular: false,
    color: 'from-cosmic-primary to-warning-primary'
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-space-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-space-text mb-6">
            แพ็คเกจที่{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              เหมาะสม
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            เลือกแพ็คเกจที่เหมาะกับความต้องการของคุณ 
            และเริ่มต้นการเดินทางสู่การเงินที่แข็งแกร่ง
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-space-primary to-cosmic-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    แนะนำ
                  </span>
                </div>
              )}

              <div className="card-space h-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-space-text mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-space-text-secondary mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-space-text">฿</span>
                    <span className="text-5xl font-bold bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-space-text-secondary">/เดือน</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-success-primary mt-0.5 flex-shrink-0" />
                      <span className="text-space-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-space-primary to-cosmic-primary text-white hover:shadow-lg hover:scale-105'
                    : 'border-2 border-space-primary text-space-primary hover:bg-space-primary hover:text-white'
                }`}>
                  {plan.name === 'Free' ? 'เริ่มต้นใช้งานฟรี' : 'เลือกแพ็คเกจนี้'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-space-primary/10 to-cosmic-primary/10 rounded-2xl p-8 border border-space-primary/20">
            <h3 className="text-2xl font-bold text-space-text mb-4">
              มีคำถามเกี่ยวกับแพ็คเกจ?
            </h3>
            <p className="text-space-text-secondary mb-6">
              ติดต่อเราเพื่อขอคำแนะนำในการเลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-space">
                ติดต่อเรา
              </button>
              <button className="px-6 py-3 border-2 border-space-primary rounded-lg text-space-primary font-medium hover:bg-space-primary hover:text-white transition-all duration-300">
                ดูรายละเอียดเพิ่มเติม
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

