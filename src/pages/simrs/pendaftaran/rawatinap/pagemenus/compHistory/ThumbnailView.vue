<template>
  <div class="fit scroll">
    <div class="masonry-container q-gutter-md">
      <q-item
        v-for="(item, index) in items"
        :key="index"
        v-ripple
        :class="`masonry-item cursor-pointer q-pa-none ${onHoverred===index? 'dimmed' : ''} `"
        @mouseover="onHoverred=index"
        @mouseleave="onHoverred=-1"
        @click="emits('spri',item)"
      >
        <q-card :class="`card-masonry`">
          <app-avatar-pasien
            :pasien="item"
            class="full-width relative-position"
            width="100%"
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
                :class="`q-pa-sm ${item?.status_masuk === item.norm? 'bg-teal' : 'bg-deep-orange-8'}`"
                style="top:-15px; left: 0;"
              >
                <div class="f-12 text-weight-bold">
                  {{ item?.status_masuk === item.norm? 'Sudah dimutasikan' : 'Menunggu ...' }}
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
            <q-btn
              fab
              color="primary"
              icon="icon-fa-file-regular"
              class="absolute z-top"
              style="top: 0; right: 12px; transform: translateY(-200%);"
            >
              <q-menu dark style="min-width: 150px">
                <q-list style="min-width: 150px;">
                  <q-item clickable v-close-popup @click="emits('spri', item)">
                    <q-item-section>Cetak SPRI</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="emits('cetakGelang', item)">
                    <q-item-section>Cetak Gelang</q-item-section>
                  </q-item>
                  <q-separator dark />
                  <template v-if="!item?.sep">
                    <q-item clickable v-close-popup @click="emits('buatSep', item)">
                      <q-item-section>{{ !item?.sep ? 'Buat SEP' : 'Cetak SEP' }}</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="emits('sepManual', item)">
                      <q-item-section>SEP Manual</q-item-section>
                    </q-item>
                  </template>
                  <template v-else>
                    <q-item clickable v-close-popup @click="emits('cetakSep', item)">
                      <q-item-section>Cetak SEP</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="emits('editSep', item)">
                      <q-item-section>Edit SEP</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="emits('hapusSep', item)">
                      <q-item-section>Hapus SEP</q-item-section>
                    </q-item>
                  </template>

                  <!-- <q-separator />
                    <q-item clickable v-close-popup @click="emits('halaman1', item)">
                      <q-item-section>Halaman 1</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="emits('halaman2', item)">
                      <q-item-section>Halaman 2</q-item-section>
                    </q-item> -->
                </q-list>
              </q-menu>
            </q-btn>
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

const emits = defineEmits(['details', 'spri', 'cetakGelang', 'cetakIdentitas', 'halaman1', 'halaman2', 'buatSep', 'sepManual', 'cetakSep', 'editSep', 'hapusSep'])

</script>

<style lang="scss" scoped>
.masonry-container {
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.card-masonry {
  width: -webkit-fill-available !important;
}

</style>
