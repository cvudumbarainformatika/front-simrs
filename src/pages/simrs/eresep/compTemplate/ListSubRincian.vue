<template>
  <q-table
    flat
    :rows="items"
    :columns="columns"
    row-key="kodeobat"
    table-header-class="bg-primary text-dark"
    :rows-per-page-options="[0]"
    hide-pagination
    dense
    wrap-cells
  >
    <template #body="props">
      <q-tr
        :props="props" @click="onRowClick(props.row)" @mouseover="indexRow = props.rowIndex" @mouseleave="indexRow = -1"
        :class="pembatasan(props.row)===false?{'bg-grey text-white': adaError(props.row)}:pembatasan(props.row)"
      >
        <q-td key="namaobat" :props="props">
          {{ props.row.namaobat }}
          <q-popup-proxy ref="refProxyc">
            <DialogEdit :item="props" :racikan="true" :index-item="sub.rowIndex" @close="closeEdit" />
          </q-popup-proxy>
        </q-td>
        <q-td key="jumlah" :props="props">
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
          <em>{{ props.row.jumlah_diminta }} X {{ sub?.jumlah_diminta }} {{ props?.row.satuan_kcl }}</em>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { ref, defineAsyncComponent } from 'vue'

const $q = useQuasar()
const store = useTemplateEResepStore()

const DialogEdit = defineAsyncComponent(() => import('../compTemplate/DialogEdit.vue'))
const pr = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  sub: {
    type: Object,
    default: null
  }
})

const indexRow = ref(-1)

const refProxyc = ref(null)

const columns = ref(

  [
    {
      name: 'namaobat',
      required: true,
      label: 'Nama Obat',
      align: 'left',
      field: row => row.namaobat,
      sortable: true
    },
    { name: 'jumlah', align: 'right', label: 'Jumlah', field: 'jumlah_diminta', sortable: true }
  ]

)

function onRowClick (row) {
  console.log('sub', row)
  store.formRacik = row
}

function closeEdit () {
  console.log('close edit', refProxyc.value)
  refProxyc.value.hide()
  // refProxy.value.hide()
}

function hapusItem (val) {
  const namaobat = val.row?.namaobat
  const arr = store.items[pr?.sub.rowIndex].rincian
  console.log('val', arr[val.rowIndex])
  $q.dialog({
    title: 'Pemberitahuan',
    message: `Apakah Obat <strong>${namaobat}</strong>  ini akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    // store.items?.splice(val.rowIndex, 1)
    store.items[pr?.sub.rowIndex].rincian?.splice(val.rowIndex, 1)
    store.updateListItems()
  }).onCancel(() => {
    console.log('Cancel')
    // selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function adaError (row) {
  // console.log('ada error', row)
  const errs = store.errorsOrder?.racikan?.filter(x => x?.koderacikan === pr?.sub?.key)
  // const obats = errs?.length ? errs.rincian?.filter(x => x?.kodeobat?.includes(row?.kodeobat)) : []
  const obats = errs?.length ? errs[0].rincian?.filter(x => x?.kodeobat?.includes(row?.kodeobat)) : []
  // console.log('ada error sub', obats)
  return obats?.length
}
function pembatasan (row) {
  if (store.sudahAda?.length) {
    const ada = store.sudahAda.find(f => f.kdobat === row.kodeobat)
    if (ada) return 'bg-red-2'
  }
  else return false
}
</script>
