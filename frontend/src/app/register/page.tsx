import RegisterForm from '@/components/auth/RegisterForm'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-space-text mb-2">
              สร้างบัญชีใหม่
            </h1>
            <p className="text-space-text-secondary">
              เริ่มต้นการเดินทางสู่การเงินที่แข็งแกร่ง
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

