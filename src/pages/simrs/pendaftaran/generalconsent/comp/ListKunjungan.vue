<template>
  <div class="full-height">
    <app-loading v-if="loading" />
    <div
      v-else
      class="full-height"
    >
      <div
        v-if="items.length <= 0"
        class="column flex-center full-height"
      >
        <div class="text-h3 q-mb-md">
          🏷️
        </div>
        <div class="f-14">
          Belum Ada Data
        </div>
      </div>
      <q-list
        v-else
        separator
      >
        <q-separator
          spaced
          inset
        />

        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ item.nama }} | <span class="text-primary">{{ item.norm }}</span>
            </q-item-label>
            <q-item-label>
              NOREG : <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label>
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              Tgl Kunjungan : <span class="text-weight-bold text-accent"> {{ dateFullFormat(item.tgl_kunjungan) }} </span> | jam : {{ formatJam(item.tgl_kunjungan) }}
            </q-item-label>
            <q-item-label
              caption
            >
              <i>Status Pasien: <span class="text-negative text-weight-bold">{{ getStatus(item.taskid) }}</span></i>
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-item-label caption>
              <div
                class="row justify-end"
                @click="bukaSep(item)"
              >
                <div
                  :class="item.sep?'q-ml-sm':'q-ml-sm cursor-pointer'"
                >
                  <q-badge
                    outline
                    :color="item.sep?'teal':'negative'"
                    :label="item.sep?item.sep:'SEP Belum terbit'"
                  />
                </div>
              </div>
              <div class="row q-mt-sm justify-end">
                <q-btn
                  outline
                  size="sm"
                  class="q-px-md"
                  :color="item.generalconsent?'teal':'negative'"
                  :label="item.generalconsent?'Lihat General Consent':'General Consent Belum Ada'"
                  @click="genCon(item)"
                />
              </div>
              <!-- <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    color="teal"
                    :loading="loadingP && temp===item.noka"
                    label="Pengajuan SEP"
                    @click="PengajuanSep(item)"
                  />
                </div>
              </div> -->
              <!-- <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    size="sm"
                    padding="xs"
                    color="negative"
                    :loading="loadingH && temp===item.noka"
                    label="Hapus Pasien"
                    @click="hapus(item)"
                  />
                </div>
              </div> -->
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset
        />
      </q-list>
    </div>
    <app-general-consent
      :key="pasien"
      v-model="openGen"
      :pasien="pasien"
      @close="openGen = !openGen"
      @open-preview-gc="(val)=> openPreviewGc(val)"
    />
    <app-preview-general-consent
      :key="pasien"
      v-model="store.openPreviewGc"
      :pasien="pasien"
      :cetak="cetak"
      @close="store.openPreviewGc = !store.openPreviewGc"
    />

    <!-- dialog hapus -->
  </div>
</template>

<script setup>
// import { api } from 'src/boot/axios'
import { dateFullFormat, formatJam } from 'src/modules/formatter'
// import { notifCenterVue } from 'src/modules/utils'
// import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep'
import { ref } from 'vue'
import { useGeneralConsentStore } from 'src/stores/simrs/pendaftaran/generalconsent'

defineProps({
  loading: { type: Boolean, default: false },
  loadingH: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

const pasien = ref(null)
const openGen = ref(false)
// const openPrevGc = ref(false)
const cetak = ref(false)
const store = useGeneralConsentStore()

// eslint-disable-next-line no-unused-vars
function genCon(row) {
  // console.log(row)
  pasien.value = row
  openGen.value = !openGen.value
}

function openPreviewGc(val) {
  if (val === 'cetak') {
    cetak.value = true
  } else {
    cetak.value = false
  }
  store.openPreviewGc = !store.openPreviewGc
}

function getStatus(arr) {
  if (arr.length === 0) {
    return '-'
  }

  // 1 (mulai waktu tunggu admisi),
  // 2 (akhir waktu tunggu admisi/mulai waktu layan admisi),
  // 3 (akhir waktu layan admisi/mulai waktu tunggu poli),
  // 4 (akhir waktu tunggu poli/mulai waktu layan poli),
  // 5 (akhir waktu layan poli/mulai waktu tunggu farmasi),
  // 6 (akhir waktu tunggu farmasi/mulai waktu layan farmasi membuat obat),
  // 7 (akhir waktu obat selesai dibuat),
  // 99 (tidak hadir/batal)
  const arr0 = arr[0].taskid
  let text
  switch (arr0) {
    case '1' || 1:
      text = 'Menunggu di Admisi'
      break
    case '2' || 2:
      text = 'Pelayanan di Admisi'
      break
    case '3' || 3:
      text = 'Menunggu di Poli'
      break
    case '4' || 4:
      text = 'Pelayanan di Poli'
      break
    case '5' || 5:
      text = 'Menunggu di Farmasi'
      break
    case '6' || 6:
      text = 'Farmasi'
      break
    case '7' || 7:
      text = 'Sudah Ambil Obat di Farmasi'
      break
    default:
      text = 'Tidak Hadir/ Batal'
  }
  return text
}
</script>
