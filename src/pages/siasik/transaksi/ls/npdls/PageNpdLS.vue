<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-sm q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-black text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Nota Permintaan Dana Langsung | SIASIK
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-card q-mt-sm q-mt-ms">
      <q-tabs
        v-model="tabdata"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="forminput" label="Form NPD-LS" @click="reset()" />
        <q-tab name="data" label="Data NPD-LS" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tabdata" animated>
        <q-tab-panel name="forminput">
          <FormInputnpdLS />
        </q-tab-panel>

        <q-tab-panel name="data">
          <ListdataNpsLS />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import FormInputnpdLS from './inpage/FormInputnpdLS.vue'
import ListdataNpsLS from './inpage/ListdataNpdLS.vue'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
// import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'

// const carisrt = dataBastFarmasi()
const store = formNotaPermintaanDanaLS()
const tabdata = ref('forminput')
onBeforeUnmount(() => {
  reset()
})
function reset () {
  store.resetFORM(tabdata)
  // carisrt.resetFORM(tabdata)
}
// onMounted(() => {
//   store.emptyForm()
// })
</script>

<style lang="scss" scoped>

</style>
