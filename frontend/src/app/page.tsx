import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ScreenshotsSection from '@/components/landing/ScreenshotsSection'
import PricingSection from '@/components/landing/PricingSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import AboutSection from '@/components/landing/AboutSection'
import CTASection from '@/components/landing/CTASection'
import BlogSection from '@/components/landing/BlogSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <PricingSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
        <BlogSection />
      </main>
      
      <Footer />
    </div>
  )
}

