// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'

export default function useEws (pasien, kasus) {
  // const pengunjung = usePengunjungRanapStore()
  const pemeriksaan = usePemeriksaanUmumRanapStore()
  const skoring = ref()
  onMounted(() => {
    // getData()
    cekEws()
  })

  const cekEws = () => {
    // console.log('cekEws', inp, val)
    // console.log('kasus', kasus, pasien)
    const hml = kasus?.gruping === '4.2'
    const usia = getUsia(pasien?.tgllahir)

    const data = {}
    data.rr = pemeriksaan.form.pernapasan
    data.spo2 = pemeriksaan.form.spo
    data.suhu = pemeriksaan.form.suhu
    data.sistole = pemeriksaan.form.sistole
    data.diastole = pemeriksaan.form.diastole
    data.nadi = pemeriksaan.form.nadi
    data.tk = pemeriksaan.form.tkKesadaran

    let skor = 0
    if (hml) skor = getEwsHamil(data)
    else skor = getEwsUsia(usia, data)
    console.log('cekEws', skor)
    skoring.value = skor
  }

  function getUsia (tglLahir) {
    const ageInMonth = calculateAgeInMonths(tglLahir)

    return ageInMonth
  }

  function calculateAgeInMonths (birthdate, day) {
    if (!birthdate) return 0 // !birthdate return null
    const today = day ?? new Date()
    const birthdateObj = new Date(birthdate)

    // Menghitung jumlah bulan antara tanggal lahir dan tanggal saat ini
    const months = today.getFullYear() * 12 + today.getMonth() -
      birthdateObj.getFullYear() * 12 - birthdateObj.getMonth()
    return months
  }

  const getEwsHamil = (params) => {
    console.log('getEwsHamil', params)
    let skor = 0
    const { rr, spo2, suhu, sistole, diastole, nadi, tk } = params

    if (parseInt(rr) < 12) skor = 3
    else if (parseInt(rr) >= 12 && parseInt(rr) <= 20) skor = 0
    else if (parseInt(rr) >= 21 && parseInt(rr) <= 25) skor = 2
    else if (parseInt(rr) > 25) skor = 3

    if (parseInt(spo2) < 92) skor = 3
    else if (parseInt(spo2) >= 92 && parseInt(spo2) <= 95) skor = 2
    else if (parseInt(spo2) > 95) skor = 0

    if (parseInt(suhu) < 36) skor = 3
    else if (parseInt(suhu) >= 36 && parseInt(suhu) <= 37.4) skor = 0
    else if (parseInt(suhu) > 37.5 && parseInt(suhu) <= 37.7) skor = 2
    else if (parseInt(suhu) > 37.7) skor = 3

    if (sistole < 90) skor = 3
    else if (sistole >= 90 && sistole <= 140) skor = 0
    else if (sistole >= 141 && sistole <= 150) skor = 1
    else if (sistole >= 151 && sistole <= 160) skor = 2
    else if (sistole > 160) skor = 3

    if (diastole <= 90) skor = 0
    else if (diastole > 90 && diastole <= 100) skor = 1
    else if (diastole >= 101 && diastole <= 110) skor = 2
    else if (diastole > 110) skor = 3

    if (nadi < 50) skor = 3
    else if (nadi >= 50 && nadi <= 60) skor = 2
    else if (nadi > 60 && nadi <= 100) skor = 0
    else if (nadi > 100 && nadi <= 110) skor = 1
    else if (nadi > 110 && nadi <= 120) skor = 2
    else if (nadi > 120) skor = 3

    if (tk === 'Normal') skor = 0
    else if (tk === 'Abnormal') skor = 3

    return skor
  }

  const getEwsUsia = (usiaBln, params) => {
    console.log('getEwsUsia', usiaBln)

    // A =0
    // V =1
    // P =2
    // U =3
    // G =4
    // AC =5
    const usia = Math.floor(usiaBln / 12)

    let skor = 0
    const { rr, spo2, suhu, sistole, nadi, tk } = params

    // DEWASA
    if (usia > 17) {
      let a = 0, b = 0, c = 0, d = 0, e = 0, f = 0

      if (parseInt(rr) < 9) a = 3
      else if (parseInt(rr) >= 9 && parseInt(rr) < 12) a = 1
      else if (parseInt(rr) >= 12 && parseInt(rr) <= 20) a = 0
      else if (parseInt(rr) > 20 && parseInt(rr) < 25) a = 2
      else if (parseInt(rr) >= 25) a = 3

      if (parseInt(spo2) < 92) b = 3
      else if (parseInt(spo2) >= 92 && parseInt(spo2) <= 93) b = 2
      else if (parseInt(spo2) >= 94 && parseInt(spo2) <= 95) b = 1
      else if (parseInt(spo2) > 95) b = 0

      if (parseInt(suhu) <= 35) c = 3
      else if (parseInt(suhu) >= 35.1 && parseInt(suhu) <= 36) c = 2
      else if (parseInt(suhu) >= 36.1 && parseInt(suhu) <= 38) c = 0
      else if (parseInt(suhu) > 38.1 && parseInt(suhu) <= 39) c = 1
      else if (parseInt(suhu) > 39.1) c = 2

      if (sistole <= 90) d = 3
      else if (sistole > 90 && sistole <= 100) d = 2
      else if (sistole > 100 && sistole <= 110) d = 1
      else if (sistole >= 111 && sistole <= 219) d = 0
      else if (sistole > 220) d = 3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      if (nadi < 41) e = 3
      else if (nadi >= 41 && nadi <= 50) e = 1
      else if (nadi > 50 && nadi <= 90) e = 0
      else if (nadi > 90 && nadi <= 110) e = 1
      else if (nadi > 110 && nadi <= 130) e = 2
      else if (nadi > 130) e = 3

      if (tk === 0) f = 0
      else if (tk > 0) f = 3

      skor = a + b + c + d + e + f
      return skor
    }

    // anak anak usia dibawah 17
    else if (usia <= 17 && usia >= 12) {
      let a = 0, b = 0, c = 0, d = 0, e = 0

      if (parseInt(rr) >= 0 && parseInt(rr) < 10) a = 3
      else if (parseInt(rr) >= 10 && parseInt(rr) < 15) a = 1
      else if (parseInt(rr) >= 15 && parseInt(rr) <= 20) a = 0
      else if (parseInt(rr) > 20 && parseInt(rr) <= 25) a = 1
      else if (parseInt(rr) > 25 && parseInt(rr) <= 30) a = 2
      else if (parseInt(rr) > 30) a = 3

      if (parseInt(spo2) <= 85) b = 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) b = 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) <= 93) b = 1
      else if (parseInt(spo2) >= 94) b = 0

      if (parseInt(nadi) < 40) c = 3
      else if (parseInt(suhu) >= 40 && parseInt(suhu) < 60) c = 1
      else if (parseInt(suhu) >= 60 && parseInt(suhu) <= 100) c = 0
      else if (parseInt(suhu) > 100 && parseInt(suhu) <= 120) c = 1
      else if (parseInt(suhu) > 120 && parseInt(suhu) <= 140) c = 2
      else if (parseInt(suhu) > 140) c = 3

      if (sistole < 90) d = 3
      else if (sistole >= 90 && sistole <= 110) d = 1
      else if (sistole >= 101 && sistole <= 120) d = 0
      else if (sistole > 120 && sistole <= 130) d = 1
      else if (sistole > 130 && sistole <= 150) d = 2
      else if (sistole > 150) d = 3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      // if (nadi <= 40) skor =3
      // else if (nadi >= 41 && nadi <= 50) skor =1
      // else if (nadi > 50 && nadi <= 90) skor =0
      // else if (nadi > 90 && nadi <= 110) skor =1
      // else if (nadi > 110 && nadi <= 130) skor =2
      // else if (nadi > 130) skor =3

      if (tk === 0) e = 0
      else if (tk === 1) e = 1
      else if (tk > 1) e = 3

      skor = a + b + c + d + e
      return skor
    }
    else if (usia >= 5 && usia < 12) {
      let a = 0, b = 0, c = 0, d = 0, e = 0

      if (parseInt(rr) >= 0 && parseInt(rr) < 10) a = 3
      else if (parseInt(rr) >= 10 && parseInt(rr) < 15) a = 1
      else if (parseInt(rr) >= 15 && parseInt(rr) <= 30) a = 0
      else if (parseInt(rr) > 30 && parseInt(rr) <= 40) a = 1
      else if (parseInt(rr) > 40 && parseInt(rr) <= 50) a = 2
      else if (parseInt(rr) > 50) a = 3

      if (parseInt(spo2) <= 85) b = 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) b = 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) b = 1
      else if (parseInt(spo2) >= 94) b = 0

      if (parseInt(nadi) < 50) c = 3
      else if (parseInt(suhu) >= 50 && parseInt(suhu) < 70) c = 1
      else if (parseInt(suhu) >= 70 && parseInt(suhu) <= 110) c = 0
      else if (parseInt(suhu) > 110 && parseInt(suhu) <= 130) c = 1
      else if (parseInt(suhu) > 130 && parseInt(suhu) <= 140) c = 2
      else if (parseInt(suhu) > 140) c = 3

      if (sistole < 80) d = 3
      else if (sistole >= 80 && sistole < 90) d = 1
      else if (sistole >= 90 && sistole <= 120) d = 0
      else if (sistole > 120 && sistole <= 130) d = 1
      else if (sistole > 130 && sistole <= 140) d = 2
      else if (sistole > 140) d = 3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      // if (nadi <= 40) skor =3
      // else if (nadi >= 41 && nadi <= 50) skor =1
      // else if (nadi > 50 && nadi <= 90) skor =0
      // else if (nadi > 90 && nadi <= 110) skor =1
      // else if (nadi > 110 && nadi <= 130) skor =2
      // else if (nadi > 130) skor =3

      if (tk === 0) e = 0
      else if (tk === 1) e = 1
      else if (tk > 1) e = 3

      skor = a + b + c + d + e
      return skor
    }
    else if (usia >= 1 && usia < 5) {
      let a = 0, b = 0, c = 0, d = 0, e = 0

      if (parseInt(rr) >= 0 && parseInt(rr) < 15) a = 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 20) a = 1
      else if (parseInt(rr) >= 20 && parseInt(rr) <= 40) a = 0
      else if (parseInt(rr) > 40 && parseInt(rr) <= 50) a = 1
      else if (parseInt(rr) > 50 && parseInt(rr) <= 60) a = 2
      else if (parseInt(rr) > 60) a = 3

      if (parseInt(spo2) <= 85) b = 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) b = 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) b = 1
      else if (parseInt(spo2) >= 94) b = 0

      if (parseInt(nadi) < 60) c = 3
      else if (parseInt(suhu) >= 60 && parseInt(suhu) < 80) c = 1
      else if (parseInt(suhu) >= 80 && parseInt(suhu) <= 130) c = 0
      else if (parseInt(suhu) > 130 && parseInt(suhu) <= 150) c = 1
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 170) c = 2
      else if (parseInt(suhu) > 170) c = 3

      if (sistole < 70) d = 3
      else if (sistole >= 70 && sistole < 80) d = 2
      else if (sistole >= 80 && sistole < 90) d = 1
      else if (sistole >= 90 && sistole <= 110) d = 0
      else if (sistole > 110 && sistole <= 120) d = 1
      else if (sistole > 120 && sistole <= 130) d = 2
      else if (sistole > 130) d = 3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      // if (nadi <= 40) skor =3
      // else if (nadi >= 41 && nadi <= 50) skor =1
      // else if (nadi > 50 && nadi <= 90) skor =0
      // else if (nadi > 90 && nadi <= 110) skor =1
      // else if (nadi > 110 && nadi <= 130) skor =2
      // else if (nadi > 130) skor =3
      if (tk === 0) e = 0
      else if (tk === 1) e = 1
      else if (tk > 1) e = 3

      skor = a + b + c + d + e
      return skor
      // ini usia dalam bulan
    }
    else if (usiaBln >= 4 && usiaBln < 12) {
      let a = 0, b = 0, c = 0, d = 0
      if (parseInt(rr) >= 0 && parseInt(rr) < 15) a = 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 30) a = 1
      else if (parseInt(rr) >= 30 && parseInt(rr) <= 50) a = 0
      else if (parseInt(rr) > 50 && parseInt(rr) <= 60) a = 1
      else if (parseInt(rr) > 60 && parseInt(rr) <= 70) a = 2
      else if (parseInt(rr) > 70) a = 3

      if (parseInt(spo2) <= 85) b = 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) b = 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) b = 1
      else if (parseInt(spo2) >= 94) b = 0

      if (parseInt(nadi) < 70) c = 3
      else if (parseInt(suhu) >= 70 && parseInt(suhu) < 100) c = 1
      else if (parseInt(suhu) >= 100 && parseInt(suhu) <= 150) c = 0
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 170) c = 1
      else if (parseInt(suhu) > 170 && parseInt(suhu) <= 180) c = 2
      else if (parseInt(suhu) > 180) c = 3

      // if (sistole || !sistole) skor =0

      // if (sistole < 70) skor =3
      // else if (sistole >= 70 && sistole < 80) skor =2
      // else if (sistole >= 80 && sistole < 90) skor =1
      // else if (sistole >= 90 && sistole <= 110) skor =0
      // else if (sistole > 110 && sistole <= 120) skor =1
      // else if (sistole > 120 && sistole <= 130) skor =2
      // else if (sistole > 130) skor =3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      // if (nadi <= 40) skor =3
      // else if (nadi >= 41 && nadi <= 50) skor =1
      // else if (nadi > 50 && nadi <= 90) skor =0
      // else if (nadi > 90 && nadi <= 110) skor =1
      // else if (nadi > 110 && nadi <= 130) skor =2
      // else if (nadi > 130) skor =3
      if (tk === 0) d = 0
      else if (tk === 1) d = 1
      else if (tk > 1) d = 3

      skor = a + b + c + d
      return skor
    }

    else if (usiaBln < 4) {
      let a = 0, b = 0, c = 0, d = 0
      if (parseInt(rr) >= 0 && parseInt(rr) < 15) a = 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 20) a = 2
      else if (parseInt(rr) >= 20 && parseInt(rr) < 30) a = 3
      else if (parseInt(rr) >= 30 && parseInt(rr) <= 60) a = 0
      else if (parseInt(rr) > 60 && parseInt(rr) <= 70) a = 1
      else if (parseInt(rr) > 70 && parseInt(rr) <= 80) a = 2
      else if (parseInt(rr) > 80) a = 3

      if (parseInt(spo2) <= 85) b = 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) b = 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) b = 1
      else if (parseInt(spo2) >= 94) b = 0

      if (parseInt(nadi) < 80) c = 3
      else if (parseInt(suhu) >= 80 && parseInt(suhu) < 90) c = 2
      else if (parseInt(suhu) >= 90 && parseInt(suhu) <= 110) c = 1
      else if (parseInt(suhu) > 110 && parseInt(suhu) <= 150) c = 0
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 180) c = 1
      else if (parseInt(suhu) > 180 && parseInt(suhu) <= 190) c = 2
      else if (parseInt(suhu) > 190) c = 3

      // if (sistole || !sistole) skor =0

      // if (sistole < 70) skor =3
      // else if (sistole >= 70 && sistole < 80) skor =2
      // else if (sistole >= 80 && sistole < 90) skor =1
      // else if (sistole >= 90 && sistole <= 110) skor =0
      // else if (sistole > 110 && sistole <= 120) skor =1
      // else if (sistole > 120 && sistole <= 130) skor =2
      // else if (sistole > 130) skor =3

      // if (diastole <= 90) skor =0
      // else if (diastole > 90 && diastole <= 100) skor =1
      // else if (diastole >= 101 && diastole <= 110) skor =2
      // else if (diastole > 110) skor =3

      // if (diastole || !diastole) skor =0

      // if (nadi <= 40) skor =3
      // else if (nadi >= 41 && nadi <= 50) skor =1
      // else if (nadi > 50 && nadi <= 90) skor =0
      // else if (nadi > 90 && nadi <= 110) skor =1
      // else if (nadi > 110 && nadi <= 130) skor =2
      // else if (nadi > 130) skor =3
      if (tk === 0) d = 0
      else if (tk === 1) d = 1
      else if (tk > 1) d = 3

      skor = a + b + c + d
      return skor
    }

    return skor
  }

  return {
    cekEws, skoring
  }
}
