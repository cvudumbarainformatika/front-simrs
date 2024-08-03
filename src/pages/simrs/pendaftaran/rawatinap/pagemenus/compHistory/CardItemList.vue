<template>
  <q-item
    v-ripple
    class="q-my-lg bg-white shadow-q relative-position"
  >
    <q-card
      :class="`absolute text-grey-3 q-py-xs q-px-sm ${item?.status !== ''? 'bg-teal' : 'bg-deep-orange-8'}`"
      style="top:-15px; left: 0;"
    >
      <div class="f-10">
        {{ item?.status === ''? 'Belum Pulang' : 'Pulang' }}
      </div>
    </q-card>
    <div class="row items-center full-width">
      <div class="col-6">
        <div class="row fit q-pa-none items-center q-col-gutter-md">
          <div class="col-auto">
            <q-avatar size="50px">
              <app-avatar-pasien
                :pasien="item"
                width="50px"
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
              <b>USIA : </b><i>{{ item?.usia }}</i>
            </div>
            <div class="ellipsis text-grey-8 q-pt-xs">
              Alamat : <i>{{ item?.alamat }}</i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center full-width q-col-gutter-md">
          <div class="col-4 ">
            <div class="text-blue">
              {{ item?.sistembayar }}
            </div>
            <div class="text-grey-10 f-12 q-mt-xs">
              {{ date.formatDate(item?.tglmasuk, 'MMM DD, YYYY') }}
            </div>
            <div class="text-grey-6 f-10">
              Jam : <b> {{ date.formatDate(item?.tglmasuk, 'HH:mm') }}</b>
            </div>
          </div>
          <!-- <div class="col-2">
            <div class="f-10 text-grey-8">
              dari
            </div>
            <div>
              <span class="text-primary">{{ item?.poli }}</span>
            </div>
          </div> -->
          <div class="col full-width flex wrap ellipsis">
            <!-- <div v-if="item?.status_masuk=== ''" class="f-10 text-grey-8">
              Rencana ke ..
            </div>
            <div v-else class="f-10 text-primary">
              Sudah dimutasikan ke
            </div> -->
            <div class="full-width ellipsis">
              <strong class="text-primary">{{ item?.ruangan }}</strong>
            </div>
            <div class="full-width ellipsis q-my-xs">
              <span class="text-primary">{{ item?.ketruangan }}</span>
            </div>
            <div class="full-width ellipsis">
              <strong class="text-dark"> NO. BED :{{ item?.nomorbed }}</strong>
            </div>
          </div>
          <div class="col-2 ">
            <div class="flex justify-end">
              <q-btn flat class="bg-primary text-white" round icon="icon-fa-file-regular" dense>
                <!-- <q-tooltip class="bg-dark text-white">
                  <div class="flex flex-center items-center text-center">
                    Dokumen & Lainnya
                  </div>
                </q-tooltip> -->
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="emits('spri', item)">
                      <q-item-section>Dokumen SPRI</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="emits('cetakGelang', item)">
                      <q-item-section>Cetak Gelang</q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-close-popup @click="emits('cetakIdentitas', item)">
                      <q-item-section>Cetak Identitas</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="emits('halaman1', item)">
                      <q-item-section>Halaman 1</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="emits('halaman2', item)">
                      <q-item-section>Halaman 2</q-item-section>
                    </q-item> -->
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- <q-btn v-else flat class="bg-grey-5 text-white" round icon="icon-mat-bedroom_parent" dense>
                <q-tooltip class="bg-grey-5 text-dark">
                  Pasien sudah dimutasikan
                </q-tooltip>
              </q-btn> -->
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
const emits = defineEmits(['details', 'spri', 'cetakGelang', 'cetakIdentitas', 'halaman1', 'halaman2'])
</script>

<style lang="scss" scoped>
</style>
