<template>
  <q-page class="q-pt-sm">
    <div>
      <q-btn
        color="primary"
        icon="icon-mat-arrow_back"
        rounded
        flat
        size="25px"
        @click="backToKontrak()"
      />
      <app-card :is-header="false">
        <template #content>
          <app-table-input
            title="Input Pemesanan"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :input-col="10"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            :add-input="store.isOpen"
            wrap-cells
            index-nomor
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <template #col-nomor>
              <div>Nomor Pemesanan</div>
            </template>
            <template #col-kode_108>
              <div>Kode 108</div>
            </template>
            <template #cell-kode_108="{row}">
              <!-- <div>{{ row.barang108?row.barang108.uraian:'-' }}</div> -->
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.kode_108?row.kode_108:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.kode_108?row.kode_108:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #col-uraian_108>
              <div>Uraian 108</div>
            </template>
            <template #cell-uraian_108="{row}">
              <!-- <div>{{ row.barang108?row.barang108.uraian:'-' }}</div> -->
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.uraian_108?row.uraian_108:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.uraian_108?row.uraian_108:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #col-uraian_50>
              <div>Uraian 50</div>
            </template>
            <template #cell-uraian_50="{row}">
              <!-- <div>{{ row.barang108?row.barang108.uraian:'-' }}</div> -->
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.uraian_50?row.uraian_50:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.uraian_50?row.uraian_50:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #col-kode_50>
              <div>Kode 50</div>
            </template>
            <template #cell-kode_50="{row}">
              <!-- <div>{{ row.barang108?row.barang108.uraian:'-' }}</div> -->
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.kode_50?row.kode_50:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.kode_50?row.kode_50:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #col-satuan_besar>
              <div>Satuan Besar</div>
            </template>
            <template #col-satuan_kecil>
              <div>Satuan Kecil</div>
            </template>
            <template #col-kontrak>
              <div>Nomor Kontrak</div>
            </template>
            <template #col-merk>
              <div>Merk</div>
            </template>
            <template #col-barang108>
              <div>Uraian 108</div>
            </template>
            <template #cell-barang108="{row}">
              <!-- <div>{{ row.barang108?row.barang108.uraian:'-' }}</div> -->
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.barang108?row.barang108.uraian:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.barang108?row.barang108.uraian:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #col-kode_rs>
              <div>Kode RS</div>
            </template>
            <template #col-barangrs>
              <div>Nama Barang RS</div>
            </template>
            <template #col-nama_barang>
              <div>Nama Barang</div>
            </template>
            <template #cell-barangrs="{row}">
              <div>{{ row.barangrs?row.barangrs.nama:'-' }}</div>
            </template>
            <template #cell-satuan_kecil="{row}">
              <div>{{ row.satuan_kecil?row.satuan_kecil:'-' }}</div>
            </template>
            <template #col-satuan>
              <div>Satuan</div>
            </template>
            <template #cell-satuan="{row}">
              <div>{{ row.satuan?row.satuan.nama:'-' }}</div>
            </template>
            <template #col-perusahaan>
              <div>Nama Perusahaan</div>
            </template>
            <template #cell-perusahaan="{row}">
              <div>{{ row.perusahaan?row.perusahaan.nama:'-' }}</div>
            </template>
            <template #col-tanggal>
              <div>Tanggal Pemesanan</div>
            </template>
            <template #cell-tanggal="{row}">
              <div>{{ dateFullFormat(row.tanggal) }}</div>
            </template>
            <template #col-qty>
              <div>Jumlah Pesanan</div>
            </template>
            <template #col-harga>
              <div>Harga Pesanan</div>
            </template>
            <template #cell-harga="{row}">
              <div>{{ formatRpDouble(row.harga) }}</div>
            </template>
            <template #col-sub_total>
              <div>Sub Total Pesanan</div>
            </template>
            <template #cell-sub_total="{row}">
              <div> {{ formatRpDouble(row.sub_total) }}</div>
            </template>
            <template #col-kode_perusahaan>
              <div>Kode Perusahaan</div>
            </template>
            <template #cell-kode_perusahaan="{row}">
              <div> {{ row.kode_perusahaan }}</div>
            </template>

            <template #top>
              <div class="row q-col-gutter-md q-my-sm">
                <div class="col-5">
                  <div class="row q-col-gutter-md q-mb-sm text-weight-bold">
                    <div class="col-4">
                      No Kontrak
                    </div>
                    <div class="col-8">
                      {{ store.form.kontrak }}
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mb-sm items-center">
                    <div
                      class="col-11"
                    >
                      <app-autocomplete-new
                        :model="store.form.kode_rs"
                        :valid="kodeRs"
                        outlined
                        label="Nama Barang RS"
                        autocomplete="nama"
                        option-value="kode"
                        option-label="nama"
                        :source="store.mapingBarangs"
                        :loading="store.mapingLoading"
                        @on-select="store.barangSelected"
                        @clear="clearBarangRs"
                        @set-model="modelSet"
                        @buang="modelSet"
                      />
                      <!-- @buang="buang" -->
                    </div>
                    <div class="col-1">
                      <q-btn
                        v-if="role==='root'||role==='gizi'"
                        class="q-ml-sm"
                        unelevated
                        round
                        color="primary"
                        size="sm"
                        icon="icon-mat-add"
                        @click="addNewBarang"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Tambah Data Master Baru
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                  <div v-if="store.form.kode_rs">
                    <div class="row q-mb-sm q-col-gutter-sm">
                      <div class="col-6">
                        <app-input
                          v-model="store.form.qty"
                          input-class="text-right"
                          :valid="jumlah"
                          label="Jumlah Pemesanan*"
                          outlined
                          type="number"
                          :disable="store.loadingTambah"
                          @update:model-value="store.updateHarga"
                        />
                      </div>
                      <div class="col-6">
                        <app-input
                          v-model="store.form.harga"
                          :valid="harga"
                          type="number"
                          label="Harga Pembelian*"
                          outlined
                          :disable="store.loadingTambah"
                          @update:model-value="store.updateHarga"
                          @keyup.enter="onSubmit"
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-4 text-weight-bold">
                        Kode Barang
                      </div>
                      <div class="col-6">
                        {{ store.barangrs.length ? store.barangrs[0].kode : '-' }}
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-4 text-weight-bold">
                        Uraian 108
                      </div>
                      <div class="col-6">
                        {{ store.barangrs.length ? store.barangrs[0].uraian_108 : '-' }}
                      </div>
                    </div>

                    <div class="row q-mb-sm items-center">
                      <div class="col-4 text-weight-bold">
                        Rekening 50
                      </div>
                      <div class="col-6">
                        <app-autocomplete-new
                          :model="store.form.kode_50"
                          outlined
                          label="Rekening 50"
                          autocomplete="uraian"
                          option-value="kode"
                          option-label="uraian"
                          :source="store.rekening50s"
                          :disable="store.loadingTambah"
                          @on-select="store.rekening50Selected"
                          @clear="clearRekening50"
                          @set-model="rekeningSet"
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-4 text-weight-bold">
                        Satuan
                      </div>
                      <div class="col-6">
                        {{ store.barangrs.length ? store.barangrs[0].satuan.nama : '-' }}
                      </div>
                    </div>
                    <div class="row q-mb-sm items-center">
                      <div class="col-4 text-weight-bold">
                        Keterangan / Merk
                      </div>
                      <div class="col-6">
                        <app-input
                          v-model="store.form.merk"
                          input-class="text-right"
                          valid
                          label="Keterangan / Merk"
                          outlined
                          counter
                          type="text"
                          :rules="[ val => val.length <= 255 || 'maximal 255 karakter']"
                          :disable="store.loadingTambah"
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-4 text-weight-bold">
                        Stok Gudang
                      </div>
                      <div class="col-6">
                        {{ store.stok.sisaStok?store.stok.sisaStok:0 }}
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-4 text-weight-bold">
                        Sub total
                      </div>
                      <div class="col-6 text-weight-bold">
                        {{ store.form.sub_total ? formatRpDouble(store.form.sub_total,2) : 0 }}
                      </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm">
                      <app-btn
                        class="q-mx-sm"
                        label="Batal"
                        color="dark"
                        :disable="store.loadingTambah"
                        @click="onCancel"
                      />
                      <app-btn
                        label="Tambah"
                        :loading="store.loadingTambah"
                        :disable="store.loadingTambah"
                        @click="onSubmit"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-7">
                  <div class="row q-mb-sm text-weight-bold">
                    <div class="col col-5">
                      Tanggal Pemesanan
                    </div>
                    <div class="col text-right">
                      <div class="fit row no-wrap justify-end items-center">
                        <div>
                          {{ dateFullFormat(store.form.tanggal) }}
                        </div>
                        <div class="q-ml-sm">
                          <q-btn
                            icon="icon-mat-event"
                            round
                            dense
                            color="primary"
                          >
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                              @show="updateProxy"
                            >
                              <q-date
                                ref="refDate"
                                v-model="store.form.tanggal"
                                mask="YYYY-MM-DD"
                                @update:model-value="store.setTanggal"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row q-mb-sm text-weight-bold">
                    <div class="col col-5">
                      Nomor Pemesanan
                    </div>
                    <div class="col text-right">
                      <div class="row justify-end q-mb-sm">
                        {{ store.form.nomor }}
                      </div>
                      <div class="row justify-end q-mb-sm">
                        <app-input
                          ref="refNoUrut"
                          v-model="store.terima.nomer_urut"
                          label="Nomer Urut"
                          dense
                          outlined
                          @update:model-value="store.setNomorPemesanan"
                        />
                      </div>

                      <div class="row justify-end q-mb-sm">
                        <app-input
                          ref="refBidang"
                          v-model="store.terima.bidang"
                          label="Bidang"
                          dense
                          outlined
                          @update:model-value="store.bidang"
                        />
                      </div>
                      <div class="row justify-end q-mb-sm">
                        <app-input
                          v-model="store.terima.inputBulan"
                          label="bulan"
                          dense
                          outlined
                          @update:model-value="store.bulan"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row q-mb-sm text-weight-bold">
                    <div class="col col-5">
                      Perusahaan
                    </div>
                    <div class="col text-right">
                      {{ store.namaPerusahaan ? store.namaPerusahaan : '-' }}
                    </div>
                  </div>
                  <div class="row q-mb-sm">
                    <div class="col-12 text-right">
                      <app-btn
                        v-if="!store.needToEdit"
                        label="Tutup Pemesanan"
                        :loading="store.loadingFinish"
                        :disable="store.isOpen || store.loadingFinish || store.loadingTambah || !table.items.length"
                        @click="onFisnish"
                      />
                      <app-btn
                        v-if="store.needToEdit"
                        label="Selesai Edit"
                        :loading="store.loadingFinish"
                        :disable="store.isOpen || store.loadingFinish || store.loadingTambah || !table.items.length"
                        @click="onFisnishEdit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- <template #top-row>
              <tr>
                <th>
                  <div class="bold">
                    <strong>Jumlah pesanan</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Harga</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>kode</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>108</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Uraian 108</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Satuan</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Stok Gudang</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Uraian 50</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Merk</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Sub Total</strong>
                  </div>
                </th>
              </tr>
              <tr>
                <td>
                  <div class="bold">
                    <app-input
                      v-model="store.form.qty"
                      input-class="text-right"
                      :valid="jumlah"
                      label="Jumlah Pemesanan*"
                      outlined
                      type="number"
                      :disable="store.loadingTambah"
                      @update:model-value="store.updateHarga"
                    />
                  </div>
                </td>
                <td>
                  <div class="bold">
                    <app-input
                      v-model="store.form.harga"
                      :valid="harga"
                      prefix="Rp "
                      label="Harga Pembelian*"
                      currency
                      outlined
                      :disable="store.loadingTambah"
                      @update:model-value="store.updateHarga"
                      @keyup.enter="onSubmit"
                    />
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barangrs.length ? store.barangrs[0].kode : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barangrs.length ? store.barangrs[0].barang108.kode : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barangrs.length ? store.barangrs[0].barang108.uraian : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barangrs.length ? store.barangrs[0].satuan.nama : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.stok.sisaStok?store.stok.sisaStok:0 }}
                  </div>
                </td>
                <td>
                  <app-autocomplete-new
                    :model="store.form.kode_50"
                    outlined
                    label="Rekening 50"
                    autocomplete="uraian"
                    option-value="kode"
                    option-label="uraian"
                    :source="store.rekening50s"
                    :disable="store.loadingTambah"
                    @on-select="store.rekening50Selected"
                    @clear="clearRekening50"
                    @set-model="rekeningSet"
                  />
                </td>
                <td>
                  <app-input
                    v-model="store.form.merk"
                    input-class="text-right"
                    label="Merk*"
                    outlined
                    :disable="store.loadingTambah"
                  />
                </td>

                <td>
                  <div class="bold">
                    <strong>{{ store.form.sub_total ? formatRpDouble(store.form.sub_total) :
                      0 }}</strong>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <app-btn
                    class="q-mx-sm"
                    label="Batal"
                    color="dark"
                    :disable="store.loadingTambah"
                    @click="onCancel"
                  />
                  <app-btn
                    label="Tambah"
                    :loading="store.loadingTambah"
                    :disable="store.loadingTambah"
                    @click="onSubmit"
                  />
                </td>
              </tr>
            </template> -->
          </app-table-input>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <pemesananForm v-model="masterBarangForm.isOpen" />
    <!-- <formDialog /> -->
    <!-- <q-btn label="coba" @click="onFisnish"></q-btn> -->
  </q-page>
</template>
<script setup>
import pemesananForm from 'src/pages/simrs/sigarang/master/barangrs/FormDialog.vue'
import { date, Dialog } from 'quasar'
import { routerInstance } from 'src/boot/router'
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { notifNegativeCenterVue, uniqueId } from 'src/modules/utils'
import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
import { useTransaksiPemesananTable } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/table'
import { computed, ref } from 'vue'
import { useMasterBarangRSForm } from 'src/stores/simrs/logistik/sigarang/master/barangrs/form'

import { useAplikasiStore } from 'src/stores/app/aplikasi'

const table = useTransaksiPemesananTable()
const store = useTransaksiPemensananForm()

const auth = useAplikasiStore()
// store master barang
const masterBarangForm = useMasterBarangRSForm()
// store.setToday()
table.getDataTable()
store.getInitialData()
// store.getCurrentStok()
// store.getMinMaxDepo()

const role = computed(() => {
  return auth.user.pegawai ? auth.user.pegawai.role.nama : ''
})

function addNewBarang() {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah Anda Akan menambahkan <strong> Data Master Barang </strong>, untuk barang baru?',
    html: true,
    ok: {
      push: true,
      label: 'Buat Data Barang Baru di Master Barang',
      'no-caps': true
    },
    cancel: {
      push: true,
      label: 'Batal',
      color: 'dark',
      'no-caps': true
    }
  })
    .onOk(() => {
      masterBarangForm.newData()
    })
}

const kontrak = ref(false)
const kodeRs = ref(false)
const jumlah = ref(false)
const harga = ref(false)
const kode108 = ref(false)
const refNoUrut = ref(null)
const refBidang = ref(null)

const backToKontrak = () => {
  store.kontrakOpen = false
  const slug = 'TRP-' + uniqueId()
  routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
  table.items = []
  table.meta = {}
  store.resetFORM()
  table.setParam('reff', slug)
}

const proxyDate = ref(null)
const refDate = ref(null)
const updateProxy = () => {
  // console.log('date', store.form.tanggal)
  // refDate.value.setToday()
  proxyDate.value = store.form.tanggal ? store.form.tanggal : date.formatDate(Date.now(), 'YYYY/MM/DD')
  if (!store.form.tanggal) {
    store.setForm('tanggal', proxyDate.value)
    store.form.tanggal = proxyDate.value
  }
  // console.log('date 2', store.form.tanggal)
  store.tanggalTampil = dateFullFormat(proxyDate.value)
}

const modelSet = val => {
  // console.log('model barang RS', val)
  store.params.q = val
  store.getMapingBarang()
}

// const buang = val => {
//   console.log('buang', val)
//   store.params.q = val
//   store.getMapingBarang()
// }
const rekeningSet = val => {
  // console.log('rekening', val)
}
const clearRekening50 = () => {
  store.setForm('kode_50', null)
}
const clearBarangRs = () => {
  store.setForm('kode_rs', null)
  store.setClose()
  // console.log('clear to close', store.isOpen)
  // console.log('clear', store.form)
}

// const clearkontrak = () => {
//   // store.setForm('nokontrak', null)
//   store.setForm('kontrak', null)
//   store.setForm('kode_perusahaan', null)
//   store.namaPerusahaan = null
// }

const onFisnish = () => {
  refNoUrut.value.$refs.refInput.validate()
  refBidang.value.$refs.refInput.validate()
  if (table.items.length) {
    const jumlah = table.items.map(data => {
      return data.sub_total
    }).reduce((x, y) => { return x + y })
    // console.log('jumlag', jumlah)

    store.setForm('status', 2)
    store.setForm('total', jumlah)

    const slug = 'TRP-' + uniqueId()
    store.loadingFinish = true
    store.saveForm().then(() => {
      table.setParam('reff', slug)
      // console.log('onFinish ', slug)
      store.tglManual = false
      table.resetData()
      store.resetFORM()
      store.setForm('reff', slug)
      routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
      table.getDataTable(slug)
      store.kontrakOpen = false
    })
  } else {
    notifNegativeCenterVue('data Masih kosong, tidak ada pemesanan yang perlu ditutup')
  }
}
const validation = () => {
  kontrak.value = !!store.form.kontrak
  kodeRs.value = !!store.form.kode_rs
  kode108.value = !!store.form.kode_108
  jumlah.value = !!store.form.qty
  harga.value = !!store.form.harga
  refNoUrut.value.$refs.refInput.validate()
  refBidang.value.$refs.refInput.validate()
}
const onSubmit = () => {
  validation()
  // console.log('on Submit', kontrak.value, kodeRs.value, kode108.value, jumlah.value, harga.value)
  if (kontrak.value && kodeRs.value && kode108.value && jumlah.value && harga.value) {
    const apem = Object.keys(store.form)
    apem.forEach(data => {
      if (store.form[data] === null) {
        delete store.form[data]
      }
    })
    const harga = parseFloat(store.form.harga)
    store.setForm('harga', harga)
    // store.form.harga = harga
    const jumlah = parseFloat(store.form.qty)
    store.setForm('qty', jumlah)
    // store.setForm('status', 1)
    // store.form.qty = jumlah
    // console.log('form ', store.form)
    store.loadingTambah = true
    store.saveForm().then(() => {
      // if (formReff.value != null) { formReff.value.resetValidation() }
      table.getDataTable()
      store.resetInput()
      store.isOpen = false
    })
  } else {
    notifNegativeCenterVue('cek data input, ada yang kurang')
  }
}
function onFisnishEdit() {
  store.needToEdit = false
  const slug = 'TRP-' + uniqueId()

  table.resetData()
  store.resetFORM()
  store.setForm('reff', slug)
  routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
  table.getDataTable(slug)
  store.kontrakOpen = false
}
const onCancel = () => {
  clearBarangRs()
}
</script>
