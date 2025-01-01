'use client';

import { cn } from "@/lib/utils";

interface OmikujiBoxProps {
  isDrawing: boolean;
  onAnimationComplete: () => void;
}

export function OmikujiBox({ isDrawing, onAnimationComplete }: OmikujiBoxProps) {
  return (
    <div className="relative w-40 h-40 mx-auto">
      {/* おみくじ箱 */}
      <div className="absolute inset-0 bg-red-800 rounded-lg shadow-lg">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-900 rounded-t-lg" />
      </div>
      
      {/* おみくじ棒 */}
      <div
        className={cn(
          "absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-24 bg-white rounded-full transition-all duration-700",
          isDrawing && "translate-y-24 opacity-0"
        )}
        onTransitionEnd={() => {
          if (isDrawing) {
            onAnimationComplete();
          }
        }}
      >
        <div className="absolute bottom-0 w-full h-4 bg-red-600 rounded-full" />
      </div>
    </div>
  );
}