import { useLayoutEffect, useRef, type KeyboardEvent } from 'react'
import { CONTACT, formatPrice, type Product } from '../data/products'
import { useMessages } from '../i18n'

interface Props {
  product: Product | null
  /** Position of the product within its list, for the "3 / 20" counter. */
  position: { index: number; count: number } | null
  onClose: () => void
  onStep: (delta: 1 | -1) => void
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  )
}

export function ProductDialog({ product, position, onClose, onStep }: Props) {
  const t = useMessages()
  const ref = useRef<HTMLDialogElement>(null)

  // Layout effect so the dialog is open before the view transition snapshots the new page.
  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
  }, [product])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') onStep(1)
    if (e.key === 'ArrowLeft') onStep(-1)
  }

  return (
    <dialog
      ref={ref}
      className="product-dialog"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {product && (
        <div className="product-dialog__content" key={product.id}>
          <img
            src={product.image}
            width={product.imageSize[0]}
            height={product.imageSize[1]}
            alt=""
            style={{ viewTransitionName: 'product-image' }}
          />
          <div className="product-dialog__text">
            <button type="button" className="product-dialog__close" onClick={onClose} aria-label={t.products.close}>
              ×
            </button>
            {position && (
              <span className="product-dialog__counter">
                {position.index + 1} / {position.count}
              </span>
            )}
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
      <button
        type="button"
        className="product-dialog__arrow product-dialog__arrow--prev"
        onClick={() => onStep(-1)}
        aria-label="Previous"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        className="product-dialog__arrow product-dialog__arrow--next"
        onClick={() => onStep(1)}
        aria-label="Next"
      >
        <Chevron dir="right" />
      </button>
    </dialog>
  )
}
