<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Data Pegawai Tidak Masuk"
      desc="Halaman Pegawai yang Tidak hadir ke tempat kerja"
    >
      <template #content>
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
          :ada-edit="false"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #header-left-after-search>
            <div class="q-ml-sm">
              <app-btn
                label="DISPEN"
                color="negative"
                @click="dispen.setIsOpen()"
              />
            </div>
            <div class="q-ml-sm">
              <app-btn
                label="Trouble"
                color="red"
                @click="trouble.setIsOpen()"
              />
            </div>
            <div class="q-ml-sm">
              <app-input-date-human
                ref="tgl"
                :model="store.tanggal"
                label="Tanggal"
                outlined
                @set-model="setTanggal"
              />
            </div>
            <div class="q-ml-sm">
              <app-autocomplete-new
                :model="store.params.bulan"
                label="Pilih Bulan"
                outlined
                autocomplete="nama"
                option-value="value"
                option-label="nama"
                valid
                :source="store.bulans"
                :loading="store.loading"
                @on-select="bulanSelected"
                @clear="clearBulan"
              />
            </div>
          </template>
          <template #col-nama>
            <div>Nama</div>
          </template>
          <template #col-flag>
            <div>Tipe</div>
          </template>
          <template #col-tanggal>
            <div>Tanggal</div>
          </template>
          <template #col-image>
            <div>Gambar</div>
          </template>
          <template #col-alasan>
            <div>Alasan</div>
          </template>
          <template #cell-nama="{row}">
            <div>{{ row.user? row.user.nama:'tidak ada nama' }}</div>
          </template>
          <template #cell-tanggal="{row}">
            <div>{{ dateFullFormat( row.tanggal) }}</div>
          </template>
          <template #cell-image="{row}">
            <div v-if="row.image">
              <div v-if="row.fileType==='pdf'">
                <!-- <app-pdf
                  :src="pathImg + row.image"
                  class="cursor-pointer"
                  @click="imgClick(pathImg + row.image,row.fileType)"
                /> -->
                <q-img
                  src="~assets/images/PDF_file_icon.png"
                  class="cursor-pointer"
                  @click="openPdf(pathImg + row.image)"
                />
              </div>
              <div v-else>
                <q-img
                  :src="pathImg + row.image"
                  class="cursor-pointer"
                  @click="imgClick(pathImg + row.image)"
                />
              </div>
            </div>
            <div v-if="!row.image">
              <q-img
                src="~assets/images/no-image.png"
                class=""
              />
            </div>
          </template>
          <template #cell-flag="{row}">
            <div v-if="row.flag==='DL'">
              <q-chip
                color="blue-grey"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Dinas Luar
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='CUTI'">
              <q-chip
                color="cyan"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Cuti
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='IJIN'">
              <q-chip
                color="deep-orange"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Ijin
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='SAKIT'">
              <q-chip
                color="grey"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  SAKIT
                </div>
              </q-chip>
            </div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormDialog v-model="store.isOpen" />
    <ImageDialog v-model="store.expand" />
    <FormDispen v-model="dispen.isOpen" />
    <FormTrouble v-model="trouble.isOpen" />
  </div>
</template>
<script setup>
import FormDialog from './FormDialog.vue'
import FormTrouble from './FormTrouble.vue'
import FormDispen from './FormDispen.vue'
import ImageDialog from './ImageDialog.vue'
import { useLiburAbsenStore } from 'src/stores/simrs/pegawai/user/libur/libur'
import { useDispenStore } from 'src/stores/simrs/pegawai/user/libur/dispen'
import { pathImg } from 'src/boot/axios'
import { dateFullFormat } from 'src/modules/formatter'
import { date, openURL } from 'quasar'
import { onMounted, ref } from 'vue'
import { useTroubleStore } from 'src/stores/simrs/pegawai/user/libur/trouble'

const store = useLiburAbsenStore()
const dispen = useDispenStore()
const trouble = useTroubleStore()

function openPdf(val) {
  openURL(val)
}

const imgClick = val => {
  store.image = val
  store.setExpand()
}

const tgl = ref(null)
function setTanggal(val) {
  store.tanggal = val
  store.params.tanggal = date.formatDate(val, 'YYYY-MM-DD')
  delete store.params.bulan
  store.getInitialData()
}
function bulanSelected(val) {
  console.log('bulan', val)
  store.params.bulan = val
  delete store.params.tanggal
  store.getInitialData()
}
function clearBulan() {
  store.params.tanggal = date.formatDate(store.tanggal, 'YYYY-MM-DD')
  delete store.params.bulan
  store.getInitialData()
}
onMounted(() => {
  store.tanggal = date.formatDate(Date.now(), 'DD MMMM YYYY')
  store.params.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD')
  store.getInitialData()
})
</script>
