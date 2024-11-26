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
        List Permintaan Konsul
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="store.loadingaja"
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
        v-if="filterredTable.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada Data....
        </div>
      </div>
      <div
        v-if="filterredTable.length > 0"
        class="fit q-pa-sm scroll"
      >
        <transition-group name="list">
          <q-card
            flat bordered class="q-mb-xs cursor-pointer" v-for="(item, i) in filterredTable" :key="i"
            @mouseover="hoverredId = item?.id"
            @mouseleave="hoverredId = null"
          >
            <q-card-section>
              <q-item class="list-move q-pa-none">
                <q-item-section avatar>
                  <q-avatar size="50px">
                    <img :src="PHOTO_USER(item?.kddokterkonsul)">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ namaPetugas(item?.kddokterkonsul) }}
                  </q-item-label>
                  <q-item-label caption lines="1">
                    <span class="text-weight-bold">Konsul</span>
                    -- {{ item?.permintaan }}
                  </q-item-label>
                  <q-item-label caption lines="1" :class="{ 'text-red': item?.jawaban === null || item?.jawaban === ''}">
                    <span v-if="item?.jawaban !== null && item?.jawaban !== ''" class="text-weight-bold">Jawaban</span>
                    -- {{ item?.jawaban ?? 'Belum Ada Jawaban' }}
                  </q-item-label>
                  <q-item-label>
                    <span v-if="item?.tindakan.length > 0 " class="text-weight-bold">
                      <q-badge color="red" outline>{{ formatRpDouble(item?.tindakan[0]?.subtotal) ?? '' }}</q-badge>
                    </span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="absolute-top-right">
                    1 menit yg lalu
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
                  v-if="(item?.jawaban === null || item?.jawaban === '') && (item?.kdminta === auth || item?.user === auth)"
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
          </q-card>
        </transition-group>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useKonsulIgdStore } from 'src/stores/simrs/igd/konsul'
import { computed, ref } from 'vue'

const store = useKonsulIgdStore()

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

const emits = defineEmits(['detail'])

const hoverredId = ref(null)

const formatRpDouble = (value, dg) => {
  if (value !== null) {
    return 'Rp. ' + Number(value)
      .toFixed(dg)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      // .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
  }
}

function namaPetugas (item) {
  // console.log('item', item)
  const petugas = store.dokters?.find(x => x.kdpegsimrs === item)?.nama ?? null
  return petugas
}

const filterredTable = computed(() => {
  const arr = props?.pasien?.konsultasi ?? []
  return arr
})

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
</script>
