'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface FortuneResultProps {
  fortune: string
  show: boolean
}

export function FortuneResult({ fortune, show }: FortuneResultProps) {
  return (
    <div
      className={cn(
        'transition-all duration-1000 transform',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      )}
    >
      <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-white/80 dark:bg-black/80">
        <div className="whitespace-pre-wrap">{fortune}</div>
      </ScrollArea>
    </div>
  )
}
