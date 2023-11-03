<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Order Laborat
      </div>
    </q-bar>
    <div class="col full-height">
      <!-- <q-scroll-area style="height: calc(100% - 1px);"> -->
      <q-form
        ref="formRef"
        class="row q-pa-md q-col-gutter-xs"
        @submit="saveOrderLaborat"
      >
        <div class="col-12">
          <q-input
            v-model="store.permintaanLaborats"
            label="Permintaan (Klik Untuk Cari Pemeriksaan)"
            autogrow
            outlined
            standout="bg-yellow-3"
            icon="icon-mat-search"
            :rules="[val => !!val || 'Harap cari pemeriksaan dahulu']"
            lazy-rules="ondemand"
            hide-bottom-space
            @click="modalOpen = true"
          />
          <!-- <q-select
            ref="cariRef"
            v-model="store.caripemeriksaanlab"
            dense
            outlined
            standout="bg-yellow-3"
            use-input
            hide-selected
            fill-input
            emit-value
            map-options
            :option-value="obj => obj"
            option-label="name"
            label="Cari Pemeriksaan"
            :options="options"
            hide-dropdown-icon
            style="width:100%"
            :rules="[val => !!val || 'Harap cari pemeriksaan dahulu']"
            lazy-rules="ondemand"
            hide-bottom-space
            @filter="filterFn"
            @update:model-value="val => insertList(val)"
          >
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Data tidak ditemukan
                </q-item-section>
              </q-item>
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>
                    {{ scope.opt.name }}
                  </q-item-label>
                  <q-item-label :class="scope.opt.value[0].jenis === 'NON-PAKET' ? 'text-orange' : 'text-primary'">
                    <strong>  {{ scope.opt.value[0].jenis }} </strong>
                    - <span class="text-italic text-negative">Biaya: Rp. {{ formatRp(scope.opt.value[0].biayapolispesialis) }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select> -->
        </div>
        <div class="col-6">
          <q-input
            ref="diagnosaRef"
            v-model="store.form.diagnosa_masalah"
            label="Diagnosa / Masalah"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="store.form.catatan_permintaan"
            label="Catatan"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <!-- <div class="col-12 q-my-xs">
          spesimen
          <q-separator />
        </div>
        <div class="col-6">
          <q-select
            v-model="store.form.asal_sumber_spesimen"
            label="Asal Sumber Spesimen"
            dense
            outlined
            standout="bg-yellow-3"
            use-input
            input-debounce="0"
            :options="asalSumberSpesimenOptions"
            @new-value="createValueAsalSumberSpesimen"
            @filter="filterAs"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="store.form.lokasi_pengambilan_spesimen"
            label="Bag. Tbh Pengambilan Spesimen"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <div class="col-3">
          <q-input
            v-model="store.form.jumlah_spesimen_klinis"
            label="Jumlah Spesimen"
            dense
            outlined
            standout="bg-yellow-3"
            :rules="[val => !isNaN(val) || 'Harus pakai Nomor']"
            hide-bottom-space
          />
        </div>
        <div class="col-3">
          <q-input
            v-model="store.form.volume_spesimen_klinis"
            label="Volume Spesimen / ml"
            dense
            outlined
            standout="bg-yellow-3"
            :rules="[val => !isNaN(val) || 'Harus pakai Nomor']"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="store.form.metode_pengambilan_spesimen"
            label="Metode Pengambilan Spesimen"
            dense
            outlined
            standout="bg-yellow-3"
            use-input
            input-debounce="0"
            :options="metodePengambilanSpesimenOptions"
            @new-value="createValueMetodePengambilanSpesimen"
            @filter="filterMs"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="store.form.kondisi_spesimen"
            label="Kondisi Spesimen : Warna, Bau, Dst"
            dense
            outlined
            standout="bg-yellow-3"
            hide-bottom-space
          />
        </div>
        <div class="col-3">
          <app-input-date
            :model="store.form.tanggalpengambilanspesimen"
            label="Tgl Spesimen diambil"
            outlined
            @set-model="(val) => store.setForm('tanggalpengambilanspesimen', val)"
          />
        </div>
        <div class="col-3">
          <app-input-date
            :model="store.form.jampengambilanspesimen"
            label="Jam Spesimen diambil"
            outlined
            :type-date="false"
            @set-model="(val) => store.setForm('jampengambilanspesimen', val)"
          />
        </div>
        <div class="col-12 q-my-xs">
          Fiksasi
          <q-separator />
        </div>
        <div class="col-3">
          <app-input-date
            :model="store.form.tanggalfiksasi"
            label="Tgl Fiksasi"
            outlined
            @set-model="(val) => store.setForm('tanggalfiksasi', val)"
          />
        </div>
        <div class="col-3">
          <app-input-date
            :model="store.form.jamfiksasi"
            label="Jam Fiksasi"
            outlined
            :type-date="false"
            @set-model="(val) => store.setForm('jamfiksasi', val)"
          />
        </div>
        <div class="col-3">
          <q-input
            v-model="store.form.cairan_fiksasi"
            label="Cairan Fiksasi / ml"
            dense
            outlined
            standout="bg-yellow-3"
            :rules="[val => !isNaN(val) || 'Harus pakai Nomor']"
            hide-bottom-space
          />
        </div>
        <div class="col-3">
          <q-input
            v-model="store.form.volume_cairan_fiksasi"
            label="Volume Cairan Fiks / ml"
            dense
            outlined
            standout="bg-yellow-3"
            :rules="[val => !isNaN(val) || 'Harus pakai Nomor']"
            hide-bottom-space
          />
        </div> -->
        <div class="col-12">
          <q-separator class="q-my-sm" />
        </div>
        <div class="col-6">
          <div class="flex items-center">
            <div class="q-mr-md">
              Pasien Puasa ?
            </div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="store.form.puasa_pasien"
                val="Tidak"
                label="Tidak"
                size="sm"
                dense
              />
              <q-radio
                v-model="store.form.puasa_pasien"
                val="Iya"
                label="Iya"
                size="sm"
                dense
              />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="flex items-center">
            <div class="q-mr-md">
              Cito ?
            </div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="store.form.prioritas_pemeriksaan"
                val="Tidak"
                label="Tidak"
                size="sm"
                dense
              />
              <q-radio
                v-model="store.form.prioritas_pemeriksaan"
                val="Iya"
                label="Iya"
                size="sm"
                dense
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <!-- <q-btn
                label="Reset Form"
                color="dark"
                type="reset"
              /> -->
            <q-btn
              label="Simpan & Kirim Order"
              color="primary"
              type="submit"
              :loading="store.loadingSaveLab"
              :disable="store.loadingSaveLab"
            />
          </div>
        </div>
      </q-form>
      <!-- </q-scroll-area> -->
    </div>

    <!-- MODAL -->
    <ModalPermintaan
      v-model="modalOpen"
      :masters="store.masterlaborat"
      @ok="pilihPemeriksaans"
    />
  </div>
</template>
<script setup>
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
import { onMounted, ref } from 'vue'
// import { formatRp } from 'src/modules/formatter'
import ModalPermintaan from '../complaborat/ModalPermintaan.vue'

const store = usePenunjangPoli()

const modalOpen = ref(false)
// const cariRef = ref(null)
const formRef = ref(null)
const diagnosaRef = ref(null)

const options = ref()
const asalOptions = ['Darah', 'Urine', 'Feses', 'Jaringan Tubuh']
const metodeOptions = ['Eksisi', 'Kerokan', 'Operasi', 'Aspirasi / Biopsi']
const asalSumberSpesimenOptions = ref([])
const metodePengambilanSpesimenOptions = ref([])

const props = defineProps({
  pasien: { type: Object, default: null }
})

onMounted(() => {
  options.value = store.masterlaborat
  asalSumberSpesimenOptions.value = asalOptions
  metodePengambilanSpesimenOptions.value = metodeOptions

  // cariRef.value.focus()
})

// async function filterFn(val, update, abort) {
//   if (val.length < 1) {
//     abort()
//     return
//   }
//   update(
//     () => {
//       const needle = val.toLowerCase()
//       // const arr = 'kdpemeriksaan'
//       const splits = ['name']
//       const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
//       const filteredData = multiFilter(store.masterlaborat, splits, needle)
//       options.value = filteredData
//     },
//     ref => {
//       if (val !== '' && ref.options.length) {
//         ref.setOptionIndex(-1)
//         ref.moveOptionSelection(1, true)
//       }
//     }
//   )
// }

// function insertList(val) {
//   console.log(val)
//   store.setDetails(val)
//   diagnosaRef.value.focus()
// }

// function filterAs(val, update) {
//   update(() => {
//     if (val === '') {
//       asalSumberSpesimenOptions.value = asalOptions
//     } else {
//       const needle = val.toLowerCase()
//       asalSumberSpesimenOptions.value = asalOptions.filter(
//         v => v.toLowerCase().indexOf(needle) > -1
//       )
//     }
//   })
// }

// function createValueAsalSumberSpesimen(val, done) {
//   if (val.length > 0) {
//     if (!asalOptions.includes(val)) {
//       asalOptions.push(val)
//     }
//     done(val, 'add-unique')
//   }
// }
// function filterMs(val, update) {
//   update(() => {
//     if (val === '') {
//       metodePengambilanSpesimenOptions.value = metodeOptions
//     } else {
//       const needle = val.toLowerCase()
//       metodePengambilanSpesimenOptions.value = metodeOptions.filter(
//         v => v.toLowerCase().indexOf(needle) > -1
//       )
//     }
//   })
// }

// function createValueMetodePengambilanSpesimen(val, done) {
//   if (val.length > 0) {
//     if (!metodeOptions.includes(val)) {
//       metodeOptions.push(val)
//     }
//     done(val, 'add-unique')
//   }
// }

function saveOrderLaborat() {
  // INI diganti function baru
  store.saveOrderLaboratBaru(props.pasien).then(() => {
    // console.log(formRef.value)
    formRef.value.resetValidation()
    // cariRef.value.focus()
  })
}

function pilihPemeriksaans(val) {
  // console.log(val)
  modalOpen.value = false
  const arr = val.length ? val.map(x => x.name) : []
  const implode = arr.length ? arr.join('||') : ''
  // console.log(implode)
  store.setPermintaanLaborats(implode, val)
  // insertList(val)
}

</script>
