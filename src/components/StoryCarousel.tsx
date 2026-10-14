import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import type { Story } from '../i18n'

interface Props {
  stories: Story[]
  /** Pick a random starting story, like the original site did. */
  randomStart?: boolean
  intervalMs?: number
}

const SWIPE_THRESHOLD_PX = 40

export function StoryCarousel({ stories, randomStart = false, intervalMs = 8000 }: Props) {
  const count = stories.length
  const [index, setIndex] = useState(() => (randomStart ? Math.floor(Math.random() * count) : 0))
  const [paused, setPaused] = useState(false)
  const pointerStartX = useRef<number | null>(null)

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  // Auto-advance; the timer restarts whenever the shown story changes or the pause ends.
  useEffect(() => {
    if (count < 2 || paused) return
    const id = window.setTimeout(() => go(1), intervalMs)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `go` only depends on `count`
  }, [index, count, intervalMs, paused])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  const onPointerDown = (e: PointerEvent) => {
    pointerStartX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStartX.current === null) return
    const delta = e.clientX - pointerStartX.current
    pointerStartX.current = null
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) go(delta < 0 ? 1 : -1)
  }

  return (
    <section
      className={`stories${paused ? ' is-paused' : ''}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="stories__inner">
        <button type="button" className="stories__arrow" onClick={() => go(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div
          className="stories__viewport"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStartX.current = null)}
        >
          <div className="stories__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {stories.map((story, i) => (
              <article
                key={i}
                className="story"
                aria-hidden={i !== index}
                aria-label={`${i + 1} / ${count}`}
              >
                <img className="story__symbol" src="/gfx/symbols/birch.webp" alt="" />
                <div className="story__content">
                  <span className="story__counter">
                    {i + 1} / {count}
                  </span>
                  <h2>{story.title}</h2>
                  <span className="story__line" />
                  <p>{story.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button type="button" className="stories__arrow" onClick={() => go(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <ol className="stories__dots">
        {stories.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              className={i === index ? 'is-active' : undefined}
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}. ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
              style={i === index ? ({ '--progress-duration': `${intervalMs}ms` } as CSSProperties) : undefined}
            >
              {/* Progress bar; remounting on index change restarts its animation. */}
              <span key={index} />
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
