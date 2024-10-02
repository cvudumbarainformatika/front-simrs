// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'
// import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'

export default function useEws (pasien, kasus) {
  // const pengunjung = usePengunjungRanapStore()
  // const pemeriksaan = usePemeriksaanUmumRanapStore()
  const skoring = ref()
  onMounted(() => {
    // getData()
    cekEws()
  })

  const cekEws = (inp, val) => {
    // console.log('cekEws', inp, val)
    // console.log('kasus', kasus, pasien)
    const hml = kasus?.gruping === '4.2'
    const usia = getUsia(pasien?.tgllahir)

    const data = {}
    data[inp] = val
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
    if (parseInt(rr) < 12) skor += 3
    else if (parseInt(rr) >= 12 && parseInt(rr) <= 20) skor += 0
    else if (parseInt(rr) >= 21 && parseInt(rr) <= 25) skor += 2
    else if (parseInt(rr) > 25) skor += 3

    if (parseInt(spo2) < 92) skor += 3
    else if (parseInt(spo2) >= 92 && parseInt(spo2) <= 95) skor += 2
    else if (parseInt(spo2) > 95) skor += 0

    if (parseInt(suhu) < 36) skor += 3
    else if (parseInt(suhu) >= 36 && parseInt(suhu) <= 37.4) skor += 0
    else if (parseInt(suhu) > 37.5 && parseInt(suhu) <= 37.7) skor += 2
    else if (parseInt(suhu) > 37.7) skor += 3

    if (sistole < 90) skor += 3
    else if (sistole >= 90 && sistole <= 140) skor += 0
    else if (sistole >= 141 && sistole <= 150) skor += 1
    else if (sistole >= 151 && sistole <= 160) skor += 2
    else if (sistole > 160) skor += 3

    if (diastole <= 90) skor += 0
    else if (diastole > 90 && diastole <= 100) skor += 1
    else if (diastole >= 101 && diastole <= 110) skor += 2
    else if (diastole > 110) skor += 3

    if (nadi < 50) skor += 3
    else if (nadi >= 50 && nadi <= 60) skor += 2
    else if (nadi > 60 && nadi <= 100) skor += 0
    else if (nadi > 100 && nadi <= 110) skor += 1
    else if (nadi > 110 && nadi <= 120) skor += 2
    else if (nadi > 120) skor += 3

    if (tk === 'Normal') skor += 0
    else if (tk === 'Abnormal') skor += 3

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
      if (parseInt(rr) < 9) skor += 3
      else if (parseInt(rr) >= 9 && parseInt(rr) < 12) skor += 1
      else if (parseInt(rr) >= 12 && parseInt(rr) <= 20) skor += 0
      else if (parseInt(rr) > 20 && parseInt(rr) < 25) skor += 2
      else if (parseInt(rr) >= 25) skor += 3

      if (parseInt(spo2) < 92) skor += 3
      else if (parseInt(spo2) >= 92 && parseInt(spo2) <= 93) skor += 2
      else if (parseInt(spo2) >= 94 && parseInt(spo2) <= 95) skor += 1
      else if (parseInt(spo2) > 95) skor += 0

      if (parseInt(suhu) <= 35) skor += 3
      else if (parseInt(suhu) >= 35.1 && parseInt(suhu) <= 36) skor += 2
      else if (parseInt(suhu) >= 36.1 && parseInt(suhu) <= 38) skor += 0
      else if (parseInt(suhu) > 38.1 && parseInt(suhu) <= 39) skor += 1
      else if (parseInt(suhu) > 39.1) skor += 2

      if (sistole <= 90) skor += 3
      else if (sistole > 90 && sistole <= 100) skor += 2
      else if (sistole >= 101 && sistole <= 110) skor += 1
      else if (sistole >= 111 && sistole <= 219) skor += 0
      else if (sistole > 220) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      if (nadi <= 40) skor += 3
      else if (nadi >= 41 && nadi <= 50) skor += 1
      else if (nadi > 50 && nadi <= 90) skor += 0
      else if (nadi > 90 && nadi <= 110) skor += 1
      else if (nadi > 110 && nadi <= 130) skor += 2
      else if (nadi > 130) skor += 3

      if (tk === 0) skor += 0
      else if (tk > 0) skor += 3
    }

    // anak anak usia dibawah 17
    else if (usia <= 17 && usia >= 12) {
      if (parseInt(rr) >= 0 && parseInt(rr) < 10) skor += 3
      else if (parseInt(rr) >= 10 && parseInt(rr) < 15) skor += 1
      else if (parseInt(rr) >= 15 && parseInt(rr) <= 20) skor += 0
      else if (parseInt(rr) > 20 && parseInt(rr) <= 25) skor += 1
      else if (parseInt(rr) > 25 && parseInt(rr) <= 30) skor += 2
      else if (parseInt(rr) > 30) skor += 3

      if (parseInt(spo2) <= 85) skor += 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) skor += 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) <= 93) skor += 1
      else if (parseInt(spo2) >= 94) skor += 0

      if (parseInt(nadi) < 40) skor += 3
      else if (parseInt(suhu) >= 40 && parseInt(suhu) < 60) skor += 1
      else if (parseInt(suhu) >= 60 && parseInt(suhu) <= 100) skor += 0
      else if (parseInt(suhu) > 100 && parseInt(suhu) <= 120) skor += 1
      else if (parseInt(suhu) > 120 && parseInt(suhu) <= 140) skor += 2
      else if (parseInt(suhu) > 140) skor += 3

      if (sistole < 90) skor += 3
      else if (sistole >= 90 && sistole <= 110) skor += 1
      else if (sistole >= 101 && sistole <= 120) skor += 0
      else if (sistole > 120 && sistole <= 130) skor += 1
      else if (sistole > 130 && sistole <= 150) skor += 2
      else if (sistole > 150) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      // if (nadi <= 40) skor += 3
      // else if (nadi >= 41 && nadi <= 50) skor += 1
      // else if (nadi > 50 && nadi <= 90) skor += 0
      // else if (nadi > 90 && nadi <= 110) skor += 1
      // else if (nadi > 110 && nadi <= 130) skor += 2
      // else if (nadi > 130) skor += 3

      if (tk === 0) skor += 0
      else if (tk === 1) skor += 1
      else if (tk > 1) skor += 3
    }
    else if (usia >= 5 && usia < 12) {
      if (parseInt(rr) >= 0 && parseInt(rr) < 10) skor += 3
      else if (parseInt(rr) >= 10 && parseInt(rr) < 15) skor += 1
      else if (parseInt(rr) >= 15 && parseInt(rr) <= 30) skor += 0
      else if (parseInt(rr) > 30 && parseInt(rr) <= 40) skor += 1
      else if (parseInt(rr) > 40 && parseInt(rr) <= 50) skor += 2
      else if (parseInt(rr) > 50) skor += 3

      if (parseInt(spo2) <= 85) skor += 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) skor += 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) skor += 1
      else if (parseInt(spo2) >= 94) skor += 0

      if (parseInt(nadi) < 50) skor += 3
      else if (parseInt(suhu) >= 50 && parseInt(suhu) < 70) skor += 1
      else if (parseInt(suhu) >= 70 && parseInt(suhu) <= 110) skor += 0
      else if (parseInt(suhu) > 110 && parseInt(suhu) <= 130) skor += 1
      else if (parseInt(suhu) > 130 && parseInt(suhu) <= 140) skor += 2
      else if (parseInt(suhu) > 140) skor += 3

      if (sistole < 80) skor += 3
      else if (sistole >= 80 && sistole < 90) skor += 1
      else if (sistole >= 90 && sistole <= 120) skor += 0
      else if (sistole > 120 && sistole <= 130) skor += 1
      else if (sistole > 130 && sistole <= 140) skor += 2
      else if (sistole > 140) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      // if (nadi <= 40) skor += 3
      // else if (nadi >= 41 && nadi <= 50) skor += 1
      // else if (nadi > 50 && nadi <= 90) skor += 0
      // else if (nadi > 90 && nadi <= 110) skor += 1
      // else if (nadi > 110 && nadi <= 130) skor += 2
      // else if (nadi > 130) skor += 3

      if (tk === 0) skor += 0
      else if (tk === 1) skor += 1
      else if (tk > 1) skor += 3
    }
    else if (usia >= 1 && usia < 5) {
      if (parseInt(rr) >= 0 && parseInt(rr) < 15) skor += 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 20) skor += 1
      else if (parseInt(rr) >= 20 && parseInt(rr) <= 40) skor += 0
      else if (parseInt(rr) > 40 && parseInt(rr) <= 50) skor += 1
      else if (parseInt(rr) > 50 && parseInt(rr) <= 60) skor += 2
      else if (parseInt(rr) > 60) skor += 3

      if (parseInt(spo2) <= 85) skor += 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) skor += 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) skor += 1
      else if (parseInt(spo2) >= 94) skor += 0

      if (parseInt(nadi) < 60) skor += 3
      else if (parseInt(suhu) >= 60 && parseInt(suhu) < 80) skor += 1
      else if (parseInt(suhu) >= 80 && parseInt(suhu) <= 130) skor += 0
      else if (parseInt(suhu) > 130 && parseInt(suhu) <= 150) skor += 1
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 170) skor += 2
      else if (parseInt(suhu) > 170) skor += 3

      if (sistole < 70) skor += 3
      else if (sistole >= 70 && sistole < 80) skor += 2
      else if (sistole >= 80 && sistole < 90) skor += 1
      else if (sistole >= 90 && sistole <= 110) skor += 0
      else if (sistole > 110 && sistole <= 120) skor += 1
      else if (sistole > 120 && sistole <= 130) skor += 2
      else if (sistole > 130) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      // if (nadi <= 40) skor += 3
      // else if (nadi >= 41 && nadi <= 50) skor += 1
      // else if (nadi > 50 && nadi <= 90) skor += 0
      // else if (nadi > 90 && nadi <= 110) skor += 1
      // else if (nadi > 110 && nadi <= 130) skor += 2
      // else if (nadi > 130) skor += 3
      if (tk === 0) skor += 0
      else if (tk === 1) skor += 1
      else if (tk > 1) skor += 3

      // ini usia dalam bulan
    }
    else if (usiaBln >= 4 && usiaBln < 12) {
      if (parseInt(rr) >= 0 && parseInt(rr) < 15) skor += 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 30) skor += 1
      else if (parseInt(rr) >= 30 && parseInt(rr) <= 50) skor += 0
      else if (parseInt(rr) > 50 && parseInt(rr) <= 60) skor += 1
      else if (parseInt(rr) > 60 && parseInt(rr) <= 70) skor += 2
      else if (parseInt(rr) > 70) skor += 3

      if (parseInt(spo2) <= 85) skor += 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) skor += 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) skor += 1
      else if (parseInt(spo2) >= 94) skor += 0

      if (parseInt(nadi) < 70) skor += 3
      else if (parseInt(suhu) >= 70 && parseInt(suhu) < 100) skor += 1
      else if (parseInt(suhu) >= 100 && parseInt(suhu) <= 150) skor += 0
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 170) skor += 1
      else if (parseInt(suhu) > 170 && parseInt(suhu) <= 180) skor += 2
      else if (parseInt(suhu) > 180) skor += 3

      // if (sistole || !sistole) skor += 0

      // if (sistole < 70) skor += 3
      // else if (sistole >= 70 && sistole < 80) skor += 2
      // else if (sistole >= 80 && sistole < 90) skor += 1
      // else if (sistole >= 90 && sistole <= 110) skor += 0
      // else if (sistole > 110 && sistole <= 120) skor += 1
      // else if (sistole > 120 && sistole <= 130) skor += 2
      // else if (sistole > 130) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      // if (nadi <= 40) skor += 3
      // else if (nadi >= 41 && nadi <= 50) skor += 1
      // else if (nadi > 50 && nadi <= 90) skor += 0
      // else if (nadi > 90 && nadi <= 110) skor += 1
      // else if (nadi > 110 && nadi <= 130) skor += 2
      // else if (nadi > 130) skor += 3
      if (tk === 0) skor += 0
      else if (tk === 1) skor += 1
      else if (tk > 1) skor += 3
    }

    else if (usiaBln < 4) {
      if (parseInt(rr) >= 0 && parseInt(rr) < 15) skor += 3
      else if (parseInt(rr) >= 15 && parseInt(rr) < 20) skor += 2
      else if (parseInt(rr) >= 20 && parseInt(rr) < 30) skor += 3
      else if (parseInt(rr) >= 30 && parseInt(rr) <= 60) skor += 0
      else if (parseInt(rr) > 60 && parseInt(rr) <= 70) skor += 1
      else if (parseInt(rr) > 70 && parseInt(rr) <= 80) skor += 2
      else if (parseInt(rr) > 80) skor += 3

      if (parseInt(spo2) <= 85) skor += 3
      else if (parseInt(spo2) > 85 && parseInt(spo2) < 90) skor += 2
      else if (parseInt(spo2) >= 90 && parseInt(spo2) < 94) skor += 1
      else if (parseInt(spo2) >= 94) skor += 0

      if (parseInt(nadi) < 80) skor += 3
      else if (parseInt(suhu) >= 80 && parseInt(suhu) < 90) skor += 2
      else if (parseInt(suhu) >= 90 && parseInt(suhu) <= 110) skor += 1
      else if (parseInt(suhu) > 110 && parseInt(suhu) <= 150) skor += 0
      else if (parseInt(suhu) > 150 && parseInt(suhu) <= 180) skor += 1
      else if (parseInt(suhu) > 180 && parseInt(suhu) <= 190) skor += 2
      else if (parseInt(suhu) > 190) skor += 3

      // if (sistole || !sistole) skor += 0

      // if (sistole < 70) skor += 3
      // else if (sistole >= 70 && sistole < 80) skor += 2
      // else if (sistole >= 80 && sistole < 90) skor += 1
      // else if (sistole >= 90 && sistole <= 110) skor += 0
      // else if (sistole > 110 && sistole <= 120) skor += 1
      // else if (sistole > 120 && sistole <= 130) skor += 2
      // else if (sistole > 130) skor += 3

      // if (diastole <= 90) skor += 0
      // else if (diastole > 90 && diastole <= 100) skor += 1
      // else if (diastole >= 101 && diastole <= 110) skor += 2
      // else if (diastole > 110) skor += 3

      // if (diastole || !diastole) skor += 0

      // if (nadi <= 40) skor += 3
      // else if (nadi >= 41 && nadi <= 50) skor += 1
      // else if (nadi > 50 && nadi <= 90) skor += 0
      // else if (nadi > 90 && nadi <= 110) skor += 1
      // else if (nadi > 110 && nadi <= 130) skor += 2
      // else if (nadi > 130) skor += 3
      if (tk === 0) skor += 0
      else if (tk === 1) skor += 1
      else if (tk > 1) skor += 3
    }

    return skor ?? 0
  }

  return {
    cekEws, skoring
  }
}
