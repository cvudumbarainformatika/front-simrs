<template>
  <q-card
    flat
    square
    class="full-height bg-grey"
  >
    <div class="column full-height">
      <div class="col-auto bg-teal text-white">
        <div class="q-px-sm q-py-xs">
          Data Pemeriksaan Fisik
        </div>
      </div>
      <div class="col-grow">
        <q-scroll-area
          v-if="pasien?.pemeriksaanfisik?.length"
          style="height:calc(100% - 1px)"
        >
          <!-- <q-list
            separator
          >
            <transition-group name="list">
              <template
                v-for="(item, i) in pasien?.pemeriksaanfisik"
                :key="i"
              >
                <q-item
                  class="q-pa-xs list-move"
                  dark
                >
                  <q-item-section class="q-pa-xs">
                    <q-item-label
                      class=""
                      lines="2"
                    >
                      Denyut Jantung : {{ item?.rs4 }}
                    </q-item-label>

                    <q-item-label
                      class=""
                      lines="2"
                    >
                      Pernapasan : {{ item?.pernapasan }}
                    </q-item-label>

                    <q-item-label>
                      Sosial Ekonomi
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="2"
                    >
                      {{ item?.sosialekonomi ? item.sosialekonomi : '-' }}
                    </q-item-label>
                    <q-item-label>
                      Spiritual
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="2"
                    >
                      {{ item?.spiritual ? item.spiritual : '-' }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section
                    side
                  >
                    <q-item-label class="text-right">
                      <div class="q-mb-xs">
                        <q-badge
                          outline
                          color="orange"
                        >
                          Sistole : {{ item?.sistole }}
                        </q-badge>
                      </div>
                      <div class="q-mb-xs">
                        <q-badge
                          outline
                          color="orange"
                        >
                          Diastole : {{ item?.diastole }}
                        </q-badge>
                      </div>
                      <div>
                        <q-badge
                          outline
                          color="yellow"
                        >
                          Suhu Tubuh : {{ item?.sistole }}
                        </q-badge>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator dark />
                <div class="q-pa-sm flex items-center">
                  <q-btn
                    color="grey"
                    round
                    flat
                    dense
                    :icon="expanded===i+1 ? 'icon-mat-keyboard_arrow_up' : 'icon-mat-keyboard_arrow_down'"
                    @click="expand(i)"
                  />
                  <q-space />
                  <div class="q-gutter-sm">
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                      @click="hapusItem(item.id)"
                    />
                  </div>
                </div>
                <q-card
                  flat
                  dark
                  square
                >
                  <q-slide-transition>
                    <div v-show="expanded===i+1">
                      <q-separator dark />
                      <q-list
                        v-if="item.detailgambars.length"
                        separator
                        dark
                      >
                        <q-item
                          v-for="(row, n) in item.detailgambars"
                          :key="n"
                        >
                          <q-item-section avatar>
                            <q-avatar
                              size="24px"
                              color="orange"
                            >
                              {{ n + 1 }}
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ row.anatomy }}</q-item-label>
                            <q-item-label caption>
                              {{ row.ket }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                      <div
                        v-else
                        class="text-center q-pa-md"
                      >
                        Tidak ada detail anatomy
                      </div>
                    </div>
                  </q-slide-transition>
                </q-card>
                <q-separator
                  color="grey"
                  size="5px"
                />
              </template>
            </transition-group>
          </q-list> -->
          <template
            v-for="(item, i) in pasien?.pemeriksaanfisik"
            :key="i"
          >
            <q-card
              flat
              bordered
              square
            >
              <div class="row q-pa-xs q-col-gutter-xs">
                <div class="col-4">
                  <!-- NADI -->
                  <comp-monitor
                    :nilai="item?.rs4"
                    icon="icon-mat-heart_broken"
                  />
                </div>
                <div class="col-4">
                  <!-- PERNAPASAN -->
                  <comp-monitor
                    :nilai="item?.pernapasan"
                    label="RR"
                  />
                </div>
                <div class="col-4">
                  <!-- SUHU -->
                  <comp-monitor
                    :nilai="item?.suhutubuh"
                    label="Suhu Tubuh"
                    icon="icon-my-standing-human-body-silhouette-svgrepo-com"
                    celcius
                  />
                </div>
                <div class="col-12">
                  <!-- TEKANAN DARAH -->
                  <comp-td
                    :sistole="item?.sistole"
                    :diastole="item?.diastole"
                    label="TD sys/dia per mmHg"
                    icon="icon-mat-recycling"
                    :sys-obj="tekananDarah(item?.sistole)"
                    :dias-obj="tekananDarahDias(item?.diastole)"
                  />
                </div>
              </div>
              <q-separator />
              <div v-if="item.detailgambars.length">
                <div class="text-weight-bold q-pa-xs text-right">
                  Penandaan Anatomy
                </div>
                <q-separator />
                <q-list
                  dense
                  separator
                >
                  <q-item
                    v-for="(row, n) in item.detailgambars"
                    :key="n"
                  >
                    <q-item-section
                      avatar
                      thumbnail
                      class="q-pa-xs"
                    >
                      <q-avatar
                        size="18px"
                        color="orange"
                      >
                        {{ n + 1 }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ row.anatomy }}</q-item-label>
                      <q-item-label
                        caption
                        style="margin-top:-3px"
                      >
                        Ket : {{ row.ket }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card>
            <q-separator />
            <div class="q-pa-xs flex items-center bg-grey-2">
              <div />
              <q-space />
              <div class="q-gutter-sm">
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="icon-mat-delete"
                  color="negative"
                  @click="hapusItem(item.id)"
                />
              </div>
            </div>
            <q-separator
              color="grey-10"
              size="2px"
            />
          </template>
        </q-scroll-area>
        <div
          v-else
          class="column flex-center full-height"
        >
          Data Pemeriksaan Belum Ada
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import CompMonitor from './CompMonitor.vue'
import CompTd from './CompTd.vue'
// import { ref } from 'vue'

import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useQuasar } from 'quasar'

const store = usePemeriksaanFisik()
const $q = useQuasar()

// const expanded = ref(0)
// function expand(i) {
//   expanded.value === i + 1 ? expanded.value === 0 ? expanded.value = i + 1 : expanded.value = 0 : expanded.value = i + 1
// }
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function tekananDarah(val) {
  const normal = val >= 100 || val <= 120
  const prahipertensi = val >= 121 || val <= 139
  const hipertensiderajat1 = val >= 140 || val <= 159
  const hipertensiderajat2 = val >= 160

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-yellow', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-orange', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-negative', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}
function tekananDarahDias(val) {
  const normal = val >= 60 || val <= 79
  const prahipertensi = val >= 80 || val <= 89
  const hipertensiderajat1 = val >= 90 || val <= 99
  const hipertensiderajat2 = val >= 100

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-yellow', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-orange', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-negative', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}

function hapusItem(id) {
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
