<template>
  <div>
    <CdcPage v-if="store.bukaCdc" :pasien="pasien" :draft="draft" :key="draft" />
    <div v-else class="q-pa-lg">
      <div class="f-12 text-weight-bold">
        Keadaan Umum
      </div>
      <q-separator class="q-my-sm" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <app-input-simrs
          v-model="store.form.bb"
          label="BB / kg"
          class-tambahan="col-2"
          disable
        />
        <app-input-simrs
          v-model="store.form.pb"
          label="PB / cm"
          class-tambahan="col-2"
          disable
        />
        <app-input-simrs
          v-model="store.form.lk"
          label="LK / cm"
          class-tambahan="col-2"
        />
        <app-input-simrs
          v-model="store.form.lila"
          label="LILA / cm"
          class-tambahan="col-2"
        />
        <app-input-simrs
          v-model="store.form.bbi"
          label="BBI"
          class-tambahan="col-2"
          append
          append-icon="icon-mat-visibility"
          @append-click="store.bukaCdc=true"
        />
        <app-input-simrs
          v-model="store.form.bmi"
          label="BMI"
          class-tambahan="col-2"
        />
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
      <div>Riwayat Imunisasi : </div>
      <q-separator />
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
      <div>Kebiasaan Pasien Saat Sakit : </div>
      <q-separator />
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
      <div>Pola Makanan : </div>
      <q-separator />
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
      <div>Asesment Jatuh : </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs">
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
      <div class="row q-col-gutter-xs">
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
      <div>Asesment Fungsional : </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Aktivitas Mandiri dan Mobilisasi
        </div>
        <div class="col-10">
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
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import CdcPage from './CdcPage.vue'
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
  cariGrafikChart()
  const age = calculateAge(props?.pasien?.tgllahir ?? null)
  console.log(age)
})

const cariGrafikChart = () => {
  const ageInMonths = calculateAgeInMonths(props?.pasien?.tgllahir ?? null)

  const bb = parseFloat(store?.form?.bb ?? 0)
  const pb = parseFloat(store?.form?.pb ?? 0)

  const x = props?.pasien?.kelamin ?? null
  const kelamin = x === 'Perempuan' ? 2 : 1

  const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === kelamin && x?.jns === 1) : []
  const masterWeight = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === kelamin && x?.jns === 2) : []
  const dataTb = masterTb?.filter(x => x['50rd'] >= Math.floor(pb) && x['50rd'] < Math.round(pb) + 0.5)
  const titkA = [ageInMonths, pb]
  const titikB = [dataTb.length ? dataTb.reduce((x, y) => x + y.age_m, 0) / dataTb.length ?? 0 : 0, dataTb.length ? Math.floor(dataTb.reduce((x, y) => x + y['50rd'], 0) / dataTb.length) ?? 0 : 0]
  const dataWeight = masterWeight?.filter(x => x.age_m >= Math.floor(titikB[0] ?? 0) && x.age_m < Math.round(titikB[0] ?? 0) + 0.5)
  const titikC = [titikB[0], dataWeight.length ? Math.floor(dataWeight.reduce((x, y) => x + y['50rd'], 0) / dataWeight.length) ?? 0 : 0]
  const bmi = calculateBMI(bb, pb)

  const result = { ageInMonths, kelamin, bb, pb, masterTb, masterWeight, dataTb, titkA, titikB, dataWeight, titikC, bmi }
  console.log('coba', result)

  store.form.bbi = titikC[1]
  store.form.bmi = bmi
  draft.value = result
}

function calculateAgeInMonths (birthdate) {
  if (!birthdate) return 0 // !birthdate return null
  const today = new Date()
  const birthdateObj = new Date(birthdate)

  // Menghitung jumlah bulan antara tanggal lahir dan tanggal saat ini
  const months = today.getFullYear() * 12 + today.getMonth() -
    birthdateObj.getFullYear() * 12 - birthdateObj.getMonth()
  return months
}

function calculateAge (birthdate) {
  const today = new Date()
  const birthdateObj = new Date(birthdate)

  // Menghitung selisih waktu dalam milidetik
  const millisecondsDiff = today.getTime() - birthdateObj.getTime()

  // Menghitung selisih waktu dalam hari
  const daysDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24))

  // Menghitung usia dalam tahun, bulan, dan hari
  const years = Math.floor(daysDiff / 365)
  const months = Math.floor((daysDiff % 365) / 30)
  const days = Math.floor(daysDiff % 30)

  return { years, months, days }
}

function calculateBMI (weight, height) {
  // const h = (height / 100) * (height / 100)
  const bmi = weight / (height / 100) ** 2
  // console.log('bmi', h)
  return bmi.toFixed(2)
}

watchEffect(() => {
  if (store.masterCdc.length) {
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
