import { createContext, useContext } from 'react'
import { t, type Translations } from './i18n'

interface LangCtx {
  t: Translations
}

const LangContext = createContext<LangCtx>({ t })

export function LangProvider({ children }: { children: React.ReactNode }) {
  return <LangContext.Provider value={{ t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
