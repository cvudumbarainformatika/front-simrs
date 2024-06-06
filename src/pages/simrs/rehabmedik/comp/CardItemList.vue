<template>
  <q-item
    v-ripple
    clickable
    class="q-my-lg bg-white shadow-q relative-position"
    @click="emits('details', item)"
  >
    <q-card
      :class="`absolute text-grey-3 q-py-xs q-px-sm ${item?.status !== ''? 'bg-teal' : 'bg-deep-orange-8'}`"
      style="top:-15px; left: 0;"
    >
      <div class="f-10">
        {{ item?.status !== ''? 'Terlayani' : 'Belum terlayani' }}
      </div>
    </q-card>
    <div class="row items-center full-width">
      <div class="col-6">
        <div class="row fit q-pa-none items-center q-col-gutter-md">
          <div class="col-auto">
            <q-avatar size="40px">
              <app-avatar-pasien
                :pasien="item"
                width="40px"
              />
            </q-avatar>
          </div>
          <div class="col full-width flex wrap ellipsis">
            <div class="full-width ellipsis">
              {{ item?.nama }} <span class="text-italic text-teal f-10">({{ item?.usia }})</span>
            </div>
            <div class="flex q-gutter-sm q-pt-xs">
              <div> <b>No. RM :</b> <span class="text-primary">{{ item?.norm }}</span></div>
              <div> <b>No. REG :</b> <span class="text-grey-8">{{ item?.noreg }}</span></div>
            </div>
            <div class="ellipsis text-grey-8 q-pt-xs">
              Alamat : <i>{{ item?.alamat }}</i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center full-width q-col-gutter-md">
          <div class="col-3 ">
            <!-- <div class="text-grey-8 f-12">
              {{ date.formatDate(item?.tgl_kunjungan, 'MMM DD, YYYY') }}
            </div> -->
            <div class="f-12">
              {{ item?.sistembayar }}
            </div>
          </div>
          <!-- <div class="col-2">
            <div class="f-10 text-grey-8">
              d
            </div>
            <div>
              <span class="text-primary">{{ item?.poli }}</span>
            </div>
          </div> -->
          <div class="col full-width flex wrap ellipsis">
            <div class="f-10">
              {{ item.nota_permintaan ? 'Permintaan / Konsul dari' : 'Pendaftaran' }}
            </div>
            <div class="full-width ellipsis">
              <span class="text-primary">{{ item?.ruangan }}</span>
            </div>
          </div>
          <div class="col-2 flex justify-end">
            <div class="text-grey-8 f-12">
              {{ date.formatDate(item?.tgl_kunjungan, 'MMM DD, YYYY') }}
            </div>
            <div class="text-grey-6 f-10">
              Jam : <b> {{ date.formatDate(item?.tgl_kunjungan, 'HH:mm') }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-item>
</template>

<script setup>
import { date } from 'quasar'

defineProps({
  item: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['details'])
</script>

<style lang="scss" scoped>
</style>
