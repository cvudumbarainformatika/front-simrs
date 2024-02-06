<template>
  <div
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
  </div>
  <div class="q-mt-xl q-mx-sm">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.nopemesanan"
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
      <template #col-nopemesanan>
        <div>Nomor Pemesanan</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #cell-penyedia="{row}">
        <div>{{ row.pihakketiga? row.pihakketiga.nama:'-' }}</div>
      </template>
      <template #cell-tgl="{row}">
        <div>{{ row.tgl_pemesanan? dateFullFormat( row.tgl_pemesanan) : '-' }}</div>
      </template>
      <template #expand="{row}">
        <div v-if="row.rinci.length">
          <div class="row items-center text-weight-bold">
            <div class="col-4">
              Obat
            </div>
            <div class="col-4">
              <div class="row justify-center">
                Stok
              </div>
              <q-separator />
              <div class="row">
                <div class="col-4">
                  Gudang
                </div>
                <div class="col-4">
                  Rs
                </div>
                <div class="col-4">
                  Max
                </div>
              </div>
            </div>
            <div class="col-2">
              Jumlah Bisa di beli
            </div>
            <div class="col-2">
              Jumlah Dipesan
            </div>
          </div>
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center anu">
              <div class="col-4">
                <div
                  class="row"
                  style="white-space: normal;"
                >
                  {{ rin?.masterobat?.nama_obat }}
                </div>
                <div class="row text-italic f-8">
                  {{ rin.kdobat }}
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col-4">
                    {{ rin.stok_real_gudang }}
                  </div>
                  <div class="col-4">
                    {{ rin.stok_real_rs }}
                  </div>
                  <div class="col-4">
                    {{ rin.stok_max_rs }}
                  </div>
                </div>
                <!-- <div class="col-1">
              </div>
              <div class="col-2">
              </div>
              <div class="col-2">
              </div> -->
              </div>
              <div class="col-2">
                {{ rin.jumlah_bisa_dibeli }}
              </div>
              <div class="col-2">
                {{ rin.jumlahdpesan }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{row}">
        <div v-if="!row.flag">
          <q-btn
            class="q-mr-md"
            push
            icon="icon-mat-cancel"
            dense
            label="Batal"
            no-caps
            color="negative"
            :loading="pemesanan.loading && row.nopemesanan === toloadBeli"
            @click="batal(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Batalkan Pesanan
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="pemesanan.loading && row.nopemesanan === toloadBeli"
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
import { useStyledStore } from 'src/stores/app/styled'
import { useListPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listpesanan'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { ref } from 'vue'

const style = useStyledStore()
const store = useListPemesananStore()
const pemesanan = usePemesananObatStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Pembelian nomor ' + val.nopemesanan + ' Sudah dikunci dan dapat dilakukan Penerimaan')
}
const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.nopemesanan
  pemesanan.kunci(val.nopemesanan).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}
function batal (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.nopemesanan
  console.log('batal', val)
  pemesanan.batal(val.nopemesanan).then(() => {
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
