import { useQuasar } from 'quasar'
// import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const store = useDiagnosaStore()
  // const pengunjung = usePengunjungRanapStore()
  const auth = useAplikasiStore()

  const $q = useQuasar()

  const settings = reactive({
    splitMin: 70,
    hoverred: false
  })

  const nakes = reactive({
    dokter: !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1),
    perawat: !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2)

  })

  // const fields = reactive({
  //   igd: []
  // })
  onMounted(() => {
    nakes.dokter = !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1)
    nakes.perawat = !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2)

    // console.log('nakes', nakes)

    getData(pasien)
  })

  const getData = (pasien) => {
    // const params = {
    //   params: {
    //     noreg: pasien?.noreg
    //   }
    // }
    // const resp = await api.get('v1/simrs/ranap/layanan/diagnosa/getDiagnosaByNoreg', params)
    // // console.log('resp', resp)
    // if (resp.status === 200) {
    //   store.items = resp.data
    //   store.PISAH_DATA_RANAP_IGD(resp.data, pasien)
    // }

    store.PISAH_DATA_RANAP_IGD(pasien?.diagnosamedis, pasien)
  }

  const hapusItem = (id) => {
    $q.dialog({
      dark: true,
      title: 'Peringatan',
      message: 'Apakah Data ini akan dihapus?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      // console.log('OK')
      store.deleteDiagnosa(pasien, id)
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  }

  return {
    store,
    settings,
    nakes,
    hapusItem
  }
}
