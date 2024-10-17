// import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'

export default function useRightPanel (pasien) {
  const store = useAnamnesisRanapStore()
  // const pengunjung = usePengunjungRanapStore()
  const auth = useAplikasiStore()

  const settings = reactive({
    splitMin: 50,
    hoverred: false
  })

  const nakes = reactive({
    dokter: !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1),
    perawat: !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2)

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
    nakes.dokter = !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1)
    nakes.perawat = !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2)

    // console.log('nakes', nakes)

    // getData(pasien)
  })

  // const getData = (pasien) => {
  //   store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis, pasien)
  //   // console.log('anamnesis', store.items)
  // }

  watch(() => pasien.anamnesis, (val) => {
    console.log('watch', val)
    store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis, pasien)
  }, { deep: true })

  watchEffect(() => {
    console.log('watchEffect pasien', pasien)
    // store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis, pasien)
  })

  return {
    store, settings, fields, nakes
  }
}
