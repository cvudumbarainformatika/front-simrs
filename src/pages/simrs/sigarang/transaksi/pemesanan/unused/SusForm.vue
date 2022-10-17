<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <AsyncComp v-model="store.isOpen" />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import { useTransaksiPemensananForm } from 'src/stores/transaksi/pemesanan/form'
const AsyncComp = defineAsyncComponent(() =>
  import('./FormDialog.vue')
)

const store = useTransaksiPemensananForm()
</script>
