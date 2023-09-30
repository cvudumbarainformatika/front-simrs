<template>
  <div>
    <app-loading v-if="loading" />
    <div v-else>
      <div v-if="items.length <= 0">
        <div
          class="column flex-center"
          style="min-height:50vh"
        >
          <div class="text-h3 q-mb-md">
            🏷️
          </div>
          <div class="f-14">
            Belum Ada Data
          </div>
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
            <!-- <q-item-label>
              Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label> -->
            <q-item-label
              caption
            >
              Status Pasien: <span class="text-negative text-weight-bold">{{ getStatus(item.taskid) }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-item-label caption>
              <!-- <div class="row justify-end">
                <div class="q-ml-sm">
                  <q-badge
                    outline
                    :color="item.seprajal?'teal':'negative'"
                    :label="item.seprajal?'SEP terbit':'SEP Belum terbit'"
                  />
                </div>
              </div> -->
              <!-- <div class="row q-mt-sm text-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    :color="item.generalconsent?'teal':'negative'"
                    :label="item.generalconsent?'Ada General Consent':'General Consent Belum Ada'"
                    @click="genCon(item)"
                  />
                </div>
              </div> -->
              <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    color="cyan"
                    label="Buka Billing"
                    @click="openBill(item)"
                  />
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset
        />
      </q-list>
    </div>
    <!-- Billing -->
    <app-fullscreen
      v-model="billOpen"
    >
      <template #default>
        <BillingPage
          :pasien="pasien"
          @print="openPrint"
        />
      </template>
    </app-fullscreen>
    <!-- print nota -->
    <app-dialog-not-full
      v-model="printOpen"
    >
      <template #default>
        <div
          id="printMe"
          class="q-pa-xs"
        >
          <div class="row">
            UOBK RSUD dr. MOHAMAD SALEH
          </div>
          <div class="row">
            Jl. Mayjend Panjaitan No. 65 Probolinggo Jawa Timur
          </div>
          <div class="row garis-bawah-double">
            Telp. (0335) 433478,433119,421118 Fax. (0335) 432702
          </div>
          <div class="row no-wrap q-my-md bg-grey-3">
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-3">
                  No Rm
                </div>
                <div class="col-9">
                  {{ pasien.norm }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Nama
                </div>
                <div class="col-9">
                  {{ pasien.nama }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Kelamin
                </div>
                <div class="col-9">
                  {{ pasien.kelamin }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Alamat
                </div>
                <div class="col-9">
                  {{ pasien.alamat }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Tgl Masuk
                </div>
                <div class="col-9">
                  {{ dateFullFormat( pasien.tgl_kunjungan) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-3">
                  No Reg
                </div>
                <div class="col-9">
                  {{ pasien.rs1 }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Tgl Lahir
                </div>
                <div class="col-9">
                  {{ dateFullFormat( pasien.tgllahir) }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Ruang
                </div>
                <div class="col-9">
                  {{ pasien.poli }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Sistem Bayar
                </div>
                <div class="col-9">
                  {{ pasien.sistembayar }}
                </div>
              </div>
            </div>
          </div>
          <!-- header -->
          <div class="row items-center no-wrap garis-bawah-double garis-atas-double">
            <div class="col-1">
              No
            </div>
            <div class="col-9">
              Tindakan
            </div>
            <div class="col-2">
              Harga
            </div>
          </div>
          <!-- List -->
          <div class="row items-center no-wrap ">
            <div class="col-1">
              1
            </div>
            <div class="col-9">
              Tindakan nya
            </div>
            <div class="col-2 garis-bawah-double text-right">
              Harga nya
            </div>
          </div>
          <!-- total -->
          <div class="row items-center no-wrap ">
            <div class="col-10 text-right">
              Rp.
            </div>
            <div class="col-2 text-right">
              Harga
            </div>
          </div>
        </div>
      </template>
    </app-dialog-not-full>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BillingPage from './BillingPage.vue'
import { dateFullFormat } from 'src/modules/formatter'

const pasien = ref(null)
const billOpen = ref(false)
const printOpen = ref(false)
// const openPrevGc = ref(false)

function openBill(row) {
  pasien.value = row
  billOpen.value = !billOpen.value
}
function openPrint(val) {
  console.log('print', val)
  printOpen.value = true
}
// function openPreviewGc() {
//   openPrevGc.value = !openPrevGc.value
// }

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

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
<style lang="scss" scoped>
.garis-bawah-double{
  border-bottom: 4px solid black;
  border-bottom-style: double;
}
.garis-atas-double{
  border-top: 4px solid black;
  border-top-style: double;
}
</style>
