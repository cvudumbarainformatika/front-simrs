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
          <!-- <q-item-section
            side
          >
            {{ item.noka }}
            <figure
              class="qrcode full-width q-pa-sm"
            >
              <vue-qrcode
                :value="item.noka"
                tag="svg"
                :options="{
                  errorCorrectionLevel: 'Q',
                  color: {
                    dark: '#000000',
                    light: '#ffffff',
                  },
                  margin:2
                }"
              />
            </figure>
          </q-item-section> -->

          <q-item-section
            side
            top
          >
            <q-item-label caption>
              <div class="row justify-end">
                <div class="q-ml-sm">
                  <q-badge
                    outline
                    :color="item.sep?'teal':'negative'"
                    :label="item.sep?'SEP terbit':'SEP Belum terbit'"
                  />
                </div>
              </div>
              <div class="row q-mt-sm text-end">
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
              </div>
              <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    color="teal"
                    :loading="loadingP && temp===item.noka"
                    label="Pengajuan SEP"
                    @click="PengajuanSep(item)"
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

    <!-- General COnsent -->
    <app-general-consent
      :key="pasien"
      v-model="openGen"
      :pasien="pasien"
      @close="openGen = !openGen"
      @open-preview-gc="openPreviewGc()"
    />
    <app-preview-general-consent
      v-model="openPrevGc"
      @close="openPrevGc = !openPrevGc"
    />
    <app-dialog-form
      v-model="dialog"
      title="Alasan Pengajuan SEP"
      @save-form="simpanPengajuan()"
    >
      <template #default>
        <div>
          <div class="row q-mb-sm">
            <div class="col-12">
              <app-autocomplete
                v-model="jenisPengajuan"
                label="Jenis Pengajuan"
                option-value="value"
                option-label="nama"
                :source="jenisPengajuans"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <app-input
                v-model="keterangan"
                label="keterangan"
              />
            </div>
          </div>
        </div>
      </template>
    </app-dialog-form>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifCenterVue } from 'src/modules/utils'
import { ref } from 'vue'

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

const pasien = ref(null)
const openGen = ref(false)
const openPrevGc = ref(false)

function openPreviewGc() {
  openPrevGc.value = !openPrevGc.value
}

const dialog = ref(false)
const keterangan = ref('')
const temp = ref(null)
const loadingP = ref(false)
const jenisPengajuans = ref([
  { nama: 'pengajuan backdate', value: '1' },
  { nama: 'pengajuan finger print', value: '2' }
])
const jenisPengajuan = ref('2')
function PengajuanSep(val) {
  dialog.value = true
  temp.value = val.noka
}

function simpanPengajuan() {
  const data = {
    noka: temp.value,
    jenispengajuan: jenisPengajuan.value,
    keterangan: keterangan.value
  }
  console.log(data)
  dialog.value = false
  return new Promise(resolve => {
    loadingP.value = true
    api.post('v1/simrs/bridgingbpjs/pendaftaran/pengajuansep', data)
      .then(resp => {
        loadingP.value = false
        if (resp.metadata.code === '200' || resp.status === 200) {
          notifCenterVue('Pengajuan SEP sudah disampaikan')
        }
        jenisPengajuan.value = '2'
        keterangan.value = ''
        resolve(resp)
      })
      .catch(() => {
        loadingP.value = false
      })
  })
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

function genCon(row) {
  // console.log(row)
  pasien.value = row
  openGen.value = !openGen.value
}
</script>
<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

</style>
