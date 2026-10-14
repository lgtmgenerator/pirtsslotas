import { CONTACT } from '../data/products'
import { useLang, useMessages } from '../i18n'
import { Banner } from '../components/Banner'
import { usePageMeta } from '../components/usePageMeta'

export function Contacts() {
  usePageMeta('contacts')
  const t = useMessages()
  const image = useLang() === 'en' ? '/gfx/contacts-en-back.jpg' : '/gfx/contacts-lv-back.jpg'

  return (
    <Banner image={image} ratio="1366 / 806" className="banner--contacts">
      <ul className="contacts">
        {t.contacts.lines.map((line) => (
          <li key={line}>
            {line === CONTACT.email ? (
              <a href={`mailto:${CONTACT.email}`}>{line}</a>
            ) : line === CONTACT.phoneDisplay ? (
              <a href={`tel:${CONTACT.phone}`}>{line}</a>
            ) : (
              line
            )}
          </li>
        ))}
      </ul>
    </Banner>
  )
}
