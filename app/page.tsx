'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { OmikujiBox } from '@/components/OmikujiBox'
import { OmikujiPaper } from '@/components/OmikujiPaper'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Home() {
  const [fortune, setFortune] = useState<string>('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const drawFortune = async () => {
    setIsDrawing(true)
    setShowResult(false)
    setFortune('')

    try {
      setIsLoading(true)
      const response = await fetch('/api/fortune')
      const data = await response.json()
      setFortune(data.fortune)
    } catch (error) {
      console.error('Error drawing fortune:', error)
      setFortune('申し訳ありません。おみくじを引くことができませんでした。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnimationComplete = () => {
    setShowResult(true)
    setIsDrawing(false)
  }

  return (
    <div className="min-h-screen bg-[url('/shrine-bg.jpg')] bg-cover bg-center bg-fixed p-4">
      <div className="max-w-md mx-auto pt-12">
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-black/90">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              デジタルおみくじ
            </CardTitle>
            <CardDescription>AIが導く、あなたの運勢</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <OmikujiBox
              isDrawing={isDrawing}
              onAnimationComplete={handleAnimationComplete}
            />

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={drawFortune}
                disabled={isDrawing || isLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                おみくじを引く
              </Button>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <OmikujiPaper fortune={fortune} show={showResult} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
