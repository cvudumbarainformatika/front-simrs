<template>
  <q-dialog persistent>
    <q-card style="min-width: 40vw">
      <q-card-section class="q-pa-none">
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-primary text-white shadow-2"
        >
          <q-tab name="pcare" label="Pcare" />
          <q-tab name="rs" label="Rumah Sakit" />
        </q-tabs>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="q-pa-none scroll">
        <div v-if="tab ==='pcare' && pCares.length === 0">
          <div class="column flex-center" style="min-height: 300px;">
            Maaf data tidak ditemukan
          </div>
        </div>
        <div v-else-if="tab ==='rs' && listRs.length === 0">
          <div class="column flex-center" style="min-height: 300px;">
            Maaf data tidak ditemukan
          </div>
        </div>
        <q-list v-else separator bordered style="min-height: 300px;">
          <q-item v-for="item in tab ==='pcare' ? props.pCares : props.listRs" :key="item">
            <q-item-section>
              <q-item-label> NO.RUJUKAN : <b>{{ item?.noKunjungan ?? '-' }} </b></q-item-label>
              <q-item-label caption>
                Tgl Rujukan : <b>{{ item?.tglKunjungan ?? '-' }}</b>
              </q-item-label>
              <q-item-label caption>
                Dari : <b>{{ item?.provPerujuk?.nama ?? '-' }}</b>
              </q-item-label>
              <q-item-label caption v-if="item.noKunjungan === terpilih">
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
                @click="emits('pilih', item, tab==='pcare'? '1': '2')"
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
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  pCares: {
    type: Array,
    default: () => []
  },
  listRs: {
    type: Array,
    default: () => []
  },
  terpilih: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['pilih'])

const tab = ref('pcare')
</script>
