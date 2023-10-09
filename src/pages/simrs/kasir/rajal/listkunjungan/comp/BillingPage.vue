<template>
  <div class="q-pa-xs q-mb-xl bg-white">
    <div
      class="row bg-grey q-pa-xs"
    >
      <div class="f-16 text-weight-bold">
        Informasi pasien
      </div>
    </div>
    <div class="row no-wrap q-py-xs">
      <div class="col-6">
        <div class="row no-wrap ">
          <div class="col-3">
            No Rm
          </div>
          <div class="col-9">
            {{ pasien.norm }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Nama
          </div>
          <div class="col-9">
            {{ pasien.nama }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Kelamin
          </div>
          <div class="col-9">
            {{ pasien.kelamin }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Alamat
          </div>
          <div class="col-9">
            {{ pasien.alamat }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Tgl Masuk
          </div>
          <div class="col-9">
            {{ dateFullFormat( pasien.tgl_kunjungan) }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row no-wrap ">
          <div class="col-3">
            No Reg
          </div>
          <div class="col-9">
            {{ pasien.rs1 }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Tgl Lahir
          </div>
          <div class="col-9">
            {{ dateFullFormat( pasien.tgllahir) }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Ruang
          </div>
          <div class="col-9">
            {{ pasien.poli }}
          </div>
        </div>
        <div class="row no-wrap ">
          <div class="col-3">
            Sistem Bayar
          </div>
          <div class="col-9">
            {{ pasien.sistembayar }}
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <!-- <div
      class="row bg-cyan q-pa-xs"
    >
      <div class="f-14 text-weight-bold">
        Billing
      </div>
    </div> -->
    <div class="row items-center justify-end q-mt-sm">
      <q-btn-group outline>
        <q-btn
          :outline="tab !== 'trans'"
          glossy
          push
          color="cyan"
          label="Billing"
          size="md"
          @click="goTo('trans')"
        />
        <q-btn
          :outline="tab !== 'list'"
          glossy
          push
          color="green"
          label="List Dibayar"
          size="md"
          @click="goTo('list')"
        />
      </q-btn-group>
    </div>
    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="trans">
        <div class="row no-wrap q-pt-sm">
          <div class="col-2">
            <div class="row no-wrap bg-grey q-pa-xs items-center">
              <!-- <div class="q-mr-sm">
            <q-icon
              name="icon-mat-print"
              size="16px"
            />
          </div> -->
              <div class="f-12 text-weight-bold q-mr-sm">
                Pilih
              </div>
            </div>
          </div>
          <div class="col-10">
            <div class="q-ml-xs row no-wrap bg-grey q-pa-xs q-pt-sm">
              <div class="f-12 text-weight-bold">
                Pembayaran
              </div>
            </div>
          </div>
        </div>
        <div class="row no-wrap q-pt-sm">
          <div class="col-2">
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="karcis"
                label="Karcis"
                @update:model-value="gantiDataNota"
              />
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="tindakan"
                label="Tindakan"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Tindakan"
            color="primary"
            no-caps
            flat
            @click="cetakTindakan()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Tindakan
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="laboratorium"
                label="Laboratorium"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Laboratorium"
            color="primary"
            no-caps
            flat
            @click="cetakLaboratorium()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Laboratorium
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="radiologi"
                label="Radiologi"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Radiologi"
            color="primary"
            no-caps
            flat
            @click="cetakRadiologi()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Radiologi
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="farmasi"
                label="Farmasi"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Farmasi"
            color="primary"
            no-caps
            flat
            @click="cetakFarmasi()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Farmasi
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="operasi besar"
                label="Operasi (Tindakan Besar)"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Operasi (Tindakan Besar)"
            color="primary"
            no-caps
            flat
            @click="cetakOperasiBesar()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Operasi (Tindakan Besar)
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="operasi kecil"
                label="Operasi (Tindakan Kecil)"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Operasi (Tindakan Kecil)"
            color="primary"
            no-caps
            flat
            @click="cetakOperasiKecil()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Operasi (Tindakan Kecil)
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs">
              <q-radio
                v-model="dataNotas"
                dense
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="sharing bpjs"
                label="Sharing BPJS"
                @update:model-value="gantiDataNota"
              />
              <!-- <q-btn
            class="col-12"
            dense
            size="12px"
            label="Sharing BPJS"
            color="primary"
            no-caps
            flat
            @click="cetakSharingBPJS()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Sharing BPJS
            </q-tooltip>
          </q-btn> -->
            </div>
            <div class="row no-wrap q-ma-xs q-mt-md">
              <q-btn
                class="col-12"
                dense
                size="12px"
                label="Cetak Rekap Billing"
                color="primary"
                no-caps
                push
                @click="cetakFakturRekap(pasien)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Cetak Faktur Rekap
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="col-10">
            <!-- belum dibayar -->
            <div class="q-py-md">
              <!-- header -->
              <div class="q-ml-xs row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white">
                <div class="col-3">
                  <div class="row no-wrap">
                    <div class="col-2">
                      No
                    </div>
                    <div class="col-10">
                      No Kwitansi
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  Pembayaran
                </div>
                <div class="col-2">
                  Tanggal
                </div>
                <div class="col-3">
                  <div class="row no-wrap">
                    <div class="col-6 text-right">
                      Jumlah
                    </div>
                    <div class="col-6 text-right">
                      Batal
                    </div>
                  </div>
                </div>
                <div class="col-2 text-center">
                  #
                </div>
              </div>
              <div v-if="store.notas.Pelayanan">
                <!-- child -->
                <!-- {{ store.notas }} -->
                <div
                  v-for="(pel,i) in store.notas.Pelayanan"
                  :key="i"
                  class="q-ml-xs q-mt-xs items-center row no-wrap q-col-gutter-xs"
                >
                  <div class="col-3">
                    <div class="row no-wrap">
                      <div class="col-2">
                        {{ i + 1 }}
                      </div>
                      <div class="col-10">
                        {{ pel.namatindakan }}
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    Pembayaran : Tunai / Va/ Qris
                  </div>
                  <div class="col-2">
                    Tanggal trx
                  </div>
                  <div class="col-3">
                    <div class="row no-wrap">
                      <div class="col-6 text-right">
                        Rp {{ formatRp(pel.subtotal) }}
                      </div>
                      <div class="col-6 text-right">
                        0
                      </div>
                    </div>
                  </div>
                  <div class="col-2 text-right">
                    <div class="q-mr-xs">
                      <app-btn
                        label="Buat Qris"
                        color="blue"
                        push
                        dense
                      />
                    </div>
                    <div class="q-mr-xs">
                      <app-btn
                        label="Bayar Tunai"
                        color="green"
                        push
                        dense
                      />
                    </div>
                    <div class="q-mr-xs">
                      <app-btn
                        label="Buat VA"
                        color="lime-7"
                        push
                        dense
                      />
                    </div>
                    <div class="q-mr-xs">
                      <app-btn
                        label="Batal"
                        color="grey-7"
                        push
                        dense
                      />
                    </div>
                    <div class="q-mr-xs">
                      <app-btn
                        label="Cetak"
                        color="blue-grey-7"
                        push
                        dense
                      />
                    </div>
                  </div>
                </div>
                <!-- Bottom -->
                <div class="q-ml-xs row no-wrap q-col-gutter-xs">
                  <div class="col-3">
                    <!--  -->
                  </div>
                  <div class="col-2">
                    <!--  -->
                  </div>
                  <div class="col-2 text-weight-bold">
                    Total
                  </div>
                  <div class="col-3">
                    <div class="row no-wrap">
                      <div class="col-6 text-right">
                        {{ formatRp(store.notas.Subtotal) }}
                      </div>
                      <div class="col-6 text-right">
                        0
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <!-- # -->
                  </div>
                </div>
              </div>
              <div
                v-if="!store.notas.Pelayanan && store.loading"
                class="q-mt-lg"
              >
                <div
                  class="flex column flex-center"
                >
                  <q-spinner-cube
                    color="primary"
                    size="3em"
                  />
                  <div>Harap Tunggu ...</div>
                </div>
              </div>
              <div v-if="!store.notas.Pelayanan && !store.loading">
                <app-no-data />
              </div>
            </div>
            <!-- Sudah dibayar -->
            <!-- <div class="q-py-md">
          <div class="q-ml-xs row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white">
            <div class="col-3">
              <div class="row no-wrap">
                <div class="col-2">
                  No
                </div>
                <div class="col-10">
                  No Registrasi
                </div>
              </div>
            </div>
            <div class="col-3">
              Nota
            </div>
            <div class="col-2">
              Tanggal bayar
            </div>
            <div class="col-4">
              Total
            </div>
          </div>
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="">
              List
            </div>
          </div>
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="col-3">
            </div>
            <div class="col-3">
            </div>
            <div class="col-2 text-weight-bold">
              Total
            </div>
            <div class="col-4">
              Total
            </div>
          </div>
        </div> -->
            <!-- pembayaran -->
            <!-- <div class="q-py-sm">
          <div class="row no-wrap items-center">
            <div class="q-mr-xs">
              Nota {{ nota }}
            </div>
            <div class="q-mr-xs">
              <app-autocomplete
                v-model="choice"
                label="Pilih Nota"
                autocomplite="nota"
                option-label="nota"
                option-value="nota"
                outlined
                :source="options"
              />
            </div>
            <div class="q-mr-xs">
              <app-btn
                label="Buat Qris"
                color="blue"
                push
              />
            </div>
            <div class="q-mr-xs">
              <app-btn
                label="Bayar Tunai"
                color="green"
                push
              />
            </div>
            <div class="q-mr-xs">
              <app-btn
                label="Buat VA"
                color="lime-7"
                push
              />
            </div>
          </div>
        </div> -->
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="list">
        list
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'
import { ref } from 'vue'
defineProps({
  pasien: { type: Object, default: () => {} }
})
const emits = defineEmits(['print', 'rekap', 'nota'])
const tab = ref('trans')
function goTo(val) {
  tab.value = val
}
const store = useKasirRajalListKunjunganStore()
// const nota = ref('')
// const options = ref([
//   { nota: '-' },
//   { nota: 'kldksjal' },
//   { nota: 'sdasda' },
//   { nota: 'sdasdawwwa' }
// ])
// const choice = ref('-')

function cetakFakturRekap(val) {
  // nota.value = ' Tindakan'
  emits('rekap', val)
  console.log('cetak faktur', val)
}

const dataNotas = ref('')
function gantiDataNota(val) {
  // console.log('radio', val)
  emits('nota', val)
}
// function cetakTindakan() {
//   nota.value = ' Tindakan'
//   emits('print', { value: 'Tindakan' })
//   console.log('cetak Tindakan')
// }
// function cetakLaboratorium() {
//   nota.value = ' Laboratorium'
//   emits('print')
//   console.log('cetak Laboratorium')
// }
// function cetakRadiologi() {
//   nota.value = ' Radiologi'
//   emits('print')
//   console.log('cetak Radiologi')
// }
// function cetakFarmasi() {
//   nota.value = ' Farmasi'
//   emits('print')
//   console.log('cetak Farmasi')
// }
// function cetakOperasiBesar() {
//   nota.value = ' Tindakan'
//   emits('print')
//   console.log('cetak Operasi Tindakan Besar')
// }
// function cetakOperasiKecil() {
//   nota.value = ' Tindakan Operasi'
//   emits('print')
//   console.log('cetak Operasi Tindakan Kecil')
// }
// function cetakSharingBPJS() {
//   nota.value = ' Sharing'
//   emits('print')
//   console.log('cetak Sharing BPJS')
// }
</script>
