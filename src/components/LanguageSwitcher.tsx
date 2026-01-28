'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: string) => {
    if (!pathname) return

    // pathname looks like "/en/about" or "/ar-SY/about"
    const segments = pathname.split('/')
    
    // Replace the locale segment (at index 1)
    segments[1] = newLang
    
    const newPath = segments.join('/')
    
    // Use router.push to change the URL without a full page reload
    router.push(newPath)
  }

  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded ${
          currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('ar-SY')}
        className={`px-4 py-2 rounded font-arabic ${
          currentLang === 'ar-SY' ? 'bg-amber-900 text-white' : 'bg-gray-200'
        }`}
      >
        العربية (سوريا)
      </button>
    </div>
  )
}