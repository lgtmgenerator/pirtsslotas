import { useEffect, useRef } from 'react'
import { CONTACT, formatPrice, type Product } from '../data/products'
import { useMessages } from '../i18n'

interface Props {
  product: Product | null
  onClose: () => void
}

export function ProductDialog({ product, onClose }: Props) {
  const t = useMessages()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
  }, [product])

  return (
    <dialog
      ref={ref}
      className="product-dialog"
      onClose={onClose}
      onClick={(e) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {product && (
        <div className="product-dialog__content">
          <img src={product.image} alt="" />
          <div className="product-dialog__text">
            <button type="button" className="product-dialog__close" onClick={onClose} aria-label={t.products.close}>
              ×
            </button>
            <h2>{t.productNames[product.id]}</h2>
            <h3>{t.products.descriptionHeading}</h3>
            {t.productDescriptions[product.id].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="product-dialog__price">
              {t.products.priceLabel} <strong>{formatPrice(product, t.products.chooseYourself)}</strong>
            </p>
            <p className="product-dialog__order">
              {t.products.orderHint}
              <br />
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a> /{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
        </div>
      )}
    </dialog>
  )
}
