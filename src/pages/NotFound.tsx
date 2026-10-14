import { Link } from 'react-router-dom'
import { pagePath, useLang, useMessages } from '../i18n'
import { Banner } from '../components/Banner'

export function NotFound() {
  const lang = useLang()
  const t = useMessages()
  return (
    <>
      <Banner image="/gfx/productsheadernavback.jpg" ratio="1366 / 107" className="banner--strip" />
      <section className="section not-found">
        <h2>404</h2>
        <Link to={pagePath(lang, 'home')}>{t.nav.home}</Link>
      </section>
    </>
  )
}
