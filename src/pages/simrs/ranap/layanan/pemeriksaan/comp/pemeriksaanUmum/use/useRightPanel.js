// import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const store = usePemeriksaanUmumRanapStore()
  // const pengunjung = usePengunjungRanapStore()

  const auth = useAplikasiStore()

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

  const nakes = reactive({
    dokter: !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1),
    perawat: !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2)

  })

  onMounted(() => {
    // console.log('did mount', pengunjung.pasiens)
    getData(pasien)
  })

  const getData = (pasien) => {
    // const params = {
    //   params: {
    //     noreg: pasien?.noreg
    //   }
    // }
    // const resp = await api.get('v1/simrs/ranap/layanan/pemeriksaan/pemeriksaanumum', params)
    // console.log('resp right pemeriksaan', resp)
    // if (resp.status === 200) {
    //   // store.items = resp.data
    //   store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    // }

    // await store.getData(pasien)
    store.PISAH_DATA_RANAP_IGD(pasien?.pemeriksaan, pasien)
  }

  return {
    store, settings, fields, nakes
  }
}
