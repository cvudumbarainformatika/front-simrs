<template>
  <div class="q-px-sm q-pt-md">
    <app-card
      title="Tabel Distribusi barang"
      desc="Halaman Distribusi barang"
    >
      <template #content>
        <app-table-extend
          title="Data Distribusi"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          row-no
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          :click-able="true"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
          @on-click="onClick"
        >
          <template #header-left-after-search>
            <div class="row q-col-gutter-sm q-ml-sm">
              <div class="q-col">
                <app-input
                  v-model="store.params.r"
                  label="cari ruangan"
                  outlined
                  valid
                  icon="icon-mat-search"
                  debounce="1000"
                  :loading="store.loading"
                  @update:model-value="store.searchRuangan"
                />
              </div>
              <div class="col cursor-pointer">
                <q-chip
                  class="f-12"
                  :color="color(store.paramStatus.value)"
                  :text-color="store.paramStatus.value===99?'dark':'white'"
                  :label="label(store.paramStatus.value,store.paramStatus.nama)"
                />
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  anchor="center middle"
                  self="center middle"
                  :offset="[-50, 0]"
                >
                  <q-list>
                    <q-item
                      v-for="(item,i) in store.statuses"
                      :key="i"
                      v-close-popup
                      style="min-width:250px"
                      clickable
                      :style="(item.value===99? 'color:black; ': 'color:white; ')+ 'background-color:'+color(item.value)+';'"
                      @click="store.setParamStatus(item)"
                    >
                      <q-item-section>
                        {{ item.nama }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
                <!-- </div> -->
                <!-- </div> -->
              </div>
            </div>
          </template>
          <template #col-tanggal>
            <div>Tanggal Permintaan</div>
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.tanggal) }}
          </template>
          <template #col-tanggal_distribusi>
            <div>Tanggal Dikeluarakan</div>
          </template>
          <template #cell-tanggal_distribusi="{row}">
            {{ dateFullFormat(row.tanggal_distribusi) }}
          </template>
          <template #col-tanggal_verif>
            <div>Tanggal Verifikasi</div>
          </template>
          <template #cell-tanggal_verif="{row}">
            {{ dateFull(row.tanggal_verif) }}
          </template>
          <template #col-pengguna>
            <div>Ruangan</div>
          </template>
          <template #cell-pengguna="{row}">
            {{ row.ruang?row.ruang.uraian:'-' }}
          </template>
          <template #col-pj>
            <div>Nama Penerima</div>
          </template>
          <template #cell-pj="{row}">
            {{ row.pj.jabatan }}
          </template>
          <template #col-no_permintaan>
            <div>Nomor Permintaan</div>
          </template>
          <template #col-no_distribusi>
            <div>Nomor Distribusi</div>
          </template>
          <template #col-aksi>
            <div>Aksi</div>
          </template>

          <template #cell-aksi="{row}">
            <div
              v-if="row.status===6"
              class="fit row no-wrap justify-start items-center"
            >
              <div>
                {{ store.tanggalDisplay }}
              </div>
              <div class="q-ml-sm">
                <q-btn
                  icon="icon-mat-event"
                  round
                  flat
                  dense
                  color="primary"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                    @show="updateProxy"
                  >
                    <q-date
                      ref="refDate"
                      v-model="store.form.tanggal"
                      mask="YYYY-MM-DD HH:mm:ss"
                      :options="dateOption"
                      @update:model-value="store.setTanggal"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Ganti Tanggal
                  </q-tooltip>
                </q-btn>
                <q-btn
                  icon="icon-mat-send"
                  color="green"
                  flat
                  no-caps
                  dense
                  round
                  @click="distribusikan(row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Distribusikan
                  </q-tooltip>
                </q-btn>
              </div>
            </div>

            <q-btn
              v-if="row.status===5"
              icon="icon-mat-move_to_inbox"
              color="blue"
              flat
              no-caps
              dense
              round
              @click="barangSiap(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Barang Siap
              </q-tooltip>
            </q-btn>
            <!-- :disable="row.disableSend" -->
          </template>
          <template #cell-status="{row}">
            <!-- {{row.status}} -->
            <q-chip
              class="f-12"
              :color="color(row.status)"
              text-color="white"
              :label="label(row.status,row.nama)"
            />
          </template>
          <template #expand="{row}">
            <div class="q-my-md">
              <div>
                <!-- v-if="item.highlight" -->
                <div>
                  <div class="print">
                    <q-btn
                      ref="refPrint"
                      v-print="printObj"
                      unelevated
                      color="dark"
                      round
                      size="sm"
                      icon="icon-mat-print"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                      >
                        Print
                      </q-tooltip>
                    </q-btn>
                  </div>
                  <div
                    class="print-only"
                  >
                    <div id="printMe">
                      <div class="text-center text-weight-bold">
                        TANDA TERIMA PENGAMBILAN BARANG
                      </div>
                      <div class="text-center text-weight-bold">
                        BAHAN HABIS PAKAI
                      </div>
                      <div class="text-center text-weight-bold q-mb-lg">
                        TAHUN {{ date.formatDate(row.tanggal, 'YYYY') }}
                      </div>
                      <div class="row text-left text-weight-bold">
                        <div class="col-3">
                          NAMA RUANGAN
                        </div>
                        <div class="col-7">
                          : {{ row.ruang.uraian }}
                        </div>
                      </div>
                      <div class="row text-left text-weight-bold">
                        <div class="col-3">
                          TANGGAL
                        </div>
                        <div class="col-7">
                          : {{ dateFullFormat(row.tanggal_distribusi) }}
                        </div>
                      </div>
                      <div class="fit row no-wrap justify-evenly items-center content-center q-col-gutter-sm q-mt-lg">
                        <div class="col-1 text-weight-bold text-left">
                          NO
                        </div>

                        <div class="col-2 text-weight-bold text-left">
                          KODE BARANG
                        </div>

                        <div class="col-4 text-weight-bold text-left">
                          NAMA BARANG
                        </div>

                        <div class="col-1 text-weight-bold text-left">
                          SATUAN
                        </div>

                        <div class="col-1 text-weight-bold text-right">
                          JUMLAH MINTA
                        </div>

                        <div class="col-1 text-weight-bold text-right">
                          JUMLAH DIBERI
                        </div>

                        <div class="col-2 text-weight-bold text-right">
                          KETERANGAN
                        </div>
                      </div>
                      <q-separator />
                      <div
                        v-for="(item, i) in row.details"
                        :key="i"
                      >
                        <div class="fit row no-wrap justify-evenly items-center content-center q-col-gutter-sm">
                          <div class="col-1 text-left">
                            {{ i+1 }}
                          </div>

                          <div class="col-2 text-left">
                            {{ item.kode_rs }}
                          </div>

                          <div class="col-4 text-left">
                            {{ item.barangrs.nama }}
                          </div>

                          <div class="col-1 text-left">
                            {{ item.satuan?item.satuan.nama:'-' }}
                          </div>

                          <div class="col-1 text-right">
                            {{ item.jumlah }}
                          </div>

                          <div class="col-1 text-right">
                            <div v-if="row.status >= 5">
                              {{ item.jumlah_disetujui }}
                            </div>
                            <div v-if="row.status < 5">
                              -
                            </div>
                          </div>

                          <div class="col-2 text-right">
                            <!-- {{ item.jumlah }} -->
                          </div>
                        </div>
                        <q-separator />
                      </div>
                      <div class="fit row no-wrap justify-evenly items-center content-center q-mt-md">
                        <div
                          v-if="ruang==='Depo Habis Pakai'"
                          class="to-print-tt text-center"
                        >
                          <div class="q-mb-xl">
                            Pejabat Pelaksanan Teknik Kegiatan
                          </div>
                          <div class="q-mt-lg text-weight-bold">
                            YULIANA S.A.P
                          </div>
                          <div class="">
                            NIP. 19740304 200801 2 005
                          </div>
                        </div>
                        <!--
                        <div
                          v-if="ruang==='Depo PNM' || ruang==='Depo Gizi'"
                          class="to-print-tt text-center"
                        >
                          <div class="q-mb-xl">
                            Pejabat Pelaksanan Teknik Kegiatan
                          </div>
                          <div class="q-mt-lg text-weight-bold">
                            SUYANI, S.Sos.
                          </div>
                          <div class="">
                            NIP. 19661125 199603 2 003
                          </div>
                        </div>
                        -->
                        <div class="to-print-tt text-center">
                          <div class="q-mb-xl">
                            Petugas Barang
                          </div>
                          <div class="q-mt-lg text-weight-bold">
                            SARWANI
                          </div>
                          <div class="">
                            NIP. 19760311 200801 1 008
                          </div>
                        </div>
                        <div class="to-print-tt text-center">
                          <div class="q-mb-xl">
                            Kepala Bagian / Ka.ru
                          </div>
                          <div class="q-mt-lg text-weight-bold">
                            ...........................
                          </div>
                          <!-- <div class="">
                      NIP. 19740304 200801 2 005
                    </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="fit row no-wrap justify-evenly items-center content-center q-mt-lg">
                      <div class="col-1 text-left">
                        Kode Barang
                      </div>
                      <div class="col-3 text-left">
                        Nama Barang
                      </div>
                      <div class="col-3 text-left">
                        Ruangan
                      </div>
                      <div class="col-1 text-right print-hide">
                        Stok Depo
                      </div>
                      <div class="col-1 text-right">
                        Alokasi
                      </div>
                      <div class="col-1 text-right">
                        Jumlah
                      </div>
                      <div class="col-1 text-right">
                        Jumlah Disetujui
                      </div>
                      <div class="col-1 text-right">
                        Jumlah Distribusi
                      </div>
                    </div>
                    <q-separator />
                    <div
                      v-for="(item, j) in row.details"
                      :key="j"
                    >
                      <div class="fit row no-wrap justify-evenly items-center content-center">
                        <div class="col-1 text-left">
                          {{ item.barangrs.kode }}
                        </div>
                        <div class="col-3 text-left">
                          {{ item.barangrs.nama }}
                        </div>
                        <div class="col-3 text-left">
                          <div v-if="item.ruang">
                            {{ item.ruang.uraian }}
                          </div>
                          <div
                            v-else
                            class="text-yellow bg-red"
                          >
                            Tidak ada ruangan tujuan
                          </div>
                        </div>
                        <div class="col-1 text-right print-hide">
                          {{ item.barangrs.stokDepo }}
                        </div>
                        <div class="col-1 text-right">
                          {{ item.barangrs.alokasi }}
                        </div>
                        <div class="col-1 text-right">
                          {{ item.jumlah }}
                        </div>
                        <div class="col-1 text-right">
                          {{ item.jumlah_disetujui }}
                        </div>
                        <div class="col-1 text-right">
                          <div v-if="row.status >= 5">
                            {{ item.jumlah_disetujui }}
                          </div>
                          <div v-if="row.status < 5">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div
                  v-if="itemIndex!==null"
                >
                  <div
                    v-if="!store.items[itemIndex].disableSend"
                    class="q-mt-sm"
                  >
                    <q-separator />
                    <div class="fit row no-wrap justify-end items-center content-center">
                      <div class="q-mt-sm">
                        <q-btn
                          icon="icon-mat-send"
                          color="primary"
                          flat
                          no-caps
                          dense
                          round
                          @click="distribusikan(store.items[itemIndex])"
                        />
                      </div>
                    </div>
                  </div>
                </div> -->
                  </div>
                </div>
              </div>
            </div>
          </template>
        </app-table-extend>
        <!-- <div class="q-my-md">
          <div
            v-for="(item,i) in store.items"
            :key="i"
          >
            <q-card
              v-if="item.highlight"
            >
              <div class="print">
                <q-btn
                  ref="refPrint"
                  v-print="printObj"
                  unelevated
                  color="dark"
                  round
                  size="sm"
                  icon="icon-mat-print"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print
                  </q-tooltip>
                </q-btn>
              </div>
              <q-card-section
                class="print-only"
              >
                <div id="printMe">
                  <div class="text-center text-weight-bold">
                    TANDA TERIMA PENGAMBILAN BARANG
                  </div>
                  <div class="text-center text-weight-bold">
                    BAHAN HABIS PAKAI
                  </div>
                  <div class="text-center text-weight-bold q-mb-lg">
                    TAHUN {{ date.formatDate(item.tanggal, 'YYYY') }}
                  </div>
                  <div class="row text-left text-weight-bold">
                    <div class="col-3">
                      NAMA RUANGAN
                    </div>
                    <div class="col-7">
                      : {{ item.ruang.uraian }}
                    </div>
                  </div>
                  <div class="row text-left text-weight-bold">
                    <div class="col-3">
                      TANGGAL
                    </div>
                    <div class="col-7">
                      : {{ dateFullFormat(item.tanggal_distribusi) }}
                    </div>
                  </div>
                  <div class="fit row no-wrap justify-evenly items-center content-center q-col-gutter-sm q-mt-lg">
                    <div class="col-1 text-weight-bold text-left">
                      NO
                    </div>

                    <div class="col-2 text-weight-bold text-left">
                      KODE BARANG
                    </div>

                    <div class="col-4 text-weight-bold text-left">
                      NAMA BARANG
                    </div>

                    <div class="col-1 text-weight-bold text-left">
                      SATUAN
                    </div>

                    <div class="col-1 text-weight-bold text-right">
                      JUMLAH MINTA
                    </div>

                    <div class="col-1 text-weight-bold text-right">
                      JUMLAH DIBERI
                    </div>

                    <div class="col-2 text-weight-bold text-right">
                      KETERANGAN
                    </div>
                  </div>
                  <q-separator />
                  <div
                    v-for="(data, j) in item.details"
                    :key="j"
                  >
                    <div class="fit row no-wrap justify-evenly items-center content-center q-col-gutter-sm">
                      <div class="col-1 text-left">
                        {{ j+1 }}
                      </div>

                      <div class="col-2 text-left">
                        {{ data.kode_rs }}
                      </div>

                      <div class="col-4 text-left">
                        {{ data.barangrs.nama }}
                      </div>

                      <div class="col-1 text-left">
                        {{ data.satuan?data.satuan.nama:'-' }}
                      </div>

                      <div class="col-1 text-right">
                        {{ data.jumlah }}
                      </div>

                      <div class="col-1 text-right">
                        <div v-if="store.items[itemIndex]?store.items[itemIndex].status >= 5:false">
                          {{ data.jumlah_disetujui }}
                        </div>
                        <div v-if="itemIndex?store.items[itemIndex].status < 5:false">
                          -
                        </div>
                      </div>

                      <div class="col-2 text-right" />
                    </div>
                    <q-separator />
                  </div>
                  <div class="fit row no-wrap justify-evenly items-center content-center q-mt-md">
                    <div
                      v-if="ruang==='Depo Habis Pakai'"
                      class="to-print-tt text-center"
                    >
                      <div class="q-mb-xl">
                        Pejabat Pelaksanan Teknik Kegiatan
                      </div>
                      <div class="q-mt-lg text-weight-bold">
                        YULIANA S.A.P
                      </div>
                      <div class="">
                        NIP. 19740304 200801 2 005
                      </div>
                    </div>
                    <div
                      v-if="ruang==='Depo PNM' || ruang==='Depo Gizi'"
                      class="to-print-tt text-center"
                    >
                      <div class="q-mb-xl">
                        Pejabat Pelaksanan Teknik Kegiatan
                      </div>
                      <div class="q-mt-lg text-weight-bold">
                        SUYANI, S.Sos.
                      </div>
                      <div class="">
                        NIP. 19661125 199603 2 003
                      </div>
                    </div>
                    <div class="to-print-tt text-center">
                      <div class="q-mb-xl">
                        Petugas Barang
                      </div>
                      <div class="q-mt-lg text-weight-bold">
                        SARWANI
                      </div>
                      <div class="">
                        NIP. 19760311 200801 1 008
                      </div>
                    </div>
                    <div class="to-print-tt text-center">
                      <div class="q-mb-xl">
                        Kepala Bagian / Ka.ru
                      </div>
                      <div class="q-mt-lg text-weight-bold">
                        ...........................
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="fit row no-wrap justify-evenly items-center content-center q-mt-lg">
                  <div class="anak text-left">
                    Kode Barang
                  </div>
                  <div class="anak text-left">
                    Nama Barang
                  </div>
                  <div class="anak text-left">
                    Ruangan
                  </div>
                  <div class="anak text-right print-hide">
                    Stok Depo
                  </div>
                  <div class="anak text-right">
                    Alokasi
                  </div>
                  <div class="anak text-right">
                    Jumlah
                  </div>
                  <div class="anak text-right">
                    Jumlah Disetujui
                  </div>
                  <div class="anak text-right">
                    Jumlah Distribusi
                  </div>
                </div>
                <q-separator />
                <div
                  v-for="(data, j) in item.details"
                  :key="j"
                >
                  <div class="fit row no-wrap justify-evenly items-center content-center">
                    <div class="anak text-left">
                      {{ data.barangrs.kode }}
                    </div>
                    <div class="anak text-left">
                      {{ data.barangrs.nama }}
                    </div>
                    <div class="anak text-left">
                      <div v-if="data.ruang">
                        data.ruang.uraian
                      </div>
                      <div
                        v-else
                        class="text-yellow bg-red"
                      >
                        Tidak ada ruangan tujuan
                      </div>
                    </div>
                    <div class="anak text-right print-hide">
                      {{ data.barangrs.stokDepo }}
                    </div>
                    <div class="anak text-right">
                      {{ data.barangrs.alokasi }}
                    </div>
                    <div class="anak text-right">
                      {{ data.jumlah }}
                    </div>
                    <div class="anak text-right">
                      {{ data.jumlah_disetujui }}
                    </div>
                    <div class="anak text-right">

                      <div v-if="store.items[itemIndex]?store.items[itemIndex].status >= 5:false">
                        {{ data.jumlah_disetujui }}
                      </div>
                      <div v-if="itemIndex?store.items[itemIndex].status < 5:false">
                        -
                      </div>
                    </div>
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </div>
        </div> -->
      </template>
    </app-card>
    <!-- <FormDialog v-model="store.isOpen" /> -->
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { computed, ref } from 'vue'
import { date, Dialog } from 'quasar'
import { dateFullFormat, dateFull } from 'src/modules/formatter'
// import { notifErrVue } from 'src/modules/utils'
import { useTransaksiDistribusiStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusi/distribusi'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
// import FormDialog from './FormDialog.vue'
const store = useTransaksiDistribusiStore()

const apps = useAplikasiStore()

const ruang = computed(() => {
  const depo = apps.user.pegawai.depo ? apps.user.pegawai.depo.nama : false

  return depo
})

const proxyDate = ref(null)
const refDate = ref(null)
const updateProxy = () => {
  // console.log('date', store.form.tanggal)
  // refDate.value.setToday()
  proxyDate.value = store.form.tanggal ? store.form.tanggal : date.formatDate(Date.now(), 'YYYY/MM/DD')
  store.setForm('tanggal', proxyDate.value)
  store.tanggalDisplay = dateFullFormat(proxyDate.value)
}
// date options start ----
const today = new Date()
const lastDay = date.formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'YYYY/MM/DD')
const firstDay = date.formatDate(Date.now(), 'YYYY/MM/01')
function dateOption (val) {
  return val >= firstDay && val <= lastDay
}
// date options end ----

// const itemIndex = ref(null)
store.getInitialData()
const onClick = val => {
  console.log('val', val.item)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
  // store.items.forEach(item => {
  //   delete item.highlight
  // })
  // store.items[val.index].highlight = true
  // itemIndex.value = val.index
  // console.log('item index', val)
  // store.items.splice(val.index, 0, { no_permintaan: 'SPMT/DHP/legnrsvvwwxx6' })
}
const barangSiap = val => {
  store.setForm('id', val.id)
  store.setForm('status', 6)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah barang sudah siap?',
    cancel: true
  }).onOk(() => {
    store.updateStatus()
  })
}
const distribusikan = val => {
  // console.log('distribusikan', val)
  const toNum = val.no_permintaan.split('/')

  store.setForm('no_distribusi', 'RCVD/' + toNum[1] + '/' + toNum[2])
  store.setForm('id', val.id)
  // const enolDetail = val.details.filter(data => {
  //   return data.jumlah_distribusi <= 0
  // })
  // if (enolDetail.length) {
  //   Dialog.create({
  //     title: 'Konfirmasi',
  //     message: 'Ada barang yang distribusinya bernilai 0, Tetap lanjutakan distribusi?',
  //     cancel: true
  //   }).onOk(() => {
  //     store.saveForm()
  //   })
  // } else {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Distribusikan barang terlampir?',
    cancel: true
  }).onOk(() => {
    store.saveForm()
  })
  // }
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'print Dsitribusi',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    printed.value = false
    // changePeriode()
    console.log('closePrint')
  }
}
// let itemsIndex = null
// let detailIndex = null
// const updateJumlahDistribusi = val => {
//   const intVal = parseInt(val)

//   if (store.items[itemsIndex].details[detailIndex].status > 15) return

//   store.items[itemsIndex].details[detailIndex].jumlah_distribusi = intVal
//   const tempItems = store.items[itemsIndex].details.filter(item => {
//     return item.jumlah_distribusi <= 0
//   })
//   console.log('jumlah distribusi', val)

//   if (!tempItems.length) {
//     const habis = store.items[itemsIndex].details.filter(det => { return det.barangrs.alokasi <= 0 })
//     if (!habis.length) {
//       store.items[itemsIndex].disableSend = false
//       store.setForm('detail', store.items[itemsIndex].details)
//     } else {
//       // console.log(habis)
//       habis.forEach(a => {
//         notifErrVue('tidak ada alokasi untuk ' + a.barangrs.nama)
//       })
//     }
//   }

//   if (store.items[itemsIndex].details[detailIndex].jumlah_disetujui < intVal) {
//     store.items[itemsIndex].details[detailIndex].jumlah_distribusi = store.items[itemsIndex].details[detailIndex].jumlah_disetujui
//     notifErrVue('jumlah Distribusi tidak boleh melebihi jumlah distujui')
//     console.log('details item', store.items[itemsIndex].details[detailIndex])
//   } else if (store.items[itemsIndex].details[detailIndex].jumlah_distribusi < 0) {
//     notifErrVue('jumlah Distribusi tidak boleh kurang dari 0')
//     store.items[itemsIndex].details[detailIndex].jumlah_distribusi = 0
//   }
//   console.log('items', tempItems)
// }
// const fokus = (i, j) => {
//   console.log('fokus', i, j)
//   // itemIndex.value = i
//   itemsIndex = i
//   detailIndex = j
//   const current = store.items[i].details[j]
//   console.log('current', current)
// }
const color = val => {
  switch (val) {
    case 99:
      return 'white'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'cyan'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 8:
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  switch (status) {
    case 0:
      return 'Tampilkan semua'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'Menunggu verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'Telah di verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'Barang sudah bisa diambil'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'Telah di distribusikan'
      // eslint-disable-next-line no-unreachable
      break
    case 8:
      return 'Telah di diterima ruangan'
      // eslint-disable-next-line no-unreachable
      break
    case 17:
      return 'Tidak Diambil Ruangan'
      // eslint-disable-next-line no-unreachable
      break
    case 18:
      return 'Invalid'
      // eslint-disable-next-line no-unreachable
      break
    case 19:
      return 'Kadaluarsa'
      // eslint-disable-next-line no-unreachable
      break
    case 20:
      return 'Ditolak'
      // eslint-disable-next-line no-unreachable
      break
    case 99:
      return 'Status belum di filter'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'Belum di definisikan'
      // eslint-disable-next-line no-unreachable
      break
  }
}
</script>

<style lang="scss" scoped>
.anak{
  width:calc(100vw/8);
}
.to-print{
  width:calc(100vw/7);
  margin-left: 3px;
}
.to-print-tt{
  width:calc(100vw/3);
}
.disp{
  width:calc(100vw/9);
}
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
</style>
