<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Permintaan Laborat
      </div>
      <q-space />
      <!-- <div class="q-py-xs">
        <q-select
          v-model="store.notalaborat"
          outlined
          standout="bg-yellow-3"
          bg-color="white"
          dense
          :options="store.notalaborats"
          :display-value="`NOTA: ${store.notalaborat === null || store.notalaborat === '' || store.notalaborat === 'BARU' ? 'BARU' : store.notalaborat}`"
          style="min-width: 200px;"
        />
      </div> -->
    </q-bar>
    <div class="col-grow bg-grey">
      <!-- jika belum ada pemeriksaan -->
      <div
        v-if="filterredTable.length === 0"
        class="column full-height flex-center text-white"
      >
        Belum Ada Permintaan Order ke Laborat
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 1px)"
      >
        <q-list
          separator
        >
          <transition-group>
            <template
              v-for="(item, i) in filterredTable"
              :key="i"
            >
              <q-expansion-item
                class="q-pa-xs bg-white"
                style="margin-bottom:.2em"
                hide-expand-icon
              >
                <!-- <template #header>
                  {{ item }}
                </template> -->
                <template #header>
                  <q-item-section>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="">Nomor </span> : <span class="text-weight-bold text-accent">{{ item?.nota }} </span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span
                        class="text-weight-bold"
                        :class="item?.details.length === 1 ? 'text-orange' : 'text-primary'"
                      >{{ item?.details.length === 1 ? 'NON-PAKET' : 'PAKET' }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class=""> {{ item?.details[0]?.pemeriksaanlab?.rs21 !== ''? item?.details[0]?.pemeriksaanlab?.rs21: item?.details[0]?.pemeriksaanlab?.rs2 }} </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section
                    side
                    top
                  >
                    <q-item-label
                      lines="2"
                      class="f-10"
                    >
                      <span class="text-primary">{{ dateFullFormat(item?.tgl_order) }} </span>
                    </q-item-label>

                    <q-item-label>
                      <q-badge
                        outline
                        color="primary"
                        :label="`Rp. ${formatRp(parseInt(item?.details[0]?.rs6) + parseInt(item?.details[0]?.rs13))}`"
                      />
                    </q-item-label>
                    <q-item-label>
                      <div class="row q-my-xs">
                        <q-btn
                          flat
                          round
                          size="sm"
                          icon="icon-mat-delete"
                          color="negative"
                          class="z-top"
                          @click="hapusItem(item?.id)"
                        />
                      </div>
                    </q-item-label>
                  </q-item-section>
                </template>

                <q-card
                  square
                  flat
                >
                  <q-separator />
                  <q-card-section class="q-pa-none">
                    <q-markup-table
                      dense
                      dark
                    >
                      <thead class="bg-primary">
                        <tr>
                          <th class="text-left">
                            PEMERIKSAAN
                          </th>
                          <th class="text-left">
                            SATUAN
                          </th>
                          <th class="text-left">
                            NILAI NORML
                          </th>
                          <th class="text-right">
                            Hasil
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, n) in item?.details"
                          :key="n"
                        >
                          <td
                            class="text-left ellipsis"
                            style="max-width: 150px;"
                          >
                            {{ row?.pemeriksaanlab?.rs2 }}
                          </td>
                          <td class="text-left f-10">
                            {{ row?.pemeriksaanlab?.satuan }}
                          </td>
                          <td class="text-left f-10">
                            {{ row?.pemeriksaanlab?.nilainormal }}
                          </td>
                          <td class="text-right">
                            ---
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <!-- <q-separator /> -->
            </template>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
import { computed } from 'vue'

const store = usePenunjangPoli()
const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterredTable = computed(() => {
  // const val = store.notalaborat
  const arr = props.pasien?.laborats
  // if (val === 'LIHAT SEMUA') {
  //   return mapping(arr)
  // }
  // const filtered = arr.filter(x => x.rs2 === val)
  return arr
  // return arr
})

// eslint-disable-next-line no-unused-vars
function mapping (item) {
  const arr = item
  const arr2 = arr.length > 0
    ? arr.map(x =>
      ({
        gruper: x.pemeriksaanlab?.rs21 !== '' ? x.pemeriksaanlab?.rs21 : x.pemeriksaanlab?.rs2,
        jenis: x.pemeriksaanlab?.rs21 !== '' ? 'PAKET' : 'NON-PAKET',
        aslix: x
      })
    )
    : []
  console.log('aslix', arr)
  const groupped = groupBy(arr2, gruper => gruper.gruper)
  console.log('group', groupped)
  return groupped
}

// eslint-disable-next-line no-unused-vars
function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.hapusLaborat(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

// eslint-disable-next-line no-unused-vars
function groupBy (list, keyGetter) {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    }
    else {
      collection.push(item)
    }
  })
  const arr = Array.from(map, ([name, value]) => ({ name, value }))
  return arr
}
</script>
