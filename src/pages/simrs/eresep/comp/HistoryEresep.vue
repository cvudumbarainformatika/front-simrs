<template>
  <div class="column full-height full-width">
    <div class="col-auto bg-primary text-white">
      <div class="row q-pa-sm">
        {{ title }} ({{ pasien?.nama }})
      </div>
    </div>
    <div
      v-if="store?.historys?.length && !store?.loadingHistory"
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
        v-for="(items, index) in store?.historys"
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
              <b>Riwayat Obat Tanggal : <em>{{ humanDate(items?.tgl) }}</em></b>
            </q-item-label>
            <q-item-label class="q-mb-sm text-orange">
              <div v-if="items?.dokter?.nama?.length">
                <span>Petugas : <em>{{ items?.dokter?.nama }}</em></span>
              </div>
              <div v-else>
                <span>Petugas : <em>-</em></span>
              </div>
            </q-item-label>
          </div>
          <div
            class="column q-pa-sm "
            :style="`height: calc(100vh - ${tinggiDetailPas+79}px);`"
          >
            <q-scroll-area style="height: 100%;">
              <div
                v-if="items?.permintaanresep?.length && (items?.tiperesep !== 'iter' && parseInt(items?.flag)<=5) || parseInt(items?.flag)<=3"
                class="q-mt-sm"
              >
                <div class="row full-width">
                  <div class="col-12">
                    <q-btn
                      rounded
                      push
                      label="Copy resep"
                      class="f-12 q-mr-sm"
                      color="green"
                      text-color="white"
                      icon="icon-mat-copy_all"
                      :disable="store.loadingCopy || store?.resep?.loadingGetIter"
                      :loading="store.loadingCopy || store?.resep?.loadingGetIter"
                      @click="copyResep(store?.resep)"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                        anchor="top right"
                        self="top left"
                      >
                        Copy resep
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-shrink text-weight-bold">
                    Non Racikan
                  </div>
                  <div class="col-grow">
                    <q-separator
                      size="2px"
                      color="primary"
                      inset
                    />
                  </div>
                </div>
                <q-list
                  separator
                  bordered
                >
                  <q-item
                    v-for="(rinc,j) in items?.permintaanresep"
                    :key="rinc"
                  >
                    <q-item-section style="width: 30%;">
                      <div class="row">
                        <div class="col-1">
                          {{ j+1 }}
                        </div>
                        <div class="col-11">
                          <div class="row text-weight-bold text-deep-orange">
                            {{ rinc?.mobat?.nama_obat }}
                          </div>
                          <div class="row text-italic f-10">
                            {{ rinc?.kdobat }}
                          </div>
                          <div class="row text-weight-bold f-10">
                            ( {{ rinc?.mobat?.satuan_k }} )
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                    <q-item-section
                      side
                      style="width:40%"
                    >
                      <div class="row items-center full-width">
                        <div class="col-8">
                          <div class="row">
                            <div class="col-6">
                              Aturan :
                            </div>
                            <div class="col-4">
                              {{ rinc?.aturan }}
                            </div>
                          </div>
                          <div class="row q-mt-sm">
                            <div class="col-6">
                              Jumlah Obat :
                            </div>
                            <div class="col-4">
                              {{ rinc?.jumlah }}
                              <!-- <app-input
                                v-model="rinc.jumlah"
                                outlined
                                valid
                                label="Jumlah"
                                @update:model-value="setJumlah($event,rinc,'jumlah')"
                              /> -->
                            </div>
                          </div>
                          <div class="row q-mt-sm">
                            <div class="col-6">
                              Konsumsi :
                            </div>
                            <div class="col-4">
                              {{ rinc?.konsumsi }} hari
                            </div>
                          </div>
                          <div class="row q-mt-sm">
                            <div class="col-6">
                              Keterangan :
                            </div>
                            <div class="col-4">
                              {{ rinc?.keterangan }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                    <q-item-section
                      side
                      style="width:20%"
                    />
                  </q-item>
                </q-list>
              </div>

              <div
                v-if="items?.listRacikan?.length && (items?.tiperesep !== 'iter' && parseInt(items?.flag)<=3) || parseInt(items?.flag)<=3"
                class="q-mt-sm"
              >
                <div class="row items-center">
                  <div class="col-shrink text-weight-bold">
                    Racikan
                  </div>
                  <div class="col-grow">
                    <q-separator
                      size="2px"
                      color="deep-orange"
                      inset
                    />
                  </div>
                </div>
                <div
                  v-for="(item,i) in items?.listRacikan"
                  :key="i"
                >
                  <div class="row items-center">
                    <div class="col-shrink q-mr-xs">
                      {{ item?.namaracikan }}
                    </div>
                    <div class="col-shrink q-mr-xs">
                      <q-chip
                        square
                        class="f-10"
                        color="primary"
                        text-color="white"
                        outline
                      >
                        {{ item?.tiperacikan }}
                      </q-chip>
                    </div>
                    <div class="col-shrink q-mr-xs text-purple text-weight-bold">
                      Jumlah {{ item?.jumlahdibutuhkan }}
                      <!-- <app-input
                    v-model="item.jumlahdibutuhkan"
                    outlined
                    valid
                    label="Jumlah"
                    @update:model-value="setJumlahRacik($event,item,'jumlahdibutuhkan')"
                  /> -->
                    </div>
                    <div class="col-shrink q-mr-xs">
                      ({{ item?.satuan_racik }})
                    </div>
                    <div class="col-shrink q-mr-xs text-italic">
                      {{ item?.aturan }}
                    </div>

                    <div class="col-shrink q-mr-xs">
                      | Keterangan : {{ item?.keterangan }}
                      <!-- <app-input
                    v-model="item.keterangan"
                    outlined
                    valid
                    label="Keterangan"
                  /> -->
                    </div>
                  </div>
                  <q-list
                    separator
                    bordered
                  >
                    <q-item
                      v-for="(rinc) in item?.rincian"
                      :key="rinc"
                    >
                      <q-item-section style="width: 30%;">
                        <div class="row text-weight-bold text-deep-orange">
                          {{ rinc?.mobat?.nama_obat }}
                        </div>
                        <div class="row f-10">
                          ( {{ rinc?.kandungan }} )
                        </div>
                        <div class="row text-italic f-10">
                          {{ rinc?.kdobat }}
                        </div>
                        <div class="row text-weight-bold f-10">
                          ( {{ rinc?.mobat?.satuan_k }} )
                        </div>
                        <div class="row q-col-gutter-sm text-weight-bold f-10">
                          <div
                            class="col-shrink"
                            :class="rinc?.fornas==='1'?'text-green':'text-red'"
                          >
                            {{ rinc?.fornas==='1'?'Fornas':'' }}
                          </div>
                          <div
                            class="col-shrink"
                            :class="rinc?.forkit==='1'?'text-green':'text-red'"
                          >
                            {{ rinc?.forkit==='1'?'Forkit':'' }}
                          </div>
                          <div
                            class="col-shrink"
                            :class="rinc?.generik==='1'?'text-green':'text-red'"
                          >
                            {{ rinc?.generik==='1'?'Generik':'' }}
                          </div>

                          <div
                            class="col-shrink"
                            :class="rinc?.mobat?.status_kronis==='1'?'text-red':'text-green'"
                          >
                            {{ rinc?.mobat?.status_kronis==='1'?'Kronis':'' }}
                          </div>
                          <div
                            class="col-shrink"
                            :class="rinc?.mobat?.kelompok_psikotropika==='1'?'text-red':'text-green'"
                          >
                            {{ rinc?.mobat?.kelompok_psikotropika==='1'?'Psikotropika':'' }}
                          </div>
                        </div>
                      </q-item-section>
                      <q-item-section
                        side
                        style="width:40%"
                      >
                        <div class="row full-width">
                          <!-- {{ item?.tiperacikan }} -->
                          <div class="col-8">
                            <div
                              v-if="item?.tiperacikan==='DTD'"
                              class="row text-purple text-weight-bold"
                            >
                              <div class="col-6">
                                Dosis Resep
                              </div>
                              <div class="col-4">
                                {{ rinc?.dosismaksimum }}
                              </div>
                            </div>
                            <div
                              v-if="item?.tiperacikan==='DTD'"
                              class="row text-black"
                            >
                              <div class="col-6">
                                Dosis Obat
                              </div>
                              <div class="col-4">
                                <span class="text-weight-bold text-deep-orange">{{ rinc?.dosisobat }}</span> <span
                                  v-if="rinc?.mobat?.kekuatan_dosis"
                                  class="text-italic text-deep-orange f-10"
                                >({{ rinc?.mobat?.kekuatan_dosis }})</span>
                              </div>
                            </div>

                            <div class="row text-purple text-weight-bold">
                              <div class="col-6">
                                Jumlah Resep
                              </div>
                              <div class="col-4">
                                {{ rinc?.jumlahresep }}
                              </div>
                            </div>
                            <div class="row text-black">
                              <div class="col-6">
                                Keterangan
                              </div>
                              <div class="col-4">
                                {{ rinc?.keteranganx }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-item-section>
                      <q-item-section
                        side
                        style="width:20%"
                      >
                        <div class="row items-center full-width">
                          <div class="col-12">
                            <q-btn
                              rounded
                              push
                              label="Copy resep"
                              class="f-12 q-mr-sm"
                              color="green"
                              text-color="white"
                              icon="icon-mat-copy_all"
                              :disable="store.loadingCopy || store?.resep?.loadingGetIter"
                              :loading="store.loadingCopy || store?.resep?.loadingGetIter"
                              @click="copyResep(store?.resep)"
                            >
                              <q-tooltip
                                class="primary"
                                :offset="[10, 10]"
                              >
                                Copy resep
                              </q-tooltip>
                            </q-btn>
                          <!-- {{ formatDouble( parseFloat(rinc?.konsumsi),1) }} hari -->
                          <!-- <app-input
                                v-model="rinc.konsumsi"
                                outlined
                                valid
                                label="Konsumsi (hari)"
                              />
                            </div>
                          </div> -->

                          <!-- <q-item-section
                            side
                            style="width:65%"
                          >
                            <div class="row items-center full-width">
                              <div class="col-6">
                                <q-btn
                                  rounded
                                  push
                                  label="Copy resep"
                                  class="f-12 q-mr-sm"
                                  color="green"
                                  text-color="white"
                                  icon="icon-mat-copy_all"
                                  :disable="store.loadingCopy || store?.resep?.loadingGetIter"
                                  :loading="store.loadingCopy || store?.resep?.loadingGetIter"
                                  @click="copyResep(store?.resep)"
                                >
                                  <q-tooltip
                                    class="primary"
                                    :offset="[10, 10]"
                                  >
                                    Copy resep iter
                                  </q-tooltip>
                                </q-btn>
                              </div>
                            </div>
                          </q-item-section> -->
                            <!-- <div class="col-1 text-right">
                          <div v-if="store?.resep?.flag==='1'">
                            Resep Belum diterima
                          </div>
                          <div v-if="parseFloat(store?.resep?.flag)<='3'">
                            <div v-if="!rinc.done && store?.resep?.flag==='3'" class="text-negative">
                              Tidak diberikan
                            </div>
                            <div v-if="apps?.user?.kdruangansim !== 'Gd-05010101' && apps?.user?.kdruangansim !== 'Gd-04010102'">
                              Resep Sudah Selesai
                            </div>
                            <q-btn
                              v-if="apps?.user?.kdruangansim === 'Gd-05010101' || apps?.user?.kdruangansim === 'Gd-04010102'"
                              round
                              class="f-10 q-my-sm"
                              color="dark"
                              text-color="white"
                              icon="icon-mat-print"
                              @click="openRajal(rinc)"
                            >
                              <q-tooltip
                                class="primary"
                                :offset="[10, 10]"
                              >
                                Print Etiket Rajal
                              </q-tooltip>
                            </q-btn> -->
                            <!-- <div v-if="apps?.user?.kdruangansim === 'Gd-04010102'">
                              <div class="row justify-end">
                                <q-checkbox
                                  v-model="rinc.etiket"
                                  size="xs"
                                  @update:model-value="setRincRanap(rinc,$event)"
                                />
                              </div> -->
                            <!-- <div class="row justify-end">
                          <q-checkbox
                            v-model="rinc.etiket"
                            size="xs"
                            @update:model-value="setRincRanap(rinc,$event)"
                          />
                        </div>
                        <div class="row justify-end">
                          <q-checkbox
                            v-model="rinc.etiket"
                            size="xs"
                            @update:model-value="setRincRanap(rinc,$event)"
                          />
                        </div>
                        <div class="row justify-end">
                          <q-checkbox
                            v-model="rinc.etiket"
                            size="xs"
                            @update:model-value="setRincRanap(rinc,$event)"
                          />
                        </div> -->
                            <!-- </div> -->
                            <!-- </div> -->
                            <!-- <div v-if="store?.resep?.flag==='2'">
                            <q-btn
                              v-if="(!rinc?.obatkeluar) && !rinc?.done"
                              round
                              class="f-10 q-my-sm"
                              color="primary"
                              text-color="white"
                              icon="icon-mat-save"
                              :loading=" rinc?.loading"
                              :disable=" rinc?.loading"
                              @click="store.simpanObat(rinc)"
                            >
                              <q-tooltip
                                class="primary"
                                :offset="[10, 10]"
                              >
                                Simpan Obat
                              </q-tooltip>
                            </q-btn>
                            <div v-if="rinc?.obatkeluar>=0">
                              Sudah dikeluarkan obat sebanyak {{ rinc?.obatkeluar }} ({{ rinc?.mobat?.satuan_k }})
                            </div>
                          </div> -->
                            <!-- </div> -->
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </q-scroll-area>
          </div>
          <!-- <template #loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots
                color="primary"
                size="40px"
              />
            </div>
          </template> -->
          <!-- </q-item> -->
          <!-- </q-list> -->
        </div>
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
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'
// import { pathImg } from 'src/boot/axios'

const store = usePermintaanEResepStore()
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
const tinggiDetailPas = ref(160)

// eslint-disable-next-line no-unused-vars
function pilihData (row) {
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
