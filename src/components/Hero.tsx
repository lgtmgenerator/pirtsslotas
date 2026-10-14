import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pagePath, useLang, useMessages } from '../i18n'
import { Nav } from './Nav'

const SLIDES = ['liepa', 'berzs', 'piladzis', 'klava', 'ozols']
const INTERVAL_MS = 5500
const PARALLAX_FACTOR = 0.35

/** Home page slideshow: slow zoom on the active photo, parallax on scroll, nav overlaid. */
export function Hero() {
  const lang = useLang()
  const t = useMessages()
  const [index, setIndex] = useState(0)
  // Slides are only given a src once they are about to be shown, so the
  // first paint downloads one photo instead of five.
  const [reached, setReached] = useState(1)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % SLIDES.length
        setReached((r) => Math.max(r, next + 1))
        return next
      })
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      ref.current?.style.setProperty('--parallax', `${Math.round(window.scrollY * PARALLAX_FACTOR)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="hero" ref={ref}>
      <div className="hero__slides">
        {SLIDES.map((name, i) => (
          <img
            key={name}
            src={i <= reached ? `/gfx/${name}-back.webp` : undefined}
            srcSet={i <= reached ? `/gfx/${name}-back-768.webp 768w, /gfx/${name}-back.webp 1366w` : undefined}
            sizes="100vw"
            width={1366}
            height={647}
            alt=""
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={i === index ? 'is-active' : undefined}
          />
        ))}
      </div>
      <div className="banner__inner">
        <Nav />
        <Link viewTransition to={pagePath(lang, 'stories')} className="hero__button">
          {t.readMore}
        </Link>
      </div>
    </header>
  )
}
