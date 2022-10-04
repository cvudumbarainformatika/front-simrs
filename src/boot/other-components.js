import Print from 'vue3-print-nb'
import VueApexCharts from 'vue3-apexcharts'

export default async ({ app }) => {
  app.use(Print)
  app.use(VueApexCharts)
}
