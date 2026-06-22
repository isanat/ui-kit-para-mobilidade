'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { defaultLocale, messages, type Locale, type MessageKey } from './messages'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: MessageKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'eer-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    return stored && ['en', 'pt-BR'].includes(stored) ? stored : defaultLocale
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, l)
    }
  }, [])

  const t = useCallback(
    (key: MessageKey) => {
      const dict = messages[locale] ?? messages[defaultLocale]
      return dict[key] ?? key
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
