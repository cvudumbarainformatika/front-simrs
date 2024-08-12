<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:80vw; max-width: 80vw;">
      <q-bar class="bg-primary text-white">
        <div>Cetak Sep Rawat Inap</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-separator />
      <div id="printMe" class="f-12">
        <q-card-section class="q-pa-none">
          <div class="full-width q-pa-md">
            <div class="headerx full-width relative-position">
              <img
                src="~assets/logos/logobpjs.svg"
                class="q-mb-sm"
                width="200"
              >
              <div class="absolute-top full-width" style="left:0%">
                <div class="column full-width flex-center">
                  <div class="f-14 text-weight-bold">
                    SURAT ELEGIBILITAS PESERTA
                  </div>
                  <div class="f-14 text-weight-bold">
                    RSUD MOHAMAD SALEH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator style="margin-top: -10px;" />
        <q-card-section class="q-pa-md row q-col-gutter-md">
          <div class="col-6">
            <div class="row q-col-gutter-md full-width">
              <div class="col-auto">
                <div>NO. SEP</div>
                <div>Tgl. SEP</div>
                <div>NO. Kartu</div>
                <div>Nama Peserta</div>
                <div>Tgl Lahir</div>
                <div>No. Telepon</div>
                <div>Sub/Spesialis</div>
                <div>Dokter</div>
                <div>Asal Faskes</div>
                <div>Diagnosa Awal</div>
                <div>Catatan</div>
              </div>
              <div class="col full-width">
                <div>: {{ pasien?.sep }}</div>
                <div>: {{ sep?.tglSep }}</div>
                <div>: {{ sep?.peserta?.noKartu }}</div>
                <div>: {{ sep?.peserta?.nama }}</div>
                <div>: {{ sep?.peserta?.tglLahir }}</div>
                <div>: {{ pasien?.nohp }}</div>
                <div>: {{ pasien?.ruangan }}</div>
                <div>: {{ pasien?.dokterdpjp }}</div>
                <div>: {{ pasien?.faskesawal }}</div>
                <div>: {{ sep?.diagnosa }}</div>
                <div>: {{ sep?.catatan }}</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-md full-width">
              <div class="col-auto">
                <div>Prolanis PRB</div>
                <div>Peserta</div>
                <div>COB</div>
                <div>Jns Rawat</div>
                <div>Jns Kunjungan</div>
                <div>Kls Hak</div>
                <div>Kls Rawat</div>
                <div>Penjamin</div>
              </div>
              <div class="col full-width">
                <div>: {{ '-' }}</div>
                <div>: {{ sep?.peserta?.jnsPeserta }}</div>
                <div>: {{ sep?.cob==='0'?'':'Iya' }}</div>
                <div>: {{ sep?.jnsPelayanan }}</div>
                <div>: {{ sep?.tujuanKunj?.nama }}</div>
                <div>: Kelas {{ sep?.klsRawat?.klsRawatHak }}</div>
                <div>: {{ sep?.kelasRawat }}</div>
                <div>: {{ sep?.penjamin }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-md row full-width justify-between">
          <div class="col-auto">
            <div class="f-10">
              <i>* Saya Menyetujui BPJS KEsehatan menggunakan Informasi Medis Pasien jika diperlukan</i>
            </div>
            <div class="f-10">
              <i>* SEP bukan sebagai bukti penjaminan peserta</i>
            </div>
            <div class="f-10">
              Cetakan dari RS
            </div>
          </div>
          <div class="col-3">
            <div style="width:100%; " class="relative-position">
              <div>Pasien / Keluarga Pasien</div>
              <div style="width: 100px;" class="q-mb-xs">
                <vue-qrcode
                  :value="qrUrl"
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
              </div>
              <div class="">
                {{ props.pasien?.nama_panggil }}
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
      <q-card-section class="q-pa-none bg-primary text-white">
        <div class="q-pa-md row justify-between items-center">
          <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogCetakSep=false" /></div>
          <div>
            <q-btn v-print="printObj" label="Print" color="yellow-3" text-color="dark" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history.js'
import { computed, ref } from 'vue'

const store = useListHistoryPendaftaranRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const sep = ref(null)

const qrUrl = computed(() => {
  const noka = props.pasien?.noka// noreg
  // const dok = 'GENERAL-CONSENT.png'
  // const asal = 'GENERAL-CONSENT'
  // const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `${noka}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const init = () => {
  console.log('init', props.pasien)
  store.cekSep(props.pasien?.sep)
    .then(resp => {
      console.log('res', resp)
      if (resp?.data?.metadata?.code === '200') {
        sep.value = resp.data?.result
      }
    })
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'CETAK SEP',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}
</script>

<style lang="scss" scoped>

</style>
