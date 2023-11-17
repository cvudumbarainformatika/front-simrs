<template>
  <q-card
    v-for="(item, i) in pasien?.edukasi"
    :key="i"
    flat
    bordered
  >
    <q-card-section>
      <div class="column">
        <div>{{ item?.perlupenerjemah==='Iya'? 'Pasien Perlu Penerjemah' : 'Pasien Tidak Perlu Penerjemah' }}</div>
        <div>{{ item?.bahasaisyarat==='Iya'? 'Pasien Memakai Bahasa Isyarat' : 'Pasien Tidak Memakai Bahasa Isyarat' }}</div>
        <div>{{ item?.caraedukasi==='Lisan'? 'Edukasi Memakai Lisan' : 'Edukasi Memakai Tulisan' }}</div>
        <div>{{ item?.kesediaan==='Iya'? 'Pasien Bersedia' : 'Pasien Tidak Bersedia' }}</div>
        <div> Kebutuhan : <b><em>{{ item?.kebutuhanedukasi }}</em></b>  </div>
        <div> Penerima Edukasi : <b><em>{{ item?.rs9 }}</em></b>  </div>
      </div>
    </q-card-section>
    <q-card-section align="right">
      <q-btn
        flat
        round
        size="sm"
        icon="icon-mat-delete"
        color="negative"
        @click="hapusItem(item.id)"
      />
    </q-card-section>
  </q-card>
</template>
<script setup>

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function hapusItem(val) {
  console.log('hapus id', val)
}
</script>
