<template>
  <div>
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.q"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      use-full
      row-no
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-nomor>
        <div>Nomor</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-tanggal>
        <div>Tanggal</div>
      </template>
      <template #col-gud>
        <div>Gudang</div>
      </template>
      <template #cell-nomor="{ row }">
        <div
          v-if="!!row.no_retur"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs ">
            Nomor Retur
          </div>
          <div class="box text-right text-italic ">
            {{ row.no_retur }}
          </div>
        </div>
        <div
          v-if="!!row.no_faktur_retur_pbf"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs ">
            Nomor Faktur Retur PBF
          </div>
          <div class="box text-right text-italic">
            {{ row.no_faktur_retur_pbf }}
          </div>
        </div>
        <div
          v-if="!!row.no_kwitansi_pembayaran"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs ">
            Nomor Kwitansi Pembayaran
          </div>
          <div class="box text-right text-italic">
            {{ row.no_kwitansi_pembayaran }}
          </div>
        </div>
      </template>
      <template #cell-tanggal="{ row }">
        <div
          v-if="row.tgl_retur"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs">
            Retur
          </div>
          <div class="text-weight-bold">
            {{ dateFullFormat(row.tgl_retur) }}
          </div>
        </div>
        <div
          v-if="row.tgl_faktur_retur_pbf"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs">
            Faktur Retur PBF
          </div>
          <div class="text-weight-bold">
            {{ dateFullFormat(row.tgl_faktur_retur_pbf) }}
          </div>
        </div>
        <div
          v-if="row.tgl_kwitansi_pembayaran"
          class="row no-wrap justify-between items-center q-mb-xs"
          style="white-space: none;"
        >
          <div class="q-mr-xs">
            Kwitansi Pembayaran
          </div>
          <div class="text-weight-bold">
            {{ dateFullFormat(row.tgl_kwitansi_pembayaran) }}
          </div>
        </div>
      </template>
      <template #cell-gud="{ row }">
        {{ row?.gudang?.nama }}
      </template>
      <template #cell-penyedia="{ row }">
        {{ row?.penyedia?.nama }}
      </template>
      <template #left-acttion="{ row }">
        <div
          v-if="!row.kunci"
          class="row items-center"
        >
          <q-btn
            flat
            icon="icon-mat-delete"
            dense
            size="sm"
            color="negative"
            :loading="row.loading"
            :disable="row.loading"
            @click="store.deleteHeader(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Hapus
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="row.loadingKunci"
            :disable="row.loadingKunci"
            @click="kunci(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Kunci Retur dan Kurangi Stok
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.kunci">
          <div class="row items-center">
            <div>
              <q-btn
                round
                icon="icon-mat-print"
                dense
                color="dark"
                size="sm"
                @click="toPrint(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
            </div>
            <q-btn
              flat
              icon="icon-mat-lock"
              dense
              color="negative"
              @click="info(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Retur sudah di kunci
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="!row.rinci.length">
          <app-no-data-small />
        </div>
        <div v-if="row.rinci.length">
          <div class="row bg-dark text-white q-pa-xs q-mb-sm">
            <div
              class="col-auto"
              style="width:5%"
            >
              No
            </div>

            <div
              class="col-auto anak"
            >
              Nama Barang
            </div>
            <div
              class="col-auto anak"
            >
              Kondisi Barang
            </div>
            <div
              class="col-auto anak"
            >
              Nomor Penerimaan
            </div>
            <div
              class="col-auto anak"
            >
              Tanggal Kadalwarsa
            </div>

            <div
              class="col-auto anak text-right"
            >
              Jumlah Retur
            </div>
            <div
              class="col-auto anak text-right"
            >
              Nilai Retur
            </div>
            <div
              class="col-auto text-right"
              style="width:5%"
            >
              #
            </div>
          </div>
          <div
            v-for="(trm,n) in row.rinci"
            :key="n"
            class=" "
          >
            <div class="row items-center q-col-gutter-sm q-mb-sm">
              <div
                class="col-auto"
                style="width:5%"
              >
                {{ n+1 }}
              </div>

              <div
                class="col-auto anak"
              >
                <div class="namaobat">
                  {{ trm?.mobatnew?.nama_obat }}
                </div>
                <div class="text-italic f-10">
                  ({{ trm?.mobatnew?.satuan_k }})
                </div>
              </div>
              <div
                class="col-auto anak"
              >
                {{ trm?.kondisi_barang }}
              </div>
              <div
                class="col-auto anak"
              >
                {{ trm?.nopenerimaan }}
              </div>
              <div
                class="col-auto anak"
              >
                {{ dateFullFormat(trm?.tgl_exp) }}
              </div>

              <div
                class="col-auto anak text-right"
              >
                {{ trm?.jumlah_retur }}
              </div>
              <div
                class="col-auto anak text-right"
              >
                {{ formatRpDouble(trm?.subtotal,2) }}
              </div>
              <div
                class="col-auto text-right"
                style="width:5%"
              >
                <q-btn
                  v-if="!row.kunci"
                  flat
                  icon="icon-mat-delete"
                  dense
                  size="sm"
                  color="negative"
                  :loading=" trm.loading"
                  @click="store.deleteRinci(trm)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Hapus
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
  <app-print-surat
    ref="dialogPrint"
    v-model="store.isOpen"
    :tanggal="store.dataToPrint?.flag==='1'?store.dataToPrint?.tgl_retur:store.dataToPrint?.tgl_retur"
    @close="store.isOpen=false"
  >
    <template #isi>
      <!-- Top words -->
      <div
        class="row justify-center q-mt-md f-16 text-weight-bold"
      >
        DATA RETUR
      </div>

      <div
        class="row justify-center q-mb-sm"
      >
        <div class="col-2">
          Tanggal Retur
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ dateFullFormat(store.dataToPrint?.tgl_retur) }}
        </div>
      </div>
      <div class="row justify-center q-mb-sm">
        <div class="col-2">
          No. Retur
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ store.dataToPrint?.no_retur }}
        </div>
      </div>
      <div
        v-if="store.dataToPrint?.tgl_kwitansi_pembayaran"
        class="row justify-center q-mb-sm"
      >
        <div class="col-2">
          Tanggal Kwitansi Pembayaran
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ dateFullFormat(store.dataToPrint?.tgl_kwitansi_pembayaran) }}
        </div>
      </div>
      <div
        v-if="!!store.dataToPrint?.no_kwitansi_pembayaran"
        class="row justify-center q-mb-sm"
      >
        <div class="col-2">
          No. Kwitansi Pembayaran
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ store.dataToPrint?.no_kwitansi_pembayaran }}
        </div>
      </div>

      <div
        class="row justify-start q-mb-md"
      >
        <p>
          Telah dikembalikan ke
          <span class="text-weight-bold">
            {{ store.dataToPrint?.penyedia?store.dataToPrint?.penyedia.nama:'-' }}
          </span> barang dalam list dibawah ini :
        </p>
      </div>

      <!-- no details -->
      <div v-if="!store.dataToPrint?.rinci">
        <app-no-data />
      </div>
      <!-- details -->
      <div v-if="store.dataToPrint?.rinci">
        <!-- header detail -->
        <div class="row justify-between q-col-gutter-sm">
          <div class="col-5 text-weight-bold border-tb border-left">
            Nama Barang
          </div>
          <div class="col-1 text-weight-bold border-tb border-left">
            Jumlah
          </div>
          <div class="col-2 text-weight-bold border-tb border-left">
            Satuan
          </div>
          <div class="col-4 text-weight-bold border-box">
            Keterangan
          </div>
        </div>
        <!-- body details -->
        <div
          v-for="(det, i) in store.dataToPrint?.rinci"
          :key="i"
        >
          <div
            class="row justify-between q-col-gutter-sm"
          >
            <div class="col-5 border-bottom border-left">
              {{ i+1 }}. {{ det.mobatnew?det.mobatnew.nama_obat:'Nama barang tidak ditemukan' }}
            </div>
            <div
              class="col-1 border-bottom border-left"
            >
              {{ det.jumlah_retur===null?0:det.jumlah_retur }}
            </div>
            <div
              class="col-2 border-bottom border-left"
            >
              {{ det.mobatnew?det.mobatnew.satuan_k:'-' }}
            </div>
            <div class="col-4 border-bottom border-left border-right">
              <div class="print-only">
                {{ det?.keterangan??'-' }}
              </div>
              <div class="print-hide">
                <app-input
                  v-model="det.keterangan"
                  label="keterangan"
                  outlined
                  valid
                />
              </div>
            </div>
          </div>
          <q-separator />
        </div>
      </div>
    </template>
  </app-print-surat>
</template>
<script setup>
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { notifSuccessVue } from 'src/modules/utils'
import { useListReturPenyediaStore } from 'src/stores/simrs/farmasi/gudang/list'

const store = useListReturPenyediaStore()

function toPrint(val) {
  store.dataToPrint = val
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.isOpen = true
}
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.kunci(val).then(() => {
    if (!val.kunci) val.kunci = '1'
  })
}
function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Retur nomor ' + val.nopenerimaan + ' Sudah dikunci dan Stok sudah berkurang')
}
store.getInitialData()
</script>
<style scoped>
.namaobat{
  /* inline-size: 200px; */
  overflow-wrap: break-word;
}
.anak{
  white-space: normal !important;
  width:calc(90% / 6);
  overflow-wrap: break-word;
}
.box {
  white-space: normal !important;
    inline-size: 200px;
    overflow-wrap: break-word;
}
.box2 {
  white-space: normal !important;
    inline-size: 150px;
    overflow-wrap: break-word;
}
.terima{
  background-color: rgba(120, 231, 51, 0.549);
}
.anu:hover{
  background-color: rgba(166, 173, 144, 0.548);
}
.anudua:hover{
  background-color: rgb(54, 196, 231);
}
</style>
