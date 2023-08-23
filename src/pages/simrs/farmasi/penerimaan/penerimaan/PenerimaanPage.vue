<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Penerimaan:
        </div>
        <app-input
          v-model="store.form.nopenerimaan"
          label="Nomor Penerimaan"
          :filled="false"
          readonly
          valid
          :loading="store.loading"
        />
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopenerimaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- penerimaan -->
  <div class="q-mt-lg q-py-md q-px-sm">
    <div class="row items-center q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="row q-col-gutter-md no-wrap">
          <div class="row">
            Penyedia :
          </div>
        </div>
        <div class="q-ml-xl q-pl-lg">
          <div v-if="store.namaPenyedia">
            <div class="row justify-between no-wrap items-center">
              <div>
                Nama
              </div>
              <div class=" text-deep-orange text-weight-bold">
                {{ store.namaPenyedia ? store.namaPenyedia.nama : '-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div>
                Alamat
              </div>
              <div class=" text-deep-orange text-weight-bold">
                {{ store.namaPenyedia ? store.namaPenyedia.alamat : '-' }}
              </div>
            </div>
          </div>
          <div v-else>
            -
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.nopemesanan"
              autocomplete="nopemesanan"
              option-label="nopemesanan"
              option-value="nopemesanan"
              label="Pilih Pemesanan"
              :filled="false"
              :source="store.pemesanans"
              @on-select="store.pemesananSelected"
              @clear="store.clearPemesanan"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.jenisSurat"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Surat"
              :filled="false"
              :source="store.jenisSurats"
              @on-select="store.jenisSuratSelected"
              @clear="store.clearJenisSurat"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input
              v-model="store.form.no_surat"
              label="Nomor Surat"
              valid
              :filled="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input
              v-model="store.form.pengirim"
              label="Nama Pengirim"
              :filled="false"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.gudang"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Gudang"
              :filled="false"
              :source="store.gudangs"
              @on-select="store.gudangSelected"
              @clear="store.clearGudang"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              :filled="false"
              @set-display="dispTanggal"
              @db-model="setTanggal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.surat"
              label="Tanggal Surat"
              :filled="false"
              @set-display="dispSurat"
              @db-model="setSurat"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tempo"
              label="Batas Akhir Pembayaran"
              :filled="false"
              @set-display="dispTempo"
              @db-model="setTempo"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input
              v-model="store.form.totalFaktur"
              label="Total Faktur PBF"
              :filled="false"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <div
      v-if="store.details.length && !store.loading"
      class="bg-grey-2"
    >
      <div
        class="row bg-grey q-pa-sm"
      >
        <div class="f-14 text-weight-bold">
          Rincian Pemesanan
        </div>
      </div>
      <div
        v-for="(det, i) in store.details"
        :key="i"
      >
        <div class="row items-center q-mt-md justify-between no-wrap">
          <div class="anu q-mr-sm">
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Nama
              </div>
              <div class="text-purple">
                {{ det.masterobat ? det.masterobat.nama_obat :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Pabrikan
              </div>
              <div class="text-deep-orange">
                {{ det.masterobat ? det.masterobat.merk :'-' }}
              </div>
            </div>
          </div>
          <div class="anu q-mr-sm">
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Dipesan
              </div>
              <div class="">
                {{ det.jumlahdpesan ? det.jumlahdpesan : '-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="col-12">
                <app-input
                  v-model="det.trmskr"
                  label="Diterima Sekarang"
                  :filled="false"
                />
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Diterima Sebelumnya
              </div>
              <div class="">
                Diterima Sebelumnya
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Seluruh Penerimaan
              </div>
              <div class="">
                Seluruh Penerimaan
              </div>
            </div>
          </div>
          <div class="anu q-mr-sm">
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Satuan Besar
              </div>
              <div class="">
                satuan
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="col-12">
                <app-input
                  v-model="det.isi"
                  label="Isi"
                  :filled="false"
                />
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Satuan Kecil
              </div>
              <div class="">
                satuan
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div class="col-12">
                <app-input
                  v-model="det.batch"
                  label="No Batch"
                  :filled="false"
                />
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="col-12">
                <app-input-date
                  :model="det.tglKadalwarsa"
                  label="Tanggal Kadalwarsa"
                  :filled="false"
                  @set-model="detKadal($event,det)"
                />
              </div>
            </div>
          </div>

          <div class="anu q-mr-sm">
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Harga
              </div>
              <div class="">
                Harga
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Diskon
              </div>
              <div class="">
                Diskon
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Ppn
              </div>
              <div class="">
                Ppn
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Harga Netto
              </div>
              <div class="">
                Harga Netto
              </div>
            </div>
            <div class="row justify-between no-wrap items-center">
              <div class="q-mr-sm">
                Sub Total
              </div>
              <div class="">
                Sub Total
              </div>
            </div>
          </div>
        </div>
        <q-separator />
      </div>
    </div>
    <div v-if="store.loading">
      <app-loading />
    </div>
    <div v-if="!store.details.length && !store.loading">
      <app-no-selected-page
        color="primary"
        icon="icon-mat-receipt_long"
        text="Tidak ada rinci"
      />
    </div>
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'

const style = useStyledStore()
const store = usePenerimaanFarmasiStore()

function detKadal(evt, val) {
  console.log('evt', evt)
  console.log('val', val)
}
function setTanggal(val) {
  store.setForm('tanggal', val)
}
function dispTanggal(val) {
  store.setDisp('tanggal', val)
}

function setSurat(val) {
  store.setForm('surat', val)
}
function dispSurat(val) {
  store.setDisp('surat', val)
}

function setTempo(val) {
  store.setForm('tempo', val)
}
function dispTempo(val) {
  store.setDisp('tempo', val)
}

store.getInitialData()
</script>
