<template>
  <q-page ref="printRef">
    <q-markup-table
      separator="cell"
      dense
    >
      <thead>
        <tr>
          <th
            class="text-left"
            width="5%"
          >
            No
          </th>
          <th class="text-left">
            Pemeriksaan
          </th>
          <th class="text-right">
            Hasil
          </th>
          <th class="text-right">
            Satuan
          </th>
          <th class="text-right">
            Biaya
          </th>
          <th class="text-right">
            Jml
          </th>
          <th class="text-right">
            Subtotal
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="n in 15"
          :key="n"
        >
          <td colspan="7">
            Percobaan
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>
<script setup>
// import { useRoute } from 'vue-router'

// const route = useRoute()
// const prtHtml = document.getElementById('print').innerHTML

// Get all stylesheets HTML
// let stylesHtml = ''
// for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
//   stylesHtml += node.outerHTML
// }

// Open the print window
// const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')

// WinPrint.document.write(`<!DOCTYPE html>
// <html>
//   <head>
//     ${stylesHtml}
//   </head>
//   <body>
//     ${prtHtml}
//   </body>
// </html>`)

// WinPrint.document.close()
// WinPrint.focus()
// WinPrint.print()
// WinPrint.close()
// window.document.close()
// window.focus()
window.print()
// window.close()
</script>
