<template>
  <div class="col-auto bg-primary text-white">
    <q-bar>
      <div>List Sharing</div>
    </q-bar>
  </div>
  <div v-if="pasien?.sharing?.length">
    <q-card
      v-for="(item, i) in pasien?.sharing"
      :key="i"
      flat
      bordered
    >
      <q-card-section>
        <div class="column">
          <div> Tindakan yang disharing : <b><em>{{ item?.kode }}</em></b>  </div>
          <div> Tagihan Pasien : <b>{{ formatRp( item?.nominal) }}</b></div>
          <div> Jumlah : <b>{{ item?.jumlah }}</b></div>
          <div> Subtotal : <b>{{ formatRp(item?.subtotal) }}</b></div>
          <div> Klaim BPJS : <b>{{ item?.klaimBpjs?formatRp(item?.klaimBpjs):'Masih diproses oleh pendaftaran' }}</b></div>
        </div>
      </q-card-section>
      <!-- <q-card-section align="right">
        <q-btn
          flat
          round
          size="sm"
          icon="icon-mat-delete"
          color="negative"
          @click="hapusItem(item.id)"
        />
      </q-card-section> -->
    </q-card>
  </div>
  <div
    v-else
    class="bg-white"
  >
    <app-no-data text="Tidak Ada Data Sharing" />
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
// eslint-disable-next-line no-unused-vars
function hapusItem(val) {
  console.log('hapus id', val)
}
</script>
