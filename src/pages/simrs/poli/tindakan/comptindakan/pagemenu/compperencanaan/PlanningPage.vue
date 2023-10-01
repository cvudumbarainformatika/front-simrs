<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Planning Pasien</div>
        </q-bar>
        <div class="q-pa-sm row items-center q-gutter-sm ">
          <q-option-group
            v-model="store.plann"
            :options="masterPlann"
            color="white"
            inline
            dark
          />
        </div>
      </div>
      <div class="col full-height">
        <!-- <q-scroll-area style="height:calc(100% - 1px)"> -->
        <div
          v-if="store.plann !== ''"
          class="q-pa-md"
        >
          Form {{ store.plann }}
          <q-separator class="q-my-sm" />
          <div>
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
            />
          </div>
        </div>
        <div
          v-else
          class="q-pa-md"
        >
          Belum Ada Pemilihan Planning Pasien
        </div>
        <!-- </q-scroll-area> -->
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePerencanaanPoliStore()

const masterPlann = computed(() => {
  const arr = store?.plannings
  const plans = arr?.length
    ? arr.map(x => {
      const obj = {
        label: x?.keterangan,
        value: x?.planing
      }
      return obj
    }) : []
  return plans
})

const cekPanel = () => {
  const val = store.plann
  const ganti = val.replace(/ /g, '')
  const modules = import.meta.glob('./formperencanaan/*.vue', { eager: true })
  const arr2 = Object.keys(modules)
  const filterred = arr2.find(key => key.includes(ganti))
  return defineAsyncComponent(() => import(filterred))
  // console.log(filterred)
  // return filterred
}
</script>
