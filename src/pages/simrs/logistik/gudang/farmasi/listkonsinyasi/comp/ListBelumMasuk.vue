<template>
  <div ref="content" class="q-pa-xs bg-white fullheight fullwidth">
    <app-table-extend
      id="printMe"
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      :ada-paginasi="false"
      row-no
      use-full
      text-cari="Cari ..."
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
    >
      <!-- @edit-data="store.editData" -->
      <!--
              row-image="image"
              @delete-ids="table.deletesData"
              -->

      <template #header-right-before>
        <div class="q-mr-md text-white">
          <!-- <q-btn
              round
              class="f-10 q-mr-sm"
              color="dark"
              text-color="white"
              icon="icon-mat-download"
              @click="printToPdf()"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Download PDF
              </q-tooltip>
            </q-btn> -->
          <q-btn
            v-print="printObj"
            round
            class="f-10 q-mr-sm"
            color="dark"
            text-color="white"
            icon="icon-mat-print"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Print, pilih save as pdf
            </q-tooltip>
          </q-btn>
        </div>
      </template>
      <template #col-nomor>
        <div>Nomor</div>
      </template>
      <template #col-obat>
        <div>Obat</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-nopermintaan>
        <div>No Permintaan Operasi</div>
      </template>
      <template #col-nopenerimaan>
        <div>Nomor Penerimaan</div>
      </template>
      <template #col-dipakai>
        <div>Jumlah Dipakai</div>
      </template>
      <template #col-harga>
        <div>Harga Penerimaan</div>
      </template>
      <template #col-subtotal>
        <div>Subtotal</div>
      </template>

      <template #cell-nomor="{ row }">
        <div class="row wrap text-weight-bold text-primary">
          {{ row?.nopenerimaan }}
        </div>
        <div class="row wrap text-weight-bold text-green">
          {{ row?.nopermintaan }}
        </div>
      </template>
      <template #cell-penyedia="{ row }">
        <div class="row no-wrap text-weight-bold text-primary">
          {{ row?.pbf?.nama ?? '-' }}
        </div>
        <div class="row wrap text-weight-bold text-green">
          {{ row?.persiapan?.pasien?.rs2 }}
        </div>
      </template>

      <template #cell-obat="{ row }">
        <div class="row wrap ">
          {{ row.nama_obat??'-' }}
        </div>
        <div class="row wrap text-italic f-10">
          {{ row.kd_obat??'-' }}
        </div>
      </template>
      <template #cell-dipakai="{ row }">
        <div class="row wrap justify-end">
          <div class="col-auto q-mr-sm">
            {{ row.dipakai }}
          </div>
          <div class="col-auto text-italic">
            ({{ row.satuan }})
          </div>
        </div>
        <div class="row no-wrap justify-between">
          <div class="col-auto q-mr-sm">
            Harga
          </div>
          <div class="col-auto ">
            {{ formatDouble(row.harga_net,2) }}
          </div>
        </div>
        <div class="row no-wrap justify-between">
          <div class="col-auto q-mr-sm">
            Subtotal
          </div>
          <div class="col-auto text-weight-bold">
            {{ formatDouble(row.sub,2) }}
          </div>
        </div>
      </template>
      <template #custom-btn="{ row }">
        <div class="row wrap justify-end">
          <div v-if="row.dibayar==='1'" class="col-auto">
            <q-btn
              flat
              dense
              round
              color="negative"
              :loading="row.loading"
              :disable="row.loading"
              icon="icon-mat-delete_sweep"
              @click="store.hapusDibayar(row)"
            >
              <q-tooltip>Hapus tanda sudah dibayar</q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListBelumMasukKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listbelum'
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'

const store = useListBelumMasukKonsinyasiStore()
store.getInitialData()

// function onClick (val) {
//   // console.log('click', val)
//   val.item.expand = !val.item.expand
//   val.item.highlight = !val.item.highlight
// }

// eslint-disable-next-line no-unused-vars
const content = ref(null)
// eslint-disable-next-line no-unused-vars
function printToPdf () {
  setTimeout(function () {
    console.log('cont', content.value?.innerHtml)
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'px',
      format: 'legal',
      hotfixes: ['px_scaling']
    })
    const source = content.value

    // doc.html(source, {
    //   callback: function (pdf) {
    //     doc.addImage(pathImg + pasien?.value.ttdpasien, 'JPEG', 15, 40, 200, 114)
    //     // doc.output('datauri')
    //     pdf.save()
    //   }
    // })
    console.log('width', doc.internal.pageSize.getWidth())
    html2canvas(source, {
      width: doc.internal.pageSize.getWidth(),
      height: doc.internal.pageSize.getHeight(),
      logging: false,
      letterRendering: 1,
      allowTaint: false,
      useCORS: false
    }).then((canvas) => {
      const img = canvas.toDataURL('image/jpeg', 0.8)

      doc.addImage(img, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'FAST')
      doc.save('List ' + '.pdf')

      //   const pdf = new File([doc.output('arraybuffer')], pasien?.value?.norm + '.pdf', { type: 'application/pdf' })
      // const pdf = new File([doc.output('arraybuffer')], pasien?.value?.norm + '.jpg', { type: 'application/jpg' })
      //   simpanPdf(pdf)
    })
  }, 100)
}
const printObj = {
  id: 'printMe',
  popTitle: 'List Bast',
  extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css'
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
  <style lang="scss" scoped>
  $fs : 9px;
  .app-table {
    width: 100%; /* print width */
    font-size:$fs;

    .q-table td {
      padding-left: 10px;
      font-size: $fs;
    }
    .q-table th {
      padding-left: 10px;
      font-size: $fs;
    }
  }

  @media print {
    .app-table {
      width: 100%; /* print width */
      font-size:$fs;

      .q-table {
          max-width: 100% !important;
        }
      .q-table td {
        padding: 2px;
        font-size: $fs;
         white-space: normal !important;
          word-wrap: normal !important;
          hyphens: manual;
      }
      .q-table th {
        padding:2px;
        font-size:$fs;
        white-space: normal !important;
          word-wrap: normal !important;
          hyphens: manual;
      }

      .screenwide{
        max-width: 100% !important;
      }
    }
  }

  </style>
