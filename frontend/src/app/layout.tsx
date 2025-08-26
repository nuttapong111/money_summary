import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
})

export const metadata: Metadata = {
  title: 'Money App - ระบบการเงินการลงทุนอวกาศโลกอนาคต',
  description: 'ระบบการเงินการลงทุนที่ออกแบบด้วยธีมอวกาศโลกอนาคต ใช้เทคโนโลยีล่าสุดและ Clean Architecture',
  keywords: ['การเงิน', 'การลงทุน', 'การจัดการเงิน', 'พอร์ตการลงทุน', 'การวางแผนการเงิน'],
  authors: [{ name: 'Money App Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-space-background text-space-text">
              {children}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--space-surface)',
                    color: 'var(--space-text)',
                    border: '1px solid var(--space-border)',
                  },
                }}
              />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

