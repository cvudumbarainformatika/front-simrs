<template>
  <div class="row items-center q-col-gutter-sm anu">
    <div class="col-3">
      <div class="row justify-between no-wrap q-mt-xs">
        <div class="text-deep-purple text-weight-bold">
          {{ rin.kdobat }}
        </div>
      </div>
      <div class="row justify-between no-wrap q-mt-xs space-normal">
        <div class=" text-weight-bold">
          {{ rin.masterobat ? rin.masterobat.nama_obat : '-' }}
        </div>
      </div>
      <div class="row justify-between no-wrap q-mt-xs anu">
        <div
          class=" text-weight-bold"
          :class="rin.masterobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
        >
          {{ rin.masterobat.status_fornas === '1' ? 'Fronas' : '' }}
        </div>
        <div
          class=" text-weight-bold"
          :class="rin.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
        >
          {{ rin.masterobat.status_forkid === '1' ? 'Forkit' : '' }}
        </div>
        <div
          class=" text-weight-bold"
          :class="rin.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
        >
          {{ rin.masterobat.status_generik === '1' ? 'Generik' : '' }}
        </div>
      </div>

      <div class="row justify-between no-wrap q-mt-xs anu f-10 text-italic">
        <div class=" text-weight-bold">
          ({{ rin.masterobat.satuan_k }})
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="row justify-between no-wrap q-mt-xs text-purple">
        <div class="q-mr-xs">
          Depo
        </div>
        <div class="">
          <div v-if="rin.stokreal">
            <div v-if="rin.stokreal.length">
              <!-- {{ rin.stokreal.filter(x => x.kdruang === row.dari).map(a => parseFloat(a.jumlah)).reduce((a,b) => a + b, 0) }} -->
              {{ rin.stok }}
            </div>
            <div v-if="!rin.stokreal.length">
              0
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-between no-wrap q-mt-xs text-cyan">
        <div class="q-mr-xs">
          Max
        </div>
        <div class="">
          {{ parseFloat(rin.mak_stok) }}
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="row justify-between no-wrap q-mt-xs text-green">
        <div class="q-mr-xs">
          Permintaan
        </div>
        <div class="text-weight-bold">
          {{ rin.jumlahdiminta }}
        </div>
      </div>

      <div class="row justify-between no-wrap q-mt-xs">
        <div
          v-if="row.flag === '2' && rin.distribusi===0 && parseFloat(rin.mak_stok) < rin.stok"
          class="col-12"
        >
          <app-input
            ref="refInputVerif"
            v-model="jmlMinta"
            label="Jumlah Didistribusikan"
            outlined
            debounce="100"
            readonly
            :rules="[
              // val => parseFloat(val) >= 0 || 'Harus lebih lebih besar dari 0',
              val => ((parseFloat(val) <= parseFloat(rin.jumlahdiminta))) || 'Tidak Boleh Lebih dari Jumlah minta'
            ]"
            @keyup.enter="kirim(rin, row)"
            @update:model-value="sudah($event, rin)"
          />
        </div>
        <div
          v-else-if="row.flag === '2' && rin.distribusi===0"
          class="col-12"
        >
          <app-input
            ref="refInputVerifNol"
            v-model="jmlMinta"
            label="Jumlah Didistribusikan"
            outlined
            debounce="100"
            :rules="[
              val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
              val => ((parseFloat(val) <= parseFloat(rin.jumlahdiminta))) || 'Tidak Boleh Lebih dari Jumlah minta'
            ]"
            :loading="store.loadingSimpan && (store.form.id === rin.id)"
            :disable="store.loadingSimpan && (store.form.id === rin.id)"
            @focus="setNol(rin)"
            @keyup.enter="kirim(rin, row)"
            @update:model-value="setJumlah($event, rin)"
          />
        </div>
        <div
          v-else
          class="col-12"
        >
          <!-- v-model="rin.jumlah_minta" -->
          <app-input
            v-model="jmlDistribusi"
            label="Jumlah Didistribusikan"
            outlined
            debounce="800"
            readonly
            :rules="[
              val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
              val => ((parseFloat(val) <= parseFloat(rin.jumlahdiminta))) || 'Tidak Boleh Lebih dari Jumlah minta'
            ]"
            @update:model-value="sudah($event, rin)"
          />
          <!-- @keyup.enter="gaKirim(rin, i)" -->
        </div>
      </div>
    </div>
    <div class="col-3 ">
      <div v-if="parseFloat(rin.jumlah_minta) > 0 && row.flag==='2'">
        <div
          v-if="parseFloat(rin.jumlah_minta) <= parseFloat(rin.jumlahdiminta) && row.flag==='2'"
          class="row justify-end"
        >
          <q-icon
            v-if="rin.distribusi>0"
            class="q-mr-md"
            name="icon-mat-done"
            color="green"
            size="sm"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              <div class="row justify-end">
                Sudah Di distribusikan
              </div>
            </q-tooltip>
          </q-icon>
          <q-btn
            v-else
            flat
            no-caps
            icon-right="icon-mat-send"
            label="Distribusikan"
            color="green"
            :loading="store.loadingSimpan && (store.form.id === rin.id)"
            :disable="store.loadingSimpan && (store.form.id === rin.id)"
            @click="kirim(rin, row)"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              <div class="row justify-end">
                Distribusikan Obat ini
              </div>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div v-else>
        <div
          v-if="(parseFloat(rin.jumlah_minta) <= 0 || mutasi(row,rin)) && row.flag==='2'"
          class="row justify-end text-weight-bold space-normal"
        >
          <div
            v-if="row.flag === '2' && rin.distribusi===0 && parseFloat(rin.mak_stok) < rin.stok"
            class="text-negative text-right"
          >
            Jumlah Stok melebihi Jumlah Maksimal Stok
          </div>
          <div
            v-else-if="row.flag === '2' && rin.distribusi<=parseFloat(rin.jumlahdiminta) && rin.distribusi>0"
            class="text-negative"
          >
            <q-icon
              name="icon-mat-lock"
              color="negative"
              size="sm"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
              >
                <div class="row justify-end">
                  Sudah Di distribusikan
                </div>
              </q-tooltip>
            </q-icon>
          </div>
          <div v-else>
            Jumlah Distribusi salah
          </div>
        </div>
        <div
          v-if="row.flag==='3'"
          class="row justify-end text-weight-bold text-green"
        >
          Sudah Di Distribusikan
        </div>
        <div
          v-if="row.flag==='1'"
          class="row justify-end text-weight-bold text-red"
        >
          Terima Terlebih dahulu
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useMutasiKeluarAntarDepoStore } from 'src/stores/simrs/farmasi/mutasi/depo/keluar'
import { computed, ref } from 'vue'
const emits = defineEmits(['minta', 'distribusi', 'gausah', 'editable'])
const props = defineProps({
  row: { type: Object, default: () => {} },
  rin: { type: Object, default: () => {} }
})

const store = useMutasiKeluarAntarDepoStore()

const jmlMinta = computed({
  get () { return props.rin.jumlah_minta },
  set (val) { emits('gausah', val) }
})
const jmlDistribusi = computed({
  get () { return props.rin.distribusi },
  set (val) { emits('distribusi', val) }
})
const refInputVerif = ref(null)
const refInputVerifNol = ref(null)

function setNol (val) {
  refInputVerifNol.value?.refInput.select()

  const beli = !isNaN(parseFloat(val.jumlah_minta)) ? (parseFloat(val.jumlah_minta) <= 0 ? 0 : parseFloat(val.jumlah_minta)) : 0

  emits('minta', beli)
}
function setJumlah (evt, val) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const beli = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  // const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) <= 0 ? 0 : parseFloat(evt)) : 0
  const max = parseFloat(val?.mak_stok)
  const stok = parseFloat(val?.stok)
  // jumlah total stok tidak boleh melebihi jumlah stok maksimal
  const totalStok = stok + beli
  if (totalStok > max) {
    notifErrVue('Jumlah Stok Depo tidak boleh melebihi jumlah stok maksimal')
    emits('minta', 0)
    // val.jumlah_minta = 0
  }
  else {
    emits('minta', beli)
    // val.jumlah_minta = beli
  }
  console.log('beli', beli, evt, max, stok, totalStok)
}
function kirim (val, row) {
  console.log('ref', refInputVerifNol.value?.refInput)
  const valid = refInputVerifNol.value?.refInput?.validate()
  console.log('kirim', val)
  console.log('kirim row', row)
  if (valid) {
    store.setForm('id', val.id)
    const form = {
      id: val.id,
      jumlahdiminta: val.jumlahdiminta,
      jumlah_minta: val.jumlah_minta,
      kodeobat: val.kdobat,
      kdgudang: row.tujuan,
      nopermintaan: row.no_permintaan

    }
    console.log('form', form)
    store.simpanDetail(form).then(() => {
      // val.editable = false
      emits('distribusi', form.distribusi)
      emits('editable', false)
      // val.distribusi = form.distribusi
    })
  }
  emits('editable', false)
  // val.editable = false
}
function sudah (evt, val) {
  const anu = val.jumlah_minta
  // val.jumlah_minta = anu
  emits('minta', anu)
}
</script>
