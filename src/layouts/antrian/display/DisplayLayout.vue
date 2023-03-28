<template>
  <q-layout view="lHh Lpr lff">
    <q-page-container class="bg-primary">
      <router-view v-slot="{ Component }">
        <transition
          name="slide"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style lang="scss">

.fade-enter, .fade-leave-to {
  opacity:0;
  transform: translateY(5em);
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}

// slide bottom
.slide-enter-from,
.slide-leave-to {
  opacity:0;
  transform: translateY(400px);
}

.slide-enter-active,
.slide-leave-active {
  transition: 400ms ease all;
}

// slide left
.slider-enter-from,
.slider-leave-to {
  opacity:0;
  transform: translateX(-200px);
}

.slider-enter-active,
.slider-leave-active {
  transition: 400ms ease all;
}

</style>
