<template>
  <div class="column full-height">
    <div @click="emits('close')" class="close-btn bg-dark text-white cursor-pointer q-pa-xs">
      <div class="vertical-xxx">
        TUTUP
      </div>
    </div>
    <div class="col-auto">
      <q-bar>
        <q-btn
          flat
          rounded
          padding="xs"
          size="xs"
          icon="icon-mat-close"
          @click="emits('close')"
        />
        <q-space />
        <div>History Pasien</div>
      </q-bar>
    </div>
    <div class="col full-height column">
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
        >
          <q-tab
            v-for="(item, i) in tabs"
            :key="i"
            :name="item?.name"
            :label="item?.label"
          />
        </q-tabs>
      </div>
      <div class="col full-height">
        <q-tab-panels v-model="tab" animated class="fit q-pa-none">
          <q-tab-panel v-for="(item, i) in tabs" :key="i" :name="item?.name" class="q-pa-none">
            <app-loader v-if="store?.loading" />
            <component v-else :is="item?.comp" :pasien="store?.pasienIgd" :no-header="true" :key="store?.pasienIgd" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const store = useHistoryPasienRanapStore()
const tabs = ref([
  {
    label: 'IGD Sebelumnya',
    name: 'IGDSebelumnya',
    comp: shallowRef(defineAsyncComponent(() => import('./historypasien/IgdSebelumnyaPage.vue')))
  },
  {
    label: 'Riwayat Lalu',
    name: 'riwayatLalu',
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/complayout/RightDrawer.vue')))
  }
  // {
  //   label: 'Rawat Jalan',
  //   name: 'rawatjalan',
  //   comp: shallowRef(defineAsyncComponent(() => import('./historypasien/RawatJalanPage.vue')))
  // },
  // {
  //   label: 'Rawat Inap',
  //   name: 'rawatinap',
  //   comp: shallowRef(defineAsyncComponent(() => import('./historypasien/RawatInapPage.vue')))
  // }
])

const tab = ref(null)

const emits = defineEmits(['close'])

onMounted(() => {
  tab.value = tabs.value[0].name
})

</script>

<style lang="scss" scoped>

.close-btn {
  width: 25px;
  // height: 64px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: absolute;
  left: -25px;
  z-index: 1;
  top: 50%;
  margin-top: -10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  .vertical-xxx{
    // writing-mode:tb-rl;
    // -webkit-transform:rotate(180deg);
    // -moz-transform:rotate(180deg);
    // -o-transform: rotate(180deg);
    // -ms-transform:rotate(180deg);
    // transform: rotate(180deg);
    // white-space:nowrap;
    writing-mode: vertical-lr;
    text-orientation: upright;
}

}

</style>
