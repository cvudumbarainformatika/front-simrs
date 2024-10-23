<template>
  <div class="row full-width justify-between">
    <div class="row items-start">
      <div class="q-pa-sm">
        <app-autocomplete
          v-model="store.reqs.jenis"
          label="Pilih Jenis Jurnal"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          outlined
          :source="store.jenis"
        />
      </div>
      <div class="q-pa-sm">
        <app-autocomplete
          v-model="store.reqs.bulan"
          label="Pilih Bulan"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          outlined
          :source="store.bulans"
        />
      </div>
      <div class="q-pa-sm">
        <app-input
          v-model="store.reqs.tahun"
          label="Tahun"
          outlined
        />
      </div>
      <div class="q-pa-sm">
        <app-btn
          label="Ambil Data"
          :disable="store.loading"
          :loading="store.loading"
          @click="ambilData()"
        />
      </div>
    </div>
    <!-- <div class="q-pr-xl" style="width: 200px" /> -->
    <div class="q-pa-sm items-end">
      <q-input
        v-model="store.reqs.q"
        outlined
        color="warning"
        dense
        placeholder="Cari Transaksi..."
        debounce="0"
        style="min-width: 300px;"
        @keyup.enter.stop="store.getPostJurnal()"
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
  </div>
</template>
<script setup>
import { postingJurnal } from 'src/stores/siasik/akuntansi/jurnal/postingjurnal'
import { onMounted } from 'vue'

const store = postingJurnal()
// const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])
function cariData (val) {
  // console.log('ada Hasil Cari', val)
  store.reqs.q = val
  if (!store.loading) store.getPostJurnal(val)
}
const clearSearch = () => {
  store.reqs.q = ''
  store.getPostJurnal()
}
function ambilData () {
  store.getPostJurnal()
}
onMounted(() => {
  Promise.all([
    // store.getPostJurnal(),
    store.mapData()
  ])
})

// function searchEnter (evt) {
//   emits('search', evt.target.value)
// }

</script>
