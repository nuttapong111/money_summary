'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CogIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ChartBarIcon,
    title: 'แดชบอร์ดการเงินอัจฉริยะ',
    description: 'ติดตามสถานะการเงินของคุณแบบ Real-time พร้อมกราฟวิเคราะห์ที่เข้าใจง่าย',
    color: 'from-space-primary to-nebula-primary'
  },
  {
    icon: RocketLaunchIcon,
    title: 'การลงทุนอัจฉริยะ',
    description: 'ใช้ AI วิเคราะห์และแนะนำการลงทุนที่เหมาะสมกับ Risk Profile ของคุณ',
    color: 'from-cosmic-primary to-space-primary'
  },
  {
    icon: ShieldCheckIcon,
    title: 'ความปลอดภัยระดับสูง',
    description: 'ข้อมูลของคุณถูกเข้ารหัสและเก็บรักษาอย่างปลอดภัยด้วยเทคโนโลยีล่าสุด',
    color: 'from-success-primary to-nebula-primary'
  },
  {
    icon: SparklesIcon,
    title: 'ธีมอวกาศโลกอนาคต',
    description: 'ประสบการณ์ใช้งานที่ทันสมัยและสวยงามด้วยการออกแบบแบบอวกาศโลกอนาคต',
    color: 'from-warning-primary to-cosmic-primary'
  },
  {
    icon: CogIcon,
    title: 'การตั้งค่าที่ยืดหยุ่น',
    description: 'ปรับแต่งระบบให้เหมาะกับความต้องการของคุณได้อย่างอิสระ',
    color: 'from-nebula-primary to-space-primary'
  },
  {
    icon: UserGroupIcon,
    title: 'การทำงานเป็นทีม',
    description: 'แชร์ข้อมูลและทำงานร่วมกับครอบครัวหรือทีมงานได้อย่างมีประสิทธิภาพ',
    color: 'from-cosmic-primary to-warning-primary'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-space-surface/30">
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
            คุณสมบัติที่{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              น่าตื่นเต้น
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            ระบบการเงินการลงทุนที่ออกแบบมาเพื่อให้คุณจัดการเงินได้อย่างมีประสิทธิภาพ 
            และสวยงามด้วยธีมอวกาศโลกอนาคต
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-space h-full hover:scale-105 transition-transform duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-space-text mb-4">
                  {feature.title}
                </h3>
                <p className="text-space-text-secondary leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-space-primary/5 to-cosmic-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-space-primary/10 to-cosmic-primary/10 rounded-2xl p-8 border border-space-primary/20">
            <h3 className="text-2xl font-bold text-space-text mb-4">
              พร้อมที่จะเริ่มต้นการเดินทางสู่การเงินที่แข็งแกร่ง?
            </h3>
            <p className="text-space-text-secondary mb-6 max-w-2xl mx-auto">
              เข้าร่วมกับผู้ใช้กว่า 10,000 คนที่ไว้วางใจ Money App 
              ในการจัดการการเงินและการลงทุนของพวกเขา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-space">
                เริ่มต้นใช้งานฟรี
              </button>
              <button className="px-6 py-3 border-2 border-space-primary rounded-lg text-space-primary font-medium hover:bg-space-primary hover:text-white transition-all duration-300">
                ดูตัวอย่างเพิ่มเติม
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

