<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Permintaan Laborat
      </div>
      <q-space />
      <div class="q-py-xs">
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
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <!-- {{ filterredTable }}
      {{ pasien?.laborats }} -->
      <!-- jika belum ada pemeriksaan -->
      <div
        v-if="fillterTable(pasien?.laborats)?.length === 0"
        class="column full-height flex-center text-white relative-position"
      >
        <div v-if="!loading">
          Belum Ada Permintaan Order ke Laborat
        </div>
        <div v-else class="absolute-top fit">
          <app-loader bg-color="transparent" />
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 1px)"
      >
        <!-- {{ fillterTable(pasien?.laborats) }} -->
        <q-list
          separator
        >
          <transition-group>
            <template
              v-for="(item, i) in fillterTable(pasien?.laborats)"
              :key="i"
            >
              <q-expansion-item
                class="q-pa-xs bg-white"
                style="margin-bottom:.2em"
                hide-expand-icon
              >
                <template #header>
                  <q-item-section>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span v-if="!loading" class="text-weight-bold text-accent">{{ item?.name }} </span>
                      <div v-else>
                        <q-skeleton type="text" />
                        <q-skeleton type="text" width="50%" />
                      </div>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span
                        v-if="!loading"
                        class="text-weight-bold"
                        :class="item?.value.length === 1 ? 'text-orange' : 'text-primary'"
                      >{{ item?.value.length === 1 ? 'NON-PAKET' : 'PAKET' }}</span>
                      <div v-else>
                        <q-skeleton type="text" height="30px" width="20%" />
                      </div>
                    </q-item-label>
                    <!-- <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class=""> {{ item?.details[0]?.pemeriksaanlab?.rs21 !== ''? item?.details[0]?.pemeriksaanlab?.rs21: item?.details[0]?.pemeriksaanlab?.rs2 }} </span>
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section
                    side
                    top
                  >
                    <!-- <q-item-label
                      lines="2"
                      class="f-10"
                    >
                      <span class="text-primary">{{ dateFullFormat(item?.tgl_order) }} </span>
                    </q-item-label> -->

                    <q-item-label>
                      <q-badge
                        v-if="!loading"
                        outline
                        color="primary"
                        :label="`Rp. ${formatRp(parseInt(item?.value[0]?.aslix.rs6) + parseInt(item?.value[0]?.aslix.rs13))}`"
                      />
                      <q-skeleton v-else type="text" height="30px" width="80px" />
                    </q-item-label>
                    <q-item-label>
                      <div class="row q-my-xs">
                        <q-btn
                          v-if="!loading"
                          flat
                          round
                          size="sm"
                          icon="icon-mat-delete"
                          color="negative"
                          class="z-top"
                          @click="hapusItem(item)"
                        />
                        <q-skeleton v-else type="text" height="30px" width="15px" />
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
                          v-for="(row, n) in item?.value"
                          :key="n"
                        >
                          <td
                            class="text-left ellipsis"
                            style="max-width: 150px;"
                          >
                            {{ row?.aslix?.pemeriksaanlab?.rs2 }}
                          </td>
                          <td class="text-left f-10">
                            {{ row?.aslix?.pemeriksaanlab?.satuan }}
                          </td>
                          <td class="text-left f-10">
                            {{ row?.aslix?.pemeriksaanlab?.nilainormal }}
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
            </template>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { formatRp } from 'src/modules/formatter'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
// import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
// import { computed } from 'vue'

const store = useLaboratPoli()
const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// const filterredTable = computed(() => {
//   const val = store.notalaborat
//   const arr = props.pasien?.laborats
//   // if (val === 'LIHAT SEMUA') {
//   //   return mapping(arr)
//   // }
//   const filtered = arr.filter(x => x.rs2 === val)
//   return filtered
//   // return arr
// })

function fillterTable (val) {
  if (val) {
    const s = store.notalaborat
    const res = val?.filter(x => x.nota === s)
    const hasil = res?.length ? mapping(res[0].details) : []
    // console.log('filterre ', hasil)
    return hasil
  }
  return []
}

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
  // console.log('aslix', arr)
  const groupped = groupBy(arr2, gruper => gruper.gruper)
  // console.log('group', groupped)
  return groupped
}

// eslint-disable-next-line no-unused-vars
function hapusItem (item) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', item?.value?.map(x => x.aslix.id))
    // console.log('HAPUS', props.pasien)
    store.hapusLaboratBaru(props.pasien, item?.value?.map(x => x.aslix.id))
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
