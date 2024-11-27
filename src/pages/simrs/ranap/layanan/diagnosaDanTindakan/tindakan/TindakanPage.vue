<script setup>
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))
const ListTindakan = defineAsyncComponent(() => import('./comp/ListTindakan.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

const store = useTindakanRanapStore()

onMounted(() => {
  Promise.all([
    store.getNota(props?.pasien),
    store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="45" nota>
    <template #form>
      <FormTindakan :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListTindakan :pasien="props.pasien" :kasus="props.kasus" />
      </div>
    </template>

    <template #nota>
      <div class="flex q-gutter-x-sm">
        <app-input-date
          :model="store.tanggal"
          label="By Tanggal"
          icon="icon-mat-event"
          dark
          outlined
          @set-model="val=>store.tanggal=val"
          style="width: 140px;"
        />
      </div>
    </template>
  </BaseLayout>
</template>
