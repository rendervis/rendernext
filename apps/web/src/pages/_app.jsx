import {  useEffect, useRef } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import '@/styles/tailwind.css'
import 'focus-visible'

export const navigation = [
  { name: 'About', href: '/about'},
  { name: 'Articles', href: '/articles'},
  { name: 'Projects', href: '/projects'},
]


function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)
  return (
    <>
      <div className="h-full min-h-screen">
        <div className="relative mx-auto flex min-h-full max-w-7xl flex-col bg-white sm:px-6 lg:px-8">
          <div className="pb-24">
            <Header />
          </div>
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
