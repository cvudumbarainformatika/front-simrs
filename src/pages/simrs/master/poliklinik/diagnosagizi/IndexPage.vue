<template>
  <q-page class="q-pa-sm fit column">
    <q-card
      class="col full-height"
      style="overflow: hidden;"
      square
    >
      <div class="absolute-top row full-height">
        <div class="col-6 full-height column">
          <FormDiagnosa v-if="!store.isIntervensi" />
          <FormIntevensi v-else />
        </div>
        <div class="col-6 full-height scroll q-px-md bg-grey-4">
          <ListDiagnosa
            :items="store.items"
            @add-intervensi="store.setIntervensi"
            @edit="(val)=> store.editForm(val)"
            @delete="(val) =>hapusDiagnosa(val)"
          />
          <div style="margin-bottom: 100px;" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useMasterDiagnosaGiziStore } from 'src/stores/simrs/master/poliklinik/diagnosagizi'
import { onMounted } from 'vue'
import FormDiagnosa from './FormDiagnosa.vue'
import FormIntevensi from './FormIntervensi.vue'
import ListDiagnosa from './ListDiagnosa.vue'
import { useQuasar } from 'quasar'

const store = useMasterDiagnosaGiziStore()

const $q = useQuasar()

onMounted(() => {
  store.getData()
})

function hapusDiagnosa (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.deleteItem(id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
