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
  await page.locator('#select-project-iam').click()
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

test('expands a selected project below the gallery, switches language and restores focus', async ({
  page,
}) => {
  await page.goto('/?lang=pt-BR')
  await expect(page.getByRole('link', { name: 'Aberto a oportunidades' })).toBeVisible()
  await expect(page.locator('.hero-experience')).toContainText('4+')
  await expect(
    page.getByRole('link', { name: 'Vamos trabalhar juntos', exact: false }),
  ).toBeVisible()
  const previewWidth = await page
    .locator('#project-iam .project-preview')
    .evaluate((el) => el.getBoundingClientRect().width)
  await page.locator('#select-project-iam').focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/project=iam/)
  const panel = page.locator('#project-detail')
  await expect(panel.getByRole('heading', { name: 'IAM Portfolio', exact: true })).toBeFocused()
  await expect(panel).toContainText('Logins repetidos')
  expect(
    await panel.locator('figure').evaluate((el) => el.getBoundingClientRect().width),
  ).toBeGreaterThan(previewWidth)
  await page.evaluate(async () => {
    await Promise.all(
      document.getAnimations().map((animation) => animation.finished.catch(() => {})),
    )
  })
  await page.screenshot({ path: 'test-results/project-expanded-desktop.png', fullPage: false })
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(panel).toContainText('Repeated sign-ins')
  await expect(page).toHaveURL(/project=iam/)
  await panel.getByRole('button', { name: 'Back to projects', exact: false }).click()
  await expect(panel).toHaveCount(0)
  await expect(page.locator('#select-project-iam')).toBeFocused()
  await page.locator('#select-project-reservas').click()
  await expect(page.locator('#project-detail')).toContainText('SMTP')
  await expect(page.locator('#project-detail')).not.toContainText('Google Calendar')
  await page.keyboard.press('Escape')
  await expect(page.locator('#select-project-reservas')).toBeFocused()
})

test('supports planned projects, direct links and the fallback on narrow screens', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Object.defineProperty(document, 'startViewTransition', { value: undefined })
  })
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto('/?lang=pt-BR&project=importador')
  await expect(page.locator('#project-detail')).toContainText('Jornada proposta')
  await page.locator('#project-detail button').click()
  await page.locator('#select-project-crm').click()
  await expect(page.locator('#project-detail-title')).toBeFocused()
  for (const lang of ['en', 'pt-BR', 'es']) {
    await page.goto('/?lang=' + lang + '&project=reservas')
    await expect(page.locator('#project-detail')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
  }
  await page.screenshot({ path: 'test-results/project-expanded-mobile.png', fullPage: false })
  await page.goto('/?project=unknown')
  await expect(page.locator('#project-detail')).toHaveCount(0)
  await expect(page.locator('.project')).toHaveCount(5)
})
