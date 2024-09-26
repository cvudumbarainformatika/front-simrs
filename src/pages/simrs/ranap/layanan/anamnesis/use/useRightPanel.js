import { api } from 'src/boot/axios'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  const data = useAnamnesisRanapStore()
  const pengunjung = usePengunjungRanapStore()

  onMounted(() => {
    console.log('did mount', pengunjung.pasiens)
    setPasien()
    getData()
  })

  const setPasien = () => {
    const findPasien = pengunjung?.pasiens.filter(x => x?.noreg === pasien?.noreg)
    console.log('find', findPasien)

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
    const resp = await api.get('v1/simrs/ranap/layanan/anamnesis/list', params)
    console.log('resp', resp)
    if (resp.status === 200) {
      data.items = resp.data
    }
  }

  return {
    data
  }
}
