<template>
  <q-page class="fit absolute bg-grey">
    <div class="fit column bg-white">
      <div class="col-auto bg-primary text-white">
        <div class="row items-center justify-between q-pa-md">
          <div class="f-14">
            DATA CACHE API BACKEND
          </div>
          <q-btn round flat size="sm" icon="icon-mat-close" color="white" to="/settings" />
        </div>
        <q-separator />
      </div>
      <div class="col full-height scroll">
        <q-list bordered separator class="bg-grey-2">
          <q-item clickable v-ripple v-for="item in items" :key="item">
            <q-item-section>
              <q-item-label overline>
                <div class="f-14">
                  <strong>{{ item?.nama }}</strong>
                </div>
              </q-item-label>
              <q-item-label><strong>CONTROLLER</strong> : {{ item?.controller }}  --- <strong>METHOD</strong> : {{ item?.method }}  *** <strong>Id</strong> : {{ item?.ketId }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                dense outline color="negative" class="q-px-md" @click="()=> {
                  data = item
                  openDialogHapus = true
                }"
              >
                <div class="f-12">
                  Hapus Cache
                </div>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <DialogHapus
      v-model="openDialogHapus"
      :item="data"
      @close="openDialogHapus = false"
    />
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const items = ref([])

const data = ref(null)

const openDialogHapus = ref(false)

const DialogHapus = defineAsyncComponent(() => import('./DialogHapus.vue'))

onMounted(() => {
  getCache()
})

const getCache = async () => {
  await api.get('v1/datacache/list-cache').then((res) => {
    console.log('cache', res.data)
    items.value = res.data
  })
}
</script>
