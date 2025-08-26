'use client'

import { motion } from 'framer-motion'
import { 
  RocketLaunchIcon,
  ShieldCheckIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const values = [
  {
    icon: RocketLaunchIcon,
    title: 'นวัตกรรม',
    description: 'เราเชื่อในการพัฒนาผลิตภัณฑ์ที่ทันสมัยและก้าวหน้าเสมอ'
  },
  {
    icon: ShieldCheckIcon,
    title: 'ความปลอดภัย',
    description: 'ความปลอดภัยของข้อมูลผู้ใช้เป็นสิ่งสำคัญสูงสุดสำหรับเรา'
  },
  {
    icon: HeartIcon,
    title: 'การดูแล',
    description: 'เราใส่ใจในประสบการณ์ของผู้ใช้และพยายามให้บริการที่ดีที่สุด'
  },
  {
    icon: LightBulbIcon,
    title: 'ความชัดเจน',
    description: 'เราเชื่อในการออกแบบที่เข้าใจง่ายและใช้งานสะดวก'
  }
]

const team = [
  {
    name: 'ดร. สมชาย ใจดี',
    role: 'CEO & Founder',
    description: 'ผู้เชี่ยวชาญด้านการเงินและการลงทุนมากว่า 15 ปี',
    avatar: '👨‍💼'
  },
  {
    name: 'คุณ สมหญิง สวยงาม',
    role: 'CTO',
    description: 'ผู้เชี่ยวชาญด้านเทคโนโลยีและระบบความปลอดภัย',
    avatar: '👩‍💻'
  },
  {
    name: 'คุณ สมศักดิ์ มั่นคง',
    role: 'Head of Design',
    description: 'นักออกแบบ UX/UI ที่มีประสบการณ์มากกว่า 10 ปี',
    avatar: '🎨'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-space-surface/30">
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
            เกี่ยวกับ{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              เรา
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            เรียนรู้เกี่ยวกับทีมงานที่อยู่เบื้องหลัง Money App 
            และวิสัยทัศน์ของเราในการเปลี่ยนแปลงการจัดการการเงิน
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-space-text mb-4">
              ภารกิจของเรา
            </h3>
            <p className="text-space-text-secondary leading-relaxed">
              Money App ถูกสร้างขึ้นเพื่อทำให้การจัดการการเงินและการลงทุนเป็นเรื่องง่าย 
              และเข้าถึงได้สำหรับทุกคน เราเชื่อว่าทุกคนควรมีเครื่องมือที่ดีในการวางแผนอนาคตทางการเงิน
            </p>
            <p className="text-space-text-secondary leading-relaxed">
              ด้วยเทคโนโลยีล่าสุดและการออกแบบที่สวยงาม เราได้สร้างระบบที่ช่วยให้ผู้ใช้ 
              เข้าใจสถานะการเงินของตนเองได้อย่างชัดเจน และตัดสินใจการลงทุนได้อย่างมั่นใจ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-space-text mb-4">
              วิสัยทัศน์ของเรา
            </h3>
            <p className="text-space-text-secondary leading-relaxed">
              เรามุ่งมั่นที่จะเป็นผู้นำในด้านแพลตฟอร์มการจัดการการเงินและการลงทุน 
              ที่ใช้เทคโนโลยี AI และการออกแบบที่ทันสมัย
            </p>
            <p className="text-space-text-secondary leading-relaxed">
              เป้าหมายของเราคือการช่วยให้ผู้ใช้กว่า 1 ล้านคนทั่วโลก 
              บรรลุเป้าหมายทางการเงินของตนเอง และมีชีวิตที่มั่นคงทางการเงิน
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-space-text text-center mb-12">
            ค่านิยมของเรา
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-space-text mb-2">
                  {value.title}
                </h4>
                <p className="text-space-text-secondary text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-space-text text-center mb-12">
            ทีมงานของเรา
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-space text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-space-primary to-cosmic-primary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {member.avatar}
                </div>
                <h4 className="text-lg font-bold text-space-text mb-2">
                  {member.name}
                </h4>
                <p className="text-space-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-space-text-secondary text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

