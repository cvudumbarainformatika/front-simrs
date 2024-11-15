import { computed, onMounted, reactive } from 'vue'

export default function useResume (pasien) {
  const data = reactive({
    usiaTh: 0,
    anamnesis_igd: [],
    pemeriksaan_igd: [],
    anamnesis: [],
    pemeriksaan: [],
    laborats: [],
    diagnosis: []
  })

  const usiaTh = computed(() => {
    const ageInMonth = calculateAgeInMonths(pasien?.tgllahir ?? null)
    const usia = Math.floor(ageInMonth / 12)
    return usia
  })

  function calculateAgeInMonths (birthdate, day) {
    if (!birthdate) return 0 // !birthdate return null
    const today = day ?? new Date()
    const birthdateObj = new Date(birthdate)

    // Menghitung jumlah bulan antara tanggal lahir dan tanggal saat ini
    const months = today.getFullYear() * 12 + today.getMonth() -
          birthdateObj.getFullYear() * 12 - birthdateObj.getMonth()
    return months
  }

  function cariAnamnesisIgd (pasien) {
    let xx = []
    const anamnesis = pasien?.anamnesis
    if (anamnesis?.length > 0) {
      xx = anamnesis?.filter(el => el?.kdruang === 'POL014' || el?.kdruang === '') ?? []
    }

    data.anamnesis_igd = xx
  }
  function cariPemeriksaanIgd (pasien) {
    let xx = []
    const pemeriksaan = pasien?.pemeriksaan
    if (pemeriksaan?.length > 0) {
      xx = pemeriksaan?.filter(el => el?.kdruang === 'POL014' || el?.kdruang === '') ?? []
    }

    data.pemeriksaan_igd = xx
  }

  function cariAnamnesis (pasien) {
    let xx = []
    const anamnesis = pasien?.anamnesis
    if (anamnesis?.length > 0) {
      xx = anamnesis?.filter(el => el?.kdruang !== 'POL014' || el?.awal === '1') ?? []
    }

    data.anamnesis = xx
  }

  function cariPemeriksaan (pasien) {
    let xx = []
    const pemeriksaan = pasien?.pemeriksaan
    if (pemeriksaan?.length > 0) {
      xx = pemeriksaan?.filter(el => el?.kdruang !== 'POL014') ?? []
    }

    data.pemeriksaan = xx
  }

  function cariLaborats (pasien) {
    let lab = []
    const headx = pasien?.laborats
    if (headx?.length) {
      const det = headx?.map(x => x.details)?.flat()
      lab = det
    }
    data.laborats = lab
  }
  function cariDiagnosis (pasien) {
    let diag = []
    const headx = pasien?.diagnosamedis
    if (headx?.length) {
      const det = headx?.map(x => {
        return {
          tipe: x?.rs4,
          kode: x?.rs3,
          name: x?.masterdiagnosa?.rs3,
          ruang: x?.rs13
        }
      })?.filter(y => y.ruang !== 'POL014')
      diag = det
    }
    data.diagnosis = diag
  }

  onMounted(() => {
    cariAnamnesisIgd(pasien)
    cariPemeriksaanIgd(pasien)
    cariAnamnesis(pasien)
    cariPemeriksaan(pasien)
    cariLaborats(pasien)
    cariDiagnosis(pasien)
  })

  return {
    data, usiaTh
  }
}
