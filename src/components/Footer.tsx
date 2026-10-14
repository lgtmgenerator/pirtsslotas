import { Link } from 'react-router-dom'
import { CONTACT } from '../data/products'
import { pagePath, useLang, useMessages, type PageKey } from '../i18n'

const PAGES: PageKey[] = ['home', 'products', 'stories', 'about', 'contacts']
const YEAR = new Date().getFullYear()

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

export function Footer() {
  const lang = useLang()
  const t = useMessages()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__column">
          <h2>{t.footer.sitemap}</h2>
          <ul>
            {PAGES.map((p) => (
              <li key={p}>
                <Link viewTransition to={pagePath(lang, p)}>{t.nav[p]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__column">
          <h2>{t.footer.besoms}</h2>
          <ul>
            {t.footer.besomList.map((name) => (
              <li key={name}>
                <Link viewTransition to={pagePath(lang, 'stories')}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__column">
          <h2>{t.footer.more}</h2>
          <ul>
            <li>
              <Link viewTransition to={`${pagePath(lang, 'products')}#misc`}>{t.footer.otherProducts}</Link>
            </li>
          </ul>
        </div>
        <address className="footer__contact">
          <h2>{t.nav.contacts}</h2>
          <ul>
            <li>
              <PinIcon />
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <MailIcon />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <PhoneIcon />
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
            </li>
          </ul>
        </address>
      </div>
      <div className="footer__bottom">
        <img src="/gfx/logo-white.png" alt="" />
        <span>© {YEAR} {t.siteName}</span>
      </div>
    </footer>
  )
}
