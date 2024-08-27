<template>
  <q-page class="absolute fit bg-grey-3 q-pa-sm" style="overflow: hidden;">
    <div class="fit column">
      <div class="col-auto ng-red">
        <HeaderPage />
      </div>
      <div class="col full-height scroll">
        <ListPage />
      </div>
      <div class="col-auto">
        <FooterPage />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const HeaderPage = defineAsyncComponent(() => import('./comp/HeaderPage.vue'))
const FooterPage = defineAsyncComponent(() => import('./comp/FooterPage.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))

</script>
