<template>
  <q-dialog id="endas" maximized @show="onShow" @hide="onHide">
    <div class="bg-white text-center">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="q-pa-md">
        <div class="row justify-center f-24 text-weight-bold q-my-sm">
          Telaah Resep
        </div>
        <div class="row items-center q-ma-sm">
          <div class="col-6 text-left">
            <div class="row">
              <div class="col-6">
                Nomor Resep
              </div>
              <div class="col-6">
                {{ item?.noresep }}
              </div>
            </div>
            <div v-if="item?.poli" class="row">
              <div class="col-6">
                Poli
              </div>
              <div class="col-6">
                {{ item?.poli?.rs2 }}
              </div>
            </div>
            <div v-if="item?.ruanganranap" class="row">
              <div class="col-6">
                Ruangan
              </div>
              <div class="col-6">
                {{ item?.ruanganranap?.rs2 }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Dokter
              </div>
              <div class="col-6">
                {{ item?.dokter?.nama }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Tanggal Permintaan Resep
              </div>
              <div class="col-6">
                {{ dateFull(item?.tgl_permintaan) }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Tanggal Kirim Resep
              </div>
              <div class="col-6">
                {{ dateFull(item?.tgl_kirim) }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Tanggal Resep Diterima
              </div>
              <div class="col-6">
                {{ dateFull(item?.tgl_terima) }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Tanggal Resep Selesai
              </div>
              <div class="col-6">
                {{ dateFull(item?.tgl_selesai) }}
              </div>
            </div>
          </div>
          <div class="col-6 text-left">
            <div class="row">
              <div class="col-6">
                Nama Pasien
              </div>
              <div class="col-6">
                {{ item?.datapasien?.nama }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Nomor Rm
              </div>
              <div class="col-6">
                {{ item?.datapasien?.rs1 }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Tgl Lahir
              </div>
              <div class="col-6">
                {{ dateFullFormat(item?.datapasien?.tgllahir) }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                Usia
              </div>
              <div class="col-6">
                {{ item?.datapasien?.usia }}
              </div>
            </div>
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="row justify-center f-16 text-weight-bold q-my-sm">
          Quistioner
        </div>
        <q-separator class="q-my-md" />
        <div class="row text-left q-my-sm items-end">
          <span class="f-14 text-weight-bold">Aspek Administratif</span> <span class="f-12 text-italic q-ml-sm">( oleh Tenaga Teknis Kefarmasian atau Apoteker)</span>
        </div>
        <div class="row q-ml-sm" v-for="(admin,a) in administrasi" :key="a">
          <div class="col-auto text-left" style="width: 5%;">
            {{ a+1 }}.
          </div>
          <div class="col-6 text-left">
            {{ admin.question }}
          </div>
          <div class="col-3 text-left">
            <q-option-group
              v-model="admin.value"
              :options="options"
              color="green"
              dense
              inline
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="row text-left q-my-sm items-end">
          <span class="f-14 text-weight-bold">Aspek Farmasetik</span> <span class="f-12 text-italic q-ml-sm">( oleh Tenaga Teknis Kefarmasian atau Apoteker)</span>
        </div>
        <div class="row q-ml-sm" v-for="(komp,k) in komponenReseps" :key="k">
          <div class="col-auto text-left" style="width: 5%;">
            {{ k+1 }}.
          </div>
          <div class="col-6 text-left">
            {{ komp.question }}
          </div>
          <div class="col-3 text-left">
            <q-option-group
              v-model="komp.value"
              :options="options"
              color="green"
              dense
              inline
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="row text-left q-my-sm items-end">
          <span class="f-14 text-weight-bold">Aspek Klinis</span> <span class="f-12 text-italic q-ml-sm">( oleh Apoteker)</span>
        </div>
        <div class="row q-ml-sm" v-for="(farm,fa) in farmasiKlinises" :key="fa">
          <div class="col-auto text-left" style="width: 5%;">
            {{ fa+1 }}.
          </div>
          <div class="col-6 text-left">
            {{ farm.question }}
          </div>
          <div class="col-3 text-left">
            <q-option-group
              v-model="farm.value"
              :options="tOptions"
              color="green"
              dense
              inline
            />
          </div>
        </div>
        <div class="row justify-end">
          <div class="col-6">
            <app-autocomplete
              :key="apoteker"
              v-model="apoteker"
              label="Apoteker"
              autocomplete="nama"
              option-label="nama"
              option-value="kdpegsimrs"
              outlined
              :source="apotekers"
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="q-pa-md">
          <div class="row justify-end q-mr-md">
            <q-btn
              label="Simpan"
              dense
              color="primary"
              @click="simpan()"
              no-caps
            />
          </div>
        </div>
      </div>
      <div style="margin-bottom: 100px" />
    </div>
  </q-dialog>
</template>
<script setup>
import { dateFull, dateFullFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { ref } from 'vue'

const emits = defineEmits(['close', 'simpan'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  item: { type: Object, default: () => {} },
  user: { type: Object, default: () => {} },
  apotekers: { type: Array, default: () => [] }
})
const options = ref([
  { value: 'Sesuai', label: 'Sesuai' },
  { value: 'Tidak sesuai', label: 'Tidak sesuai' }
])
const tOptions = ref([
  { value: true, label: 'Ya' },
  { value: false, label: 'Tidak' }
])
// eslint-disable-next-line no-unused-vars
const administrasi = ref([
  { id: '1', value: 'Sesuai', type_value: 'String', str_code: 'tgl_resep', kode: '1.1', question: 'Apakah tanggal resep sudah sesuai?', label: 'Tgl Resep' },
  { id: '2', value: 'Sesuai', type_value: 'String', str_code: 'nama_pasien', kode: '1.2', question: 'Apakah nama pasien sudah sesuai?', label: 'Nama Pasien' },
  { id: '3', value: 'Sesuai', type_value: 'String', str_code: 'rm_pasien', kode: '1.3', question: 'Apakah nomor RM pasien sudah sesuai?', label: 'No RM Pasien' },
  { id: '4', value: 'Sesuai', type_value: 'String', str_code: 'umur_bb', kode: '1.4', question: 'Apakah umur, Berat Badan pasien sudah sesuai?', label: 'Umur / BB pasien' },
  { id: '5', value: 'Sesuai', type_value: 'String', str_code: 'nama_dokter', kode: '1.5', question: 'Apakah nama dokter sudah sesuai?', label: 'Nama Dokter' },
  { id: '6', value: 'Sesuai', type_value: 'String', str_code: 'ttd_paraf', kode: '1.6', question: 'Apakah TTD/ paraf dokter sudah sesuai?', label: 'Ttd / paraf Dokter' },
  { id: '7', value: 'Sesuai', type_value: 'String', str_code: 'ruangan_poli', kode: '1.7', question: 'Apakah ruangan/unit asal resep sudah sesuai?', label: 'Ruangan / poli' },
  { id: '8', value: 'Sesuai', type_value: 'String', str_code: 'status_pembiayaan', kode: '1.8', question: 'Apakah status pembiayaan pasien sudah sesuai?', label: 'Status Pembiayaan' }
])
// eslint-disable-next-line no-unused-vars
const komponenReseps = ref([
  { id: '1', value: 'Sesuai', type_value: 'String', str_code: 'nama_obat_bentuk_sediaan', kode: '2.1', question: 'Apakah nama obat dan bentuk sediaan sudah sesuai?', label: 'Nama Obat, bentuk sediaan' },
  { id: '2', value: 'Sesuai', type_value: 'String', str_code: 'kuantitas_obat', kode: '2.2', question: 'Apakah jumlah obat sudah sesuai?', label: 'Kuantitas Obat' },
  { id: '3', value: 'Sesuai', type_value: 'String', str_code: 'dosis', kode: '2.3', question: 'Apakah dosis obat sudah sesuai?', label: 'Kekuatan Sediaan / dosis' },
  { id: '4', value: 'Sesuai', type_value: 'String', str_code: 'aturan_pakai', kode: '2.4', question: 'Apakah aturan dan cara penggunaan obat sudah sesuai?', label: 'Aturan Pakai' },
  { id: '5', value: 'Sesuai', type_value: 'String', str_code: 'stabilitas_dan_inkompatibilitas_sediaan', kode: '2.5', question: 'Apakah stabilitas obat sudah sesuai?', label: 'Stabilitas dan inkompatibilitas sediaan' }
])
// eslint-disable-next-line no-unused-vars
const farmasiKlinises = ref([
  { id: '1', value: false, type_value: 'valueBoolean', str_code: 'kontradiksi', kode: '3.1', question: 'Apakah terdapat kontraindikasi pengobatan?', label: 'Kontradiksi' },
  { id: '2', value: false, type_value: 'valueBoolean', str_code: 'duplikasi', kode: '3.2', question: 'Apakah terdapat duplikasi pengobatan?', label: 'Duplikasi' },
  { id: '3', value: false, type_value: 'valueBoolean', str_code: 'efek_samping', kode: '3.3', question: 'Apakah terdapat alergi dan reaksi obat yang tidak dikehendaki (ROTD)?', label: 'Efek Samping' },
  { id: '4', value: false, type_value: 'valueBoolean', str_code: 'interaksi', kode: '3.4', question: 'Apakah terdapat interaksi obat dengan obat lainnya maupun obat dengan makanan?', label: 'Interaksi Obat' },
  { id: '5', value: false, type_value: 'valueBoolean', str_code: 'identitas_pasien_obat_dosis_frekuensi_aturan pakai_waktu pemberian', kode: '3.5', question: 'Apakah identitas pasien, obat, dosis, frekuensi, aturan pakai dan waktu pemberian sudah sesuai?', label: 'Identitas pasien, obat, dosis, frekuensi, aturan pakai, waktu pemberian' },
  { id: '6', value: false, type_value: 'valueBoolean', str_code: 'variasi_kriteria_penggunaan', kode: '3.6', question: 'Apakah ada variasi kriteria penggunaan (bandingkan dengan Panduan Praktik Klinis atau Formularium Nasional)?', label: 'Variasi kriteria penggunaan' }
])
const apoteker = ref(null)
function simpan () {
  console.log('apoteker', apoteker.value)
  if (!apoteker.value) return notifErrVue('Apoteker Belum dipilih')
  const form = {
    norm: props.item.norm,
    noreg: props.item.noreg,
    noresep: props.item.noresep,
    apoteker: apoteker.value,
    administrasi: administrasi.value,
    farmasi_klinis: farmasiKlinises.value,
    komponen_resep: komponenReseps.value
  }
  emits('simpan', { item: props.item, form })
}
// on show
function onShow () {
  console.log('telaah', props.item?.telaah)
  console.log('apot', props.apotekers)
  console.log('user', props.user)
  if (props.item?.telaah) {
    administrasi.value = props.item?.telaah?.administrasi
    komponenReseps.value = props.item?.telaah?.komponen_resep
    farmasiKlinises.value = props.item?.telaah?.farmasi_klinis
    apoteker.value = props.item?.telaah?.apoteker?.toString()
  }
  else {
    apoteker.value = props?.user?.pegawai_id?.toString()
  }

  console.log('apo', apoteker.value)
}
// on hide
function onHide () {
  apoteker.value = null
  administrasi.value.forEach(f => {
    f.value = 'Sesuai'
  })
  komponenReseps.value.forEach(f => {
    f.value = 'Sesuai'
  })
  farmasiKlinises.value.forEach(f => {
    f.value = false
  })
}
</script>
