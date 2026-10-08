import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  isPortfolioLocale,
  portfolioContent,
  type PortfolioLocale,
} from '@/features/portfolio/portfolio.content'

export function usePortfolioLocale() {
  const route = useRoute()
  const router = useRouter()

  function initialLocale(): PortfolioLocale {
    if (isPortfolioLocale(route.query.lang)) return route.query.lang
    try {
      const saved = localStorage.getItem('portfolio-language')
      return isPortfolioLocale(saved) ? saved : 'en'
    } catch {
      return 'en'
    }
  }

  const locale = ref<PortfolioLocale>(initialLocale())
  const copy = computed(() => portfolioContent[locale.value])

  watch(
    () => route.query.lang,
    (value) => {
      if (isPortfolioLocale(value)) locale.value = value
    },
  )

  watch(
    copy,
    (value) => {
      document.documentElement.lang = locale.value
      document.title = value.meta.title
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', value.meta.description)
    },
    { immediate: true },
  )

  function setLocale(value: PortfolioLocale) {
    locale.value = value
    try {
      localStorage.setItem('portfolio-language', value)
    } catch {
      // Browsing with storage disabled still allows changing the language.
    }
    void router.replace({ query: { ...route.query, lang: value }, hash: route.hash })
  }

  return { locale, copy, setLocale }
}
