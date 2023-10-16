<template>
  <div class="q-mb-xl bg-white">
    <div class="row">
      <div class="col-2 ">
        <div class="row">
          <div class="col-12 q-pa-xs bg-grey-4">
            <app-avatar-pasien
              :key="pasien"
              :pasien="pasien"
              width="50px"
            />
            <div class="text-weight-bold f-12 q-mt-sm">
              {{ pasien ? pasien.nama : '-' }}
            </div>
            <div class="text-teal">
              {{ pasien?.norm??'-' }}
            </div>
            <div class="text-teal">
              {{ pasien ? pasien.noreg : '-' }}
            </div>
            <div class="text-purple text-weight-bold">
              {{ pasien?.poli??'-' }}
            </div>
            <div class="text-green ">
              {{ dateFullFormat(pasien?.tgl_kunjungan)??'-' }}
            </div>
            <div class="text-orange text-weight-bold">
              {{ pasien?.dokter??'-' }}
            </div>
            <!-- <div> {{ pasien?.kodesistembayar?? '-' }}</div> -->
          </div>
        </div>
        <div class="row no-wrap bg-primary text-white q-pa-xs items-center">
          <div class="f-12 text-weight-bold">
            Pilih
          </div>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="karcis"
            label="Karcis"
            @update:model-value="gantiDataNota"
          />
        </div>
        <!-- <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="konsulantarpoli"
            label="Konsul Antar Poli"
            @update:model-value="gantiDataNota"
          />
        </div> -->
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="tindakan"
            label="Tindakan"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="laborat"
            label="Laboratorium"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="radiologi"
            label="Radiologi"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="farmasi"
            label="Farmasi"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="operasibesar"
            label="Operasi (Tindakan Besar)"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="operasikecil"
            label="Operasi (Tindakan Kecil)"
            @update:model-value="gantiDataNota"
          />
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-radio
            v-model="store.golongan"
            dense
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="sharing bpjs"
            label="Sharing BPJS"
            @update:model-value="gantiDataNota"
          />
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
        <div class="row items-center justify-end bg-primary ">
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
        <div>
          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel
              style="padding:0px;"
              name="trans"
            >
              <div class="row no-wrap q-pt-sm">
                <div class="col-12">
                  <div class="row no-wrap bg-primary text-white q-py-sm">
                    <div class="f-12 text-weight-bold q-px-sm">
                      Pembayaran
                    </div>
                  </div>
                </div>
              </div>
              <div class="row no-wrap q-pt-sm">
                <div class="col-12">
                  <!-- belum dibayar -->
                  <div class="">
                    <!-- header default-->
                    <div
                      v-if="store.golongan===''"
                      class="row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white"
                    >
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
                    <!-- header karcis -->
                    <div
                      v-if="store.golongan==='karcis'"
                      class="row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white"
                    >
                      <div class="col-1">
                        No
                      </div>
                      <div class="col-3">
                        Nama Layanan
                      </div>
                      <div class="col-6">
                        <div class="row no-wrap">
                          <div class="col-6 text-right">
                            Jumlah
                          </div>
                          <div class="col-6 text-right">
                            Batal
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col-2 text-center">
                        #
                      </div> -->
                    </div>
                    <!-- bukan karcis -->
                    <div
                      v-if="store.golongan!=='karcis'"
                      class=""
                    >
                      <div class="row no-wrap q-my-sm">
                        <div class="col-6">
                          <app-autocomplete
                            v-model="nota"
                            label="pilih Nota"
                            autocomplete="nota"
                            option-label="nota"
                            option-value="nota"
                            outlined
                            valid
                            autofocus
                            :source="dataNotas"
                            @selected="notaDipilih"
                          />
                        </div>
                      </div>
                      <div class="row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white">
                        <div class="col-1">
                          No
                        </div>
                        <div class="col-3">
                          Nama Layanan
                        </div>
                        <div class="col-6">
                          <div class="row no-wrap">
                            <div class="col-6 text-right">
                              Jumlah
                            </div>
                            <div class="col-6 text-right">
                              Batal
                            </div>
                          </div>
                        </div>
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
                        <div class="col-1">
                          {{ i + 1 }}
                        </div>
                        <div class="col-3">
                          {{
                            pel.namatindakan ??
                              pel.keterangan ??
                              pel.tindakan
                          }}
                        </div>
                        <div class="col-6">
                          <div class="row no-wrap">
                            <div class="col-6 text-right">
                              Rp {{ pel.subtotal>0?formatRp(pel.subtotal):formatRp(pel.subtotalx) }}
                            </div>
                            <div class="col-6 text-right">
                              0
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Bottom -->
                      <div class="q-ml-xs row no-wrap q-col-gutter-xs">
                        <div class="col-1">
                          <!--  -->
                        </div>
                        <div class="col-3 text-right text-weight-bold">
                          Total
                        </div>
                        <div class="col-6">
                          <div class="row no-wrap">
                            <div class="col-6 text-right">
                              Rp  {{ formatRp(store.notas.Subtotal) }}
                            </div>
                            <div class="col-6 text-right">
                              Rp 0
                            </div>
                          </div>
                        </div>
                        <div class="col-2">
                          <!-- # -->
                        </div>
                      </div>
                      <!-- button -->
                      <div class="q-ml-sm row no-wrap items-center q-my-md">
                        <div class="q-mr-xs">
                          <app-btn
                            label="Buat Qris"
                            color="blue"
                            push
                            dense
                            :loading="store.loading && carabayar==='qris'"
                            :disable="store.loading"
                            @click="buatQris"
                          />
                        </div>
                        <div class="q-mr-xs">
                          <app-btn
                            label="Bayar Tunai"
                            color="green"
                            push
                            dense
                            :loading="store.loading && carabayar==='tunai'"
                            :disable="store.loading"
                            @click="bayarTunai"
                          />
                        </div>
                        <div class="q-mr-xs">
                          <app-btn
                            label="Buat VA"
                            color="lime-7"
                            push
                            dense
                            :loading="store.loading && carabayar==='va'"
                            :disable="store.loading"
                            @click="buatVA"
                          />
                        </div>
                        <div class="q-mr-xs">
                          <app-btn
                            label="Batal"
                            color="grey-7"
                            push
                            dense
                            :loading="store.loading && carabayar==='batal'"
                            :disable="store.loading"
                            @click="batal"
                          />
                        </div>
                        <div class="q-mr-xs">
                          <app-btn
                            label="Cetak"
                            color="blue-grey-7"
                            push
                            dense
                            :loading="store.loading && carabayar==='cetak'"
                            :disable="store.loading"
                            @click="cetak"
                          />
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
            <q-tab-panel
              style="padding:0px;"
              name="list"
            >
              list
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'
import { ref } from 'vue'
const prop = defineProps({
  pasien: { type: Object, default: () => {} }
})
const emits = defineEmits([
  'print',
  'rekap',
  'nota'
])
const tab = ref('trans')
function goTo(val) {
  tab.value = val
}
const store = useKasirRajalListKunjunganStore()

function cetakFakturRekap(val) {
  // nota.value = ' Tindakan'

  emits('rekap', val)
  console.log('cetak faktur', val)
}
const dataNotas = ref([])
const nota = ref('')
function gantiDataNota(val) {
  if (val === 'karcis') {
    console.log('karcis', prop.pasien)
    const param = {
      golongan: val,
      noreg: prop.pasien.noreg
    }
    emits('nota', param)
  } else {
    console.log('pilihan lain', prop.pasien)
    store.notas = {}
    nota.value = ''
    if (val === 'tindakan') {
      dataNotas.value = prop.pasien.tindakan
    }
    if (val === 'laborat') {
      dataNotas.value = prop.pasien.laborat
    }
    if (val === 'radiologi') {
      dataNotas.value = prop.pasien.transradiologi
    }
    if (val === 'operasibesar') {
      dataNotas.value = prop.pasien.kamaroperasi
    }
    if (val === 'operasikecil') {
      dataNotas.value = prop.pasien.tindakanoperasi
    }
    if (val === 'farmasi') {
      const farmasi = []
      if (prop.pasien.apotekrajal.length) {
        prop.pasien.apotekrajal.forEach(a => farmasi.push(a))
      }
      if (prop.pasien.apotekrajalpolilalu.length) {
        prop.pasien.apotekrajalpolilalu.forEach(a => farmasi.push(a))
      }
      if (prop.pasien.apotekracikanrajal.length) {
        prop.pasien.apotekracikanrajal.forEach(a => farmasi.push(a))
      }
      if (prop.pasien.apotekracikanrajallalu.length) {
        prop.pasien.apotekracikanrajallalu.forEach(a => farmasi.push(a))
      }
      dataNotas.value = farmasi
    }
    if (val === 'sharingbpjs') {
      // dataNotas.value = prop.pasien.tindakan
    }
  }
}
function notaDipilih(val) {
  // console.log('dipilih val', val)
  nota.value = val
  const param = {
    golongan: store.golongan,
    noreg: prop.pasien.noreg,
    nota: val
  }
  // console.log('param', param)

  emits('nota', param)
}
const carabayar = ref('')
function kirimBayar() {
  let rinci = ''
  if (store.notas?.Pelayanan.length) {
    console.log('nota pelayanan')
    store.notas.Pelayanan.forEach(a => {
      const b = a.namatindakan + ':' + a.subtotal
      rinci += ',' + b
    })
    console.log(rinci)
    const form = {
      noreg: prop.pasien.noreg,
      norm: prop.pasien.norm,
      tgl_kunjungan: prop.pasien.tgl_kunjungan,
      nama: prop.pasien.nama,
      sapaan: prop.pasien.sapaan,
      kelamin: prop.pasien.kelamin,
      poli: prop.pasien.poli,
      sistembayar: prop.pasien.sistembayar,
      total: store.notas.Subtotal,
      rinci,
      kodepoli: prop.pasien.kodepoli,
      groupssistembayar: prop.pasien.groupssistembayar,
      jenispembayaran: store.golongan,
      carabayar: carabayar.value
    }
    console.log('form', form)
    store.savePembayaran(form).then(() => {
      emits('print', carabayar.value)
    })
  }
}
function bayar() {
  if (store.notas?.Pelayanan.length) {
    console.log('nota pelayanan')
    const form = {
      noreg: prop.pasien.noreg,
      norm: prop.pasien.norm,
      nama: prop.pasien.nama,
      poli: prop.pasien.poli,
      sistembayar: prop.pasien.sistembayar,
      total: store.notas.Subtotal,
      kodepoli: prop.pasien.kodepoli,
      groupssistembayar: prop.pasien.groupssistembayar,
      jenispembayaran: store.golongan,
      carabayar: carabayar.value,
      nota: nota.value
    }
    console.log('form', form)
    store.savePembayaran(form).then(() => {
      emits('print', carabayar.value)
    })
  }
}
function buatQris() {
  console.log('buat qris')
  carabayar.value = 'qris'
  if (store.golongan === 'karcis') {
    kirimBayar()
  } else { bayar() }
}
function bayarTunai() {
  carabayar.value = 'tunai'
  if (store.golongan === 'karcis') {
    kirimBayar()
  } else { bayar() }
  console.log('bayar tunai')
}
function buatVA() {
  // emits('print', 'qris')
  console.log('buat VA')
}
function batal() {
  console.log('buat VA')
}
function cetak() {
  console.log('buat VA')
}

</script>
