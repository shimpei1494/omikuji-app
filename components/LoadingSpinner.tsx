'use client'

import { cn } from '@/lib/utils'

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 和風な砂時計アニメーション */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 border-8 border-red-600 rounded-full opacity-20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 border-8 border-red-600 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0 h-16 border-l-2 border-red-600" />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        おみくじの結果を詠み上げています...
      </p>
    </div>
  )
}
