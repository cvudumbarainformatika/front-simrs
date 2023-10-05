<template>
  <app-table-extend
    :columns="store.columns"
    :column-hide="store.columnHide"
    :items="store.items"
    :meta="store.meta"
    :per-page="store.params.per_page"
    :loading="store.loading"
    :to-search="store.params.q"
    :click-able="true"
    :default-btn="false"
    :ada-tambah="false"
    :ada-filter="false"
    row-no
    @find="store.setSearch"
    @goto="store.setPage"
    @set-row="store.setPerPage"
    @refresh="store.refreshTable"
    @on-click="onClick"
  >
    <template #col-no_distribusi>
      <div>Nomor Distribsi</div>
    </template>
    <template #col-tanggal>
      <div>Tanggal</div>
    </template>
    <template #col-tujuan>
      <div>Tujuan</div>
    </template>
    <template #col-pegawai>
      <div>Dibuat oleh</div>
    </template>
    <template #cell-tanggal="{row}">
      <div>{{ dateFullFormat(row.tanggal) }}</div>
    </template>
    <template #cell-tujuan="{row}">
      <div>{{ row.tujuan.uraian }}</div>
    </template>
    <template #cell-pegawai="{row}">
      <div>{{ row.pegawai.nama }}</div>
    </template>
    <template #expand="{row}">
      <div v-if="row.details.length">
        <div class="row no-wrap text-weight-bold">
          <div class="col-3">
            <div class="row">
              <div class="col-2">
                No
              </div>
              <div class="col-10">
                Kode
              </div>
            </div>
          </div>
          <div class="col-3">
            Nama
          </div>
          <div class="col-2">
            Tipe
          </div>
          <div class="col-2">
            Jumlah
          </div>
          <div class="col-1">
            Satuan
          </div>
        </div>
        <div
          v-for="(det,i) in row.details"
          :key="i"
          class="row no-wrap anu"
        >
          <div class="col-3">
            <div class="row">
              <div class="col-2">
                {{ i+1 }}
              </div>
              <div class="col-10">
                {{ det.kode_rs }}
              </div>
            </div>
          </div>
          <div class="col-3">
            {{ det.barang?.nama }}
          </div>
          <div class="col-2">
            {{ det.barang?.tipe }}
          </div>
          <div class="col-2">
            {{ det.total }}
          </div>
          <div class="col-1">
            {{ det.barang?.satuan?.nama }}
          </div>
        </div>
      </div>
      <div v-if="!row.details.length">
        tidak ada Detail
      </div>
    </template>
  </app-table-extend>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useListTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/listdistibusi'

const store = useListTransaksiDistribusiLangsung()
store.getInitialData()

function onClick (val) {
  console.log(val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
</script>
<style lang="scss" scoped>
.anu{
  padding-top:2px;
  padding-bottom:2px;
}
.anu:hover{
  background-color: #87e9df;
}
</style>
