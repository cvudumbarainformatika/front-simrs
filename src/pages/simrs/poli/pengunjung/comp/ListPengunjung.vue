<template>
  <div>
    <div class="q-pb-xl">
      <LoadingList v-if="loading" />
      <empty-data v-else-if="!items.length && !loading" />
      <q-list
        v-else
        separator
      >
        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section
            avatar
            top
          >
            <app-avatar-pasien
              :pasien="item"
              width="80px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span> <span v-if="item?.noka"> | </span> <span class="text-cyan text-weight-bold">{{ item?.noka ?? '-' }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label>
            <q-item-label>
              NIK : <span class="text-negative text-weight-bold">{{ item?.nktp ?? '-' }}</span> | Telp : <span class="text-teal text-weight-bold"> {{ item?.nohp ?? '-' }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-grey">alamat :</span> {{ item?.alamat }}
            </q-item-label>
            <q-item-label
              caption
            >
              status : <span :class="item.status !== ''?'text-primary':'text-negative'">{{ getStatus(item.status) }}</span>
            </q-item-label>
            <q-item-label
              v-if="item?.planning?.length"
              caption
            >
              rencana : <span class="text-primary">{{ item?.planning[0].rs4 }}</span>
              <span
                v-if="item?.planning[0].rs4==='Konsultasi'"
                class="text-primary"
              > ( {{ item?.planning[0].masterpoli?.rs2 }} )</span>
              <span
                v-if="item?.planning[1]"
              > | <span class="text-secondary">{{ item?.planning[1].rs4 }}</span>
                <span
                  v-if="item?.planning[1].rs4==='Konsultasi'"
                  class="text-secondary"
                > ( {{ item?.planning[1].masterpoli?.rs2 }} )</span>
              </span>
            </q-item-label>
          </q-item-section>
          <q-separator
            vertical
            class="q-mx-md"
          />
          <q-item-section>
            <!-- <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span>
            </q-item-label> -->
            <!-- <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label> -->
            <q-item-label caption>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span>
            </q-item-label>
            <q-item-label>
              RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>

            <q-item-label>
              Tanggal : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? dateFullFormat(item.tgl_kunjungan) : '-' }}</i>  | Jam : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? formatJam(item.tgl_kunjungan) : '-' }}</i>
            </q-item-label>
            <q-item-label>
              No Antrian : <span class="text-teal text-weight-bold"> {{ item?.noantrian }}</span>
            </q-item-label>

            <q-item-label
              caption
            >
              <q-badge
                v-if="item?.sep"
                :label="item?.sep"
              />
              <div v-if="!item?.sep">
                <q-btn
                  v-if="storeSep.loading && reg===item.noreg"
                  size="8px"
                  flat
                  loading
                />
                <q-badge
                  v-if="reg!==item.noreg && item.groups==='1'"
                  label="SEP BELUM TERBIT"
                  color="negative"
                  class="cursor-pointer"
                  @click="getSep(item)"
                />
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-btn
              v-if="item.status !== '3'"
              dense
              outline
              size="sm"
              no-caps
              color="primary"
              :label="labelLayanan(item?.status)"
              class="q-mb-sm"
              icon-right="icon-mat-edit"
              style="min-width: 120px;"
              :loading="loadingTerima && store.noreg === item?.noreg"
              :disable="loadingTerima"
              @click="emits('tindakan', item)"
            />
            <q-btn
              v-if="item.status === '1'"
              dense
              size="sm"
              no-caps
              color="black"
              label="KIRIM DATA KEPENJAMINAN"
              class="q-mb-sm"
              icon-right="icon-mat-attach_money"
              style="min-width: 120px;"
              :loading="loadingTerima && store.noreg === item?.noreg"
              :disable="loadingTerima"
              @click="emits('kirimkepenjaminan', item)"
            />
            <q-btn
              v-if="item.status === ''"
              dense
              size="sm"
              no-caps
              color="accent"
              label="PANGGIL"
              class="q-mb-lg"
              icon-right="icon-mat-volume_up"
              style="min-width: 120px;"
              :loading="loadingCall && store.noreg === item?.noreg"
              :disable="loadingCall && store.noreg === item?.noreg"
              @click="emits('panggilan', item)"
            />
            <q-btn
              v-if="item.status === '' || item.status === '2'"
              dense
              size="sm"
              no-caps
              color="red"
              label="TIDAK DATANG"
              icon-right="icon-mat-hand-front-left"
              style="min-width: 120px;"
              :loading="store.loadingTidakhadir && store.noreg === item?.noreg"

              @click="emits('tidakdatang', item)"
            />
            <q-btn
              v-if="item.status === '3'"
              dense
              size="sm"
              no-caps
              color="red"
              label="PASIEN TIDAK DATANG"
              style="min-width: 120px;"
            />
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <div class="q-pb-xl" />
      <div class="q-pb-xl" />
    </div>
  </div>
</template>
<script setup>
import LoadingList from './LoadingList.vue'
import EmptyData from './EmptyData.vue'
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep'
import { ref } from 'vue'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
const emits = defineEmits(['tindakan', 'panggilan', 'tidakdatang', 'kirimkepenjaminan'])
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingTerima: {
    type: Boolean,
    default: false
  },
  loadingCall: {
    type: Boolean,
    default: false
  },
  loadingTidakhadir: {
    type: Boolean,
    default: false
  }
})

function getStatus(val) {
  // '' : 'Belum Terlayanani'
  // '1': 'Terlayani'
  // '2': 'Sudah diterima'
  // '3': Batal
  if (val === '') {
    return 'BELUM TERLAYANI'
  } else if (val === '1') {
    return 'TERLAYANI'
  } else if (val === '2') {
    return 'SUDAH DITERIMA'
  } else {
    return 'Tidak Hadir'
  }
}

function labelLayanan(val) {
  if (val === '') {
    return 'TERIMA'
  } else if (val === '1') {
    return 'LIHAT LAYANAN'
  } else if (val === '2') {
    return 'SUDAH DITERIMA'
  } else if (val === '3') {
    return 'Tidak Hadir'
  }
}

const store = usePengunjungPoliStore()
const storeSep = useSepBpjsStore()
const reg = ref(null)
function getSep(val) {
  reg.value = val.noreg
  console.log('pasien', val)
  if (val.groups === '1') {
    if (!val.noka) {
      notifErrVue('Nomor Kartu BPJS paien tidak ada, tidak bisa mengambil data Sep')
      reg.value = null
    } else {
      storeSep.getSep(val).then(() => {
        reg.value = null
      })
    }
  } else if (val.groups === '2') {
    notifErrVue('Pasien Umum tidak perlu nomor SEP')
    reg.value = null
  } else {
    notifErrVue('SEP hanya untuk pasien BPJS')
    reg.value = null
  }
}
// function getTask(arr) {
//   if (arr.length === 0) {
//     return '-'
//   }

//   // 1 (mulai waktu tunggu admisi),
//   // 2 (akhir waktu tunggu admisi/mulai waktu layan admisi),
//   // 3 (akhir waktu layan admisi/mulai waktu tunggu poli),
//   // 4 (akhir waktu tunggu poli/mulai waktu layan poli),
//   // 5 (akhir waktu layan poli/mulai waktu tunggu farmasi),
//   // 6 (akhir waktu tunggu farmasi/mulai waktu layan farmasi membuat obat),
//   // 7 (akhir waktu obat selesai dibuat),
//   // 99 (tidak hadir/batal)
//   const arr0 = arr[0].taskid
//   let text
//   switch (arr0) {
//     case '1' || 1:
//       text = 'Menunggu di Admisi'
//       break
//     case '2' || 2:
//       text = 'Pelayanan di Admisi'
//       break
//     case '3' || 3:
//       text = 'Belum Dilayani'
//       break
//     case '4' || 4:
//       text = 'Pelayanan di Poli'
//       break
//     case '5' || 5:
//       text = 'Sudah dilayani'
//       break
//     case '6' || 6:
//       text = 'Farmasi'
//       break
//     case '7' || 7:
//       text = 'Sudah Ambil Obat di Farmasi'
//       break
//     default:
//       text = 'Tidak Hadir/ Batal'
//   }
//   return text
// }
</script>
