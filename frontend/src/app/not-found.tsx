export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ไม่พบหน้าเว็บ</h2>
        <p className="text-gray-600 mb-8">หน้าที่คุณกำลังค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  )
}
