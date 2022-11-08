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
      <router-view
        v-slot="{ Component }"
        class="transition"
      >
        <transition
          :name="transition.pageTransition.name"
          :mode="transition.pageTransition.mode"
        >
          <!-- <router-view class="transition" /> -->
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTransitionStore } from 'src/stores/app/transition'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const $q = useQuasar()
// const mobile = $q.screen.lt.md
// console.log(mobile)
const dark = computed(() => {
  return $q.dark.isActive
})

const route = useRoute()
const transition = useTransitionStore()

// const afterEnter = () => {
//   window.scrollTo(0, 0)
// }
// const afterLeave = () => {
//   transition.setPageTransition('default')
// }

watch(route, (to) => {
  // console.log('route', route)
  console.log('to', to)
  // transition.setPageTransition('back')
}, { flush: 'pre', immediate: true, deep: true })

</script>

<style lang="scss">
$duration: 0.1s;
.transition {
  overflow: hidden;
}
.router-view,
.router-view-back {
  &-enter-active,
  &-leave-active {
    position: fixed;
    width: 100%;
    background: white;
    min-height: 100vh;
    top: 0;
  }
}
// router view
.router-view-enter-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(-100%);
}
.router-view-enter-to {
  z-index: 2;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}
// router view back

.router-view-back-leave-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(0%);
}
.router-view-back-leave-to {
  z-index: 2;
  transform: translateX(-100%);
}
</style>
