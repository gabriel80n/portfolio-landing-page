export interface ContactMessage {
  name: string
  email: string
  message: string
  language: string
}

export function isValidContactEndpoint(value: string): boolean {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      url.hostname === 'formspree.io' &&
      /^\/f\/[a-zA-Z0-9]+$/.test(url.pathname) &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
    )
  } catch {
    return false
  }
}

export function contactFormEndpoint(): string {
  const value = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() ?? ''
  return isValidContactEndpoint(value) ? value : ''
}

export async function sendContactMessage(message: ContactMessage, endpoint: string): Promise<void> {
  if (!isValidContactEndpoint(endpoint)) throw new Error('Contact form unavailable')

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...message, _subject: 'Portfolio contact' }),
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) throw new Error('Contact submission failed')
}
