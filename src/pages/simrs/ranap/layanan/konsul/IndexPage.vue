<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useKonsulRanapStore } from 'src/stores/simrs/ranap/konsul'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormKonsul = defineAsyncComponent(() => import('./comp/FormKonsul.vue'))
const ListKonsul = defineAsyncComponent(() => import('./comp/ListKonsul.vue'))
const DetailForm = defineAsyncComponent(() => import('./comp/DetailForm.vue'))

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

const store = useKonsulRanapStore()

const auth = useAplikasiStore()
const user = computed(() => auth.user?.pegawai?.kdpegsimrs)

const detail = ref(null)
const isDetail = ref(false)

onMounted(() => {
  store.initReset()
  Promise.all([
    // store.getNota(props?.pasien),
    // store.getTindakan(props?.pasien)
  ])
})

const lihatDetail = (data) => {
  // console.log('detail', data)
  detail.value = data
  isDetail.value = true
}

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="40"
    title-before="KONSUL SPESIALIS"
    title-after="List Permintaan Konsul"
  >
    <template #form>
      <FormKonsul :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListKonsul v-if="!isDetail" :pasien="props.pasien" :auth="user" @detail="lihatDetail" />
        <DetailForm v-else :item="detail" :auth="user" :pasien="props.pasien" @to-list="isDetail = false" />
      </div>
    </template>
  </BaseLayout>
</template>
