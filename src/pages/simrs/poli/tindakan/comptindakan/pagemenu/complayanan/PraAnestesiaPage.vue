<template>
  <div class="row fit absolute-top">
    <div class="col-7 bg-red">
      <FormPage
        :key="pasien"
        :pasien="pasien"
      />
    </div>
    <div class="col-5 bg-grey-4">
      <ListPraAnastesi
        :key="pasien"
        :pasien="pasien"
        :items="store.resultPraAnastesi"
        @hapus="(val)=> store.deleteData(val)"
        @edit="(val)=> lihat(val)"
      />
    </div>
    <!-- adsadas {{ props?.pasien }} -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import FormPage from './compPraAnestesi/FormPage.vue'
import ListPraAnastesi from './compPraAnestesi/ListPraAnastesi.vue'
import { usePraAnastesiStore } from 'src/stores/simrs/pelayanan/poli/praanastesi'

const store = usePraAnastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getData(props.pasien)
    .then(() => store.initForm())
})

function lihat (val) {
  // console.log(val)
  store.initForm(val)
}
</script>
