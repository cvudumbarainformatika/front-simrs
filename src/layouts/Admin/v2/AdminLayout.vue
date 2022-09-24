<template>
  <q-layout
    view="lhr LpR lfr"
    :class="dark?'':'page-light'"
  >
    <!-- <q-header
      reveal
      bordered
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header> -->

    <!-- <leftDraw
      v-if="!SSO"
      v-model="store.leftDrawerOpen"
    /> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
// import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'
// import { useRoute } from 'vue-router'
// import LeftDraw from './LeftDraw.vue'

// const store = useAppStore()
// const route = useRoute()

// const SSO = computed(() => route.name === 'admin.sso')
const $q = useQuasar()
const mobile = $q.screen.lt.md
console.log(mobile)
const dark = computed(() => {
  return $q.dark.isActive
})
</script>
