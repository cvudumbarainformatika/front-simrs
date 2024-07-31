<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>

          <div class="col-8">
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-28 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center f-14">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              PROBOLINGGO  67219
            </div>
          </div>
          <div class="col-2">
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 4cm; max-width: 4cm"
            />
          </div>
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN PER RUANGAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode
        </div>
      </q-card-section>
      <q-card-section>
        <Customtable
          :ada-cari="false"
          :items="store.items"
          :columns="store.kolom"
          :column-hide="store.kolomhide"
          :default-btn="false"
          :right-action="false"
          :loading="store.loading"
          row-no
        >
          <!-- tombol print -->
          <template #header-right-before>
            <!-- <q-btn
              ref="refPrint"
              v-print="printObj"
              unelevated
              color="dark"
              round
              size="sm"
              icon="icon-mat-print"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Print
              </q-tooltip>
            </q-btn> -->
          </template>
          <template #header-left-after-search>
            <q-form
              ref="formRef"
              class="row q-pa-md q-col-gutter-xs"
              @submit="store.initAmbilData"
            >
              <div class="row q-col-gutter-sm">
                <div>
                  <app-input-date-human
                    :model="store.tanggal.from"
                    label="dari tanggal"
                    outlined
                    @db-model="setTo"
                    @set-display="setToDisp"
                  />
                </div>
                <div>
                  <app-input-date-human
                    :model="store.tanggal.to"
                    label="sampai tanggal"
                    outlined
                    @db-model="setTox"
                    @set-display="setToFromDisp"
                  />
                </div>
                <div>
                  <q-select
                    v-model="store.params.layanan"
                    use-input
                    fill-input
                    hide-selected
                    option-value="kodelayanan"
                    option-label="namalayanan"
                    :options="layanan"
                    emit-value
                    map-options
                    dense
                    outlined
                    label="Pilih Layanan"
                    transition-show="scale"
                    transition-hide="scale"
                    :rules="[
                      val => !!val || 'Harus diisi'
                    ]"
                  />
                </div>
                <!-- <div>
                  <q-select
                    v-model="store.params.ruangan"
                    use-input
                    fill-input
                    hide-selected
                    option-value="koderuangan"
                    option-label="namaruangan"
                    :options="ruangan"
                    emit-value
                    map-options
                    dense
                    outlined
                    label="Pilih Ruangan"
                    transition-show="scale"
                    transition-hide="scale"
                    :rules="[
                      val => !!val && !!store.params.layanan || 'Harus diisi'
                    ]"
                  />
                </div> -->
                <div>
                  <q-btn
                    label="Cari"
                    type="submit"
                    color="primary"
                    :loading="store.loading"
                    :disable="store.loading"
                  />
                </div>
              </div>
            </q-form>
          </template>
          <template #cell-NamaRuangan="{row}">
            {{ row?.namaruangan }}
          </template>
          <template #cell-Admin="{row}">
            <div class="row justify-end">
              {{ formatDouble(row.Admin) }}
            </div>
          </template>
          <template #cell-AkomodasiKamar="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.AkomodasiKamar) }}
            </div>
          </template>
          <template #cell-TindakanDokter="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.TindakanDokter) }}
            </div>
          </template>
          <template #cell-TindakanKeperawatan="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.TindakanKeperawatan) }}
            </div>
          </template>
          <template #cell-Askep="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.Askep) }}
            </div>
          </template>
          <template #cell-Visite="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.Visite) }}
            </div>
          </template>
          <template #cell-Total="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.Total) }}
            </div>
          </template>
        </Customtable>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { formatDouble } from 'src/modules/formatter'
import Customtable from '../../rekap/CustomTable.vue'
import { useLaporanRekapBillByRuanganStore } from 'src/stores/simrs/laporan/keuangan/billbyruangan/billrekapbyruangan'

const store = useLaporanRekapBillByRuanganStore()
// const to = date.formatDate(Date.now(), 'DD MMMM YYYY')
// const from = date.formatDate(Date.now(), 'DD MMMM YYYY')
const layanan = ref([
  {
    kodelayanan: '1',
    namalayanan: 'RAWAT JALAN'
  },
  {
    kodelayanan: '2',
    namalayanan: 'RAWAT INAP'
  }
])
// const ruangan = ref([])
// const koderuangan = ref(null)

// function isiLayananx (val) {
//   store.params.ruangan = ''
//   // console.log('sasa', val)
//   if (val === '1') {
//     ruangan.value = [
//       {
//         koderuangan: 'POL014',
//         namaruangan: 'IGD'
//       }
//     ]
//   }
//   else if (val === '2') {
//     ruangan.value = store.rajal.map(x => {
//       return {
//         koderuangan: x.kodepoli,
//         namaruangan: x.polirs
//       }
//     })
//     ruangan.value.unshift(
//       {
//         koderuangan: '1',
//         namaruangan: 'Semua Ruangan'
//       }
//     )
//   }
//   else if (val === '3') {
//     // ruangan.value = store.ranap.map(x => {
//     //   return {
//     //     koderuangan: x.rs4,
//     //     namaruangan: x.rs5
//     //   }
//     // })
//     ruangan.value.unshift(
//       {
//         koderuangan: '1',
//         namaruangan: 'Semua Ruangan'
//       }
//     )
//   }
// }

function setToDisp (vaal) {
  store.tanggal.from = vaal
}

function setToFromDisp (vaal) {
  store.tanggal.to = vaal
}

function setTo (val) {
  store.params.tgldari = val
}

function setTox (val) {
  store.params.tglsampai = val
}

store.getRuanganPoli()
store.getRuanganRanap()
store.getTigaPuluhTarif()

</script>

<style lang="scss" scoped>
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.anu{
  max-width: 150px;
  min-width: 50px;
}
.wrap_it{
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  white-space: normal !important;
  word-break: break-word;
}
.kecilin{
  min-width: 10px;
  max-width: 100px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}

</style>
