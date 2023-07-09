<template>
  <div>
    <q-editor
      ref="refQeditor"
      v-model="editor"
      toolbar-bg="primary"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      content-class="content-editor-A4"
      min-height="842pt"
      :definitions="{
        fullpage: {
          tip: 'Layar Penuh',
          icon: `${!style.componentfull?'icon-mat-fullscreen':'icon-mat-close_fullscreen'}`,
          handler: pageFull
        },
        save: {
          tip: 'Simpan',
          icon: 'icon-mat-save',
          label: 'Simpan',
          handler: Saved
        },
        image: {
          tip: 'Pilih Gambar',
          icon: 'icon-mat-cloud_upload',
          // label: 'Upload',
          handler: pilihImage
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['left', 'center', 'right', 'justify'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'p',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        // ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['quote', 'unordered', 'ordered'],
        ['undo', 'redo'],
        ['viewsource','print','image','save', 'fullpage'],

      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      @paste="evt => pasteCapture(evt)"
      @drop="evt => dropCapture(evt)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
const style = useStyledStore()

const refQeditor = ref()
const editor = ref('Isi Editor')

onMounted(() => {
  console.log(refQeditor.value.$el.children[0])
  refQeditor.value.$el.children[0].classList.add('fixed--toolbar')
})

function pageFull() {
  style.setComponentFull()
}

function Saved() {
  console.log('ok')
}
function pilihImage() {
  console.log('image')
  const edit = refQeditor.value
  edit.runCmd('insertHTML',
    '&nbsp;<div class="editor_token cursor-pointer" contenteditable="false" onhover="coba">&nbsp;<span>percobaan</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">X</i></div>&nbsp;')
}
function pasteCapture(evt) {
  console.log('paste', evt)
}
function dropCapture(evt) {
  console.log('drop', evt)
}
</script>

<style lang="scss">
.editor_token{
  background: rgba(0, 0, 0, .6);
  color: white;
  padding: 3px;
}
</style>
