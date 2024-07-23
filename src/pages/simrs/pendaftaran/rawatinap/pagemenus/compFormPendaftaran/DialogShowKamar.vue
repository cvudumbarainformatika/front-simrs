<template>
  <q-dialog backdrop-filter="blur(4x)" @before-show="init" persistent>
    <q-card style="width: 75vw; max-width: 80vw;" dark>
      <q-card-section class="q-py-sm q-px-md">
        <div class="row items-center justify-between">
          <div class="text-h6">
            {{ !itm? 'Status & Ruangan Rawat Inap' : 'Status Terisi & Kosong ' + itm?.rs5 }}
          </div>
          <div v-if="itm">
            Terisi : {{ lihatItem()?.terisi }}
          </div>
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-section style="height:70vh; max-height: 70vh" class="scroll q-pa-none">
        <q-list v-if="itm !== null" separator dark>
          <q-list v-for="(lbl, i) in itm.group_in" :key="i" separator dark>
            <q-item-label header class="bg-primary text-white">
              {{ lbl[0]?.kamar?.rs2 ?? lbl[0]?.rs1 }}
            </q-item-label>
            <q-separator dark />
            <q-item v-for="(item, n) in Object.entries(lbl)" :key="n" class="q-my-sm" clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="icon-mat-bedroom_parent" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ item[1]?.rs1 }}
                </q-item-label>
                <q-item-label caption lines="1">
                  <div class="flex q-gutter-sm">
                    <div class="q-px-sm q-py-xs bg-primary">
                      NO BED : {{ item[1]?.rs2 }}
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-px-sm q-py-xs text-weight-bold" :class="item[1]?.kunjungan?.length? 'bg-negative text-white' : 'bg-yellow-3 text-dark'">
                  {{ item[1]?.kunjungan?.length? 'TERISI' : 'KOSONG' }}
                </div>
                <q-item-label caption lines="2" v-if="item[1]?.kunjungan?.length" class="q-mt-xs">
                  Pasien : {{ item[1]?.kunjungan[0]?.nama }} , Alamat : {{ item[1]?.kunjungan[0]?.alamat }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator dark />
          </q-list>
        </q-list>
        <div v-else class="column flex-center q-pa-lg full-height full-width cursor-pointer">
          <div class="flex items-center flex-center full-width q-gutter-md">
            <q-card v-for="item in lists" :key="item.groups" style="width:30%" @click="ruangSelected(item)">
              <q-card-section class="text-dark q-py-md">
                <div class="f-14 text-weight-bold">
                  {{ item?.rs5?.toUpperCase() }}
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="text-dark q-py-sm">
                <div class="flex items-center q-gutter-xs justify-end">
                  <div>Kapasitas : </div>  <q-btn round size="sm" class="q-pa-xs" color="primary">
                    {{ item?.kamars?.length }}
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn
          flat :label="itm? 'Back' : 'Ok'" color="white" class="bg-primary" @click="closeOrBack"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

const itm = ref(null)

const lists = computed(() => {
  const asli = props.items
  const thumb = []
  for (let i = 0; i < asli.length; i++) {
    const el = asli[i]
    const kmr = el.kamars
    for (let n = 0; n < kmr.length; n++) {
      const x = kmr[n]
      if (x.kamar !== null) {
        const kunj = x.kunjungan.length
          ? x.kunjungan.filter(a => {
            if (a.titipan !== '') {
              return a.titipan === x.rs5
            }
            return a.kd_kelas === x.rs5
          })
          : []
        x.kunjungan = kunj
      }
    }
    thumb.push(el)
  }

  return thumb
})

const ruangSelected = (item) => {
  console.log(item)
  const arr = item.kamars
  const gr = groupBy(arr, 'rs5')
  item.group_in = gr
  itm.value = item

  console.log('group', itm.value)
}

const init = () => {
  itm.value = null

  console.log('init', lists.value)
}

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item
    ]
  }),
  {}
)

function closeOrBack () {
  if (itm.value !== null) {
    itm.value = null
    return
  }

  emits('close', itm.value)
}

function lihatItem () {
  console.log('lihatItem', itm.value)
  const ad = itm.value.kamars
  const terisi = ad.filter(x => x.kunjungan.length).reduce((x, y) => x + y.kunjungan.length, 0)
  console.log('terisi', terisi)
  return { terisi, kapasitas: ad.length }
}

</script>
