import { useState } from 'react'
import { flushSync } from 'react-dom'
import { PRODUCTS, type Product, type ProductId, type ProductSection } from '../data/products'
import { useMessages } from '../i18n'
import { Banner } from '../components/Banner'
import { ProductDialog } from '../components/ProductDialog'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { usePageMeta } from '../components/usePageMeta'

const SECTIONS: ProductSection[] = ['besoms', 'newBesoms', 'misc']

/** Runs a state update inside a view transition when the browser supports it. */
function withTransition(update: () => void) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) {
    update()
    return
  }
  document.startViewTransition(() => flushSync(update))
}

export function Products() {
  usePageMeta('products')
  const t = useMessages()
  const [selectedId, setSelectedId] = useState<ProductId | null>(null)
  // The last opened product keeps the transition name on its tile while the
  // dialog is closed, so closing morphs the image back into the grid.
  const [lastId, setLastId] = useState<ProductId | null>(null)

  const index = PRODUCTS.findIndex((p) => p.id === selectedId)
  const selected: Product | null = index === -1 ? null : PRODUCTS[index]

  const open = (p: Product) =>
    withTransition(() => {
      setSelectedId(p.id)
      setLastId(p.id)
    })
  const close = () => withTransition(() => setSelectedId(null))
  const step = (delta: 1 | -1) => {
    const next = PRODUCTS[(index + delta + PRODUCTS.length) % PRODUCTS.length]
    setSelectedId(next.id)
    setLastId(next.id)
  }

  return (
    <>
      <Banner image="/gfx/productsheadernavback.webp" ratio="1366 / 107" className="banner--strip" />
      <div className={selected ? 'is-blurred' : undefined}>
        {SECTIONS.map((section) => (
          <section className="section" id={section} key={section}>
            <SectionHeading {...t.products.sections[section]} />
            <ProductGrid
              products={PRODUCTS.filter((p) => p.section === section)}
              onSelect={open}
              transitionId={selected ? null : lastId}
            />
          </section>
        ))}
      </div>
      <ProductDialog
        product={selected}
        position={selected ? { index, count: PRODUCTS.length } : null}
        onClose={close}
        onStep={step}
      />
    </>
  )
}
