<template>
  <q-dialog
    class="q-mt-xl"
    @hide="hiddenDialog()"
    @show="init()"
    backdrop-filter="blur(4px)"
    persistent
  >
    <q-card style="min-width:50vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            PILIH DATA SERAHTERIMA
          </div>
          <div class="f-10">
            Pencarian Data Serahterima Berdasarkan Nomor BAST
          </div>
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-clear"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list>
          <q-table
            class="my-sticky-header"
            flat
            :rows="store.bastfarmasis"
            :columns="columns"
            row-key="name"
            @request="store.onRequest"
            v-model:pagination="store.reqs"
            :filter="store.reqs.q"
            :loading="store.loading"
            :rows-per-page-options="[10,20,50]"
          >
            <template #top-left>
              <div class="flex q-qutter-sm z-top">
                <div>
                  <q-input
                    v-model="store.reqs.q"
                    outlined
                    dark
                    color="white"
                    dense
                    placeholder="Cari BAST ..."
                    debounce="500"
                    style="min-width: 200px;"
                    @keyup.enter="store.goToPage(1)"
                  >
                    <template
                      v-if="store.reqs.q"
                      #append
                    >
                      <q-icon
                        name="icon-mat-close"
                        size="xs"
                        class="cursor-pointer"
                        @click.stop.prevent="clearSearch"
                      />
                    </template>
                    <template #prepend>
                      <q-icon
                        size="sm"
                        name="icon-mat-search"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </template>

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
            <template #body="props">
              <q-tr :props="props">
                <q-td key="nobast" :props="props">
                  {{ props.row.nobast }}
                </q-td>
                <q-td key="jumlah_bastx" :props="props">
                  {{ formattanpaRp(props.row.jumlah_bastx) }}
                </q-td>
                <q-td>
                  <div class="row justify-end">
                    <q-btn
                      outline
                      size="sm"
                      class="q-px-md"
                      label="Pilih"
                      @click="pilihDataSerahterima(props?.row.nobast)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import { onMounted, ref } from 'vue'
import { formattanpaRp } from 'src/modules/formatter'
// import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'

// const storeform = formNotaPermintaanDanaLS()
const noBast = ref([])
const store = dataBastFarmasi()
function hiddenDialog () {
  console.log('hidden dialog')
}
const columnsx = [
  {
    name: 'nobast',
    label: 'No BAST',
    align: 'left',
    field: 'nobast'
  },
  {
    name: 'jumlah_bastx',
    label: 'Nilai',
    align: 'center',
    field: 'jumlah_bastx'
  },
  {
    name: 'Opsi',
    label: 'Opsi',
    align: 'center'
  }
]
const columns = ref(columnsx)
onMounted(() => {
  // store.getDataBast()

})
const init = () => {
  store.getDataBast()
}
const clearSearch = () => {
  store.reqs.q = ''
  store.goToPage(1)
}
function pilihDataSerahterima (val) {
  noBast.value = val
  console.log('pilih serahtrima', noBast.value)
}
// const pilihSerahterima = (val) => {
//   storeform.setForm(val)
//   console.log('pilih dialog', storeform.setForm)
//   // .then(() => {
//   //   const arr = store.bastfarmasis
//   //   const obj = arr.length ? arr.find(x => x.nobast === val) : null

//   //   storeform.form.noserahterima = obj.nobast ?? ''
//   // })
// }
</script>
<style lang="scss">
.my-sticky-header {
  /* height or max-height is important */
  height: 100%;

  div.q-table__top ,.q-table__bottom, tr:first-child th {
    background-color: $dark;
    color: $white;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    // border-width: 0;
  }

  tr:first-child th {
    // border-top: 1px solid $white;
    background-color: $grey-4;
    color: $dark;
  }

  //   /* bg color is important for th; just specify one */

  thead tr th{
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
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
