// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

export default function useRightPanel (pasien) {
  // const pengunjung = usePengunjungRanapStore()

  const params = reactive({
    usia: 0,
    rr: 0,
    nadi: 0,
    tensi: 0,
    suhu: 0
  })

  onMounted(() => {
    // getData()
  })

  return {
    params
  }
}
