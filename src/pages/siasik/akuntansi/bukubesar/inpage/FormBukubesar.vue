<template>
  <div class="row full-width justify-between">
    <div class="row items-start">
      <div class="q-pa-sm">
        <q-input
          v-model="store.reqs.q"
          outlined
          color="warning"
          dense
          placeholder="Cari Transaksi..."
          debounce="0"
          style="min-width: 300px;"
          @keyup.enter.stop="store.getDataBukubesar()"
          @update:model-value="cariData"
        >
          <template
            v-if="store.reqs.q"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="clearSearch"
            />
          </template>
          <template #prepend>
            <q-icon
              size="sm"
              name="icon-mat-search"
            />
          </template>
        </q-input>
      </div>
      <div class="q-pa-sm">
        <app-input-date-human
          :model="store.reqs.tgl"
          label="dari tangal"
          outlined
          :disable="store.loading"
          :loading="store.loading"
          @db-model="tglDari"
          @set-display="setDari"
        />
      </div>
      <div class="q-pa-sm">
        <app-input-date-human
          :model="store.reqs.tglx"
          label="sampai tangal"
          outlined
          :disable="store.loading"
          :loading="store.loading"
          @db-model="tglSampai"
          @set-display="setSampai"
        />
      </div>
      <div class="q-pa-sm">
        <app-autocomplete
          v-model="berdasar"
          label="Pilih Jenis Akun"
          autocomplete="nama"
          option-value="value"
          option-label="nama"
          outlined
          :disable="store.loading"
          :loading="store.loading"
          :source="store.level"
          @update:model-value="(val)=>store.setLevel(val)"
        />
      </div>
      <div class="q-pa-sm">
        <app-autocomplete
          v-model="store.form.kode"
          label="Pilih Rekening"
          autocomplete="uraian"
          option-value="kodeall3"
          outlined
          :autofocus="false"
          :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : ''"
          :disable="store.loading"
          :loading="store.loading"
          :source="store.level4"
          @selected="(val)=>pilihRekening(val)"
        />
      </div>
      <div class="q-pa-sm">
        <q-select
          v-model="store.form.kode"
          label="Pilih Rekening"
          autocomplete="uraian"
          option-value="kodeall3"
          standout="bg-yellow-3"
          class="ellipsis-2-lines"
          use-input
          outlined
          dense
          emit-value
          map-options
          input-debounce="0"
          :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : ''"
          :disable="store.loading"
          :loading="store.loading"
          :options="options"
          @filter="filterFn"
          @clear="store.setFormRekening('kode', null)"
          @update:model-value="(val)=>updateSearchRekening(val)"
        >
          <template
            v-if="store.form.kode"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormRekening('kode', null)"
            />
          </template>
          <template v-else #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <!-- <div class="q-pr-xl" style="width: 200px" /> -->
    <div class="q-pa-sm items-end">
      <app-btn
        label="Ambil Data"
        :disable="store.loading"
        :loading="store.loading"
        @click="ambilData()"
      />
    </div>
  </div>
</template>
<script setup>
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { onMounted, ref } from 'vue'

const store = useBukubesarStore()
const berdasar = ref('')
const options = ref([])
const inpRek = ref(null)
// const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])
function tglDari (val) {
  store.setParameter('tgl', val)
}
function setDari (val) {
  store.display.dari = val
}
function tglSampai (val) {
  store.setParameter('tglx', val)
}
function setSampai (val) {
  store.display.sampai = val
}

function cariData (val) {
  // console.log('ada Hasil Cari', val)
  store.reqs.q = val
  if (!store.loading) store.getDataBukubesar(val)
}
const clearSearch = () => {
  store.reqs.q = ''
  store.getDataBukubesar()
}
function ambilData () {
  store.getDataBukubesar()
}
onMounted(() => {
  Promise.all([
    store.getAkun(),
    store.getDataBukubesar()
  ])
})

function updateSearchRekening (val) {
  console.log('val', val)
  store.setRekening(val).then(() => {
    inpRek.value.focus()
  })
}
function filterFn (val, update) {
  console.log('val', val)
  if (val === '') {
    update(() => {
      options.value = store.reqlevels
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = store.reqlevels.filter(
      (v) => v.uraian.toLowerCase().indexOf(needle) > -1 || v.kodeall3.toLowerCase().indexOf(needle) > -1
    )
  })
}

function pilihRekening (val) {
  console.log('val rekening', val)
  store.reqs.rekenings = val
  store.filterRekening()
}
// function searchEnter (evt) {
//   emits('search', evt.target.value)
// }

</script>
