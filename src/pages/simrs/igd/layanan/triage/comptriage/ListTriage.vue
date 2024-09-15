<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Triage
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.triage?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <div class="row">
                  <div class="col-7">
                    <q-item-label
                      class="f-12"
                    >
                      <span class="">DOA </span> : <span class="text-weight-bold">{{ item?.doa ?? '-' }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Pasien Hamil </span>: <span class="text-weight-bold">{{ pasienhamil(item?.flaghamil) }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Hari Pertama Haid Terakhir : <span class="text-weight-bold">{{ item?.haid ?? '-' }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Gravida : <span class="text-weight-bold">{{ item?.gravida ?? '-' }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Partus : <span class="text-weight-bold">{{ item?.partus ?? '-' }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Abortus : <span class="text-weight-bold">{{ item?.abortus ?? '-' }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Nyeri : <span class="text-weight-bold">{{ item?.nyeri ?? '-' }} <span style="color: blue;"> ({{ item.scorenyeri }})</span></span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Lochea : <span class="text-weight-bold">{{ item?.lochea ?? '-' }}  <span style="color: blue;">({{ item.scorelochea }})</span></span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Protein Urin : <span class="text-weight-bold">{{ item?.proteinurin ?? '-' }} <span style="color: blue;"> ({{ item.scoreproteinurin }})</span></span>
                      </span>
                    </q-item-label>
                  </div>
                  <div class="col-5">
                    <div v-if="item.kategoritriage !== null && item.doa === null">
                      <div class="q-pa-none row items-center q-gutter-md">
                        <q-card v-if="item?.kategoritriage === 'Resusitasi'" class="my-card" style="width: 60%;">
                          <q-card-section class="bg-red text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-red text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-red text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                        <q-card v-else-if="item?.kategoritriage === 'P1'" class="my-card" style="width: 60%;">
                          <q-card-section class="bg-deep-orange text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-deep-orange text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-deep-orange text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                        <q-card v-else-if="item?.kategoritriage === 'P2'" class="my-card" style="width: 60%;">
                          <q-card-section class="bg-yellow text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-yellow text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-yellow text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                        <q-card v-else-if="item?.kategoritriage === 'P3'" class="my-card" style="width: 60%;">
                          <q-card-section class="bg-green text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-green text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-green text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                        <q-card v-else class="my-card" style="width: 60%;">
                          <q-card-section class="bg-primary text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                      </div>
                    </div>
                    <div v-else-if="item.doa !== null && item.kategoritriage === null">
                      <div class="q-pa-none row items-center q-gutter-md">
                        <q-card class="my-card" style="width: 60%;">
                          <q-card-section class="bg-black text-white items-center">
                            <div class="text-h6 text-center">
                              DOA
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                      </div>
                    </div>
                    <div v-else>
                      <div class="q-pa-none row items-center q-gutter-md">
                        <q-card class="my-card" style="width: 60%;">
                          <q-card-section class="bg-primary text-white items-center">
                            <div class="text-h6 text-center">
                              {{ item?.kategoritriage }}
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions vertical>
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Primary Surve  {{ item.hasilprimarusurve }}
                            </q-btn>
                            <q-separator inset />
                            <q-btn flat style="font-size: 11px;" class="text-weight-bold">
                              Secondary Surve {{ item.hasilsecondsurve }}
                            </q-btn>
                          </q-card-actions>
                        </q-card>
                      </div>
                    </div>
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div>
                  <div class="q-gutter-md">
                    <q-item-label>
                      <span class="text-weight-bold"><u>Kondisi Pasien Tiba</u></span>
                    </q-item-label>
                    <div class="row">
                      <div class="col-5">
                        <q-item-label>
                          <span>Jalan Nafas </span> : <span class="text-weight-bold">{{ item?.jalannafas ?? '-' }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-5">
                        <q-item-label>
                          <span>Pernapasan </span> : <span class="text-weight-bold">{{ item?.pernapasan ?? '-' }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-5">
                        <q-item-label>
                          <span>Sirkulasi </span> : <span class="text-weight-bold">{{ item?.sirkulasi ?? '-' }}</span>
                        </q-item-label>
                      </div>
                      <div>
                        <div class="col-5">
                          <q-item-label>
                            <span>Disability</span> : <span class="text-weight-bold">{{ item?.disability ?? '-' }}</span>
                          </q-item-label>
                        </div>
                      </div>
                    </div>
                    <q-separator class="q-my-md" />
                    <q-item-label>
                      <span class="text-weight-bold"><u>Secondary Survei</u></span>
                    </q-item-label>
                    <div class="row">
                      <div class="col-4">
                        <q-item-label avatar>
                          <span>Nadi: <span class="text-weight-bold">{{ item?.nadi ?? '-' }} x/mnt  <span style="color: blue;">({{ item?.scorenadi }})</span></span></span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Pernapasan: <span class="text-weight-bold">  {{ item?.pernapasanx ?? '-' }} x/mnt
                            <span style="color: blue;"> ({{ item?.scorepernapasanx }})</span></span></span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Sistole/Diastole : <span class="text-weight-bold">{{ item?.sistole ?? '-' }}/{{ item?.diastole ?? '-' }} mmHg
                            <span style="color: blue;">({{ item?.scoresistole }}/{{ item?.scorediastole }})</span></span></span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Eye : <span class="text-weight-bold">{{ item?.sistole ?? '-' }}</span></span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Verbal : <span class="text-weight-bold">{{ item?.verbal ?? '-' }}</span></span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label avatar>
                          <span class="">Suhu  : <span class="text-weight-bold">{{ item?.suhu ?? '-' }}&deg; C <span style="color: blue;">({{ item?.scoresuhu }}) </span></span>
                          </span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">SPo2  :<span class="text-weight-bold"> {{ item?.spo2 ?? '-' }}% <span style="color: blue;">({{ item?.scorespo2 }})</span></span>
                          </span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Kesadaran  :<span class="text-weight-bold"> {{ item?.kesadaran ?? '-' }} <span style="color: blue;">({{ item?.scorekesadaran }})</span></span></span>
                        </q-item-label>
                        <q-item-label avatar>
                          <span class="">Motorik : <span class="text-weight-bold">{{ item?.motorik ?? '-' }}</span></span>
                        </q-item-label>
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-section>

              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <!-- <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  /> -->
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { computed } from 'vue'
const store = useTriageIgd()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

const lists = computed(() => {
  const arr = props.pasien?.triage
  // console.log('sasa', props.pasien)
  return arr?.sort((a, b) => { return b.id - a.id })
})

function pasienhamil (val) {
  if (val === '1' || val === 1) {
    return 'Ya'
  }
  else {
    return 'Tidak'
  }
}

// function getYT (val) {
//   if (val === 1 || val === '1') {
//     return 'Ya'
//   }
//   else if (val === 0 || val === '0') {
//     return 'Tidak'
//   }
//   else {
//     return '-'
//   }
// }

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
