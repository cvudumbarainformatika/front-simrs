<template>
  <div class="q-pa-xs q-mb-xl bg-white">
    <div
      class="row bg-grey q-pa-xs"
    >
      <div class="f-16 text-weight-bold">
        Informasi pasien
      </div>
    </div>
    <div class="row no-wrap q-py-xs">
      <div class="col-6">
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            No Rm
          </div>
          <div class="col-9">
            {{ pasien.norm }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Nama
          </div>
          <div class="col-9">
            {{ pasien.nama }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Kelamin
          </div>
          <div class="col-9">
            {{ pasien.kelamin }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Alamat
          </div>
          <div class="col-9">
            {{ pasien.alamat }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Tgl Masuk
          </div>
          <div class="col-9">
            {{ dateFullFormat( pasien.tgl_kunjungan) }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            No Reg
          </div>
          <div class="col-9">
            {{ pasien.rs1 }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Tgl Lahir
          </div>
          <div class="col-9">
            {{ dateFullFormat( pasien.tgllahir) }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Ruang
          </div>
          <div class="col-9">
            {{ pasien.poli }}
          </div>
        </div>
        <div class="row no-wrap q-py-xs">
          <div class="col-3">
            Sistem Bayar
          </div>
          <div class="col-9">
            {{ pasien.sistembayar }}
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <div
      class="row bg-cyan q-pa-xs"
    >
      <div class="f-14 text-weight-bold">
        Billing
      </div>
    </div>
    <div class="row no-wrap q-pt-sm">
      <div class="col-3">
        <div class="row no-wrap bg-grey q-pa-xs items-center">
          <div class="q-mr-sm">
            <q-icon
              name="icon-mat-print"
              size="16px"
            />
          </div>
          <div class="f-12 text-weight-bold">
            Cetak
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="q-ml-xs row no-wrap bg-grey q-pa-xs q-pt-sm">
          <div class="f-12 text-weight-bold">
            Kwitansi
          </div>
        </div>
      </div>
    </div>
    <div class="row no-wrap q-pt-sm">
      <div class="col-3">
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Tindakan"
            color="primary"
            no-caps
            flat
            @click="cetakTindakan()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Tindakan
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Laboratorium"
            color="primary"
            no-caps
            flat
            @click="cetakLaboratorium()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Laboratorium
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Radiologi"
            color="primary"
            no-caps
            flat
            @click="cetakRadiologi()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Radiologi
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Farmasi"
            color="primary"
            no-caps
            flat
            @click="cetakFarmasi()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Farmasi
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Operasi (Tindakan Besar)"
            color="primary"
            no-caps
            flat
            @click="cetakOperasiBesar()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Operasi (Tindakan Besar)
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Operasi (Tindakan Kecil)"
            color="primary"
            no-caps
            flat
            @click="cetakOperasiKecil()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Operasi (Tindakan Kecil)
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row no-wrap q-ma-xs">
          <q-btn
            dense
            label="Sharing BPJS"
            color="primary"
            no-caps
            flat
            @click="cetakSharingBPJS()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Sharing BPJS
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div class="col-9">
        <!-- belum dibayar -->
        <div class="q-py-md">
          <!-- header -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white">
            <div class="col-3">
              <div class="row no-wrap">
                <div class="col-2">
                  No
                </div>
                <div class="col-10">
                  No Kwitansi
                </div>
              </div>
            </div>
            <div class="col-3">
              No VA
            </div>
            <div class="col-2">
              Tanggal Cetak
            </div>
            <div class="col-3">
              <div class="row no-wrap">
                <div class="col-6">
                  Total
                </div>
                <div class="col-6">
                  Total Batal
                </div>
              </div>
            </div>
            <div class="col-1">
              #
            </div>
          </div>
          <!-- child -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="">
              List
            </div>
          </div>
          <!-- Bottom -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="col-3">
            <!--  -->
            </div>
            <div class="col-3">
            <!--  -->
            </div>
            <div class="col-2 text-weight-bold">
              Total
            </div>
            <div class="col-3">
              <div class="row no-wrap">
                <div class="col-6">
                  Total
                </div>
                <div class="col-6">
                  Total Batal
                </div>
              </div>
            </div>
            <div class="col-1">
            <!-- # -->
            </div>
          </div>
        </div>
        <!-- Sudah dibayar -->
        <div class="q-py-md">
          <!-- header -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs bg-grey-10 q-pa-xs f-12 text-weight-bold text-white">
            <div class="col-3">
              <div class="row no-wrap">
                <div class="col-2">
                  No
                </div>
                <div class="col-10">
                  No Registrasi
                </div>
              </div>
            </div>
            <div class="col-3">
              Nota
            </div>
            <div class="col-2">
              Tanggal bayar
            </div>
            <div class="col-4">
              Total
            </div>
          </div>
          <!-- child -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="">
              List
            </div>
          </div>
          <!-- Bottom -->
          <div class="q-ml-xs row no-wrap q-col-gutter-xs">
            <div class="col-3">
            <!--  -->
            </div>
            <div class="col-3">
            <!--  -->
            </div>
            <div class="col-2 text-weight-bold">
              Total
            </div>
            <div class="col-4">
              Total
            </div>
          </div>
        </div>
        <!-- pembayaran -->
        <div class="q-py-sm">
          <div class="row no-wrap">
            <div class="q-mr-xs">
              pilih nota
            </div>
            <div class="q-mr-xs">
              pilih metode
            </div>
            <div class="q-mr-xs">
              buat kwitansi
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'

defineProps({
  pasien: { type: Object, default: () => {} }
})

function cetakTindakan() { console.log('cetak Tindakan') }
function cetakLaboratorium() { console.log('cetak Laboratorium') }
function cetakRadiologi() { console.log('cetak Radiologi') }
function cetakFarmasi() { console.log('cetak Farmasi') }
function cetakOperasiBesar() { console.log('cetak Operasi Tindakan Besar') }
function cetakOperasiKecil() { console.log('cetak Operasi Tindakan Kecil') }
function cetakSharingBPJS() { console.log('cetak Sharing BPJS') }
</script>
