<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:50vw; max-width: 50vw;">
      <q-bar class="bg-primary text-white">
        <div>Diagnosa Pasien</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-separator />
      <q-card-section style="max-height: 40vh; height: 40vh;" class="scroll q-pa-none">
        <q-list v-if="pasien?.diagnosa?.length" separator bordered>
          <q-item v-for="item in props?.pasien?.diagnosa" :key="item">
            <q-item-section>
              <q-item-label>{{ item?.kode }} - {{ item?.inggris }}</q-item-label>
              <q-item-label caption>
                TYPE DIAGNOSA : {{ item?.type }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn dense outline label="pilih" color="primary" class="q-px-lg" @click="emits('pilih', item)" />
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="fit column flex-center">
          <div>Maaf Belum Ada Diagnosa</div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none bg-primary text-white">
        <div class="q-pa-md row justify-between items-center">
          <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogDiagnosa=false" /></div>
          <!-- <div>
            <q-btn label="Print" color="yellow-3" text-color="dark" />
          </div> -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useBuatSepRanapStore } from 'src/stores/simrs/pendaftaran/ranap/buatsep'
// import { computed, ref } from 'vue'

const store = useBuatSepRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['pilih'])

const init = () => {
  console.log('init')
}

</script>

<style lang="scss" scoped>

</style>
