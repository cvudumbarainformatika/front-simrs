<template>
  <div class="column full-height full-width">
    <div class="col-auto bg-primary text-white">
      <div class="row q-pa-sm">
        {{ title }} ({{ pasien?.nama }})
      </div>
    </div>
    <div
      v-if="store.historys.length && !store.loadingHistory"
      class="col full-height bg-grey-3 scroll"
    >
      <!-- <q-infinite-scroll
        :offset="250"
        @load="onLoad"
      > -->
      <!-- <q-list
          bordered
          separator
          class="bg-grey-3"
        > -->
      <q-card
        v-for="(items, index) in store.historys"
        :key="index"
        class="q-mb-lg q-pa-md"
      >
        <!-- <q-item
            v-for="(item, index) in store.historys"
            :key="index"
            class="q-mb-md"
          > -->
        <div class="column">
          <div>
            <q-item-label class="text-primary">
              <b>Riwayat Pemeriksaan Fisik Tanggal : <em>{{ humanDate(items?.rs3) }}</em></b>
            </q-item-label>
            <q-item-label class="q-mb-sm text-orange">
              <div v-if="items?.user?.length">
                <span>Petugas : <em>{{ items?.datasimpeg?.nama }}</em></span>
              </div>
              <div v-else>
                <span>Petugas : <em>-</em></span>
              </div>
            </q-item-label>
          </div>
          <table class="row full-width">
            <th class="th-center">
              <div v-if="items?.gambars.length && items?.detailgambars.length">
                <div
                  v-for="gambars in items?.gambars"
                  :key="gambars?.id"
                >
                  <q-img
                    fit="contain"
                    :src="pathImg + gambars?.gambar"
                  />
                </div>
              </div>
              <div
                v-else
                class="text-center q-pa-md"
                style="color: gray;"
              >
                Tidak ada gambar anatomy
              </div>
            </th>
            <td>
              <q-card
                flat
                bordered
                square
                dark
              >
                <q-list separator>
                  <!-- NADI-->
                  <q-item class="q-pa-xs">
                    <q-item-section avatar>
                      <q-icon
                        :color="nadi(items?.rs4).color"
                        name="icon-my-monitor_heart"
                        size="lg"
                      />
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label :class="`text-h4 text-${nadi(items?.rs4).color}`">
                        {{ items?.rs4 }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-right f-10">
                        N (HR)
                      </q-item-label>
                      <q-item-label class="text-right f-10">
                        {{ nadi(items?.rs4).res }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- PERNAPASAN -->
                  <q-separator
                    dark
                    inset
                  />
                  <q-item
                    class="q-pa-xs list-move"
                    dark
                  >
                    <q-item-section avatar>
                      <q-icon
                        color="white"
                        name="icon-my-local_hospital"
                        size="lg"
                      />
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label :class="`text-h4 text-white`">
                        {{ items?.pernapasan }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-right f-10">
                        RR
                      </q-item-label>
                      <q-item-label class="text-right f-10">
                        -
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- SUHU TUBUH -->
                  <q-separator
                    dark
                    inset
                  />
                  <q-item
                    class="q-pa-xs list-move"
                    dark
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="suhu(items?.suhutubuh).color"
                        name="icon-my-standing-human-body-silhouette-svgrepo-com"
                        size="lg"
                      />
                    </q-item-section>
                    <q-item-section class="q-pa-xs">
                      <q-item-label :class="`text-h4 text-${suhu(items?.suhutubuh).color}`">
                        {{ items?.suhutubuh }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-right f-10">
                        SUHU TUBUH
                      </q-item-label>
                      <q-item-label class="text-right f-10">
                        {{ suhu(items?.suhutubuh).res }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- TEKaNAN darah -->
                  <q-separator
                    dark
                    inset
                  />
                  <q-item
                    class="q-pa-xs list-move"
                    dark
                  >
                    <q-item-section class="q-pa-xs">
                      <q-item-label :class="`text-h5 `">
                        <span :class="`${tekananDarah(items?.sistole).color}`">{{ items?.sistole }}</span> /
                        <span :class="`${tekananDarahDias(items?.diastole).color}`">{{ items?.diastole }}</span>
                      </q-item-label>
                      <q-item-label class="f-10">
                        <span :class="`${tekananDarah(items?.sistole).color}`">{{ tekananDarah(items?.sistole).res
                        }}</span> /
                        <span :class="`${tekananDarahDias(items?.diastole).color}`">{{
                          tekananDarahDias(items?.diastole).res }}</span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-right f-10">
                        TD sys / dias
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- STATUS -->
                  <q-separator
                    dark
                    inset
                  />

                  <q-item>
                    <q-item-section>
                      <div class="row full-width flex-center">
                        <q-btn
                          outline
                          style="color: goldenrod;"
                          no-caps
                          dense
                          size="sm"
                          class="q-px-sm"
                        >
                          <div class="column">
                            <div class="f-14">
                              {{ items?.tinggibadan }} cm
                            </div>
                            <div class="f-10">
                              Tinggi Badan
                            </div>
                          </div>
                        </q-btn>
                        <q-btn
                          outline
                          style="color: goldenrod;"
                          no-caps
                          dense
                          size="sm"
                          class="q-px-sm"
                        >
                          <div class="column">
                            <div class="f-14">
                              {{ items?.beratbadan }} kg
                            </div>
                            <div class="f-10">
                              Berat Badan
                            </div>
                          </div>
                        </q-btn>
                        <q-btn
                          outline
                          style="color: goldenrod;"
                          no-caps
                          dense
                          size="sm"
                          class="q-px-sm"
                        >
                          <div class="column">
                            <div class="f-14">
                              {{ items?.vas }}
                            </div>
                            <div class="f-10">
                              VAS
                            </div>
                          </div>
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator
                    dark
                    inset
                  />
                  <q-item
                    class="q-pa-xs list-move"
                    dark
                  >
                    <q-item-section class="q-pa-xs">
                      <q-item-label lines="2">
                        T Kesadaran : <em>{{ getKesadaran(items?.tingkatkesadaran) ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Status Psikologis : <em>{{ items?.statuspsikologis ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Ekonomi : <em>{{ items?.sosialekonomi ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Spiritual : <em>{{ items?.spiritual ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        kesadaran : <em>{{ items?.kesadaran ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Status Neurologis : <em>{{ items?.statusneurologis ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Muakuloskeletal : <em>{{ items?.muakuloskeletal ?? '-' }}</em>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- ========================================================================================== KHUSUS PARU POL018-->
                  <q-separator
                    dark
                    inset
                  />
                  <q-item
                    v-if="pasien?.kodepoli === 'POL018'"
                    class="q-pa-xs list-move"
                    dark
                  >
                    <q-item-section class="q-pa-xs">
                      <q-item-label lines="2">
                        Inspeksi : <em>{{ items?.inspeksi ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Palpasi : <em>{{ items?.palpasi ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Perkusi Dada Kanan : <em>{{ items?.perkusidadakanan ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Perkusi Dada Kiri : <em>{{ items?.perkusidadakiri ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Suara Nafas Dasar : <em>{{ items?.auskultasisuaradasar ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Suara Nafas Tambahan (Kanan) : <em>{{ items?.auskultasisuaratambahankanan ?? '-' }}</em>
                      </q-item-label>
                      <q-item-label lines="2">
                        Suara Nafas Tambahan (Kiri) : <em>{{ items?.auskultasisuaratambahankiri ?? '-' }}</em>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-card
                    flat
                    dark
                    square
                  >
                    <q-slide-transition>
                      <!-- <div v-show="expanded===i+1"> -->
                      <div>
                        <q-separator dark />
                        <q-list
                          v-if="items?.detailgambars.length"
                          separator
                          dark
                        >
                          <q-item
                            v-for="(row, n) in items?.detailgambars"
                            :key="n"
                          >
                            <q-item-section avatar>
                              <q-avatar
                                size="24px"
                                color="orange"
                              >
                                {{ n + 1 }}
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ row.anatomy }}</q-item-label>
                              <q-item-label v-if="items?.pemeriksaankhususmata.length">
                                <div class="column q-ml-sm">
                                  <div><em>Details Pemeriksaan (Khusus Mata)</em></div>
                                  <div class="q-ml-sm">
                                    <div>- VOD AWAL : <b>{{ items?.pemeriksaankhususmata[n]?.rs4 ?? '-' }}</b></div>
                                    <div>- VOD REFR : <b>{{ items?.pemeriksaankhususmata[n]?.rs5 ?? '-' }}</b></div>
                                    <div>
                                      - VOD AKHIR : <b>{{ items?.pemeriksaankhususmata[n]?.rs6 ?? '-' }}</b>
                                    </div>
                                    <div>- TOD : <b>{{ items?.pemeriksaankhususmata[n]?.rs10 ?? '-' }}</b></div>
                                    <div>
                                      - FONDOS OD : <b>{{ items?.pemeriksaankhususmata[n]?.rs12 ?? '-' }}</b>
                                    </div>
                                    <div>- VOS AWAL : <b>{{ items?.pemeriksaankhususmata[n]?.rs7 ?? '-' }}</b></div>
                                    <div>- VOS REFR : <b>{{ items?.pemeriksaankhususmata[n]?.rs8 ?? '-' }}</b></div>
                                    <div>
                                      - VOS AKHIR : <b>{{ items?.pemeriksaankhususmata[n]?.rs9 ?? '-' }}</b>
                                    </div>
                                    <div>- TOS : <b>{{ items?.pemeriksaankhususmata[n]?.rs11 ?? '-' }}</b></div>
                                    <div>
                                      - FONDOS OS : <b>{{ items?.pemeriksaankhususmata[n]?.rs13 ?? '-' }}</b>
                                    </div>
                                  </div>
                                </div>
                              </q-item-label>
                              <q-item-label caption>
                                {{ row.ket }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                        <div
                          v-else
                          class="text-center q-pa-md"
                        >
                          Tidak ada detail anatomy
                        </div>
                      </div>
                    </q-slide-transition>
                  </q-card>
                </q-list>
              </q-card>
            </td>
          </table>
        </div>
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
        <!-- </q-item> -->
        <!-- </q-list> -->
      </q-card>
      <!-- </q-infinite-scroll> -->
    </div>
    <div
      v-else
      class="col full-height"
    >
      <div
        v-if="store.loadingHistory"
        class="column full-height flex-center"
      >
        <div class="row justify-center q-my-md">
          <q-spinner-dots
            color="primary"
            size="40px"
          />
        </div>
        Harap Menunggu ..... Sinkron Data
      </div>
      <div
        v-else
        class="column full-height flex-center"
      >
        MAAF ... DATA HISTORY ANAMNESIS BELUM ADA
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, computed } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'
import { pathImg } from 'src/boot/axios'

const store = usePemeriksaanFisik()
const props = defineProps({
  pasien: {
    type: Object,
    default: () => { }
  },
  title: {
    type: String,
    default: 'History'
  }
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['clickBtn'])

// eslint-disable-next-line no-unused-vars
function pilihData(row) {
  // console.log(row)
  store.pilihHistory(row)
}

onMounted(() => {
  // console.log('onMounted')
  store.getHistory(props?.pasien?.norm)
})

// function splitter(txt) {
//   if (txt !== '' || txt !== null || txt !== undefined) {
//     const arr = txt?.split('cursor=')
//     return arr[1]
//   }

//   return null
// }

// function onLoad(index, done) {
//   // if (!store.loadingHistory) {
//   console.log('index', index)
//   // console.log('split', splitter(store.historyMeta?.next_page_url))
//   setTimeout(() => {
//     store.getHistory(props?.pasien?.norm, index + 1)
//     done()
//   }, 1000)
//   // }
// }

function nadi(val) {
  const bradikardi = val < 60
  const normal = val >= 61 && val <= 100
  const takikardi = val > 100

  let obj = {
    color: 'teal',
    res: 'Normal'
  }
  if (bradikardi) {
    obj = { color: 'red', res: 'Brakikardi' }
  } else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  } else if (takikardi) {
    obj = { color: 'red', res: 'Takikardi' }
  }

  return obj
}

function suhu(val) {
  const hipotermia = val < 35
  const normal = val >= 35 && val < 37
  const pireksia = val >= 37 && val <= 41.1
  const hipertermia = val > 41.1

  let obj = {
    color: 'teal',
    res: 'normal'
  }
  if (hipotermia) {
    obj = { color: 'red', res: 'Hipotermia' }
  } else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  } else if (pireksia) {
    obj = { color: 'red', res: 'Pireksia/febris' }
  } else if (hipertermia) {
    obj = { color: 'red', res: 'Hipertermia' }
  }

  return obj
}

function tekananDarah(val) {
  const normal = val >= 100 && val <= 120
  const prahipertensi = val >= 121 && val <= 139
  const hipertensiderajat1 = val >= 140 && val <= 159
  const hipertensiderajat2 = val >= 160

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}
// eslint-disable-next-line no-unused-vars
function tekananDarahDias(val) {
  const normal = val >= 60 && val <= 79
  const prahipertensi = val >= 80 && val <= 89
  const hipertensiderajat1 = val >= 90 && val <= 99
  const hipertensiderajat2 = val >= 100

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'LOW' }
  }

  return obj
}

function getKesadaran(val) {
  const temp = store.optionsTingkatkesadaran.filter(a => a.value === parseInt(val))
  if (temp.length) {
    return temp[0].label
  } else {
    return '-'
  }
}

</script>

<style lang="scss" scoped>
table {
  width: 100%;
  background-color: #fff;

  // padding: 2px;
  th {
    width: 35%;
    text-align: left;
  }

  td {
    width: 65%;
    text-align: left;
  }

  th,
  td {
    border: 1px solid gray;
    padding: 5px;
    border-collapse: collapse;
  }
}

th.th-center {
  text-align: center;
  align-content: center;
}

table.table2 {
  width: 100%;
  background-color: #fff;

  // padding: 2px;
  th {
    width: 25%;
    text-align: left;
  }

  td {
    width: 75%;
    text-align: left;
  }

  th,
  td {
    border: 1px solid gray;
    padding: 5px;
    border-collapse: collapse;
  }
}
</style>
