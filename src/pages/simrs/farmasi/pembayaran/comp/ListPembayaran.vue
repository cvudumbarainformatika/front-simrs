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
      <template #col-no_bast>
        <div>Nomor</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-tanggal>
        <div>Tanggal Pembayaran</div>
      </template>
      <template #col-total>
        <div>Total</div>
      </template>
      <template #col-oleh>
        <div>Oleh</div>
      </template>
      <template #cell-no_bast="{ row }">
        <div
          v-if="row.nomor"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs text-blue">
            Pemesanan
          </div>
          <div class="box text-right">
            {{ row.nomor }}
          </div>
        </div>
        <div
          v-if="row.no_penerimaan"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs text-cyan">
            Penerimaan
          </div>
          <div class="box text-right">
            {{ row.no_penerimaan }}
          </div>
        </div>
        <div
          v-if="row.no_bast"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs text-teal">
            Kwitansi
          </div>
          <div class="box text-right">
            {{ row.no_bast }}
          </div>
        </div>
        <div
          v-if="row.no_kwitansi"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs text-teal">
            Kwitansi
          </div>
          <div class="box text-right">
            {{ row.no_kwitansi }}
          </div>
        </div>
        <div
          v-if="row.no_pembayaran"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs text-teal">
            Pembayaran
          </div>
          <div class="box text-right">
            {{ row.no_pembayaran }}
          </div>
        </div>
      </template>
      <template #cell-tanggal="{ row }">
        <div
          v-if="row.tanggal"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          {{ row.tanggal_bast?dateFullFormat(row.tanggal_bast):dateFullFormat(row.tanggal) }}
          <!-- <div class="q-mr-xs">
            Penerimaan
          </div>
          <div class="text-weight-bold">
          </div> -->
        </div>
        <div
          v-if="row.tanggal_faktur"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Faktur
          </div>
          <div class="text-weight-bold">
            {{ dateFullFormat(row.tanggal_faktur) }}
          </div>
        </div>
        <div
          v-if="row.tanggal_surat"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Surat Jalan
          </div>
          <div class=" text-weight-bold">
            {{ dateFullFormat(row.tanggal_surat) }}
          </div>
        </div>
        <div
          v-if="row.tanggal_bast"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            BAST
          </div>
          <div class=" text-weight-bold">
            {{ dateFullFormat(row.tanggal_bast) }}
          </div>
        </div>
        <div
          v-if="row.tanggal_serahterima"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            serah terima
          </div>
          <div class=" text-weight-bold">
            {{ dateFullFormat(row.tanggal_serahterima) }}
          </div>
        </div>
        <div
          v-if="row.tanggal_pembayaran"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Pembayaran
          </div>
          <div class=" text-weight-bold">
            {{ dateFullFormat(row.tanggal_pembayaran) }}
          </div>
        </div>
      </template>
      <template #cell-info="{ row }">
        <div
          v-if="row.perusahaan"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Penyedia
          </div>
          <div class=" text-weight-bold">
            {{ row.perusahaan.nama }}
          </div>
        </div>
        <div
          v-if="row.pengirim"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Pengirim
          </div>
          <div class=" text-weight-bold">
            {{ row.pengirim }}
          </div>
        </div>
        <div
          v-if="row.surat_jalan"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            No. Surat Jalan
          </div>
          <div class=" text-weight-bold">
            {{ row.surat_jalan }}
          </div>
        </div>
        <div
          v-if="row.faktur"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            No. Faktur
          </div>
          <div class=" text-weight-bold">
            {{ row.faktur }}
          </div>
        </div>
      </template>
      <template #cell-total="{ row }">
        <div class="text-right text-weight-bold">
          {{ formatRpDouble( row.totalSemua,2) }}
        </div>
        <div
          v-if="row.total"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Total
          </div>
          <div class="text-weight-bold text-primary">
            {{ formatRpDouble( row.total,2) }}
          </div>
        </div>
        <div
          v-if="row.nilai_tagihan"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Tagihan
          </div>
          <div class="text-weight-bold text-deep-orange">
            {{ formatRpDouble( row.nilai_tagihan,2) }}
          </div>
        </div>
        <div
          v-if="row.nilai_pembayaran"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Pembayaran
          </div>
          <div class="text-weight-bold text-green">
            {{ formatRpDouble( row.nilai_pembayaran,2) }}
          </div>
        </div>
      </template>
      <template #cell-oleh="{ row }">
        <div
          v-if="row.terima"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Diterima
          </div>
          <div class="box2 text-right text-weight-bold text-primary">
            {{ row.terima.nama }}
          </div>
        </div>
        <div
          v-if="row.bast"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            BAST
          </div>
          <div class="box2 text-right text-weight-bold text-deep-orange">
            {{ row.bast.nama }}
          </div>
        </div>
        <div
          v-if="row.bayar"
          class="row no-wrap justify-between items-center q-mb-xs"
        >
          <div class="q-mr-xs">
            Pembayaran
          </div>
          <div class="box text-right text-weight-bold text-green">
            {{ row.bayar.nama }}
          </div>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.penerimaan.length">
          <div
            v-for="(trm,n) in row.penerimaan"
            :key="n"
            class=" "
          >
            <div
              class="row no-wrap terima q-mb-xs cursor-pointer"
              @click="trm.disp = !trm.disp"
            >
              <div class="col-12">
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    No Penerimaan
                  </div>
                  <div class="text-weight-bold">
                    {{ trm.nopenerimaan }}
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    Tanggal Penerimaan
                  </div>
                  <div class="text-weight-bold">
                    {{ dateFullFormat(trm.tglpenerimaan) }}
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    Subtotal Penerimaan
                  </div>
                  <div
                    class="text-weight-bold"
                  >
                    {{ formatRpDouble(trm?.subtotal_terima,2) }}
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    Nilai Retur
                  </div>
                  <div class="text-weight-bold">
                    {{ formatRpDouble(trm?.nilai_retur,2) }}
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    Subtotal Setelah Retur
                  </div>
                  <div class="text-weight-bold">
                    {{ formatRpDouble(trm?.subtotal_bast,2) }}
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs">
                  <div class="col-2">
                    Nilai Tagihan
                  </div>
                  <div class="text-weight-bold">
                    {{ formatRpDouble(trm?.nilai_pembayaran,2) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="trm.penerimaanrinci.length && trm.disp">
              <div
                v-for="(det,i) in trm.penerimaanrinci"
                :key="i"
                class="row no-wrap q-mb-xs anu"
              >
                <div class="">
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Kode RS
                    </div>
                    <div class="text-weight-bold">
                      {{ det.kode_rs }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Kode 108
                    </div>
                    <div class="text-weight-bold">
                      {{ det.kode_108 }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between q-mt-xs anudua ">
                    <div class="q-mr-xs">
                      Kode 50
                    </div>
                    <div class="text-weight-bold">
                      {{ det.kode_50 }}
                    </div>
                  </div>
                </div>
                <div class="q-ml-md">
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Nama
                    </div>
                    <div class="text-weight-bold box text-right">
                      {{ det.nama_barang }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-mt-xs anudua">
                    <div class="q-mr-xs">
                      uraian 108
                    </div>
                    <div class="text-weight-bold box text-right">
                      {{ det.uraian_108 }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-mt-xs anudua">
                    <div class="q-mr-xs">
                      uraian 50
                    </div>
                    <div class="text-weight-bold box text-right">
                      {{ det.uraian_50 }}
                    </div>
                  </div>
                  <div
                    v-if="det.merk"
                    class="row no-wrap justify-between items-center q-mt-xs anudua"
                  >
                    <div class="q-mr-xs">
                      Merk
                    </div>
                    <div class="text-weight-bold box text-right">
                      {{ det.merk }}
                    </div>
                  </div>
                </div>
                <div class="q-ml-md">
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Jumlah
                    </div>
                    <div class="text-weight-bold">
                      {{ det.qty }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Satuan
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ det.satuan?det.satuan.nama:'-' }}
                    </div>
                  </div>
                  <div
                    v-if="det.satuan_kecil"
                    class="row no-wrap justify-between items-center q-mt-xs anudua"
                  >
                    <div class="q-mr-xs">
                      satuan kecil
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ det.satuan_kecil }}
                    </div>
                  </div>
                </div>
                <div class="q-ml-md">
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Harga
                    </div>
                    <div class="text-weight-bold">
                      {{ formatRpDouble(det.harga,2) }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-mt-xs anudua">
                    <div class="q-mr-xs">
                      diskon
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ det.diskon }}
                    </div>
                  </div>
                  <div
                    class="row no-wrap justify-between items-center q-mt-xs anudua"
                  >
                    <div class="q-mr-xs">
                      PPN
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ det.ppn }}
                    </div>
                  </div>
                </div>
                <div class="q-ml-md">
                  <div class="row no-wrap justify-between q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Harga Kontrak
                    </div>
                    <div class="text-weight-bold">
                      {{ formatRpDouble(det.harga_kontrak,2) }}
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-mt-xs anudua">
                    <div class="q-mr-xs">
                      Harga Jadi
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ formatRpDouble(det.harga_jadi,2) }}
                    </div>
                  </div>
                  <div
                    class="row no-wrap justify-between items-center q-mt-xs anudua"
                  >
                    <div class="q-mr-xs">
                      Subtotal
                    </div>
                    <div class="text-weight-bold text-right">
                      {{ formatRpDouble(det.sub_total,2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { useListPembayaranPenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/pembayaran/list'

const store = useListPembayaranPenerimaanFarmasiStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
store.getInitialData()
</script>
<style scoped>

.box {
  white-space: normal !important;
    inline-size: 400px;
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
