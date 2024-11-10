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
                  RESIKO TINGGI
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
            <th class="text-center" width="50%">
              <div class="text-bold">
                SOAP
              </div>
            </th>
            <th class="text-left" width="20%">
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
                      <q-item-label class="f-12 text-bold">
                        TTV
                      </q-item-label>
                      <q-item-label class="">
                        - Skor Nyeri : 0
                      </q-item-label>
                      <q-item-label class="">
                        - Jatuh : 0
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
                        <div v-if="awal?.nakes === '2'">
                          <div v-for="(item, n) in awal?.diagnosakeperawatan" :key="n">
                            - {{ item?.nama }}
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
                        <div v-if="awal?.nakes === '2'">
                          <div v-for="(item, n) in awal?.diagnosakeperawatan" :key="n">
                            <div v-for="(int, m) in item?.intervensi" :key="m">
                              - {{ int?.masterintervensi?.nama }}
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
                ni Nanti Plann di diagnosa keperawatan,
                plann dokter ?
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

          <!-- lanjut -->

          <!-- <template v-for="(cppt, index) in data?.cppt" :key="index">
            <tr>
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
                      <div class="text-bold">
                        S
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label lines="5" class="f-12">
                        {{ cppt?.anamnesis?.keluhanUtama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        O
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="f-12">
                        <div>N : {{ cppt?.pemeriksaan?.nadi }}  x/mnt</div>
                        <div>Sis: {{ cppt?.pemeriksaan?.sistole }} mmHg</div>
                        <div>Dia: {{ cppt?.pemeriksaan?.diastole }} mmHg</div>
                        <div>RR: {{ cppt?.pemeriksaan?.pernapasan }} x/mnt</div>
                        <div>SpO2: {{ cppt?.pemeriksaan?.spo }} %</div>
                        <div>Suhu: {{ cppt?.pemeriksaan?.suhu }} C</div>
                        <div>T/k: {{ cppt?.pemeriksaan?.tkKesadaran }} </div>
                        <div>BB: {{ cppt?.pemeriksaan?.bb }} Kg</div>
                        <div>TB: {{ cppt?.pemeriksaan?.tb }} Cm</div>
                        <div>Nyeri:</div>
                        <div>Jatuh:</div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        A
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        {{ cppt?.asessment ?? '-' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        P
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        {{ cppt?.plann ?? '-' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </td>
              <td class="text-left f-12">
                {{ cppt?.intstruksi ?? '-' }}
              </td>
              <td class="text-center f-12">
                {{ cariRowspan(dateCppt(cppt?.tgl)) }}
              </td>
            </tr>
          </template> -->

          <template v-for="(row, index) in data?.cppt" :key="index">
            <tr v-for="(cppt, i) in data?.cppt?.filter(x => dateCppt(x?.tgl) === dateCppt(row?.tgl))" :key="i">
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
                      <div class="text-bold">
                        S
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label lines="5" class="f-12">
                        {{ cppt?.anamnesis?.keluhanUtama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        O
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="f-12">
                        <div>N : {{ cppt?.pemeriksaan?.nadi }}  x/mnt</div>
                        <div>Sis: {{ cppt?.pemeriksaan?.sistole }} mmHg</div>
                        <div>Dia: {{ cppt?.pemeriksaan?.diastole }} mmHg</div>
                        <div>RR: {{ cppt?.pemeriksaan?.pernapasan }} x/mnt</div>
                        <div>SpO2: {{ cppt?.pemeriksaan?.spo }} %</div>
                        <div>Suhu: {{ cppt?.pemeriksaan?.suhu }} C</div>
                        <div>T/k: {{ cppt?.pemeriksaan?.tkKesadaran }} </div>
                        <div>BB: {{ cppt?.pemeriksaan?.bb }} Kg</div>
                        <div>TB: {{ cppt?.pemeriksaan?.tb }} Cm</div>
                        <div>Nyeri:</div>
                        <div>Jatuh:</div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        A
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        {{ cppt?.asessment ?? '-' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item no-padding>
                    <q-item-section avatar thumbnail style="border-right: 1px solid #ccc;">
                      <div class="text-bold">
                        P
                      </div>
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label class="">
                        {{ cppt?.plann ?? '-' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </td>
              <td class="text-left f-12">
                {{ cppt?.intstruksi ?? '-' }}
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
        </tbody>
      </q-markup-table>
      <div style="margin-bottom: 50px;" />
    </div>
  </div>
</template>

<script setup>
import { dateCppt, jamTnpDetik } from 'src/modules/formatter'
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
  else {
    return '-'
  }
}

const cariRowspan = (val) => {
  const dataBytgl = data?.cppt?.filter(x => dateCppt(x?.tgl) === val)?.length
  console.log('cari rowspan', dataBytgl)
  return dataBytgl
}

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'INFORMED-CONSENT.png'
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
