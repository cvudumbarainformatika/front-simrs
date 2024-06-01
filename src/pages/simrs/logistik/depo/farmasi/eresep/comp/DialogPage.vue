<template>
  <div class="full-height">
    <div
      ref="pageRef"
      class="row items-start bg-grey-8 text-white q-pr-sm"
      :style=" `height: ${tinggiDetailPas}px;`"
    >
      <div class="col-3">
        <div class="row">
          <div
            class="absolute-top bg-dark text-white col-3"
            :style=" `height: ${tinggiDetailPas}px; margin-top: ${25+16}px`"
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
                <div>
                  <q-badge
                    outline
                    color="orange"
                    :label="`${store.resep?.sistembayar?.rs2?? '-'}`"
                  />
                </div>
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
                <div class="text-italic f-10">
                  {{ store.resep?.datapasien?.noka?? '-' }}
                </div>
                <div class="text-blue f-10">
                  {{ store.resep?.sep?.rs8 ?? '-' }}
                </div>
                <div class="text-yellow text-italic f-10">
                  {{ store.resep?.datapasien?.usia?? '-' }}
                </div>
                <div class=" text-italic f-10">
                  {{ store.resep?.datapasien?.alamat?? '-' }}
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
      v-if="store?.resep?.flag==='2' && (store?.resep?.doneresep || store?.resep?.doneracik)"
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
      v-if="store?.resep?.flag === '3' && store?.resep?.tiperesep === 'iter' && store?.resep?.noresep_asal===''"
      class="row justify-end q-mr-md q-my-sm"
    >
      <div class="col-auto">
        <q-btn
          rounded
          push
          label="History Resep Iter"
          class="f-12 q-mr-sm"
          color="green"
          text-color="white"
          icon="icon-mat-access_time"
          :disable="store.loadingCopy || store?.resep?.loadingHistory || store?.resep?.loadingGetIter"
          :loading="store.loadingCopy || store?.resep?.loadingHistory || store?.resep?.loadingGetIter"
          @click="store.getHistory(store?.resep)"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            History Resep Iter
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn
          rounded
          push
          label="Copy resep Iter"
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

    <div
      v-if="apps?.user?.kdruangansim === 'Gd-04010102'"
      class="row justify-end q-ma-sm"
    >
      <div class="col-auto q-px-sm">
        <q-btn
          no-caps
          dense
          class="f-10 q-mb-xs"
          color="dark"
          text-color="white"
          label="Etiket Pagi"
          @click="openRanap('Pagi')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print Etiket Pagi
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto q-px-sm">
        <q-btn
          no-caps
          dense
          class="f-10 q-mb-xs"
          color="dark"
          text-color="white"
          label="Etiket Siang"
          @click="openRanap('Siang')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print Etiket Siang
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto q-px-sm">
        <q-btn
          no-caps
          dense
          class="f-10 q-mb-xs"
          color="dark"
          text-color="white"
          label="Etiket Sore"
          @click="openRanap('Sore')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print Etiket Sore
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto q-px-sm">
        <q-btn
          no-caps
          dense
          class="f-10 q-mb-xs"
          color="dark"
          text-color="white"
          label="Etiket Malam"
          @click="openRanap('Malam')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print Etiket Malam
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="column q-pa-sm "
      :style="`height: calc(100vh - ${tinggiDetailPas+79}px);`"
    >
      <q-scroll-area style="height: 100%;">
        <div
          v-if="store?.resep?.permintaanresep?.length && (store?.resep?.tiperesep !== 'iter' && parseInt(store?.resep?.flag)<=5) || parseInt(store?.resep?.flag)<=3"
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
                style="width:70%"
              >
                <div class="row items-center full-width">
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
                        <!-- {{ rinc?.jumlah }} -->
                        <app-input
                          v-model="rinc.jumlah"
                          outlined
                          valid
                          label="Jumlah"
                          @update:model-value="setJumlah($event,rinc,'jumlah')"
                        />
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
                  <div class="col-1 text-right">
                    <div v-if="store?.resep?.flag==='1'">
                      Resep Belum diterima
                    </div>
                    <div v-if="store?.resep?.flag==='3'">
                      <div v-if="!rinc.done" class="text-negative">
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
                      </q-btn>
                      <div v-if="apps?.user?.kdruangansim === 'Gd-04010102'">
                        <div class="row justify-end">
                          <q-checkbox
                            v-model="rinc.etiket"
                            size="xs"
                            @update:model-value="setRincRanap(rinc,$event)"
                          />
                        </div>
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
                      </div>
                    </div>
                    <div v-if="store?.resep?.flag==='2'">
                      <q-btn
                        v-if="!rinc?.obatkeluar"
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
          v-if="store?.resep?.listRacikan?.length && (store?.resep?.tiperesep !== 'iter' && parseInt(store?.resep?.flag)<=3) || parseInt(store?.resep?.flag)<=3"
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
              <div class="col-shrink q-mr-xs text-purple text-weight-bold">
                <!-- {{ item?.jumlahdibutuhkan }} -->
                <app-input
                  v-model="item.jumlahdibutuhkan"
                  outlined
                  valid
                  label="Jumlah"
                  @update:model-value="setJumlahRacik($event,item,'jumlahdibutuhkan')"
                />
              </div>
              <div class="col-shrink q-mr-xs">
                ({{ item?.satuan_racik }})
              </div>
              <div class="col-shrink q-mr-xs text-italic">
                {{ item?.aturan }}
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
              <div class="col-shrink q-ml-md q-mr-xs text-weight-bold">
                Rp. {{ formatDouble(parseFloat(item?.harga),2) }}
              </div>
              <div class="col-grow">
                <q-separator
                  size="1px"
                  color="deep-orange"
                  inset
                />
              </div>
              <div class="col-auto q-mr-lg">
                <q-btn
                  v-if="apps?.user?.kdruangansim === 'Gd-05010101'"
                  round
                  class="f-10 q-my-sm"
                  color="dark"
                  text-color="white"
                  icon="icon-mat-print"
                  @click="openRajal(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print Etiket Rajal
                  </q-tooltip>
                </q-btn>
                <div
                  v-if="apps?.user?.kdruangansim === 'Gd-04010102'"
                  class="row"
                >
                  <q-checkbox
                    v-model="item.etiket"
                    size="xs"
                    @update:model-value="setRincRanap(item,$event)"
                  />
                </div>
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
                  style="width:70%"
                >
                  <div class="row full-width">
                    <!-- {{ item?.tiperacikan }} -->
                    <div class="col-6">
                      <div
                        v-if="item?.tiperacikan==='DTD'"
                        class="row text-purple text-weight-bold"
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
                        <div class="col-8 ">
                          <span class="text-weight-bold text-deep-orange">{{ rinc?.dosisobat }}</span> <span
                            v-if="rinc?.mobat?.kekuatan_dosis"
                            class="text-italic text-deep-orange f-10"
                          >({{ rinc?.mobat?.kekuatan_dosis }})</span>
                        </div>
                      </div>

                      <div class="row text-purple text-weight-bold">
                        <div class="col-4">
                          Jumlah Resep
                        </div>
                        <div class="col-8">
                          {{ rinc?.jumlahresep }}
                        </div>
                      </div>
                      <div class="row  text-black">
                        <div class="col-4">
                          Jumlah Obat <span class="text-italic f-10">(keluar dari depo)</span>
                        </div>
                        <div class="col-8">
                          {{ rinc?.jumlahobat }} <span class="text-italic f-10">( {{ rinc?.mobat?.satuan_k }} )</span>
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
                          :loading="rinc?.loading"
                          :disable="rinc?.loading"
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
        <div v-if="store?.resep?.flag === '3' && store?.resep?.tiperesep === 'iter'">
          <div v-if="store?.resep?.loadingGetIter || store.loadingCopy">
            <app-loading />
          </div>
          <div v-if="!store?.resep?.loadingGetIter && !store.loadingCopy">
            <div
              v-if="store?.resep?.rincian?.length && parseInt(store?.resep?.flag) >= 3 && store?.resep?.tiperesep === 'iter'"
              class="q-mt-sm"
            >
              <div class="row items-center">
                <div class="col-shrink text-weight-bold">
                  Iter Non Racikan
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
                  v-for="(rinc,j) in store?.resep?.rincian"
                  :key="j"
                  :class="parseFloat(rinc.jumlah) > parseFloat(rinc.alokasi)?'bg-red-3':''"
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
                    <div class="row items-center full-width q-col-gutter-xs">
                      <div class="col-6">
                        <div class="row q-mr-xs">
                          <div class="col-4">
                            Aturan
                          </div>
                          <div class="col-8">
                            {{ rinc?.aturan }}
                          </div>
                        </div>
                        <div class="row items-center q-mb-xs">
                          <div class="col-4">
                            Jumlah Obat
                          </div>
                          <div class="col-8">
                            <!-- {{ rinc?.jumlah }} -->
                            <app-input
                              v-model="rinc.jumlah"
                              outlined
                              valid
                              label="Jumlah "
                            />
                          </div>
                        </div>
                        <div class="row items-center q-mb-xs">
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
                        <div class="row q-mb-xs">
                          <div class="col-4">
                            Stok Alokasi
                          </div>
                          <div class="col-8">
                            {{ formatDouble( parseFloat(rinc?.alokasi),2) }}
                          </div>
                        </div>
                        <div class="row q-mb-xs">
                          <div class="col-4">
                            Harga
                          </div>
                          <div class="col-8">
                            {{ formatDouble( parseFloat(rinc?.hargajual),2) }}
                          </div>
                        </div>
                        <div class="row q-mb-xs">
                          <div class="col-4">
                            Subtotal
                          </div>
                          <div class="col-8">
                            {{ formatDouble( parseFloat(rinc?.harga),2) }}
                          </div>
                        </div>
                        <div class="row items-center q-mb-xs">
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
                      <div class="col-1 text-right">
                        <div v-if="store?.resep?.flag==='1'">
                          Resep Belum diterima
                        </div>
                        <div v-if="store?.resep?.flag==='3'">
                          <div v-if="store?.resep?.tiperesep!=='iter'">
                            Resep Sudah selesai
                          </div>
                          <div v-if="store?.resep?.tiperesep==='iter' ">
                            <div v-if="(parseFloat(rinc.jumlah) < parseFloat(rinc.alokasi)) && store?.resep?.noresep_asal===''">
                              Klik Copy Resep
                            </div>
                            <div v-if="(parseFloat(rinc.jumlah) > parseFloat(rinc.alokasi)) && store?.resep?.noresep_asal===''">
                              Tidak ada Alokasi
                            </div>

                            <div>
                              <q-btn
                                v-if="apps?.user?.kdruangansim === 'Gd-05010101'"
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
                              </q-btn>
                            </div>
                          </div>
                        </div>
                        <div v-if="store?.resep?.flag==='2'">
                          <q-btn
                            v-if="!rinc?.obatkeluar"
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
              v-if="store?.resep?.rincianracik?.length && parseInt(store?.resep?.flag)>=3"
              class="q-mt-sm"
            >
              <div class="row items-center">
                <div class="col-shrink text-weight-bold">
                  Iter Racikan
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
                v-for="(item,i) in store?.resep?.rincianracik"
                :key="i"
              >
                <div
                  class="row items-center"
                  :class="item?.kosong?'bg-red-3':''"
                >
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
                  <!-- <div class="col-shrink q-mr-xs ">
                    <app-input
                      v-model="item.konsumsi"
                      outlined
                      valid
                      label="Konsumsi (hari)"
                    />
                  </div> -->
                  <div class="col-grow">
                    <q-separator
                      size="1px"
                      color="deep-orange"
                      inset
                    />
                  </div>
                  <div class="col-auto q-mr-lg">
                    <q-btn
                      v-if="apps?.user?.kdruangansim === 'Gd-05010101'"
                      round
                      class="f-10 q-my-sm"
                      color="dark"
                      text-color="white"
                      icon="icon-mat-print"
                      @click="openRajal(item)"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                      >
                        Print Etiket Rajal
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <q-list
                  separator
                  bordered
                >
                  <q-item
                    v-for="(rinc,j) in item?.rincian"
                    :key="j"
                    :class="parseFloat(rinc.jumlah) > parseFloat(rinc.alokasi)?'bg-red-3':''"
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
                              Stok Alokasi
                            </div>
                            <div class="col-8">
                              {{ formatDouble(parseFloat(rinc?.alokasi),2) }}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4">
                              Harga
                            </div>
                            <div class="col-8">
                              {{ formatDouble(parseFloat(rinc?.hargajual),2) }}
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
                            <div v-if="store?.resep?.tiperesep!=='iter'">
                              Resep Sudah selesai
                            </div>
                            <div v-if="store?.resep?.tiperesep==='iter' && store?.resep?.noresep_asal===''">
                              <div v-if="parseFloat(rinc.jumlah) < parseFloat(rinc.alokasi)">
                                <div v-if="!item?.kosong">
                                  Klik Copy Resep
                                </div>
                                <div v-if="item?.kosong">
                                  Tidak ada Alokasi Racikan
                                </div>
                              </div>
                              <div v-if="parseFloat(rinc.jumlah) > parseFloat(rinc.alokasi)">
                                Tidak ada Alokasi
                              </div>
                            </div>
                          </div>
                          <div v-if="store?.resep?.flag==='2'">
                            <q-btn
                              v-if="!rinc?.obatkeluar"
                              round
                              class="f-10 q-mr-sm"
                              color="primary"
                              text-color="white"
                              icon="icon-mat-save"
                              :loading="rinc?.loading"
                              :disable="rinc?.loading"
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
            <div v-if="!store?.resep?.rincian?.length && !store?.resep?.rincianracik?.length">
              <app-no-data-small />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
  <!-- {{ store.resep }} -->
  <SudahAdaCopy v-model="store.isAdaCopy" />
  <HistoryResepIter v-model="store.isHistory" />
  <EtiketRajal
    ref="refEtiketRajal"
    v-model="rajalOpen"
    :rinci="rajalRinc"
    :resep="store.resep"
    @close="rajalOpen = false"
  />
  <EtiketRanap
    ref="refEtiketRanap"
    v-model="ranapOpen"
    :rinci="ranapRinc"
    :waktu="ranapWaktu"
    :resep="store.resep"
    @close="ranapOpen = false"
  />
</template>
<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { dateFull, formatDouble, formatRpDouble } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { date } from 'quasar'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { notifErrVue } from 'src/modules/utils'

const store = useEResepDepoFarmasiStore()
const apps = useAplikasiStore()

const rajalRinc = ref(null)
const ranapRinc = ref([])
const ranapWaktu = ref(null)
const rajalOpen = ref(false)
const ranapOpen = ref(false)
const refEtiketRajal = ref(null)
const refEtiketRanap = ref(null)

const SudahAdaCopy = defineAsyncComponent(() => import('./SudahAdaCopy.vue'))
const HistoryResepIter = defineAsyncComponent(() => import('./HistoryResepIter.vue'))
const EtiketRajal = defineAsyncComponent(() => import('./EtiketRajal.vue'))
const EtiketRanap = defineAsyncComponent(() => import('./EtiketRanap.vue'))

function openRajal (val) {
  // console.log('refEtiketRajal', refEtiketRajal.value)
  rajalRinc.value = val
  rajalOpen.value = true
  setTimeout(() => {
    refEtiketRajal.value.printPage()
  }, 100)
}
function setRincRanap (val, evt) {
  // console.log('set rinc ranap', val, evt)
  if (evt === true) {
    // console.log('push', val)
    ranapRinc.value.push(val)
  }
  else {
    const index = ranapRinc.value?.findIndex(ri => ri?.kdobat === val?.kdobat)
    // console.log('splice', index)
    if (index >= 0) {
      ranapRinc.value.splice(index, 1)
    }
  }
  // console.log('ranapRinc', ranapRinc.value)
}
function openRanap (wkt) {
  // console.log('refEtiketRanap', refEtiketRajal.value)
  // ranapRinc.value = val
  ranapWaktu.value = wkt
  ranapOpen.value = true
  setTimeout(() => {
    refEtiketRanap.value.printPage()
  }, 100)
}
const pageRef = ref()
const tinggiDetailPas = ref(160)
const h = ref(0)
// const h = computed(() => {
//   // console.log('h', pageRef.value)
//   return pageRef.value?.$el?.clientHeight + 5
// })
// let jumlah = 0
// function jmlAwal (det, key) {
//   jumlah = parseFloat(det[key])
//   console.log('juma ', jumlah)
// }
// function jmlAkhir (det, key) {
//   // det[key] = jumlah
//   console.log('jumh ', jumlah)
// }
function setJumlah (evt, det, key) {
  const jumlahsigna = isNaN(parseFloat(det?.aturansigna?.jumlah)) ? 1 : parseFloat(det?.aturansigna?.jumlah)
  console.log('jumh ', jumlahsigna, det, (parseFloat(det?.aturansigna?.jumlah)))
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  if (nilai > det?.jumlahAwal) {
    // console.log('det?.jumlahAwal', det?.jumlahAwal)
    det[key] = det?.jumlahAwal
    return notifErrVue('Tidak boleh lebih dari jumlah permintaan resep')
  }
  det.harga = (parseFloat(det?.jumlah) * parseFloat(det.hargajual)) + parseFloat(det?.r)
  det.konsumsi = det.jumlah / jumlahsigna
  // else jumlah = nilai
}
function setJumlahRacik (evt, det, key) {
  // console.log('jumh ', det)
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  const awal = parseFloat(det?.jumlahdibutuhkanAwal)
  if (nilai > awal) {
    // console.log('awal', awal)
    det[key] = awal
    notifErrVue('Tidak boleh lebih dari jumlah permintaan resep')
  }
  if (det.rincian.length) {
    det.rincian.forEach(rinc => {
      // console.log('mobat', rinc)
      if (det?.tiperacikan === 'DTD') {
        const jumlahDiminta = det[key] ?? 1
        const dosisObat = rinc.dosisobat ?? 1
        const dosisResep = rinc.dosismaksimum ?? 1
        const jumlahObat = dosisResep / dosisObat * jumlahDiminta
        rinc.jumlahresep = jumlahObat.toFixed(2)
        if (parseInt(rinc?.mobat?.kelompok_psikotropika) === 1) {
          rinc.jumlahobat = store.customRound(jumlahObat)
        }
        else rinc.jumlahobat = Math.ceil(jumlahObat)
      }
      else {
        const bagi = awal / det[key]
        console.log('bagi', bagi, rinc?.jumlahresepAwal, parseFloat(rinc?.jumlahresepAwal))
        const jumlahObat = parseFloat(rinc?.jumlahresepAwal) / bagi
        rinc.jumlahresep = jumlahObat
        if (parseInt(rinc?.mobat?.kelompok_psikotropika) === 1) {
          rinc.jumlahobat = store.customRound(jumlahObat)
        }
        else rinc.jumlahobat = Math.ceil(jumlahObat)
      }
      rinc.harga = parseFloat(rinc.harga_jual) * parseFloat(rinc.jumlahobat)
      rinc.jumlahdibutuhkan = det.jumlahdibutuhkan
    })

    const r = det.rincian.map(c => c.r)
    const har = det.rincian.map(c => c.harga).reduce((a, b) => a + b, 0)
    det.harga = har + (r[0] ?? 0)
    // console.log('r ', r)
  }
  console.log('jumh ', det)
}
function copyResep (val) {
  // console.log('apps', apps?.user?.pegawai?.kdpegsimrs)
  console.log('resep', val)
  const resep = val?.rincian
  const racik = val?.rincianracik
  const kirimResep = []
  const kirimRacik = []
  // console.log('racikan', racik)
  if (resep.length) {
    resep.forEach(res => {
      // console.log('non racikan', res)
      // console.log('50', res?.uraian50)
      // console.log('108', res?.uraian108)
      if (parseFloat(res.alokasi) < parseFloat(res.jumlah)) return
      const temp = {
        noreg: res?.noreg,
        kdobat: res?.kdobat,
        kandungan: res?.kandungan,
        fornas: res?.fornas,
        forkit: res?.forkit,
        generik: res?.generik,
        kode108: res?.kode108,
        uraian108: res?.uraian108,
        kode50: res?.kode50,
        uraian50: res?.uraian50,
        jumlahMinta: res?.jumlah,
        harga_beli: res?.hargapokok,
        hpp: res?.hargapokok,
        harga_jual: res?.hargajual,
        nilai_r: res?.r,
        aturan: res?.aturan,
        konsumsi: res?.konsumsi,
        keterangan: res?.keterangan,
        user: apps?.user?.pegawai?.kdpegsimrs
      }
      kirimResep.push(temp)
    })
  }
  if (racik.length) {
    racik.forEach(rac => {
      // console.log('racikan', rac)
      if (!rac?.kosong) {
        if (rac.rincian.length) {
          rac.rincian.forEach(rinc => {
            const temp = {
              noreg: rinc?.noreg,
              tiperacikan: rinc?.tiperacikan,
              namaracikan: rinc?.namaracikan,
              kdobat: rinc?.kdobat,
              jumlahMinta: rinc?.jumlah,
              satuan_racik: rinc?.satuan_racik,
              harga_beli: rinc?.hargapokok,
              hpp: rinc?.hargapokok,
              harga_jual: rinc?.hargajual,
              nilai_r: rinc?.r,
              user: apps?.user?.pegawai?.kdpegsimrs
            }
            kirimRacik.push(temp)
          })
        }
      }
    })
  }
  const head = {
    noreg: val?.noreg,
    noresep_asal: val?.noresep,
    tiperesep: 'iter',
    iter_expired: val?.iter_expired,
    norm: val?.norm,
    tgl_permintaan: val?.tgl_permintaan,
    tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    ruangan: val?.ruangan,
    dokter: val?.dokter?.kdpegsimrs,
    depo: val?.depo,
    sistembayar: val?.sistembayar?.rs1,
    diagnosa: val?.diagnosa,
    kodeincbg: val?.diagnosa,
    uraianinacbg: val?.uraianinacbg,
    tarifina: val?.tarifina,
    tagihanrs: val?.tagihanrs,
    flag: '3',
    tgl_kirim: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
  const data = {
    head, kirimResep, kirimRacik, groupsistembayar: val?.sistembayar?.groups, kddepo: val?.depo
  }
  store.copyResep(data)
}
onMounted(() => {
  h.value = pageRef.value?.clientHeight
  // h.value = pageRef.value.$el.clientHeight
  // console.log('h', pageRef.value.$el.clientHeight)
  // store.setForm('kodedepo', apps?.user?.kdruangansim)
  // store.getSigna()
})

</script>
