import { onMounted, reactive } from 'vue'

export default function useCppt (pasien) {
  const data = reactive({
    awal: [],
    cppt: [],
    ews: []
  })

  const other = reactive({
    openEws: false
  })

  onMounted(() => {
    kelompokkanDataAwalKeperawatan(pasien)
    kelompokkanDataAwalMedis(pasien)
    aturCppt(pasien)
    ambilEws(pasien)
  })

  function kelompokkanDataAwalKeperawatan (pasien) {
    const anamnesis = pasien?.anamnesis?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.nakes !== '1') ?? null
    const pemeriksaan = pasien?.pemeriksaan?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.nakes !== '1') ?? null
    const penilaian = pasien?.penilaian?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.group_nakes !== '1') ?? null
    const diagnosakeperawatan = pasien?.diagnosakeperawatan?.filter((a) => a?.kdruang !== 'POL014') ?? []
    const diagnosakebidanan = pasien?.diagnosakebidanan?.filter((a) => a?.kdruang !== 'POL014') ?? []
    const diagnosamedis = []
    const isDokter = false
    const nakes = '2|3'
    const obj = {
      anamnesis,
      pemeriksaan,
      penilaian,
      diagnosakeperawatan,
      diagnosakebidanan,
      diagnosamedis,
      isDokter,
      nakes
    }

    data.awal.push(obj)
  }
  function kelompokkanDataAwalMedis (pasien) {
    const anamnesis = pasien?.anamnesis?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.nakes === '1') ?? null
    const pemeriksaan = pasien?.pemeriksaan?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.nakes === '1') ?? null
    const penilaian = pasien?.penilaian?.find((a) => a?.awal === '1' && a?.kdruang !== 'POL014' && a?.group_nakes === '1') ?? null
    const diagnosakeperawatan = []
    const diagnosakebidanan = []
    const diagnosamedis = pasien?.diagnosamedis?.filter((a) => a?.kdruang !== 'POL014') ?? []
    const isDokter = true
    const nakes = '1'
    const obj = {
      anamnesis,
      pemeriksaan,
      penilaian,
      diagnosakeperawatan,
      diagnosakebidanan,
      diagnosamedis,
      isDokter,
      nakes
    }

    data.awal.push(obj)
  }

  function aturCppt (pasien) {
    const cppt = pasien?.cppt
    data.cppt = cppt?.sort((a, b) => b?.id - a?.id) ?? []
  }

  function ambilEws (pasien) {
    const obj = pasien?.pemeriksaan
    const pemeriksaan = obj?.filter((a) => a?.kdruang !== 'POL014' && a?.nakes !== '1') ?? []
    data.ews = pemeriksaan?.sort((a, b) => a?.id - b?.id) ?? []

    console.log('data', data)
  }

  function toggleEws () {
    other.openEws = !other.openEws
    console.log('openEws', other.openEws)
  }

  return { data, other, toggleEws }
}
