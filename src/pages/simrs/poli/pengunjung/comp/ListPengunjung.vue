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
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label>
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              Tanggal Kunjungan : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? dateFullFormat(item.tgl_kunjungan) : '-' }}</i>  | Jam : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? formatJam(item.tgl_kunjungan) : '-' }}</i>
            </q-item-label>
            <q-item-label
              caption
            >
              status : <span :class="getStatus(item.status)?'text-accent':'text-negative'">{{ getStatus(item.status)?'SUDAH DILAYANI':'BELUM DILAYANI' }}</span>
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-btn
              dense
              size="sm"
              no-caps
              color="secondary"
              label="Tindakan"
              class="q-mb-sm"
              icon-right="icon-mat-description"
              @click="emits('tindakan', item)"
            />
            <q-btn
              dense
              size="sm"
              no-caps
              color="orange"
              label="Panggil"
              icon-right="icon-mat-volume_up"
            />
          </q-item-section>
        </q-item>
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
const emits = defineEmits(['tindakan'])
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

function getStatus(val) {
  if (val === 1 || val === '1') {
    return true
  }
  return false
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
