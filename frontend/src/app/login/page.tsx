import LoginForm from '@/components/auth/LoginForm'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-space-text mb-2">
              เข้าสู่ระบบ
            </h1>
            <p className="text-space-text-secondary">
              ยินดีต้อนรับกลับสู่ Money App
            </p>
          </div>
          
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

