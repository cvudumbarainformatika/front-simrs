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
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      text-cari="Cari ..."
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
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
      <template #col-tanggal>
        <div>Tanggal</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-total>
        <div>Jumlah</div>
      </template>
      <template #col-oleh>
        <div>Oleh</div>
      </template>

      <template #cell-tanggal="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans
          </div>
          <div>
            {{ row.tgl_trans ? dateFullFormat(row.tgl_trans):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Bast
          </div>
          <div>
            {{ row.tgl_bast ? dateFullFormat(row.tgl_bast):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pencairan NPK
          </div>
          <div>
            {{ row.tgl_pencairan_npk ? dateFullFormat(row.tgl_pencairan_npk):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembaayaran
          </div>
          <div>
            {{ row.tgl_pembayaran ? dateFullFormat(row.tgl_pembayaran):'-' }}
          </div>
        </div>
      </template>
      <template #cell-nomor="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Trans List
          </div>
          <div class=" text-weight-bold">
            {{ row.notranskonsi??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Bast
          </div>
          <div class=" text-weight-bold">
            {{ row.nobast??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            NPD
          </div>
          <div class=" text-weight-bold">
            {{ row.no_npd??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Kwitansi
          </div>
          <div class=" text-weight-bold">
            {{ row.no_kwitansi??'-' }}
          </div>
        </div>
      </template>
      <template #cell-penyedia="{ row }">
        <div class="row justify-between no-wrap">
          {{ row?.penyedia?.nama ?? '-' }}
        </div>
      </template>

      <template #cell-total="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans Konsi
          </div>
          <div :class="parseFloat(row?.jumlah_konsi)>0?'text-weight-bold':''">
            {{ formatDouble(row?.jumlah_konsi,2)??0 }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            BAST
          </div>
          <div :class="parseFloat(row?.jumlah_bast)>0?'text-weight-bold':''">
            {{ formatDouble(row?.jumlah_bast,2)??0 }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembayaran
          </div>
          <div :class="parseFloat(row?.nilai_pembayaran)>0?'text-weight-bold':''">
            {{ formatDouble(row?.nilai_pembayaran,2)??0 }}
          </div>
        </div>
      </template>
      <template #cell-oleh="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans Konsi
          </div>
          <div>
            {{ row?.konsi?.nama?? '-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            BAST
          </div>
          <div>
            {{ row?.bast?.nama?? '-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembayaran
          </div>
          <div>
            {{ row?.bayar?.nama?? '-' }}
          </div>
        </div>
      </template>

      <template #expand="{ row }">
        <div v-if="row.rinci?.length">
          <div class="row items-center text-weight-bold">
            <div class="col-1 ">
              No
            </div>
            <div class="col-3 ">
              Obat
            </div>
            <div class="col-3 ">
              Identitas
            </div>
            <div class="col-3 ">
              Nomor
            </div>
            <div class="col-2 text-right">
              Jumlah
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm">
              <div class="col-1">
                {{ i+1 }}
              </div>
              <div class="col-3">
                <div class="row wrap" style="white-space: normal;">
                  {{ rin?.obat?.nama_obat }}
                </div>
                <div class="row f-10 text-italic">
                  {{ rin?.kdobat }}
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Pasien
                  </div>
                  <div class="">
                    {{ rin?.pasien?.rs2 }}
                  </div>
                  <div class="f-10 text-italic">
                    ({{ rin?.noreg }})
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Dokter
                  </div>
                  <div class="">
                    {{ rin?.iddokter?.nama }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Penerimaan
                  </div>
                  <div class="text-weight-bold text-primary">
                    {{ rin?.nopenerimaan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Permintaan OP
                  </div>
                  <div class="text-weight-bold text-orange">
                    {{ rin?.nopermintaan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Resep
                  </div>
                  <div class="text-weight-bold text-green">
                    {{ rin?.noresep }}
                  </div>
                </div>
              </div>
              <div class="col-2 text-right">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Jumlah
                  </div>
                  <div class="">
                    {{ rin?.jumlah }} ({{ rin?.obat?.satuan_k }})
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Harga
                  </div>
                  <div class="">
                    {{ formatDouble(rin?.harga_net,2) }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    subtotal
                  </div>
                  <div class="text-weight-bold">
                    {{ formatDouble(rin?.subtotal,2) }}
                  </div>
                </div>
              </div>
            </div>
            <q-separator />
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListBastObatKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listbastkonsinyasi'
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'

const store = useListBastObatKonsinyasiStore()
store.getInitialData()

function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

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
