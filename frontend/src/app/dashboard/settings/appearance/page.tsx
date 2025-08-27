'use client'

import { useState } from 'react'
import {
  PaintBrushIcon, GlobeAltIcon, AdjustmentsHorizontalIcon,
  CheckCircleIcon, ArrowLeftIcon, SunIcon, MoonIcon,
  ComputerDesktopIcon, SwatchIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('th')
  const [fontSize, setFontSize] = useState('medium')
  const [colorScheme, setColorScheme] = useState('purple')
  const [compactMode, setCompactMode] = useState(false)
  const [showAnimations, setShowAnimations] = useState(true)

  const themes = [
    { id: 'light', name: 'โหมดสว่าง', icon: SunIcon, description: 'ธีมสว่างสำหรับการใช้งานกลางวัน' },
    { id: 'dark', name: 'โหมดมืด', icon: MoonIcon, description: 'ธีมมืดสำหรับการใช้งานกลางคืน' },
    { id: 'system', name: 'ตามระบบ', icon: ComputerDesktopIcon, description: 'ใช้ธีมตามการตั้งค่าของระบบ' }
  ]

  const languages = [
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ]

  const fontSizes = [
    { id: 'small', name: 'เล็ก', size: 'text-sm' },
    { id: 'medium', name: 'ปานกลาง', size: 'text-base' },
    { id: 'large', name: 'ใหญ่', size: 'text-lg' },
    { id: 'xl', name: 'ใหญ่มาก', size: 'text-xl' }
  ]

  const colorSchemes = [
    { id: 'purple', name: 'ม่วง', class: 'from-purple-600 to-purple-700', description: 'ธีมหลักของระบบ' },
    { id: 'blue', name: 'น้ำเงิน', class: 'from-blue-600 to-blue-700', description: 'ธีมน้ำเงิน' },
    { id: 'green', name: 'เขียว', class: 'from-green-600 to-green-700', description: 'ธีมเขียว' },
    { id: 'red', name: 'แดง', class: 'from-red-600 to-red-700', description: 'ธีมแดง' },
    { id: 'orange', name: 'ส้ม', class: 'from-orange-600 to-orange-700', description: 'ธีมส้ม' }
  ]

  const saveSettings = () => {
    // TODO: Save to backend
    console.log('Saving appearance settings...', {
      theme,
      language,
      fontSize,
      colorScheme,
      compactMode,
      showAnimations
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">การตั้งค่าการแสดงผล</h1>
          <p className="text-gray-600">ปรับแต่งรูปลักษณ์และการแสดงผลของระบบ</p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <PaintBrushIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">ธีม</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <div
              key={themeOption.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                theme === themeOption.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setTheme(themeOption.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <themeOption.icon className={`w-5 h-5 ${
                  theme === themeOption.id ? 'text-primary-600' : 'text-gray-500'
                }`} />
                <h3 className={`font-medium ${
                  theme === themeOption.id ? 'text-primary-900' : 'text-gray-900'
                }`}>
                  {themeOption.name}
                </h3>
              </div>
              <p className={`text-sm ${
                theme === themeOption.id ? 'text-primary-700' : 'text-gray-600'
              }`}>
                {themeOption.description}
              </p>
              {theme === themeOption.id && (
                <CheckCircleIcon className="w-5 h-5 text-primary-600 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <GlobeAltIcon className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">ภาษา</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                language === lang.code
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setLanguage(lang.code)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <h3 className={`font-medium ${
                    language === lang.code ? 'text-primary-900' : 'text-gray-900'
                  }`}>
                    {lang.name}
                  </h3>
                </div>
                {language === lang.code && (
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">ขนาดตัวอักษร</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {fontSizes.map((sizeOption) => (
            <div
              key={sizeOption.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                fontSize === sizeOption.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFontSize(sizeOption.id)}
            >
              <div className={`text-center ${sizeOption.size} font-medium ${
                fontSize === sizeOption.id ? 'text-primary-900' : 'text-gray-900'
              }`}>
                {sizeOption.name}
              </div>
              {fontSize === sizeOption.id && (
                <CheckCircleIcon className="w-5 h-5 text-primary-600 mx-auto mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <SwatchIcon className="w-6 h-6 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-900">โทนสี</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {colorSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                colorScheme === scheme.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setColorScheme(scheme.id)}
            >
              <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${scheme.class} mb-3`}></div>
              <h3 className={`font-medium text-center ${
                colorScheme === scheme.id ? 'text-primary-900' : 'text-gray-900'
              }`}>
                {scheme.name}
              </h3>
              <p className={`text-xs text-center mt-1 ${
                colorScheme === scheme.id ? 'text-primary-700' : 'text-gray-600'
              }`}>
                {scheme.description}
              </p>
              {colorScheme === scheme.id && (
                <CheckCircleIcon className="w-5 h-5 text-primary-600 mx-auto mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ตัวเลือกการแสดงผล</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">โหมดกะทัดรัด</h3>
              <p className="text-sm text-gray-600">
                ลดระยะห่างและขนาดขององค์ประกอบต่างๆ เพื่อแสดงเนื้อหาได้มากขึ้น
              </p>
            </div>
            <button
              onClick={() => setCompactMode(!compactMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                compactMode ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  compactMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">แอนิเมชัน</h3>
              <p className="text-sm text-gray-600">
                แสดงแอนิเมชันและเอฟเฟกต์การเปลี่ยนหน้าจอ
              </p>
            </div>
            <button
              onClick={() => setShowAnimations(!showAnimations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showAnimations ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showAnimations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ตัวอย่างการแสดงผล</h2>
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 bg-gradient-to-r ${colorSchemes.find(s => s.id === colorScheme)?.class} rounded-full flex items-center justify-center`}>
              <span className="text-white font-bold">M</span>
            </div>
            <div>
              <h3 className={`font-medium ${fontSizes.find(s => s.id === fontSize)?.size}`}>
                ตัวอย่างหัวข้อ
              </h3>
              <p className="text-sm text-gray-600">ตัวอย่างข้อความอธิบาย</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
          onClick={saveSettings}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  )
}
