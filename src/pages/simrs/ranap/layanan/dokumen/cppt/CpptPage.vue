<template>
  <div class="column full-height">
    <div class="col-auto bg-teal">
      <div class="column q-pa-lg" style="margin-bottom: -30px;">
        <div class="row q-col-gutter-lg">
          <!-- RESIKO JATUH -->
          <div class="col-4">
            <div class="bg-orange-6 text-white q-pa-md items-center relative-position">
              <div class="kiri">
                <div>Resiko Jatuh</div>
                <div class="text-bold f-16">
                  {{ lihatResikoJatuh }}
                </div>
              </div>
              <div class="absolute-center" style="right: 0; left: auto;">
                <q-icon name="icon-mat-elderly" size="45px" style="transform: rotate(-45deg);" />
              </div>
            </div>
          </div>
          <!-- Tingkat Kesadaran -->
          <div class="col-4">
            <div class="bg-orange-6 text-white q-pa-md items-center relative-position">
              <div class="kiri">
                <div>Tingkat Kesadaran</div>
                <div class="text-bold f-16">
                  COMPOS MENTIS
                </div>
              </div>
              <div class="absolute-center" style="right: 0; left: auto;">
                <q-icon name="icon-my-monitor_heart" size="45px" />
              </div>
            </div>
          </div>
          <!-- Ews -->
          <div class="col-4">
            <div v-ripple.early class="bg-orange-6 text-white q-pa-md items-center relative-position cursor-pointer" @click="emits('openEws')">
              <div class="kiri">
                <div class="text-bold f-14">
                  Early Warning Score
                </div>
                <div class="">
                  Scoring Berdasarkan usia
                </div>
              </div>
              <div class="absolute-center" style="right: 0; left: auto;">
                <div class="text-h4 text-bold">
                  80
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col full-height bg-white scroll-y">
      <q-markup-table dense flat bordered separator="cell" wrap-cells class="my-sticky-header-tablex">
        <thead class="bg-teal-5 text-white">
          <tr>
            <th colspan="5">
              <div class="flex no-wrap items-center q-py-sm q-px-xs">
                <div class="text-bold f-16">
                  {{ menu?.desc }}
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th class="text-left" width="11%">
              <div class="text-bold">
                Tanggal
              </div>
            </th>
            <th class="text-left" width="14%">
              <div class="text-bold">
                PPA
              </div>
            </th>
            <th class="text-center" width="30%">
              <div class="text-bold">
                SOAP
              </div>
            </th>
            <th class="text-left" width="40%">
              <div class="text-bold">
                Instruksi PPA
              </div>
            </th>
            <th class="text-center" width="15%">
              <div class="text-bold">
                Verif DPJP
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- lanjut -->
          <template v-for="(row, index) in listFilterredByDate" :key="index">
            <tr v-for="(cppt, i) in data?.cppt?.filter(x => dateCppt(x?.tgl) === row)" :key="i">
              <td class="text-left f-12 q-py-xs" style="vertical-align:top">
                <div>{{ dateCppt(cppt?.tgl) }}</div>
                <div>{{ jamTnpDetik(cppt?.tgl) }}</div>
              </td>
              <td class="text-left f-12 q-py-xs" style="vertical-align:top">
                <div class="text-bold">
                  [{{ jenisPPA(cppt?.nakes) }}]
                </div>
                <div>{{ cppt?.petugas?.nama ?? '-' }}</div>
              </td>
              <td class="text-left f-12" style="vertical-align:top">
                <q-list dense separator :padding="false">
                  <q-item :padding="false">
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div v-if="cppt?.nakes !== '5'" class="text-bold">
                        S
                      </div>
                      <div v-else class="text-bold">
                        A
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label v-if="cppt?.nakes !== '5'" lines="5" class="f-12">
                        {{ cppt?.anamnesis?.keluhanUtama }}
                      </q-item-label>
                      <q-item-label v-else lines="5" class="f-12">
                        {{ cppt?.s_sambung }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div v-if="cppt?.nakes !== '5'" class="text-bold">
                        O
                      </div>
                      <div v-else class="text-bold">
                        D
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label v-if="cppt?.nakes !== '5'" class="f-12">
                        <div>N : {{ cppt?.pemeriksaan?.nadi }}  x/mnt</div>
                        <div>Sis: {{ cppt?.pemeriksaan?.sistole }} mmHg</div>
                        <div>Dia: {{ cppt?.pemeriksaan?.diastole }} mmHg</div>
                        <div>RR: {{ cppt?.pemeriksaan?.pernapasan }} x/mnt</div>
                        <div>SpO2: {{ cppt?.pemeriksaan?.spo }} %</div>
                        <div>Suhu: {{ cppt?.pemeriksaan?.suhu }} C</div>
                        <div>T/k: {{ cppt?.pemeriksaan?.tkKesadaran }} </div>
                        <div>BB: {{ cppt?.pemeriksaan?.bb }} Kg</div>
                        <div>TB: {{ cppt?.pemeriksaan?.tb }} Cm</div>
                        <div>Nyeri:  {{ cppt?.anamnesis?.keluhannyeri?.skor }}</div>
                        <div>Jatuh: {{ lihatSkorJatuh(cppt?.penilaian) }}</div>
                        <div v-html="getNewLine(cppt?.o_sambung)" />
                      </q-item-label>
                      <q-item-label v-else lines="10" class="f-12">
                        <div v-html="getNewLine(cppt?.o_sambung)" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div v-if="cppt?.nakes !== '5'" class="text-bold">
                        A
                      </div>
                      <div v-else class="text-bold">
                        I
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        <span v-html="getNewLine(cppt?.asessment ?? '-')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div v-if="cppt?.nakes !== '5'" class="text-bold">
                        P
                      </div>
                      <div v-else class="text-bold">
                        M
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        <span v-html="getNewLine(cppt?.plann ?? '-')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="cppt?.nakes === '5'" no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        E
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        <span v-html="getNewLine(cppt?.instruksi ?? '-')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </td>
              <td class="text-left f-12" style="vertical-align: top;">
                <span v-if="cppt?.nakes !== '5'" v-html="getNewLine(cppt?.instruksi ?? '-')" />
              </td>
              <td v-if="i === 0" :rowspan="cariRowspan(dateCppt(cppt?.tgl))" class="text-center f-12">
                <vue-qrcode
                  :value="qrUrl"
                  tag="svg"
                  :options="{
                    errorCorrectionLevel: 'Q',
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin:0
                  }"
                />
              </td>
            </tr>
          </template>

          <!-- Awal -->
          <template v-for="awal in data?.awal" :key="awal">
            <tr v-if="awal?.anamnesis !== null">
              <td class="text-left f-12 q-py-xs" style="vertical-align:top">
                <div>{{ dateCppt(pasien?.tglmasuk) }}</div>
                <div>{{ jamTnpDetik(pasien?.tglmasuk) }}</div>
              </td>
              <td class="text-left f-12 q-py-xs" style="vertical-align:top">
                <div class="text-bold">
                  [{{ jenisPPA(awal?.anamnesis?.petugas?.kdgroupnakes) }}]
                </div>
                <div>{{ awal?.anamnesis?.petugas?.nama ?? '-' }}</div>
              </td>
              <td class="text-left f-12" style="vertical-align:top">
                <q-list dense separator :padding="false">
                  <!-- S -->
                  <q-item :padding="false">
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        S
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label lines="5" class="f-12">
                        {{ awal?.anamnesis?.keluhanUtama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- o -->
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        O
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="f-12">
                        <div>N : {{ awal?.pemeriksaan?.nadi }}  x/mnt</div>
                        <div>Sis: {{ awal?.pemeriksaan?.sistole }} mmHg</div>
                        <div>Dia: {{ awal?.pemeriksaan?.diastole }} mmHg</div>
                        <div>RR: {{ awal?.pemeriksaan?.pernapasan }} x/mnt</div>
                        <div>SpO2: {{ awal?.pemeriksaan?.spo }} %</div>
                        <div>Suhu: {{ awal?.pemeriksaan?.suhu }} C</div>
                        <div>T/k: {{ awal?.pemeriksaan?.tkKesadaran }} </div>
                        <div>BB: {{ awal?.pemeriksaan?.bb }} Kg</div>
                        <div>TB: {{ awal?.pemeriksaan?.tb }} Cm</div>
                        <div>Nyeri:  {{ awal?.anamnesis?.keluhannyeri?.skor }}</div>
                        <div>Jatuh: {{ lihatSkorJatuh(awal?.penilaian) }}</div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- A -->
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        A
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        <div v-if="awal?.nakes !== '1'">
                          <div v-if="awal?.diagnosakeperawatan?.length > 0">
                            <div v-for="(item, n) in awal?.diagnosakeperawatan" :key="n">
                              - {{ item?.nama }}
                            </div>
                          </div>
                          <div v-if="awal?.diagnosakebidanan?.length > 0">
                            <div v-for="(item, n) in awal?.diagnosakebidanan" :key="n">
                              - {{ item?.nama }}
                            </div>
                          </div>
                        </div>
                        <div v-else-if="awal?.nakes === '1'">
                          <div v-for="(diag, i) in awal?.diagnosamedis" :key="i">
                            - {{ diag?.masterdiagnosa?.rs4 }}
                          </div>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- P -->
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        P
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        <div v-if="awal?.nakes !== '1'">
                          <div v-if="awal?.diagnosakeperawatan?.length > 0">
                            <div v-for="(item, n) in awal?.diagnosakeperawatan" :key="n">
                              <div v-for="(int, m) in item?.intervensi" :key="m">
                                <div v-if="int?.masterintervensi?.group === 'plann'">
                                  - {{ int?.masterintervensi?.nama }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="awal?.diagnosakebidanan?.length > 0">
                            <div v-for="(item, n) in awal?.diagnosakebidanan" :key="n">
                              <div v-for="(int, m) in item?.intervensi" :key="m">
                                <div v-if="int?.masterintervensi?.group === 'plann'">
                                  - {{ int?.masterintervensi?.nama }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="awal?.nakes === '1'">
                          --
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </td>
              <td class="text-left" style="vertical-align:top">
                <q-item-label class="">
                  <div v-if="awal?.nakes === '2'">
                    <div v-for="(item, n) in awal?.diagnosakeperawatan" :key="n">
                      <div v-for="(int, m) in item?.intervensi?.filter(i => i?.group !== 'plann')" :key="m">
                        - <span class="f-12">{{ int?.masterintervensi?.nama }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="awal?.nakes === '1'">
                    --
                  </div>
                </q-item-label>
              </td>
              <td class="text-center">
                <div style="width:60px">
                  <vue-qrcode
                    :value="qrUrl"
                    tag="svg"
                    :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin:0
                    }"
                  />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
      <div style="margin-bottom: 50px;" />
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { dateCppt, getNewLine, jamTnpDetik } from 'src/modules/formatter'
import useCppt from './useCppt'
import { computed } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['openEws'])

const { data } = useCppt(props?.pasien)

const listFilterredByDate = computed(() => {
  const arr = data?.cppt
  const target = arr.length ? arr?.map(x => dateCppt(x?.tgl)) : []
  const uniq = target.length ? [...new Set(target)] : []
  return uniq
})

const lihatResikoJatuh = computed(() => {
  console.log('computed', data)
  let resikoJatuh = '-'
  let val = data?.awal?.find(x => x?.nakes === '2')?.penilaian
  if (data?.cppt?.length) {
    val = data?.cppt[data?.cppt?.length - 1]?.penilaian
  }
  else {
    val = data?.awal?.find(x => x?.nakes === '2')?.penilaian
  }

  if (val?.humpty_dumpty) {
    resikoJatuh = val?.humpty_dumpty?.skorHumpty?.label ?? '-'
  }
  else if (val?.morse_fall) {
    resikoJatuh = val?.morse_fall?.skorMorse?.label ?? '-'
  }
  else if (val?.ontario) {
    resikoJatuh = val?.ontario?.skorOntario?.label ?? '-'
  }
  return resikoJatuh
})

// const setTingkatKesadaran = computed(() => {
//   let result = ''
//   if (val === 3) {
//     result = 'Coma' // 371632003
//   }
//   else if (val > 3 && val <= 6) {
//     result = 'Stupor' // 89458003
//   }
//   else if (val > 6 && val <= 9) {
//     result = 'Somnolen' // 79519003
//   }
//   else if (val > 9 && val <= 11) {
//     result = 'Delirium' // 2776000
//   }
//   else if (val > 11 && val <= 13) {
//     result = 'Apatis' // 20602000 Apathetic
//   }
//   else if (val > 13 && val <= 15) {
//     result = 'Compos Mentis'
//   }

//   return result
// })

const jenisPPA = (val) => {
  if (val === '1') {
    return 'Dokter'
  }
  else if (val === '2') {
    return 'Perawat'
  }
  else if (val === '3') {
    return 'Bidan'
  }
  else if (val === '4') {
    return 'Apoteker'
  }
  else if (val === '5') {
    return 'Ahli Gizi'
  }
  else {
    return 'Fisoterapis'
  }
}

// eslint-disable-next-line no-unused-vars
const cariRowspan = (val) => {
  const dataBytgl = data?.cppt?.filter(x => dateCppt(x?.tgl) === val)?.length
  // console.log('cari rowspan', dataBytgl)
  return dataBytgl
}

const lihatSkorJatuh = (val) => {
  // console.log(val)
  let skor = 0
  if (val?.humpty_dumpty) {
    skor = val?.humpty_dumpty?.skorHumpty?.skor ?? 0
  }
  else if (val?.morse_fall) {
    skor = val?.morse_fall?.skorMorse?.skor ?? 0
  }
  else if (val?.ontario) {
    skor = val?.ontario?.skorOntario?.skor ?? 0
  }

  return skor
}

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'CPPT.png'
  const asal = 'RANAP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

</script>

<style lang="scss" scoped>
.my-sticky-header-tablex{
  /* height or max-height is important */
  // height: 100%;
  width: 100%;
  max-width: 100% !important;
  border-bottom: 1px solid #4f4f4f !important;
  // padding-bottom: 100px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    /* bg color is important for th; just specify one */
    // background-color: $teal-5;
    // color: aliceblue;
  }

  thead tr th{
    // position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th{
    /* height of all previous header rows */
    top: 48px;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody{
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }

}

</style>
