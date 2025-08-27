'use client'

import { useState } from 'react'
import {
  ArrowDownTrayIcon, DocumentTextIcon, TableCellsIcon,
  CheckCircleIcon, ArrowLeftIcon, CalendarIcon, ClockIcon,
  ExclamationTriangleIcon, ShieldCheckIcon, ArchiveBoxIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface ExportJob {
  id: string
  type: string
  format: string
  dateRange: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  fileSize?: string
  downloadUrl?: string
}

export default function DataExportPage() {
  const [selectedData, setSelectedData] = useState({
    financialData: true,
    investmentData: true,
    transactionHistory: true,
    reports: true,
    userProfile: false,
    settings: false
  })

  const [exportFormat, setExportFormat] = useState('excel')
  const [dateRange, setDateRange] = useState('all')
  const [includeCharts, setIncludeCharts] = useState(true)
  const [encryptData, setEncryptData] = useState(false)

  const [exportJobs, setExportJobs] = useState<ExportJob[]>([
    {
      id: '1',
      type: 'ข้อมูลการเงินทั้งหมด',
      format: 'Excel',
      dateRange: 'ทั้งหมด',
      status: 'completed',
      createdAt: '2024-01-15 10:00:00',
      completedAt: '2024-01-15 10:05:00',
      fileSize: '2.5 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      type: 'รายงานการลงทุน',
      format: 'PDF',
      dateRange: 'ปี 2024',
      status: 'processing',
      createdAt: '2024-01-15 14:30:00'
    },
    {
      id: '3',
      type: 'ประวัติธุรกรรม',
      format: 'CSV',
      dateRange: '3 เดือนล่าสุด',
      status: 'pending',
      createdAt: '2024-01-15 16:00:00'
    }
  ])

  const dataTypes = [
    {
      key: 'financialData',
      name: 'ข้อมูลการเงิน',
      description: 'รายรับ-รายจ่าย, งบประมาณ, เป้าหมายการเงิน',
      icon: DocumentTextIcon
    },
    {
      key: 'investmentData',
      name: 'ข้อมูลการลงทุน',
      description: 'พอร์ตการลงทุน, ประสิทธิภาพ, สินทรัพย์',
      icon: TableCellsIcon
    },
    {
      key: 'transactionHistory',
      name: 'ประวัติธุรกรรม',
      description: 'รายการธุรกรรมทั้งหมด, การชำระเงิน, การโอนเงิน',
      icon: ArchiveBoxIcon
    },
    {
      key: 'reports',
      name: 'รายงานและวิเคราะห์',
      description: 'รายงานรายเดือน, ไตรมาส, ปี, แนวโน้ม',
      icon: DocumentTextIcon
    },
    {
      key: 'userProfile',
      name: 'ข้อมูลผู้ใช้',
      description: 'ข้อมูลส่วนตัว, การตั้งค่า, ประวัติการใช้งาน',
      icon: DocumentTextIcon
    },
    {
      key: 'settings',
      name: 'การตั้งค่าระบบ',
      description: 'การตั้งค่าการแจ้งเตือน, ความปลอดภัย, การแสดงผล',
      icon: DocumentTextIcon
    }
  ]

  const exportFormats = [
    { id: 'excel', name: 'Excel (.xlsx)', icon: TableCellsIcon, description: 'เหมาะสำหรับการวิเคราะห์และคำนวณ' },
    { id: 'csv', name: 'CSV (.csv)', icon: TableCellsIcon, description: 'เหมาะสำหรับการนำเข้าข้อมูล' },
    { id: 'pdf', name: 'PDF (.pdf)', icon: DocumentTextIcon, description: 'เหมาะสำหรับการพิมพ์และแชร์' },
    { id: 'json', name: 'JSON (.json)', icon: DocumentTextIcon, description: 'เหมาะสำหรับนักพัฒนา' }
  ]

  const dateRanges = [
    { id: 'all', name: 'ข้อมูลทั้งหมด', description: 'ตั้งแต่เริ่มใช้งาน' },
    { id: '1year', name: '1 ปีล่าสุด', description: 'ข้อมูล 12 เดือนล่าสุด' },
    { id: '6months', name: '6 เดือนล่าสุด', description: 'ข้อมูล 6 เดือนล่าสุด' },
    { id: '3months', name: '3 เดือนล่าสุด', description: 'ข้อมูล 3 เดือนล่าสุด' },
    { id: '1month', name: '1 เดือนล่าสุด', description: 'ข้อมูล 1 เดือนล่าสุด' },
    { id: 'custom', name: 'กำหนดเอง', description: 'เลือกช่วงวันที่เอง' }
  ]

  const handleDataSelection = (key: string) => {
    setSelectedData(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const startExport = () => {
    const selectedTypes = Object.entries(selectedData)
      .filter(([_, selected]) => selected)
      .map(([key]) => key)

    if (selectedTypes.length === 0) {
      alert('กรุณาเลือกข้อมูลที่ต้องการส่งออก')
      return
    }

    const newJob: ExportJob = {
      id: Date.now().toString(),
      type: selectedTypes.join(', '),
      format: exportFormats.find(f => f.id === exportFormat)?.name || 'Excel',
      dateRange: dateRanges.find(d => d.id === dateRange)?.name || 'ทั้งหมด',
      status: 'pending',
      createdAt: new Date().toLocaleString('th-TH')
    }

    setExportJobs(prev => [newJob, ...prev])
    
    // Simulate processing
    setTimeout(() => {
      setExportJobs(prev => 
        prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: 'processing' as const }
            : job
        )
      )
    }, 1000)

    // Simulate completion
    setTimeout(() => {
      setExportJobs(prev => 
        prev.map(job => 
          job.id === newJob.id 
            ? { 
                ...job, 
                status: 'completed' as const,
                completedAt: new Date().toLocaleString('th-TH'),
                fileSize: '1.8 MB',
                downloadUrl: '#'
              }
            : job
        )
      )
    }, 5000)
  }

  const downloadFile = (job: ExportJob) => {
    if (job.downloadUrl) {
      // TODO: Implement actual download
      console.log('Downloading file:', job.downloadUrl)
      alert('เริ่มดาวน์โหลดไฟล์')
    }
  }

  const cancelJob = (jobId: string) => {
    setExportJobs(prev => prev.filter(job => job.id !== jobId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'รอดำเนินการ'
      case 'processing':
        return 'กำลังประมวลผล'
      case 'completed':
        return 'เสร็จสิ้น'
      case 'failed':
        return 'ล้มเหลว'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">การส่งออกข้อมูล</h1>
          <p className="text-gray-600">ส่งออกข้อมูลการเงินและการลงทุนในรูปแบบต่างๆ</p>
        </div>
      </div>

      {/* Data Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">เลือกข้อมูลที่ต้องการส่งออก</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataTypes.map((dataType) => (
            <div
              key={dataType.key}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedData[dataType.key as keyof typeof selectedData]
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleDataSelection(dataType.key)}
            >
              <div className="flex items-start space-x-3">
                <dataType.icon className={`w-5 h-5 mt-1 ${
                  selectedData[dataType.key as keyof typeof selectedData] ? 'text-primary-600' : 'text-gray-500'
                }`} />
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    selectedData[dataType.key as keyof typeof selectedData] ? 'text-primary-900' : 'text-gray-900'
                  }`}>
                    {dataType.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedData[dataType.key as keyof typeof selectedData] ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {dataType.description}
                  </p>
                </div>
                {selectedData[dataType.key as keyof typeof selectedData] && (
                  <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Format Selection */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">รูปแบบไฟล์</h3>
          <div className="space-y-3">
            {exportFormats.map((format) => (
              <div
                key={format.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  exportFormat === format.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setExportFormat(format.id)}
              >
                <div className="flex items-center space-x-3">
                  <format.icon className={`w-5 h-5 ${
                    exportFormat === format.id ? 'text-primary-600' : 'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      exportFormat === format.id ? 'text-primary-900' : 'text-gray-900'
                    }`}>
                      {format.name}
                    </h4>
                    <p className={`text-sm ${
                      exportFormat === format.id ? 'text-primary-700' : 'text-gray-600'
                    }`}>
                      {format.description}
                    </p>
                  </div>
                  {exportFormat === format.id && (
                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range and Options */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ตัวเลือกเพิ่มเติม</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ช่วงข้อมูล
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name} - {range.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">รวมกราฟและแผนภูมิ</h4>
                  <p className="text-sm text-gray-600">เพิ่มกราฟและแผนภูมิในรายงาน</p>
                </div>
                <button
                  onClick={() => setIncludeCharts(!includeCharts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    includeCharts ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      includeCharts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">เข้ารหัสข้อมูล</h4>
                  <p className="text-sm text-gray-600">เพิ่มความปลอดภัยให้กับไฟล์ที่ส่งออก</p>
                </div>
                <button
                  onClick={() => setEncryptData(!encryptData)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    encryptData ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      encryptData ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <button
          onClick={startExport}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 text-lg"
        >
          <ArrowDownTrayIcon className="w-6 h-6" />
          <span>เริ่มส่งออกข้อมูล</span>
        </button>
      </div>

      {/* Export Jobs */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">งานส่งออกข้อมูล</h2>
        <div className="space-y-3">
          {exportJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {job.status === 'completed' ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  ) : job.status === 'processing' ? (
                    <ClockIcon className="w-6 h-6 text-blue-500" />
                  ) : job.status === 'failed' ? (
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <CalendarIcon className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{job.type}</h3>
                  <p className="text-sm text-gray-600">
                    {job.format} • {job.dateRange} • สร้างเมื่อ {job.createdAt}
                  </p>
                  {job.completedAt && (
                    <p className="text-sm text-gray-600">
                      เสร็จสิ้นเมื่อ {job.completedAt} • ขนาดไฟล์ {job.fileSize}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(job.status)}`}>
                  {getStatusText(job.status)}
                </span>
                {job.status === 'completed' && job.downloadUrl ? (
                  <button
                    onClick={() => downloadFile(job)}
                    className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>ดาวน์โหลด</span>
                  </button>
                ) : job.status === 'pending' ? (
                  <button
                    onClick={() => cancelJob(job.id)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Information */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <ShieldCheckIcon className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">ความปลอดภัยและความเป็นส่วนตัว</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• ข้อมูลที่ส่งออกจะถูกเข้ารหัสเพื่อความปลอดภัย</li>
              <li>• ไฟล์จะถูกเก็บรักษาเป็นเวลา 30 วันเท่านั้น</li>
              <li>• การส่งออกข้อมูลจะถูกบันทึกในประวัติการใช้งาน</li>
              <li>• ข้อมูลที่ส่งออกจะไม่รวมข้อมูลที่ละเอียดอ่อน</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ยกเลิก
        </Link>
        <button
          onClick={() => console.log('Saving export settings...')}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  )
}
