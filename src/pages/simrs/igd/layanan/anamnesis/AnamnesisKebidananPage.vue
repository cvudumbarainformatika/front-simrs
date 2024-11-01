<template>
  <div class="full-height full-width">
    <div class="row full-height ">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormAnamnesisKebidanan
          :key="props.pasien"
          :pasien="props.pasien"
          tooltip="History Pasien (Shift + H)"
          @open-history="seamless = !seamless"
        />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <ListAnamnesisKebidanan
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </q-card>
    </div>
    <!-- <app-drawer-right-new
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @click-btn="clickslideRight"
    >
      <template #content>
        <HistoryKanan
          :key="pasien"
          :pasien="pasien"
          title="HISTORY ANAMNESSIS LALU"
        />
      </template>
    </app-drawer-right-new> -->
  </div>
</template>
<script setup>
import FormAnamnesisKebidanan from './comanamnesis/FormAnamnesisKebidanan.vue'
import ListAnamnesisKebidanan from './comanamnesis/ListAnamnesisKebidanan.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})
</script>
