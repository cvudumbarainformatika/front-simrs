<template>
  <q-page class="q-pa-sm">
    <div :key="table.items">
      <app-card :is-header="false">
        <template #content>
          <app-table-view
            :key="table.items"
            :title="`Data ${table.nama}`"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            :ada-cari="false"
            ada-detail
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @delete="table.deletesData"
            @detail="table.setDetails"
          >
            <template #cell-total="{row}">
              {{ formatRp(row.total) }}
            </template>
            <template #cell-nomor="{row}">
              <!-- <div
                style="width:10vw;"
                class="cursor-pointer"
                @click="table.setDetails(row)"
              > -->
              <div
                class="box cursor-pointer"
                @click="table.setDetails(row)"
              >
                <div class="">
                  <p>
                    {{ row.nomor }}
                  </p>
                </div>
                <!-- <div class="ellipsis">
                  {{ row.nomor }}
                </div> -->
                <!-- <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.nomor }}
                </q-tooltip> -->
              </div>
            </template>
            <template #cell-kontrak="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.kontrak }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.kontrak }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-no_penerimaan="{row}">
              <div style="width:10vw;">
                <div class="ellipsis box">
                  {{ row.no_penerimaan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.no_penerimaan }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-faktur="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.faktur }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.faktur }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-surat_jalan="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.surat_jalan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.surat_jalan }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-pengirim="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.pengirim }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.pengirim }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-perusahaan="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.perusahaan?row.perusahaan.nama:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.perusahaan?row.perusahaan.nama:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-tanggal="{row}">
              <div
                class="row"
                style="width:max-content;"
              >
                {{ dateFullFormat(row.tanggal) }}
              </div>
            </template>
            <template #cell-tanggal_verif="{row}">
              <div class="row">
                {{ dateFull(row.tanggal_verif) }}
              </div>
            </template>
            <template #cell-tanggal_distribusi="{row}">
              <div class="row">
                {{ dateFull(row.tanggal_distribusi) }}
              </div>
            </template>
            <template #cell-tanggal_surat="{row}">
              <div
                class="row"
                style="width:max-content;"
              >
                {{ dateFullFormat(row.tanggal_surat) }}
              </div>
            </template>
            <template #cell-tanggal_faktur="{row}">
              <div
                class="row"
                style="width:max-content;"
              >
                {{ dateFullFormat(row.tanggal_faktur) }}
              </div>
            </template>
            <template #cell-asal="{row}">
              {{ row.asal?row.asal.nama:'-' }}
            </template>
            <template #cell-dibuat="{row}">
              {{ row.dibuat?row.dibuat.nama:'-' }}
            </template>
            <template #cell-tujuan="{row}">
              {{ row.tujuan?row.tujuan.nama:'-' }}
            </template>
            <template #cell-pengguna="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.pengguna?row.pengguna.jabatan:row.ruangpengguna?row.ruangpengguna.pengguna.jabatan:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.pengguna?row.pengguna.jabatan:row.ruangpengguna?row.ruangpengguna.pengguna.jabatan:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-pj="{row}">
              {{ row.pj?row.pj.jabatan:row.ruangpengguna?row.ruangpengguna.pj.jabatan:'-' }}
            </template>
            <template #cell-ruang="{row}">
              {{ row.ruang?row.ruang.uraian:row.penggunaruang?row.penggunaruang.ruang.uraian:'-' }}
            </template>
            <template #cell-ruangan="{row}">
              <!-- <q-chip
                v-if="row.ruangan"
                class="f-12"
                color="primary"
                text-color="white"
                :label="row.ruangan.uraian"
              /> -->
              <q-badge
                v-if="row.ruangan"
                color="primary"
                text-color="white"
                :label="row.ruangan.uraian"
              />
              <div
                v-if="!row.ruangan"
                class="text-center"
              >
                -
              </div>
            </template>
            <template #cell-depo="{row}">
              {{ row.depo?row.depo.nama:'-' }}
            </template>
            <template #cell-status="{row}">
              <!-- {{row.status}} -->
              <q-chip
                class="f-12"
                :color="color(row.status)"
                text-color="white"
                :label="label(row.status,row.nama)"
              />
            </template>
            <template #col-total>
              Total
            </template>
            <template #col-dibuat>
              PTK
            </template>
            <template #col-ruangan>
              Ruangan
            </template>
            <template #col-ruang>
              Ruangan
            </template>
            <template #col-depo>
              Depo
            </template>
            <template #col-no_distribusi>
              Nomor Distribusi
            </template>
            <template #col-perusahaan>
              Perusahaan
            </template>
            <template #col-tanggal>
              Tanggal
            </template>
            <template #col-tanggal_surat>
              Tanggal Surat Jalan
            </template>
            <template #col-tanggal_faktur>
              Tanggal Faktur
            </template>
            <template #col-kontrak>
              Nomor Kontrak
            </template>
            <template #col-nomor>
              Nomor Pemesanan
            </template>
            <template #col-faktur>
              Faktur
            </template>
            <template #col-surat_jalan>
              Surat Jalan
            </template>
            <template #col-status_pembelian>
              Status Pembelian
            </template>
            <template #col-no_penerimaan>
              Nomor Penerimaan
            </template>
            <template #col-pengirim>
              Pengirim
            </template>
            <template #col-tempo>
              Tempo
            </template>
            <template #col-asal>
              Asal Gudang
            </template>
            <template #col-tujuan>
              Gudang Tujuan
            </template>
            <template #col-status>
              Status
            </template>
            <template #col-pengguna>
              Pengguna
            </template>
            <template #col-pj>
              Penanggungjawab
            </template>
            <template #col-tanggal_verif>
              Tanggal Verifikasi
            </template>
            <template #col-tanggal_distribusi>
              Tanggal Distribusi
            </template>
            <template #col-no_permintaan>
              Nomor Permintaan
            </template>
            <template #left-action="{row,index}">
              <q-btn
                v-if="(role==='root' || role==='PTK' || role==='gizi' || role==='gudang' || role==='depo')
                  && (row.nama === 'PEMESANAN' || row.nama === 'PENERIMAAN' || row.nama==='DISTRIBUSI DEPO' || row.nama==='PERMINTAAN RUANGAN')"
                unelevated
                color="dark"
                round
                size="sm"
                icon="icon-mat-print"
                @click="toPrint(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.status===1 && (role==='PTK' || role==='root'|| role==='gizi' || role==='ruangan')
                  && (row.nama === 'PEMESANAN' || row.nama === 'PERMINTAAN RUANGAN'||row.nama === 'PENERIMAAN'||row.nama === 'PEMAKAIAN RUANGAN'||row.nama === 'DISTRIBUSI DEPO')"
                color="primary"
                round
                icon="icon-mat-exit_to_app"
                flat
                size="sm"
                @click="goTo(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Buka link
                </q-tooltip>
              </q-btn>
              <!-- || role==='PTK' || role==='gizi' -->
              <q-btn
                v-if="(role==='root' || role==='PTK' || role==='gizi')
                  && (row.nama === 'PEMESANAN' && (row.status>=2 && row.status<=4))"
                color="primary"
                round
                icon="icon-mat-edit"
                flat
                size="sm"
                :loading="loadingEdit(index)"
                @click="editRow(row,index)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Edit
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="(role==='root' || role==='gudang' || role==='gizi')
                  && (row.nama === 'PENERIMAAN' && row.status>=2 )"
                color="primary"
                round
                icon="icon-mat-edit"
                flat
                size="sm"
                :loading="loadingEdit(index)"
                @click="editRowTerima(row,index)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Edit
                </q-tooltip>
              </q-btn>
              <!--  -->
              <q-btn
                v-if="row.status===1 && (role==='root'||role==='PTK' || role==='gizi'|| role==='ruangan')"
                color="negative"
                round
                icon="icon-mat-delete_sweep"
                flat
                size="sm"
                @click="hapus(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Hapus Draft
                </q-tooltip>
              </q-btn>
              <!-- ||role==='PTK' || role==='gizi' -->
              <q-btn
                v-if="row.status===2 && ( role==='root')"
                color="negative"
                round
                icon="icon-mat-delete_sweep"
                flat
                size="sm"
                @click="hapus(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Hapus
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.loading"
                round
                flat
                size="sm"
                :loading="row.loading"
              />
              <q-btn
                v-if="row.status===5 && (role==='gudang' || role==='root'|| role==='gizi') && !row.loading"
                color="negative"
                round
                icon="icon-mat-undo"
                flat
                size="sm"
                @click="backToVerif(row,index)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Kembali ke menunggu verivikasi
                </q-tooltip>
              </q-btn>
            </template>
            <template #header-left-after-search>
              <div>
                <q-input
                  v-if="table.params.nama === 'Pemesanan'
                    || table.params.nama === 'Penerimaan'
                    || table.params.nama === 'Gudang'
                    || table.params.nama === 'Penerimaan Ruangan'
                    ||table.params.nama === 'Distribusi Ruangan'"
                  v-model="table.params.q"
                  class="search-big"
                  borderless
                  debounce="500"
                  clearable
                  dense
                  :placeholder="reqQ(table.params.nama)"
                  clear-icon="icon-mat-close"
                  @update:model-value="table.setSearch"
                >
                  <template #prepend>
                    <q-icon
                      name="icon-mat-search"
                      size="20px"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-input
                  v-if="table.params.nama === 'Pemesanan' || table.params.nama === 'Penerimaan'"
                  v-model="table.params.kontrak"
                  class="search-big"
                  borderless
                  debounce="500"
                  clearable
                  dense
                  placeholder="Nomor Kontrak"
                  clear-icon="icon-mat-close"
                  @update:model-value="table.setKontrak"
                >
                  <template #prepend>
                    <q-icon
                      name="icon-mat-search"
                      size="20px"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-input
                  v-if=" table.params.nama === 'Permintaan Ruangan'"
                  v-model="table.params.ruang"
                  class="search-big"
                  borderless
                  debounce="500"
                  clearable
                  dense
                  placeholder="Cari ruangan"
                  clear-icon="icon-mat-close"
                  @update:model-value="table.setRuang"
                >
                  <template #prepend>
                    <q-icon
                      name="icon-mat-search"
                      size="20px"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                Periode :
                <q-badge>
                  {{ table.params.from ? dateFullFormat(table.params.from) : '-' }}
                </q-badge>
                sampai
                <q-badge>
                  {{ table.params.to ? dateFullFormat(table.params.to) : '-' }}
                </q-badge>
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="table.tanggal"
                    range
                    mask="YYYY-MM-DD"
                    @update:model-value="table.searchTanggal"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="primary"
                        flat
                        @click="table.searchTanggal"
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  pilih range tanggal
                </q-tooltip>
              </div>
            </template>
          </app-table-view>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <q-dialog v-model="openPrint">
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
            <!-- pemesanan start -->
            <div v-if="item.nama === 'PEMESANAN'">
              <!-- Top words -->
              <div class="row justify-center q-mt-md f-16 text-weight-bold">
                SURAT PESANAN
              </div>
              <div class="row justify-center q-mb-sm">
                NO. {{ item.nomor }}
              </div>
              <div class="row justify-start">
                Kepada : Yth. Pemilik {{ item.perusahaan?item.perusahaan.nama:'-' }}
              </div>
              <div class="row justify-start">
                <div class="col-1" />
                <div class="col-1">
                  di
                </div>
              </div>
              <div class="row justify-start">
                <div class="col-1" />
                <div class="col-4">
                  {{ item.perusahaan?item.perusahaan.alamat:'-' }}
                </div>
              </div>
              <div class="row justify-start q-mt-md q-mb-md">
                Mohon dikirim pesanan dengan spesifikasi,
              </div>
              <div v-if="!item.details">
                <app-no-data />
              </div>
              <!-- details -->
              <div v-if="item.details">
                <!-- header detail -->
                <div class="row justify-between q-col-gutter-sm">
                  <div class="col-7 text-weight-bold border-tb border-left">
                    No. Nama Barang
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Jumlah
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Satuan
                  </div>
                  <div class="col-3 text-weight-bold border-box">
                    Keterangan
                  </div>
                </div>
                <!-- body details -->
                <div
                  v-for="(det, i) in item.details"
                  :key="i"
                >
                  <div
                    class="row justify-between q-col-gutter-sm"
                  >
                    <div class="col-7 border-bottom border-left">
                      {{ i+1 }}. {{ det.barangrs?det.barangrs.nama:'Nama barang tidak ditemukan' }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.qty===null?0:det.qty }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.satuan?det.satuan.nama:'-' }}
                    </div>
                    <div class="col-3 border-bottom border-left border-right">
                      {{ det.merk?det.merk:'-' }}
                    </div>
                  </div>
                  <q-separator />
                </div>
              </div>
              <!-- Bottom words -->
              <div class="row justify-start q-mt-md q-mb-sm">
                Pesanan tersebut di atas dapat tersedia pada,
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg items-center">
                <div class="col-1">
                  Hari
                </div>
                <div class="col-11">
                  <app-input
                    v-model="table.dispPrint.hari"
                    label="hari"
                    class="print-hide"
                    outlined
                  />
                  <div class="print-only">
                    : {{ table.dispPrint.hari }}
                  </div>
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Tanggal
                </div>
                <div class="col-11">
                  <app-input-date-human
                    v-model="table.dispPrint.tanggal"
                    label="tanggal"
                    class="print-hide"
                    outlined
                    @set-model="setTanggal"
                    @set-display="setTanggalDisp"
                  />
                  <div class="print-only">
                    : {{ table.dispPrint.tanggalDisp }}
                  </div>
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Waktu
                </div>
                <div class="col-11">
                  <app-input
                    v-model="table.dispPrint.waktu"
                    label="waktu"
                    class="print-hide"
                    outlined
                  />
                  <div class="print-only">
                    : {{ table.dispPrint.waktu }}
                  </div>
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Tempat
                </div>
                <div class="col-11">
                  <app-input
                    v-model="table.dispPrint.tempat"
                    label="tempat"
                    class="print-hide"
                    outlined
                  />
                  <div class="print-only">
                    : {{ table.dispPrint.tempat }}
                  </div>
                </div>
              </div>
              <div class="row justify-start q-mt-md q-mb-sm">
                Atas perhatiannya disampaikan terima kasih.
              </div>
            </div>
            <!-- pemesanan end -->
            <!-- penerimaan start -->
            <!-- {{ item.nama }} -->
            <div v-if="item.nama === 'PENERIMAAN'">
              <!-- Top words -->
              <div class="row justify-center q-mt-md f-16 text-weight-bold">
                BERITA ACARA SERAH TERIMA (BAST)
              </div>
              <div class="row justify-center q-mb-sm">
                NO. {{ item.no_penerimaan }}
              </div>

              <div class="q-mb-md">
                Pada hari ini <span class="text-weight-bold text-italic">{{ date.formatDate(item.tanggal,'dddd') }}</span>
                tanggal <span class="text-weight-bold text-italic">{{ tanggalTerbilang(date.formatDate(item.tanggal,'DD')) }}</span>
                bulan <span class="text-weight-bold text-italic">{{ date.formatDate(item.tanggal,'MMMM') }}</span>
                tahun <span class="text-weight-bold text-italic">{{ tahunTerbilang(date.formatDate(item.tanggal,'YYYY')) }}</span>,
                <!-- tahun <span class="text-weight-bold text-italic">{{ tahunTerbilang('3211') }}</span>, -->
                bertempat di UOBK RSUD Dokter Mohamad Saleh Kota Probolinggo, kami yang bertanda tangan di bawah ini:
              </div>
              <!-- Pihak pertama start -->
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1">
                  <div class="row">
                    <div class="col-4" />
                    <div class="col-4">
                      I.
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  Nama
                </div>
                <div class="col-7">
                  <app-input
                    v-model="namaSupplier"
                    label="Nama PIC penyedia"
                    :filled="false"
                    class="print-hide"
                  />
                  <div class="print-only">
                    {{ namaSupplier }}
                  </div>
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Jabatan
                </div>
                <div class="col-7">
                  <app-input
                    v-model="jabatanSupplier"
                    label="Jabatan PIC penyedia"
                    :filled="false"
                    class="print-hide"
                  />
                  <div class="print-only">
                    {{ jabatanSupplier }}
                  </div>
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Instansi / Perusahaan
                </div>
                <div class="col-7">
                  {{ item.perusahaan?item.perusahaan.nama:'Nama perusahaan tidak ditemukan' }}
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Alamat
                </div>
                <div class="col-7">
                  {{ item.perusahaan?item.perusahaan.alamat:'Alamat perusahaan tidak ditemukan' }}
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-11">
                  yang selanjutnya disebut <span class="text-weight-bold">PIHAK PERTAMA.</span>
                </div>
              </div>
              <!-- Pihak pertama end -->
              <!-- Pihak kedua start -->
              <!-- {{ tandatangan.data.ppk }} -->
              <div class="print-hide text-italic">
                identitas PPK :
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1">
                  <div class="row">
                    <div class="col-4" />
                    <div class="col-4">
                      II.
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  Nama
                </div>
                <div class="col-7">
                  {{ tandatangan?.data?.ppk?.nama }}
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  NIP
                </div>
                <div class="col-7">
                  {{ tandatangan?.data?.ppk?.nip_baru===''?tandatangan?.data?.ppk?.nip:tandatangan?.data?.ppk?.nip_baru }}
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Jabatan
                </div>
                <div class="col-7">
                  {{ tandatangan?.data?.ppk?.relasi_jabatan?tandatangan?.data?.ppk?.relasi_jabatan?.jabatan:'jabatan tidak ditemukan' }}
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Instansi / Perusahaan
                </div>
                <div class="col-7">
                  UOBK RSUD Dokter Mohamad Saleh Kota Probolinggo
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-3">
                  Alamat
                </div>
                <div class="col-7">
                  Jalan Mayjen Panjaitan No.65, Kota Probolinggo
                </div>
              </div>
              <div class="fit row no-wrap justify-start items-center q-my-sm">
                <div class="col-1" />
                <div class="col-11">
                  yang ditugaskan sebagai Pejabat Penandatanganan Kontrak berdasarkan Keputusan Direktur UOBK RSUD Dokter Mohamad Saleh Kota Probolinggo Nomor : 100.3/01/KEP/425.102.8/{{ date.formatDate(Date.now(),'YYYY') }} tanggal 02 Januari {{ date.formatDate(Date.now(),'YYYY') }} Tentang Penunjukan dan Pengangkatan Pejabat Penandatangan Kontrak (PPK), Pejabat Teknis Kegiatan (PTK), dan Pembantu PTK Anggaran Badan Layanan Umum Daerah pada UOBK RSUD Dokter Mohamad Saleh Kota Probolinggo Tahun Anggaran {{ date.formatDate(Date.now(),'YYYY') }},
                  yang selanjutnya disebut <span class="text-weight-bold">PIHAK KEDUA.</span>
                </div>
              </div>
              <!-- Pihak kedua end -->
              <!-- {{ item }} -->
              <div class="print-hide">
                <app-input
                  v-model="namaRekeningBelanja"
                  class="print-hide"
                  label="nama rekening belanja"
                  :filled="false"
                />
              </div>
              <p class="q-my-md">
                <span class="q-mr-md" /> <span class="text-weight-bold">PIHAK PERTAMA</span> dan <span class="text-weight-bold">PIHAK KEDUA</span> bersepakat dan setuju untuk melaksanakan serah terima hasil pekerjaan
                <span class="text-weight-bold">{{ namaRekeningBelanja }}</span> yang dijelaskan sebagai berikut:
              </p>
              <div class="row no-wrap q-my-md">
                <div
                  class="col-shrink text-weight-bold"
                  style="width:20px;"
                >
                  a.
                </div>
                <div class="col">
                  <span class="text-weight-bold">PIHAK PERTAMA</span> menyerahkan hasil pekerjaan <span class="text-weight-bold">{{ namaRekeningBelanja }}</span> kepada <span class="text-weight-bold">PIHAK KEDUA</span> sesuai dengan ketentuan yang tercantum dalam Surat Pesanan, dengan rincian sebagai berikut:
                </div>
              </div>
              <!-- no details -->
              <div v-if="!item.details">
                <app-no-data />
              </div>
              <!-- details -->
              <div
                v-if="item.details"
                class="q-mt-md"
              >
                <!-- header detail -->
                <div class="row justify-between q-col-gutter-sm">
                  <div class="col-7 text-weight-bold border-tb border-left">
                    No. Nama Barang
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Jumlah
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Satuan
                  </div>
                  <div class="col-3 text-weight-bold border-box">
                    Keterangan
                  </div>
                </div>
                <!-- body details -->
                <div
                  v-for="(det, i) in item.details"
                  :key="i"
                >
                  <div
                    class="row justify-between q-col-gutter-sm"
                  >
                    <div class="col-7 border-bottom border-left">
                      {{ i+1 }}. {{ det.barangrs?det.barangrs.nama:'Nama barang tidak ditemukan' }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.qty===null?0:det.qty }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.satuan?det.satuan.nama:'-' }}
                    </div>
                    <div class="col-3 border-bottom border-left border-right">
                      {{ det.merk?det.merk:'-' }}
                    </div>
                  </div>
                  <q-separator />
                </div>
                <!-- penutup -->
                <div class="row no-wrap q-my-md">
                  <div
                    class="col-shrink text-weight-bold"
                    style="width:20px;"
                  >
                    b.
                  </div>
                  <div class="col">
                    <span class="text-weight-bold">PIHAK KEDUA</span> menyatakan menerima hasil sebagaimana tersebut di atas pekerjaan <span class="text-weight-bold">{{ namaRekeningBelanja }}</span> dari <span class="text-weight-bold">PIHAK PERTAMA</span> dalam keadaan baik dan lengkap
                  </div>
                </div>
                <div>
                  <span class="q-mr-md" />Demikian Berita Acara Serah Terima ini dibuat dalam rangkap 2 (dua) untuk dipergunakan sebagaimana mestinya.
                </div>
              </div>
            </div>
            <!-- penerimaan end -->
            <div v-if="item.nama === 'DISTRIBUSI DEPO'">
              <!-- Top words -->
              <!-- {{ item }} -->
              <div class="row justify-center q-my-md f-16 text-weight-bold">
                DATA DISTRIBUSI DEPO
              </div>
              <div class="row justify-center q-mb-sm">
                <div class="col-2">
                  Tanggal
                </div>
                <div class="col-10">
                  {{ dateFullFormat(item.tanggal) }}
                </div>
              </div>
              <div class="row justify-center q-mb-sm">
                <div class="col-2">
                  No. Distribusi
                </div>
                <div class="col-10">
                  {{ item.no_distribusi }}
                </div>
              </div>
              <div class="row justify-start q-mb-md">
                <p>
                  Telah dikirimkan ke
                  <span class="text-weight-bold">
                    {{ item.depo?item.depo.nama:'-' }}
                  </span> barang dalam list dibawah ini :
                </p>
              </div>

              <!-- no details -->
              <div v-if="!item.details">
                <app-no-data />
              </div>
              <!-- details -->
              <div v-if="item.details">
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
                  v-for="(det, i) in item.details"
                  :key="i"
                >
                  <div
                    class="row justify-between q-col-gutter-sm"
                  >
                    <div class="col-5 border-bottom border-left">
                      {{ i+1 }}. {{ det.barangrs?det.barangrs.nama:'Nama barang tidak ditemukan' }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.jumlah===null?0:det.jumlah }}
                    </div>
                    <div
                      class="col-2 border-bottom border-left"
                    >
                      {{ det.satuan?det.satuan.nama:'-' }}
                    </div>
                    <div class="col-4 border-bottom border-left border-right">
                      {{ det.merk?det.merk:'-' }}
                    </div>
                  </div>
                  <q-separator />
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- tanda tangan -->
          <q-card-section>
            <div class="row justify-between q-col-gutter-sm ">
              <div class="col-6 text-center" />
              <div class="col-6 text-center">
                Probolinggo, {{ dateFullFormat(item.tanggal) }}
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
    <TandaTanganPage v-model="tandatangan.isOpen" />
    <DetailsTablePage v-model="detail.isOpen" />
    <editPemesananPage v-model="editPemesanan.isOpen" />
    <FormPemesananBarang v-model="editPemesanan.formOpen" />
    <editPenerimaanPage v-model="editPenerimaan.isOpen" />
    <!-- id="printMe" -->
  </q-page>
</template>
<script setup>
// import { date } from '.quasar'
import { computed, onMounted, ref, watch } from 'vue'
import { dateFullFormat, dateFull, formatRp } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'
import { useEditPenerimaanStore } from 'src/stores/simrs/logistik/sigarang/history/edit/penerimaan'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
import DetailsTablePage from './DetailsTablePage.vue'
import editPemesananPage from './edit/EditPemesananPage.vue'
import editPenerimaanPage from './edit/EditPenerimaanPage.vue'
import TandaTanganPage from 'src/pages/simrs/sigarang/tandatangan/TandaTanganPage.vue'
import FormPemesananBarang from './edit/FormPemesananBarang.vue'
// import PrintPage from './PrintPage.vue'
import { routerInstance } from 'src/boot/router'
// import { notifCenterVue } from 'src/modules/utils'
import { Dialog, date } from 'quasar'
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { useKontrakPemensananStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/kontrak'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
const table = useHistoryTable()
const detail = useDetailHistoryTable()
const tandatangan = useTandaTanganStore()
tandatangan.getInitialData()
// identitas supplier
const namaSupplier = ref('')
const jabatanSupplier = ref('')

const namaRekeningBelanja = ref('')

const freeTextKiri = ref('')
const freeTextKanan = ref('')
const freeTextBawah = ref('')
// tanggal terbilang
function tanggalTerbilang (val) {
  console.log(val)
  switch (val) {
    case '01':
      return 'Satu'

    case '02':
      return 'Dua'

    case '03':
      return 'Tiga'

    case '04':
      return 'Empat'

    case '05':
      return 'Lima'

    case '06':
      return 'Enam'

    case '07':
      return 'Tujuh'

    case '08':
      return 'Delapan'

    case '09':
      return 'Sembilan'

    case '10':
      return 'Sepuluh'

    case '11':
      return 'Sebelas'

    case '12':
      return 'Dua Belas'

    case '13':
      return 'Tiga Belas'

    case '14':
      return 'Empat Belas'

    case '15':
      return 'Lima Belas'

    case '16':
      return 'Enam Belas'

    case '17':
      return 'Tujuh Belas'

    case '18':
      return 'Delapan Belas'

    case '19':
      return 'Sembilan Belas'

    case '20':
      return 'Dua Puluh'

    case '21':
      return 'Dua Puluh Satu'

    case '22':
      return 'Dua Puluh Dua'

    case '23':
      return 'Dua Puluh Tiga'

    case '24':
      return 'Dua Puluh Empat'

    case '25':
      return 'Dua Puluh Lima'

    case '26':
      return 'Dua Puluh Enam'

    case '27':
      return 'Dua Puluh Tujuh'

    case '28':
      return 'Dua Puluh Delapan'

    case '29':
      return 'Dua Puluh Sembilan'

    case '30':
      return 'Tiga Puluh'

    case '31':
      return 'Tiga Puluh Satu'

    default:
      return ''
  }
}
// tahun terbilang
function tahunTerbilang (val) {
  const temp = val.split('')
  let satuan = ''
  let puluhan = ''
  if (temp[2] === '1') {
    if (temp[3] === '1') {
      puluhan = 'Sebelas'
    }
    else {
      puluhan = bilangan(temp[3])
      satuan = 'belas'
    }
  }
  else {
    puluhan = bilangan(temp[2]) + ' puluh'
    satuan = bilangan(temp[3])
  }
  const ratusan = temp[1] === '1' ? 'Seratus' : temp[1] === '0' ? '' : (bilangan(temp[0]) + ' ratus')
  const ribuan = temp[0] === '1' ? 'Seribu' : temp[0] === '0' ? '' : (bilangan(temp[0]) + ' ribu')
  console.log('tahun', ribuan, ratusan, puluhan, satuan)
  return ribuan + ' ' + ratusan + ' ' + puluhan + ' ' + satuan
}
// bilangan
function bilangan (val) {
  switch (val) {
    case '1':
      return 'Satu'

    case '2':
      return 'Dua'

    case '3':
      return 'Tiga'

    case '4':
      return 'Empat'

    case '5':
      return 'Lima'

    case '6':
      return 'Enam'

    case '7':
      return 'Tujuh'

    case '8':
      return 'Delapan'

    case '9':
      return 'Sembilan'

    case '0':
      return ''

    default:
      return ''
  }
}
const apps = useAplikasiStore()
const role = computed(() => {
  return apps.user.pegawai ? apps.user.pegawai.role.nama : ''
})
// set tanggal print
function setTanggal (val) {
  table.dispPrint.tanggal = val
  console.log('tanggal ', val)
}
function setTanggalDisp (val) {
  table.dispPrint.tanggalDisp = val
  console.log('tanggal disp', val)
}
/// ////////
// kembalikan status ke verif (akses gudang)
function backToVerif (val, index) {
  // console.log('back to', val, index)
  table.setForm('id', val.id)
  table.setForm('status', 4)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Kembalikan status permintaan ke Menungggu verivikasi?',
    cancel: true
  }).onOk(() => {
    table.getItBackToVerif(index)
  })
}
function reqQ (val) {
  let x = ''
  if (val === 'Pemesanan' || val === 'Penerimaan' || val === 'Gudang') {
    x = 'Nomor Pemesanan'
  }
  else if (val === 'Permintaan Ruangan') {
    x = 'Nomor Permintaan'
  }
  else if (val === 'Penerimaan Ruangan') {
    x = 'Nomor Distribusi'
  }
  return x
}
// print
const openPrint = ref(false)
// let title = ''
const printed = ref(false)
const item = ref({})
function toPrint (val) {
  // console.log('print', val)
  item.value = val
  // title = 'Print ' + val.nama
  openPrint.value = true
}
const printObj = {
  id: 'printMe',
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    openPrint.value = false
    printed.value = false
    // changePeriode()
    item.value = {}
    console.log('closePrint')
  }
}
const goTo = val => {
  const Slug = val.reff

  if (val.nama === 'PEMESANAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug: Slug } })
  }
  else if (val.nama === 'PERMINTAAN RUANGAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug: Slug } })
  }
  else if (val.nama === 'PENERIMAAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.penerimaan', params: { slug: Slug } })
  }
  else if (val.nama === 'PEMAKAIAN RUANGAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.pemakaianruangan', params: { slug: Slug } })
  }
  else if (val.nama === 'DISTRIBUSI DEPO') {
    routerInstance.replace({ name: 'sigarang.transaksi.distribusidepo', params: { slug: Slug } })
  }
  // console.log(val)
}
const hapus = val => {
  // console.log(val)
  // notifCenterVue('tombol delete belum berfungsi')
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakan anda akan menghapus Transaksi ini?',
    ok: {
      'no-caps': true,
      label: 'Lanjutkan Hapus',
      color: 'negative',
      push: true,
      icon: 'icon-mat-delete_sweep'
    },
    cancel: {
      color: 'dark',
      'no-caps': true,
      push: true
    }
  })
    .onOk(() => {
      // console.log('ok', val)
      table.deleteTransaction(val)
    })
}
// ------------ edit pemesanan -------
const editPemesanan = useEditPemesananStore()
const kontrakStore = useKontrakPemensananStore()
function editRow (val, i) {
  // console.log(val)
  kontrakStore.setSearch(val.kontrak)
  editPemesanan.assignForm(val, i)
  editPemesanan.setOpen()
}
const ladingPemesanan = computed(() => {
  return editPemesanan.loading
})
const ladingPenerimaan = computed(() => {
  return editPenerimaan.loading
})
function loadingEdit (index) {
  return (editPemesanan.index === index || editPenerimaan.index === index) && (ladingPemesanan.value === true || ladingPenerimaan.value === true)
}
// ------------------------------------

// --------edit penerimaan -----------
const editPenerimaan = useEditPenerimaanStore()
function editRowTerima (val, i) {
  console.log('edit penerimaan', val)
  editPenerimaan.assignForm(val, i)
  editPenerimaan.setOpen()
}
// ------------------------------------

// -----------keterangan status-----------
const color = val => {
  switch (val) {
    case 1:
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      // return 'grey'
      return 'red-4'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break
    case 8:
      return 'blue-grey'
      // eslint-disable-next-line no-unreachable
      break
    case 9:
      return 'brown-6'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  // console.log('nama', nama)
  if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Menunggu diterima Gudang'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'PENERIMAAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diteriman Gudang'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Sudah di Distribusikan ke Depo'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'DISTRIBUSI DEPO') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Depo'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Depo'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'PENERIMAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'BARANG RUSAK') {
    switch (status) {
      case 1:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Dinyatakn dipakai ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'PEMAKAIAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Sudah dipakai'
        // eslint-disable-next-line no-unreachable
        break
      case 9:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else if (nama === 'PERMINTAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 20:
        return 'Permintaan Ditolak'
        // eslint-disable-next-line no-unreachable
        break
      case 19:
        return 'Kadaluarsa'
        // eslint-disable-next-line no-unreachable
        break
      case 18:
        return 'Invalid'
        // eslint-disable-next-line no-unreachable
        break
      case 17:
        return 'Tidak Diambil Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Menunggu verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 5:
        return 'Telah di verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 6:
        return 'Barang sudah bisa diambil'
        // eslint-disable-next-line no-unreachable
        break
      case 7:
        return 'Telah di distribusikan'
        // eslint-disable-next-line no-unreachable
        break
      case 8:
        return 'Telah diterima ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
  else { // if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Selesai'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break
      case 5:
        return 'Menunggu verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 6:
        return 'Telah di verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 7:
        return 'Telah di distribusikan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
}

// -----------keterangan status end-----------

onMounted(() => {
  if (table.nama === '') {
    if (role.value === 'PTK' || role.value === 'root' || role.value === 'gizi') {
      table.pilihTransaksi({ nama: 'Pemesanan' })
    }
    if (role.value === 'gudang' || role.value === 'depo' || role.value === 'ruangan') {
      table.pilihTransaksi({ nama: 'Permintaan Ruangan' })
    }
  }
  editPemesanan.getInitData()
})
watch(() => role.value, val => {
  if (table.nama === '') {
    if (val === 'PTK' || val === 'root' || val === 'gizi') {
      table.pilihTransaksi({ nama: 'Pemesanan' })
    }
    if (val === 'gudang' || val === 'depo' || val === 'ruangan') {
      table.pilihTransaksi({ nama: 'Permintaan Ruangan' })
    }
  }
})
// table.getDataTable()
</script>
<style scoped>
.q-table td box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}
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
