<template>
  <q-dialog>
    <q-card
      style="width:80vw; max-width:95vw;"
    >
      <q-card-section>
        <div class="f-16 text-weight-bold q-mb-sm">
          Edit Penerimaan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- header -->
        <div class="row items-center q-col-gutter-sm">
          <div class="col-6">
            <div class="row q-mb-sm">
              <div class="col-3">
                Perusahaan
              </div>
              <div class="col-9 text-weight-bold">
                {{ store.item.perusahaan?store.item.perusahaan.nama:'-' }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Kontrak
              </div>
              <div class="col-9 text-weight-bold">
                {{ store.item.kontrak }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Nomor Pemesanan
              </div>
              <div class="col-9">
                <app-input
                  v-model="store.form.nomor"
                  label="Nomor Pemesanan"
                  outlined
                  debounce="1000"
                  @update:model-value="gantiNomorPesanan"
                />
                <!-- {{ store.form.nomor }} -->
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Nomor Penerimaan
              </div>
              <div class="col-9">
                <div v-if="!store.loadingNoPenerimaan">
                  {{ store.form.no_penerimaan }}
                </div>
                <div v-if="store.loadingNoPenerimaan">
                  <q-btn
                    flat
                    loading
                  />
                </div>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Pengirim
              </div>
              <div class="col-9">
                {{ store.form.pengirim }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-mb-sm">
              <div class="col-3">
                Tanggal Transaksi
              </div>
              <div class="col-9">
                {{ store.form.tanggal }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Surat Jalan
              </div>
              <div class="col-9">
                {{ store.form.surat_jalan }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Tanggal Surat Jalan
              </div>
              <div class="col-9">
                {{ store.form.tanggal_surat }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Faktur
              </div>
              <div class="col-9">
                {{ store.form.faktur }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-3">
                Tempo
              </div>
              <div class="col-9">
                {{ store.form.tempo }}
              </div>
            </div>
          </div>
        </div>
        <!-- details -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useEditPenerimaanStore } from 'src/stores/simrs/logistik/sigarang/history/edit/penerimaan'

/**
  edit pemesanan meliputi:
  * edit Faktur
  * pecah Faktur
  * edit nomor pemesananan
  * edit nomor BAST (berpengaruh pada tabel recent stok update)
  * edit jumlah penerimaan
  * hapus penerimaan (termasuk data di gudang jika masih belum di distribusikan)
  * hapus detail penerimaan (termasuk data di gudang jika masih belum di distribusikan)
 */
const store = useEditPenerimaanStore()
function gantiNomorPesanan(val) {
  // store.params.nomor = val
  console.log('nomor pemesanan', val)
  store.getJumlahNomorPenerimaan(val)
  console.log('form', store.form)
}
</script>
