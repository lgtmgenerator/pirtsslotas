import { useEffect } from 'react'
import { useMessages, type PageKey } from '../i18n'

/** Sets the browser tab title and meta description for the current page. */
export function usePageMeta(page: PageKey) {
  const t = useMessages()
  useEffect(() => {
    document.title = `${t.siteName} - ${t.pageTitles[page]}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
  }, [t, page])
}
