<template>
  <q-btn-dropdown :disable="disabled" class="glossy" color="dark" :label="`Sistem Bayar : ${sistemBayar?.nama}`">
    <q-list flat square separator>
      <q-item
        :class="sistemBayar === item ? 'bg-yellow-3' : ''"
        v-for="item in sisByr" :key="item" clickable v-close-popup
        @click="onChangeSistemBayar(item)"
      >
        <q-item-section>
          <q-item-label>{{ item?.nama }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { computed, onMounted, ref, watchEffect } from 'vue'

const app = useAplikasiStore()
const store = usePermintaanEResepStore()

const sistemBayar = ref(null)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isReset: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  // console.log('pasien', props?.pasien)
  // const pasienSistembayar = props.pasien?.kodesistembayar ?? null
  // const pasienGroupSistembayar = props.pasien?.groups ?? null
  // console.log('pasien kode sistem bayar', pasienSistembayar)
  // console.log('pasien group sistem bayar', pasienGroupSistembayar)
  sistemBayar.value = sisByr.value[0]
  // console.log('ok computed', sisByr.value)
})

const sisByr = computed(() => {
  const pasienSistembayar = props.pasien?.kodesistembayar ?? null
  // const pasienGroupSistembayar = props.pasien?.groups ?? null

  const masterSistemBayar = app.sistemBayars
  const ocb = masterSistemBayar?.filter(x => (x?.nama.includes('UMUM') || x?.kode === pasienSistembayar) && !x?.nama?.includes('COVID'))
  // const a = masterSistemBayar?.find(x => x?.kode === pasienSistembayar && x?.groups === pasienGroupSistembayar)
  // const b = masterSistemBayar?.find(x => x?.kode === 'UMUM' && x?.groups === '2')

  return ocb
})

// const sisByrSekara

const onChangeSistemBayar = (item) => {
  sistemBayar.value = item
}

watchEffect(() => {
  store.setForm('groupsistembayarlain', sistemBayar?.value?.groups)
  store.setForm('sistembayarlain', sistemBayar?.value?.kode)

  if (props.isReset) {
    sistemBayar.value = sisByr.value[0]
  }

  // console.log('watch effect store', store.form)
})
</script>
