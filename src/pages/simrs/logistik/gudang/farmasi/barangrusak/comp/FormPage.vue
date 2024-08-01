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
                    :rules="[val=>(val !== null && val !== '') || 'Harap diisi']"
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
                  v-if="!!store.form.tstok"
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
                :disable="store.loading"
                @update:model-value="updateJum($event)"
                @keyup.enter.stop="simpan()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-my-lg justify-end">
        <app-btn
          label="simpan"
          :loading="store.loading"
          :disable="store.loading"
          @click="simpan()"
        />
      </div>
    </div>
    <!-- hasil Input -->
    <!-- {{ store.form }}
    {{ store.params }} -->
    <div
      v-if="store.loading"
      class="row"
    >
      <app-loading />
    </div>
    <div
      v-if="!store.loading && !store.items.length"
      class="row justify-center"
    >
      <app-no-data-small />
    </div>
    <div v-if="!store.loading && store.items.length">
      <div class="row bg-dark text-white q-pa-xs q-mb-sm">
        <div
          class="col-auto"
          style="width:5%"
        >
          No
        </div>

        <div
          class="col-auto anak"
        >
          Nama Barang
        </div>
        <div
          class="col-auto anak"
        >
          Penyedia
        </div>
        <div
          class="col-auto anak"
        >
          Nomor Penerimaan
        </div>
        <div
          class="col-auto anak"
        >
          Tanggal Entry
        </div>

        <div
          class="col-auto anak"
        >
          Status
        </div>
        <div
          class="col-auto anak text-right"
        >
          Jumlah Rusak
        </div>
        <div
          class="col-auto anak text-right"
        >
          Harga
        </div>
        <div
          class="col-auto anak text-right"
        >
          Nilai Rusak
        </div>
        <div
          class="col-auto text-right"
          style="width:5%"
        >
          #
        </div>
      </div>
      <div
        v-for="(item,i) in store.items"
        :key="i"
      >
        <div
          class="row q-pa-xs q-mb-sm"
          :class="i%2==1?'bg-blue-grey-2':''"
        >
          <div
            class="col-auto"
            style="width:5%"
          >
            {{ i+1 }}
          </div>

          <div
            class="col-auto anak"
          >
            {{ item?.masterobat?.nama_obat }}
          </div>
          <div
            class="col-auto anak"
          >
            {{ item?.pihakketiga?.nama??'Penyedia Tidak Ditemukan' }}
          </div>
          <div
            class="col-auto anak"
          >
            {{ item?.nopenerimaan }}
          </div>
          <div
            class="col-auto anak"
          >
            {{ dateFullFormat(item?.tgl_entry) }}
          </div>

          <div
            class="col-auto anak"
          >
            {{ item?.status }}
          </div>
          <div
            class="col-auto anak text-right"
          >
            {{ item?.jumlah }}
          </div>
          <div
            class="col-auto anak text-right"
          >
            {{ formatRpDouble(parseFloat(item?.harga_net),2) }}
          </div>
          <div
            class="col-auto anak text-right"
          >
            {{ formatRpDouble(parseFloat(item?.harga_net)*parseFloat(item?.jumlah),2) }}
          </div>
          <div
            class="col-auto text-right"
            style="width:5%"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-if="item?.kunci==='1'"
                flat
                icon="icon-mat-lock"
                dense
                color="negative"
                size="sm"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Sudah Terkunci
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="!item?.kunci"
                flat
                icon="icon-mat-lock_open"
                dense
                color="green"
                size="sm"
                :loading="item.loadingKunci"
                :disable="item.loadingKunci"
                @click="store.kunci(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Kunci dan Kurangi Stok
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="!item?.kunci"
                flat
                icon="icon-mat-delete"
                dense
                size="sm"
                color="negative"
                :loading=" item.loading"
                @click="store.deleteRinci(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Hapus
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useFormBarangRusakStore } from 'src/stores/simrs/farmasi/barangrusak/form'
import { ref, onUnmounted } from 'vue'

const store = useFormBarangRusakStore()
function updateJum (evt) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  const stok = store.form.stok
  if (nilai > stok) {
    notifErrVue('Jumlah Barang Rusak Tidak Boleh Melebihi Jumlah Stok')
    store.setForm('jumlah', stok)
  }
  else store.setForm('jumlah', nilai)
}
// auto
const refObat = ref(null)
const refBatch = ref(null)
const refPenerimaan = ref(null)
const refStatus = ref(null)
// inp
const refJumlah = ref(null)
// eslint-disable-next-line no-unused-vars
function resetvalidasi () {
  refObat.value?.$refs?.refAuto?.resetValidation()
  refBatch.value?.$refs?.refAuto?.resetValidation()
  refPenerimaan.value?.$refs?.refAuto?.resetValidation()
  refStatus.value?.$refs?.refAuto?.resetValidation()
  refJumlah.value?.$refs?.refInput?.resetValidation()
}
function validasi () {
  let obat = refObat.value?.$refs?.refAuto?.validate()
  let batch = refBatch.value?.$refs?.refAuto?.validate()
  let penerimaan = refPenerimaan.value?.$refs?.refAuto?.validate()
  let status = refStatus.value?.$refs?.refAuto?.validate()
  let jumlah = refJumlah.value?.$refs?.refInput?.validate()

  if (!store.form.jumlah || store.form.jumlah === '' || store.form.jumlah === null) {
    notifErrVue('Jumlah Barang Rusak Belum diisi')
    jumlah = false
  }

  if (!store.form.status || store.form.status === '' || store.form.status === null) {
    notifErrVue('Status Belum dipilih')
    status = false
  }

  if (!store.form.nopenerimaan || store.form.nopenerimaan === '' || store.form.nopenerimaan === null) {
    notifErrVue('Nomor Penerimaan Belum dipilih')
    penerimaan = false
  }

  if (!store.form.no_batch || store.form.no_batch === '' || store.form.no_batch === null) {
    notifErrVue('Nomor Batch Belum dipilih')
    batch = false
  }

  if (!store.form.kd_obat || store.form.kd_obat === '' || store.form.kd_obat === null) {
    notifErrVue('Obat Belum dipilih')
    obat = false
  }

  if (
    obat &&
   batch &&
   penerimaan &&
   status &&
   jumlah
  ) return true
  else return false
}
function simpan () {
  if (validasi()) {
    store.simpan().then(() => { resetvalidasi() })
  }
}
onUnmounted(() => {
  store.resetForm()
})
</script>
<style lang="scss" scoped>
.anak{
  white-space: normal !important;
  width:calc(90% / 8);
  overflow-wrap: break-word;
}
</style>
