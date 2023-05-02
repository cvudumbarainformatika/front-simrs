import Print from 'vue3-print-nb'
import VueApexCharts from 'vue3-apexcharts'
// import VuePdf from 'vue3-pdfjs'

export default async ({ app }) => {
  app.use(Print)
  app.use(VueApexCharts)
  // app.use(VuePdf)
}
