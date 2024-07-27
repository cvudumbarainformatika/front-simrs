<template>
  <q-dialog backdrop-filter="blur(4x)" @before-show="init" persistent>
    <q-card style="width: 80vw; max-width: 80vw;" dark>
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

      <q-card-section style="height:70vh; max-height: 70vh; overflow-x:hidden" class="scroll q-pa-none">
        <!-- <q-list v-if="itm !== null" separator dark>
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
        </q-list> -->
        <!-- <div v-else class="column flex-center q-pa-lg full-height full-width cursor-pointer">
          <div class="flex items-center flex-center full-width full-height q-gutter-md">
            <q-card v-for="item in lists" :key="item.groups" style="width:30%" @click="ruangSelected(item)">
              <q-card-section class="text-dark q-py-md">
                <div class="f-14 text-weight-bold">
                  {{ item?.rs5?.toUpperCase() }}
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="text-dark q-pa-none">
                <q-list dense separator class="q-pa-none">
                  <q-item v-for="(kmr, n) in getKelas(item)" :key="n" :class="kmr.kapasitas === kmr.terisi ? 'bg-grey-3 text-dark' : 'bg-yellow-3 text-dark'">
                    <q-item-section>
                      <q-item-label class="">
                        {{ kmr?.kelas ? 'KELAS '+kmr.kelas : 'ISO / HCU' }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{ kmr.terisi === kmr.kapasitas? 'FULL' : kmr.kosong + ' BED TERSEDIA' }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div> -->
        <!-- <div style="margin-bottom: 100px;" /> -->

        <div class="container q-pa-lg">
          <div class="figure" v-for="item in lists" :key="item.groups">
            <div class="content">
              <q-card class="fit cursor-pointer" style="overflow: hidden;">
                <q-card-section class="text-dark q-py-md">
                  <div class="f-14 text-weight-bold">
                    {{ item?.rs5?.toUpperCase() }}
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="text-dark q-pa-none">
                  <q-list dense separator class="q-pa-none">
                    <q-item
                      v-for="(kmr, n) in getKelas(item)" :key="n" :class="kmr.kapasitas === kmr.terisi ? 'bg-grey-3 text-dark' : 'bg-yellow-3 text-dark'"
                      clickable v-ripple @click="pilihKamar(kmr)"
                    >
                      <q-item-section>
                        <q-item-label class="">
                          {{ kmr?.kelas ? 'KELAS '+kmr.kelas : 'ISO / HCU' }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side class="text-weight-bold text-dark">
                        {{ kmr.terisi === kmr.kapasitas? 'FULL' : kmr.kosong + ' BED TERSEDIA' }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
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

    <!-- DIALOG PILIh KAMAR -->
    <q-dialog v-model="dialogKamar" persistent transition-show="flip-down" transition-hide="flip-up" backdrop-filter="blur(4px) saturate(150%)">
      <q-card class="bg-primary text-white">
        <q-bar>
          <div>{{ kamar?.ruang ?? kamar?.kamar }}</div>

          <q-space />

          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Tutup
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="f-14 text-weight-bold">
            {{ kamar?.kelas ? 'KELAS '+kamar.kelas : 'NON KELAS' }}
          </div>
        </q-card-section>
        <q-separator dark />
        <q-card-section class="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
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
const dialogKamar = ref(false)

const kamar = ref(null)

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

// eslint-disable-next-line no-unused-vars
const ruangSelected = (item) => {
  console.log(item)
  const arr = item.kamars
  const gr = groupBy(arr, 'rs5')
  item.group_in = gr
  itm.value = item

  // console.log('group', itm.value)
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

// eslint-disable-next-line no-unused-vars
function getKelas (item) {
  const kamars = item.kamars.length ? item.kamars.map(x => x.rs5) : []
  const grup = [...new Set(kamars)]
  const temp = []
  // if (grup.length) {
  const kmrs = item.kamars
  for (let i = 0; i < grup?.length; i++) {
    const el = grup[i]
    const kmr = kmrs.filter(x => x.rs5 === el)
    // temp.push({ rs5: el, kamars: kmr })
    // grup[i].kamars = kmr
    const obj = {
      group: el,
      kelas: kmr.length ? kmr[0]?.kamar?.rs3 : null,
      kamar: kmr.length ? kmr[0]?.rs1 : null,
      ruang: kmr.length ? kmr[0]?.kamar?.rs2 : null,
      kamars: kmr,
      kapasitas: kmr.length,
      terisi: kmr.filter(x => x.kunjungan.length).reduce((x, y) => x + y.kunjungan.length, 0),
      kosong: kmr.length - kmr.filter(x => x.kunjungan.length).reduce((x, y) => x + y.kunjungan.length, 0)
    }
    temp.push(obj)
  }
  // }
  // console.log('item', temp)
  return temp
}

function pilihKamar (item) {
  console.log('pilihKamar', item)
  kamar.value = item
  dialogKamar.value = true
}

</script>

<style lang="scss" scoped>
.content {
  max-width: 100%;
  display: block;
}
.figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

.figure > .content {
  grid-row: 1 / -1;
  grid-column: 1;
}

.figure a {
  color: black;
  text-decoration: none;
}

figcaption {
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255,255,255,.5);
  padding: .2em .5em;
  justify-self: start;
}

.container {
  column-count: 4;
  column-gap: 10px;
  width: 100%;
}
</style>
