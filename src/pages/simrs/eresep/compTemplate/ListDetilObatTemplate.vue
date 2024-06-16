<template>
  <q-table
    class="my-sticky-header"
    flat
    title="List Detil Obat Template"
    :rows="store.items"
    :columns="columns"
    row-key="name"
    table-header-class="bg-dark text-white"
    :rows-per-page-options="[0]"
    hide-pagination
  >
    <template #no-data="{ message, filter }">
      <div class="absolute-top fit row flex-center bg-transparent items-center text-dark">
        <div class="row items-center q-gutter-sm">
          <q-icon size="2em" name="icon-mat-eye" />
          <div>
            Data tidak ditemukan... {{ message }}
          </div>
          <div class="text-h4">
            {{ filter? '🏷️': '🏷️' }}
          </div>
        </div>
        <!-- <q-icon size="2em" :name="filter ? 'icon-mat-list' : icon" /> -->
      </div>
    </template>
    <template #bottom>
      <div class="row full-width justify-between items-center q-py-xs">
        <div class="kiri row">
          <q-btn dense color="dark" size="md" class="q-px-md" @click="emits('back')">
            Kembali
          </q-btn>
        </div>
        <div class="kanan">
          kanan
        </div>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { ref } from 'vue'

const store = useTemplateEResepStore()

const columns = ref([
  {
    name: 'namaobat',
    required: true,
    label: 'Nama Obat',
    align: 'left',
    field: row => row.namaobat,
    sortable: true
  },
  { name: 'jumlah', align: 'right', label: 'Jumlah', field: 'jumlah_diminta', sortable: true },
  { name: 'kemasan', align: 'left', label: 'Kemasan', field: 'satuan_kcl', sortable: false },
  { name: 'signa', align: 'right', label: 'Aturan Pakai', field: 'signa', sortable: false }
])

const emits = defineEmits(['back'])

</script>

<style lang="scss">
.my-sticky-header {
  /* height or max-height is important */
  height: 100%;

  div.q-table__top ,.q-table__bottom, tr:first-child th {
    background-color: $primary;
    color: $white;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    // border-width: 0;
  }

  tr:first-child th {
    // border-top: 1px solid $white;
    background-color: $dark;
    color: $white;
  }

  //   /* bg color is important for th; just specify one */

  thead tr th{
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
  }

  // tr:nth-child(even) th[scope=row] {
  //   background-color: $dark;
  // }

  // tr:nth-child(odd) th[scope=row] {
  //   background-color: $white;
  // }

  tr:nth-child(even) {
    background-color: $white;
  }

  tr:nth-child(odd) {
    background-color: $grey-3;
  }

  // /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th{
    /* height of all previous header rows */
    top: 48px
  }
  // /* prevent scrolling behind sticky top row on focus */
  tbody{
    /* height of all previous header rows */
    scroll-margin-top: 100px !important;
  }

  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon
   {
    color: $grey-4;
  }

}
</style>
