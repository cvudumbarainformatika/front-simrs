<template>
  <div class="column fit bg-orange">
    <div class="col-auto bg-dark text-white">
      <div class="q-pa-md text-weight-bold f-12">
        FORM PRA - ANESTESIA (Diisi oleh Dokter)
      </div>
    </div>
    <div class="col full-height bg-white relative-position">
      <q-scroll-area style="height:calc( 100% - 1px );">
        <div class="q-pa-md">
          <div class="text-weight-bold f-14">
            KAJIAN SISTEM
          </div>
          <q-separator class="q-mb-md q-mt-xs" />
          <div class="row q-col-gutter-md">
            <div class="col-6 bor">
              <!-- mulai -->
              <template
                v-for="(item, i) in store.masterKajian"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  size="xs"
                  :label="item.kajian"
                />
                <q-separator />
              </template>

              <!-- mulai -->
            </div>
            <div class="col-6 bor">
              <!-- mulai -->
              <template
                v-for="(item, i) in store.masterKajian2"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  size="xs"
                  :label="item.kajian"
                />
                <q-separator />
              </template>
            </div>
          </div>
          <div class="row full-width">
            <div class="col-auto">
              Keterangan :
            </div>
            <div class="col q-ml-sm">
              <q-input
                v-model="store.form.keteranganKajianSistem"
                dense
                outlined
                standout="bg-yellow-3"
                class="full-width"
                label="Keterangan"
              />
            </div>
          </div>
          <q-separator class="q-my-md" />

          <!-- Keadaan UMUM -->
          <div class="text-weight-bold f-14">
            KEADAAN UMUM
          </div>
          <q-separator class="q-mb-md q-mt-xs" />
          <div class="row q-col-gutter-md">
            <div class="col-6 q-gutter-xs">
              <q-input
                v-model="store.form.skorMallampati"
                label="Skor Mallampati"
                dense
                outlined
                standout="bg-yellow-3"
              />
              <q-input
                v-model="store.form.jantung"
                label="Jantung"
                dense
                outlined
                standout="bg-yellow-3"
              />
              <q-input
                v-model="store.form.paruparu"
                label="Paru-paru"
                dense
                outlined
                standout="bg-yellow-3"
              />
              <q-input
                v-model="store.form.abdomen"
                label="Abdomen"
                dense
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-6 q-gutter-xs">
              <q-input
                v-model="store.form.tulangbelakang"
                label="Tulang Belakang"
                dense
                outlined
                standout="bg-yellow-3"
              />
              <q-input
                v-model="store.form.ekstremitas"
                label="Ekstremitas"
                dense
                outlined
                standout="bg-yellow-3"
              />
              <q-input
                v-model="store.form.neurologi"
                label="ENeurologi (Bila dapat diperiksa)"
                dense
                outlined
                standout="bg-yellow-3"
              />
            </div>
          </div>
          <q-separator class="q-my-md" />

          <!-- Laboratorium -->
          <div class="text-weight-bold f-14">
            LABORATORIUM (bila tersedia)
          </div>
          <q-separator class="q-mb-md q-mt-xs" />
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <template
                v-for="(item, n) in store.masterLab2"
                :key="n"
              >
                <div class="row full-width">
                  <div class="col q-ml-sm q-mb-xs">
                    <q-input
                      v-model="item.model"
                      outlined
                      standout="bg-yellow-3"
                      class="full-width"
                      :label="item.nama"
                      type="textarea"
                      rows="2"
                    />
                  </div>
                </div>
              </template>
            </div>
            <div class="col-6">
              <template
                v-for="(item, n) in store.masterLab"
                :key="n"
              >
                <div class="row full-width">
                  <div class="col q-ml-sm q-mb-xs">
                    <q-input
                      v-model="item.model"
                      type="textarea"
                      outlined
                      standout="bg-yellow-3"
                      class="full-width"
                      :label="item.nama"
                      rows="2"
                    />
                  </div>
                </div>
              </template>
            </div>
            <div class="row full-width">
              <div class="col-auto">
                Keterangan :
              </div>
              <div class="col q-ml-sm">
                <q-input
                  v-model="store.form.keteranganLaborat"
                  dense
                  outlined
                  standout="bg-yellow-3"
                  class="full-width"
                  label="Keterangan"
                />
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />

          <!-- Laboratorium -->
          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <div class="text-weight-bold f-14">
                ASA CLASIFICATION
              </div>
              <q-separator class="q-my-xs" />
              <div
                v-for="(item, i) in store.asaClass"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  size="xs"
                  :label="item.nama"
                />
                <q-separator style="margin-top:0px; margin-bottom:0px;" />
              </div>
            </div>
            <div class="col-6">
              <div class="text-weight-bold f-14">
                PENYULIT ANESTESIA LAIN
              </div>
              <q-separator class="q-my-xs" />
              <div>
                <q-btn
                  label="Klik disini untuk tambah inputan"
                  color="primary"
                  dense
                  no-caps
                  size="sm"
                  class="q-px-sm full-width"
                  outline
                >
                  <q-popup-edit
                    v-slot="scope"
                    v-model="store.penyulit"
                    class="q-pa-none"
                    persistent
                    @update:model-value="addPenyulit"
                  >
                    <q-input
                      v-model="scope.value"
                      dense
                      standout="bg-yellow-3"
                      autofocus
                      outlined
                      placeholder="Enter untuk menambahkan"
                      @keyup.enter="scope.set"
                    />
                  </q-popup-edit>
                </q-btn>
              </div>
              <div class="q-my-sm">
                <table>
                  <tr
                    v-for="(isian,i) in store.form.penyulitAnastesi"
                    :key="i"
                  >
                    <td class="f-12">
                      {{ i+1 }}.
                      <span class="cursor-pointer">
                        {{ isian }}
                        <q-popup-edit
                          v-slot="scope"
                          v-model="store.form.penyulitAnastesi[i]"
                          auto-save
                          :cover="false"
                          :offset="[0, 0]"
                          class="q-pa-none"
                        >
                          <q-input
                            v-model="scope.value"
                            dense
                            autofocus
                            outlined
                            standout="bg-yellow-3"
                            @keyup.enter="scope.set"
                          />
                        </q-popup-edit>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <q-separator class="q-my-sm" />

          <!-- Catata tindak lanjut -->
          <div class="text-weight-bold f-14">
            CATATAN TINDAK LANJUT
          </div>
          <q-separator class="q-my-sm" />
          <div class="q-gutter-sm">
            <q-input
              v-model="store.form.catatan"
              dense
              outlined
              standout="bg-yellow-3"
              class="full-width"
              label="Catatan Tindak Lanjut"
            />
            <q-input
              v-model="store.form.perencanaan"
              dense
              outlined
              standout="bg-yellow-3"
              class="full-width"
              label="Perencanaan Anestesia"
            />
          </div>
          <q-separator class="q-my-xs" />
        </div>
        <div style="margin-bottom: 200px;" />
      </q-scroll-area>

      <q-card
        square
        class="absolute-bottom full-width shadow-1"
        dark
      >
        <div class="flex justify-end q-pa-md">
          <q-btn
            color="primary"
            :loading="store.waiting"
            :disable="store.waiting"
            @click="saveData"
          >
            Simpan Pra Anestesia
          </q-btn>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { usePraAnastesiStore } from 'src/stores/simrs/pelayanan/poli/praanastesi'
// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from 'vue'

const store = usePraAnastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  store.getMaster()
})

function addPenyulit() {
  store.setPenyulits().then(() => {
    store.penyulit = null
  })
}

function saveData() {
  store.saveData(props.pasien)
    .then(() => {
      store.initForm()
    })
}

// const options = ref([
//   {
//     label: 'Ya',
//     value: '1'
//   },
//   {
//     label: 'Tidak',
//     value: '0'
//   }])

// const masterPraAnastesi = computed(() => store.master)

// ==========================================================KAJIAN SISTEM
// const kajianSistem = computed(() => {
//   const arr = masterPraAnastesi.value
//   return arr.filter(x => x.group === 'kajian sistem')?.map(x => {
//     const obj = {
//       kajian: x.nama,
//       model: []
//     }
//     return obj
//   })
// })

// const arr = computed(() => {
//   const arr = kajianSistem.value
//   return arr
// })
// const arr1 = computed(() => {
//   const arr1 = arr.value
//   return arr1.splice(0, 8)
// })

// const kajianSistem = ref([
//   { kajian: 'Hilangnya Gigi', model: [] },
//   { kajian: 'Masalah Mobilisasi Leher', model: [] },
//   { kajian: 'Leher Pendek', model: [] },
//   { kajian: 'Batuk', model: [] },
//   { kajian: 'Sesak Nafas', model: [] },
//   { kajian: 'Baru Saja Menderita Infeksi', model: [] },
//   { kajian: 'Saluran Nafas Atas Sakit dada', model: [] },
//   { kajian: 'Denyut Jantung Tidak Normal', model: [] },
//   { kajian: 'Muntah', model: [] },
//   { kajian: 'Pingsan', model: [] },
//   { kajian: 'Stroke', model: [] },
//   { kajian: 'Kejang', model: [] },
//   { kajian: 'Sedang Hamil', model: [] },
//   { kajian: 'Kelainan Tulang Belakang', model: [] },
//   { kajian: 'Obesitas', model: [] }
// ])
// // eslint-disable-next-line no-unused-vars
// const KeadaanUmum = ref([
//   { nama: 'Skor Mailampati', model: '' },
//   { nama: 'Jantung', model: '' },
//   { nama: 'Paru-paru', model: '' },
//   { nama: 'Abdomen', model: '' },
//   { nama: 'Tulang Belakang', model: '' },
//   { nama: 'Ekstremitas', model: '' },
//   { nama: 'Neurologi', model: '' },
//   { nama: 'Denyut Jantung Tidak Normal', model: '' }
// ])
// eslint-disable-next-line no-unused-vars
// const laboratorium = ref([
//   { nama: 'Hb/Ht', model: '', check: false },
//   { nama: 'PT', model: '', check: false },
//   { nama: 'Glukosa Darah', model: '', check: false },
//   { nama: 'Tes Kehamilan', model: '', check: false },
//   { nama: 'Kalium', model: '', check: false },
//   { nama: 'Leukosit', model: '', check: false },
//   { nama: 'Ureum', model: '', check: false },
//   { nama: 'Trombosit', model: '', check: false },
//   { nama: 'Rontgen Dada', model: '', check: false },
//   { nama: 'EKG (40 tahun keatas)', model: '', check: false },
//   { nama: 'Na/CI', model: '', check: false },
//   { nama: 'Kreatinin', model: '', check: false }
// ])
// // eslint-disable-next-line no-unused-vars
// const asaClass = ref([
//   { nama: 'ASA 1 Pasien normal yang sehat', model: '', check: false },
//   { nama: 'ASA 2 Pasien dengan penyakit Sistemik ringan', model: '', check: false },
//   { nama: 'ASA 3 Pasien dengan penyakit sistemik berat', model: '', check: false },
//   { nama: 'ASA 4 Pasien dengan penyakit sistemik berat yang mengancam nyawa', model: '', check: false }
// ])

// const lab = computed(() => {
//   const arr = laboratorium.value
//   return arr
// })
// eslint-disable-next-line no-unused-vars
// const lab1 = computed(() => {
//   const arr1 = lab.value
//   return arr1.splice(0, 6)
// })
</script>

<style lang="scss" scoped>
.bor {
  border-right: 1px solid grey;
}
</style>
