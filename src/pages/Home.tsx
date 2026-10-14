import { FEATURED_PRODUCTS } from '../data/products'
import { Link } from 'react-router-dom'
import { pagePath, useLang, useMessages } from '../i18n'
import { Hero } from '../components/Hero'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { StoryCarousel } from '../components/StoryCarousel'
import { usePageMeta } from '../components/usePageMeta'

export function Home() {
  usePageMeta('home')
  const t = useMessages()
  const lang = useLang()
  return (
    <>
      <Hero />
      <section className="section">
        <SectionHeading head={t.home.head} sub={t.home.sub} />
        <p className="notice" role="status">
          {t.home.notice}{' '}
          <Link viewTransition to={pagePath(lang, 'contacts')}>{t.nav.contacts.toLowerCase()} →</Link>
        </p>
        <ProductGrid products={FEATURED_PRODUCTS} />
      </section>
      <StoryCarousel stories={t.stories} randomStart />
    </>
  )
}
