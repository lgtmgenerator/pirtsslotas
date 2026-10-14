import type { CSSProperties, ReactNode } from 'react'
import { Nav } from './Nav'

interface BannerProps {
  image: string
  /** Original image aspect ratio, e.g. "1366 / 463". Keeps the baked-in title visible. */
  ratio: string
  children?: ReactNode
  className?: string
}

/** Full-width page header: a photo with the navigation on top of it. */
export function Banner({ image, ratio, children, className }: BannerProps) {
  return (
    <header
      className={`banner${className ? ` ${className}` : ''}`}
      style={{ backgroundImage: `url(${image})`, '--banner-ratio': ratio } as CSSProperties}
    >
      <div className="banner__inner">
        <Nav />
        {children}
      </div>
    </header>
  )
}
