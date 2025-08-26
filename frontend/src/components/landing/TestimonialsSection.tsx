'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'สมชาย ใจดี',
    role: 'นักลงทุนมือใหม่',
    content: 'Money App ช่วยให้ฉันเข้าใจการลงทุนได้ง่ายขึ้นมาก ธีมอวกาศโลกอนาคตทำให้การใช้งานสนุกและน่าสนใจ',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'สมหญิง สวยงาม',
    role: 'นักธุรกิจ',
    content: 'ระบบการวิเคราะห์ที่แม่นยำและการวางแผนการเงินที่ชัดเจน ทำให้ฉันสามารถจัดการเงินได้อย่างมีประสิทธิภาพ',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'สมศักดิ์ มั่นคง',
    role: 'ผู้จัดการกองทุน',
    content: 'เป็นระบบที่ทันสมัยและใช้งานง่าย ฟีเจอร์ AI Advisor ช่วยให้การตัดสินใจการลงทุนดีขึ้นมาก',
    rating: 5,
    avatar: '👨‍💻'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24">
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
            ความคิดเห็นจาก{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              ผู้ใช้งาน
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            ดูว่าผู้ใช้งานของเราคิดอย่างไรเกี่ยวกับ Money App 
            และประสบการณ์การใช้งานของพวกเขา
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-space text-center"
            >
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-warning-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-space-text-secondary mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                {testimonial.avatar}
              </div>

              {/* Name & Role */}
              <h4 className="font-bold text-space-text mb-1">
                {testimonial.name}
              </h4>
              <p className="text-space-text-secondary text-sm">
                {testimonial.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-space-primary mb-2">98%</div>
            <div className="text-space-text-secondary">ความพึงพอใจ</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cosmic-primary mb-2">10K+</div>
            <div className="text-space-text-secondary">ผู้ใช้งาน</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-nebula-primary mb-2">4.9/5</div>
            <div className="text-space-text-secondary">คะแนนเฉลี่ย</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-warning-primary mb-2">24/7</div>
            <div className="text-space-text-secondary">การสนับสนุน</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

