'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface OmikujiPaperProps {
  fortune: string
  show: boolean
}

export function OmikujiPaper({ fortune, show }: OmikujiPaperProps) {
  const [unfolded, setUnfolded] = useState(false)

  useEffect(() => {
    if (show) {
      // 表示開始から少し遅れて展開アニメーションを開始
      const timeout = setTimeout(() => setUnfolded(true), 500)
      return () => clearTimeout(timeout)
    } else {
      setUnfolded(false)
    }
  }, [show])

  if (!fortune) return null

  const [result, ...contents] = fortune.split('\n\n')

  return (
    <div
      className={cn(
        'transition-all duration-1000 transform',
        show ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
      )}
    >
      <div
        className={cn(
          'relative mx-auto w-64 transition-all duration-1000 ease-out transform-gpu',
          'bg-[#f7f1e3] rounded shadow-lg overflow-hidden',
          unfolded ? 'h-[32rem]' : 'h-32',
          "before:absolute before:inset-0 before:bg-[url('/paper-texture.png')] before:opacity-50 before:pointer-events-none",
        )}
      >
        {/* 上部の装飾 */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-red-800">
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-16 h-4 bg-red-800 clip-triangle" />
        </div>

        {/* おみくじ結果 */}
        <div className="pt-14 px-6 text-center">
          <div className="text-2xl font-bold text-red-800 mb-4">{result}</div>
          <div
            className={cn(
              'transition-all duration-1000 delay-500',
              unfolded ? 'opacity-100' : 'opacity-0',
            )}
          >
            {contents.map((content, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed">
                {content}
              </p>
            ))}
          </div>
        </div>

        {/* 和風装飾 */}
        <div className="absolute inset-x-0 top-0 h-2 bg-repeat-x bg-[url('/wave-pattern.png')]" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-repeat-x bg-[url('/wave-pattern.png')]" />
      </div>
    </div>
  )
}
