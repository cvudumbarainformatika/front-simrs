<template>
  <VuePDF :src="pdf" />
</template>
<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})
// const { pdf, pages, info } = usePDF(props.src)
const { pdf, pages, info } = usePDF('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf')
console.log('Document has pages', pages)
console.log('Document info: ', info)
// console.log('use pdf ', usePDF(props.src))
console.log('use pdf ', usePDF('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'))
console.log('src ', props.src)
</script>
