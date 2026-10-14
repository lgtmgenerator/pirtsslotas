import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { DEFAULT_LANG, LANGS, pagePath, type Lang } from './i18n'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Stories } from './pages/Stories'
import { About } from './pages/About'
import { Contacts } from './pages/Contacts'
import { NotFound } from './pages/NotFound'

/** Old static-site URLs (products.html, en/aboutus.html, ...) keep working. */
const LEGACY_PAGES = {
  'index.html': 'home',
  'products.html': 'products',
  'stories.html': 'stories',
  'aboutus.html': 'about',
  'contacts.html': 'contacts',
} as const

function langRoutes(lang: Lang) {
  const base = lang === DEFAULT_LANG ? '/' : `/${lang}`
  return (
    <Route key={lang} path={base} element={<Layout lang={lang} />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="stories" element={<Stories />} />
      <Route path="about" element={<About />} />
      <Route path="contacts" element={<Contacts />} />
      {Object.entries(LEGACY_PAGES).map(([file, page]) => (
        <Route key={file} path={file} element={<Navigate to={pagePath(lang, page)} replace />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
}

// A data router is required for <Link viewTransition> (page transitions) to work.
const router = createBrowserRouter(createRoutesFromElements(LANGS.map(langRoutes)))

export function App() {
  return <RouterProvider router={router} />
}
