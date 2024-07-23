<template>
  <div
    class="column full-height q-ma-sm"
  >
    <div v-if="!bisa">
      <div
        class="bg-yellow-2 wrap columns content-center"
        style="height: 90vh; width: 100%;"
      >
        <div class="text-negative text-center">
          <q-icon
            name="icon-mat-warning"
            size="100px"
          />
        </div>
        <div class="text-negative f-20  text-center">
          Tidak Bisa Melakukan Penjualan Langsung
        </div>
      </div>
    </div>
    <div v-if="bisa" class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
          @update:model-value="cekPanel"
        >
          <template v-for="opt in optionTabs" :key="opt">
            <q-tab :name="opt.name" :label="opt.label" />
          </template>
        </q-tabs>
      </div>

      <div class="col-auto bg-yellow">
        <q-tab-panels
          v-model="tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            v-for="(panel, n) in optionTabs"
            :key="n"
            :name="panel.name"
            class="full-height q-pa-none"
          >
            <component
              :is="cekPanel()"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue'

const tab = ref('rs')
const optionTabs = ref([
  { name: 'umum', label: 'Umum', compo: shallowRef(defineAsyncComponent(() => import('./comp/UmumPage.vue'))) },
  { name: 'karyawan', label: 'Karyawan', compo: shallowRef(defineAsyncComponent(() => import('./comp/KaryawanPage.vue'))) },
  { name: 'rs', label: 'Rumah Sakit Lain', compo: shallowRef(defineAsyncComponent(() => import('./comp/RumahSakitPage.vue'))) }
])
// eslint-disable-next-line no-unused-vars
const cekPanel = () => {
  const val = tab.value
  const ganti = val.replace(/ /g, '')
  const arr = optionTabs.value?.find(a => a.name === ganti)
  return arr?.compo ?? ''
}

const apps = useAplikasiStore()
const depoRet = ['Gd-04010102', 'Gd-02010104', 'Gd-05010101']
const bisa = ref(false)
onMounted(() => {
  const depos = apps.depos.filter(a => depoRet.includes(a.value))
  const depo = depos.filter(a => a.value === apps?.user?.kdruangansim)

  if (depo.length) bisa.value = true
  else notifErrVue('Tidak boleh melakukan Penjualan bebas')
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  const depoRet = ['Gd-04010102', 'Gd-02010104', 'Gd-05010101']
  const depos = apps.depos.filter(a => depoRet.includes(a.value))
  const depo = depos.filter(a => a.value === obj)
  console.log('depos', depos)
  if (depo.length) bisa.value = true
  else {
    bisa.value = false
    notifErrVue('Tidak boleh melakukan Penjualan bebas')
  }
})
</script>
