import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!root.value || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elements = root.value.querySelectorAll<HTMLElement>('[data-reveal]')
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 },
    )

    for (const element of elements) {
      element.classList.add('will-reveal')
      observer.observe(element)
    }
  })

  onUnmounted(() => observer?.disconnect())
}
