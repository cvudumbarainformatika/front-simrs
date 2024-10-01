import { api } from 'src/boot/axios'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const store = useAnamnesisRanapStore()
  // const pengunjung = usePengunjungRanapStore()

  const settings = reactive({
    splitMin: 50,
    hoverred: false
  })

  const fields = reactive({
    igd: [
      { row: 'keluhanUtama', label: 'Keluhan Utama' },
      { row: 'riwayatpenyakitsekarang', label: 'Riwayat Penyakit Skrg' },
      { row: 'riwayatpenyakit', label: 'Riwayat Penyakit Dhl' },
      { row: 'riwayatpengobatan', label: 'Riwayat Pengobatan' },
      { row: 'riwayatpengobatan', label: 'Riwayat Pengobatan' },
      { row: 'riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya', label: 'Rwyt Pkrjaan yg berhubungan dg zat berbahaya' }
    ]
  })
  onMounted(() => {
    getData()
  })

  const getData = async () => {
    const params = {
      params: {
        noreg: pasien?.noreg
      }
    }
    const resp = await api.get('v1/simrs/ranap/layanan/anamnesis/list', params)
    console.log('resp', resp)
    if (resp.status === 200) {
      store.items = resp.data
      store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    }
  }

  return {
    store, settings, fields
  }
}
