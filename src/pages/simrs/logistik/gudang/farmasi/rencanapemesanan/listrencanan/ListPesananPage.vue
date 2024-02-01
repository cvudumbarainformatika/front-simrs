<template>
  <!-- <div
    class="fixed-top row items-center justify-end q-mr-sm"
    style="z-index: 10;"
  >
    <div>
      <q-btn
        flat
        :icon="!style.componentfull?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull?'green':'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div> -->
  <div class="q-mx-sm">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.no_rencbeliobat"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-no_rencbeliobat>
        <div>Nomor Rencana Beli</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #cell-tgl="{row}">
        <div>{{ row.tgl? dateFullFormat( row.tgl) : '-' }}</div>
      </template>
      <template #expand="{row}">
        <div v-if="row.rincian.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3">
              Obat
            </div>
            <div class="col-6">
              <div class="row justify-center">
                Stok
              </div>
              <div class="row">
                <!-- <div class="col-4">
                  Stok Gudang
                </div> -->
                <div class="col-4">
                  Stok RS
                </div>
                <div class="col-4">
                  Stok Max
                </div>
              </div>
            </div>
            <div class="col-2">
              Rencana Beli
            </div>
            <div class="col-1 text-right">
              <div class="q-mr-sm">
                #
              </div>
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rincian"
            :key="i"
          >
            <div class="row items-center anu">
              <div class="col-3">
                <div
                  class="row"
                  style="white-space: normal;"
                >
                  {{ rin?.mobat?.nama_obat }}
                </div>
                <div class="row text-italic f-8">
                  {{ rin.kdobat }}
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <!-- <div class="col-4">
                    {{ rin.stok_real_gudang }}
                  </div> -->
                  <div class="col-4">
                    {{ rin.stok_real_rs }}
                  </div>
                  <div class="col-4">
                    {{ rin.stok_max_rs }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div v-if="!rin.edit">
                  {{ rin.jumlahdirencanakan }}
                </div>
                <div v-if="rin.edit">
                  <q-input
                    v-model="rin.jumlahdirencanakan"
                    label="Jumlah Direncanakan"
                    dense
                    standout="bg-yellow-3"
                    outlined
                  />
                </div>
              </div>
              <div class="col-1 text-right">
                <div class="q-mr-sm">
                  <q-btn
                    v-if="!rin.edit"
                    round
                    flat
                    icon="icon-mat-edit"
                    size="sm"
                    color="primary"
                    @click="store.setEdit(row,rin)"
                  >
                    <q-tooltip
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="rin.edit"
                    round
                    flat
                    icon="icon-mat-save"
                    size="sm"
                    color="primary"
                    @click="store.simpan(row,rin)"
                  >
                    <q-tooltip
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      simpan
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-separator />
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{row}">
        <div v-if="!row.flag">
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="rencana.loading && row.no_rencbeliobat=== toloadBeli"
            @click="kunci(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Rencana Pemesanan sudah selesai dan siap di kunci
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.flag">
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
              Rencana Pemesanan sudah di kunci
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifSuccessVue } from 'src/modules/utils'
// import { useStyledStore } from 'src/stores/app/styled'
import { useListRencanaPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listrencana'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { ref } from 'vue'

// const style = useStyledStore()
const store = useListRencanaPemesananStore()
const rencana = useRencanaPemesananObatStore()
// click
function onClick (val) {
  console.log(val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function info(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Rencana Pembelian nomor ' + val.no_rencbeliobat + ' Sudah dikunci dan dapat dilakukan Pemesanan')
}
const toloadBeli = ref('')
function kunci(val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_rencbeliobat
  rencana.kunci(val.no_rencbeliobat).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}
store.getInitialData()
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
