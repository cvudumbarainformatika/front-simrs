<template>
  <div class="fit bg-dark">
    <q-splitter
      v-model="splitterModel"
      :limits="[0, 100]"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      class="fit"
    >
      <template #before>
        <div class="column fit">
          <div class="col full-height scroll">
            <q-tabs
              v-model="menuTab"
              vertical
              class="bo text-white"
              active-color="yellow"
              no-caps
              align="left"
              inline-label
              dense
            >
              <q-tab
                dark v-for="menu in menus" :key="menu.name" :name="menu?.name"
                style="justify-content: left; padding-left: 10px; font-size: 12xpx !important;" content-class="f-12"
              >
                <div class="f-12">
                  {{ menu?.label }}
                </div>
              </q-tab>
            </q-tabs>
          </div>
        </div>
      </template>

      <template #after>
        <div class="column fit">
          <div class="col fit">
            <q-tab-panels
              v-model="menuTab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              class="fit"
            >
              <q-tab-panel v-for="menu in menus" :key="menu.name" :name="menu?.name" class="fit q-pa-none">
                <div class="fit">
                  <div v-if="store?.igdBefore === null" class="column full-height flex-center">
                    Tidak Ada Data IGD Sebelumnya <br>
                    Pasien Bukan Dari IGD
                  </div>
                  <div v-else class="full-height">
                    <!-- <ListTriage :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd" :bisa-edit-hapus="false" /> -->
                    <component :is="menu?.comp" :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd" :bisa-edit-hapus="false" />
                  </div>
                  <!-- <component :is="menu?.comp" /> -->
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
const store = useHistoryPasienRanapStore()
const menuTab = ref('triage')

const splitterModel = ref(20)

const menus = ref([
  {
    name: 'triage',
    label: 'Triage',
    icon: 'icon-my-file_sign',
    // comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/IndexPage.vue')))
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/triage/comptriage/ListTriage.vue')))
  },
  {
    name: 'anamnesis',
    label: 'Anamnesis',
    icon: 'icon-my-file_sign',
    // comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/AnamnesisPage.vue')))
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/anamnesis/comanamnesis/ListAnamnesis.vue')))
  },
  {
    name: 'pemeriksaanfisik',
    label: 'Pemeriksaan Fisik',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/pemeriksaanfisik/compemeriksaanfisik/ListPemeriksaanFisik.vue')))
  },
  {
    name: 'diagnosa',
    label: 'Diagnosa',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/assesment/diagnosa/comp/DiagnosaTable.vue')))
  },
  {
    name: 'tindakan',
    label: 'Tindakan',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/ListTindakan.vue')))
  },
  {
    name: 'laborat',
    label: 'Laborat',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/LaboratPage.vue')))
  },
  {
    name: 'radiologi',
    label: 'Radiologi',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/RadiologiPage.vue')))
  },
  {
    name: 'farmasi',
    label: 'Pengobatan',
    icon: 'icon-my-file_sign',
    comp: shallowRef(defineAsyncComponent(() => import('./compIgdSebelumnya/PengobatanPage.vue')))
  }

])

onMounted(() => {
  menuTab.value = menus.value[0].name
})

</script>
