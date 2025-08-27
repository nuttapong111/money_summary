import Link from 'next/link'
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  StarIcon,
  CheckIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  TagIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'ติดตามการลงทุน',
      description: 'ดูผลการลงทุนแบบ Real-time พร้อมกราฟและสถิติที่ครบครัน',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'วางแผนการเงิน',
      description: 'ตั้งเป้าหมายทางการเงินและติดตามความคืบหน้าได้อย่างแม่นยำ',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'วางแผนภาษี',
      description: 'คำนวณและวางแผนภาษีได้อย่างมีประสิทธิภาพ',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: ChartPieIcon,
      title: 'สุขภาพทางการเงิน',
      description: 'วิเคราะห์สุขภาพทางการเงินและให้คำแนะนำที่เหมาะสม',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const packages = [
    {
      name: 'Free Trial',
      price: '0',
      period: '30 วัน',
      features: [
        'Dashboard พื้นฐาน',
        'ติดตามรายรับรายจ่าย',
        'เป้าหมายการเงิน 3 เป้าหมาย',
        'อีเมลแจ้งเตือน',
        'รายงานพื้นฐาน'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Basic',
      price: '299',
      period: 'เดือน',
      features: [
        'ทุกฟีเจอร์ใน Free Trial',
        'วิเคราะห์สุขภาพทางการเงิน',
        'เป้าหมายการเงินไม่จำกัด',
        'แผนภาษีพื้นฐาน',
        'รายงานการวิเคราะห์',
        'แจ้งเตือน SMS'
      ],
      popular: true,
      color: 'border-primary-500 ring-2 ring-primary-500'
    },
    {
      name: 'Premium',
      price: '599',
      period: 'เดือน',
      features: [
        'ทุกฟีเจอร์ใน Basic',
        'การลงทุนขั้นสูง',
        'แผนภาษีขั้นสูง',
        'ที่ปรึกษาการเงินส่วนตัว',
        'Dashboard แบบ Custom',
        'Support 24/7'
      ],
      popular: false,
      color: 'border-gray-200'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'ผู้ใช้งานที่ไว้วางใจ' },
    { number: '฿50M+', label: 'มูลค่าการลงทุนรวม' },
    { number: '99.9%', label: 'ความเสถียรของระบบ' },
    { number: '24/7', label: 'การสนับสนุนตลอดเวลา' }
  ]

  const testimonials = [
    {
      name: 'สมชาย ใจดี',
      role: 'นักลงทุนรายย่อย',
      content: 'ระบบใช้งานง่ายมาก ช่วยให้ผมติดตามการลงทุนได้ดีขึ้น และวางแผนการเงินได้อย่างเป็นระบบ',
      avatar: 'SM'
    },
    {
      name: 'สมหญิง รักดี',
      role: 'เจ้าของธุรกิจ',
      content: 'ฟีเจอร์วางแผนภาษีช่วยประหยัดเงินได้มาก และการวิเคราะห์ข้อมูลช่วยให้ตัดสินใจได้ดีขึ้น',
      avatar: 'SR'
    },
    {
      name: 'สมศักดิ์ มั่นคง',
      role: 'พนักงานบริษัท',
      content: 'เป้าหมายการเงินที่ตั้งไว้บรรลุได้เร็วกว่าที่คาดไว้ ระบบแจ้งเตือนช่วยให้ไม่ลืมการออม',
      avatar: 'SM'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-purple-50/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
              <StarIcon className="w-4 h-4 mr-2" />
              ระบบการเงินการลงทุนที่ทันสมัยที่สุด
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              ระบบการเงินการลงทุน
              <span className="text-gradient block mt-2">ที่ทันสมัย</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              แพลตฟอร์มครบครันสำหรับการจัดการการเงิน การลงทุน และการวางแผนทางการเงิน 
              ออกแบบมาเพื่อให้คุณบรรลุเป้าหมายทางการเงินได้อย่างมีประสิทธิภาพ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 text-lg font-semibold">
                เริ่มต้นใช้งานฟรี 30 วัน
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link href="/auth/login" className="btn-secondary text-lg px-8 py-4 text-lg font-semibold">
                เข้าสู่ระบบ
              </Link>
            </div>

            {/* Mockup Screens */}
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Dashboard Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gray-800 rounded-t-xl p-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-primary-200 to-primary-300 rounded"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 bg-gradient-to-r from-green-200 to-green-300 rounded"></div>
                      <div className="h-16 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
                    </div>
                    <div className="h-20 bg-gradient-to-r from-purple-200 to-purple-300 rounded"></div>
                  </div>
                </div>

                {/* Mobile App Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gray-800 rounded-t-xl p-2 flex justify-center">
                    <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-6 bg-gradient-to-r from-primary-200 to-primary-300 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-green-200 to-green-300 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
                    <div className="h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded"></div>
                  </div>
                </div>

                {/* Analytics Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gray-800 rounded-t-xl p-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
                    <div className="h-16 bg-gradient-to-r from-green-200 to-green-300 rounded"></div>
                    <div className="h-12 bg-gradient-to-r from-orange-200 to-orange-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ฟีเจอร์ที่ครบครัน
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ทุกเครื่องมือที่คุณต้องการสำหรับการจัดการการเงินที่ดีขึ้น
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              เลือกแพ็คเกจที่เหมาะกับคุณ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เริ่มต้นใช้งานฟรี 30 วัน แล้วเลือกแพ็คเกจที่ตอบโจทย์
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`card relative ${pkg.color} ${pkg.popular ? 'scale-105 shadow-2xl' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                      <StarIcon className="w-4 h-4" />
                      แนะนำ
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary-600">฿{pkg.price}</span>
                    <span className="text-gray-500 ml-2">/{pkg.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/auth/register" 
                  className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    pkg.popular 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  เริ่มต้นใช้งาน
                  <ArrowRightIcon className="w-4 h-4 inline ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ความคิดเห็นจากผู้ใช้งาน
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ฟังจากผู้ใช้งานจริงที่ไว้วางใจเรา
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            พร้อมที่จะเริ่มต้นการเดินทางทางการเงินของคุณหรือยัง?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            เข้าร่วมกับผู้ใช้หลายพันคนที่กำลังบรรลุเป้าหมายทางการเงินของพวกเขา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-gray-100 text-lg font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center shadow-lg">
              เริ่มต้นใช้งานฟรี 30 วัน
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/auth/login" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg font-medium px-8 py-4 rounded-lg transition-colors">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Money Investment System</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                แพลตฟอร์มการเงินการลงทุนที่ทันสมัย ครบครันทุกความต้องการ 
                เพื่ออนาคตทางการเงินที่มั่นคง
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">ผลิตภัณฑ์</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">การลงทุน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">วางแผนการเงิน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">วางแผนภาษี</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">เป้าหมายการเงิน</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">บริษัท</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">ติดต่อ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">ข้อกำหนดการใช้งาน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Money Investment System. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
