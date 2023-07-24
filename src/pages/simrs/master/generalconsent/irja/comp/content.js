import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'
import { onMounted, ref } from 'vue'

export function useContent() {
  const items = ref([])
  const pasien = ref({})
  const petugas = ref({})
  const isi = ref('What you see is <b>what</b> you get.')
  const defaultForm = ref('..........................')

  async function changeIsi(kelompok) {
    const params = {
      kelompok,
      pernyataan: isi.value
    }
    await api.post('v1/simrs/pendaftaran/generalconscent/simpanmaster', params)
      .then(resp => {
        console.log(resp)
        notifSuccessVue('Data Sukses tersimpan')
      })
  }

  async function getDataIrja() {
    const params = {
      params: {
        kelompok: 'irja'
      }
    }

    await api.get('/v1/simrs/pendaftaran/generalconscent/mastergeneralconsent', params)
      .then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          isi.value = resp.data[0].pernyataan
        }
      })
  }

  onMounted(() => {
    getDataIrja()
  })
  return {
    items,
    pasien,
    petugas,
    isi,
    defaultForm,
    changeIsi
  }
}
