<script setup>
import useRightPanel from './use/useRightPanel'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})
const { data } = useRightPanel(props.pasien)
</script>

<template>
  <div class="fit bg-grey-4 q-pa-xs scroll">
    <!-- {{ data?.items }} -->
    <q-card v-for="(item, i) in data?.items" :key="i" clickable v-ripple class="q-pa-md q-mb-sm cursor-pointer">
      <q-item-section>
        <q-item-label class="text-bold">
          ASESMENT AWAL KEPERAWATAN
        </q-item-label>
        <q-item-label>Data Anamnesis Tersimpan</q-item-label>
        <q-item-label caption>
          Oleh : {{ item?.petugas?.nama }}
        </q-item-label>
        <q-item-label caption>
          <div class="flex q-gutter-sm items-center">
            <div><q-icon name="icon-ion-timer" size="sm" /></div>
            <div>{{ item?.tgl }}</div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-card>
  </div>
</template>
