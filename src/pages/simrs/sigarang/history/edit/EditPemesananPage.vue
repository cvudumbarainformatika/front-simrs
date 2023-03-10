<template>
  <q-dialog>
    <q-card
      style="width:80vw; max-width:95vw;"
    >
      <q-card-section>
        <div class="f-16 text-weight-bold q-mb-sm">
          Edit Pemesanan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row fit q-col-gutter-sm">
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                Nomor Kontrak
              </div>
              <div class="col-8">
                {{ store.form.kontrak }}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Nomor Pemesanan
              </div>
              <div class="col-8">
                {{ store.form.nomor }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                Tanggal
              </div>
              <div class="col-8">
                {{ store.form.tanggal }}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Perusahaan
              </div>
              <div class="col-8">
                {{ store.item.perusahaan?store.item.perusahaan.nama:'-' }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <app-btn label="Tambah Barang" />
        <div
          v-if="!store.item.details.length"
          style="height:300px"
        >
          <app-no-data />
        </div>
        <div v-if="store.item.details.length">
          <!-- header -->
          <div class="row text-weight-bold">
            <div class="col-1">
              Kode Barang
            </div>
            <div class="col-4">
              Nama barang
            </div>
            <div class="col-1">
              Jumlah
            </div>
            <div class="col-1">
              Satuan
            </div>
            <div class="col-4">
              Keterangan
            </div>
            <div class="col-1">
              Aksi
            </div>
          </div>
          <!-- data -->
          <div
            v-for="(detail,i) in store.item.details"
            :key="i"
          >
            <div class="row">
              <div class="col-1">
                {{ i+1 }}. {{ detail.barangrs?detail.barangrs.kode:'-' }}
              </div>
              <div class="col-4">
                {{ detail.barangrs?detail.barangrs.nama:'-' }}
              </div>
              <div class="col-1">
                {{ detail.qty }}
              </div>
              <div class="col-1">
                {{ detail.satuan?detail.satuan.nama:'-' }}
              </div>
              <div class="col-4">
                {{ detail.merk }}
              </div>
              <div class="col-1">
                <q-btn
                  color="primary"
                  round
                  icon="icon-mat-edit"
                  flat
                  size="sm"
                  @click="editRow(detail,i)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Edit
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="negative"
                  round
                  icon="icon-mat-delete_sweep"
                  flat
                  size="sm"
                  @click="hapus(detail,i)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Hapus
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'

const store = useEditPemesananStore()
function editRow(val, i) {}
function hapus(val, i) {}
</script>
