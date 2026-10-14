import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LangProvider, type Lang } from '../i18n'
import { Footer } from './Footer'

export function Layout({ lang }: { lang: Lang }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <LangProvider lang={lang}>
      <div className="site">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
