<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 80vw;">
      <q-bar class="bg-primary text-white">
        <div>Cetak Permintaan Darah</div>

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
                src="~assets/images/logo-kota-grey.png"
                width="50"
              >
              <div class="absolute-top full-width" style="left:0%">
                <div class="column full-width flex-center">
                  <div class="f-14 text-weight-bold">
                    NOTA PERMINTAAN DARAH
                  </div>
                  <div class="f-14 text-weight-bold">
                    RUANGAN RAWAT INAP
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
                <div>NO. NOTA</div>
                <div>Tgl. Permintaan</div>
                <div>NOREG</div>
                <div>NORM</div>
                <div>Nama Peserta</div>
                <div>Dokter yg Meminta</div>
                <div>Ruangan</div>
              </div>
              <div class="col full-width">
                <div>: {{ item?.rs2 }}</div>
                <div>: {{ item?.rs3 }}</div>
                <div>: {{ item?.rs1 }}</div>
                <div>: {{ pasien?.norm }}</div>
                <div>: {{ pasien?.nama }}</div>
                <div>: {{ dokters?.find(x => x?.kdpegsimrs === item?.rs10)?.nama }}</div>
                <div>: {{ pasien?.ruangan }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="col-6">
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
          </div> -->
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-md row full-width justify-between">
          <div class="col-auto">
            <div><b>jenis :</b> <em>{{ item?.rs4 }}</em></div>
            <div><b>Golongan :</b> <em>{{ item?.rs5 ?? '-' }} {{ item?.rs15 }}</em></div>
            <div><b>u/p :</b> <em>{{ item?.rs7 }}</em></div>
            <div><em>Qty :</em> <b>{{ item?.rs6 }}</b> <em>Transfusi Ke -</em> <b>{{ item?.rs13 }}</b></div>
            <div><em>Keterangan :</em> <b>{{ item?.ket ?? '-' }}</b> </div>
          </div>
          <div class="col-3">
            <div style="width:100%; " class="relative-position">
              <div>Petugas / Perawat</div>
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
                {{ perawats?.find(x => x?.kdpegsimrs === item?.rs17)?.nama }}
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
      <q-card-section class="q-pa-none bg-primary text-white">
        <div class="q-pa-md row justify-between items-center">
          <div><q-btn label="Tutup" color="dark" text-color="white" v-close-popup /></div>
          <div>
            <q-btn v-print="printObj" label="Print" color="yellow-3" text-color="dark" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  item: {
    type: Object,
    default: null
  },
  dokters: {
    type: Array,
    default: () => []
  },
  perawats: {
    type: Array,
    default: () => []
  }
})

const qrUrl = computed(() => {
  const noka = props.pasien?.nota// noreg
  // const dok = 'GENERAL-CONSENT.png'
  // const asal = 'GENERAL-CONSENT'
  // const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `${noka}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'CETAK PERMINTAAN DARAH',
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
