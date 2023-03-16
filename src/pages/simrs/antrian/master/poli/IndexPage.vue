<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="my-card full-width">
        <q-card-section>
          <div class="full-width row justify-between items-center content-between">
            <div class="bg-white col-grow">
              <div
                class="flex flex-column items-center flex-center"
              >
                <div class="col text-left">
                  <div class="f-14 text-weight-bold">
                    {{ store.title }}
                  </div>
                  <div class="title-desc">
                    {{ store.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useMasterPoliStore } from 'src/stores/antrian/master/poli'

const store = useMasterPoliStore()

console.log(store)
</script>
