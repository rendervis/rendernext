// apps/web/src/components/effects/P5EffectFrame.tsx
'use client'

import {
  useEffect,
  useState,
  type ReactElement,
} from 'react'
import { cn } from '@/lib/cn'

type P5EffectVariant = 'pointillism' | 'flock'

type P5BaseSketchProps = Readonly<{
  id: string
}>

type P5FlockSketchProps = Readonly<{
  id: string
  backgroundColor?: number[]
}>

type P5SketchModule = Readonly<{
  Pointillism: (props: P5BaseSketchProps) => ReactElement | null
  Flock: (props: P5FlockSketchProps) => ReactElement | null
}>

type P5EffectFrameProps = Readonly<{
  id: string
  variant?: P5EffectVariant
  className?: string
}>

function P5EffectFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_28%),linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px] opacity-40"
    />
  )
}

export function P5EffectFrame({
  id,
  variant = 'pointillism',
  className,
}: P5EffectFrameProps) {
  const [sketchModule, setSketchModule] = useState<P5SketchModule | null>(null)

  useEffect(() => {
    let isMounted = true

    void import('p5playground').then((module) => {
      if (!isMounted) {
        return
      }

      setSketchModule(module as unknown as P5SketchModule)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const Sketch =
    variant === 'flock' ? sketchModule?.Flock : sketchModule?.Pointillism

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden opacity-45 [&_canvas]:!h-full [&_canvas]:!w-full',
        className
      )}
    >
      {Sketch ? (
        variant === 'flock' ? (
          <Sketch id={id} backgroundColor={[19, 19, 19]} />
        ) : (
          <Sketch id={id} />
        )
      ) : (
        <P5EffectFallback />
      )}
    </div>
  )
}