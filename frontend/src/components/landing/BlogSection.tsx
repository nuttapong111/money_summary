'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const blogPosts = [
  {
    title: '5 วิธีเริ่มต้นการลงทุนสำหรับมือใหม่',
    excerpt: 'เรียนรู้วิธีการเริ่มต้นการลงทุนอย่างปลอดภัยและมีประสิทธิภาพ สำหรับผู้ที่เพิ่งเริ่มต้น',
    category: 'การลงทุน',
    readTime: '5 นาที',
    date: '2024-01-15',
    image: '/images/blog-investment.jpg'
  },
  {
    title: 'การวางแผนการเงินสำหรับครอบครัว',
    excerpt: 'เคล็ดลับการวางแผนการเงินที่ครอบคลุมทุกความต้องการของครอบครัว',
    category: 'การวางแผน',
    readTime: '7 นาที',
    date: '2024-01-12',
    image: '/images/blog-family.jpg'
  },
  {
    title: 'เข้าใจ Risk Profile ของคุณ',
    excerpt: 'ทำความรู้จักกับ Risk Profile และวิธีการเลือกการลงทุนที่เหมาะสม',
    category: 'การวิเคราะห์',
    readTime: '6 นาที',
    date: '2024-01-10',
    image: '/images/blog-risk.jpg'
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-space-surface/30">
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
            บล็อกและ{' '}
            <span className="bg-gradient-to-r from-space-primary to-cosmic-primary bg-clip-text text-transparent">
              ข่าวสาร
            </span>
          </h2>
          <p className="text-xl text-space-text-secondary max-w-3xl mx-auto leading-relaxed">
            อัปเดตความรู้และเทรนด์ล่าสุดในโลกของการเงินและการลงทุน 
            จากผู้เชี่ยวชาญของเรา
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-space h-full hover:scale-105 transition-transform duration-300">
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-space-primary/20 to-cosmic-primary/20 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center text-space-text-secondary">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-sm">Blog Image</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-space-primary/20 text-space-primary rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-space-text-secondary">
                      {post.readTime}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-space-text group-hover:text-space-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-space-text-secondary leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Date */}
                  <p className="text-sm text-space-text-secondary">
                    {new Date(post.date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  
                  {/* Read More */}
                  <Link
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-space-primary hover:text-cosmic-primary transition-colors duration-200 font-medium"
                  >
                    อ่านเพิ่มเติม
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="btn-space"
          >
            ดูบทความทั้งหมด
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

