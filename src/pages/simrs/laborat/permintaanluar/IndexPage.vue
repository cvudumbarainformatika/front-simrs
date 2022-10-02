<template>
  <div>
    <div v-if="route.params.page === 'form'">
      <FormPage />
    </div>
    <div v-else-if="route.params.page === 'catatan'">
      <CatatanDokter />
    </div>
    <div
      v-else
    >
      <transition
        appear
        enter-active-class="animated slide-left"
        leave-active-class="animated slideRight"
      >
        <Suspense>
          <TablePage />
          <template #fallback>
            <app-loading />
          </template>
        </Suspense>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)

const TablePage = defineAsyncComponent(() => import('./TablePage.vue'))
const FormPage = defineAsyncComponent(() => import('./FormPage.vue'))
const CatatanDokter = defineAsyncComponent(() => import('./CatatanDokter.vue'))
</script>
