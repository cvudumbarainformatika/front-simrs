<template>
  <div
    class="row full-width bg-primary items-center text-white q-mb-sm"
    style="z-index: 2;"
  >
    <div class="col-auto">
      <HeaderPage
        :from="store.params.from"
        :to="store.params.to"
        :flag="store.params.flag"
        @set-from="store.setParams('from',$event)"
        @set-to="store.setParams('to',$event)"
        @set-flag="store.setParams('flag',$event)"
      />
    </div>
    <div class="col text-right q-mr-sm">
      <q-btn
        flat
        unelevated
        round
        color="yellow"
        size="sm"
        icon="icon-mat-refresh"
        @click="store.refresh"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Ambil Data
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <q-scroll-area
    class="full-width"
    style="height: 85vh;"
  >
    <div
      v-if="store.loading"
      class="row full-height full-width"
      style="min-height: 400px;"
    >
      <app-loading />
    </div>
    <div
      v-if="!store.loading"
      class="row full-height full-width q-col-gutter-sm q-mb-xl"
    >
      <div class="col-8 full-height q-pt-xs">
        <BelumPage v-if="store.belums?.length" />
        <app-no-data v-if="!store.belums?.length" />
      </div>
      <div class="col-4 full-height q-pt-xs">
        <SudahPage v-if="store.sudahs?.length" />
        <app-no-data v-if="!store.sudahs?.length" />
      </div>
    </div>
  </q-scroll-area>
  <div class="row absolute-bottom bg-white">
    <div class="col-8">
      <div class="row items-center">
        <div class="col-4 text-right">
          <div class="q-mr-md">
            <q-btn
              label="Nomor Resep Selesai"
              no-caps
              dense
              push
              color="green"
              :loading="store.loadingSelesai"
              :disable="store.loadingSelesai"
              @click="selesai()"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="q-ml-sm">
            {{ store.form?.noresep }}
          </div>
        </div>
        <div class="col-2">
          <q-btn
            label="Simpan"
            no-caps
            dense
            push
            color="primary"
            :loading="store.loadingSimpan"
            :disable="store.loadingSimpan"
            @click="simpan()"
          />
        </div>
      </div>
    </div>
    <div class="col-4">
      kanan
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, shallowRef, watch, onMounted, onUnmounted } from 'vue'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

const store = useResepPermintaanOperasiStore()

// define the components
const HeaderPage = shallowRef(defineAsyncComponent(() => import('./comppersiapan/HeaderPage.vue')))
const BelumPage = shallowRef(defineAsyncComponent(() => import('./comppersiapan/BelumPage.vue')))
const SudahPage = shallowRef(defineAsyncComponent(() => import('./comppersiapan/SudahPage.vue')))
// end of defined components

// define the functions
function simpan() {
  console.log('form', store.form)
  store.simpan()
}
function selesai() {
  console.log('form', store.form)
  store.selesai()
}
watch(store.params, (par) => {
  // console.log('params', par)
  store.getData()
})
onMounted(() => {
  store.getData()
})
onUnmounted(() => {
  store.resetParams()
})
// end of defined functions

</script>
<style  lang="scss" scoped>
.full-tinggi{
  height: 100vh;
  padding-top: 32px;
  top: -32px;

}
.bdl{
  border-right: 1px solid black;
}
</style>
