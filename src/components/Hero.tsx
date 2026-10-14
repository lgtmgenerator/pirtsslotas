import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pagePath, useLang, useMessages } from '../i18n'
import { Nav } from './Nav'

const SLIDES = ['liepa', 'berzs', 'piladzis', 'klava', 'ozols'].map((n) => `/gfx/${n}-back.jpg`)
const INTERVAL_MS = 5000

/** Home page cross-fading slideshow with the navigation overlaid. */
export function Hero() {
  const lang = useLang()
  const t = useMessages()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="hero">
      {SLIDES.map((src, i) => (
        <img key={src} src={src} alt="" className={i === index ? 'is-active' : undefined} />
      ))}
      <div className="banner__inner">
        <Nav />
        <Link to={pagePath(lang, 'stories')} className="hero__button">
          {t.readMore}
        </Link>
      </div>
    </header>
  )
}
