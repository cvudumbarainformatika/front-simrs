<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
    dark
  >
    <div class="col-auto">
      <q-bar class="bg-black text-white">
        <div class="f-12 q-pa-xs">
          InaCBG (Preview)
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="row q-px-sm q-py-xs justify-between">
        <div>code</div>
        <div class="text-orange text-weight-bold">
          {{ ina.kodeIna }}
        </div>
      </div>
      <q-separator dark />
      <div class="row items-center q-px-sm q-py-xs justify-between">
        <div class="f-10">
          Tarif Ina
        </div>
        <div class="text-orange text-weight-bold">
          {{ formatRp(ina.tarifIna) }}
        </div>
      </div>
      <q-separator dark />
      <div class="row items-center q-px-sm q-py-xs justify-between">
        <div class="f-10">
          Tarif RS
        </div>
        <div class="text-orange text-weight-bold">
          {{ formatRp(ina.tarifRs) }}
        </div>
      </div>
      <q-separator dark />
      <div
        style="height: 35px;"
        class="column flex-center text-white"
        :class="minus ? 'bg-negative' : 'bg-primary'"
      >
        <div class="f-14 text-weight-bold">
          {{ formatRp(hitungSelisih()) }}
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { formatRp } from 'src/modules/formatter'
import { useInacbgIgd } from 'src/stores/simrs/igd/inacbg'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { computed, watch } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = useLayananPoli()
const ina = useInacbgIgd()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
// const totalPemeriksaan = computed(() => {
//   const arr = props?.pasien?.tindakan
//   return arr.length ? arr.reduce((acc, cur) => acc + cur.subtotal, 0) : 0
// })

function hitungSelisih() {
  return ina.tarifIna - ina.tarifRs
}
// eslint-disable-next-line no-unused-vars
const minus = computed(() => {
  return ina.tarifIna - ina.tarifRs < 0
})

watch(() => ina.tarifIna, (obj) => {
  // console.log('watch tarifIna', obj)
  hitungSelisih()
}, { deep: true })
watch(() => props.pasien?.tindakan, (obj) => {
  // console.log('watch tindakan', obj)
  // ina.setTotalTindakan(props.pasien)
}, { deep: true })
watch(() => props.pasien?.laborats, (obj) => {
  // console.log('watch laborat', obj)
  // ina.setTotalLaborat(props.pasien)
}, { deep: true })
</script>
