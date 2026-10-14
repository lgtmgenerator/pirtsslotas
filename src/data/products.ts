export type ProductId =
  | "linden"
  | "rowan"
  | "birch"
  | "maple"
  | "oak"
  | "birchOak"
  | "mugwort"
  | "herbal"
  | "blackcurrant"
  | "meadowsweet"
  | "lindenSoap"
  | "goatMilkSoap"
  | "amberSoap"
  | "tea"
  | "pinda"
  | "oil"
  | "sachet"
  | "scrub"
  | "singingBowl"
  | "gift";

export type ProductSection = "besoms" | "newBesoms" | "misc";

export interface Product {
  id: ProductId;
  section: ProductSection;
  /** Small square image shown in the grid. */
  tile: string;
  /** Large image shown in the detail dialog. */
  image: string;
  /** Natural size of `image` in pixels, so the dialog reserves space before it loads. */
  imageSize: [number, number];
  /** Price in EUR. `null` means "ask us" (the gift set). */
  price: number | null;
  /** Optional unit suffix, e.g. "5 ml" -> "3.60 EUR/5 ml". */
  unit?: string;
}

const gfx = (file: string) => `/gfx/${file}`;
const pic = (file: string) => `/gfx/productinfopics/${file}`;

export const PRODUCTS: Product[] = [
  {
    id: "linden",
    section: "besoms",
    tile: gfx("linden-tile.webp"),
    image: pic("liepa.webp"),
    imageSize: [285, 428],
    price: 3,
  },
  {
    id: "rowan",
    section: "besoms",
    tile: gfx("rowan-tile.webp"),
    image: pic("piladzis.webp"),
    imageSize: [285, 428],
    price: 3,
  },
  {
    id: "birch",
    section: "besoms",
    tile: gfx("birch-tile.webp"),
    image: pic("berzs.webp"),
    imageSize: [285, 428],
    price: 3,
  },
  {
    id: "maple",
    section: "besoms",
    tile: gfx("maple-tile.webp"),
    image: pic("klava.webp"),
    imageSize: [275, 413],
    price: 3,
  },
  {
    id: "oak",
    section: "besoms",
    tile: gfx("oak-tile.webp"),
    image: pic("ozols.webp"),
    imageSize: [277, 416],
    price: 3,
  },

  {
    id: "birchOak",
    section: "newBesoms",
    tile: gfx("oak-tile.webp"),
    image: pic("ozols.webp"),
    imageSize: [277, 416],
    price: 3,
  },
  {
    id: "mugwort",
    section: "newBesoms",
    tile: gfx("vibotne.webp"),
    image: pic("vibotne.webp"),
    imageSize: [285, 428],
    price: 3,
  },
  {
    id: "herbal",
    section: "newBesoms",
    tile: gfx("herbal.webp"),
    image: pic("zalu.webp"),
    imageSize: [268, 402],
    price: 3,
  },
  {
    id: "blackcurrant",
    section: "newBesoms",
    tile: gfx("upene.webp"),
    image: pic("upenu.webp"),
    imageSize: [285, 428],
    price: 3,
  },
  {
    id: "meadowsweet",
    section: "newBesoms",
    tile: gfx("vigrieze.webp"),
    image: pic("vigrieze.webp"),
    imageSize: [285, 428],
    price: 3,
  },

  {
    id: "lindenSoap",
    section: "misc",
    tile: gfx("soap-tile.webp"),
    image: pic("soap.webp"),
    imageSize: [774, 774],
    price: 3.6,
  },
  {
    id: "goatMilkSoap",
    section: "misc",
    tile: gfx("soap2-tile.webp"),
    image: pic("soap2.webp"),
    imageSize: [774, 774],
    price: 3.6,
  },
  {
    id: "amberSoap",
    section: "misc",
    tile: gfx("soap3-tile.webp"),
    image: pic("soap3.webp"),
    imageSize: [774, 774],
    price: 3.6,
  },
  {
    id: "tea",
    section: "misc",
    tile: gfx("tea-tile.webp"),
    image: pic("tea.webp"),
    imageSize: [774, 774],
    price: 4,
  },
  {
    id: "pinda",
    section: "misc",
    tile: gfx("pinda-tile.webp"),
    image: pic("pinda.webp"),
    imageSize: [774, 774],
    price: 3.5,
  },
  {
    id: "oil",
    section: "misc",
    tile: gfx("ellas-tile.webp"),
    image: pic("ellas.webp"),
    imageSize: [774, 774],
    price: 3.6,
    unit: "5 ml",
  },
  {
    id: "sachet",
    section: "misc",
    tile: gfx("garins-tile.webp"),
    image: pic("garins.webp"),
    imageSize: [774, 774],
    price: 1,
  },
  {
    id: "scrub",
    section: "misc",
    tile: gfx("skrubis-tile.webp"),
    image: pic("skrubis.webp"),
    imageSize: [774, 774],
    price: 5,
  },
  {
    id: "singingBowl",
    section: "misc",
    tile: gfx("trauks-tile.webp"),
    image: pic("trauks.webp"),
    imageSize: [774, 774],
    price: 17,
  },
  {
    id: "gift",
    section: "misc",
    tile: gfx("gift-tile.webp"),
    image: pic("gift.webp"),
    imageSize: [774, 774],
    price: null,
  },
];

/** The five classic besoms shown on the home page. */
export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.section === "besoms");

export const CONTACT = {
  address: "Vecsaules pagasts, Bauskas novads",
  email: "info@pirtsslotas.lv",
  phone: "+371 26647133",
  phoneDisplay: "+371 2 66 47 133",
};

export function formatPrice(product: Product, chooseYourself: string): string {
  if (product.price === null) return chooseYourself;
  const amount = `${product.price.toFixed(2)} EUR`;
  return product.unit ? `${amount}/${product.unit}` : amount;
}
