import { test, expect } from '@playwright/test'

test('defaults to English and preserves language and form draft when switching', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('h1')).toContainText('With character.')
  await page.getByLabel('Your name', { exact: true }).fill('Test visitor')
  await page.getByRole('button', { name: 'Português do Brasil', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.locator('h1')).toContainText('Com personalidade.')
  await expect(page.getByLabel('Seu nome', { exact: true })).toHaveValue('Test visitor')
  await page.getByRole('button', { name: 'Español', exact: true }).click()
  await expect(page).toHaveURL(/lang=es/)
  await expect(page.locator('h1')).toContainText('Con personalidad.')
  page.once('dialog', (dialog) => dialog.accept())
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.goto('/?lang=en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('validates the form and distinguishes implemented projects from planned work', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByLabel('Your name', { exact: true })).toBeFocused()
  await expect(page.getByLabel('Your name', { exact: true })).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await page.getByLabel('Your name', { exact: true }).fill('Test visitor')
  await page.getByLabel('Your email', { exact: true }).fill('invalid-email')
  await page.getByLabel('Your message', { exact: true }).fill('An interesting opportunity')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByLabel('Your email', { exact: true })).toBeFocused()
  await expect(page.locator('#email-error')).toBeVisible()
  await expect(page.locator('#projects article')).toHaveCount(5)
  await expect(page.getByText('Implemented locally', { exact: true })).toHaveCount(2)
  await expect(page.getByText('Planned', { exact: true })).toHaveCount(3)
  await expect(
    page.getByRole('heading', { name: 'IAM Portfolio connects the projects.' }),
  ).toBeVisible()
  await expect(page.locator('#project-reservas')).toContainText('Authentication by IAM Portfolio')
  await page.locator('summary').first().click()
  await expect(
    page.getByText('What this project demonstrates', { exact: true }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Download CV (PT-BR)', exact: true }),
  ).toHaveAttribute('href', '/documents/gabriel-nicholas-resume.pdf')
})

test('keeps all languages within the viewport and supports the mobile menu', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1440, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    for (const lang of ['en', 'pt-BR', 'es']) {
      await page.goto('/?lang=' + lang)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }))
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport)
    }
  }
  await page.goto('/?lang=en')
  const menu = page.getByRole('button', { name: 'Toggle navigation' })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page).toHaveURL(/#projects$/)
})
