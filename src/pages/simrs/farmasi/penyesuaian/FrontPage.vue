<template>
  <div class="full-width full-height bg-white q-pa-sm">
    <div class="row q-py-xs">
      <div class="col-2">
        Ruangan
      </div>
      <div class="col-8">
        <div class="row">
          {{ ruangan }}
        </div>
        <div class="row f-8 text-right text-italic">
          *otomatis sesuai hak akses
        </div>
      </div>
    </div>
    <div class="row q-py-xs">
      <div class="col-2">
        Tanggal penyesuaian
      </div>
      <div class="col-8">
        {{ dateFull( store.form.tgl_penyesuaian) }}
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Obat
      </div>
      <div class="col-8">
        <q-select
          v-model="model"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari Obat"
          option-label="nama_obat"
          option-value="kd_obat"
          :options="options"
          hide-dropdown-icon
          hide-selected
          @filter="filterFn"
          @update:model-value="modelSelected"
          @clear="clearModel"
        >
          <template v-if="model" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="model = null" class="cursor-pointer" @click="clearModel" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="row items-end">
              <div class="text-weight-bold">
                {{ scope.opt.nama_obat }}
              </div>
              <div class="q-ml-xs">
                || <span class="text-light-blue">awal</span> => <span class="text-light-blue text-weight-bold">{{ scope.opt.sAawal }}</span>
              </div>
              <div class="q-ml-xs">
                || <span class="text-green">masuk</span> => <span class="text-green text-weight-bold">{{ scope.opt.masuk }}</span>
              </div>
              <div class="q-ml-xs">
                || <span class="text-orange">keluar</span> => <span class="text-orange text-weight-bold">{{ scope.opt.keluar }}</span>
              </div>
              <div class="q-ml-xs">
                || <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple'">akhir</span> => <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple text-weight-bold'">{{ scope.opt.sAkhir }}</span>
              </div>
              <div class="q-ml-xs">
                || <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple'">stok sekarang</span> => <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple text-weight-bold'">{{ scope.opt.sSekarang }}</span>
              </div>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-2">
        <app-btn
          label="Ambil Transaksi" :loading="store.loadingGetTr"
          @click="store.getTransaksi()"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenyesuaianFarmasiStore } from 'src/stores/simrs/farmasi/penyesuaian/form'
import { computed, onMounted, ref } from 'vue'

const apps = useAplikasiStore()
const ruangan = computed(() => {
  const ru = apps?.gudangs?.find(f => f.kode === apps?.user?.kdruangansim)
  store.setForm('kdruang', ru?.kode)
  store.setparams('kdruang', ru?.kode)
  return ru?.nama
})

const store = usePenyesuaianFarmasiStore()
const model = ref(null)
const options = ref([])
function filterFn (val, update) {
  store.getObat(val).then(() => {
    options.value = store.obats
    update(() => {
      options.value = store.obats
    })
  })
}
function modelSelected (val) {
  console.log('selected', val, model.value)
  store.setForm('kdobat', val.kd_obat)
  store.setparams('kdobat', val.kd_obat)
}
function clearModel (val) {
  console.log('clear', val)
  store.setForm('kdobat', null)
  store.setparams('kdobat', null)
}
onMounted(() => {
  // store.getObat()
})
</script>
