<template>
  <q-table
    class="my-sticky-header"
    flat
    title="table"
    :rows="store.items"
    :columns="columns"
    row-key="kodeobat"
    :rows-per-page-options="[0]"
    :loading="store.loadingTemplate"
    v-model:expanded="expanded"
    hide-pagination
  >
    <template #top>
      <div class=" full-width row items-center justify-between">
        <div class="text-weight-bold">
          List Detil Obat Template {{ store.templateSelected ? store.templateSelected?.nama : '(Baru)' }}
        </div>
        <q-btn
          v-if="store.templateSelected"
          dense color="white" text-color="dark" class="q-px-md"
          :loading="store.loadingTemplate"
          @click="emits('kirimOrder')"
        >
          Kirim Order
        </q-btn>
      </div>
    </template>
    <template #loading>
      <Transition>
        <div class="absolute-top fit column flex-center bg-primary items-center text-dark z-top" style="opacity: 0.95;">
          <q-spinner-box
            color="secondary"
            size="10em"
          />

          <div class="text-white">
            Harap Tunggu
            <q-spinner-comment
              color="primary"
              size="2em"
            />
          </div>
        </div>
      </Transition>
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
          <q-btn
            dense color="white"
            text-color="dark" size="md" class="q-px-md"
            :loading="store.loadingTemplate"
            @click="simpanTemplate"
          >
            Simpan Template
          </q-btn>
        </div>
      </div>
    </template>

    <template #header="props">
      <q-tr :props="props">
        <!-- <q-th auto-width /> -->
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template #body="props">
      <q-tr
        :props="props" @click="onRowClick(props.row)" @mouseover="indexRow = props.rowIndex" @mouseleave="indexRow = -1"
        :class="{'bg-negative text-grey-4': adaError(props.row) || adaErrorRacikan(props.row)}"
      >
        <!-- <q-td auto-width>
          <q-btn v-if="props.row.racikan" size="xs" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'icon-mat-remove' : 'icon-mat-add'" />
        </q-td> -->
        <q-td
          key="namaobat" :props="props"
          class="flex items-center"
        >
          <q-toggle v-if="props.row.racikan" size="xs" v-model="props.expand" />
          <div class="q-ml-sm">
            {{ props.row.namaobat }}
            <q-popup-proxy ref="refProxy" v-if="!props.row.racikan">
              <dialog-edit :item="props" @close="closeEdit" :index-item="props.rowIndex" />
            </q-popup-proxy>
          </div>
        </q-td>
        <q-td key="jumlah" :props="props">
          {{ props.row.jumlah_diminta }}
        </q-td>
        <q-td key="kemasan" :props="props">
          {{ props.row.satuan_kcl }}
        </q-td>
        <q-td key="signa" :props="props" class="relative-position">
          <Transition
            appear
            enter-active-class="animated fast slideInRight"
            leave-active-class="animated fast slideOutRight"
          >
            <div v-if="indexRow === props.rowIndex" class="absolute-top fit bg-grey-4">
              <div class="column full-height flex-center content-end q-pa-sm">
                <q-btn round color="negative" icon="icon-mat-delete" size="xs" @click="hapusItem(props)" />
              </div>
            </div>
          </Transition>
          <div>{{ props.row.signa }}</div>
        </q-td>
      </q-tr>
      <q-tr v-if="props.expand" :props="props">
        <q-td colspan="100%" class="bg-grey-4 q-pa-none q-ma-none">
          <ListSubRincian :items="props.row.rincian" :sub="props" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { getCssVar, useQuasar } from 'quasar'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { defineAsyncComponent, ref, watchEffect } from 'vue'

const ListSubRincian = defineAsyncComponent(() => import('./ListSubRincian.vue'))
const DialogEdit = defineAsyncComponent(() => import('./DialogEdit.vue'))
const store = useTemplateEResepStore()
const $q = useQuasar()
// const showDialogEdit = ref(false)
// const selected = ref(null)

const expanded = ref([])

const bg = ref({
  head: getCssVar('primary'),
  rowHead: getCssVar('dark')
})

const refProxy = ref(null)
const indexRow = ref(-1)
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

const emits = defineEmits(['back', 'rowClick', 'kirimOrder'])

function onRowClick (row) {
  // console.log('row', row)
  store.form = row
  emits('rowClick', row)
}

function closeEdit () {
  console.log('close edit')
  refProxy.value.hide()
}

function hapusItem (val) {
  const namaobat = val.row?.namaobat
  console.log('val', namaobat)
  $q.dialog({
    title: 'Pemberitahuan',
    message: `Apakah Obat <strong>${namaobat}</strong>  ini akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    store.items?.splice(val.rowIndex, 1)

    const dataracikan = store.items.filter(x => x.racikan === true)
    for (let i = 0; i < dataracikan.length; i++) {
      const el = dataracikan[i]
      el.kodeobat = `racikan-${parseInt(i) + parseInt(1)}`
      el.namaobat = `Racikan ${parseInt(i) + parseInt(1)}`
    }

    store.updateListItems()
  }).onCancel(() => {
    console.log('Cancel')
    // selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function simpanTemplate () {
  $q.dialog({
    title: `${store.templateSelected?.nama ? 'Update Template' : 'Simpan Template'}`,
    message: `${store.templateSelected?.nama ? 'Apakah Template ini akan diperbarui?' : 'Silahkan masukkan nama Template terlebih dahulu'}`,
    prompt: {
      model: store.templateSelected?.nama ?? '',
      isValid: val => val.length > 2,
      type: 'text', // optional
      readonly: store.templateSelected !== null
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
    store.simpanTemplate(data)
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function adaError (row) {
  // console.log('ada error', store.errorsOrder)
  const errs = store.errorsOrder?.nonRacikan?.filter(x => x?.isError === true)
  const obats = errs?.length ? errs.filter(x => x?.kdobat === row?.kodeobat) : []
  // console.log('obats', obats.length)
  return obats.length
  // const errTdkAdaAlokasiNonRacikan = store.errorsOrder?.tidakAdaAlokasi?.filter(x => x?.kodeobat === row?.kodeobat)
  // return errTdkAdaAlokasiNonRacikan?.length
}
function adaErrorRacikan (row) {
  const errs = store.errorsOrder?.racikan?.filter(x => x?.isError === true)
  const obats = errs?.length ? errs.filter(x => x?.kdobat === row?.kodeobat) : []
  // console.log('obats', obats.length)
  // if (obats.length) expanded.value?.push(obats[0]?.kdobat)
  // console.log('expanded', expanded.value)
  return obats.length
}

watchEffect(() => {
  if (store.templateSelected) {
    bg.value.head = getCssVar('dark-page')
  }
  else {
    bg.value.head = getCssVar('primary')
  }

  if (store.errorsOrder?.racikan?.length) {
    const exp = store.errorsOrder?.racikan?.filter(x => x?.isError === true).map(x => x?.kdobat)
    expanded.value = exp
    // console.log('exp', exp)
  }
  console.log('expanded', expanded.value)
  // console.log('storeErr', store.errorsOrder)
})

</script>

<style lang="scss">

.my-sticky-header {
  /* height or max-height is important */
  height: 100%;

  div.q-table__top ,
  .q-table__bottom
   {
    background-color: v-bind('bg.head');
    color: $white;
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }

  //   /* bg color is important for th; just specify one */

  thead tr th{
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    // border-top: 1px solid $white;
    background-color: v-bind('bg.rowHead');
    color: $white;
    top:0
  }

  // /* this is when the loading indicator appears */
  // &.q-table--loading thead tr:last-child th{
  //   /* height of all previous header rows */
  //   top: 48px
  // }
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

  .q-table__top,.q-table__bottom {
    z-index: 1000;
  }

}
</style>
