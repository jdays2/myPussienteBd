import { createContext, useContext, useState } from 'react'
import { translations, type Lang, type Translations } from './i18n'

interface LangCtx {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangCtx>(null!)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'ru' : 'en'))
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
