<template>
  <div class="column full-height">
    <!-- ===============================================================================KOLOM ISIAN PEMERIKSAAN -->
    <div
      v-if="!canvasFull"
      class="col-8"
    >
      <div class="bg-primary text-white q-pa-md">
        <div class="f-12">
          Pemeriksaan (Vital Sign) <div class="text-white">
            <!-- {{ store.templateActive }} -->
          </div>
        </div>
      </div>
      <q-separator />
      <q-scroll-area
        style="height: calc(100% - 52px);"
      >
        <q-form
          ref="formRef"
          class="row q-col-gutter-sm q-pa-md"
          @submit.prevent.stop="onSubmit"
        >
          <div class="col-2">
            <q-input
              v-model="store.formVital.denyutjantung"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="N"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
              @update:model-value="setNumber($event,'denyutjantung')"
            />
          </div>
          <div class="col-2">
            <q-input
              v-model="store.formVital.pernapasan"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="RR"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
              @update:model-value="setNumber($event,'pernapasan')"
            />
          </div>
          <div class="col-2">
            <q-input
              v-model="store.formVital.sistole"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Sys"
              :rules="[
                val => !!val || 'Harap diisi',
                val => !isNaN(val) || 'Hrs Nomor',
              ]"
              hide-bottom-space
              @update:model-value="setNumber($event,'sistole')"
            />
          </div>
          <div class="col-2">
            <q-input
              v-model="store.formVital.diastole"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Dia"
              :rules="[
                val => !!val || 'Hrp diisi',
                val => !isNaN(val) || 'Hrs Nomor',
              ]"
              hide-bottom-space
              @update:model-value="setNumber($event,'diastole')"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="store.formVital.suhutubuh"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Suhu"
              :rules="[
                val => !!val || 'Hrp diisi',
                val => !isNaN(val) || 'Hrs Nomor',
              ]"
              hide-bottom-space
              @update:model-value="setNumber($event,'suhutubuh')"
            />
          </div>
          <div class="col-12">
            <q-select
              v-model="store.formVital.tingkatkesadaran"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Tingkat Kesadaran"
              :options="store.optionsTingkatkesadaran"
              stack-label
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-dropdown-icon
            />
          </div>
          <div class="col-6">
            <div class="q-mt-sm">
              <q-input
                v-model="store.formVital.sosialekonomi"
                standout="bg-yellow-3 text-black"
                outlined
                label="Sosial Ekonomi"
                autogrow
              />
            </div>
            <div class="q-mt-sm">
              <q-input
                v-model="store.formVital.spiritual"
                standout="bg-yellow-3 text-black"
                outlined
                label="Spiritual"
                autogrow
              />
            </div>
          </div>

          <!-- <div
            class="col-6 f-12 text-weight-bold"
          >
            <q-separator class="q-my-xs" />
          </div> -->
          <div class="col-6">
            <div class="text-weight-bold">
              Status Psikologis
              <q-separator class="q-mb-md q-mt-xs" />
            </div>
            <div class="q-gutter-sm">
              <q-option-group
                v-model="store.selectStatusPsikologi"
                :options="opt"
                color="primary"
                inline
                dense
                type="checkbox"
                @update:model-value="updateSelectionPsikologis"
              />
            </div>

            <!-- <div class="q-mt-sm">
              <q-separator class="q-my-sm" />
              <div class="q-mb-sm">
                Nyeri ? <em class="text-primary">{{ store.formVital.keteranganskornyeri }}</em>
                <span class="q-ml-sm">
                  <q-icon
                    size="lg"
                    color="teal"
                    :name="iconNyeri"
                  />
                </span>
              </div>
              <q-separator class="q-mt-sm" />
              <div>
                <q-slider
                  v-model="store.formVital.skornyeri"
                  color="primary"
                  thumb-color="primary"
                  label-color="primary"
                  label-text-color="yellow"
                  markers
                  :marker-labels="(val)=> fnMarkerLabel"
                  marker-labels-class="text-primary"
                  label-always
                  switch-label-side
                  :min="0"
                  :max="10"
                  @update:model-value="store.setKeteranganSkornyeri"
                />
              </div>
            </div> -->
          </div>
          <div class="col-12">
            <q-separator class="q-my-sm" />
            <div class="text-weight-bold">
              Kesadaran <span class="text-primary"> {{ store.formVital.kesadaran }}</span>
            </div>
            <q-separator class="q-my-sm" />
            <div class="col-12 row q-col-gutter-lg">
              <q-slider
                v-model="store.formVital.kesadarane"
                marker-labels
                label-always
                switch-label-side
                :label-value="'E ' + store.formVital.kesadarane"
                :min="0"
                :max="4"
                class="col-4"
                @update:model-value="sumKesadaran"
              />
              <q-slider
                v-model="store.formVital.kesadaranv"
                marker-labels
                :label-value="'V ' + store.formVital.kesadaranv"
                label-always
                switch-label-side
                :min="0"
                :max="5"
                class="col-4"
                color="green"
                @update:model-value="sumKesadaran"
              />
              <q-slider
                v-model="store.formVital.kesadaranm"
                marker-labels
                label-always
                :label-value="'M ' + store.formVital.kesadaranm"
                switch-label-side
                :min="0"
                :max="6"
                class="col-4"
                color="orange"
                @update:model-value="sumKesadaran"
              />
              <!-- <q-input
                v-model="store.formVital.kesadarane"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="E"
                :rules="[
                  val => !!val || 'Hrp diisi',
                  val => !isNaN(val) || 'Hrs Nomor',
                  val => val < 5 || 'Max 4',
                ]"
                hide-bottom-space
                style="width:33%"
                @update:model-value="sumKesadaran"
              />
              <q-input
                v-model="store.formVital.kesadaranv"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="V"
                :rules="[
                  val => !!val || 'Hrp diisi',
                  val => !isNaN(val) || 'Hrs Nomor',
                  val => val < 6 || 'Max 5',
                ]"
                hide-bottom-space
                style="width:33%"
                @update:model-value="sumKesadaran"
              />
              <q-input
                v-model="store.formVital.kesadaranm"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="M"
                :rules="[
                  val => !!val || 'Hrp diisi',
                  val => !isNaN(val) || 'Hrs Nomor',
                  val => val < 7 || 'Max 6',
                ]"
                hide-bottom-space
                style="width:33%"
                @update:model-value="sumKesadaran"
              /> -->
            </div>
          </div>
          <div class="col-12">
            <q-separator class="q-my-sm" />
          </div>
          <div
            v-if="pasien?.kodepoli==='POL018'"
            class="col-12"
          >
            <dada-paru-form-vue />
          </div>
        </q-form>
      </q-scroll-area>
    </div>
    <!-- =================================================================================KOLOM TABEL PENANDAAN -->
    <div :class="canvasFull? 'col-12':'col-4'">
      <div class="full-height">
        <div class="column full-height">
          <div class="col-auto">
            <q-bar
              dense
              class="bg-teal text-white"
            >
              <div class="f-12">
                Detail Kelainan Fisik / Penandaan Gambar
              </div>
            </q-bar>
          </div>
          <div class="col">
            <q-card
              flat
              dark
              square
              class="column-break full-height"
            >
              <q-scroll-area
                v-if="filterShapes.length"
                style="height: calc(100% - 52px);"
              >
                <q-list
                  dark
                  separator
                >
                  <q-item
                    v-for="(item, i) in filterShapes"
                    :key="i"
                  >
                    <q-item-section avatar>
                      <q-avatar
                        size="24px"
                        color="orange"
                      >
                        {{ i + 1 }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ item.anatomy ? item.anatomy : '...' }}</q-item-label>
                      <q-item-label
                        caption
                        lines="2"
                      >
                        {{ item.ket ? item.ket : '...' }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section
                      side
                      style="padding: 0;"
                    >
                      <q-btn
                        flat
                        icon="icon-mat-delete"
                        size="xs"
                        padding="xs"
                        color="negative"
                        @click="store.deleteObjShapes(i)"
                      />
                    </q-item-section>
                  </q-item>
                  <q-separator dark />
                </q-list>
              </q-scroll-area>
              <div
                v-else
                class="column flex-center items-center"
                style="height: calc(100% - 52px);"
              >
                Data Belum Ada
              </div>
              <div
                v-if="!canvasFull"
                class="text-right bg-yellow-3 q-pa-sm"
              >
                <q-btn
                  label="Simpan Pemeriksaan"
                  color="primary"
                  :loading="store.loadingform"
                  :disable="store.loadingform"
                  @click="onSubmit"
                />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DadaParuFormVue from './khusus/DadaParuForm.vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { onMounted, ref } from 'vue'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'

const store = usePemeriksaanFisik()

const { menus } = useMenuPemeriksaan()
const formRef = ref()

const opt = ref([
  { value: 'Tidak ada kelainan', label: 'Tidak ada kelainan' },
  { value: 'Cemas', label: 'Cemas' },
  { value: 'Takut', label: 'Takut' },
  { value: 'Marah', label: 'Marah' },
  { value: 'Sedih', label: 'Sedih' },
  { value: 'Lain-lain', label: 'Lain-lain' }
])

const updateSelectionPsikologis = (val) => {
  console.log(val)
  store.setFormVital('statuspsikologis', val.join(', '))
  console.log(store.formVital.statuspsikologis)
}
// const icons = ref([
//   'icon-my-emoticon-excited-outline',
//   'icon-my-emoticon-outline',
//   'icon-my-emoticon-neutral-outline',
//   'icon-my-emoticon-sad-outline',
//   'icon-my-emoticon-confused-outline',
//   'icon-my-emoticon-cry-outline'
// ])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  canvasFull: {
    type: Boolean,
    default: false
  },
  filterShapes: {
    type: Array,
    default: () => []
  }
})

function setNumber(evt, key) {
  // console.log(evt, 'includes', evt.includes('.'), 'indexOf', evt.indexOf('.'), 'length', evt.length)
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  // console.log('evt', evt, 'key', key)
  store.setFormVital(key, nilai)
}
function sumKesadaran() {
  const jml = parseInt(store.formVital.kesadarane) + parseInt(store.formVital.kesadaranm) + parseInt(store.formVital.kesadaranv)
  store.setTingkatKesadaran(jml)
}

onMounted(() => {
  // console.log('canvas', canvasEl.value?.clientWidth)
  // getImage()
  // canvasWidth.value = canvasEl.value?.clientWidth
  store.initReset(false).then(() => {
    if (formRef.value) formRef.value.resetValidation()
  })
})

async function onSubmit() {
  const valid = await formRef.value?.validate()
  if (valid) {
    store.savePemeriksaan(props.pasien, menus.value).then(() => {
      if (formRef.value) formRef.value.resetValidation()
    })
  }
}

// function keteranganSkorNyeri(val) {
//   if (val === 0) {
//     return 'tidak ada nyeri'
//   } else if (val > 0 && val <= 3) {
//     return 'nyeri ringan'
//   } else if (val > 3 && val <= 6) {
//     return 'nyeri sedang'
//   } else if (val > 6 && val <= 10) {
//     return 'nyeri berat'
//   }
// }

// function fnMarkerLabel(val) {
//   return `${10 * val}%`
// }

// function iconNyeri(val) {
//   if (val < 2) {
//     return 'icon-my-emoticon-excited-outline'
//   } else if (val >= 2 && val < 4) {
//     return 'icon-my-emoticon-outline'
//   } else if (val >= 4 && val < 6) {
//     return 'icon-my-emoticon-neutral-outline'
//   } else if (val >= 6 && val < 8) {
//     return 'icon-my-emoticon-confused-outline'
//   } else if (val >= 8 && val < 10) {
//     return 'icon-my-emoticon-angry-outline'
//   } else if (val === 10) {
//     return 'icon-my-emoticon-cry-outline'
//   }
// }

// const iconNyeri = computed(() => {
//   const val = store?.formVital.skornyeri
//   let icon = 'icon-my-emoticon-excited-outline'
//   if (val < 2) {
//     icon = 'icon-my-emoticon-excited-outline'
//   } else if (val >= 2 && val < 4) {
//     icon = 'icon-my-emoticon-outline'
//   } else if (val >= 4 && val < 6) {
//     icon = 'icon-my-emoticon-neutral-outline'
//   } else if (val >= 6 && val < 8) {
//     icon = 'icon-my-emoticon-confused-outline'
//   } else if (val >= 8 && val < 10) {
//     icon = 'icon-my-emoticon-angry-outline'
//   } else if (val === 10) {
//     icon = 'icon-my-emoticon-cry-outline'
//   }

//   return icon
// })

</script>
