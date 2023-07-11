<template>
  <q-editor
    id="content-editor"
    ref="refQeditor"
    v-model="editor"
    toolbar-bg="primary"
    toolbar-text-color="white"
    toolbar-toggle-color="yellow-8"
    content-class="content-editor-A4 bg-white"
    placeholder="Ketik disini ..."
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
      },

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
      ['viewsource','print','image','save', 'fullscreen'],

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
  >
    <template #token>
      <q-btn-dropdown
        ref="token"
        dense
        no-caps
        no-wrap
        unelevated
        color="white"
        text-color="primary"
        label="Text Color"
        size="sm"
      >
        <q-list dense>
          <q-item
            v-close-popup
            tag="label"
            clickable
            @click="colorChange('backColor', highlight)"
          >
            <q-item-section side>
              <q-icon name="icon-mat-highlight" />
            </q-item-section>
            <q-item-section>
              <q-color
                v-model="highlight"
                default-view="palette"
                no-header
                no-footer
                :palette="[
                  '#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
                  '#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', '#e6ccffaa', '#ffccffaa', '#ff0000aa', '#ff8000aa', '#ffff00aa', '#00ff00aa', '#00ff80aa', '#00ffffaa', '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
                ]"
                class="my-picker"
              />
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            clickable
            @click="colorChange('foreColor', foreColor)"
          >
            <q-item-section side>
              <q-icon name="icon-mat-format_paint" />
            </q-item-section>
            <q-item-section>
              <q-color
                v-model="foreColor"
                no-header
                no-footer
                default-view="palette"
                :palette="[
                  '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'
                ]"
                class="my-picker"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template #custom_btn>
      <q-btn-dropdown
        dense
        no-caps
        no-wrap
        unelevated
        color="white"
        text-color="primary"
        label="Insert Quasar Components"
        size="sm"
      >
        <q-list dense>
          <q-item
            tag="label"
            clickable
            @click="insertComponent('q-btn', { label: 'ayooo', color:'primary'})"
          >
            <q-item-section side>
              <q-icon name="icon-mat-visibility" />
            </q-item-section>
            <q-item-section>q-icon with shopping_cart name prop</q-item-section>
          </q-item>
          <q-item
            tag="label"
            clickable
            @click="insertComponent('app-btn', { label: 'ayooo22', color:'primary'})"
          >
            <q-item-section side>
              <q-icon name="icon-mat-stars" />
            </q-item-section>
            <q-item-section>q-circular-progress with lots of props</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-editor>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
// import { useCounter } from 'src/composable/counter'
// import AddImage from 'src/components/~componentEditor/AddImage.vue'
const style = useStyledStore()
// const { counter, increment } = useCounter()
const refQeditor = ref()
const token = ref()
const editor = ref('Select some text,' +
        ' then select a highlight or text color!')

const foreColor = ref('#000000')
const highlight = ref('#ffff00aa')

onMounted(() => {
  // console.log(refQeditor.value)
  const toolbar = refQeditor.value.$el.children[0]
  toolbar.classList.add('fixed--toolbar')
  toolbar.firstChild.classList.remove('no-wrap')
  // refQeditor.value.$el.children[0].$el.children[0].classList.remove('no-wrap')
  console.log(toolbar.firstChild.classList)
})

function pageFull() {
  style.setComponentFull()
}

// function getUniqueName(prefix) {
//   let uniqueId = null
//   if (!uniqueId) uniqueId = (new Date()).getTime()
//   return (prefix || 'id') + (uniqueId++)
// };

// const createMyApp = (options) => {
//   const app = createApp(options)
//   app.directive('focus' /* ... */)

//   return app
// }

function insertComponent(name, props) {
  const edit = refQeditor.value
  // const uniq = getUniqueName('comp')
  const AddImage = defineAsyncComponent(() => import('../~componentEdior/AddImage.vue'))
  // await nextTick()
  edit.caret.restore()
  edit.runCmd('insertHTML', AddImage)
  // createMyApp(AddImage).mount(`#${uniq}`)
  // edit.focus()
}

function Saved() {
  console.log('ok')
}
function colorChange(cmd, name) {
  const edit = refQeditor.value
  token.value.hide()
  edit.caret.restore()
  edit.runCmd(cmd, name)
  edit.focus()
  // console.log(edit)
}
function pilihImage() {
  console.log('image')
  const edit = refQeditor.value
  edit.caret.restore()
  edit.runCmd('insertHTML',
    insertImage())
}
function pasteCapture(evt) {
  console.log('paste', evt)
}
function dropCapture(evt) {
  console.log('drop', evt)
}

function insertImage() {
  return '`<span class="img-wrapper"><img on src="http://dummyimage.com/160x90"></span>`'
}
</script>

<style lang="scss">
.editor_token{
  background: rgba(0, 0, 0, .6);
  color: white;
  padding: 3px;
}

.fixed--toolbar.q-editor__toolbars-container {
    position: fixed;
    top: 0;
    width: 100%;
}

.content-editor-A4{
  background: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  // margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  // width: 21cm;
  width: 595pt;
  height: auto;
}

.q-editor__content hr {
    border: 0;
    outline: 0;
    margin: 1px;
    height: 1px;
    background: rgba(0, 0, 0, 0.5);

}

.q-editor__content p {
  img{
    border: 4px solid black;
    cursor: pointer;
  }
}

@media print {
  .content-editor-A4{
    margin: 0;
  }
}
</style>
