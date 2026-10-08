<script setup lang="ts">
import { ref } from 'vue'
import ContactForm from '@/components/contact-form.component.vue'
import { localeOptions, profile } from '@/features/portfolio/portfolio.content'
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale.composable'
import { useScrollReveal } from '@/hooks/use-scroll-reveal.composable'

const { locale, copy, setLocale } = usePortfolioLocale()
const pageRoot = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
useScrollReveal(pageRoot)
const localDemonstration = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)
const currentYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date())
</script>

<template>
  <div ref="pageRoot" class="portfolio-page">
    <a class="skip-link" href="#main">{{ copy.nav.skip }}</a>
    <header class="site-header" @keydown.esc="closeMenu">
      <a class="wordmark" href="#top" aria-label="Gabriel Nicholas" translate="no"
        >gn<span>.</span></a
      >
      <nav id="main-navigation" :aria-label="copy.nav.label" :class="{ 'is-open': menuOpen }">
        <a href="#about" @click="menuOpen = false">{{ copy.nav.about }}</a>
        <a href="#expertise" @click="menuOpen = false">{{ copy.nav.expertise }}</a>
        <a href="#projects" @click="menuOpen = false">{{ copy.nav.projects }}</a>
        <a class="nav-contact" href="#contact" @click="menuOpen = false"
          >{{ copy.nav.contact }} <span aria-hidden="true">↗</span></a
        >
      </nav>
      <div class="header-controls">
        <div class="language-picker" role="group" :aria-label="copy.nav.language">
          <button
            v-for="option in localeOptions"
            :key="option.value"
            type="button"
            :lang="option.value"
            :aria-label="option.label"
            :aria-pressed="locale === option.value"
            @click="setLocale(option.value)"
          >
            {{ option.shortLabel }}
          </button>
        </div>
        <button
          ref="menuButton"
          class="menu-button"
          type="button"
          :aria-label="copy.nav.menu"
          aria-controls="main-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span>
        </button>
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section id="top" class="hero section-shell" aria-labelledby="hero-title">
        <div class="hero-copy">
          <Transition name="copy" mode="out-in">
            <div :key="locale">
              <p class="eyebrow hero-enter">{{ copy.hero.role }}</p>
              <h1 id="hero-title" class="hero-enter">
                <span>{{ copy.hero.firstLine }}</span>
                <em>{{ copy.hero.secondLine }}</em>
              </h1>
              <p class="hero-description hero-enter">{{ copy.hero.description }}</p>
              <div class="hero-actions hero-enter">
                <a class="button button-primary" href="#contact"
                  >{{ copy.nav.contact }} <span aria-hidden="true">↗</span></a
                >
                <a class="text-link" :href="profile.resume" download
                  >{{ copy.hero.resume }} <span aria-hidden="true">↓</span></a
                >
              </div>
            </div>
          </Transition>
        </div>
        <div class="portrait-composition">
          <div class="portrait-outline" aria-hidden="true"></div>
          <div class="portrait-disc" aria-hidden="true"></div>
          <figure class="portrait-frame">
            <img
              :src="profile.portrait"
              :alt="copy.hero.portraitAlt"
              width="3544"
              height="4725"
              fetchpriority="high"
            />
          </figure>
          <span class="portrait-initials" aria-hidden="true" translate="no">GN</span>
        </div>
      </section>

      <div class="identity-strip section-shell">
        <span translate="no">Gabriel Nicholas</span>
        <span
          >TypeScript <span aria-hidden="true">/</span> Node.js
          <span aria-hidden="true">/</span> AWS</span
        >
        <div class="social-links">
          <a :href="profile.github" target="_blank" rel="noopener noreferrer" translate="no"
            >GitHub <span aria-hidden="true">↗</span></a
          >
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" translate="no"
            >LinkedIn <span aria-hidden="true">↗</span></a
          >
        </div>
      </div>

      <section
        id="about"
        class="about-section section-shell section-space"
        aria-labelledby="about-title"
      >
        <div class="about-heading" data-reveal>
          <h2 id="about-title">
            {{ copy.about.title }} <em>{{ copy.about.titleAccent }}</em>
          </h2>
          <p class="section-lead">{{ copy.about.lead }}</p>
          <div class="journey" aria-hidden="true">
            <span>{{ copy.about.journey }}</span
            ><span class="journey-arrow">⟶</span><span>{{ copy.about.destination }}</span>
          </div>
        </div>
        <div class="about-story" data-reveal>
          <p>{{ copy.about.story }}</p>
          <p>{{ copy.about.work }}</p>
          <p class="professional-objective">{{ copy.about.objective }}</p>
        </div>
        <aside class="personality-note" data-reveal>
          <span class="personality-symbol" aria-hidden="true">{ curiosity }</span>
          <p>{{ copy.about.personality }}</p>
          <span>{{ copy.about.personalityNote }}</span>
        </aside>
      </section>

      <section
        id="expertise"
        class="expertise-section section-shell section-space"
        aria-labelledby="expertise-title"
      >
        <div class="section-heading" data-reveal>
          <h2 id="expertise-title">
            {{ copy.expertise.title }} <em>{{ copy.expertise.titleAccent }}</em>
          </h2>
          <p class="section-lead">{{ copy.expertise.description }}</p>
        </div>
        <div class="expertise-list">
          <article
            v-for="(group, index) in copy.expertise.groups"
            :key="index"
            class="expertise-item"
            data-reveal
          >
            <span class="expertise-number" aria-hidden="true">{{
              String(index + 1).padStart(2, '0')
            }}</span>
            <div class="expertise-description">
              <h3>{{ group.title }}</h3>
              <p>{{ group.description }}</p>
            </div>
            <ul class="technology-list" :aria-label="group.title">
              <li v-for="technology in group.technologies" :key="technology" translate="no">
                {{ technology }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section
        id="projects"
        class="projects-section section-shell section-space"
        aria-labelledby="projects-title"
      >
        <div class="section-heading" data-reveal>
          <h2 id="projects-title">
            {{ copy.projects.title }} <em>{{ copy.projects.titleAccent }}</em>
          </h2>
          <p class="section-lead">{{ copy.projects.description }}</p>
        </div>
        <aside class="identity-foundation" data-reveal>
          <div class="foundation-mark" aria-hidden="true" translate="no">IAM</div>
          <div>
            <h3>{{ copy.projects.foundationTitle }}</h3>
            <p>{{ copy.projects.foundationDescription }}</p>
          </div>
        </aside>
        <div class="project-grid">
          <article
            v-for="project in copy.projects.items"
            :id="'project-' + project.id"
            :key="project.id"
            class="project"
            :class="'project--' + project.status"
            data-reveal
          >
            <figure v-if="project.image" class="project-preview">
              <img
                :src="project.image"
                :alt="project.imageAlt"
                loading="lazy"
                decoding="async"
                width="1440"
                height="1500"
              />
            </figure>
            <div class="project-heading">
              <h3>{{ project.name }}</h3>
              <span class="project-status">{{
                project.status === 'implemented' ? copy.projects.implemented : copy.projects.planned
              }}</span>
            </div>
            <p class="project-category">{{ project.category }}</p>
            <p class="project-description">{{ project.description }}</p>
            <ul class="project-stack" :aria-label="project.name">
              <li v-for="technology in project.stack" :key="technology" translate="no">
                {{ technology }}
              </li>
            </ul>
            <p v-if="project.id !== 'iam'" class="project-identity">
              {{
                project.status === 'implemented'
                  ? copy.projects.authIntegrated
                  : copy.projects.authPlanned
              }}
            </p>
            <details class="project-details">
              <summary>{{ copy.projects.details }} <span aria-hidden="true">+</span></summary>
              <div>
                <h4>{{ copy.projects.focus }}</h4>
                <p>{{ project.focus }}</p>
              </div>
            </details>
            <a
              v-if="localDemonstration && project.demoUrl"
              class="text-link project-demo"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              >{{ copy.projects.demo }} <span aria-hidden="true">↗</span></a
            >
          </article>
        </div>
      </section>

      <section
        id="contact"
        class="contact-section section-shell section-space"
        aria-labelledby="contact-title"
      >
        <div class="contact-copy" data-reveal>
          <h2 id="contact-title">
            {{ copy.contact.title }} <em>{{ copy.contact.titleAccent }}</em>
          </h2>
          <p class="section-lead">{{ copy.contact.description }}</p>
          <a class="contact-address" :href="'mailto:' + profile.email">{{ profile.email }}</a>
          <div class="social-links">
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" translate="no"
              >LinkedIn <span aria-hidden="true">↗</span></a
            >
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" translate="no"
              >GitHub <span aria-hidden="true">↗</span></a
            >
          </div>
        </div>
        <div class="contact-form-wrapper" data-reveal>
          <ContactForm :copy="copy.contact" :locale="locale" />
        </div>
      </section>
    </main>

    <footer class="site-footer section-shell">
      <p>
        <span translate="no">© {{ currentYear }} {{ copy.footer.rights }}</span
        ><span>{{ copy.footer.note }}</span>
      </p>
      <a class="text-link" href="#top">{{ copy.footer.top }} <span aria-hidden="true">↑</span></a>
    </footer>
  </div>
</template>
