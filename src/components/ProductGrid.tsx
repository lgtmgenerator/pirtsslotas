import { formatPrice, type Product } from '../data/products'
import { useMessages } from '../i18n'

interface Props {
  products: Product[]
  /** When given, cards become buttons that open the product dialog. */
  onSelect?: (product: Product) => void
}

export function ProductGrid({ products, onSelect }: Props) {
  const t = useMessages()
  return (
    <ul className="product-grid">
      {products.map((p) => {
        const body = (
          <>
            <img src={p.tile} alt="" loading="lazy" />
            <span className="product-card__name">{t.productNames[p.id]}</span>
            <span className="product-card__price">{formatPrice(p, t.products.chooseYourself)}</span>
          </>
        )
        return (
          <li key={p.id}>
            {onSelect ? (
              <button type="button" className="product-card" onClick={() => onSelect(p)}>
                {body}
              </button>
            ) : (
              <div className="product-card">{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
