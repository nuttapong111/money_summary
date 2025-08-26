'use client'

import { motion } from 'framer-motion'

const screenshots = [
  {
    title: 'แดชบอร์ดหลัก',
    description: 'ภาพรวมสถานะการเงินและการลงทุนแบบ Real-time',
    image: '/images/screenshot-dashboard.png',
    features: ['กราฟการเติบโต', 'สถิติการลงทุน', 'การแจ้งเตือน']
  },
  {
    title: 'พอร์ตการลงทุน',
    description: 'ติดตามและวิเคราะห์การลงทุนของคุณอย่างละเอียด',
    image: '/images/screenshot-portfolio.png',
    features: ['Asset Allocation', 'Performance Tracking', 'Risk Analysis']
  },
  {
    title: 'การวางแผนการเงิน',
    description: 'ตั้งเป้าหมายและวางแผนการเงินระยะยาว',
    image: '/images/screenshot-planning.png',
    features: ['Goal Setting', 'Budget Planning', 'Investment Strategy']
  }
]

export default function ScreenshotsSection() {
  return (
    <section id="demo" className="py-24">
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
            ดู{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              ตัวอย่างหน้าจอ
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            ดูว่าหน้าจอของ Money App จะเป็นอย่างไร 
            และคุณจะได้รับประสบการณ์การใช้งานที่ดีแค่ไหน
          </p>
        </motion.div>

        {/* Screenshots Grid */}
        <div className="space-y-16">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative group">
                  <div className="w-full h-80 bg-gradient-to-br from-space-primary/20 to-cosmic-primary/20 rounded-2xl border border-space-border flex items-center justify-center">
                    <div className="text-center text-space-text-secondary">
                      <div className="w-16 h-16 bg-space-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📱</span>
                      </div>
                      <p className="text-lg font-medium">{screenshot.title}</p>
                      <p className="text-sm">Mockup Image</p>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-space-primary/10 to-cosmic-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-space-text mb-3">
                    {screenshot.title}
                  </h3>
                  <p className="text-space-text-secondary text-lg leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-space-text">
                    คุณสมบัติหลัก:
                  </h4>
                  <ul className="space-y-2">
                    {screenshot.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-space-primary rounded-full" />
                        <span className="text-space-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className="px-6 py-3 bg-gradient-to-r from-space-primary to-cosmic-primary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  ทดลองใช้งาน
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
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-space-primary/10 to-cosmic-primary/10 rounded-2xl p-8 border border-space-primary/20">
            <h3 className="text-2xl font-bold text-space-text mb-4">
              ต้องการดูหน้าจออื่นๆ เพิ่มเติม?
            </h3>
            <p className="text-space-text-secondary mb-6">
              ดูหน้าจอทั้งหมดของ Money App และเรียนรู้ว่ามันจะช่วยคุณจัดการการเงินได้อย่างไร
            </p>
            <button className="btn-space">
              ดูหน้าจอทั้งหมด
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

