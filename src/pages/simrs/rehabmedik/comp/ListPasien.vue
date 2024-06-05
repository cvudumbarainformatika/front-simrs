<template>
  <div class="fit scroll">
    <q-list
      class="rounded-borders full-height"
    >
      <template v-if="loading">
        <LoadingList
          v-for="i in 20"
          :key="i"
        />
      </template>
      <template v-else>
        <TransitionGroup name="slide-left-fade" tag="div">
          <CardItemList
            v-for="(item, i) in items"
            :key="i"
            :item="item"
            @details="(val)=>emits('details', val)"
          />
        </TransitionGroup>
      </template>

      <!-- </Suspense> -->
      <div style="padding-bottom: 300px" />
    </q-list>
  </div>
</template>

<script setup>
// import { defineAsyncComponent } from 'vue'
import LoadingList from './LoadingList.vue'
import CardItemList from './CardItemList.vue'

// const CardItemList = defineAsyncComponent(() => import('./CardItemList.vue'))

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['details'])
</script>

<style lang="scss" scoped>
.shadow-q {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.scroll {
  scrollbar-width: none; /* untuk Firefox */
}

.scroll::-webkit-scrollbar {
  display: none; /* untuk Chrome, Safari, dan Opera */
}

.slide-left-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

</style>
