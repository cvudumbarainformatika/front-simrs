<template>
  <div class="fit scroll">
    <div class="masonry-container q-gutter-md">
      <q-item
        v-for="(item, index) in items"
        :key="index"
        v-ripple
        clickable
        :class="`masonry-item cursor-pointer q-pa-none ${onHoverred===index? 'dimmed' : ''}`"
        @mouseover="onHoverred=index"
        @mouseleave="onHoverred=-1"
        @click="emits('details',item)"
      >
        <q-card class="card-masonry">
          <app-avatar-pasien
            :pasien="item"
            class="full-width relative-position"
          >
            <div class="absolute-right">
              <div class="text-right">
                <div>{{ date.formatDate(item.tgl_kunjungan, 'MMM DD, YYYY') }}</div>
                <div class="f-10">
                  Jam : <b> {{ date.formatDate(item?.tgl_kunjungan, 'HH:mm') }}</b>
                </div>
              </div>
            </div>
            <div class="absolute bg-transparent q-mt-md">
              <q-card
                :class="`q-pa-sm ${item?.status === '1'? 'bg-teal' : 'bg-deep-orange-8'}`"
                style="top:-15px; left: 0;"
              >
                <div class="f-12">
                  {{ item?.status === '1'? 'Terlayani' : 'Belum terlayani' }}
                </div>
              </q-card>
            </div>
            <div class="absolute-bottom full-width z-top q-pa-sm">
              <div class="f-12">
                <b>{{ item?.nama }}</b>
              </div>
              <div class="flex justify-end">
                <div class="f-10">
                  {{ item?.usia }}
                </div>
              </div>
            </div>
          </app-avatar-pasien>
          <!-- Isi card masonry -->
          <q-separator />
          <q-card-section class="q-pa-sm f-10">
            <div><b>No .RM</b> : {{ item?.norm }} <b>NOREG</b> : {{ item?.noreg }}</div>
            <div class="ellipsis-2-lines q-mt-xs">
              <b>ALAMAT</b> : {{ item?.alamat }}
            </div>
            <q-separator class="q-my-sm" />
            <div class="flex ellipsis-2-lines">
              <div class="text-grey-8">
                <span class="text-primary">{{ item?.poli }} -> <b>{{ item?.ruangan }}</b></span>
              </div>
            </div>
          </q-card-section>
          <!-- /Isi card masonry -->
        </q-card>
      </q-item>
    </div>
    <div style="padding-bottom: 300px;" />
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { ref } from 'vue'

const onHoverred = ref(-1)
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['details'])

</script>

<style lang="scss" scoped>
.masonry-container {
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

</style>
