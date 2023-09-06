<template>
  <div class="column full-height">
    <!-- ===============================================================================KOLOM ISIAN PEMERIKSAAN -->
    <div class="col-8">
      <div class="bg-primary text-white q-pa-md">
        <div class="f-12">
          Pemeriksaan (Vital Sign)
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
          <!-- <div class="col-12 f-12 text-weight-bold">
                    Pemeriksaan Fisik
                  </div> -->
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
              use-input
              fill-input
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="store.formVital.denyutjantung"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Denyut Jantung"
              :rules="[val => !!val || 'Harap diisi Terlebih dahulu']"
              hide-bottom-space
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="store.formVital.pernapasan"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Pernapasan"
              :rules="[val => !!val || 'Harap diisi Terlebih dahulu']"
              hide-bottom-space
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="store.formVital.sistole"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Sistole per mmHg"
              :rules="[
                val => !!val || 'Harap diisi Terlebih dahulu',
                val => !isNaN(val) || 'Harus pakai Nomor',
              ]"
              hide-bottom-space
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="store.formVital.diastole"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Diastole per mmHg"
              :rules="[
                val => !!val || 'Harap diisi Terlebih dahulu',
                val => !isNaN(val) || 'Harus pakai Nomor',
              ]"
              hide-bottom-space
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="store.formVital.suhutubuh"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Suhu Tubuh"
              :rules="[
                val => !!val || 'Harap diisi Terlebih dahulu',
                val => !isNaN(val) || 'Harus pakai Nomor',
              ]"
              hide-bottom-space
            />
          </div>

          <div
            class="col-12 f-12 text-weight-bold"
          >
            <!-- Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual -->
            <q-separator class="q-my-xs" />
          </div>
          <!-- <div class="col-4">
            Status Psikologis
          </div> -->
          <div class="col-12">
            <div class="q-mb-sm">
              Status Psikologis
            </div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Tidak ada kelainan"
                label="Tidak ada kelainan"
              />
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Cemas"
                label="Cemas"
              />
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Takut"
                label="Takut"
              />
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Marah"
                label="Marah"
              />
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Sedih"
                label="Sedih"
              />
              <q-radio
                v-model="store.formVital.statuspsikologis"
                dense
                val="Lain-lain"
                label="Lain-lain"
              />
            </div>
          </div>
          <div class="col-12 row q-col-gutter-sm q-mt-sm">
            <div class="col-6">
              <q-input
                v-model="store.formVital.sosialekonomi"
                standout="bg-yellow-3 text-black"
                outlined
                label="Sosial Ekonomi"
                autogrow
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="store.formVital.spiritual"
                standout="bg-yellow-3 text-black"
                outlined
                label="Spiritual"
                autogrow
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
    <!-- =================================================================================KOLOM TABEL PENANDAAN -->
    <div class="col-4">
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
                class="
                        text-right
                        bg-yellow-3
                        q-pa-sm"
              >
                <q-btn
                  label="Simpan Pemeriksaan"
                  color="primary"
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
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { onMounted, ref } from 'vue'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'

const store = usePemeriksaanFisik()

const { menus } = useMenuPemeriksaan()
const formRef = ref()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  filterShapes: {
    type: Array,
    default: () => []
  }
})

onMounted(() => {
  // console.log('canvas', canvasEl.value?.clientWidth)
  // getImage()
  // canvasWidth.value = canvasEl.value?.clientWidth
  store.initReset().then(() => {
    formRef.value.resetValidation()
  })
})

async function onSubmit() {
  const valid = await formRef.value?.validate()
  if (valid) {
    store.savePemeriksaan(props.pasien, menus.value).then(() => {
      formRef.value.resetValidation()
    })
  }
}
</script>
