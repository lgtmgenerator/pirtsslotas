import { useContext } from 'react'
import { lv } from './lv'
import { en } from './en'
import { ru } from './ru'
import { LangContext } from './LangContext'
import { DEFAULT_LANG, LANGS, PAGE_SLUGS, type Lang, type Messages, type PageKey } from './types'

export { LANGS, DEFAULT_LANG, PAGE_SLUGS }
export { LangProvider } from './LangContext'
export type { Lang, Messages, PageKey, Story } from './types'

export const MESSAGES: Record<Lang, Messages> = { lv, en, ru }

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang)
}

/** Builds a path like "/", "/products", "/en", "/en/products". Latvian lives at the root. */
export function pagePath(lang: Lang, page: PageKey): string {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`
  const slug = PAGE_SLUGS[page]
  if (slug) return `${prefix}/${slug}`
  return prefix || '/'
}

export function useLang(): Lang {
  return useContext(LangContext)
}

export function useMessages(): Messages {
  return MESSAGES[useLang()]
}
