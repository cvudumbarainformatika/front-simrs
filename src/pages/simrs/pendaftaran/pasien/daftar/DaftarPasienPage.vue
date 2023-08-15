<template>
  <div>
    <div
      class="fixed-bottom"
      style="z-index:10"
    >
      <PaginateBottom
        :meta="store.meta"
        :loading="store.loading"
        @first="store.setPage(1)"
        @last="store.setPage(store.meta.last_page)"
        @next="store.setPage(store.meta.current_page + 1)"
        @prev="store.setPage(store.meta.current_page - 1)"
      />
    </div>

    <div style="padding-bottom: 60px;">
      <app-table
        :items="store.items"
        :meta="store.meta"
        :columns="store.columns"
        :column-hide="store.columnHide"
        :ada-paginasi="false"
        :per-page="store.params.per_page"
        :order-by="store.params.order_by"
        :sort="store.params.sort"
        :loading="store.loading"
        :to-search="store.params.q"
        :default-btn="false"
        custom-btn-label="##"
        :add-data="false"
        :stick-header="true"
        :row-no="true"
        :sticky-header="true"
        @set-order="store.setOder"
        @set-row="store.setPerPage"
        @goto="store.setPage"
        @delete-ids="store.deletesData"
        @delete="store.deletesData"
        @find="store.setSearch"
        @refresh="store.refreshTable"
      >
        <template #header-right-before>
          <q-btn
            round
            flat
            :icon="!style.componentfull? 'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
            color="dark"
            size="sm"
            class="q-mr-sm"
            @click="style.setComponentFull"
          >
            <q-tooltip>
              FullScreen
            </q-tooltip>
          </q-btn>
        </template>
        <template #custom-btn="{row}">
          <q-btn
            round
            flat
            icon="icon-mat-edit"
            color="grey-8"
            size="sm"
            @click="editPasien(row)"
          >
            <q-tooltip>
              Edit Data Pasien
            </q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            icon="icon-mat-visibility"
            color="grey-8"
            size="sm"
            @click="previewDetail(row)"
          >
            <q-tooltip>
              Lihat Detail Pasien
            </q-tooltip>
          </q-btn>
        </template>
      </app-table>
    </div>

    <!-- dialog pasien -->
    <app-pasien-rajal
      v-model="det.dialogOpen"
      :pasien="pasien"
      @close-dialog="det.setDialogOpen"
    />

    <!-- Dialog edit pasien -->
    <app-fullscreen
      v-model="edit.openEdit"
      @close="clearForm"
    >
      <template #default>
        <div
          class="row items-center justify-between bg-grey q-pa-sm"
        >
          <div class="f-14 text-weight-bold">
            Form Identitas Pasien I.1
          </div>
        </div>
        <DataPasien
          ref="refDataPasien"
          bpjs
          :not-edit="false"
          :tglsep="today"
        />
        <div class="row justify-end q-my-lg q-mx-lg">
          <app-btn
            push
            label="simpan"
            :loading="edit.loading"
            @click="simpan"
          />
        </div>
      </template>
    </app-fullscreen>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useListPasien } from 'src/stores/simrs/pendaftaran/table/index'
import { useDetailPasien } from 'src/stores/simrs/pendaftaran/table/details'
import { usePendaftaranEditPasienStore } from 'src/stores/simrs/pendaftaran/table/editpasien'
import { useStyledStore } from 'src/stores/app/styled'
import PaginateBottom from './PaginateBottom.vue'
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import { date } from 'quasar'
import { notifSuccessVue } from 'src/modules/utils'

const store = useListPasien()
const det = useDetailPasien()
const style = useStyledStore()
const edit = usePendaftaranEditPasienStore()

const pasien = ref(null)
const refDataPasien = ref(null)
const today = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))

onMounted(() => {
  store.getDataTable()
})

function previewDetail(row) {
  pasien.value = row
  det.setDialogOpen()
  det.getDetails(row.norm)
  // console.log(row)
}

function editPasien(val) {
  // console.log('edit ', val)
  edit.openDialogEdit()
  edit.editPasienIni(val)
}
function clearForm() {
  edit.clearFormPasien()
}
function simpan() {
  const dataPasien = refDataPasien.value.set()
  console.log('data pasien', dataPasien)
  edit.saveForm().then(() => {
    clearForm()
    edit.openDialogEdit()
    notifSuccessVue('Data Sudah Berhasil Disimpan')
  })
}

</script>
