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

  onMounted(async () => {
    // await store.getMaster().then(() => {
    //   getData()
    // })
    getData(pasien)
  })

  const getData = (pasien) => {
    // eslint-disable-next-line no-unused-vars
    // const params = {
    //   params: {
    //     noreg: pasien?.noreg
    //   }
    // }
    // const resp = await api.get('v1/simrs/ranap/layanan/pemeriksaan/penilaian', params)
    // console.log('resp right', resp)
    // if (resp.status === 200) {
    //   // store.items = resp.data
    //   store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    // }

    // store.getData(pasien)
    store.PISAH_DATA_RANAP_IGD(pasien?.penilaian, pasien)
  }

  return {
    store, settings, fields
  }
}
