<template>
  <q-page>
    <q-card
      bordered
      flat
    >
      <q-card-section>
        <app-table
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
          <template #col-akhirx>
            Terlayani?
          </template>
          <template #cell-default-img="{row}">
            <div class="row">
              <q-avatar
                size="30px"
                :class="row.kelamin==='Laki-laki'?'bg-secondary':'bg-orange'"
              >
                <img :src="getImage(row.kelamin)">
              </q-avatar>
            </div>
          </template>
          <template
            #cell-atas-nama="{row}"
          >
            <div style="width:300px">
              <div class="text-weight-bold">
                {{ row.nama }}
              </div>
              <div class="f-12 text-grey-8 text-italic ellipsis">
                {{ row.alamat }}
              </div>
              <q-badge
                round
                color="primary"
                :label="row.kelamin"
              />
            </div>
          </template>
          <template #cell-permintaan="{row}">
            <div>No.Nota : <i class="text-primary">{{ row.nota }}</i></div>
            <div class="text-negative f-12 q-mb-xs">
              Tanggal : {{ humanDate(row.tgl) }}
            </div>
            <q-badge
              round
              color="primary"
              :label="row.pengirim"
            />
          </template>
          <template #cell-perusahaan="{row}">
            {{ row.perusahaan? row.perusahaan.perusahaan: '-' }}
          </template>
          <template #cell-status="{row}">
            <q-badge
              round
              :color="row.lunas==='1'?'primary':'negative'"
              :label="row.lunas==='1'?'Lunas':'Blm Lunas'"
            />
          </template>
          <template #cell-akhirx="{row}">
            <q-badge
              round
              :color="row.akhirx==='1'?'primary':'negative'"
              :label="row.akhirx==='1'?'Terlayani':'Blm Terlayani'"
            />
          </template>
          <template #custom-btn="{row}">
            <q-btn
              v-if="row.akhir === '1' && row.akhirx==='1'"
              round
              flat
              icon="icon-mat-edit"
              color="grey-8"
              @click="catatanDokter(row)"
            >
              <q-tooltip>
                Catatan Dokter
              </q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              icon="icon-mat-visibility"
              color="grey-8"
              :loading="loadingEye && eye===row"
              class="q-mr-sm"
              @click="previewLaborat(row)"
            >
              <q-tooltip>
                Lihat Detail Permintaan Pemeriksaan
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="row.akhir === '1' && row.akhirx==='1'"
              round
              flat
              icon="icon-mat-print"
              color="grey-8"
              @click="printHasil(row)"
            >
              <q-tooltip>
                Cetak Hasil
              </q-tooltip>
            </q-btn>

            <app-btn
              v-else
              rounded
              :loading="row.nota && loading"
              label="Pengantar"
              @click="printPengantar(row)"
            />

            <!-- DELETE BUTTTON STRICT -->
            <q-btn
              v-if="row.akhir !=='1' && row.lunas !== '1'"
              round
              flat
              icon="icon-mat-delete_sweep"
              color="negative"
              class="q-ml-sm"
              @click="deleteData(row)"
            >
              <q-tooltip>
                Hapus Data
              </q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              :icon="row.akhir === '1'?'icon-mat-lock':'icon-mat-send'"
              :color="row.akhir === '1'?'primary':'negative'"
              :loading="eye=== row && loadingLis"
              @click="kunciPermintaan(row)"
            >
              <q-tooltip>
                <div v-if="row.akhir !== '1'">
                  Kunci Permintaan & kirim ke list
                </div>
                <div v-else>
                  Permintaan terkunci
                </div>
              </q-tooltip>
            </q-btn>
          </template>
        </app-table>
      </q-card-section>
    </q-card>

    <!-- dialog -->
    <!-- dialog -->
    <DetailPemeriksaanLuarDialogVue
      v-model="modalDetailOpen"
      :items="pemeriksaanLaborat"
      :total="totalPemeriksaanLaborat"
    />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePermintaanLuarLaboratTable } from 'src/stores/simrs/penunjang/laborat/permintaanluar/table'
// import { useDetailsLaboratLuar } from 'src/stores/simrs/penunjang/laborat/permintaanluar/details'
import DetailPemeriksaanLuarDialogVue from './DetailPemeriksaanLuarDialog.vue'
import { humanDate } from 'src/modules/formatter'
import { api, SERV } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'
import { useQuasar } from 'quasar'
import AppDialogAlert from 'src/components/~global/AppDialogAlert.vue'
import { useRouter } from 'vue-router'

const store = usePermintaanLuarLaboratTable()
const router = useRouter()
const $q = useQuasar()

onMounted(() => {
  store.getDataTable()
})

function getImage(kelamin) {
  return kelamin === 'Laki-laki'
    ? new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
    : new URL('../../../../assets/images/actress.svg', import.meta.url).href
}

const loading = ref(false)
const modalDetailOpen = ref(false)
const pemeriksaanLaborat = ref([])
const totalPemeriksaanLaborat = ref(0)

function deleteData(row) {
  $q.dialog({
    component: AppDialogAlert,
    componentProps: {
      msg: `Apakah Data dengan Nota ${row.nota} Benar-benar akan dihapus?`,
      color: 'negative'
    }
  }).onOk(() => {
    console.log('OK')
    store.deleteData(row.nota)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

function printPengantar(row) {
  console.log(SERV, row)
  if (!row.pemeriksaan_laborat) {
    return notifErrVue('Maaf, Pemeriksaan ini Tidak Ada')
  }
  window.open(SERV + `/print/page?data=permintaan-laborat-luar&q=${row.nota}`, '_blank', 'width=50%')
}

// const storeDetails = useDetailsLaboratLuar()

function catatanDokter(row) {
  // console.log(SERV, row)
  if (!row.pemeriksaan_laborat) {
    return notifErrVue('Maaf, Pemeriksaan ini Tidak Ada')
  }
  // storeDetails.getRow(row)
  router.push({ name: 'lab.permintaan-luar', params: { page: 'catatan' }, query: { nota: row.nota } })
}
function printHasil(row) {
  console.log(SERV, row)
  if (!row.pemeriksaan_laborat) {
    return notifErrVue('Maaf, Pemeriksaan ini Tidak Ada')
  }
  window.open(SERV + `/print/page?data=hasil-permintaan-laborat-luar&q=${row.nota}`, '_blank', 'width=50%')
}

const loadingEye = ref(false)
const eye = ref(null)

async function previewLaborat(x) {
  loadingEye.value = true
  eye.value = x
  pemeriksaanLaborat.value = []
  let details = []
  let mentah = []
  try {
    await api.get(`/v1/transaksi_laborats_luar_details?nota=${x.nota}`).then((resp) => {
      if (resp.data) {
        // console.log('details', resp.data)
        // modalDetailOpen.value = true
        let x = []
        x = resp.data.map(x =>
          ({
            pemeriksaan_laborat: x.pemeriksaan_laborat,
            kd_lab: x.kd_lab,
            hasil: x.hasil,
            // biaya: parseInt(x.rs6) + parseInt(x.rs13),
            biaya: parseInt(x.tarif_pelayanan) + parseInt(x.tarif_sarana),
            subtotal: (parseInt(x.tarif_pelayanan) + parseInt(x.tarif_sarana)) * parseInt(x.jml)
          })
        )
        // console.log('mapping', x)
        details = x
        mentah = resp.data
        for (let i = 0; i < mentah.length; i++) {
          const obj = mentah[i].pemeriksaan_laborat
          obj.biaya = details[i].biaya
          obj.jumlah = mentah[i].jml
          obj.subtotal = details[i].subtotal
        }
        // console.log('mapping', x)
        // const unique = [...new Set(details)]
        const gr = groupBy(details, paket => paket.pemeriksaan_laborat.rs21)
        pemeriksaanLaborat.value = gr
        console.log('mentah', mentah)
        // console.log('mapping', gr)
        // console.log('details', details)
        totalPemeriksaanLaborat.value = getTotal(gr)
        modalDetailOpen.value = true
        loadingEye.value = false
        eye.value = null
      }

      modalDetailOpen.value = true
    })
  } catch (error) {
    loadingEye.value = false
    eye.value = null
    modalDetailOpen.value = true
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

const loadingLis = ref(false)

async function kunciPermintaan(x) {
  loadingLis.value = true
  eye.value = x
  console.log('kirim permintaan', x)
  if (x.akhir === '') {
    try {
      await api.get(`/v1/transaksi_laborats_luar_kunci_dan_kiri_ke_lis?nota=${x.nota}`).then(resp => {
        console.log('send to list', resp)
        loadingLis.value = false
        eye.value = null
        // store.getDataTable()
        x.akhir = '1'
        notifSuccessVue('Data Success terkirim Ke LIS')
      })
    } catch (error) {
      loadingLis.value = false
      eye.value = null
    }
  } else {
    notifErrVue('Maaf permintaan ini sudah terkunci dan terkirim ke LIS')
    loadingLis.value = false
    eye.value = null
  }
}
</script>
