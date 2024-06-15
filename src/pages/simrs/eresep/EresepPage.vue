<template>
  <div
    class="row full-height full-width bg-grey-4 shadow-1"
  >
    <Transition>
      <div v-if="!temp" class="fit row">
        <div class="col-8 full-height q-pa-xs">
          <form-resep
            :pasien="props?.pasien"
            :depo="props?.depo"
            tooltip="History EResep"
            @open-history="seamless = !seamless"
            @open-template="temp = !temp"
          />
        </div>
        <div class="col-4 full-height q-pa-xs">
          <listpage />
        </div>
      </div>

      <div v-else class="fit">
        <EresepTemplatePage :pasien="props?.pasien" :depo="props?.depo" :key="pasien" @back="temp = !temp" />
      </div>
    </Transition>

    <app-drawer-right-new
      :key="props?.pasien"
      style="width:60%;"
      :seamless="seamless"
      :pasien="props?.pasien"
      @click-btn="clickslideRight"
    >
      <template #content>
        <HistoryEresep
          :key="props?.pasien"
          :pasien="props?.pasien"
          title="HISTORY E-RESEP"
        />
      </template>
    </app-drawer-right-new>
  </div>
</template>

<script setup>
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { defineAsyncComponent, shallowRef, onUnmounted, ref } from 'vue'
import FormResep from './comp/FormResep.vue'
import HistoryEresep from './comp/HistoryEresep.vue'

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})

const seamless = ref(false)
const temp = ref(false)

const listpage = shallowRef(defineAsyncComponent(() => import('./comp/LitsPage.vue')))
const EresepTemplatePage = defineAsyncComponent(() => import('./EresepTemplatePage.vue'))

const store = usePermintaanEResepStore()
onUnmounted(() => {
  // console.log('on mounted front page')
  store.listRacikan = []
  store.listPemintaanSementara = []
  store.noreseps = []
  store.noresep = ''
  store.setForm('jenisresep', '')
  store.resetForm()
})

const clickslideRight = () => {
  // console.log('ok')
  seamless.value = !seamless.value
}
</script>
