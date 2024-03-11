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

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <div class="text-weight-bold f-14">
                TEKNIK KHUSUS
              </div>
              <q-separator class="q-my-sm" />
              <div
                v-for="(item, i) in store.teknikKhusus"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  :label="item.nama"
                  size="sm"
                  dense
                  class="q-py-xs"
                />
                <q-input
                  v-if="item.check"
                  v-model="item.keterangan"
                  dense
                  autofocus
                  outlined
                  standout="bg-yellow-3"
                  placeholder="Keterangan Jika Ada"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="text-weight-bold f-14">
                TEKNIK ANESTESIA
              </div>
              <q-separator class="q-my-sm" />
              <div
                v-for="(item, i) in store.teknikAnestesia"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  :label="item.nama"
                  size="sm"
                  dense
                  class="q-py-xs"
                />
                <div
                  v-if="item.check"
                >
                  <q-input
                    v-show="item.nama !== 'Regional'"
                    v-model="item.keterangan"
                    dense
                    autofocus
                    outlined
                    standout="bg-yellow-3"
                    placeholder="Keterangan Jika Ada"
                  />
                  <div
                    v-show="item.nama === 'Regional'"
                    class="q-pl-md q-py-xs rounded-borders"
                    style="border: 1px solid grey;"
                  >
                    <q-option-group
                      v-model="store.regional"
                      :options="store.regionals"
                      color="primary"
                      inline
                      size="xs"
                      type="checkbox"
                      dense
                      @update:model-value="(val)=> setRegional(item, val)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- perawatan pasca anestesia -->
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold f-14">
            PERAWATAN PASCA ANESTESIA
          </div>
          <q-separator class="q-my-sm" />
          <div
            v-for="(item, i) in store.pascaAnastesi"
            :key="i"
          >
            <q-checkbox
              v-model="item.check"
              :label="item.nama"
              size="sm"
              dense
              class="q-py-xs"
            />
            <div
              v-if="item?.check && item?.nama==='Rawat Khusus'"
              class="q-pl-md q-py-xs rounded-borders row items-center"
              style="border: 1px solid grey;"
            >
              <q-option-group
                v-model="store.modelRawatKhusus"
                :options="store.rawatKhusus"
                color="primary"
                inline
                size="xs"
                type="checkbox"
                dense
                class="col-auto"
                @update:model-value="(val)=> setRawatKhusus(item, val)"
              />
              <q-input
                v-if="rawatkhususLainlain"
                v-model="store.form.keteranganLainlainRawatKhusus"
                dense
                autofocus
                outlined
                standout="bg-yellow-3"
                placeholder="Keterangan Lain-lain Jika Ada"
                class="col q-ml-sm"
              />
            </div>
            <q-input
              v-else-if="item?.check && item?.nama==='APS'"
              v-model="item.keterangan"
              dense
              autofocus
              outlined
              standout="bg-yellow-3"
              placeholder="Keterangan Lain-lain Jika Ada"
            />
          </div>

          <!-- persiapan pra anestesia -->
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold f-14">
            PERSIAPAN PRA ANESTESIA
          </div>
          <q-separator class="q-my-sm" />

          <div class="flex q-gutter-sm items-center q-mb-xs">
            <div>Puasa Mulai : </div>
            <app-input-date
              :model="store.form.mulaiPuasajam"
              label="Jam"
              outlined
              :type-date="false"
              clearable
              valid
              @set-model="val=>store.form.mulaiPuasajam=val"
            />
            <app-input-date
              :model="store.form.mulaiPuasaTgl"
              label="Tanggal"
              clearable
              valid
              outlined
              @set-model="val=>store.form.mulaiPuasaTgl=val"
            />
          </div>
          <div class="flex q-gutter-sm items-center q-mb-xs">
            <div>Pre Nedikasi : </div>
            <app-input-date
              :model="store.form.preMedikasiJam"
              label="Jam"
              clearable
              valid
              outlined
              :type-date="false"
              @set-model="val=>store.form.preMedikasiJam=val"
            />
            <app-input-date
              :model="store.form.preMedikasiTgl"
              label="Tanggal"
              clearable
              valid
              outlined
              @set-model="val=>store.form.preMedikasiTgl=val"
            />
          </div>
          <div class="flex q-gutter-sm items-center q-mb-xs">
            <div>Transportasi Ke Kamar Bedah : </div>
            <app-input-date
              :model="store.form.transKeKamarBedahJam"
              label="Jam"
              clearable
              valid
              outlined
              :type-date="false"
              @set-model="val=>store.form.transKeKamarBedahJam=val"
            />
            <app-input-date
              :model="store.form.transKeKamarBedahTgl"
              label="Tanggal"
              clearable
              valid
              outlined
              @set-model="val=>store.form.transKeKamarBedahTgl=val"
            />
          </div>
          <div class="flex q-gutter-sm items-center q-mb-xs">
            <div>Rencana Operasi : </div>
            <app-input-date
              :model="store.form.rencanaOperasiJam"
              label="Jam"
              clearable
              valid
              outlined
              :type-date="false"
              @set-model="val=>store.form.rencanaOperasiJam=val"
            />
            <app-input-date
              :model="store.form.rencanaOperasiTgl"
              label="Tanggal"
              clearable
              valid
              outlined
              @set-model="val=>store.form.rencanaOperasiTgl=val"
            />
          </div>
          <q-input
            v-model="store.form.catatanPersiapanPraAnastesi"
            label="CATATAN PERSIAPAN PRA ANESTESIA"
            type="textarea"
            outlined
            standout="bg-yellow-3"
            rows="2"
            class="q-mb-xs"
          />
          <q-input
            v-model="store.form.kolomTindakLanjut"
            label="TINDAK LANJUT"
            type="textarea"
            outlined
            standout="bg-yellow-3"
            rows="2"
          />

          <!-- ini q-pa-md akhir -->
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
import { ref, onMounted, watchEffect } from 'vue'

const store = usePraAnastesiStore()

// const regional = ref([])
// eslint-disable-next-line no-unused-vars
const rawatkhusus = ref([])
const rawatkhususLainlain = ref(false)

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
function setRegional(item, val) {
  const str = val.join('||')
  item.keterangan = str
}
function setRawatKhusus(item, val) {
  const str = val.join('||')
  item.keterangan = str
  if (val.includes('Lain-lain')) {
    rawatkhususLainlain.value = true
  } else {
    rawatkhususLainlain.value = false
  }
}

watchEffect(() => {
  if (store.form.keteranganLainlainRawatKhusus !== null) {
    rawatkhususLainlain.value = true
  }
})

function saveData() {
  store.saveData(props.pasien)
    .then(() => {
      store.initForm()
    })
}

</script>

<style lang="scss" scoped>
.bor {
  border-right: 1px solid grey;
}
</style>
