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
            class="column q-pa-sm"
          >
            <div
              v-if="items?.permintaanresep?.length"
              class="q-mt-sm"
            >
              <div class="row items-center q-mb-sm">
                <div class="col">
                  <div class="text-weight-bold" v-if="items?.poli">
                    Non Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.poli?.rs2 }})
                  </div>
                  <div class="text-weight-bold" v-else>
                    Non Racikan | {{ items?.tiperesep }} | {{ items?.noresep }} ({{ items?.ruanganranap?.rs2 }})
                  </div>
                </div>
                <div class="col-auto">
                  <q-btn
                    rounded
                    push
                    label="Copy resep"
                    class="f-12 q-mr-sm"
                    color="green"
                    text-color="white"
                    icon="icon-mat-copy_all"
                    @click="copyResep(store?.historys[index], index)"
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
                    style="width:30%"
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
                  <q-item-section side style="width:10%">
                    <div v-if="store.statusCopied[`${index}-${j}`] === true" class="row col-6 items-center text-green">
                      Copy resep berhasil!
                    </div>
                    <div v-if="store.statusCopied[`${index}-${j}`] === false" class="row col-6 items-center text-red">
                      Copy resep gagal! ({{ store.messageCopied[`${index}-${j}`] }})
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div
              v-if="items?.permintaanracikan?.length"
              class="q-mt-sm"
            >
              <div class="row items-center">
                <div class="col-shrink text-weight-bold">
                  Racikan | {{ items?.noresep }}
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
                    style="width:60%"
                  >
                    <div class="row full-width">
                      <div class="col-8">
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
                  <!-- <q-item-section
                          side
                          style="width:20%"
                        />
                      </div> -->
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
import { onMounted, ref, computed } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'
// import { pathImg } from 'src/boot/axios'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { notifErrVue } from 'src/modules/utils'

// const apps = useAplikasiStore()
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
// const signa = ref('')
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['clickBtn'])
// const tinggiDetailPas = ref(160)

// eslint-disable-next-line no-unused-vars
function pilihData (row) {
  // console.log(row)
  store.pilihHistory(row)
}

function copyResep (val, indexlist) {
  console.log('payload form', val)
  const resep = val?.rincian

  if (resep?.length) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const processResep = async () => {
      for (const [indexform, res] of resep.entries()) {
        try {
          store.setForm('aturan', res?.aturan)
          store.setForm('diagnosa', val?.diagnosa)
          store.setForm('dokter', val?.dokter?.kdpegsimrs)
          store.setForm('forkit', res?.forkit)
          store.setForm('fornas', res?.fornas)
          store.setForm('generik', res?.generik)
          store.setForm('groupsistembayar', val?.sistembayar?.groups)
          store.setForm('jumlah_diminta', res?.jumlah)
          store.setForm('jumlahdosis', res?.jumlah)
          store.setForm('kandungan', res?.kandungan)
          store.setForm('kdruangan', val?.ruangan)
          store.setForm('keterangan', res?.keterangan)
          store.setForm('kode50', res?.kode50)
          store.setForm('kode108', res?.kode108)
          store.setForm('kodedepo', val?.depo)
          store.setForm('kodeincbg', val?.diagnosa)
          store.setForm('kodeobat', res?.kdobat)
          store.setForm('konsumsi', res?.konsumsi)
          store.setForm('noreg', res?.noreg)
          store.setForm('norm', val?.norm)
          store.setForm('satuan_kcl', res?.mobat?.satuan_k)
          store.setForm('sistembayar', val?.sistembayar?.rs1)
          store.setForm('stokalokasi', val?.norm)
          store.setForm('tagihanrs', val?.tagihanrs)
          store.setForm('tarifina', val?.tarifina)
          store.setForm('uraian50', res?.uraian50)
          store.setForm('uraian108', res?.uraian108)
          store.setForm('uraianinacbg', val?.uraianinacbg)

          if (store.form.tiperesep === 'iter') {
            store.setForm('iter_jml', val?.iter_jml)
          }

          if (val?.tiperesep !== store.form.tiperesep) {
            store.setForm('tiperesep', store.form.tiperesep)
            notifErrVue('Maaf tipe resep berbeda...!')
          }
          else {
            store.setForm('tiperesep', val?.tiperesep)
            const form = store.form
            await store.simpanCopyResep(form, indexform, indexlist)
          }
        }
        catch (error) {
          console.log(`Error saving form data for res index ${indexform}:`, res, error)
        }

        // Add delay between API calls
        await delay(100) // Delay in milliseconds, here it's set to 500 milliseconds (0.5 seconds)
      }
    }

    processResep()
  }
  else {
    console.log('No resep data available.')
  }
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
