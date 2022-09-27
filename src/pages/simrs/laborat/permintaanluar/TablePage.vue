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
          <template #cell-atas-nama="{row}">
            <div class="text-weight-bold">
              {{ row.nama }}
            </div>
            <div class="f-12 text-grey-8 text-italic ">
              {{ row.alamat }}
            </div>
            <q-badge
              round
              color="primary"
              :label="row.kelamin"
            />
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
              round
              flat
              :icon="row.akhir === '1'?'icon-mat-lock':'icon-mat-lock_open'"
              :color="row.akhir === '1'?'primary':'negative'"
            >
              <q-tooltip>
                Permintaan dikunci
              </q-tooltip>
            </q-btn>

            <q-btn
              v-if="row.akhir === '1' && row.akhirx==='1'"
              round
              flat
              icon="icon-mat-print"
              color="grey-8"
              @click="previewLaborat(row)"
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
          </template>
        </app-table>
      </q-card-section>
    </q-card>

    <!-- dialog -->
    <!-- dialog -->
    <DetailPemeriksaanLuarDialogVue
      id="printMe"
      v-model="modalDetailOpen"
      :items="pemeriksaanLaborat"
      :total="totalPemeriksaanLaborat"
    />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePermintaanLuarLaboratTable } from 'src/stores/simrs/penunjang/laborat/permintaanluar/table'
import DetailPemeriksaanLuarDialogVue from './DetailPemeriksaanLuarDialog.vue'
import { humanDate } from 'src/modules/formatter'
import { api, SERV } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
// import { useRouter } from 'vue-router'

const store = usePermintaanLuarLaboratTable()
// // const router = useRouter()

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

// const printObj = ref(
//   {
//     url: 'http://localhost:9000/print/page/permintaan-laborat-luar',
//     beforeOpenCallback (vue) {
//       console.log('打开之前')
//     },
//     openCallback (vue) {
//       console.log('执行了打印')
//     },
//     closeCallback (vue) {
//       console.log('关闭了打印工具')
//     }
//   }
// )

// const printObj = ref(
//   {
//     url: 'http://localhost/api.laborat/public',
//     beforeOpenCallback (vue) {
//       console.log('打开之前')
//     },
//     openCallback (vue) {
//       console.log('执行了打印')
//     },
//     closeCallback (vue) {
//       console.log('关闭了打印工具')
//     }
//   }
// )

function printPengantar(row) {
  console.log(SERV, row)
  if (!row.pemeriksaan_laborat) {
    return notifErrVue('Maaf, Pemeriksaan ini Tidak Ada')
  }
  window.open(SERV + `/print/page?data=permintaan-laborat-luar&q=${row.nota}`, '_blank', 'width=50%')
}

async function previewLaborat(x) {
  // console.log('coba', x)
  pemeriksaanLaborat.value = []
  loading.value = true
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
        const gr = groupBy(details, paket => paket.kd_lab)
        pemeriksaanLaborat.value = gr
        console.log('mentah', mentah)
        // console.log('mapping', gr)
        // console.log('details', details)
        totalPemeriksaanLaborat.value = getTotal(gr)
        modalDetailOpen.value = true
        loading.value = false
      }

      modalDetailOpen.value = true
    })
  } catch (error) {
    loading.value = false
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
</script>
