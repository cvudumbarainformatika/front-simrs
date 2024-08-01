<template>
  <div class="row no-wrap q-col-gutter-xs">
    <div class="col-auto">
      <selectObat
        v-model="obat"
        :depo="depo"
        @form="setObat"
      />
    </div>
    <div class="col-auto">
      <app-input
        v-model="store.form.jumlah"
        label="Jumlah"
        outlined
      />
    </div>
  </div>
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { computed, defineAsyncComponent, ref, shallowRef } from 'vue'
const apps = useAplikasiStore()
const obat = ref(null)
const selectObat = shallowRef(defineAsyncComponent(() => import('./SelectObat.vue')))
const store = usePenjualanBebasFarmasiStore()
const depo = computed(() => {
  const kode = apps?.user?.kdruangansim
  console.log('p', kode)
  return kode
})
function setObat (val) {
  const keys = Object.keys(val)
  keys.forEach(k => {
    store.setForm(k, val[k])
  })
  console.log('form', store.form)
}
</script>
