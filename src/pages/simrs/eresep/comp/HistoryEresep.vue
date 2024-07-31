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
      <div
        v-for="(items, index) in store?.historys"
        :key="index"
      >
        <q-card
          v-if="items?.permintaanresep?.length && (items?.flag === '3' || items?.flag === '4') || items?.rincianracik?.length && (items?.flag === '3' || items?.flag === '4')"
          class="q-mb-lg q-pa-md"
        >
          <!-- <q-item
            v-for="(item, index) in store.historys"
            :key="index"
            class="q-mb-md"
          > -->
          <div>
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
              class="q-pa-sm"
            >
              <div
                v-if="items?.permintaanresep?.length && (items?.flag === '3' || items?.flag === '4')"
                class="q-mt-sm q-mb-xl"
              >
                <div class="row items-center q-mb-sm">
                  <div class="col">
                    <div class="text-weight-bold" v-if="items?.poli">
                      Non Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.poli?.rs2 }}) | {{ items?.sistembayar?.rs2 }}
                    </div>
                    <div class="text-weight-bold" v-else>
                      Non Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.ruanganranap?.rs2 }}) | {{ items?.sistembayar?.rs2 }}
                    </div>
                  </div>
                  <div class="col-auto" v-if="depo[0]?.value === items?.depo && depo[0]?.value !== 'Gd-04010103'">
                    <q-btn
                      rounded
                      push
                      label="Duplicate resep"
                      class="f-12 q-mr-sm"
                      color="green"
                      text-color="white"
                      icon="icon-mat-copy_all"
                      :disable="store.loading || store.loadingkirim"
                      :loading="store.loading"
                      @click="copyResep(store?.historys[index], index, 'nonRacik')"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                        anchor="top right"
                        self="top left"
                      >
                        Duplicate resep
                      </q-tooltip>
                    </q-btn>
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
                    <q-item-section style="width: 40%;">
                      <div class="row">
                        <div class="col-1">
                          {{ j+1 }}
                        </div>
                        <div class="col-11">
                          <div class="row text-weight-bold">
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
                        <div class="col-12">
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
                    <q-item-section side style="width:20%">
                      <div v-if="store.statusCopied[`${index}-${j}`] === true" class="row col-6 items-center text-green">
                        Duplicate resep berhasil!
                      </div>
                      <div v-else-if="store.statusCopied[`${index}-${j}`] === false && store.pemberianObatCek[`${index}-${j}`] !== null" class="row col-6 items-center text-red">
                        <q-btn
                          label="Konfirmasi pemberian obat"
                          class="f-10 q-mr-sm"
                          color="yellow"
                          text-color="black"
                          @click="store.openDialogDuplicateResep(store.pemberianObatCek[`${index}-${j}`], store.permintaanResepDuplicate[`${index}-${j}`], 'nonRacik', `${index}-${j}`)"
                        >
                          <q-tooltip
                            class="primary"
                            :offset="[10, 10]"
                            anchor="top right"
                            self="top left"
                          >
                            Konfirmasi pemberian obat
                          </q-tooltip>
                        </q-btn>
                      </div>
                      <div v-else-if="store.statusCopied[`${index}-${j}`] === false" class="row col-6 items-center text-red">
                        Duplicate resep gagal! ({{ store.messageCopied[`${index}-${j}`] }})
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <div
                v-if="items?.rincianracik?.length && (items?.flag === '3' || items?.flag === '4')"
                class="q-mt-sm"
              >
                <div class="row items-center">
                  <div class="col">
                    <div class="text-weight-bold" v-if="items?.poli">
                      Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.poli?.rs2 }}) | {{ items?.sistembayar?.rs2 }}
                    </div>
                    <div class="text-weight-bold" v-else>
                      Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.ruanganranap?.rs2 }}) | {{ items?.sistembayar?.rs2 }}
                    </div>
                  </div>
                  <div class="col-auto" v-if="depo[0]?.value === items?.depo && depo[0]?.value !== 'Gd-04010103'">
                    <q-btn
                      rounded
                      push
                      label="Duplicate resep"
                      class="f-12 q-mr-sm"
                      color="green"
                      text-color="white"
                      icon="icon-mat-copy_all"
                      :disable="store.loading || store.loadingkirim"
                      :loading="store.loading"
                      @click="copyResep(store?.historys[index], index, 'racik')"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                        anchor="top right"
                        self="top left"
                      >
                        Duplicate resep
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div
                  v-for="(item,i) in items?.permintaanracikan"
                  :key="i"
                >
                  <div v-if="i === 0">
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
                      </div>
                      <div class="col-shrink q-mr-xs">
                        ({{ item?.satuan_racik }})
                      </div>
                      <div class="col-shrink q-mr-xs text-italic">
                        {{ item?.aturan }}
                      </div>

                      <div class="col-shrink q-mr-xs">
                        | Keterangan : {{ item?.keterangan }}
                      </div>
                    </div>
                  </div>
                </div>
                <q-list
                  separator
                  bordered
                >
                  <q-item
                    v-for="(rinc, i) in items?.rincianracik"
                    :key="i"
                  >
                    <q-item-section style="width: 40%;">
                      <div class="row text-weight-bold">
                        {{ rinc?.mobat?.nama_obat }}
                      </div>
                      <div class="row text-italic f-10">
                        {{ rinc?.kdobat }}
                      </div>
                      <div class="row text-weight-bold f-10">
                        ( {{ rinc?.mobat?.satuan_k }} )
                      </div>
                    </q-item-section>
                    <q-item-section
                      side
                      style="width:40%"
                    >
                      <div class="row full-width">
                        <div class="col-12">
                          <div
                            v-if="rinc?.tiperacikan==='DTD'"
                            class="row"
                          >
                            <div class="col-6">
                              Dosis Resep :
                            </div>
                            <div class="col-4">
                              {{ items?.permintaanracikan[i]?.dosismaksimum }}
                            </div>
                          </div>
                          <div
                            v-if="rinc?.tiperacikan==='DTD'"
                            class="row q-mt-sm"
                          >
                            <div class="col-6">
                              Dosis Obat :
                            </div>
                            <div class="col-4">
                              {{ items?.permintaanracikan[i]?.mobat?.kekuatan_dosis }}
                            </div>
                          </div>

                          <div class="row q-mt-sm">
                            <div class="col-6">
                              Jumlah Resep :
                            </div>
                            <div class="col-4">
                              {{ items?.permintaanracikan[i]?.jumlah }}
                            </div>
                          </div>
                          <div class="row q-mt-sm">
                            <div class="col-6">
                              Keterangan :
                            </div>
                            <div class="col-4">
                              {{ items?.permintaanracikan[i]?.keteranganx }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                    <q-item-section side style="width:20%">
                      <div v-if="store.statusCopiedRacik[`${index}-${i}`] === true" class="row col-6 items-center text-green">
                        Duplicate resep berhasil!
                      </div>
                      <div v-else-if="store.statusCopiedRacik[`${index}-${i}`] === false && store.pemberianObatCek[`${index}-${i}`] !== null" class="row col-6 items-center text-red">
                        <q-btn
                          label="Konfirmasi pemberian obat"
                          class="f-10 q-mr-sm"
                          color="yellow"
                          text-color="black"
                          @click="store.openDialogDuplicateResep(store.pemberianObatCek[`${index}-${i}`], store.permintaanResepDuplicate[`${index}-${i}`], 'racik', `${index}-${i}`)"
                        >
                          <q-tooltip
                            class="primary"
                            :offset="[10, 10]"
                            anchor="top right"
                            self="top left"
                          >
                            Konfirmasi pemberian obat
                          </q-tooltip>
                        </q-btn>
                      </div>
                      <div v-else-if="store.statusCopiedRacik[`${index}-${i}`] === false" class="row col-6 items-center text-red">
                        Duplicate resep gagal! ({{ store.messageCopied[`${index}-${i}`] }})
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
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
      </div>
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
        MAAF ... DATA HISTORY RESEP BELUM ADA
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, computed, watchEffect } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'
// import { pathImg } from 'src/boot/axios'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
// import { notifErrVue } from 'src/modules/utils'

// const apps = useAplikasiStore()
const store = usePermintaanEResepStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: () => { }
  },
  depo: { type: String, default: '' },
  obat: {
    type: Object,
    default: () => { }
  },
  title: {
    type: String,
    default: 'History'
  }
})

const depo = store?.depos.filter(pa => pa.jenis === props?.depo)
// const signa = ref('')
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['clickBtn'])
// const tinggiDetailPas = ref(160)

// eslint-disable-next-line no-unused-vars
function pilihData (row) {
  // console.log(row)
  store.pilihHistory(row)
}

// eslint-disable-next-line no-unused-vars
function copyResep (val, indexlist, tipe) {
  store.loading = true
  const permintaan = val?.permintaanresep
  const permintaanracik = val?.permintaanracikan

  if (tipe === 'nonRacik') {
    store.cekObat(val, permintaan, indexlist, tipe)
  }
  else {
    store.cekObat(val, permintaanracik, indexlist, tipe)
  }
}

onMounted(() => {
  store.getHistory(props?.pasien?.norm)
  store.historys = null
})

watchEffect(() => {
  store.pasien = props?.pasien
  store.depo = props?.depo
  // setPasien()
  // console.log('pasi', props.pasien)
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
