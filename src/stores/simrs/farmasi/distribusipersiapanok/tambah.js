import { defineStore } from 'pinia'

import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { ref } from 'vue'
import { useDistribusiPersiapanOperasiStore } from './distribusi'
export const useTambahObatDistribusiPersiapanOperasiStore = defineStore('tambah_obat_distribusi_persiapan_operasi', () => {
  const isOpen = ref(false)
  const loading = ref(false)
  const loadingObat = ref(false)
  const loadingPegawai = ref(false)
  const groups = ref('')
  const namaObat = ref('')
  const Obats = ref([])
  const pegawaies = ref([])
  const nonFilteredObat = ref([])
  const form = ref({})

  function setForm (key, val) {
    form.value[key] = val
  }
  function cariObat (val) {
    const param = {
      groups: groups.value,
      kdruang: 'Gd-04010103',
      q: val
    }
    console.log('obat', val, groups.value, param)
    loadingObat.value = true
    const params = { params: param }
    return new Promise(resolve => {
      api.get('v1/simrs/penunjang/farmasinew/obatoperasi/get-obat-persiapan', params)
        .then(resp => {
          loadingObat.value = false
          nonFilteredObat.value = resp.data?.dataobat
          Obats.value = val?.length ? nonFilteredObat.value.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase())) : nonFilteredObat.value
          // console.log('hasil', nonFilteredObat.value, Obats.value)

          resolve(resp)
        })
        .catch(() => {
          loadingObat.value = false
          Obats.value = []
        })
    })
    // }
  }
  function getPegawai (val) {
    loadingPegawai.value = true
    const param = {
      q: val
    }
    const params = { params: param }
    return new Promise(resolve => {
      api.get('v1/tandatangan/get-pegawai', params)
        .then(resp => {
          loadingPegawai.value = false
          pegawaies.value = resp?.data
          resolve(resp)
        })
        .catch(() => {
          loadingPegawai.value = false
        })
    })
  }
  function simpanDistribusi () {
    loading.value = true
    return new Promise(resolve => {
      api.post('v1/simrs/penunjang/farmasinew/obatoperasi/tambah-distribusi', form.value)
        .then(resp => {
          loading.value = false
          notifSuccess(resp)
          const dist = useDistribusiPersiapanOperasiStore()
          const item = dist.items.find(a => a.nopermintaan === form.value.nopermintaan)
          if (item) {
            const rin = resp?.data?.rinci
            const index = item.rinci.findIndex(b => b.kd_obat === rin.kd_obat)
            if (index >= 0) item.rinci[index] = rin
            else item.rinci.push(rin)
          }
          cariObat('')
          isOpen.value = false
          form.value = {}
          resolve(resp)
        })
        .catch(() => {
          loading.value = false
          isOpen.value = false
          form.value = {}
        })
    })
  }
  return {
    isOpen,
    cariObat,
    Obats,
    groups,
    namaObat,
    form,
    setForm,
    nonFilteredObat,
    pegawaies,
    getPegawai,
    loadingPegawai,
    simpanDistribusi,
    loading,
    loadingObat
  }
})
