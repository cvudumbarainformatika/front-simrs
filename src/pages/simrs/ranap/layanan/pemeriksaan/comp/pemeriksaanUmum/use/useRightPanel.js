import { api } from 'src/boot/axios'
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const store = usePemeriksaanUmumRanapStore()
  // const pengunjung = usePengunjungRanapStore()

  const settings = reactive({
    splitMin: 50,
    hoverred: false
  })

  const fields = reactive({
    igd: [
      { row: 'beratbadan', label: 'Berat Badan (kg)' },
      { row: 'tinggibadan', label: 'Tinggi Badan (cm)' },
      { row: 'tensi', label: 'Tekanan Darah (mmHg)' },
      { row: 'nadiigd', label: 'Nadi (x/menit)' },
      { row: 'pernapasanigd', label: 'Pernapasan (x/menit)' }
    ]
  })

  onMounted(() => {
    // console.log('did mount', pengunjung.pasiens)
    setPasien()
    getData()
  })

  const setPasien = () => {
    // const findPasien = pengunjung?.pasiens.filter(x => x?.noreg === pasien?.noreg)
    // console.log('find', findPasien)

    // this.pasiens[indexPasien] = data
    // // console.log('wew', this.pasiens[indexPasien])
    // if (findPasien.length) {
    //   const datax = findPasien[0]
    //   datax.newapotekrajal = data?.newapotekrajal
    //   datax.diagnosa = data?.diagnosa
    //   // datax.dokter = data?.datasimpeg?.nama
    //   // datax.kodedokter = data?.datasimpeg?.kdpegsimrs
    //   // this.pageLayanan = false
    // }
  }

  const getData = async () => {
    const params = {
      params: {
        noreg: pasien?.noreg
      }
    }
    const resp = await api.get('v1/simrs/ranap/layanan/pemeriksaan/pemeriksaanumum', params)
    console.log('resp right', resp)
    if (resp.status === 200) {
      // store.items = resp.data
      store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    }
  }

  return {
    store, settings, fields
  }
}
