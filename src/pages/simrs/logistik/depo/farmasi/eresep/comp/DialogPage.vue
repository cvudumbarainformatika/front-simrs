<template>
  <div
    class="full-height"
  >
    <div
      ref="pageRef"
      class="row items-start bg-grey-8 text-white q-pr-sm"
      :style=" `height: ${tinggiDetailPas}px;`"
    >
      <div
        class="col-3"
      >
        <div class="row">
          <div
            class="absolute-top bg-dark text-white col-3"
            :style=" `height: ${tinggiDetailPas}px; margin-top: ${h}px`"
          >
            <div class="absolute-top-right">
              <div class="row">
                <div class="q-pa-sm">
                  <q-btn
                    outline
                    round
                    style="color: goldenrod;"
                    label="id"
                  />
                </div>
              </div>
            </div>
            <div class="absolute-top">
              <div class="q-pa-sm">
                <q-badge
                  outline
                  color="orange"
                  :label="`${store.resep?.sistembayar?.rs2?? '-'}`"
                />
              </div>
            </div>
            <div class="absolute-bottom">
              <div class="q-pa-md">
                <div class="text-weight-bold f-12 q-mt-sm">
                  {{ store.resep?.datapasien?.nama ?? '-' }}
                </div>
                <div class="text-teal">
                  {{ store.resep ? store.resep.noreg : '-' }} || {{ store.resep?.norm??'-' }}
                </div>
                <div class="text-yellow text-italic f-10">
                  {{ store.resep?.datapasien?.usia?? '-' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-9"
        :style=" `height: ${tinggiDetailPas}px;`"
      >
        <div class="row q-ml-sm">
          <div class="col-6">
            <div class="row text-weight-bold">
              {{ store?.resep?.noresep }}
            </div>
            <div class="row text-italic f-10">
              {{ dateFull(store?.resep?.tgl_kirim) }}
            </div>
            <div class="row">
              {{ store?.resep?.dokter?.nama }}
            </div>
            <div
              v-if="store?.resep?.poli"
              class="row"
            >
              {{ store?.resep?.poli?.rs2 }}
            </div>
            <div
              v-if="store?.resep?.ruanganranap"
              class="row"
            >
              {{ store?.resep?.ruanganranap?.rs2 }}
            </div>
            <div
              v-if="store?.resep?.diagnosa"
              class="row"
            >
              <div class="col-shrink q-mr-xs">
                diagnosa :
              </div>
              <div class="col-grow">
                {{ store?.resep?.diagnosa }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-shrink q-mr-xs">
                Kode Ina :
              </div>
              <div class="col-grow">
                {{ store?.resep?.kodeincbg }}
              </div>
            </div>
            <div class="row">
              <div class="col-shrink q-mr-xs">
                Uraian Ina :
              </div>
              <div class="col-grow">
                {{ store?.resep?.uraianinacbg }}
              </div>
            </div>
            <div class="row">
              <div class="col-shrink q-mr-xs">
                tarif Ina :
              </div>
              <div class="col-grow">
                {{ formatRpDouble( store?.resep?.tarifina) }}
              </div>
            </div>
            <div class="row">
              <div class="col-shrink q-mr-xs">
                tagihan :
              </div>
              <div class="col-grow">
                {{ formatRpDouble( store?.resep?.tagihanrs) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="store?.resep?.flag==='2' && store?.resep?.doneresep && store?.resep?.doneracik"
      class="text-right q-mr-md q-my-sm"
    >
      <q-btn
        rounded
        push
        label="Selesai"
        class="f-12 q-mr-sm"
        color="green"
        text-color="white"
        icon="icon-mat-done_all"
        :disable="store.loadingSelesai && store?.resep?.loading"
        :loading="store.loadingSelesai && store?.resep?.loading"
        @click="store.resepSelesai(store?.resep)"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Selesai
        </q-tooltip>
      </q-btn>
    </div>
    <div
      class="column q-pa-sm "
      :style="`height: calc(100vh - ${tinggiDetailPas+32}px);`"
    >
      <q-scroll-area
        style="height: 100%;"
      >
        <div
          v-if="store?.resep?.permintaanresep?.length"
          class="q-mt-sm"
        >
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
              v-for="(rinc,j) in store?.resep?.permintaanresep"
              :key="j"
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
                    {{ rinc?.fornas==='1'?'Fornas':'Non-Fornas' }}
                  </div>
                  <div
                    class="col-shrink"
                    :class="rinc?.forkit==='1'?'text-green':'text-red'"
                  >
                    {{ rinc?.forkit==='1'?'Forkit':'Non-Forkit' }}
                  </div>
                  <div
                    class="col-shrink"
                    :class="rinc?.generik==='1'?'text-green':'text-red'"
                  >
                    {{ rinc?.generik==='1'?'Generik':'Non-Generik' }}
                  </div>
                </div>
              </q-item-section>
              <q-item-section
                side
                style="width:70%"
              >
                <div class="row full-width">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4">
                        Aturan
                      </div>
                      <div class="col-8">
                        {{ rinc?.aturan }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        Jumlah Obat
                      </div>
                      <div class="col-8">
                        {{ rinc?.jumlah }}
                      </div>
                    </div>
                    <div class="row items-center">
                      <div class="col-4">
                        Konsumsi
                      </div>
                      <div class="col-8">
                        <!-- {{ formatDouble( parseFloat(rinc?.konsumsi),1) }} hari -->
                        <app-input
                          v-model="rinc.konsumsi"
                          outlined
                          valid
                          label="Konsumsi (hari)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="row">
                      <div class="col-4">
                        Harga
                      </div>
                      <div class="col-8">
                        {{ formatDouble( parseFloat(rinc?.hargajual),2) }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        Subtotal
                      </div>
                      <div class="col-8">
                        {{ formatDouble( parseFloat(rinc?.harga),2) }}
                      </div>
                    </div>
                    <div class="row items-center">
                      <div class="col-4">
                        Keterangan
                      </div>
                      <div class="col-8">
                        <!-- {{ rinc?.keterangan }} -->
                        <app-input
                          v-model="rinc.keterangan"
                          outlined
                          valid
                          label="Keterangan"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-1">
                    <div v-if="store?.resep?.flag==='1'">
                      Resep Belum diterima
                    </div>
                    <div v-if="store?.resep?.flag==='3'">
                      Resep Sudah selesai
                    </div>
                    <div v-if="store?.resep?.flag==='2'">
                      <q-btn
                        v-if="!rinc?.obatkeluar"
                        round
                        class="f-10 q-mr-sm"
                        color="primary"
                        text-color="white"
                        icon="icon-mat-save"
                        :loading="store.loadingSimpan && rinc?.loading"
                        :disable="store.loadingSimpan && rinc?.loading"
                        @click="store.simpanObat(rinc)"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Simpan Obat
                        </q-tooltip>
                      </q-btn>
                      <div v-if="rinc?.obatkeluar">
                        Sudah dikeluarkan obat sebanyak {{ rinc?.obatkeluar }} ({{ rinc?.mobat?.satuan_k }})
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div
          v-if="store?.resep?.listRacikan?.length"
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
            v-for="(item,i) in store?.resep?.listRacikan"
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
              <div class="col-shrink q-mr-xs text-green text-weight-bold">
                {{ item?.jumlahdibutuhkan }}
              </div>
              <div class="col-shrink q-mr-xs text-italic">
                {{ item?.aturan }}
              </div>
              <div class="col-shrink q-mr-xs">
                ({{ item?.satuan_racik }})
              </div>
              <div class="col-shrink q-mr-xs">
                <!-- {{ item?.keterangan }} -->
                <app-input
                  v-model="item.keterangan"
                  outlined
                  valid
                  label="Keterangan"
                />
              </div>
              <div class="col-shrink q-mr-xs ">
                <!-- ( {{ formatDouble( parseFloat(item?.konsumsi),1) }} hari) -->
                <app-input
                  v-model="item.konsumsi"
                  outlined
                  valid
                  label="Konsumsi (hari)"
                />
              </div>
              <div class="col-grow">
                <q-separator
                  size="1px"
                  color="deep-orange"
                  inset
                />
              </div>
            </div>
            <q-list
              separator
              bordered
            >
              <q-item
                v-for="(rinc,j) in item?.rincian"
                :key="j"
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
                      {{ rinc?.fornas==='1'?'Fornas':'Non-Fornas' }}
                    </div>
                    <div
                      class="col-shrink"
                      :class="rinc?.forkit==='1'?'text-green':'text-red'"
                    >
                      {{ rinc?.forkit==='1'?'Forkit':'Non-Forkit' }}
                    </div>
                    <div
                      class="col-shrink"
                      :class="rinc?.generik==='1'?'text-green':'text-red'"
                    >
                      {{ rinc?.generik==='1'?'Generik':'Non-Generik' }}
                    </div>
                  </div>
                </q-item-section>
                <q-item-section
                  side
                  style="width:70%"
                >
                  <div class="row full-width">
                    <!-- {{ item?.tiperacikan }} -->
                    <div class="col-6">
                      <div
                        v-if="item?.tiperacikan==='DTD'"
                        class="row"
                      >
                        <div class="col-4">
                          Dosis Resep
                        </div>
                        <div class="col-8">
                          {{ rinc?.dosismaksimum }}
                        </div>
                      </div>
                      <div
                        v-if="item?.tiperacikan==='DTD'"
                        class="row text-black"
                      >
                        <div class="col-4">
                          Dosis Obat
                        </div>
                        <div class="col-8">
                          {{ rinc?.dosisobat }}
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4">
                          Jumlah Resep
                        </div>
                        <div class="col-8">
                          {{ rinc?.jumlahresep }}
                        </div>
                      </div>
                      <div class="row  text-black">
                        <div class="col-4">
                          Jumlah Obat
                        </div>
                        <div class="col-8">
                          {{ rinc?.jumlahobat }}
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="row">
                        <div class="col-4">
                          Harga
                        </div>
                        <div class="col-8">
                          {{ formatDouble(parseFloat(rinc?.harga_jual),2) }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">
                          Subtotal
                        </div>
                        <div class="col-8">
                          {{ formatDouble(parseFloat(rinc?.harga),2) }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">
                          Keterangan
                        </div>
                        <div class="col-8">
                          {{ rinc?.keteranganx }}
                        </div>
                      </div>
                    </div>
                    <div class="col-1">
                      <div v-if="store?.resep?.flag==='1'">
                        Resep Belum diterima
                      </div>
                      <div v-if="store?.resep?.flag==='3'">
                        Resep Sudah selesai
                      </div>
                      <div v-if="store?.resep?.flag==='2'">
                        <q-btn
                          v-if="!rinc?.obatkeluar"
                          round
                          class="f-10 q-mr-sm"
                          color="primary"
                          text-color="white"
                          icon="icon-mat-save"
                          :loading="store.loadingSimpan && rinc?.loading"
                          :disable="store.loadingSimpan && rinc?.loading"
                          @click="store.simpanRacikan(rinc)"
                        >
                          <q-tooltip
                            class="primary"
                            :offset="[10, 10]"
                          >
                            Simpan Obat
                          </q-tooltip>
                        </q-btn>
                        <div v-if="rinc?.obatkeluar">
                          Sudah dikeluarkan obat sebanyak {{ rinc?.obatkeluar }} ({{ rinc?.mobat?.satuan_k }})
                        </div>
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
  <!-- {{ store.resep }} -->
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { dateFull, formatDouble, formatRpDouble } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'

const store = useEResepDepoFarmasiStore()

const pageRef = ref()
const tinggiDetailPas = ref(130)
const h = computed(() => {
  // console.log('h', pageRef.value)
  return pageRef.value?.$el?.clientHeight + 5
})
onMounted(() => {
  // h.value = pageRef.value.$el.clientHeight
  // console.log('h', pageRef.value.$el.clientHeight)
  // store.setForm('kodedepo', apps?.user?.kdruangansim)
  // store.getSigna()
})

</script>
