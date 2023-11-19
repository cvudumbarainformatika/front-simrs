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
                  Laporan Absensi Pegawai
                </div>
                <div class="title-desc">
                  Halaman Laporan Absensi per bulan
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
                      :disable="store.loading"
                      :loading="store.loading"
                      @click="prev"
                    />
                    <div class="q-px-md cursor-pointer">
                      <div class="fit row  justify-evenly">
                        {{ namaBulan }}
                      </div>
                      <div class="fit row  justify-evenly">
                        {{ store.params.tahun }}
                      </div>
                      <q-menu
                        transition-show="flip-right"
                        transition-hide="flip-left"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="fit row no-wrap justify-evenly items-center content-center">
                              <div>
                                <app-autocomplete
                                  v-model="monthSelected"
                                  autocomplete="nama"
                                  option-label="nama"
                                  option-value="value"
                                  :source="months"
                                  label="Pilih bulan"
                                />
                              </div>
                              <div>
                                <app-autocomplete
                                  v-model="yearSelected"
                                  :source="years"
                                  label="Pilih tahun"
                                />
                              </div>
                            </div>
                          </q-card-section>
                          <q-card-actions align="right">
                            <app-btn
                              v-close-popup
                              label="cancel"
                              class="q-mr-sm"
                              color="dark"
                            />
                            <app-btn
                              v-close-popup
                              label="submit"
                              class="q-mr-sm"
                              color="primary"
                              :loading="store.loading"
                              @click="submit"
                            />
                          </q-card-actions>
                        </q-card>
                      </q-menu>
                    </div>
                    <q-btn
                      flat
                      color="grey"
                      round
                      icon="icon-mat-chevron_right"
                      :disable="store.loading"
                      :loading="store.loading"
                      @click="next"
                    />
                    <!-- <div class="q-px-md">
                      {{ jumlahHari }}
                    </div> -->
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
          @set-row="store.setPerPage"
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
            {{ row.telat ? row.telat : 0 }} dari {{ row.total ? row.total:0 }}
            ({{ isNaN( (row.telat/row.total*100).toPrecision(4)) ? 0 : (row.telat/row.total*100).toPrecision(4) }}) %
          </template>
          <template #cell-01="{row}">
            <ChoiceComponent
              :data="row['01']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'01'"
            />
          </template>
          <template #cell-02="{row}">
            <ChoiceComponent
              :data="row['02']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'02'"
            />
          </template>
          <template #cell-03="{row}">
            <ChoiceComponent
              :data="row['03']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'03'"
            />
          </template>
          <template #cell-04="{row}">
            <ChoiceComponent
              :data="row['04']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'04'"
            />
          </template>
          <template #cell-05="{row}">
            <ChoiceComponent
              :data="row['05']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'05'"
            />
          </template>
          <template #cell-06="{row}">
            <ChoiceComponent
              :data="row['06']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'06'"
            />
          </template>
          <template #cell-07="{row}">
            <ChoiceComponent
              :data="row['07']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'07'"
            />
          </template>
          <template #cell-08="{row}">
            <ChoiceComponent
              :data="row['08']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'08'"
            />
          </template>
          <template #cell-09="{row}">
            <ChoiceComponent
              :data="row['09']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'09'"
            />
          </template>
          <template #cell-10="{row}">
            <ChoiceComponent
              :data="row['10']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'10'"
            />
          </template>
          <template #cell-11="{row}">
            <ChoiceComponent
              :data="row['11']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'11'"
            />
          </template>
          <template #cell-12="{row}">
            <ChoiceComponent
              :data="row['12']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'12'"
            />
          </template>
          <template #cell-13="{row}">
            <ChoiceComponent
              :data="row['13']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'13'"
            />
          </template>
          <template #cell-14="{row}">
            <ChoiceComponent
              :data="row['14']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'14'"
            />
          </template>
          <template #cell-15="{row}">
            <ChoiceComponent
              :data="row['15']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'15'"
            />
          </template>
          <template #cell-16="{row}">
            <ChoiceComponent
              :data="row['16']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'16'"
            />
          </template>
          <template #cell-17="{row}">
            <ChoiceComponent
              :data="row['17']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'17'"
            />
          </template>
          <template #cell-18="{row}">
            <ChoiceComponent
              :data="row['18']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'18'"
            />
          </template>
          <template #cell-19="{row}">
            <ChoiceComponent
              :data="row['19']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'19'"
            />
          </template>
          <template #cell-20="{row}">
            <ChoiceComponent
              :data="row['20']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'20'"
            />
          </template>
          <template #cell-21="{row}">
            <ChoiceComponent
              :data="row['21']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'21'"
            />
          </template>
          <template #cell-22="{row}">
            <ChoiceComponent
              :data="row['22']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'22'"
            />
          </template>
          <template #cell-23="{row}">
            <ChoiceComponent
              :data="row['23']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'23'"
            />
          </template>
          <template #cell-24="{row}">
            <ChoiceComponent
              :data="row['24']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'24'"
            />
          </template>
          <template #cell-25="{row}">
            <ChoiceComponent
              :data="row['25']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'25'"
            />
          </template>
          <template #cell-26="{row}">
            <ChoiceComponent
              :data="row['26']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'26'"
            />
          </template>
          <template #cell-27="{row}">
            <ChoiceComponent
              :data="row['27']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'27'"
            />
          </template>
          <template #cell-28="{row}">
            <ChoiceComponent
              :data="row['28']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'28'"
            />
          </template>
          <template #cell-29="{row}">
            <ChoiceComponent
              :data="row['29']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'29'"
            />
          </template>
          <template #cell-30="{row}">
            <ChoiceComponent
              :data="row['30']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'30'"
            />
          </template>
          <template #cell-31="{row}">
            <ChoiceComponent
              :data="row['31']"
              :tgl="store.params.tahun+'/'+store.params.bulan+'/'+'31'"
            />
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
// import { daysInMonth } from 'src/modules/utils'
import { useRekapAbsensiPegawaiStore } from 'src/stores/simrs/pegawai/user/rekapabsen/rekapabsen'
import { computed, ref } from 'vue'
import ChoiceComponent from './ChoiceComponent.vue'
import LegendComponent from './LegendComponent.vue'

const store = useRekapAbsensiPegawaiStore()
store.getInitialData()
const namaBulan = computed(() => {
  return store.bulan[parseInt(store.params.bulan) - 1]
})
let num = store.params.bulan

const prev = () => {
  console.log('prev', num)
  if (parseInt(num) <= 1) {
    num = 12
  } else {
    num = parseInt(num) - 1
  }
  const formatted = parseInt(num) < 10 ? '0' + num : num
  // console.log('jumlah hari', daysInMonth(formatted, store.params.tahun))
  console.log('prev', formatted)
  store.setParam('bulan', formatted)
  store.resetUser()
  store.getProta()
  store.getLibur()
  store.getDataTable()
}
const next = () => {
  console.log('next', num)
  // console.log('next', parseInt(num))
  if (parseInt(num) >= 12) {
    num = 1
  } else {
    num = parseInt(num) + 1
  }
  const formatted = parseInt(num) < 10 ? '0' + num : num
  // console.log('jumlah hari', daysInMonth(formatted, store.params.tahun))
  console.log('prev', formatted)
  store.setParam('bulan', formatted)
  store.resetUser()
  store.getProta()
  store.getLibur()
  store.getDataTable()
}

// pilih range bulan dan tahun
const months = ref([
  { nama: 'Januari', value: '01' },
  { nama: 'Februari', value: '02' },
  { nama: 'Maret', value: '03' },
  { nama: 'April', value: '04' },
  { nama: 'Mei', value: '05' },
  { nama: 'Juni', value: '06' },
  { nama: 'Juli', value: '07' },
  { nama: 'Agustus', value: '08' },
  { nama: 'September', value: '09' },
  { nama: 'Oktober', value: '10' },
  { nama: 'November', value: '11' },
  { nama: 'Desember', value: '12' }

])
const curY = parseInt(store.params.tahun)
const years = ref([])
for (let index = 0; index < 11; index++) {
  years.value[index] = curY - 5 + index
}

const monthSelected = ref(null)
const yearSelected = ref(null)

const submit = () => {
  store.setParam('bulan', monthSelected.value)
  store.setParam('tahun', yearSelected.value)
  // emits('onSubmit', { bulan: monthSelected.value, tahun: yearSelected.value })

  store.resetUser()
  store.getProta()
  store.getLibur()
  store.getDataTable().then(() => {
    monthSelected.value = null
    yearSelected.value = null
  })
  // console.log('cury', parseInt(curY))
  // console.log('bulan', monthSelected.value)
  // console.log('tahun', yearSelected.value)
}
</script>
