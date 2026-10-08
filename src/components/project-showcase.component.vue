<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PortfolioCopy } from '@/features/portfolio/portfolio.content'

const props = defineProps<{ copy: PortfolioCopy['projects']; localDemonstration: boolean }>()
const route = useRoute()
const router = useRouter()
const detail = ref<HTMLElement | null>(null)
const detailHeading = ref<HTMLElement | null>(null)
const sourceId = ref<string | null>(null)
const selected = computed(() =>
  props.copy.items.find((project) => project.id === route.query.project),
)
let transition: ViewTransition | undefined
let request = 0

async function select(id: string) {
  const operation = ++request
  transition?.skipTransition()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const supportsTransition = typeof document.startViewTransition === 'function' && !reduce
  // A single shared name connects the clicked preview to the larger image below.
  sourceId.value = supportsTransition ? id : null
  await nextTick()
  if (operation !== request) return
  const update = async () => {
    if (operation !== request) return
    await router.replace({ query: { ...route.query, project: id }, hash: route.hash })
    if (operation !== request) return
    sourceId.value = null
    await nextTick()
    detailHeading.value?.focus({ preventScroll: true })
    detail.value?.scrollIntoView({
      behavior: supportsTransition || reduce ? 'instant' : 'smooth',
      block: 'start',
    })
  }
  if (!supportsTransition) {
    await update()
    return
  }
  transition = document.startViewTransition(update)
  // A skipped snapshot must not prevent the selection or leave an unhandled rejection.
  void transition.ready.catch(() => {})
  await transition.finished
}

async function close() {
  ++request
  transition?.skipTransition()
  const id = selected.value?.id
  sourceId.value = null
  const query = { ...route.query }
  delete query.project
  await router.replace({ query, hash: route.hash })
  await nextTick()
  const button = document.getElementById('select-project-' + id)
  button?.focus({ preventScroll: true })
  button?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'center',
  })
}

onMounted(async () => {
  if (selected.value) {
    await nextTick()
    detail.value?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
})
onUnmounted(() => {
  ++request
  transition?.skipTransition()
})
</script>

<template>
  <div class="project-grid">
    <article
      v-for="project in copy.items"
      :id="'project-' + project.id"
      :key="project.id"
      class="project"
      :class="['project--' + project.status, { 'is-selected': selected?.id === project.id }]"
      data-reveal
    >
      <h3 class="sr-only">{{ project.name }}</h3>
      <button
        :id="'select-project-' + project.id"
        class="project-select"
        type="button"
        :aria-label="copy.explore + ': ' + project.name"
        aria-controls="project-detail"
        :aria-expanded="selected?.id === project.id"
        @click="select(project.id)"
      >
        <span
          class="project-preview"
          :class="{ 'project-concept': !project.image }"
          :style="{ viewTransitionName: sourceId === project.id ? 'project-focus' : 'none' }"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.imageAlt"
            loading="lazy"
            decoding="async"
            width="1440"
            height="1500"
          />
          <span v-else aria-hidden="true" translate="no">{{
            project.id === 'importador' ? 'CSV' : project.id === 'crm' ? 'MCP' : 'HMAC'
          }}</span>
        </span>
        <span class="project-heading">
          <span class="project-name">{{ project.name }}</span>
          <span class="project-status">{{
            project.status === 'implemented' ? copy.implemented : copy.planned
          }}</span>
        </span>
        <span class="project-category">{{ project.category }}</span>
        <span class="project-explore">{{ copy.explore }} <span aria-hidden="true">↘</span></span>
      </button>
      <p class="project-description">{{ project.description }}</p>
      <ul class="project-stack" :aria-label="project.name">
        <li v-for="technology in project.stack" :key="technology" translate="no">
          {{ technology }}
        </li>
      </ul>
      <p v-if="project.id !== 'iam'" class="project-identity">
        {{ project.status === 'implemented' ? copy.authIntegrated : copy.authPlanned }}
      </p>
    </article>
  </div>
  <section
    v-if="selected"
    id="project-detail"
    ref="detail"
    :key="selected.id"
    class="project-expanded"
    aria-labelledby="project-detail-title"
    @keydown.esc="close"
  >
    <div class="project-expanded-heading">
      <div>
        <p class="eyebrow">{{ copy.selected }}</p>
        <h3 id="project-detail-title" ref="detailHeading" tabindex="-1">{{ selected.name }}</h3>
        <p class="project-category">{{ selected.category }}</p>
      </div>
      <button class="project-close" type="button" @click="close">
        {{ copy.close }} <span aria-hidden="true">↑</span>
      </button>
    </div>
    <figure
      class="project-expanded-media"
      :class="{ 'project-concept': !selected.image }"
      :style="{ viewTransitionName: sourceId ? 'none' : 'project-focus' }"
    >
      <img
        v-if="selected.image"
        :src="selected.image"
        :alt="selected.imageAlt"
        width="1440"
        height="1500"
        decoding="async"
      />
      <template v-else>
        <span aria-hidden="true" translate="no">{{
          selected.id === 'importador' ? 'CSV' : selected.id === 'crm' ? 'MCP' : 'HMAC'
        }}</span>
        <figcaption>{{ copy.plannedNote }}</figcaption>
      </template>
    </figure>
    <div class="project-expanded-intro">
      <p>{{ selected.description }}</p>
      <ul class="project-stack" :aria-label="selected.name">
        <li v-for="technology in selected.stack" :key="technology" translate="no">
          {{ technology }}
        </li>
      </ul>
    </div>
    <div class="project-expanded-story">
      <div>
        <h4>{{ copy.problemLabel }}</h4>
        <p>{{ selected.problem }}</p>
      </div>
      <div>
        <h4>{{ copy.workflowLabel }}</h4>
        <p>{{ selected.workflow }}</p>
      </div>
      <div>
        <h4>{{ copy.focus }}</h4>
        <p>{{ selected.focus }}</p>
      </div>
    </div>
    <a
      v-if="localDemonstration && selected.demoUrl"
      class="button button-primary project-demo"
      :href="selected.demoUrl"
      target="_blank"
      rel="noopener noreferrer"
      >{{ copy.demo }} <span aria-hidden="true">↗</span></a
    >
  </section>
</template>
