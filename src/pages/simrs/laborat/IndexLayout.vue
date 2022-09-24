<template>
  <div class="layout--laborat">
    <leftDrawer />
    <div class="page--laborat">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import LeftDrawer from './LeftDrawer.vue'
</script>
