<template>
  <q-card
    class="bg-deep-purple-2 cursor-pointer"
    flat
    @click="goTo(url)"
  >
    <q-card-section>
      <div class="row text-primary q-col-gutter-lg">
        <q-icon
          :name="icon"
          size="lg"
        />
        <div>
          <div
            class="f-16"
          >
            {{ title }}
          </div>
          <div>{{ subtitle }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useRouter } from 'vue-router'

defineProps({
  icon: {
    type: String,
    default: 'icon-mat-dashboard'
  },
  title: {
    type: String,
    default: 'Settings Menu & SubMenu'
  },
  subtitle: {
    type: String,
    default: 'Pengaturan Menu Aplikasi Beserta Submenunya'
  },
  url: {
    type: String,
    default: 'admin.settings'
  }
})

const router = useRouter()

function goTo(url) {
  router.push({ name: url })
}
</script>
