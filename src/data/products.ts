export type ProductId =
  | 'linden'
  | 'rowan'
  | 'birch'
  | 'maple'
  | 'oak'
  | 'birchOak'
  | 'mugwort'
  | 'herbal'
  | 'blackcurrant'
  | 'meadowsweet'
  | 'lindenSoap'
  | 'goatMilkSoap'
  | 'amberSoap'
  | 'tea'
  | 'pinda'
  | 'oil'
  | 'sachet'
  | 'scrub'
  | 'singingBowl'
  | 'gift'

export type ProductSection = 'besoms' | 'newBesoms' | 'misc'

export interface Product {
  id: ProductId
  section: ProductSection
  /** Small square image shown in the grid. */
  tile: string
  /** Large image shown in the detail dialog. */
  image: string
  /** Price in EUR. `null` means "ask us" (the gift set). */
  price: number | null
  /** Optional unit suffix, e.g. "5 ml" -> "3.60 EUR/5 ml". */
  unit?: string
}

const gfx = (file: string) => `/gfx/${file}`
const pic = (file: string) => `/gfx/productinfopics/${file}`

export const PRODUCTS: Product[] = [
  { id: 'linden', section: 'besoms', tile: gfx('linden-tile.png'), image: pic('liepa.jpg'), price: 3 },
  { id: 'rowan', section: 'besoms', tile: gfx('rowan-tile.png'), image: pic('piladzis.jpg'), price: 3 },
  { id: 'birch', section: 'besoms', tile: gfx('birch-tile.png'), image: pic('berzs.jpg'), price: 3 },
  { id: 'maple', section: 'besoms', tile: gfx('maple-tile.png'), image: pic('klava.jpg'), price: 3 },
  { id: 'oak', section: 'besoms', tile: gfx('oak-tile.png'), image: pic('ozols.jpg'), price: 3 },

  { id: 'birchOak', section: 'newBesoms', tile: gfx('oak-tile.png'), image: pic('ozols.jpg'), price: 3 },
  { id: 'mugwort', section: 'newBesoms', tile: gfx('vibotne.png'), image: pic('vibotne.jpg'), price: 3 },
  { id: 'herbal', section: 'newBesoms', tile: gfx('herbal.png'), image: pic('zalu.jpg'), price: 3 },
  { id: 'blackcurrant', section: 'newBesoms', tile: gfx('upene.png'), image: pic('upenu.jpg'), price: 3 },
  { id: 'meadowsweet', section: 'newBesoms', tile: gfx('vigrieze.png'), image: pic('vigrieze.jpg'), price: 3 },

  { id: 'lindenSoap', section: 'misc', tile: gfx('soap-tile.png'), image: pic('soap.jpg'), price: 3.6 },
  { id: 'goatMilkSoap', section: 'misc', tile: gfx('soap2-tile.png'), image: pic('soap2.jpg'), price: 3.6 },
  { id: 'amberSoap', section: 'misc', tile: gfx('soap3-tile.png'), image: pic('soap3.jpg'), price: 3.6 },
  { id: 'tea', section: 'misc', tile: gfx('tea-tile.png'), image: pic('tea.jpg'), price: 4 },
  { id: 'pinda', section: 'misc', tile: gfx('pinda-tile.png'), image: pic('pinda.jpg'), price: 3.5 },
  { id: 'oil', section: 'misc', tile: gfx('ellas-tile.jpg'), image: pic('ellas.jpg'), price: 3.6, unit: '5 ml' },
  { id: 'sachet', section: 'misc', tile: gfx('garins-tile.jpg'), image: pic('garins.jpg'), price: 1 },
  { id: 'scrub', section: 'misc', tile: gfx('skrubis-tile.jpg'), image: pic('skrubis.jpg'), price: 5 },
  { id: 'singingBowl', section: 'misc', tile: gfx('trauks-tile.jpg'), image: pic('trauks.jpg'), price: 17 },
  { id: 'gift', section: 'misc', tile: gfx('gift-tile.jpg'), image: pic('gift.jpg'), price: null },
]

/** The five classic besoms shown on the home page. */
export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.section === 'besoms')

export const CONTACT = {
  address: 'Vecsaules pagasts, Bauskas novads',
  email: 'info@pirtsslotas.lv',
  phone: '+371 26647133',
  phoneDisplay: '+371 2 66 47 133',
}

export function formatPrice(product: Product, chooseYourself: string): string {
  if (product.price === null) return chooseYourself
  const amount = `${product.price.toFixed(2)} EUR`
  return product.unit ? `${amount}/${product.unit}` : amount
}
