<template>
  <q-page class="q-pa-sm q-mb-xl">
    <div>
      <!-- <app-box-caption /> -->
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Volume Sediaan"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            :ada-paginasi="false"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <!-- @edit-data="store.editData" -->
            <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
            <template #col-obat>
              <div>Nama Obat</div>
            </template>
            <template #col-nama>
              <div>Sediaan</div>
            </template>
            <template #col-kelompok>
              <div>Kelompok</div>
            </template>
            <template #col-belanja>
              <div>Kode Belanja Obat</div>
            </template>
            <template #col-status>
              <div>Status</div>
            </template>
            <template #col-bayar>
              <div>Sistem bayar</div>
            </template>
            <template #col-satuan>
              <div>Satuan</div>
            </template>
            <template #cell-obat="{row}">
              <div class="row box-tiga">
                <div class="col-12">
                  {{ row.nama_obat }}
                </div>
              </div>
            </template>
            <template #cell-nama="{row}">
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Dosis
                </div>
                <div class="col-7">
                  {{ row.kekuatan_dosis }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Volume
                </div>
                <div class="col-7">
                  {{ row.volumesediaan }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Bentuk
                </div>
                <div class="col-7">
                  {{ row.bentuk_sediaan }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Merk
                </div>
                <div class="col-7">
                  {{ row.merk }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Perbekalan
                </div>
                <div class="col-7">
                  {{ row.jenis_perbekalan }}
                </div>
              </div>
            </template>
            <template #cell-kelompok="{row}">
              <div class="row box q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Napza
                </div>
                <div class="col-7">
                  {{ row.kelompok_psikotropika==='1'?'YA':'TIDAK' }}
                </div>
              </div>
              <div class="row box q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Kandungan
                </div>
                <div class="col-7">
                  {{ row.kandungan }}
                </div>
              </div>
              <div class="row box q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Terapi
                </div>
                <div class="col-7">
                  {{ row.kelas_terapi }}
                </div>
              </div>
              <div class="row box q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  Penyimpanan
                </div>
                <div class="col-7">
                  {{ row.kelompok_penyimpanan }}
                </div>
              </div>
              <div class="row box q-col-gutter-sm q-mb-sm">
                <div class="col-5">
                  RKO
                </div>
                <div class="col-7">
                  {{ row.kelompok_rko }}
                </div>
              </div>
            </template>
            <template #cell-belanja="{row}">
              <div class="row box-dua q-col-gutter-sm q-mb-sm">
                <div class="col-2">
                  108
                </div>
                <div class="col-8">
                  {{ row.uraian108 }}
                </div>
              </div>
              <div class="row box-dua q-col-gutter-sm q-mb-sm">
                <div class="col-2">
                  50
                </div>
                <div class="col-8">
                  {{ row.uraian50 }}
                </div>
              </div>
            </template>
            <template #cell-satuan="{row}">
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Satuan besar
                </div>
                <div class="col-5">
                  {{ row.satuan_b }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Satuan kecil
                </div>
                <div class="col-5">
                  {{ row.satuan_k }}
                </div>
              </div>
            </template>
            <template #cell-status="{row}">
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Generik
                </div>
                <div class="col-5">
                  {{ row.status_generik==='1'?'YA':'TIDAK' }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Fornas
                </div>
                <div class="col-5">
                  {{ row.status_fornas==='1'?'YA':'TIDAK' }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Forkit
                </div>
                <div class="col-5">
                  {{ row.status_forkid==='1'?'YA':'TIDAK' }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Nilai KDN
                </div>
                <div class="col-5">
                  {{ row.nilai_kdn }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Sertifikat KDN
                </div>
                <div class="col-5">
                  {{ row.sertifikatkdn }}
                </div>
              </div>
              <div class="row box-tiga q-col-gutter-sm q-mb-sm">
                <div class="col-7">
                  Sistem Bayar
                </div>
                <div class="col-5">
                  {{ row.sistembayar }}
                </div>
              </div>
            </template>
          </app-table>
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import { useMasterObatForm } from 'src/stores/simrs/master/farmasi/obat/form'
import { useMasterObatTable } from 'src/stores/simrs/master/farmasi/obat/table'
import formDialog from './FormDialog.vue'
const table = useMasterObatTable()
const store = useMasterObatForm()
table.getDataTable()
store.getInitialData()
</script>
<style lang="scss" scoped>
.q-table td div.box {
  white-space: normal !important;
    inline-size: 250px;
    overflow-wrap: break-word;
}
.q-table td div.box-dua {
  white-space: normal !important;
    inline-size: 200px;
    overflow-wrap: break-word;
}
.q-table td div.box-tiga {
  white-space: normal !important;
    inline-size: 150px;
    overflow-wrap: break-word;
}
</style>
