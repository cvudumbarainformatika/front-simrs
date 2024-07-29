<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Anamnesis
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingTerima"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.anamnesis?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <q-item-label
                  class="f-12"
                >
                  <span class="">Keluhan Utama </span> : <span class="text-weight-bold">{{ item?.rs4 }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Penyakit (Sekarang) </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakitsekarang }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Penyakit </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakit }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Alergi </span> : <span class="text-weight-bold">{{ item?.riwayatalergi }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Reaksi berupa </span> : <span class="text-weight-bold">{{ item?.keteranganalergi }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Pengobatan</span> : <span class="text-weight-bold">{{ item?.riwayatpengobatan }}</span>
                </q-item-label>
                <q-separator class="q-my-md" />
                <q-item-label>
                  <span class="text-weight-bold">Skreening Gizi</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ? <b>{{ getYT(item?.skreeninggizi) }}</b></span>
                  <div class="q-my-xs">
                    - Apakah Asupan Makan berkurang karena tidak nafsu makan ? <b>{{ getYT(item?.asupanmakan) }}</b>
                  </div>
                  <div>- Kondisi Khusus : <em>{{ item?.kondisikhusus }}</em> <b>Skor : {{ item?.skor }}</b> </div>
                </q-item-label>
                <q-item-label>
                  <span class="text-weight-bold">Keluhan Nyeri</span>
                </q-item-label>
                <q-item-label>
                  <div>
                    - Skor Nyeri : <b>{{ item?.scorenyeri??'-' }}</b>
                    <span
                      v-if="!isNaN(parseInt(item?.scorenyeri))"
                      class="q-mx-sm"
                    >
                      <q-icon
                        size="xs"
                        color="teal"
                        :name="iconNyeri(item?.scorenyeri)"
                      />
                    </span>
                    <em class="text-primary"> {{ item?.keteranganscorenyeri ?? '-' }}</em>
                  </div>
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import { computed } from 'vue'
const store = useAnamnesis()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingTerima: {
    type: Boolean,
    default: false
  }
})

const lists = computed(() => {
  const arr = props.pasien?.anamnesis
  return arr?.sort((a, b) => { return b.id - a.id })
})

function getYT(val) {
  if (val === 1 || val === '1') {
    return 'Ya'
  } else if (val === 0 || val === '0') {
    return 'Tidak'
  } else {
    return '-'
  }
}

function hapusItem(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function iconNyeri (anu) {
  const val = typeof anu === 'string' ? (isNaN(parseInt(anu)) ? 0 : parseInt(anu)) : 0
  // console.log('val nyeri', val)
  // console.log('anu nyeri', anu)
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  } else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  } else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  } else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  } else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  } else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
}
</script>
