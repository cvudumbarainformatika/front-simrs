<template>
  <div class="layout--laborat">
    <left-drawer />
    <div class="page--laborat">
      <router-view
        v-slot="{ Component }"
        class="transition"
      >
        <transition
          :name="transition.pageTransition.name"
          :mode="transition.pageTransition.mode"
          @after-enter="afterEnter"
          @after-leave="afterLeave"
        >
          <!-- <router-view class="transition" /> -->
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useTransitionStore } from 'src/stores/app/transition'
import LeftDrawer from './LeftDrawer.vue'

const transition = useTransitionStore()
const afterEnter = () => {
  window.scrollTo(0, 0)
}
const afterLeave = () => {
  transition.setPageTransition('default')
}
</script>
