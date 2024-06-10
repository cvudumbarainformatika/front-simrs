<template>
  <q-dialog maximized>
    <!-- <div class="bg-white "> -->
    <!-- {{ data }} -->
    <!-- </div> -->
    <q-card style="width:75vw; max-width:90vw;">
      <div class="print">
        <q-btn
          ref="refPrint"
          v-print="printObj"
          unelevated
          color="dark"
          round
          size="sm"
          icon="icon-mat-print"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          round
          size="sm"
          icon="icon-my-print_setting"
          @click="tandatangan.setOpen"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Pilih tanda tangan
          </q-tooltip>
        </q-btn>
      </div>
      <div
        id="printMe"
        style="width:210mm; height:310mm; margin:10mm; "
      >
        <!-- heder -->
        <q-card-section>
          <app-kop-surat />
          <!-- <div class="row garis-bawah">
            <div class="col-2">
              <q-img
                src="~assets/images/logo-kota-grey.png"
                spinner-color="white"
                style="height: 3.56cm; max-width: 2.86cm"
              />
            </div>
            <div class="col-10">
              <div class="row justify-center f-18">
                PEMERINTAH KOTA PROBOLINGGO
              </div>
              <div class="row justify-center f-14 text-weight-bold">
                DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
              </div>
              <div class="row justify-center f-28 text-weight-bold">
                UOBK RSUD DOKTER MOHAMAD SALEH
              </div>
              <div class="row justify-center f-14">
                Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
              </div>
              <div class="row justify-center f-14">
                E-mail : rsudprob@probolinggokota.go.id
              </div>
              <div class="row justify-center f-14 text-weight-bold">
                PROBOLINGGO  67219
              </div>
            </div>
          </div> -->
          <!-- Top words -->
          <div
            v-if="item?.flag==='1'"
            class="row justify-center q-mt-md f-16 text-weight-bold"
          >
            DATA PERMINTAAN
          </div>
          <div
            v-if="item?.flag==='4'"
            class="row justify-center q-mt-md f-16 text-weight-bold"
          >
            DATA PENERIMAAN
          </div>

          <div
            v-if="item?.flag==='1'"
            class="row justify-center q-mb-sm"
          >
            <div class="col-2">
              Tanggal Permintaan
            </div>
            <div class="col-1">
              :
            </div>
            <div class="col-9">
              {{ dateFullFormat(item?.tgl_kirim) }}
            </div>
          </div>
          <div
            v-if="item?.flag==='4'"
            class="row justify-center q-mb-sm"
          >
            <div class="col-2">
              Tanggal Penerimaan
            </div>
            <div class="col-1">
              :
            </div>
            <div class="col-9">
              {{ dateFullFormat(item?.tgl_terima_depo) }}
            </div>
          </div>
          <div class="row justify-center q-mb-sm">
            <div class="col-2">
              No. Permintaan
            </div>
            <div class="col-1">
              :
            </div>
            <div class="col-9">
              {{ item.no_permintaan }}
            </div>
          </div>
          <div
            v-if="item?.flag==='1'"
            class="row justify-start q-mb-md"
          >
            <p>
              Telah dikirimkan ke
              <span class="text-weight-bold">
                {{ item.menuju?item.menuju.nama:'-' }}
              </span> permintaan barang dalam list dibawah ini :
            </p>
          </div>
          <div
            v-if="item?.flag==='4'"
            class="row justify-start q-mb-md"
          >
            <p>
              Telah diterima dari
              <span class="text-weight-bold">
                {{ item.menuju?item.menuju.nama:'-' }}
              </span> barang dalam list dibawah ini :
            </p>
          </div>

          <!-- no details -->
          <div v-if="!item.permintaanrinci">
            <app-no-data />
          </div>
          <!-- details -->
          <div v-if="item.permintaanrinci">
            <!-- header detail -->
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-5 text-weight-bold border-tb border-left">
                Nama Barang
              </div>
              <div class="col-1 text-weight-bold border-tb border-left">
                Jumlah
              </div>
              <div class="col-2 text-weight-bold border-tb border-left">
                Satuan
              </div>
              <div class="col-4 text-weight-bold border-box">
                Keterangan
              </div>
            </div>
            <!-- body details -->
            <div
              v-for="(det, i) in item.permintaanrinci"
              :key="i"
            >
              <div
                class="row justify-between q-col-gutter-sm"
              >
                <div class="col-5 border-bottom border-left">
                  {{ i+1 }}. {{ det.masterobat?det.masterobat.nama_obat:'Nama barang tidak ditemukan' }}
                </div>
                <div
                  v-if="item?.flag==='1'"
                  class="col-1 border-bottom border-left"
                >
                  {{ det.jumlah_minta===null?0:det.jumlah_minta }}
                </div>
                <div
                  v-if="item?.flag==='4'"
                  class="col-1 border-bottom border-left"
                >
                  {{ det.distribusi===null?0:det.distribusi }}
                </div>
                <div
                  class="col-2 border-bottom border-left"
                >
                  {{ det.masterobat?det.masterobat.satuan_k:'-' }}
                </div>
                <div class="col-4 border-bottom border-left border-right">
                  <div class="print-only">
                    {{ det?.keterangan??'-' }}
                  </div>
                  <div class="print-hide">
                    <app-input
                      v-model="det.keterangan"
                      label="keterangan"
                      outlined
                      valid
                    />
                  </div>
                </div>
              </div>
              <q-separator />
            </div>
          </div>
        </q-card-section>
        <!-- tanda tangan -->
        <q-card-section>
          <div class="row justify-between q-col-gutter-sm ">
            <div class="col-6 text-center" />
            <div class="col-6 text-center">
              Probolinggo, {{ dateFullFormat(item?.tanggal) }}
            </div>
          </div>
          <!-- options -->
          <div class="row justify-between q-col-gutter-sm print-hide">
            <div class="col-6 text-center">
              <app-autocomplete-new
                v-model="tandatangan.tt.kiri"
                label="pilih yang berdanda tangan"
                autocomplete="nama"
                option-label="nama"
                option-value="value"
                outlined
                valid
                :source="tandatangan?.optionTT"
                @on-select="tandatangan?.kiriSelected"
              />
            </div>
            <div class="col-6 text-center">
              <app-autocomplete-new
                v-model="tandatangan.tt.kanan"
                label="pilih yang berdanda tangan"
                autocomplete="nama"
                option-label="nama"
                option-value="value"
                outlined
                valid
                :source="tandatangan?.optionTT"
                @on-select="tandatangan?.kananSelected"
              />
            </div>
          </div>
          <!-- Input -->
          <div class="row justify-between q-col-gutter-sm print-hide">
            <div class="col-6 text-center">
              <app-input
                v-model="tandatangan.kiri"
                outlined
                valid
                label="Text kiri"
              />
            </div>
            <div class="col-6 text-center">
              <app-input
                v-model="tandatangan.kanan"
                outlined
                valid
                label="Text kanan"
              />
            </div>
          </div>
          <div class="row justify-between q-col-gutter-sm">
            <div class="col-6 text-center">
              {{ tandatangan?.kiri }}
            </div>
            <div class="col-6 text-center">
              {{ tandatangan?.kanan }}
            </div>
          </div>
          <div class="row justify-between q-col-gutter-sm q-mb-xl">
            <div class="col-6 text-center">
              {{ tandatangan?.onKiri?.acr }}
            </div>
            <div class="col-6 text-center">
              {{ tandatangan?.onKanan?.acr }}
            </div>
          </div>
          <div class="row justify-between q-col-gutter-sm">
            <div class="col-6 text-center">
              <div v-if="!tandatangan?.onKiri?.ada">
                <div v-if="tandatangan?.tt?.kiri!==null">
                  <div class="print-hide">
                    <app-input
                      v-model="freeTextKiri"
                      label="Nama"
                      :filled="false"
                    />
                  </div>
                  <div class="print-only">
                    {{ freeTextKiri===''?'(.......................................)':freeTextKiri }}
                  </div>
                </div>
              </div>
              <div v-if="tandatangan?.onKiri?.ada">
                <div class="row justify-center">
                  {{ tandatangan?.onKiri?.nama }}
                </div>
                <div class="row justify-center">
                  {{ tandatangan?.onKiri?.nip }}
                </div>
              </div>
            </div>
            <div class="col-6 text-center">
              <div v-if="!tandatangan?.onKanan?.ada">
                <div v-if="tandatangan?.tt?.kanan!==null">
                  <div class="print-hide">
                    <app-input
                      v-model="freeTextKanan"
                      label="Nama"
                      :filled="false"
                    />
                  </div>
                  <div class="print-only">
                    {{ freeTextKanan===''?'(.......................................)':freeTextKanan }}
                  </div>
                </div>
              </div>
              <div v-if="tandatangan.onKanan.ada">
                <div class="row justify-center">
                  {{ tandatangan.onKanan.nama }}
                </div>
                <div class="row justify-center">
                  {{ tandatangan.onKanan.nip }}
                </div>
              </div>
            </div>
          </div>
          <!-- option -->
          <div class="row justify-center q-col-gutter-sm print-hide">
            <div>
              <app-autocomplete-new
                v-model="tandatangan.tt.tengah"
                label="pilih yang berdanda tangan"
                autocomplete="nama"
                option-label="nama"
                option-value="value"
                outlined
                valid
                :source="tandatangan.optionTT"
                @on-select="tandatangan.tengahSelected"
              />
            </div>
          </div>
          <!-- input -->
          <div class="row justify-center q-col-gutter-sm print-hide">
            <div>
              <app-input
                v-model="tandatangan.tengah"
                outlined
                valid
                label="Text Tengah"
              />
            </div>
          </div>
          <div class="row justify-center q-col-gutter-sm">
            <div>{{ tandatangan.tengah }}</div>
          </div>
          <div class="row justify-center q-col-gutter-sm q-mb-xl">
            <div>{{ tandatangan.onTengah.acr }}</div>
          </div>
          <div v-if="!tandatangan.onTengah.ada">
            <div
              v-if="tandatangan.tt.tengah!==null"
              class="row justify-center"
            >
              <div class="print-hide">
                <app-input
                  v-model="freeTextBawah"
                  label="Nama"
                  :filled="false"
                />
              </div>
              <div class="print-only">
                {{ freeTextBawah===''?'(.......................................)':freeTextBawah }}
              </div>
            </div>
          </div>
          <div v-if="tandatangan.onTengah.ada">
            <div class="row justify-center">
              {{ tandatangan.onTengah.nama }}
            </div>
            <div class="row justify-center">
              {{ tandatangan.onTengah.nip }}
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { ref } from 'vue'
import { dateFullFormat } from 'src/modules/formatter'
defineProps({
  item: { type: Object, default: () => {} }
})
const emits = defineEmits(['close'])

const tandatangan = useTandaTanganStore()

const freeTextKiri = ref('')
const freeTextKanan = ref('')
const freeTextBawah = ref('')

const printObj = {
  id: 'printMe'
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}

function printPage () {
  console.log('print ')
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 100)
}
function afterPrint () {
  window.close()
  emits('close')
}

defineExpose({ printPage })
</script>
<style lang="scss" scoped>
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>
