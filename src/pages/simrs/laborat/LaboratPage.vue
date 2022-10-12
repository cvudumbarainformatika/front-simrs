<template>
  <q-page padding>
    <div class="row items-center justify-between title-page q-mb-md">
      <div class="flex items-center">
        <div class="icon q-mr-md">
          <q-icon
            name="icon-mat-dvr"
            size="lg"
          />
        </div>
        <div class="left">
          <div class="text-h6">
            Laboratorium
          </div>
          <div class="f-12">
            <span>Manage data pasien yang membutuhkan data laborat</span>
          </div>
        </div>
      </div>
      <!-- <div>
        <q-btn
          v-if="route.params.id"
          round
          elevated
          color="primary"
          icon="arrow_back"
          size="sm"
          @click="prev"
        />
        <q-btn
          v-else
          round
          elevated
          color="primary"
          icon="add"
          size="sm"
          :to="`/admin/berita/form/${'add'}`"
        />
      </div> -->
    </div>

    <!-- content -->
    <q-card
      flat
      bordered
    >
      <q-card-section>
        <app-table-new
          title="Data Laborat"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :default-btn="false"
          :total="store.total"
          :add-data="false"
          row-image="image"
          @set-order="store.setOder"
          @set-row="store.setPerPage"
          @goto="store.setPage"
          @delete-ids="store.deletesData"
          @delete="store.deletesData"
          @find="store.setSearch"
          @search="store.enterSearch"
          @refresh="store.refreshTable"
        >
          <template #header-left-after-search>
            <div class="q-ml-sm">
              <q-select
                v-model="selectBy"
                dense
                outlined
                option-value="id"
                option-label="nama"
                behavior="menu"
                map-options
                emit-value
                :options="optionSelectBy"
                label="Data tampil Menurut"
                style="min-width:200px"
                @update:model-value="changeSelected"
              />
            </div>
          </template>

          <!-- header -->
          <!-- <template #col-nama>
            Nama Pasien
          </template>
          <template #col-rs2>
            No. Nota
          </template>
          <template #col-rs3>
            Tanggal
          </template>
          <template #col-rs23>
            Poli/Ruangan
          </template>
          <template #col-rs1>
            No. Reg Kunjungan
          </template>
          <template #col-norm>
            No. RM
          </template> -->
          <!-- cell -->

          <template #cell-default-img="{row}">
            <div class="row">
              <q-avatar
                size="30px"
                :class="getKelamin(row)==='Laki-laki'?'bg-secondary':'bg-orange'"
              >
                <img :src="getImage(getKelamin(row))">
              </q-avatar>
            </div>
          </template>
          <template #cell-pasien="{row}">
            <div class="text-weight-bold">
              {{ getNama(row) }}
            </div>
            <div class="text-negative text-italic text-weight-bold">
              No RM : {{ getNoRm(row) }}
            </div>
            <q-badge
              outline
              color="primary"
              :label="getLamaBaru(row)"
              class="q-mr-xs"
            />
            <q-badge
              round
              color="primary"
              :label="getUsia(row)+ ' Thn'"
            />
          </template>
          <template #cell-status="{row}">
            {{ getProgress(row) }}
            <!-- <q-badge
              round
              color="primary"
              :label="getUsia(row)+ ' Thn'"
            /> -->
            <!-- <q-linear-progress
              size="25px"
              :value="progress"
              color="accent"
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  text-color="accent"
                  :label="progressLabel"
                />
              </div>
            </q-linear-progress> -->
          </template>
          <template #cell-detail="{row}">
            <div class="column">
              <!-- <div class="flex items-center"> -->
              <div>No.Nota : <i class="text-primary">{{ row.rs2 }}</i></div>
              <div class="text-negative f-12 q-mb-xs">
                Tanggal : {{ humanDate(row.tanggal) }}
              </div>
              <q-badge
                round
                color="primary"
                :label="getRuangan(row)"
              />
              <!-- </div> -->
            </div>
          </template>
          <template #cell-dokter="{row}">
            <div class="q-mb-sm">
              <q-badge
                outline
                color="primary"
                :label="getSistemBayar(row)"
                class="q-mr-xs"
              />
            </div>
            <q-badge
              round
              color="primary"
              :label="row.dokter? row.dokter.rs2:'No Name'"
              class="q-mb-sm"
            />
          </template>
          <template #custom-btn="{row}">
            <q-btn
              round
              flat
              icon="icon-mat-visibility"
              color="grey-8"
              :loading="loadingEye && eye===row"
              @click="previewLaborat(row)"
            >
              <q-tooltip>
                Lihat Detail Permintaan Pemeriksaan
              </q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              :icon="row.rs18 === '1'?'icon-mat-lock':'icon-mat-send'"
              :color="row.rs18 === '1'?'primary':'negative'"
              :loading="loadingKey && x===row"
              @click="kunciPermintaan(row)"
            >
              <q-tooltip>
                <div v-if="row.rs18 !== '1'">
                  Kirim Permintaan ke LIS
                </div>
                <div v-else>
                  Permintaan Terkunci
                </div>
              </q-tooltip>
            </q-btn>
          </template>

          <!-- <template #cell-rs3="{row}">
            {{ humanDate(row.rs3) }}
          </template>
          <template #cell-norm="{row}">
            {{ getNoRm(row) }}
          </template>
          <template #cell-nama="{row}">
            {{ getNama(row) }}
          </template>
          <template #cell-Kunci="{row}">
            {{ row.rs18 }}
          </template>
          <template #cell-rs23="{row}">
            {{ getRuangan(row) }}
          </template>
          <template #cell-tipe="{row}">
            {{ getLamaBaru(row) }}
          </template>
          <template #cell-dokter="{row}">
            {{ row.dokter? row.dokter.rs2:'No Name' }}
          </template> -->
        </app-table-new>
      </q-card-section>
    </q-card>

    <!-- dialog -->
    <DetailPemeriksaanDialog
      v-model="modalDetailOpen"
      :items="pemeriksaanLaborat"
      :total="totalPemeriksaanLaborat"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useTransaksiLaboratTable } from 'src/stores/simrs/penunjang/laborat/transaksi_laborat'
import { humanDate, diffDate, dateBOD } from 'src/modules/formatter'
import DetailPemeriksaanDialog from './DetailPemeriksaanDialog.vue'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

const store = useTransaksiLaboratTable()

store.getDataTable()

const selectBy = ref(1)
const modalDetailOpen = ref(false)
const optionSelectBy = ref([
  { id: 1, nama: 'Pasien Hari ini' },
  { id: 2, nama: 'Pasien Hari ini Sudah' },
  { id: 3, nama: 'Pasien Lalu' },
  { id: 4, nama: 'Pasien Lalu Sudah' }
])
const pemeriksaanLaborat = ref([])
const totalPemeriksaanLaborat = ref(0)

function changeSelected(val) {
  store.setPeriode(val)
}

function getProgress(row) {
  const kunci = row.rs18 === '1'
  const progress = row.rs21
  if (!kunci) {
    return 'Belum terkirim ke LIS'
  }
  return progress ? 'complete' : 'Menunggu Hasil ...'
}

function getNoRm(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  if (kp) {
    return kp.rs2
  } else {
    if (krw) {
      return krw.rs2
    }
  }
  return 'kosong'
}
function getNama(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  if (kp) {
    return kp.pasien.rs2
  } else {
    if (krw) {
      return krw.pasien.rs2
    }
  }
  return 'kosong'
}
function getKelamin(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  if (kp) {
    return kp.pasien.rs17
  } else {
    if (krw) {
      return krw.pasien.rs17
    }
  }
  return '-'
}
function getUsia(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  let usia = 0
  if (kp) {
    usia = kp.pasien.rs16
  } else {
    if (krw) {
      usia = krw.pasien.rs16
    }
  }
  return diffDate(usia)
}
function getBOD(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  let BOD = 0
  if (kp) {
    BOD = kp.pasien.rs16
  } else {
    if (krw) {
      BOD = krw.pasien.rs16
    }
  }
  return dateBOD(BOD)
}
function getAlamat(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  let alamat = '-'
  if (kp) {
    alamat = kp.pasien.rs4 + ' - ' + kp.pasien.rs6
  } else {
    if (krw) {
      alamat = krw.pasien.rs4 + ' - ' + kp.pasien.rs6
    }
  }
  return alamat
}
function getImage(kelamin) {
  return kelamin === 'Laki-laki'
    ? new URL('../../../assets/images/user-avatar.svg', import.meta.url).href
    : new URL('../../../assets/images/actress.svg', import.meta.url).href
}
function getLamaBaru(row) {
  const kp = row.kunjungan_poli
  const krw = row.kunjungan_rawat_inap
  let status = 0
  if (kp) {
    status = kp.pasien.rs31
  } else {
    if (krw) {
      status = krw.pasien.rs31
    }
  }
  if (status > 1) { return 'Lama' }
  return 'Baru'
}

function getRuangan(row) {
  const poli = row.poli
  const krw = row.kunjungan_rawat_inap
  if (poli) {
    return poli.rs2
  } else {
    if (krw) {
      return krw.ruangan.rs2
    }
  }
  return 'kosong'
}
function getSistemBayar(row) {
  const poli = row.poli
  const krw = row.kunjungan_rawat_inap
  if (poli) {
    if (row.kunjungan_poli) {
      return row.kunjungan_poli.sistem_bayar.rs2
    }
    return 'tdk ada'
  } else {
    if (krw) {
      if (row.kunjungan_rawat_inap) {
        return row.kunjungan_rawat_inap.sistem_bayar.rs2
      }
      return 'tdk ada'
    }
  }
  return 'kosong'
}

const loadingEye = ref(false)
const eye = ref(null)

async function previewLaborat(x) {
  loadingEye.value = true
  eye.value = x
  try {
    let details = []
    let mentah = []
    await api.get(`/v1/transaksi_laborats_details?nota=${x.rs2}`).then((resp) => {
      if (resp.data) {
        let x = []
        x = resp.data.map(x =>
          ({
            pemeriksaan_laborat: x.pemeriksaan_laborat,
            hasil: x.rs21,
            biaya: parseInt(x.rs6) + parseInt(x.rs13),
            subtotal: (parseInt(x.rs6) + parseInt(x.rs13)) * parseInt(x.rs5)
          })
        )
        details = x
        mentah = resp.data
        for (let i = 0; i < mentah.length; i++) {
          const obj = mentah[i].pemeriksaan_laborat
          obj.biaya = details[i].biaya
          obj.jumlah = mentah[i].rs5
          obj.subtotal = details[i].subtotal
        }
      }
    })

    // const unique = [...new Set(details)]
    const gr = groupBy(details, paket => paket.pemeriksaan_laborat.rs21)
    console.log(gr)
    pemeriksaanLaborat.value = gr
    totalPemeriksaanLaborat.value = getTotal(gr)
    modalDetailOpen.value = true
    loadingEye.value = false
    eye.value = null
  } catch (error) {
    loadingEye.value = false
    eye.value = null
  }
}

function groupBy(list, keyGetter) {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  const arr = Array.from(map, ([name, value]) => ({ name, value }))
  return arr
}

function getTotal(arr) {
  const paket = arr.map(x => {
    const val = x.value
    let sum = 0
    if (x.name !== '') {
      sum = val[0].subtotal
    } else {
      for (let i = 0; i < val.length; i++) {
        sum = sum + val[i].subtotal
      }
    }
    return sum
  })
  // console.log(paket.reduce((prev, cur) => prev + cur))
  const total = paket.reduce((prev, cur) => prev + cur)

  return total
}

const x = ref(null)
const loadingKey = ref(false)

async function kunciPermintaan(row) {
  if (row.rs18 === '1') {
    return notifErrVue('Maaf permintaan ini sudah terkunci dan terkirim ke LIS')
  }
  // console.log(row)
  x.value = row
  loadingKey.value = true
  try {
    const resp = await api.get(`/v1/transaksi_laborats_details?nota=${row.rs2}`)
    const permintaans = resp.data.map(x => x.pemeriksaan_laborat.rs1)

    const kodeLab = permintaans.join('~')

    const form = {
      PATIENT_NO: getNoRm(row),
      ONO: row.rs2,
      PATIENT_NAME: getNama(row),
      IDENTITY_N: '',
      BOD: getBOD(row),
      SEX: getKelamin(row),
      ADDRESS: getAlamat(row),
      DIAGNOSA: '-',
      GLOBAL_COMMENT: 'laborat-dalam',
      DATE_ORDER: row.rs3,
      DOCTOR: row.dokter.rs1,
      DOCTOR_NAME: row.dokter.rs2,
      CLASS: '',
      CLASS_NAME: '',
      ROOM: row.rs23,
      ROOM_NAME: getRuangan(row),
      COMPANY: '',
      COMPANY_NAME: 'RSUD MOCH SALEH',
      KODE_PRODUCT: kodeLab,
      TYPE_PATIENT: '',
      IS_CITO: '', // nanti disediakan di rs51.rs12 jika ada permintaan
      STATUS: 'N'
    }

    // const token = null
    try {
      await api.post('/v1/transaksi_laborats_kunci_dan_kirim_ke_lis', form).then(response => {
        console.log('kirim ke list')
        notifSuccessVue('Data Success terkirim Ke LIS')
        x.value = null
        loadingKey.value = false
        row.rs18 = '1'
      })
    } catch (error) {
      x.value = null
      loadingKey.value = false
    }

    // console.log(form)
    // await
  } catch (error) {
    console.log(error)
    x.value = null
    loadingKey.value = false
  }

  // const tanggal = row.rs3
  // const nota = row.rs2
}
</script>
