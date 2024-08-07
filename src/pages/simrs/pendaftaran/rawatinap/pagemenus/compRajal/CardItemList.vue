<template>
  <q-item
    v-ripple
    class="q-my-lg bg-white shadow-q relative-position"
  >
    <q-card
      :class="`absolute text-grey-3 q-py-xs q-px-sm ${item?.tunggu_ranap !== null? 'bg-teal' : 'bg-deep-orange-8'}`"
      style="top:-15px; left: 0;"
    >
      <div class="f-10">
        {{ item?.tunggu_ranap !== null? 'Sudah dimutasikan' : 'Menunggu ...' }}
      </div>
    </q-card>
    <div class="row items-center full-width">
      <div class="col-5">
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
              {{ item?.nama }}
            </div>
            <div class="flex q-gutter-sm q-pt-xs">
              <div> <b>No. RM :</b> <span class="text-primary">{{ item?.norm }}</span></div>
              <div> <b>No. REG :</b> <span class="text-grey-8">{{ item?.noreg }}</span></div>
              <div> <b>NIK :</b> <span class="text-grey-8">{{ item?.nktp }}</span></div>
            </div>
            <div class="ellipsis text-grey-8 q-pt-xs">
              Alamat : <i>{{ item?.alamat }}</i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="row items-center full-width q-col-gutter-md">
          <div class="col-4 ">
            <div class="text-blue">
              {{ item?.sistembayar }}
            </div>
            <div class="text-grey-10 f-12">
              {{ date.formatDate(item?.tgl_kunjungan, 'MMM DD, YYYY') }}
            </div>
            <div class="text-grey-6 f-10">
              Jam : <b> {{ date.formatDate(item?.tgl_kunjungan, 'HH:mm') }}</b>
            </div>
          </div>
          <div class="col-3">
            <div class="f-10 text-grey-8">
              dari
            </div>
            <div>
              <span class="text-primary f-12">{{ item?.poli }}</span>
            </div>
          </div>
          <div class="col full-width flex wrap ellipsis">
            <div v-if="item?.tunggu_ranap === null " class="f-10 text-grey-8">
              Rencana ke ..
            </div>
            <div v-else class="f-10 text-primary">
              Sudah dimutasikan ke
            </div>
            <div class="full-width ellipsis">
              <span class="text-primary">{{ item?.ruangan ?? 'Belum Ada' }}</span>
            </div>
          </div>
          <div class="col-2 ">
            <div class="flex justify-end">
              <q-btn v-if="item?.tunggu_ranap === null" flat class="bg-primary text-white" round icon="icon-mat-launch" dense @click="emits('send', item)">
                <q-tooltip class="bg-white text-primary">
                  Mutasikan Pasien
                </q-tooltip>
              </q-btn>
              <q-btn v-else flat class="bg-grey-5 text-white" round icon="icon-mat-bedroom_parent" dense>
                <q-tooltip class="bg-grey-5 text-dark">
                  Pasien sudah dimutasikan
                </q-tooltip>
              </q-btn>
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

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['details', 'send'])
</script>

<style lang="scss" scoped>
</style>
