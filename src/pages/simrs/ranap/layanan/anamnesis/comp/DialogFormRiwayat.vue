<template>
  <!-- dialog form riwayat -->
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Tambah Riwayat Obsetri
        </div>
      </q-card-section>

      <q-form @submit="store.saveRiwayatKehamilan(pasien)">
        <q-separator />

        <q-card-section style="width:400px; max-height: 50vh" class="scroll">
          <div class="row q-mb-sm">
            <div v-for="n in store.pls" :key="n">
              <q-radio v-model="store.formRiwayatObsetri.pl" :val="n" :label="n" />
            </div>
            <app-input-simrs
              v-model="store.formRiwayatKehamilan.umurAnak"
              label="Umur Anak"
              class-tambahan="col-12"
            />
            <app-input-simrs
              v-model="store.formRiwayatKehamilan.kuAnak"
              label="K/U Anak"
              class-tambahan="col-12"
            />
            <app-input-simrs
              v-model="store.formRiwayatKehamilan.bbl"
              label="BBL"
              class-tambahan="col-12"
            />
            <app-input-simrs
              v-model="store.formRiwayatKehamilan.riwayatKehamilan"
              label="Riwayat Kehamilan"
              class-tambahan="col-12"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Batal" color="primary" v-close-popup />
          <q-btn type="submit" flat label="Simpan" color="primary" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useAnamnesisRanapStore()
</script>
