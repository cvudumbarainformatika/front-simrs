<script setup>
import { useQuasar } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { formatRp, tglJamFormat } from 'src/modules/formatter'
import { computed, ref } from 'vue'
import { useKonsulRanapStore } from 'src/stores/simrs/ranap/konsul'

const store = useKonsulRanapStore()

const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  auth: {
    type: String,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

// console.log('auth', props?.auth)

const emits = defineEmits(['detail'])

const filterredTable = computed(() => {
  const arr = props?.pasien?.konsultasi ?? []
  console.log('arr ', arr)

  return arr
})

function namaPetugas (item) {
  // console.log('item', item)
  const petugas = store.dokters?.find(x => x.kdpegsimrs === item)?.nama ?? null
  return petugas
}

const PHOTO_USER = (item) => {
  const dokter = store.dokters?.find(x => x.kdpegsimrs === item) ?? null
  // console.log('dokter', dokter)
  const kelamin = 'Laki-laki'
  const row = dokter
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row?.nip + '/' + row?.foto
  }
}

const hoverredId = ref(null)

function masihBisadiHapus (item) {
  // (item?.jawaban === null || item?.jawaban === '') && (item?.kdminta === auth || item?.user === auth)
  // console.log('item', item);

  let hapus = false
  if (item?.jawaban === null || item?.jawaban === '') {
    hapus = true
    if (item?.kdminta === props?.auth || item?.nakesminta?.kdgroupnakes === '2') {
      hapus = true
    }
    else {
      hapus = false
    }
  }
  else {
    hapus = false
  }
  return hapus
}

function hapusItem (id) {
  // console.log('id', id)

  $q.dialog({
    // dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.hapusPermintaan(props?.pasien, id)
    // console.log('OK')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<template>
  <div class="fit q-pa-sm scroll">
    <!-- <q-list
      separator
      class="bg-white"
    > -->
    <transition-group name="list">
      <q-card
        flat bordered v-for="(item, i) in filterredTable" :key="i"
        class="q-mb-xs cursor-pointer"
        :class="{ 'bg-yellow-1': item?.nakesminta?.kdgroupnakes === '2' }"
        @mouseover="hoverredId = item?.id"
        @mouseleave="hoverredId = null"
      >
        <div class="full-width">
          <q-card-section>
            <q-item class="list-move q-pa-none">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <img :src="PHOTO_USER(item?.kddokterkonsul)">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="1">
                  From : {{ item?.nakesminta?.nama }}
                </q-item-label>
                <q-item-label lines="1">
                  To : {{ namaPetugas(item?.kddokterkonsul) }}
                </q-item-label>

                <q-item-label caption lines="1" :class="{ 'text-red': item?.jawaban === null || item?.jawaban === ''}">
                  <span v-if="item?.jawaban !== null && item?.jawaban !== ''" class="text-weight-bold">Jawaban</span>
                  -- {{ item?.jawaban ?? 'Belum Ada Jawaban' }}
                </q-item-label>
                <!-- <q-item-label v-if="item?.tarif" caption lines="1" :class="{ 'text-red': item?.jawaban === null || item?.jawaban === ''}">
                  <q-badge>Rp. {{ formatRp(item?.tarif?.subtotal) }}</q-badge>
                </q-item-label> -->
              </q-item-section>

              <q-item-section side>
                <div class="absolute-top-right">
                  {{ tglJamFormat(item?.created_at) }}
                </div>
                <div class="absolute-bottom-right">
                  <q-icon
                    :name="!item?.id ? 'icon-mat-done' : 'icon-mat-done_all'"
                    :color="!item?.flag ? 'grey-5' : 'primary'"
                    size="sm"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
          <div v-if="hoverredId === item?.id" class="absolute-top-right bg-white full-height column flex-center q-pa-md" style="border-left: 1px solid #ddd ;">
            <div class="flex q-gutter-md">
              <q-btn
                v-if="masihBisadiHapus(item)"
                flat
                round
                size="md"
                icon="icon-mat-delete"
                color="negative"
                @click="hapusItem(item.id)"
              >
                <q-tooltip>Hapus </q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                size="md"
                icon="icon-mat-sms_black"
                color="primary"
                @click="emits('detail', item)"
              >
                <q-tooltip>Lihat / Input Jawaban & Detail</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card>
    </transition-group>
    <div style="margin-bottom: 100px;" />
  </div>
</template>
