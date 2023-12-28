<template>
  <div class="q-mt-sm">
    <q-card>
      <q-card-section>
        <div class="f-12 text-weight-bold">
          Daftar Barang Depo Gizi
        </div>
        <div class="f-10">
          Daftar Barang yang bisa di distribusikan langsung
        </div>
      </q-card-section>
      <q-card-section>
        <app-table
          title="Data stok Barang Rumah sakit"
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
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @delete="store.deletesData"
        >
          <template #col-total_stok>
            <div>Sisa stok</div>
          </template>
          <!-- <template #col-no_penerimaan_stok>
            <div>Nomor Penerimaan</div>
          </template>
          <template #cell-no_penerimaan_stok="{row}">
            <div class="box">
              {{ row.no_penerimaan_stok }}
            </div>
          </template> -->
          <template #col-tanggal>
            <div>Tanggal</div>
          </template>
          <template #col-kode>
            <div>Kode Barang</div>
          </template>
          <template #col-nama>
            <div>Nama Barang</div>
          </template>
          <template #col-jumlah>
            <div style="max-width:5%;">
              di Distribusikan
            </div>
          </template>
          <template #cell-tanggal="{row}">
            <div class="box">
              {{ row.tanggal ? humanDate(row.tanggal):'-' }}
            </div>
            <!-- @focus="inputFokus(row,col)" -->
          </template>
          <template #left-acttion="{row,col}">
            <div
              v-if="row.total_stok>0"
              class="row no-wrap jutify-between"
            >
              <div class="q-mr-xs">
                <app-input
                  ref="distRef"
                  v-model="row.toDistribute"
                  label="input distribusi"
                  valid
                  dense
                  outlined
                  :loading="row.loading"
                  :disable="row.loading"
                  @update:model-value="setJmlDist($event, row)"
                  @keyup.enter="inputBlur(row,col)"
                />
              <!-- @blur="inputBlur(row,col)" -->
                <!-- @focus="inputFokus(row,col)" -->
              </div>
              <div>
                <app-btn
                  label="Distribusikan"
                  :loading="row.loading"
                  @click="inputBlur(row,col)"
                />
              </div>
            </div>
            <div v-else>
              <div class="q-mr-xs">
                sudah habis
              </div>
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { humanDate } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'
import { ref } from 'vue'

const store = useTransaksiDistribusiLangsung()
const emits = defineEmits(['simpanList'])
// function inputFokus(row, col) {
//   console.log('fokus', row, col)
//   console.log('form', store.form)
// }
function setJmlDist(evt, val) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const jml = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  // const jml = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  // console.log(val)
  if (jml > val.total_stok) {
    val.toDistribute = val.total_stok
    notifErrVue('jumlah dsitribusi tidak boleh melebihi jumlah stok')
  } else {
    val.toDistribute = jml
  }
}
const user = useAplikasiStore()
const distRef = ref(null)
function inputBlur(row, col) {
  store.setForm('kode_rs', row.kode)
  store.setForm('kode_satuan', row.kode_satuan)
  store.setForm('jumlah', row.toDistribute)
  store.setForm('status', 2)
  store.setForm('pegawai_id', user?.user?.pegawai?.id)
  // console.log('blur', row, col)
  console.log('indexed', distRef.value.refInput.modelValue)
  console.log('inside', distRef.value.refInput)
  console.log('validate', distRef.value.refInput.validate())

  if (row.toDistribute > 0) {
    distRef.value.refInput.blur()
    emits('simpanList', col)
  }
  // emits('simpanList', { kol: col, refs: distRef.value.$refs.refInput })
}
</script>
<style lang="scss" scoped>
.q-table{
  td{
    .box{

      white-space: normal !important;
      inline-size: 150px;
      overflow-wrap: break-word;
    }
  }
}
</style>
