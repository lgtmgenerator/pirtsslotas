import { formatPrice, type Product, type ProductId } from '../data/products'
import { useMessages } from '../i18n'

interface Props {
  products: Product[]
  /** When given, cards become buttons that open the product dialog. */
  onSelect?: (product: Product) => void
  /** The tile that morphs into / out of the dialog image during a view transition. */
  transitionId?: ProductId | null
}

export function ProductGrid({ products, onSelect, transitionId }: Props) {
  const t = useMessages()
  return (
    <ul className="product-grid">
      {products.map((p) => {
        const body = (
          <>
            <img
              src={p.tile}
              width={140}
              height={140}
              alt=""
              loading="lazy"
              decoding="async"
              style={p.id === transitionId ? { viewTransitionName: 'product-image' } : undefined}
            />
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
