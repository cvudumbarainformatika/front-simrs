<template>
  <q-page class="q-pa-sm">
    <div class="container q-pl-sm q-pr-sm">
      <div class="q-card q-mt-sm q-mt-ms">
        <q-card class="q-pa-xs">
          <div class="row bg-primary text-white q-pa-sm q-mb-xs q-mt-xs">
            <div class="f-14 text-weight-bold">
              Sisa Lebih Anggaran | SIASIK
            </div>
          </div>
        </q-card>
      </div>
      <div class="q-card q-mt-sm">
        <q-card class="q-pa-xs">
          <div class="row justify-center q-pa-sm q-mb-xs q-mt-xs">
            <div class="col-14">
              <div class="row justify-center text-h6 text-weight-bold">
                Transaksi Sisa Lebih Anggaran
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div class="q-card q-mt-sm">
        <app-card :is-header="false">
          <template #content>
            <app-table
              title="Data SILPA"
              :columns="store.columns"
              :items="store.items"
              :meta="store.meta"
              :per-page="store.params.per_page"
              :order-by="store.params.order_by"
              :sort="store.params.sort"
              :loading="store.loading"
              :to-search="store.params.q"
              @goto="store.setPage"
              @set-row="store.setPerPage"
              @refresh="store.refreshTable"
              @find="store.setSearch"
              @set-order="store.setOder"
              @new-data="table.newData"
              @edit-data="table.editData"
              @delete="store.deletesData"
            >
              <template #col-notrans>
                <div style="width: 200px;">
                  Nomor Transaksi
                </div>
              </template>
              <template #col-tanggal>
                <div style="width: 100px;">
                  Tanggal
                </div>
              </template>
              <template #col-koderek50>
                <div style="width: 200px;">
                  Kode Rekening
                </div>
              </template>
              <template #col-uraian50>
                <div style="width: 300px">
                  Uraian
                </div>
              </template>
              <template #col-nominal>
                <div>Nilai Silpa</div>
              </template>
              <template #cell-tanggal="{ row }">
                <div class="text-center">
                  {{ (row.tanggal) }}
                </div>
              </template>
              <template #cell-koderek50="{ row }">
                <div class="text-center">
                  {{ (row.koderek50) }}
                </div>
              </template>
              <template #cell-nominal="{ row }">
                <div class="text-right">
                  {{ formattanpaRp(row.nominal) }}
                </div>
              </template>
            </app-table>
          </template>
        </app-card>
      </div>
      <formInput v-model="table.isOpen" />
    </div>
  </q-page>
</template>
<script setup>
import { storeSisaAnggaran } from 'src/stores/siasik/transaksi/saldo/pembiayaan/silpa'
import { useFormSilpa } from 'src/stores/siasik/transaksi/saldo/pembiayaan/formsilpa'
import formInput from './inpage/FormInputSilpa.vue'
import { formattanpaRp } from 'src/modules/formatter'
import { onMounted } from 'vue'

const table = useFormSilpa()
const store = storeSisaAnggaran()

store.getDataTable()
// table.deletesData()
// onMounted(() => {
//   store.getRekeningBlud();
// });
// function onSimpan() {
//   // console.log('simpan')
//   store.simpanSaldo().then(() => {
//     store.emptyForm();
//   });
// }
onMounted(() => {})
</script>
