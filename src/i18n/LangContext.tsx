import { createContext, type ReactNode } from 'react'
import { DEFAULT_LANG, type Lang } from './types'

// eslint-disable-next-line react-refresh/only-export-components -- tiny context, not worth a third file
export const LangContext = createContext<Lang>(DEFAULT_LANG)

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}
