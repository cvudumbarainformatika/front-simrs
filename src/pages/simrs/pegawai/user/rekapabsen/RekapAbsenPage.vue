
<template>
  <div class="q-px-lg q-pt-md">
    <q-card>
      <q-card-section>
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div
              class="flex flex-column items-center flex-center"
            >
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Rekap Absensi Pegawai
                </div>
                <div class="title-desc">
                  Halaman Rekap Absensi per bulan
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white col-grow">
            <div
              class="flex flex-column items-center flex-center"
            >
              <div class="col text-right q-mr-lg">
                <div class="text-right">
                  <div class="row items-center text-right">
                    <q-btn
                      flat
                      color="grey"
                      round
                      icon="icon-mat-chevron_left"
                      @click="prev"
                    />
                    <div class="q-px-md">
                      {{ namaBulan }} {{ store.params.bulan }}
                    </div>
                    <q-btn
                      flat
                      color="grey"
                      round
                      icon="icon-mat-chevron_right"
                      @click="next"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <LegendComponent :datas="store.kategories" />
      </q-card-section>
      <q-card-section>
        <app-table
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :default-btn="false"
          :ada-tambah="false"
          @goto="store.setPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-nama>
            <div>Nama</div>
          </template>
          <template #col-telat>
            <div>Terlambat</div>
          </template>
          <template #cell-telat="{row}">
            {{ row.telat }} dari {{ row.total }}
            ({{ isNaN( (row.telat/row.total*100).toPrecision(4)) ? 0 : (row.telat/row.total*100).toPrecision(4) }}) %
          </template>
          <template #cell-01="{row}">
            <ChoiceComponent :data="row['01']" />
          </template>
          <template #cell-02="{row}">
            <ChoiceComponent :data="row['02']" />
          </template>
          <template #cell-03="{row}">
            <ChoiceComponent :data="row['03']" />
          </template>
          <template #cell-04="{row}">
            <ChoiceComponent :data="row['04']" />
          </template>
          <template #cell-05="{row}">
            <ChoiceComponent :data="row['05']" />
          </template>
          <template #cell-06="{row}">
            <ChoiceComponent :data="row['06']" />
          </template>
          <template #cell-07="{row}">
            <ChoiceComponent :data="row['07']" />
          </template>
          <template #cell-08="{row}">
            <ChoiceComponent :data="row['08']" />
          </template>
          <template #cell-09="{row}">
            <ChoiceComponent :data="row['09']" />
          </template>
          <template #cell-10="{row}">
            <ChoiceComponent :data="row['10']" />
          </template>
          <template #cell-11="{row}">
            <ChoiceComponent :data="row['11']" />
          </template>
          <template #cell-12="{row}">
            <ChoiceComponent :data="row['12']" />
          </template>
          <template #cell-13="{row}">
            <ChoiceComponent :data="row['13']" />
          </template>
          <template #cell-14="{row}">
            <ChoiceComponent :data="row['14']" />
          </template>
          <template #cell-15="{row}">
            <ChoiceComponent :data="row['15']" />
          </template>
          <template #cell-16="{row}">
            <ChoiceComponent :data="row['16']" />
          </template>
          <template #cell-17="{row}">
            <ChoiceComponent :data="row['17']" />
          </template>
          <template #cell-18="{row}">
            <ChoiceComponent :data="row['18']" />
          </template>
          <template #cell-19="{row}">
            <ChoiceComponent :data="row['19']" />
          </template>
          <template #cell-20="{row}">
            <ChoiceComponent :data="row['20']" />
          </template>
          <template #cell-21="{row}">
            <ChoiceComponent :data="row['21']" />
          </template>
          <template #cell-22="{row}">
            <ChoiceComponent :data="row['22']" />
          </template>
          <template #cell-23="{row}">
            <ChoiceComponent :data="row['23']" />
          </template>
          <template #cell-24="{row}">
            <ChoiceComponent :data="row['24']" />
          </template>
          <template #cell-25="{row}">
            <ChoiceComponent :data="row['25']" />
          </template>
          <template #cell-26="{row}">
            <ChoiceComponent :data="row['26']" />
          </template>
          <template #cell-27="{row}">
            <ChoiceComponent :data="row['27']" />
          </template>
          <template #cell-28="{row}">
            <ChoiceComponent :data="row['28']" />
          </template>
          <template #cell-29="{row}">
            <ChoiceComponent :data="row['29']" />
          </template>
          <template #cell-30="{row}">
            <ChoiceComponent :data="row['30']" />
          </template>
          <template #cell-31="{row}">
            <ChoiceComponent :data="row['31']" />
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { daysInMonth } from 'src/modules/utils'
import { useRekapAbsensiPegawaiStore } from 'src/stores/simrs/pegawai/user/rekapabsen/rekapabsen'
import { computed } from 'vue'
import ChoiceComponent from './ChoiceComponent.vue'
import LegendComponent from './LegendComponent.vue'

const store = useRekapAbsensiPegawaiStore()
store.getInitialData()

const namaBulan = computed(() => {
  return store.bulan[store.params.bulan - 1]
})
let num = store.params.bulan

const prev = () => {
  console.log('prev', num)
  console.log('jumlah hari', daysInMonth(store.params.bulan, store.params.tahun))
  if (num <= 1) {
    num = 12
  } else {
    num = num - 1
  }
  store.setParam('bulan', num)
}
const next = () => {
  console.log('next', num)
  console.log('jumlah hari', daysInMonth(store.params.bulan, store.params.tahun))
  if (num >= 12) {
    num = 1
  } else {
    num = num + 1
  }
  store.setParam('bulan', num)
}
</script>
