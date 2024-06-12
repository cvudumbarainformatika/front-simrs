<template>
  <div class="q-pa-sm">
    <div class="">
      <div v-if="depo==='rjl'" class="q-px-xs">
        <div
          v-if="!store.listPemintaanSementara.length && !store.listRacikan.length "
          class="row q-my-xs items-center"
        >
          Tipe Resep:
          <q-option-group
            v-model="store.form.tiperesep"
            :options="store.tipeReseps"
            color="primary"
            class="q-ml-sm"
            size="xs"
            dense
            inline
            @update:model-value="setTipe"
          />
        </div>
        <div
          v-else
          class="row q-my-xs items-center"
        >
          Tipe Resep: {{ store.form.tiperesep.charAt(0).toUpperCase() + store.form.tiperesep.slice(1) }}
        </div>
      </div>

      <div v-if="depo==='ok'">
        <!-- depo Ok -->
        <div>
          <q-btn
            push
            dense
            color="green"
            no-caps
            label="obat permintaan operasi"
            @click="openPersiapanOperasi"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-my-sm" />

    <nyobak-select v-model="store.namaObat" />
  </div>
</template>

<script setup>
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'
import { defineAsyncComponent, onMounted, shallowRef, watchEffect } from 'vue'

const store = usePermintaanEResepStore()
const permintaan = useResepPermintaanOperasiStore()

const NyobakSelect = defineAsyncComponent(() => import('../comp/NyobakSelect.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  depo: {
    type: String,
    default: ''
  }
})

function setPasien () {
  const val = props?.pasien
  console.log('setPasien', val, props?.depo)
  if (!val) return
  const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
  const diag = temp?.length ? temp.join(', ') : '-'

  store.setForm('noreg', val?.noreg)
  store.setForm('norm', val?.norm)
  store.setForm('groupsistembayar', val?.groups)
  store.setForm('sistembayar', val?.kodesistembayar ?? val?.kdsistembayar)
  store.setForm('dokter', val?.kodedokter)
  store.setForm('diagnosa', diag ?? '-')
  store.cariSimulasi(val?.noreg)
  if (props?.depo === 'rjl') store.getBillRajal(val)
  if (props?.depo === 'rnp') store.getBillRanap(val)
  if (props?.depo === 'igd') store.getBillIgd(val)
  if (props?.depo === 'ok') store.getBillOk(val)
  // store.getBillRajal(val)

  if (!!store?.noresep && store?.noresep !== 'BARU') {
    const resep = props?.pasien?.newapotekrajal?.find(val => val.noresep === store?.noresep)
    if (resep) {
      if (resep?.flag === '') {
        store.listPemintaanSementara = []
        store.setForm('noresep', resep?.noresep ?? '-')
        store.setForm('tiperesep', resep?.tiperesep ?? 'normal')
        if (resep?.permintaanresep?.length) store.setListArray(resep?.permintaanresep)
        if (resep?.permintaanracikan?.length) store.setListRacikanArray(resep?.permintaanracikan)

        // store.listPemintaanSementara = resep?.permintaanresep ?? []
        // store.listRacikan = resep?.permintaanracikan ?? []
      }
      else if (resep) {
        if (resep?.flag !== '') store.setListResep(resep)
      }
    }
  }
  store.setNoreseps(props?.pasien?.newapotekrajal)
  // console.log('form nya', store.form)
  if (store?.noresep === 'BARU') {
    store.listRacikan = []
    store.listPemintaanSementara = []
  }
  console.log('pasien obat', props?.pasien?.newapotekrajal)
}

function setTipe (val) {
  console.log('tipe resep', val)
  store.cariObat('')
}

// eslint-disable-next-line no-unused-vars
const persiapan = shallowRef(defineAsyncComponent(() => import('../comp/PersiapanOperasi.vue')))
function openPersiapanOperasi () {
  permintaan.isOpen = true
  permintaan.setPasien(props.pasien)
  // console.log('props pasien', props.pasien)
}

onMounted(() => {
  // console.log('depo', props?.depo, props.pasien)
  // console.log('ref Obat', refObat.value)
  // refObat.value.showPopup()
  store.getSigna()
  store.cariObat()
  // refObat.value.focus()
  // refObat.value.showPopup()
})
watchEffect(() => {
  store.pasien = props?.pasien
  store.depo = props?.depo
  setPasien()
  // console.log('pasi', props.pasien)
})
</script>
