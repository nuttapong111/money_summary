'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-space-primary/10 to-cosmic-primary/10 rounded-3xl p-12 border border-space-primary/20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-stars opacity-10"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-space-text mb-6">
                พร้อมที่จะเริ่มต้น{' '}
                <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
                  การเดินทาง
                </span>
                <br />
                สู่การเงินที่แข็งแกร่ง?
              </h2>
              
              <p className="text-xl text-space-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
                เข้าร่วมกับผู้ใช้กว่า 10,000 คนที่ไว้วางใจ Money App 
                ในการจัดการการเงินและการลงทุนของพวกเขา 
                เริ่มต้นใช้งานฟรีวันนี้!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/register"
                  className="btn-space text-lg px-8 py-4"
                >
                  เริ่มต้นใช้งานฟรี
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 border-2 border-space-primary rounded-lg text-space-primary font-medium hover:bg-space-primary hover:text-white transition-all duration-300 text-lg"
                >
                  ทดลองใช้งาน
                </Link>
              </div>
              
              <p className="text-sm text-space-text-secondary">
                ไม่มีบัตรเครดิต • เริ่มต้นใช้งานได้ทันที • ยกเลิกได้ทุกเมื่อ
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

