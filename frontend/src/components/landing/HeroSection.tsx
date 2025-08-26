'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  RocketLaunchIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: RocketLaunchIcon,
    title: 'การลงทุนอัจฉริยะ',
    description: 'ใช้ AI วิเคราะห์และแนะนำการลงทุนที่เหมาะสม'
  },
  {
    icon: ChartBarIcon,
    title: 'ติดตามผลการลงทุน',
    description: 'ดูผลการลงทุนแบบ Real-time พร้อมกราฟวิเคราะห์'
  },
  {
    icon: ShieldCheckIcon,
    title: 'ปลอดภัยและเชื่อถือได้',
    description: 'ระบบความปลอดภัยระดับสูง ข้อมูลถูกเข้ารหัส'
  },
  {
    icon: SparklesIcon,
    title: 'ธีมอวกาศโลกอนาคต',
    description: 'ประสบการณ์ใช้งานที่ทันสมัยและสวยงาม'
  }
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-galaxy">
        <div className="absolute inset-0 bg-stars opacity-30"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-space-primary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-cosmic-primary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-nebula-primary/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-space-primary via-cosmic-primary to-nebula-primary bg-clip-text text-transparent">
              ระบบการเงินการลงทุน
            </span>
            <br />
            <span className="text-space-text">
              อวกาศโลกอนาคต
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-space-text-secondary max-w-4xl mx-auto leading-relaxed">
            เปลี่ยนการจัดการเงินของคุณให้เป็นเรื่องง่าย ด้วยเทคโนโลยีล่าสุด 
            และการออกแบบที่สวยงามแบบอวกาศโลกอนาคต
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/register"
            className="group relative px-8 py-4 bg-gradient-to-r from-space-primary to-cosmic-primary rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">เริ่มต้นใช้งานฟรี</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cosmic-primary to-space-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link
            href="#demo"
            className="px-8 py-4 border-2 border-space-primary rounded-xl text-space-primary font-bold text-lg hover:bg-space-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            ดูตัวอย่าง
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-space-surface/50 backdrop-blur-sm border border-space-border hover:border-space-primary transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-space-text mb-2">
                {feature.title}
              </h3>
              <p className="text-space-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-space-primary mb-2">
              10,000+
            </div>
            <div className="text-space-text-secondary">
              ผู้ใช้งานที่ไว้วางใจ
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cosmic-primary mb-2">
              99.9%
            </div>
            <div className="text-space-text-secondary">
              ความแม่นยำของระบบ
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-nebula-primary mb-2">
              24/7
            </div>
            <div className="text-space-text-secondary">
              บริการตลอดเวลา
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-space-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-space-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

