<template>
  <div class="q-pa-sm">
    <!-- header -->
    <div>
      <div class="row q-col-gutter-xs">
        <!-- Obat -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Obat
            </div>

            <div class="col-9">
              <div class="row">
                <div class="col-12">
                  <app-autocomplete-new
                    ref="refObat"
                    v-model="store.form.kd_obat"
                    label="Pilih Obat"
                    autocomplete="nama_obat"
                    option-label="nama_obat"
                    option-value="kd_obat"
                    outlined
                    valid
                    :loading="store.loadingObat"
                    :source="store.obats"
                    @on-select="store.obatSelected"
                    @buang="store.setParams('q',$event)"
                    @keyup.enter.stop="store.cariObat()"
                  />
                </div>
              </div>
              <div class="row">
                <div
                  v-if="!!store.form.kd_obat"
                  class="f-10 text-weight-bold q-mr-sm"
                >
                  {{ store.form.kd_obat }}
                </div>
                <div
                  v-if="!!store.form.tstok"
                  class="text-italic f-10 text-weight-bold q-mr-xs"
                >
                  {{ store.form.tstok }}
                </div>
                <div
                  v-if="!!store.form.satuan_kcl"
                  class="text-italic f-10 q-mr-xs"
                >
                  {{ store.form.satuan_kcl }}
                </div>
                <div
                  v-if="!!store.form.stok"
                  class="text-italic f-10 text-weight-bold q-mr-xs"
                >
                  (total)
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- bacth -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Nomor Batch
            </div>

            <div class="col-9">
              <app-autocomplete-new
                ref="refBatch"
                v-model="store.form.no_batch"
                label="Pilih Batch"
                autocomplete="nobatch"
                option-label="nobatch"
                option-value="nobatch"
                outlined
                valid
                :loading="store.loadingBatch"
                :source="store.batchs"
                @on-select="store.batchSelected"
                @buang="store.setParams('batch',$event)"
                @keyup.enter.stop="store.cariNoBatch()"
              />
            </div>
          </div>
        </div>
        <!-- penerimaan -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Nomor Penerimaan
            </div>

            <div class="col-9">
              <app-autocomplete-new
                ref="refPenerimaan"
                v-model="store.form.nopenerimaan"
                label="Pilih Penerimaan"
                autocomplete="nopenerimaan"
                :option-label="['nopenerimaan','pbf']"
                option-value="nopenerimaan"
                outlined
                valid
                :loading="store.loadingPenerimaan"
                :source="store.penerimaans"
                @on-select="store.penerimaanSelected"
                @buang="store.setParams('noper',$event)"
                @keyup.enter.stop="store.cariPenerimaan()"
              />
              <div
                v-if="Object.keys(store.penerimaan).length"
                class="row"
              >
                <div
                  class="f-10 q-mr-sm"
                >
                  PBF :
                </div>
                <div
                  class="f-10 text-weight-bold q-mr-sm"
                >
                  {{ store.penerimaan?.penerimaan?.pihakketiga.nama ?? 'PBF Tidak ditemukan' }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- stok -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Stok
            </div>

            <div class="col-9">
              <app-input
                v-model="store.form.stok"
                label="Jumlah Stok"
                outlined
                valid
                readonly
              />
            </div>
          </div>
        </div>
        <!-- Status -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Status
            </div>

            <div class="col-9">
              <app-autocomplete
                ref="refStatus"
                v-model="store.form.status"
                label="Pilih status"
                outlined
                valid
                :source="store.statuses"
              />
            </div>
          </div>
        </div>
        <!-- Jumlah -->
        <div class="col-6">
          <div class="row  items-center q-mb-sm">
            <div class="col-3">
              Jumlah Rusak
            </div>

            <div class="col-9">
              <app-input
                ref="refJumlah"
                v-model="store.form.jumlah"
                label="Jumlah Rusak"
                outlined
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-my-lg justify-end">
        <app-btn
          label="simpan"
          @click="simpan()"
        />
      </div>
    </div>
    <!-- hasil Input -->
    <div>{{ store.form }}</div>
  </div>
</template>
<script setup>
import { useFormBarangRusakStore } from 'src/stores/simrs/farmasi/barangrusak/form'
import { ref } from 'vue'

const store = useFormBarangRusakStore()
// auto
const refObat = ref(null)
const refBatch = ref(null)
const refPenerimaan = ref(null)
const refStatus = ref(null)
// inp
const refJumlah = ref(null)
// eslint-disable-next-line no-unused-vars
function resetvalidasi() {
  refObat.value?.$refs?.refAuto?.resetValidation()
  refBatch.value?.$refs?.refAuto?.resetValidation()
  refPenerimaan.value?.$refs?.refAuto?.resetValidation()
  refStatus.value?.$refs?.refAuto?.resetValidation()
  refJumlah.value?.$refs?.refInput?.resetValidation()
}
function validasi() {
  const obat = refObat.value?.$refs?.refAuto?.validate()
  const batch = refBatch.value?.$refs?.refAuto?.validate()
  const penerimaan = refPenerimaan.value?.$refs?.refAuto?.validate()
  const status = refStatus.value?.$refs?.refAuto?.validate()
  const jumlah = refJumlah.value?.$refs?.refInput?.validate()
  if (
    obat &&
   batch &&
   penerimaan &&
   status &&
   jumlah
  ) return true
  else return false
}
function simpan() {
  validasi()
  console.log('simpan', refObat.value?.$refs?.refAuto)
}
</script>
