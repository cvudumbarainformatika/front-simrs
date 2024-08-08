<template>
  <q-dialog persistent>
    <q-card style="min-width: 40vw">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          LIST SUPLESI
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="q-pa-none scroll">
        <div v-if="lists.length === 0">
          <div class="column flex-center" style="min-height: 300px;">
            Maaf data tidak ditemukan
          </div>
        </div>

        <q-list v-else separator bordered style="min-height: 300px;">
          <q-item v-for="item in props.lists" :key="item">
            <q-item-section>
              <q-item-label> No. Sep : <b>{{ item?.noSep }}</b></q-item-label>
              <q-item-label caption>
                No. Sep Awal : <b>{{ item?.noSepAwal }}</b>
              </q-item-label>
              <q-item-label caption>
                tgl Kejadian : <b>{{ item?.tglKejadian }}</b>
              </q-item-label>
              <q-item-label caption v-if="item?.noSep === terpilih">
                <q-badge color="negative">
                  Rujukan yg Terpilih Sekarang
                </q-badge>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                dense
                color="primary"
                label="Pilih"
                class="q-px-md"
                @click="emits('pilih', item)"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="bg-yellow-3">
        <q-btn flat label="Tutup" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  lists: {
    type: Array,
    default: () => []
  },
  terpilih: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['pilih'])
</script>
