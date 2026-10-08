import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ContactForm from '@/components/contact-form.component.vue'
import { portfolioContent } from '@/features/portfolio/portfolio.content'
import { sendContactMessage } from '@/services/contact.service'

const endpoint = 'https://formspree.io/f/testform'
const message = {
  name: 'Test visitor',
  email: 'visitor@example.com',
  message: 'An interesting opportunity',
  language: 'en',
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

async function completeForm(wrapper: ReturnType<typeof mount>) {
  await wrapper.get('#contact-name').setValue(message.name)
  await wrapper.get('#contact-email').setValue(message.email)
  await wrapper.get('#contact-message').setValue(message.message)
}

describe('contact delivery', () => {
  it('rejects untrusted endpoints before making a request', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    await expect(sendContactMessage(message, 'https://example.com/contact')).rejects.toThrow(
      'Contact form unavailable',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('keeps a failed submission available for retry', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', endpoint)
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 429 })),
    )
    const wrapper = mount(ContactForm, {
      props: { copy: portfolioContent.en.contact, locale: 'en' },
    })
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toBe(portfolioContent.en.contact.error)
    expect((wrapper.get('#contact-message').element as HTMLTextAreaElement).value).toBe(
      message.message,
    )
    wrapper.unmount()
  })

  it('reports a network failure without reporting success', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Network error')))
    await expect(sendContactMessage(message, endpoint)).rejects.toThrow('Network error')
  })

  it('submits once, waits for acceptance and clears the draft after success', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', endpoint)
    let accept!: (value: Response) => void
    const fetchMock = vi.fn<typeof fetch>(
      () =>
        new Promise<Response>((resolve) => {
          accept = resolve
        }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const wrapper = mount(ContactForm, {
      props: { copy: portfolioContent.en.contact, locale: 'en' },
    })
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')
    await wrapper.get('form').trigger('submit')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[role="status"]').text()).toBe('')
    expect(JSON.parse(fetchMock.mock.calls[0]![1]!.body as string)).toMatchObject(message)
    accept(new Response('{"ok":true}', { status: 200 }))
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toBe(portfolioContent.en.contact.success)
    expect((wrapper.get('#contact-message').element as HTMLTextAreaElement).value).toBe('')
    wrapper.unmount()
  })

  it('does not send or report success when the endpoint is missing', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '')
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const wrapper = mount(ContactForm, {
      props: { copy: portfolioContent.en.contact, locale: 'en' },
    })
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(wrapper.get('[role="status"]').text()).toBe(portfolioContent.en.contact.unavailable)
    wrapper.unmount()
  })
})
