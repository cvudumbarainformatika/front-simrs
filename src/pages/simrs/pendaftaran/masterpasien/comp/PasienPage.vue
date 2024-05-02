<template>
  <q-page class="fit q-pa-sm absolute">
    <div class="fit relative-position">
      <div class="column full-height">
        <div class="col full-height scroll">
          <q-markup-table
            flat
            bordered
            dense
            wrap-cells
          >
            <thead class="bg-primary text-white">
              <tr>
                <th colspan="6">
                  <div class="row justify-between no-wrap items-center q-pt-xs">
                    <div>
                      <q-input
                        v-model="store.params.q"
                        outlined
                        color="white"
                        dark
                        borderless
                        debounce="500"
                        clearable
                        dense
                        placeholder="Cari ... Enter"
                        @keydown.enter.prevent="(evt)=>store.setSearch(evt.target.value)"
                      >
                        <template #prepend>
                          <q-icon
                            name="icon-mat-search"
                            size="20px"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="flex q-gutter-sm">
                      <q-btn
                        unelevated
                        round
                        size="sm"
                        color="teal"
                        icon="icon-mat-refresh"
                        @click="store.refreshTable"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Refresh Table
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  width="7%"
                  class="text-left"
                >
                  NORM
                </th>
                <th
                  width="10%"
                  class="text-left"
                >
                  NIK
                </th>
                <th class="text-left">
                  NAMA
                </th>
                <th
                  width="8%"
                  class="text-left"
                >
                  TGL LAHIR
                </th>
                <th
                  width="30%"
                  class="text-left"
                >
                  ALAMAT
                </th>
                <th class="text-right">
                  ##
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="!store.loading">
                <tr
                  v-for="item in store.items"
                  :key="item"
                >
                  <td class="text-left">
                    {{ item?.norm ?? '-' }}
                  </td>
                  <td class="text-left">
                    {{ item?.nik ?? '-' }}
                  </td>
                  <td class="text-left">
                    {{ item?.nama ?? '-' }}
                  </td>
                  <td class="text-left">
                    {{ item?.tgllahir }}
                  </td>
                  <td class="text-left">
                    {{ item?.alamat }}
                  </td>
                  <td class="text-right">
                    <div class="flex full-width justify-end">
                      <q-btn
                        round
                        flat
                        icon="icon-mat-edit"
                        color="grey-8"
                        size="xs"
                        @click="editPasien(item)"
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
                        size="xs"
                        @click="previewDetail(item)"
                      >
                        <q-tooltip>
                          Lihat Detail Pasien
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  v-for="n in 15"
                  :key="n"
                >
                  <td class="text-left">
                    <q-skeleton type="text" />
                  </td>
                  <td class="text-left">
                    <q-skeleton type="text" />
                  </td>
                  <td class="text-left">
                    <q-skeleton type="text" />
                  </td>
                  <td class="text-left">
                    <q-skeleton type="text" />
                  </td>
                  <td class="text-left">
                    <q-skeleton type="text" />
                  </td>
                  <td class="text-right">
                    <div class="flex full-width justify-end">
                      <q-skeleton
                        type="circle"
                        size="20px"
                      />
                      <q-skeleton
                        type="circle"
                        size="20px"
                      />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <div
        class="absolute-bottom bg-primary text-white"
      >
        <div class="q-pa-sm">
          <PaginateBottom
            :meta="store.meta"
            :loading="store.loading"
            @first="store.setPage(1)"
            @last="store.setPage(store.meta.last_page)"
            @next="store.setPage(store.meta.current_page + 1)"
            @prev="store.setPage(store.meta.current_page - 1)"
          />
        </div>
      </div>
    </div>

    <div>
      <!-- <app-table
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
      </app-table> -->
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
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useListPasien } from 'src/stores/simrs/pendaftaran/table/index'
import { useDetailPasien } from 'src/stores/simrs/pendaftaran/table/details'
import { usePendaftaranEditPasienStore } from 'src/stores/simrs/pendaftaran/table/editpasien'
// import { useStyledStore } from 'src/stores/app/styled'
// eslint-disable-next-line no-unused-vars
import PaginateBottom from './PaginateBottom.vue'
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import { date } from 'quasar'
import { notifSuccessVue } from 'src/modules/utils'

const store = useListPasien()
const det = useDetailPasien()
// const style = useStyledStore()
const edit = usePendaftaranEditPasienStore()

const pasien = ref(null)
const refDataPasien = ref(null)
const today = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))

onMounted(() => {
  store.getDataTable()
})

// eslint-disable-next-line no-unused-vars
function previewDetail(row) {
  pasien.value = row
  det.setDialogOpen()
  det.getDetails(row.norm)
  // console.log(row)
}

// eslint-disable-next-line no-unused-vars
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

<style lang="scss" scoped>

.q-markup-table {
  overflow: visible !important;
  margin-bottom: 50px;
}

// tr:nth-child(even) th[scope=row] {
//   background-color: #fff;
// }

// tr:nth-child(odd) th[scope=row] {
//   background-color: #fff;
// }

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

// tr:nth-child(odd) {
//   background-color: rgba(255, 255, 255, 0.05);
// }
/* Fixed Headers */

thead {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: $primary;
}

</style>
