<template>
  <div :class="admin?'':'container-padding'">
    <div class="q-my-lg q-py-lg">
      <div class="text-center">
        <div class="text-h4 text-weight-bold">
          <span class="text-primary">Direksi Utama </span>
          <span>{{ store.header.title }} </span>
        </div>
      </div>
      <div
        class="row justify-center q-col-gutter-lg relative-position q-mt-lg"
      >
        <div
          v-for="(item, i) in lists"
          :key="i"
          class="col-12 col-md-3"
        >
          <q-card
            flat
            bordered
          >
            <q-img
              :src="sourceImage(item.image)"
              :ratio="1"
            />
            <q-separator />
            <q-card-section>
              <div class="f-18 ">
                {{ item.nama }}
              </div>
              <div class="f-14 text-primary">
                {{ item.jabatan }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

const store = useAppStore()

const lists = computed(() => store.stafs)

function sourceImage(val) {
  if (val === null || val === 'null' || val === '') {
    return new URL('../../assets/images/actor.svg', import.meta.url).href
  }
  // return URL.createObjectURL(imgTemp.value)
  return pathImg + val
}

defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>

</style>
