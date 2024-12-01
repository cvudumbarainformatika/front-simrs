<script setup>
import { useQuasar } from 'quasar'
import { formatRp, dateFullFormat } from 'src/modules/formatter'
import { computed, onMounted } from 'vue'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'

const store = useTindakanRanapStore()

const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const filterredTable = computed(() => {
  const val = store.notaTindakan
  const arr = props?.pasien?.tindakan
  // console.log('pasien ', props?.pasien)

  // return arr
  return (val === 'SEMUA' || val === null || val === '') ? arr : arr?.filter(x => x?.rs2 === val)
})

const filterredTableByTgl = computed(() => {
  const val = store.tanggal
  const arr = props?.pasien?.tindakan
  const filterred = arr?.filter(x => x?.rs3?.includes(val))
  // console.log('hr ini ', filterred)

  // return arr
  return filterred
})

onMounted(() => {
  // log
  // console.log('filterredTableByTgl', filterredTableByTgl?.value)
})

function hapusItem (id) {
  console.log('id', id)
  $q.dialog({
    // dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.hapusTindakan(props.pasien, id)
    // console.log('OK')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function setPelaksana (item) {
  // console.log('item', item)
  const pel1 = item?.rs8 !== '' ? item?.rs8 : null
  const pel2 = item?.rs23 !== '' ? item?.rs23 : null

  const pelaksanaSatu = pel1?.split(';') ?? []
  const pelaksanaDua = pel2?.split(';') ?? []

  // console.log('pelaksanaSatu', pelaksanaSatu)
  // console.log('pelaksanaDua', pelaksanaDua)

  return { pelaksanaSatu, pelaksanaDua }
}

function namaPetugas (item) {
  // console.log('item', item)
  const petugas = store.listPetugas?.find(x => x.kdpegsimrs === item)?.nama ?? null
  return petugas
}
</script>

<template>
  <div class="fit q-pa-sm scroll">
    <!-- <q-list
      separator
      class="bg-white"
    > -->
    <transition-group name="list">
      <!-- <template
        v-for="(item, i) in filterredTable"
        :key="i"
      > -->
      <q-card flat bordered class="q-mb-xs" v-for="(item, i) in filterredTableByTgl" :key="i">
        <q-item class="list-move">
          <q-item-section>
            <q-item-label
              lines="2"
              class="f-12"
            >
              <span class="">Nota</span> : <span class="text-weight-bold">{{ item?.rs2 }} </span>
            </q-item-label>
            <q-item-label
              lines="2"
              class="f-12"
            >
              <span class="">Tindakan x Jml</span> : <span class="text-weight-bold">{{ item.mastertindakan?.rs2 }} </span> x <span class="text-weight-bold text-negative">{{ item.rs5?item.rs5:0 }}</span>
            </q-item-label>

            <q-item-label
              lines="2"
              class="f-12"
            >
              <em class="text-accent">{{ dateFullFormat(item.rs3) }} </em>
            </q-item-label>
            <q-item-label
              lines="3"
              class="f-10 text-italic"
            >
              <span class="">Keterangan</span> : <span class="">{{ item?.rs20 }} </span>
            </q-item-label>
            <q-item-label
              lines="2"
              class="f-12 text-italic text-accent"
            >
              <span class="">oleh</span> : <b>Pel1 </b>
              (<span v-for="(pel, x) in setPelaksana(item)?.pelaksanaSatu" :key="x" class="">{{ namaPetugas(pel) }}, </span>)
              <span class=""> / </span>  <b>Pel2 </b>
              (<span v-for="(pel, y) in setPelaksana(item)?.pelaksanaDua" :key="y" class="">{{ namaPetugas(pel) }}, </span>)
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <div class="row q-my-xs">
              <!-- <q-btn
                flat
                round
                size="sm"
                icon="icon-mat-cloud_upload"
                @click="bukaUploadan(item?.id)"
              >
                <q-tooltip>Upload Gambar Dokumen</q-tooltip>
              </q-btn> -->
              <q-btn
                flat
                round
                size="sm"
                icon="icon-mat-delete"
                color="negative"
                @click="hapusItem(item.id)"
              >
                <q-tooltip>Hapus </q-tooltip>
              </q-btn>
            </div>
            <q-item-label>
              <!-- <span
                    class="text-primary f-14 text-weight-bold"
                    style="border:1px solid blue;
                      margin-bottom:10px; padding: 5px;
                    "
                  >{{ item.subtotal }}</span> -->
              <q-badge
                outline
                color="primary"
                :label="`Rp. ${formatRp(item.subtotal)}`"
              />
            </q-item-label>
            <q-item-label v-if="item.gambardokumens?.length">
              <q-btn
                label="lihat dokumen"
                class="q-px-md"
                dense
                color="info"
                size="sm"
                @click="lihatDokumen(item)"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator size="2px" />
      </q-card>
      <!-- </template> -->
    </transition-group>
    <!-- </q-list> -->
  </div>
</template>
