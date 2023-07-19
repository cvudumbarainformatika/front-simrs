import { onMounted, ref } from 'vue'

export function useContent() {
  const items = ref([])
  const pasien = ref({})
  const petugas = ref({})
  const isi = ref('What you see is <b>what</b> you get.')

  function changeIsi() {
    alert('kirim isi ke database')
  }

  onMounted(() => {
    items.value = [
      { value: 'Saya sudah mendapat informasi tentang <b>hak dan kewajiban </b> pasien dan juga peraturan yang berlaku di RSUD Dr.Mohamad Saleh seperti yang ada didalam lampiran persetujuan umum ini yang diberikan oleh petugas Penerimaan pasien (TPP) dan saya sudah memahaminya, menerimanya dan menyetujuinya.' },
      { value: 'Saya sudah mendapat informasi tentang hak dan kewajiban pasien dan juga peraturan yang berlaku di RSUD Dr.Mohamad Saleh seperti yang ada didalam lampiran persetujuan umum ini yang diberikan oleh petugas Penerimaan pasien (TPP) dan saya sudah memahaminya, menerimanya dan menyetujuinya.' }
    ]
  })
  return {
    items,
    pasien,
    petugas,
    isi,
    changeIsi
  }
}
