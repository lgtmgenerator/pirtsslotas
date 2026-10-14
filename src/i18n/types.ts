import type { ProductId } from '../data/products'

export type Lang = 'lv' | 'en' | 'ru'
export const LANGS: Lang[] = ['lv', 'en', 'ru']
export const DEFAULT_LANG: Lang = 'lv'

export type PageKey = 'home' | 'products' | 'stories' | 'about' | 'contacts'
export const PAGE_SLUGS: Record<PageKey, string> = {
  home: '',
  products: 'products',
  stories: 'stories',
  about: 'about',
  contacts: 'contacts',
}

export interface Story {
  title: string
  text: string
}

export interface SectionHeading {
  head: string
  sub: string
}

export interface Messages {
  code: Lang
  siteName: string
  description: string
  pageTitles: Record<PageKey, string>
  nav: Record<PageKey, string>
  readMore: string
  home: SectionHeading & { notice: string }
  products: {
    sections: Record<'besoms' | 'newBesoms' | 'misc', SectionHeading>
    descriptionHeading: string
    priceLabel: string
    chooseYourself: string
    orderHint: string
    close: string
  }
  productNames: Record<ProductId, string>
  productDescriptions: Record<ProductId, string[]>
  stories: Story[]
  about: Story[]
  contacts: {
    lines: string[]
  }
  footer: {
    sitemap: string
    besoms: string
    besomList: string[]
    more: string
    otherProducts: string
  }
}
