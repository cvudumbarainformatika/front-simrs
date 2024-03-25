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
          <div v-else>
            <FormIntevensi />
          </div>
        </div>
        <div class="col-6 full-height q-pa-md bg-grey-4">
          <ListDiagnosa
            :items="store.items"
            @add-intervensi="store.setIntervensi"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useMasterDiagnosaKebidanan } from 'src/stores/simrs/master/poliklinik/diagnosakebidanan'
import { onMounted } from 'vue'
import FormDiagnosa from './FormDiagnosa.vue'
import FormIntevensi from './FormIntervensi.vue'
import ListDiagnosa from './ListDiagnosa.vue'

const store = useMasterDiagnosaKebidanan()

onMounted(() => {
  store.getData()
})

</script>
