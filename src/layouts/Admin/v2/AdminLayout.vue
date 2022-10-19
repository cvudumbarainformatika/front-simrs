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
      <transition
        :name="transition.pageTransition.name"
        :mode="transition.pageTransition.mode"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <router-view class="transition" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTransitionStore } from 'src/stores/app/transition'
import { computed } from 'vue'

const $q = useQuasar()
const mobile = $q.screen.lt.md
console.log(mobile)
const dark = computed(() => {
  return $q.dark.isActive
})

const transition = useTransitionStore()

const afterEnter = () => {
  window.scrollTo(0, 0)
}
const afterLeave = () => {
  transition.setPageTransition('default')
}

</script>

<style lang="scss">
$duration: 0.5s;
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
  transform: translateX(100%);
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
  transform: translateX(100%);
}
</style>
