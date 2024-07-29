<template>
  <q-dialog
    position="right"
  >
    <q-card style="width: 350px; height: 100%">
      <!-- <q-linear-progress
        :value="0.6"
        color="pink"
      /> -->

      <div class="column full-height">
        <div class="col-auto bg-dark text-white q-pa-sm">
          Dokumen Tersimpan
        </div>
        <div class="col full-height scroll q-pa-lg">
          <div
            v-for="file in dokumen?.gambardokumens"
            :key="file.id"
            style="border: 1px solid grey;"
            class="q-mb-md"
          >
            <q-img
              :src="pathImg + file.url"
            >
              <div class="absolute-bottom">
                <div class="row items-center justify-between">
                  <q-btn
                    class="gt-xs"
                    size="md"
                    color="yellow"
                    flat
                    dense
                    round
                    icon="icon-mat-visibility"
                    :href="pathImg + file.url"
                    target="_blank"
                  />
                  <q-btn
                    class="gt-xs"
                    size="md"
                    color="negative"
                    flat
                    dense
                    round
                    icon="icon-mat-delete"
                    @click="emits('hapusDokumen', file.id)"
                  />
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'

defineProps({
  dokumen: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['hapusDokumen'])

</script>
