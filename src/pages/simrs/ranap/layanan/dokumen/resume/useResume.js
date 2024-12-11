// import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
import { useDischargePlanningRanapStore } from 'src/stores/simrs/ranap/dischargeplanning'
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
// import { usePasienPulangRanapStore } from 'src/stores/simrs/ranap/pulang'
import { computed, onMounted, reactive } from 'vue'

export default function useResume (pasien) {
  // const triage = useTriageIgd()

  const data = reactive({
    usiaTh: 0,
    anamnesis_igd: [],
    pemeriksaan_igd: [],
    anamnesis: [],
    pemeriksaan: [],
    laborats: [],
    diagnosis: [],
    cppt: [],
    triageIgd: null,

    // master
    masterTingkatKesadaran: []
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
      xx = anamnesis?.filter(el => el?.kdruang !== 'POL014' && el?.awal === '1') ?? []
    }

    data.anamnesis = xx
  }

  function cariPemeriksaan (pasien) {
    let xx = []
    const pemeriksaan = pasien?.pemeriksaan
    if (pemeriksaan?.length > 0) {
      xx = pemeriksaan?.filter(el => el?.kdruang !== 'POL014' && el?.awal === '1') ?? []
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
    const headx = pasien?.diagnosamedis?.length ? pasien?.diagnosamedis?.filter(x => x?.kdruang !== 'POL014') : []
    if (headx?.length) {
      const det = headx?.map(x => {
        return {
          tipe: x?.rs4,
          kode: x?.rs3,
          nama: x?.masterdiagnosa?.rs3,
          name: x?.masterdiagnosa?.rs4,
          ruang: x?.rs13
        }
      })
      diag = det
    }
    data.diagnosis = diag
  }

  function cariResep (pasien) {
    let resep = []
    const headx = pasien?.newapotekrajal
    if (headx?.length) {
      const det = headx?.map(x => x.permintaanresep)?.flat()
      resep = det
    }
    const f = resep.length ? resep?.map(x => x.mobat?.nama_obat) : []
    data.resep = Array.from(new Set(f))
    // console.log('resep', f)
  }
  function cariCppt (pasien) {
    const cpptPerawat = pasien?.cppt?.filter(x => x?.nakes === '2') ?? []
    const sorting = cpptPerawat?.sort((a, b) => a?.id - b?.id) ?? []
    data.cppt = sorting
    // console.log('data cppt', data.cppt)
  }
  function cariTriageIgd (pasien) {
    const triage = pasien?.triageIgd?.length ? pasien?.triageIgd[0] : null
    data.triageIgd = triage
    // console.log('data cppt', data.cppt)
  }

  onMounted(() => {
    // triage?.getDataTriage(pasien.noreg)
    //   .then(() => {
    //     console.log('triage', triage.items)
    //   })

    cariAnamnesisIgd(pasien)
    cariPemeriksaanIgd(pasien)
    cariAnamnesis(pasien)
    cariPemeriksaan(pasien)
    cariLaborats(pasien)
    cariDiagnosis(pasien)
    cariResep(pasien)
    cariCppt(pasien)
    cariTriageIgd(pasien)

    const storePemeriksaan = usePemeriksaanUmumRanapStore()
    data.masterTingkatKesadaran = storePemeriksaan?.optionsTingkatkesadaran
  })

  const resume = computed(() => {
    const diag = useDiagnosaStore()
    const diagnosa = diag.listDiagnosa

    const prog = useDischargePlanningRanapStore()
    const prognosis = prog.prognosis
    const res = [
      {
        title: 'ALASAN PASIEN DIRAWAT IGD',
        type: '1', // 1 = html, 2 = belum
        isian: data.anamnesis_igd.length ? data.anamnesis_igd[0]?.keluhanUtama : ''
      },
      {
        title: 'ANAMNESE AWAL IGD',
        type: '1',
        isian: data.anamnesis_igd.length
          ? `  <div> - Riwayat Penyakit Sekarang : ${data?.anamnesis_igd[0]?.riwayatpenyakitsekarang} </div>
                  <div> - Riwayat Penyakit Dahulu : ${data?.anamnesis_igd[0]?.riwayatpenyakit} </div>
                  <div> - Riwayat Pengobatan : ${data?.anamnesis_igd[0]?.riwayatpengobatan} </div>
                  <div> - Riwayat Penyakit Keluarga : ${data?.anamnesis_igd[0]?.riwayatpenyakitkeluarga} </div>
                  <div> - Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya : ${data?.anamnesis_igd[0]?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya} </div>
                  <div> - Riwayat Alergi : ${data?.anamnesis_igd[0]?.riwayatalergi ?? '-'} </div>
                  <div> - Keterangan Alergi  : ${data?.anamnesis_igd[0]?.keteranganalergi} </div>`
          : ''
      },
      {
        title: 'PEMERIKSAAN FISIK IGD',
        type: '1',
        isian: data?.pemeriksaan_igd.length
          ? ` <div> - Bagian Kepala : ${data?.pemeriksaan_igd[0]?.rs5 ?? ''} . </div>
              <div> - Bagian Leher : ${data?.pemeriksaan_igd[0]?.rs6 ?? ''}.</div>
              <div> - Bagian Dada : ${data?.pemeriksaan_igd[0]?.rs7 ?? ''}</div>
              <div> - Bagian Punggung : ${data?.pemeriksaan_igd[0]?.rs8 ?? ''}</div>
              <div> - Bagian Perut : ${data?.pemeriksaan_igd[0]?.rs9 ?? ''}</div>
              <div> - Tangan : ${data?.pemeriksaan_igd[0]?.rs10 ?? ''}</div>
              <div> - Kaki : ${data?.pemeriksaan_igd[0]?.rs11 ?? ''}</div>
              <div> - Status Neurologis : ${data?.pemeriksaan_igd[0]?.rs12 ?? ''}</div>
              <div> - Genital : ${data?.pemeriksaan_igd[0]?.rs13 ?? ''}</div>
              <div> - Pernapasan  : ${data?.triageIgd?.pernapasanx ?? ''}  x/mnt | - Nadi : ${data?.triageIgd?.nadi}  x/mnt </div>
              <div> - Sis / Dias  : ${data?.triageIgd?.sistole ?? ''}  / ${data?.triageIgd?.diastole}  mmHg </div>
              <div> - Spo2  : ${data?.triageIgd?.spo2 ?? ''}  % </div>
              <div> - BB  : ${data?.triageIgd?.bb ?? ''}  kg | - TB : ${data?.triageIgd?.tb}  cm </div>
              `
          : ''
      },

      // <div> - Sax : ${data?.pemeriksaan_igd[0]?.sax ? data?.pemeriksaan_igd[0]?.sax + ' Celcius' : ''} | - Srec : ${data?.pemeriksaan_igd[0]?.srec ? data?.pemeriksaan_igd[0]?.srec + ' Celcius' : ''}</div>
      //         <div> - Pernapasan  : ${data?.pemeriksaan_igd[0]?.pernapasanigd}  /mnt | - Nadi : ${data?.pemeriksaan_igd[0]?.nadiigd}  x/mnt </div>
      //         <div> - Tensi  : ${data?.pemeriksaan_igd[0]?.tensiigd}  mmHg | - BB : ${data?.pemeriksaan_igd[0]?.beratbadan}  Kg </div>
      //         <div> - Tinggi Badan  : ${data?.pemeriksaan_igd[0]?.tinggibadan}  Cm </div>
      { // 4
        title: 'ANAMNESE RAWAT INAP',
        type: '1',
        isian: data?.anamnesis.length
          ? ` 
            <div> - Keluhan Utama : ${data?.anamnesis[0]?.keluhanUtama} </div>
            <div> - Riwayat Penyakit Sekarang : ${data?.anamnesis[0]?.riwayatpenyakitsekarang} </div>
            <div> - Riwayat Penyakit Dahulu : ${data?.anamnesis[0]?.riwayatpenyakit} </div>
            <div> - Riwayat Pengobatan : ${data?.anamnesis[0]?.riwayatpengobatan} </div>
            <div> - Riwayat Penyakit Keluarga : ${data?.anamnesis[0]?.riwayatpenyakitkeluarga} </div>
            <div> - Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya : ${data?.anamnesis[0].riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya} </div>
          `
          : ''
      },
      { // 5
        title: 'PEMERIKSAAN FISIK RAWAT INAP',
        type: '1',
        isian: data?.pemeriksaan?.length
          ? ` 
            <div> - Keadaan Umum : ${data?.pemeriksaan[0]?.keadaanUmum ?? ''} </div>
            <div> - Tingkat Kesadaran : ${data?.masterTingkatKesadaran?.find((item) => item.value === data?.pemeriksaan[0]?.tkKesadaran)?.label} </div>
            <div> - BB : ${data?.pemeriksaan[0]?.bb} kg | TB : ${data?.pemeriksaan[0]?.tb} cm </div>
            <div> - Suhu : ${data?.pemeriksaan[0]?.suhu} Celcius | Pernapasan : ${data?.pemeriksaan[0]?.pernapasan} x/mnt  | SPo2 : ${data?.pemeriksaan[0]?.spo} % </div>
            <div> - Nadi  : ${data?.pemeriksaan[0]?.nadi ?? ''} x/mnt  |  Sis / Dias : ${data?.pemeriksaan[0]?.sistole} / ${data?.pemeriksaan[0]?.diastole} mmHg</div>


            <div> - Bagian Kepala : ${data?.pemeriksaan[0]?.rs5 ?? ''} . </div>
            <div> - Bagian Leher : ${data?.pemeriksaan[0]?.rs6 ?? ''}.</div>
            <div> - Bagian Dada : ${data?.pemeriksaan[0]?.rs7 ?? ''}</div>
            <div> - Bagian Punggung : ${data?.pemeriksaan[0]?.rs8 ?? ''}</div>
            <div> - Bagian Perut : ${data?.pemeriksaan[0]?.rs9 ?? ''}</div>
            <div> - Tangan : ${data?.pemeriksaan[0]?.rs10 ?? ''}</div>
            <div> - Kaki : ${data?.pemeriksaan[0]?.rs11 ?? ''}</div>
            <div> - Status Neurologis : ${data?.pemeriksaan[0]?.rs12 ?? ''}</div>
            <div> - Genital : ${data?.pemeriksaan[0]?.rs13 ?? ''}</div>
          `
          : ''
      },
      { // 6
        title: 'PEMERIKSAAN PENUNJANG',
        type: 'penunjang',
        isian: [
          {
            name: 'lab',
            label: 'LABORAT',
            data: data?.laborats.length
              ? data?.laborats.map(lab => {
                const tampil = (lab?.rs27 !== null && lab?.rs27 !== 'N' && lab?.rs21 !== '')
                if (tampil) {
                  // return {
                  //   nama: lab?.pemeriksaanlab?.rs2,
                  //   hasil: lab?.rs21 + ' (' + lab?.rs27 + ')'
                  // }
                  return `${lab?.pemeriksaanlab?.rs2} : ${lab?.rs21} <b>(${lab?.rs27})</b>,  &nbsp;`
                }
                return null
              })
              : []
          },
          {
            name: 'rad',
            label: 'RADIOLOGI',
            data: pasien?.hasilradiologi?.length
              ? pasien?.hasilradiologi?.map(rad => {
                return `${rad?.rs3},  &nbsp;`
              })
              : []
          }
        ]

      },
      { // 7
        title: 'DIAGNOSIS',
        type: 'penunjang',
        isian: [
          {
            name: 'diag1',
            label: 'DIAGNOSIS DPJP',
            data: pasien?.memodiagnosa
              ? [`${pasien?.memodiagnosa ?? '-'},  &nbsp;`]
              : []
          },
          {
            name: 'diag2',
            label: 'DIAGNOSIS Primer',
            data: data?.diagnosis?.length ? data?.diagnosis?.filter(x => x.tipe === 'Primer').map(rad => `${rad?.name},  &nbsp;`) : []
          },
          {
            name: 'diag3',
            label: 'DIAGNOSIS Sekunder',
            data: data?.diagnosis?.length ? data?.diagnosis?.filter(x => x.tipe === 'Sekunder').map(rad => `${rad?.name},  &nbsp;`) : []
          }
        ]

      },
      { // 8
        title: 'PENGOBATAN',
        type: '1Array', // 1 = html, 2 = belum
        isian: data.resep?.length ? data?.resep?.map(resep => `${resep},  &nbsp;`) : []
      },
      { // 9
        title: 'TINDAKAN',
        type: 'penunjang',
        isian: [
          {
            name: 'operatif',
            label: 'OPERATIF',
            data: pasien?.procedure?.length
              ? pasien?.procedure?.filter(x => x?.jenisicd === 'Operatif').map(x => {
                return `${x?.prosedur} (${x?.kd_prosedur}) | ,  &nbsp;`
              })
              : []
          },
          {
            name: 'nonoperatif',
            label: 'NON OPERATIF',
            data: pasien?.procedure?.length
              ? pasien?.procedure?.filter(x => x?.jenisicd === 'Non Operatif').map(x => {
                return `${x?.prosedur} (${x?.kd_prosedur}) | ,  &nbsp;`
              })
              : []
          },
          {
            name: 'ket',
            label: 'Keterangan',
            data: pasien?.keterangantindakan?.length
              ? pasien?.keterangantindakan?.map(x => {
                return `${x?.keterangan} | ,  &nbsp;`
              })
              : []
          }

        ]

      },
      { // 10
        title: 'KEADAAN WAKTU KRS',
        type: '1', // 1 = html, 2 = belum
        // isian: pasien?.dischargeplanning.length
        //   ? `${pasien?.dischargeplanning[pasien?.dischargeplanning.length - 1]?.rs4} - ${pasien?.dischargeplanning[pasien?.dischargeplanning.length - 1]?.rs5}`
        //   : ''
        isian: data?.cppt?.length
          ? `
            <div> - ${data?.cppt[data?.cppt.length - 1]?.anamnesis?.keluhanUtama ?? '-'}</div>
            <div> - Nadi : ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.nadi ?? '-'} |
            RR : ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.pernapasan ?? '-'} |
            Sis/Dias : ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.sistole ?? '-'} / ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.diastole ?? '-'} |
            Spo2 : ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.spo ?? '-'} |
            Suhu : ${data?.cppt[data?.cppt.length - 1]?.pemeriksaan?.suhu ?? '-'} | ${data?.cppt[data?.cppt.length - 1]?.o_sambung ?? '-'}</div>
            </div>
            <div> - ${data?.cppt[data?.cppt.length - 1]?.instruksi ?? '-'}</div>
          `
          : ''
      },
      { // 11
        title: 'PROGNOSIS',
        type: '1', // 1 = html, 2 = belum
        isian: (pasien?.prognosis !== '' || pasien?.prognosis !== null)
          ? `${prognosis?.find(x => x?.rs1 === pasien?.prognosis)?.rs2 ?? ''} `
          : ''
      },
      { // 12
        title: 'SEBAB KEMATIAN',
        type: '1', // 1 = html, 2 = belum
        isian: (pasien?.sebabkematian !== '' && pasien?.sebabkematian !== null)
          ? `${diagnosa?.find(x => x?.kode === pasien?.sebabkematian)?.keterangan ?? ''} } `
          : null
      },
      { // 13
        title: 'TINDAK LANJUT',
        type: '1', // 1 = html, 2 = belum
        isian: (pasien?.tindaklanjut !== '' && pasien?.tindaklanjut !== null)
          ? `${pasien?.tindaklanjut} `
          : ''
        // isian: pasien?.dischargeplanning.length
        //   // ? `${pasien?.dischargeplanning[pasien?.dischargeplanning.length - 1]?.rs4} - ${pasien?.dischargeplanning[pasien?.dischargeplanning.length - 1]?.rs5}`
        //   ? `${pasien?.dischargeplanning[pasien?.dischargeplanning.length - 1]?.rs4}`
        //   : ''
      }

    ]

    // console.log('resume', res, data)
    // console.log('prognosis', prognosis)
    if (pasien?.prognosis !== '9') { // MALAM / Meninggal
      return res?.filter(x => x?.title !== 'SEBAB KEMATIAN')
    }
    else {
      return res
    }
  })

  return {
    data, usiaTh, resume
  }
}
