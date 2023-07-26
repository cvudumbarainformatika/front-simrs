import Print from 'vue3-print-nb'
import VueApexCharts from 'vue3-apexcharts'
import JsonExcel from 'vue-json-excel3'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import VueHtmlToPaper from 'vue-html-to-paper'
// import VuePdf from 'vue3-pdfjs'

export default async ({ app }) => {
  app.use(Print)
  app.use(VueApexCharts)
  app.use(VueHtmlToPaper)
  app.component('DownloadExcel', JsonExcel)
  app.component(VueQrcode.name, VueQrcode)
  // app.use(VuePdf)
}
