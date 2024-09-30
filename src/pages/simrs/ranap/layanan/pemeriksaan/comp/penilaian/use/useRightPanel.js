// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const store = usePenilaianRanapStore()
  // const pengunjung = usePengunjungRanapStore()

  const settings = reactive({
    splitMin: 50,
    hoverred: false
  })

  const fields = reactive({
    igd: []
  })

  onMounted(() => {
    getData()
  })

  const getData = async () => {
    // eslint-disable-next-line no-unused-vars
    const params = {
      params: {
        noreg: pasien?.noreg
      }
    }
    // const resp = await api.get('v1/simrs/ranap/layanan/pemeriksaan/pemeriksaanumum', params)
    // console.log('resp right', resp)
    // if (resp.status === 200) {
    //   // store.items = resp.data
    //   store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    // }
  }

  return {
    store, settings, fields
  }
}
