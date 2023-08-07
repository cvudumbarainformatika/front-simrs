<template>
  <q-page padding>
    <q-card :key="store.params.tgldari">
      <q-card-section>
        <div class="row garis-bawah">
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
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN RAWAT JALAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
        </div>
      </q-card-section>
      <q-card-section>
        <CustomTable
          id="printMe"
          :key="store.params.tgldari"
          :columns="store.columns"
          :meta="store.meta"
          :column-hide="store.columnHide"
          :items="store.items"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :ada-cari="false"
          :default-btn="false"
          :ada-tambah="false"
          :right-action="false"
          row-no
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <!-- header print -->
          <template #header-for-print>
            <div class="row garis-bawah">
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
            </div>
            <div class="row justify-center f-18 text-weight-bold q-my-sm">
              REKAP TAGIHAN PASIEN RAWAT JALAN
            </div>
            <div class="row justify-center f-14 text-weight-bold q-my-sm">
              periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
            </div>
            <!-- <div class="row ">
              <div>  REKAP DATA PASIEN DI RR TAHUN {{ date.formatDate(store.params.to,'YYYY') }}</div>
            </div> -->
          </template>
          <!-- tombol print -->
          <template #header-right-before>
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
          </template>
          <!-- set periode -->
          <template #header-left-after-search>
            <div class="row q-col-gutter-sm">
              <div>
                <app-input-date-human
                  :model="store.tanggal.from"
                  label="dari tanggal"
                  outlined
                  :loading="store.loading"
                  :disable="store.loading"
                  @db-model="setFrom"
                  @set-display="setFromDisp"
                />
              </div>
              <div>
                <app-input-date-human
                  :model="store.tanggal.to"
                  label="sampai tanggal"
                  outlined
                  :loading="store.loading"
                  :disable="store.loading"
                  @db-model="setTo"
                  @set-display="setToDisp"
                />
              </div>
              <div>
                <app-autocomplete
                  v-model="store.params.layanan"
                  label="Layanan"
                  option-label="nama"
                  option-value="value"
                  outlined
                  :loading="store.loading"
                  :disable="store.loading"
                  :source="store.layanans"
                />
              </div>
              <div>
                <app-btn
                  label="cari"
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="ambilData"
                />
              </div>
              <div v-if="store.items.length">
                <download-excel
                  class="btn"
                  :fetch="fetchData"
                  :fields="jsonFields"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                  :name="namaFile"
                >
                  <!-- :name="'Tagihan ' + store.params.layanan === '1' ? store.layanans[0].nama : store.params.layanan === '2' ? store.layanans[1].nama : store.layanans[2].nama + ' periode ' + store.tanggal.from + ' - '+ store.tanggal.to +'.xls'" -->
                  <app-btn
                    label="Download Excel"
                    icon="icon-mat-download"
                    push
                    :loading="loading"
                  />
                </download-excel>
              </div>
            </div>
          </template>
          <!-- pengganti header karena header di disable -->
          <!-- <template #top-row>
            <th>
              <div
                style="min-width:10px; max-width:80px white-space: normal !important;"
                class="row items-center text-weight-bold"
              >
                No
              </div>
            </th>
            <th>
              <div class="row items-center text-weight-bold">
                Tanggal
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Pasien
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Poli
              </div>
            </th>
            <th colspan="2">
              <div class="row justify-center text-weight-bold">
                Apotik
              </div>
              <div class="row justify-start text-weight-bold">
                <div class="col-6">
                  Racikan
                </div>
                <div class="col-6">
                  Non Racikan
                </div>
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Laborat
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Radiologi
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Sistem Bayar
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Sub Total
              </div>
            </th>
          </template> -->
          <!-- Row paling bawah -->
          <template #bottom-row>
            <td :colspan="store.params.layanan==='3' ? 8 : 7">
              <div class="text-weight-bold">
                Total periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
              </div>
            </td>
            <td colspan="2">
              <div
                v-if="store.items.length"
                class="text-weight-bold"
              >
                <div class=" row justify-between no-wrap">
                  <div class="q-mr-xs">
                    Klaim BPJS
                  </div>
                  <div class="text-weight-bold">
                    Rp. {{ formatDouble(store.items.map(it=>it.pendapatanBPJS).reduce((a,b)=>a+b,0)) }}
                  </div>
                </div>
                <div class=" row justify-between no-wrap">
                  <div class="q-mr-xs">
                    Tagihan
                  </div>
                  <div>
                    Rp. {{ formatDouble(store.items.map(it=>it.subtotal).reduce((a,b)=>a+b,0)) }}
                  </div>
                </div>
                <div class=" row justify-between no-wrap">
                  <div class="q-mr-xs">
                    Selisih
                  </div>
                  <div :class="store.items.map(it=>it.selisih).reduce((a,b)=>a+b,0)<=0?'text-negative':'text-green'">
                    Rp. {{ formatDouble(store.items.map(it=>it.selisih).reduce((a,b)=>a+b,0)) }}
                  </div>
                </div>
              </div>
              <div v-else>
                -
              </div>
            </td>
          </template>
          <template #col-pendapatan>
            Pendapatan BPJS
          </template>
          <template #col-tanggal>
            Tanggal
          </template>
          <template #col-pasien>
            Pasien
          </template>
          <template #col-ruangan>
            Ruangan
          </template>
          <template #col-poli>
            Poli
          </template>
          <template #col-ird>
            IRD
          </template>
          <template #col-apotik>
            Apotek
          </template>
          <template #col-biaya>
            Admin
          </template>
          <template #col-penunjang>
            Penunjang
          </template>
          <template #col-visite>
            Visite
          </template>
          <template #col-materai>
            Materai
          </template>
          <template #col-operasi>
            Operasi
          </template>
          <template #col-jenazah>
            Jenazah
          </template>
          <template #col-kamar>
            Kamar
          </template>
          <template #col-tindakan>
            Tindakan
          </template>
          <template #col-subtotal>
            Klaim dan Tagihan
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.rs3) }}
          </template>
          <template #cell-pasien="{row}">
            <div v-if="row.masterpasien">
              <div class="row no-wrap q-mb-xs text-weight-bold">
                {{ row.rs1 }}
              </div>
              <div class="row no-wrap q-mb-xs text-weight-bold text-primary">
                {{ row.masterpasien.length?row.masterpasien[0].rs1: row.masterpasien.rs1 }}
              </div>
              <div class="kecilin q-mb-xs text-weight-bold">
                {{ row.masterpasien.length?row.masterpasien[0].rs2: row.masterpasien.rs2 }}
              </div>
            </div>
            <div v-if="row.msistembayar">
              <div class="kecilin text-weight-bold text-green">
                {{ row.msistembayar.rs2 }}
              </div>
            </div>
            <div v-if="row.relsistembayar">
              <div class="kecilin text-weight-bold text-green">
                {{ row.relsistembayar.rs2 }}
              </div>
            </div>
          </template>
          <template #cell-poli="{row}">
            <div
              v-if="row.relmpoli"
              class="kecilin"
            >
              {{ row.relmpoli?row.relmpoli.rs2:'-' }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-ruangan="{row}">
            <div
              v-if="row.relmasterruangranap"
              class="kecilin"
            >
              {{ row.relmasterruangranap.rs2 }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-visite="{row}">
            <div
              v-if="row.visitDok>0"
            >
              <div>{{ formatDouble(row.visitDok) }}</div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-operasi="{row}">
            <div v-if="row.okIGD>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  ok IGD
                </div>
                <div>{{ formatDouble(row.okIGD) }}</div>
              </div>
            </div>
            <div v-if="row.tOperasi>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Tindakan
                </div>
                <div>{{ formatDouble(row.tOperasi) }}</div>
              </div>
            </div>
            <div v-if="row.kOperasi>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Kamar
                </div>
                <div>{{ formatDouble( row.kOperasi) }}</div>
              </div>
            </div>
            <div v-if="row.kamaroperasiIBS>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  kamar
                </div>
                <div>{{ formatDouble(row.kamaroperasiIBS) }}</div>
              </div>
            </div>
          </template>
          <template #cell-materai="{row}">
            <div
              v-if="row.mtri>0"
            >
              <div>{{ formatDouble(row.mtri) }}</div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-kamar="{row}">
            <div v-if="row.jRstigalimax>0">
              <div>{{ formatDouble(row.jRstigalimax) }}</div>
            </div>
          </template>
          <template #cell-jenazah="{row}">
            <div v-if="row.kmrJnzh>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  kmr Jenazah
                </div>
                <div>{{ formatDouble(row.kmrJnzh) }}</div>
              </div>
            </div>
            <div v-if="row.kmrJnzhI>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  kmr Jenazah inap
                </div>
                <div>{{ formatDouble(row.kmrJnzhI) }}</div>
              </div>
            </div>
          </template>
          <template #cell-ird="{row}">
            <div v-if="row.iramb>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Ambulan
                </div>
                <div>{{ formatDouble(row.iramb) }}</div>
              </div>
            </div>
            <!-- <div v-if="row.jRstigalimaxxx>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  kamar
                </div>
                <div>{{ formatDouble(row.jRstigalimaxxx) }}</div>
              </div>
            </div> -->

            <div v-if="row.tRanapOperasix>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  tindakan OP IBS IGD
                </div>
                <div>{{ formatDouble(row.tRanapOperasix) }}</div>
              </div>
            </div>
            <div v-if="row.kamaroperasiIBSx>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  kamar OP IBS IGD
                </div>
                <div>{{ formatDouble(row.kamaroperasiIBSx) }}</div>
              </div>
            </div>
            <div v-if="row.OpIgd>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Operasi IGD
                </div>
                <div>{{ formatDouble(row.OpIgd) }}</div>
              </div>
            </div>
            <div v-if="row.JIrdtindakan>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Tindakan IGD
                </div>
                <div>{{ formatDouble(row.JIrdtindakan) }}</div>
              </div>
            </div>
          </template>
          <template #cell-biaya="{row}">
            <div v-if="row.administrasiigd">
              <div class="row justify-between no-wrap">
                <div class="q-mr-xs">
                  Admin Igd
                </div>
                <div>{{ row.administrasiigd[0]?formatDouble(row.administrasiigd[0].rs7):'-' }}</div>
              </div>
            </div>
            <div v-if="row.admin>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Admin
                </div>
                <div>{{ formatDouble(row.admin) }}</div>
              </div>
            </div>
            <div v-if="row.bId>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Kartu identitas
                </div>
                <div>{{ formatDouble(row.bId) }}</div>
              </div>
            </div>
            <div v-if="row.bKonsul>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Konsul
                </div>
                <div>{{ formatDouble(row.bKonsul) }}</div>
              </div>
            </div>
            <div v-if="row.bPelPoli>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Poli spesialis/anastesi
                </div>
                <div>{{ formatDouble(row.bPelPoli) }}</div>
              </div>
            </div>
            <div v-if="row.bRM>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Rekam Medik
                </div>
                <div>{{ formatDouble(row.bRM) }}</div>
              </div>
            </div>
          </template>
          <template #cell-apotik="{row}">
            <div
              v-if="row.obat>0"
              class="row justify-between no-wrap"
            >
              <div>non-racikan</div>
              <div>{{ formatDouble(row.obat) }}</div>
            </div>
            <div
              v-if="row.obatRacik>0"
              class="row justify-between no-wrap"
            >
              <div>racikan</div>
              <div>{{ formatDouble(row.obatRacik) }}</div>
            </div>
            <div
              v-if="row.nonRacikRajal>0"
              class="row justify-between no-wrap"
            >
              <div>non-racikan</div>
              <div>{{ formatDouble(row.nonRacikRajal) }}</div>
            </div>
            <div
              v-if="row.racikrajal>0"
              class="row justify-between no-wrap"
            >
              <div>racikan</div>
              <div>{{ formatDouble(row.racikrajal) }}</div>
            </div>
          </template>
          <template #cell-tindakan="{row}">
            <div
              v-if="row.tDokPer>0"
              class="row justify-between no-wrap"
            >
              <div class="q-mr-xs">
                dokter / perawat
              </div>
              <div>{{ formatDouble(row.tDokPer) }}</div>
            </div>
            <div v-if="row.jTindakanperawat>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Perawat
                </div>
                <div>{{ formatDouble(row.jTindakanperawat) }}</div>
              </div>
            </div>
            <div v-if="row.jTindakandokter>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Dokter
                </div>
                <div>{{ formatDouble(row.jTindakandokter) }}</div>
              </div>
            </div>
          </template>
          <template #cell-penunjang="{row}">
            <div v-if="row.ambRJ>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Ambulan
                </div>
                <div>{{ formatDouble(row.ambRJ) }}</div>
              </div>
            </div>
            <div
              v-if="row.lab"
              class="row justify-between no-wrap"
            >
              <div class="q-mr-xs">
                Lab
              </div>
              <div>
                <div v-if="row.lab.length">
                  {{ formatDouble(row.lab.map(l=>l.subtotal).reduce((a,b)=>a+b,0)) }}
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </div>
            <div
              v-if="row.transRad"
              class="row justify-between no-wrap"
            >
              <div class="q-mr-xs">
                Trans Rodiologi
              </div>
              <div>
                <div>
                  {{ formatDouble(row.transRad) }}
                </div>
              </div>
            </div>
            <div v-if="row.bankDarah>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  BDRS
                </div>
                <div>{{ formatDouble(row.bankDarah) }}</div>
              </div>
            </div>
            <div v-if="row.tAnasLuar>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Anastesi di luar OK dan ICU
                </div>
                <div>{{ formatDouble(row.tAnasLuar) }}</div>
              </div>
            </div>
            <div v-if="row.tCardio>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Cardio
                </div>
                <div>{{ formatDouble(row.tCardio) }}</div>
              </div>
            </div>
            <div v-if="row.tEeg>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  EEG
                </div>
                <div>{{ formatDouble(row.tEeg) }}</div>
              </div>
            </div>
            <div v-if="row.tEndo>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Endoscopy
                </div>
                <div>{{ formatDouble(row.tEndo) }}</div>
              </div>
            </div>
            <div v-if="row.tFisio>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Fisioterapi
                </div>
                <div>{{ formatDouble(row.tFisio) }}</div>
              </div>
            </div>
            <div v-if="row.tHd>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Hemodialisa
                </div>
                <div>{{ formatDouble(row.tHd) }}</div>
              </div>
            </div>
            <div v-if="row.jPsikolog>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Psikologi
                </div>
                <div>{{ formatDouble(row.jPsikolog) }}</div>
              </div>
            </div>
            <div v-if="row.jPenunjangkeluar>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Penunjang keluar
                </div>
                <div>{{ formatDouble(row.jPenunjangkeluar) }}</div>
              </div>
            </div>
            <div v-if="row.jGizi>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Gizi
                </div>
                <div>{{ formatDouble(row.jGizi) }}</div>
              </div>
            </div>
            <div v-if="row.jKeperawatan>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Keperawatan
                </div>
                <div>{{ formatDouble(row.jKeperawatan) }}</div>
              </div>
            </div>
            <div v-if="row.jOksigen>0">
              <div
                class="row justify-between no-wrap"
              >
                <div class="q-mr-xs">
                  Oksigen
                </div>
                <div>{{ formatDouble(row.jOksigen) }}</div>
              </div>
            </div>
          </template>
          <template #cell-pendapatan="{row}">
            <div v-if="row.pendapatanallbpjs.length">
              <div class="text-right">
                {{ row.pendapatanallbpjs[0]?formatDouble(row.pendapatanallbpjs[0].subtotal):0 }}
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-subtotal="{row}">
            <div
              v-if="store.params.layanan!=='3'"
              class="row justify-between no-wrap"
            >
              <div class="q-mr-xs">
                Klaim BPJS
              </div>
              <div class="text-weight-bold text-primary">
                {{ formatDouble(row.pendapatanBPJS) }}
              </div>
            </div>
            <div
              v-if="store.params.layanan==='3'"
              class="row justify-between no-wrap"
            >
              <div class="q-mr-xs">
                Klaim BPJS
              </div>
              <div class="text-weight-bold text-primary">
                {{ formatDouble(row.groupingRanap) }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Tagihan
              </div>
              <div class="text-weight-bold text-orange">
                {{ formatDouble(row.subtotal) }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Selisih
              </div>
              <div
                class="text-weight-bold"
                :class="row.selisih<=0?'text-negative':'text-green'"
              >
                {{ formatDouble(row.selisih) }}
              </div>
            </div>
          </template>
        </CustomTable>
        <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useSimrsLaporanKeuanganNewBillRajalStore } from 'src/stores/simrs/laporan/keuangan/billrajal/new/billrajal'
import CustomTable from '../../../rekap/CustomTable.vue'
import { ref, computed } from 'vue'

const store = useSimrsLaporanKeuanganNewBillRajalStore()
const namaFile = computed(() => {
  return 'Tagihan ' + (store.params.layanan === '1' ? store.layanans[0].nama : store.params.layanan === '2' ? store.layanans[1].nama : store.layanans[2].nama) + ' periode ' + store.tanggal.from + ' - ' + store.tanggal.to + '.xls'
})
// data for print --start--
const loading = ref(false)
function startDownload() {
  loading.value = true
}
function finishDownload() {
  loading.value = false
}
const jsonFields = store.params.layanan !== '3' ? {
  No: 'no',
  Tanggal: 'tanggal',
  Pasien: 'pasien',
  Poli: 'poli',
  Admin: 'admin',
  Materai: 'mtri',
  'Kamar Jenazah': 'jnz',
  'Kamar Jenazah Inap': 'jnzi',
  'Sistem Bayar': 'bayar',
  'Pelayanan Rekam Medik': 'rekammedik',
  'Biaya Kartu Identitas Paseian': 'idPasien',
  'Poliklinik Spesialis / Anastesi': 'bPoli',
  'Konsultasi Antar Poli': 'bKonsul',
  Tindakan: 'tDokPer',
  'Visite / Konsultasi / Oncall Dokter': 'visitDok',
  Laboratorium: 'laborat',
  Radiologi: 'radiologi',
  'Operasi One Day Care': 'operasi', // kamar operasi + tindakan operasi
  Fisioterapi: 'fisio',
  Hemodialisa: 'hd',
  'Anastesi diluar Ok dan ICU': 'tAnasLuar',
  'Klinik Psikologi': 'psikologi',
  Cardio: 'cardio',
  EEG: 'eeg',
  Endoscope: 'endos',
  Apotek: 'apotek', // semua apotek di jumlah
  'Klaim BPJS': 'pendapatan',
  'Sub Total': 'subtotal',
  Selisih: 'selisih'
} : {
  No: 'no',
  Tanggal: 'tanggal',
  Pasien: 'pasien',
  Ruangan: 'ruangan',
  Admin: 'admin',
  Materai: 'mtri',
  'Kamar Jenazah': 'jnz',
  'Kamar Jenazah Inap': 'jnzi',
  'Sistem Bayar': 'bayar',
  'Pelayanan Rekam Medik': 'rekammedik',
  'Biaya Kartu Identitas Paseian': 'idPasien',
  'Poliklinik Spesialis / Anastesi': 'bPoli',
  'Konsultasi Antar Poli': 'bKonsul',
  'Tindakan IRD': 'tIrd',
  'Tindakan Perawat': 'tPerawat',
  'Tindakan Dokter': 'tDok',
  Gizi: 'gizi',
  Keperawatan: 'keperawatan',
  Oksigen: 'oksigen',
  'Visite / Konsultasi / Oncall Dokter': 'visitDok',
  Laboratorium: 'laborat',
  Radiologi: 'radiologi',
  Operasi: 'operasi', // kamar operasi + tindakan operasi
  Fisioterapi: 'fisio',
  Hemodialisa: 'hd',
  'Anastesi diluar Ok dan ICU': 'tAnasLuar',
  'Klinik Psikologi': 'psikologi',
  Cardio: 'cardio',
  EEG: 'eeg',
  Endoscope: 'endos',
  Apotek: 'apotek', // semua apotek di jumlah
  'Penunjang Keluar': 'penkel',
  'Klaim BPJS': 'pendapatan',
  'Sub Total': 'subtotal',
  Selisih: 'selisih'
}
function fetchData() {
  loading.value = true
  const data = []
  store.items.forEach((item, i) => {
    const temp = {}
    if (store.params.layanan === '3') {
      temp.no = i + 1
      temp.subtotal = item.subtotal
      temp.mtri = item.mtri
      temp.jnz = item.kmrJnzh
      temp.jnzi = item.kmrJnzhI
      temp.pendapatan = item.groupingRanap
      temp.selisih = item.selisih
      temp.admin = item.adminInap
      temp.tanggal = date.formatDate(item.rs3, 'DD MMMM YYYY')
      temp.bayar = item.relsistembayar ? item.relsistembayar.rs2 : '-'
      temp.pasien = item.relsistembayar ? item.rs1 + ', ' + item.relsistembayar.rs1 + ', ' + item.relsistembayar.rs2 : '-'
      temp.ruangan = item.relmasterruangranap ? item.relmasterruangranap.rs2 : '-'
      temp.rekammedik = item.bRM
      temp.keperawatan = item.jKeperawatan
      temp.gizi = item.jGizi
      temp.oksigen = item.jOksigen
      temp.tIrd = item.JIrdtindakan
      temp.penkel = item.jPenunjangkeluar
      temp.idPasien = item.bId
      temp.bPoli = item.bPelPoli
      temp.bKonsul = item.bKonsul
      temp.tPerawat = item.jTindakanperawat
      temp.tDok = item.jTindakandokter
      temp.visitDok = item.visitDok
      temp.laborat = item.jLaborat
      temp.radiologi = item.jRadiologi
      temp.operasi = item.jKamaroperasiIBS + item.OpIgd
      temp.fisio = item.tFisio
      temp.hd = item.tHd
      temp.tAnasLuar = item.tAnasLuar
      temp.psikologi = item.jPsikolog
      temp.cardio = item.tCardio
      temp.eeg = item.tEeg
      temp.endos = item.tEndo
      temp.apotek = item.obat + item.obatRacik + item.racikrajal + item.nonRacikRajal

      data.push(temp)
    } else {
      temp.no = i + 1
      temp.subtotal = item.subtotal
      temp.mtri = item.mtri
      temp.jnz = item.kmrJnzh
      temp.jnzi = item.kmrJnzhI
      temp.pendapatan = item.pendapatanBPJS
      temp.admin = item.adminIgd
      temp.selisih = item.selisih
      temp.tanggal = date.formatDate(item.rs3, 'DD MMMM YYYY')
      temp.bayar = item.msistembayar ? item.msistembayar.rs2 : '-'
      temp.pasien = item.masterpasien ? item.rs1 + ', ' + item.masterpasien[0].rs1 + ', ' + item.masterpasien[0].rs2 : '-'
      temp.poli = item.relmpoli ? item.relmpoli.rs2 : '-'
      temp.rekammedik = item.bRM
      temp.idPasien = item.bId
      temp.bPoli = item.bPelPoli
      temp.bKonsul = item.bKonsul
      temp.tDokPer = item.tDokPer
      temp.visitDok = item.visitDok
      temp.laborat = item.jLaborat
      temp.radiologi = item.jRadiologi
      temp.operasi = item.kOperasi + item.tOperasi
      temp.fisio = item.tFisio
      temp.hd = item.tHd
      temp.tAnasLuar = item.tAnasLuar
      temp.psikologi = item.jPsikolog
      temp.cardio = item.tCardio
      temp.eeg = item.tEeg
      temp.endos = item.tEndo
      temp.apotek = item.obat + item.obatRacik + item.racikrajal + item.nonRacikRajal

      data.push(temp)
    }

    // console.log('in', i, 'item', item)
  })
  loading.value = false
  return data
}
// data for print --end--

function ambilData() {
  store.getDataTable()
}

function setFrom(val) {
  store.params.tgldari = val
}
function setFromDisp(val) {
  store.tanggal.from = val
  // console.log('params ', store.params)
  // console.log('tanggal', store.tanggal)
}
function setTo(val) {
  store.params.tglsampai = val
}
function setToDisp(val) {
  store.tanggal.to = val
  // console.log('params ', store.params)
  // console.log('tanggal', store.tanggal)
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Rekap',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
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

store.getInitialData()
</script>
<style lang="scss" scoped>
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.anu{
  max-width: 150px;
  min-width: 50px;
}
.wrap_it{
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  white-space: normal !important;
  word-break: break-word;
}
.kecilin{
  min-width: 55px;
  max-width: 100px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}

</style>
