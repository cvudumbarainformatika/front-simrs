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
          <template v-if="carisrt.bastfarmasis.length">
            <q-table
              class="my-sticky-header"
              :rows="carisrt.bastfarmasis"
              :columns="columns"
              row-key="name"
              @request="carisrt.onRequest"
              v-model:pagination="carisrt.reqs"
              :filter="carisrt.reqs.q"
              :loading="carisrt.loading"
              :rows-per-page-options="[10,50,100,200,500]"
            >
              <template #top-left>
                <div class="flex q-qutter-sm z-top">
                  <div>
                    <q-input
                      v-model="carisrt.reqs.q"
                      outlined
                      dark
                      color="white"
                      dense
                      placeholder="Cari BAST ..."
                      debounce="500"
                      style="min-width: 200px;"
                      @keyup.enter="carisrt.goToPage(1)"
                    >
                      <template
                        v-if="carisrt.reqs.q"
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
          </template>
          <template v-if="carisrt.konsinyasis.length">
            <q-table
              class="my-sticky-header"
              :rows="carisrt.konsinyasis"
              :columns="columnkonsinyasi"
              row-key="name"
              @request="carisrt.onRequest"
              v-model:pagination="carisrt.reqs"
              :filter="carisrt.reqs.q"
              :loading="carisrt.loading"
            >
              <template #top-left>
                <div class="flex q-qutter-sm z-top">
                  <div>
                    <q-input
                      v-model="carisrt.reqs.q"
                      outlined
                      dark
                      color="white"
                      dense
                      placeholder="Cari BAST ..."
                      debounce="500"
                      style="min-width: 200px;"
                      @keyup.enter="carisrt.goToPage(1)"
                    >
                      <template
                        v-if="carisrt.reqs.q"
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
              <template #body="props">
                <q-tr :props="props">
                  <q-td key="notranskonsi" :props="props">
                    {{ props.row.notranskonsi }}
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
                        @click="pilihDataSerahterima(props?.row.notranskonsi)"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { onMounted, ref } from 'vue'
import { formattanpaRp } from 'src/modules/formatter'
// import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'

// const storeform = formNotaPermintaanDanaLS()
// const noBast = ref([])
const carisrt = dataBastFarmasi()
const store = formNotaPermintaanDanaLS()
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

const columnkons = [
  {
    name: 'notranskonsi',
    label: 'No BAST',
    align: 'left',
    field: 'notranskonsi'
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
const columnkonsinyasi = ref(columnkons)
onMounted(() => {
  // store.getDataBast()

})
const init = () => {
  carisrt.getDataBast()
}
const clearSearch = () => {
  carisrt.reqs.q = ''
  carisrt.goToPage(1)
}
function pilihDataSerahterima (val) {
  // noBast.value = val

  store.reqs.bast = val
  store.openDialogFarmasi = false
  store.form.noserahterima = store.reqs.bast
  carisrt.reqs.kodebast = val
  carisrt.selectbastFarmasi()

  // store.rinci = val ?? ''
  // console.log('kkode bast', store.reqs.bast)
  console.log('cari bast', carisrt.reqs.kodebast)
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
