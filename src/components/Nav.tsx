import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LANGS, PAGE_SLUGS, pagePath, useLang, useMessages, type PageKey } from '../i18n'

const PAGES: PageKey[] = ['home', 'products', 'stories', 'about', 'contacts']

/** Works out which page we are on so the language switcher can stay on it. */
function currentPage(pathname: string): PageKey {
  const slug = pathname.replace(/^\/(en|ru)(?=\/|$)/, '').replace(/^\/+|\/+$/g, '')
  return PAGES.find((p) => PAGE_SLUGS[p] === slug) ?? 'home'
}

export function Nav() {
  const lang = useLang()
  const t = useMessages()
  const { pathname } = useLocation()
  const page = currentPage(pathname)
  // The phone menu remembers the path it was opened on, so it closes itself on navigation.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const open = openedAt === pathname
  const toggle = () => setOpenedAt(open ? null : pathname)

  return (
    <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
      <Link to={pagePath(lang, 'home')} className="nav__logo" aria-label={t.siteName}>
        <img src="/gfx/logo-white.png" alt="" />
      </Link>

      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label="Menu"
        onClick={toggle}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav__panel" id="site-menu">
        <ul className="nav__menu">
          {PAGES.map((p) => (
            <li key={p}>
              <NavLink to={pagePath(lang, p)} end>
                {t.nav[p]}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="nav__lang" aria-label="Language">
          {LANGS.map((l) => (
            <li key={l}>
              <Link
                to={pagePath(l, page)}
                className={l === lang ? 'active' : undefined}
                aria-current={l === lang ? 'true' : undefined}
                lang={l}
              >
                {l.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
