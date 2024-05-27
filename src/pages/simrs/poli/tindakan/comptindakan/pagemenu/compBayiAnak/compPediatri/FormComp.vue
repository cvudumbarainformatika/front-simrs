<template>
  <div>
    <!-- <CdcPage v-if="store.bukaCdc" :pasien="pasien" :draft="draft" :key="draft" /> -->
    <div class="q-pa-lg relative-position">
      <!-- <q-badge class="q-pa-xs q-px-sm absolute-top-right q-ma-md" outline color="primary">
        Kunjungan ke : {{ store?.pediatris?.length + 1 }}
      </q-badge> -->
      <div class="f-12 text-weight-bold">
        Riwayat cdc growth who
      </div>
      <q-separator class="q-my-sm" />

      <table class="bg-yellow-3 q-mb-sm" :key="store.pediatris">
        <tr>
          <th width="5%">
            #
          </th>
          <th>
            BB
          </th>
          <th>
            PB
          </th>
          <th>
            LK
          </th>
          <th>
            LILA
          </th>
          <th>
            BBI
          </th>
          <th>
            BMI
          </th>
          <th>
            CATATAN
          </th>
          <th>
            KETERANGAN
          </th>
          <th class="text-right" width="3%">
            #
          </th>
        </tr>
        <template v-if="store.pediatris.length">
          <tr v-for="(item, i) in store.pediatris" :key="i">
            <td>{{ i+1 }}</td>
            <td>{{ item.bb }}</td><td>{{ item.pb }}</td>
            <td>{{ item.lk }}</td><td>{{ item.lila }}</td>
            <td>{{ item.bbi }}</td><td>{{ item.bmi }}</td>
            <td>{{ item.catatanBmi??'-' }}</td><td>{{ item.keteranganBmi??'-' }}</td>
            <td class="text-right">
              <q-btn class="sel-end" flat icon="icon-mat-assessment" size="sm" padding="sm" rounded @click="lihatGrafik(item)">
                <q-tooltip>Lihat Grafik CDC</q-tooltip>
              </q-btn>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="10">
              <div class="flex full-width flex-center" style="min-height:100px;">
                Belum Ada Data
              </div>
            </td>
          </tr>
        </template>
      </table>

      <div v-if="!store.isEdited" class="row q-col-gutter-xs q-mb-sm item-center">
        <app-input-simrs
          v-model="store.form.bb"
          label="BB / kg"
          class-tambahan="col-1"
          disable
        />
        <app-input-simrs
          v-model="store.form.pb"
          label="PB / cm"
          class-tambahan="col-1"
          disable
        />
        <app-input-simrs
          v-model="store.form.lk"
          label="LK / cm"
          class-tambahan="col-1"
        />
        <app-input-simrs
          v-model="store.form.lila"
          label="LILA / cm"
          class-tambahan="col-1"
        />
        <app-input-simrs
          v-model="store.form.bbi"
          label="BBI"
          class-tambahan="col-1"
        />
        <app-input-simrs
          v-model="store.form.bmi"
          label="BMI"
          class-tambahan="col-1"
        />
        <app-input-simrs
          v-model="store.form.catatanBmi"
          label="Catatan"
          class-tambahan="col-3"
        />
        <app-input-simrs
          v-model="store.form.keteranganBmi"
          label="Keterangan"
          class-tambahan="col-2"
        />
        <div class="col-1 ">
          <q-btn class="sel-end" flat icon="icon-mat-assessment" size="md" rounded @click="lihatGrafik(null)">
            <q-tooltip>Lihat Grafik CDC</q-tooltip>
          </q-btn>
        </div>
      </div>

      <div class="f-12 text-weight-bold">
        Anamnesis (Tambahan)
      </div>
      <q-separator class="q-my-sm" />
      <div class="row q-col-gutter-xs">
        <app-input-simrs
          v-model="store.form.riwayatPerinatal"
          label="Riwayat perinatal"
          class-tambahan="col-12"
        />
      </div>
      <div class="q-mt-sm">
        <strong>Riwayat Imunisasi :</strong>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Imunisasi Dasar
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <q-checkbox
              v-for="item in store.imunisasiDasars"
              :key="item"
              v-model="store.form.imunisasiDasar"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Imunisasi Ulang
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <q-checkbox
              v-for="item in store.imunisasiUlangs"
              :key="item"
              v-model="store.form.imunisasiUlang"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>

      <div class="text-weight-bold">
        Kebiasaan Pasien Saat Sakit :
      </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-xs">
        <div class="col-2">
          Pola Komunikasi
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.polaKomunikasis"
                :key="item"
                v-model="store.form.polaKomunikasi"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.polaKomunikasi==='Lain-lain'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.polaKomunikasiLain"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>
      <div><b>Pola Makanan : </b></div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Makanan Pokok
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.makananPokoks"
                :key="item"
                v-model="store.form.makananPokok"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.makananPokok==='Selain nasi'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.makananPokokLain"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div><b>Asesment Jatuh : </b></div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-sm">
        <app-input-simrs
          v-model="store.form.skorMethodeHumpty"
          label="Methode Humpty Skor"
          class-tambahan="col-6"
        />
        <app-input-simrs
          v-model="store.form.resikoMethodeHumpty"
          label="Resiko"
          class-tambahan="col-6"
        />
      </div>
      <div class="row q-col-gutter-sm">
        <app-input-simrs
          v-model="store.form.skorMorsefallScale"
          label="MorsefallScale Skor"
          class-tambahan="col-6"
        />
        <app-input-simrs
          v-model="store.form.resikoMorsefallScale"
          label="Resiko"
          class-tambahan="col-6"
        />
      </div>
      <div class="q-mt-sm">
        <b>Asesment Fungsional : </b>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-3">
          Aktivitas Mandiri dan Mobilisasi
        </div>
        <div class="col-9">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.mobilisasis"
                :key="item"
                v-model="store.form.mobilisasi"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.mobilisasi==='Perlu bantuan'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.perluBantuan"
                label="Sebutkan"
              />
            </div>
            <div
              v-if="store.form.mobilisasi==='Alat bantu jalan'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.alatBantu"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>

      <div>Skreening Gizi : </div>
      <q-separator class="q-my-xs" />

      <table>
        <tr>
          <th width="5%">
            #
          </th>
          <th>
            PARAMETER
          </th>
          <th width="30%">
            FILLED
          </th>
          <th width="5%">
            SKOR
          </th>
        </tr>
        <tr>
          <td>1.</td>
          <td>Apakah Pasien Tampak Kurus ?</td>
          <td>
            <q-option-group
              v-model="store.form.poin1"
              :options="store.points1"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin1 }}
          </td>
        </tr>
        <tr>
          <td>2.</td>
          <td>
            <div>Apakah terdapat penurunan BB selama 1 Bulan Terakhir?</div>
            <div class="q-ml-lg">
              - Berdasarkan Penilaian Obyektif
            </div>
            <div class="q-ml-lg">
              - Untuk Bayi kurang dari 1 Tahun BB tidak  naik selama seminggu terakhir
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin2"
              :options="store.points2"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin2 }}
          </td>
        </tr>

        <tr>
          <td>3.</td>
          <td>
            <div>Apakah terdapat SALAH SATU dari Kondisi Tersebut ? </div>
            <div class="q-ml-lg">
              - Diare >= 5 kali sehari dan atau muntah > 3 kali / hari selama seminggu terakhir
            </div>
            <div class="q-ml-lg">
              - Asupan makanan berkurang selama seminggu terakhir
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin3"
              :options="store.points3"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin3 }}
          </td>
        </tr>

        <tr>
          <td>4.</td>
          <td>
            <div>Apakah terdapat penyakit atau keadaan yg mengakibatkan pasien beresiko mengalamai malnutrisi ?</div>
            <div class="q-ml-lg">
              - Berdasarkan Penilaian Obyektif
            </div>
            <div class="q-ml-lg">
              (Penyakit Diare kronis HIV, PJB, hepato, ginjal, stoma dan lain-lain)
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin4"
              :options="store.points4"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin4 }}
          </td>
        </tr>
        <tr>
          <td
            colspan="3"
            class="text-right"
          >
            Jumlah
          </td>
          <td class="text-weight-bold text-center">
            {{ store.form.skorGizi }}
          </td>
        </tr>
        <tr>
          <td
            class="text-weight-bold text-center"
            colspan="4"
          >
            <em>Kesimpulan : </em> <span>{{ store.kesimpulanSkreeningGizi }}</span>
          </td>
        </tr>
      </table>

      <q-separator class="q-my-sm" />
      <div class="q-gutter-xs">
        <app-input-simrs
          v-model="store.form.kriteriaHasil"
          label="Kriteria Hasil"
        />
        <app-input-simrs
          v-model="store.form.implementasi"
          label="Implementasi"
        />
        <app-input-simrs
          v-model="store.form.evaluasi"
          label="Evaluasi"
        />
        <app-input-simrs
          v-model="store.form.catatanKie"
          label="Catatan KIE"
        />
      </div>
    </div>

    <q-dialog v-model="store.bukaCdc" position="right">
      <q-card style="width: 600px" class="full-height bg-grey-4 q-pa-sm scroll">
        <ChartWhoBbi :pasien="pasien" :draft="draft" :key="store.masterCdc" width="544px" height="644px" class="q-mb-sm" />
        <ChartWhoBmi :pasien="pasien" :draft="draft" :key="store.masterCdc.length" width="544px" height="644px" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
// import CdcPage from './CdcPage.vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'
// import { ref } from 'vue'
const store = usePediatriStore()
const draft = ref(null)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // const age = calculateAge(props?.pasien?.tgllahir ?? null)
  const ageInMonths = calculateAgeInMonths(props?.pasien?.tgllahir ?? null)
  // console.log('onMounted', age)
  store.getData(props.pasien)
    .then(() => {
      store.initForm(props.pasien)
    })

  if (ageInMonths > 24 && ageInMonths <= 240) {
    cariGrafikChart()
  }
})

const cariGrafikChart = () => {
  const ageInMonths = store.pediatri ? store.pediatri.age_m : calculateAgeInMonths(props?.pasien?.tgllahir ?? null)

  const bb = store.pediatri ? store.pediatri.bb ?? 0 : parseFloat(store?.form?.bb ?? 0)
  const pb = store.pediatri ? store.pediatri.pb ?? 0 : parseFloat(store?.form?.pb ?? 0)

  const x = props?.pasien?.kelamin ?? null
  const kelamin = x === 'Perempuan' ? 2 : 1

  const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === kelamin && x?.jns === 1) : []
  const masterWeight = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === kelamin && x?.jns === 2) : []
  const dataTb = masterTb?.filter(x => x['50rd'] >= Math.floor(pb) && x['50rd'] < Math.round(pb) + 1)
  const dataTbIndexTerdekat = findClosestNumberIndex(dataTb.map(x => x['50rd']), pb)
  const titkA = [ageInMonths, pb]
  const titikB = [dataTb.length ? dataTb[dataTbIndexTerdekat]?.age_m ?? 0 : 0, dataTb.length ? dataTb[dataTbIndexTerdekat]['50rd'] ?? 0 : 0]
  const dataWeight = masterWeight?.filter(x => x.age_m >= Math.floor(titikB[0] ?? 0) && x.age_m < Math.round(titikB[0] ?? 0) + 1)
  // const titikC = [titikB[0], dataWeight.length ? Math.floor(dataWeight.reduce((x, y) => x + y['50rd'], 0) / dataWeight.length) ?? 0 : 0]
  const titikC = [titikB[0], dataWeight.length ? dataWeight[0]['50rd'] ?? 0 : 0]
  const bmi = calculateBMI(bb, pb)
  const masterBmi = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === kelamin && x?.jns === 3) : []
  const titikD = [ageInMonths, bmi]

  const rangeBmi = cariRangeBmi(masterBmi, bmi, ageInMonths)
  const result = { ageInMonths, kelamin, bb, pb, masterTb, masterWeight, dataTb, titkA, titikB, dataWeight, titikC, bmi, masterBmi, titikD, rangeBmi }
  console.log('coba', dataWeight)

  if (store.pediatri === null) {
    store.form.bbi = titikC[1]
    store.form.bmi = bmi
    store.form.catatanBmi = rangeBmi?.keterangan
  }
  // else {
  //   store.form.bmi = 0
  // }
  store.form.age_m = ageInMonths
  draft.value = result
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

// function calculateAge (birthdate) {
//   const today = new Date()
//   const birthdateObj = new Date(birthdate)

//   // Menghitung selisih waktu dalam milidetik
//   const millisecondsDiff = today.getTime() - birthdateObj.getTime()

//   // Menghitung selisih waktu dalam hari
//   const daysDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24))

//   // Menghitung usia dalam tahun, bulan, dan hari
//   const years = Math.floor(daysDiff / 365)
//   const months = Math.floor((daysDiff % 365) / 30)
//   const days = Math.floor(daysDiff % 30)

//   return { years, months, days }
// }

function calculateBMI (weight, height) {
  // const h = (height / 100) * (height / 100)
  const bmi = weight / (height / 100) ** 2
  // console.log('bmi', h)
  return bmi.toFixed(2)
}

function cariRangeBmi (master, coord, age) {
  const cari = master?.filter(x => x.age_m >= Math.floor(age) && x.age_m < Math.round(age) + 1)
  const range2d = cari.length
    ? cari.map(x => {
      return {
        '3rd': x['3rd'],
        '5rd': x['5rd'],
        '10rd': x['10rd'],
        '25rd': x['25rd'],
        '50rd': x['50rd'],
        '75rd': x['75rd'],
        '85rd': x['85rd'],
        '90rd': x['90rd'],
        '95rd': x['95rd'],
        '97rd': x['97rd']
      }
    })
    : []

  const range = range2d.length ? Object.values(Object.values(range2d)[0]) : []
  const closestRange = findClosestRange(range, coord, age, range2d)
  // const closestRange = findClosestRange(range, 15.81, age, range2d)
  return closestRange
}

function findClosestNumberIndex (numbers, target) {
  let closestIndex = null
  let minDifference = Infinity

  for (let i = 0; i < numbers.length; i++) {
    const difference = Math.abs(numbers[i] - target)
    if (difference <= minDifference) {
      minDifference = difference
      closestIndex = i
    }
  }

  return closestIndex
}

function findClosestRange (coordinates, targetCoordinate, age, arrayAsli) {
  let closestRange = null
  let minDistance = Infinity
  const coor = []
  let keterangan = null
  // console.log('arrayAsli', arrayAsli)

  if (arrayAsli.length === 0) {
    const result = { keterangan, coor }
    return result
  }

  for (let i = 0; i < coordinates.length - 1; i++) {
    const currentRange = coordinates[i] + '-' + coordinates[i + 1]
    const currentMin = Math.min(coordinates[i], coordinates[i + 1])
    const currentMax = Math.max(coordinates[i], coordinates[i + 1])
    // console.log('for', currentMin)

    if (targetCoordinate > currentMin && targetCoordinate < currentMax) {
      const distance = Math.abs(targetCoordinate - currentMin)

      const obj = arrayAsli[0]

      const foundObjectMin = Object.keys(obj).find((key) => obj[key] === currentMin)
      const foundObjectMax = Object.keys(obj).find((key) => obj[key] === currentMax)
      // if (foundObjectMin) {
      //   const key = Object.keys(obj).find((key) => obj[key] === currentMin)
      //   console.log(`Found object with value ${currentMin} at key ${key}`)
      // }
      // console.log('distance', distance)
      // console.log('antara', foundObjectMin, foundObjectMax)
      keterangan = `diantara ${foundObjectMin} dan ${foundObjectMax}`
      if (distance < minDistance) {
        minDistance = distance
        closestRange = currentRange
      }

      coor.push([age, currentMin], [age, currentMax])
    }
    if (targetCoordinate > coordinates[coordinates.length - 1]) {
      // console.log('atas', coordinates[coordinates.length - 1])
      const obj = arrayAsli[0]

      const foundObject = Object.keys(obj).find((key) => obj[key] === coordinates[coordinates.length - 1])
      keterangan = `diatas ${foundObject}`
      if (i === 0) {
        coor.push([age, coordinates[coordinates.length - 1]])
      }
    }
    if (targetCoordinate < coordinates[0]) {
      // const distance = Math.abs(targetCoordinate - currentMin)
      const obj = arrayAsli[0]

      const foundObject = Object.keys(obj).find((key) => obj[key] === coordinates[0])
      keterangan = `dibawah ${foundObject}`
      if (i === 0) {
        coor.push([age, coordinates[0]])
      }
    }
    if (targetCoordinate === coordinates[i]) {
      // console.log('sama', coordinates[i])
      const obj = arrayAsli[0]

      const foundObject = Object.keys(obj).find((key) => obj[key] === coordinates[i])
      keterangan = `sama dengan ${foundObject}`
      coor.push([age, coordinates[i]])
    }
  }

  // const result = closestRange.split('-')
  console.log('closestRange', closestRange)

  const result = { keterangan, coor }
  return result
}

function lihatGrafik (item) {
  store.pediatri = item
  store.bukaCdc = true
}

watchEffect(() => {
  if (store.masterCdc.length || store.pediatri) {
    cariGrafikChart()
  }
})

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
  padding: 2px 5px;
}

</style>
