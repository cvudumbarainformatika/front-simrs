<template>
  <q-dialog>
    <q-card
      style="width:70vw; max-width:95vw;"
    >
      <q-card-section>
        <div
          v-if="store.isEditDetail"
          class="f-16 text-weight-bold q-mb-sm"
        >
          Edit Barang
        </div>
        <div
          v-if="store.newDetail"
          class="f-16 text-weight-bold q-mb-sm"
        >
          Tambah Barang
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'

const store = useEditPemesananStore()
</script>
