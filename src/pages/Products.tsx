import { useState } from 'react'
import { PRODUCTS, type Product, type ProductSection } from '../data/products'
import { useMessages } from '../i18n'
import { Banner } from '../components/Banner'
import { ProductDialog } from '../components/ProductDialog'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { usePageMeta } from '../components/usePageMeta'

const SECTIONS: ProductSection[] = ['besoms', 'newBesoms', 'misc']

export function Products() {
  usePageMeta('products')
  const t = useMessages()
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <>
      <Banner image="/gfx/productsheadernavback.jpg" ratio="1366 / 107" className="banner--strip" />
      <div className={selected ? 'is-blurred' : undefined}>
        {SECTIONS.map((section) => (
          <section className="section" id={section} key={section}>
            <SectionHeading {...t.products.sections[section]} />
            <ProductGrid products={PRODUCTS.filter((p) => p.section === section)} onSelect={setSelected} />
          </section>
        ))}
      </div>
      <ProductDialog product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
