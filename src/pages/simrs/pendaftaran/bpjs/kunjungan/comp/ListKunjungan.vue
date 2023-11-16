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
            <q-item-label>
              Tgl Kunjungan : <span class="text-weight-bold text-accent"> {{ dateFullFormat(item.tgl_kunjungan) }} </span> | jam : {{ formatJam(item.tgl_kunjungan) }}
            </q-item-label>
            <q-item-label
              caption
            >
              <i>Status Pasien: <span class="text-negative text-weight-bold">{{ getStatus(item.taskid) }}</span></i>
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
              <div
                class="row justify-end"
                @click="bukaSep(item)"
              >
                <div v-if="loadingReSep === item.noreg && sepStore.loading">
                  <app-btn
                    dense
                    loading
                  />
                </div>
                <div
                  v-else
                  :class="item.sep?'q-ml-sm':'q-ml-sm cursor-pointer'"
                >
                  <q-badge
                    outline
                    :color="item.sep?'teal':'negative'"
                    :label="item.sep?item.sep:'SEP Belum terbit'"
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
              <div class="row q-mt-sm justify-end">
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
    <DialogSep />
    <!-- dialog hapus -->
    <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card class="q-pa-md">
        <q-card-section class="row items-center text-weight-bold f-18 q-pa-xl">
          <span class="q-ml-sm">Nomor SEP Belum Tercatat di data Rumah Sakit !</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            no-caps
            label="Batal"
            color="dark"
            @click="batal"
          />
          <q-btn
            push
            no-caps
            label="Ambil Data SEP"
            color="primary"
            @click="ambil"
          />
          <q-btn
            push
            no-caps
            label="Tidak Dibuatkan SEP"
            color="primary"
            @click="tidak"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import DialogSep from './DialogSep.vue'
import { api } from 'src/boot/axios'
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { notifCenterVue } from 'src/modules/utils'
import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep'
import { ref } from 'vue'

defineProps({
  loading: { type: Boolean, default: false },
  loadingH: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['hapus'])

const temp = ref(null)
const confirm = ref(false)
const tempData = ref(null)
function batal() {
  temp.value = ''
  tempData.value = ''
  confirm.value = false
}
function ambil() {
  loadingReSep.value = tempData.value.noreg
  sepStore.getSep(tempData.value).then(resp => {
    console.log('resp sep', resp)
    loadingReSep.value = ''
    tempData.value = null
    // emits('hapus', item)
    console.log('Cancel dalem', loadingReSep.value)
  })
  confirm.value = false
}
function tidak() {
  emits('hapus', tempData.value)
  confirm.value = false
}
function hapus(item) {
  temp.value = item.noka
  if (item.sep) {
    emits('hapus', item)
  } else {
    console.log('anu')
    confirm.value = true
    tempData.value = item
    // Dialog.create({
    //   title: 'Tidak Ada SEP',
    //   message: 'Nomor SEP Belum Tercatat di data Rumah Sakit',
    //   ok: {
    //     label: 'Tidak Dibuatkan SEP',
    //     'no-caps': true,
    //     color: 'primary'
    //   },
    //   cancel: {
    //     label: 'Ambil Data SEP',
    //     'no-caps': true,
    //     color: 'primary'
    //   }
    // })
    //   .onOk(() => {
    //     console.log('OK')
    //     emits('hapus', item)
    //   })
    //   .onCancel(() => {
    //     loadingReSep.value = item.noreg
    //     sepStore.getSep(item).then(resp => {
    //       console.log('resp sep', resp)
    //       loadingReSep.value = ''
    //       // emits('hapus', item)
    //       console.log('Cancel dalem', loadingReSep.value)
    //     })
    //     console.log('Cancel', loadingReSep.value)
    //   })
  }
}

const pasien = ref(null)
const openGen = ref(false)
const openPrevGc = ref(false)

function openPreviewGc() {
  openPrevGc.value = !openPrevGc.value
}

const dialog = ref(false)
const loadingP = ref(false)
const jenisPengajuans = ref([
  { nama: 'pengajuan backdate', value: '1' },
  { nama: 'pengajuan finger print', value: '2' }
])
const keterangan = ref('')
const jenisPengajuan = ref('2')
function PengajuanSep(val) {
  dialog.value = true
  temp.value = val.noka
}
const sepStore = useSepBpjsStore()
const loadingReSep = ref(null)
function bukaSep(val) {
  console.log('buka sep', val)
  // sepStore.setOpen()
  loadingReSep.value = val.noreg
  // const form = {
  //   noreg: val.noreg,
  //   norm: val.norm,
  //   noka: val.noka
  // }
  if (!val.sep) {
    sepStore.getSep(val)
  }
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
