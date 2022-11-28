<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Hari Libur Nasional Tahunan"
      desc="Halaman Input Hari Libur Nasional Tahunan"
    >
      <template #content>
        <div class="row q-col-gutter-lg q-mb-lg items-center">
          <div class="col-md-8 col-sm-12 text-italic">
            Pilih Tahun (untuk melihat hari libur tahun sebelumnya)
          </div>
          <div class="col-md-4 col-sm-12">
            <app-autocomplete
              v-model="prota.params.tahun"
              label="Pilih tahun"
              option-value=""
              option-label=""
              :source="prota.tahuns"
              :loading="prota.loading"
              @selected="prota.pilihTahun"
            />
          </div>
        </div>
        <app-table
          title="Data Prota"
          :columns="prota.columns"
          :column-hide="prota.columnHide"
          :items="prota.items"
          :meta="prota.meta"
          :per-page="prota.params.per_page"
          :order-by="prota.params.order_by"
          :sort="prota.params.sort"
          :loading="prota.loading"
          :to-search="prota.params.q"
          @goto="prota.setPage"
          @set-row="prota.setPerPage"
          @refresh="prota.refreshTable"
          @find="prota.setSearch"
          @set-order="prota.setOder"
          @new-data="prota.newData"
          @edit-data="prota.editData"
          @delete="prota.deletesData"
        >
          <template #col-tgl_libur>
            <div>Tanggal Libur</div>
          </template>
          <template #cell-tgl_libur="{row}">
            <div>{{ humanDate(row.tgl_libur) }}</div>
          </template>
          <template #col-nama>
            <div>Nama Hari Libur</div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormInputVue v-model="prota.isOpen" />
  </div>
</template>
<script setup>
import { humanDate } from 'src/modules/formatter'
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/master/prota/prota'
import FormInputVue from './FormInput.vue'

const prota = UseProtaAbsensiLiburStore()
</script>
