<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import type { PortfolioCopy, PortfolioLocale } from '@/features/portfolio/portfolio.content'
import { profile } from '@/features/portfolio/portfolio.content'
import { contactFormEndpoint, sendContactMessage } from '@/services/contact.service'

const props = defineProps<{ copy: PortfolioCopy['contact']; locale: PortfolioLocale }>()
const endpoint = contactFormEndpoint()
const fields = reactive({ name: '', email: '', message: '', website: '' })
type Field = 'name' | 'email' | 'message'
const errors = reactive<Partial<Record<Field, 'required' | 'invalidEmail' | 'tooShort'>>>({})
const state = ref<'idle' | 'sending' | 'success' | 'error' | 'unavailable'>('idle')
const nameInput = ref<HTMLInputElement | null>(null)
const emailInput = ref<HTMLInputElement | null>(null)
const messageInput = ref<HTMLTextAreaElement | null>(null)
const hasDraft = computed(() => !!(fields.name || fields.email || fields.message))
const feedback = computed(() => {
  if (state.value === 'success') return props.copy.success
  if (state.value === 'error') return props.copy.error
  if (state.value === 'unavailable') return props.copy.unavailable
  return ''
})

function warnAboutDraft(event: BeforeUnloadEvent) {
  event.preventDefault()
  event.returnValue = ''
}

watch(hasDraft, (value) => {
  if (value) window.addEventListener('beforeunload', warnAboutDraft)
  else window.removeEventListener('beforeunload', warnAboutDraft)
})
onBeforeUnmount(() => window.removeEventListener('beforeunload', warnAboutDraft))

function validate() {
  for (const key of ['name', 'email', 'message'] as const) delete errors[key]
  if (!fields.name.trim()) errors.name = 'required'
  if (!fields.email.trim()) errors.email = 'required'
  else if (!emailInput.value?.validity.valid) errors.email = 'invalidEmail'
  if (!fields.message.trim()) errors.message = 'required'
  else if (fields.message.trim().length < 10) errors.message = 'tooShort'

  if (errors.name) nameInput.value?.focus()
  else if (errors.email) emailInput.value?.focus()
  else if (errors.message) messageInput.value?.focus()
  return !Object.keys(errors).length
}

async function submit() {
  if (state.value === 'sending') return
  state.value = 'idle'
  if (!validate()) return
  if (!endpoint || fields.website) {
    state.value = 'unavailable'
    return
  }
  state.value = 'sending'
  try {
    await sendContactMessage(
      {
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
        language: props.locale,
      },
      endpoint,
    )
    fields.name = ''
    fields.email = ''
    fields.message = ''
    state.value = 'success'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" novalidate :aria-busy="state === 'sending'" @submit.prevent="submit">
    <div class="form-row">
      <div class="field">
        <label for="contact-name">{{ copy.name }}</label>
        <input
          id="contact-name"
          ref="nameInput"
          v-model="fields.name"
          name="name"
          autocomplete="name"
          :disabled="state === 'sending'"
          required
          maxlength="100"
          :placeholder="copy.namePlaceholder"
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <p v-if="errors.name" id="name-error" class="field-error">{{ copy[errors.name] }}</p>
      </div>
      <div class="field">
        <label for="contact-email">{{ copy.email }}</label>
        <input
          id="contact-email"
          ref="emailInput"
          v-model="fields.email"
          name="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          :disabled="state === 'sending'"
          required
          maxlength="254"
          :spellcheck="false"
          :placeholder="copy.emailPlaceholder"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <p v-if="errors.email" id="email-error" class="field-error">{{ copy[errors.email] }}</p>
      </div>
    </div>
    <div class="field">
      <label for="contact-message">{{ copy.message }}</label>
      <textarea
        id="contact-message"
        ref="messageInput"
        v-model="fields.message"
        name="message"
        autocomplete="off"
        :disabled="state === 'sending'"
        required
        minlength="10"
        maxlength="4000"
        rows="5"
        :placeholder="copy.messagePlaceholder"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : undefined"
      ></textarea>
      <p v-if="errors.message" id="message-error" class="field-error">{{ copy[errors.message] }}</p>
    </div>
    <div class="honeypot" aria-hidden="true" inert>
      <label for="contact-website">{{ copy.honeypot }}</label>
      <input
        id="contact-website"
        v-model="fields.website"
        name="_gotcha"
        tabindex="-1"
        autocomplete="off"
      />
    </div>
    <p v-if="endpoint" class="form-note">{{ copy.privacy }}</p>
    <p v-else id="contact-availability" class="form-note">{{ copy.unavailable }}</p>
    <div class="form-actions">
      <button class="button button-primary" type="submit" :disabled="state === 'sending'">
        <span v-if="state === 'sending'" class="loading-mark" aria-hidden="true"></span>
        {{ state === 'sending' ? copy.sending : copy.submit }}
        <span v-if="state !== 'sending'" aria-hidden="true">↗</span>
      </button>
      <a class="text-link" :href="'mailto:' + profile.email">{{ copy.emailLink }}</a>
    </div>
    <p
      class="form-feedback"
      :class="{ 'is-error': state === 'error' }"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ feedback }}
    </p>
  </form>
</template>
