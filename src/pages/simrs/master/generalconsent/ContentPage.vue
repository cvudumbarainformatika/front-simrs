<template>
  <div>
    <q-editor
      id="content-editor"
      ref="refQeditor"
      v-model="editor"
      toolbar-bg="primary"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      content-class="content-editor-A4"
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
              @click="insertComponent('q-btn', { label: 'ayooo'})"
            >
              <q-item-section side>
                <q-icon name="icon-mat-visibility" />
              </q-item-section>
              <q-item-section>q-icon with shopping_cart name prop</q-item-section>
            </q-item>
            <q-item
              tag="label"
              clickable
              @click="insertComponent('q-circular-progress', { indeterminate: true})"
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

    <div
      ref="renderComponent"
    >
      <component :is="renderThisComponent" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
// import { useCounter } from 'src/composable/counter'
// import AddImage from 'src/components/~componentEditor/AddImage.vue'
const style = useStyledStore()
// const { counter, increment } = useCounter()
const refQeditor = ref()
const renderComponent = ref()
const renderThisComponent = ref('q-btn')
const renderThisProps = ref({})
const token = ref()
const editor = ref('Select some text,' +
        ' then select a highlight or text color!')

const foreColor = ref('#000000')
const highlight = ref('#ffff00aa')

onMounted(() => {
  console.log(refQeditor.value.$el.children[0])
  refQeditor.value.$el.children[0].classList.add('fixed--toolbar')
})

function pageFull() {
  style.setComponentFull()
}

async function insertComponent(name, props) {
  const edit = refQeditor.value
  const render = renderComponent.value
  // console.log(render)
  renderThisComponent.value = name
  renderThisProps.value = props
  // Must let Vue render the component we changed above...
  // nextTick(() => {
  await nextTick()
  edit.caret.restore()
  edit.runCmd('insertHTML', render.innerHTML)
  edit.focus()
  //   console.log('next')
  // })
  // edit.focus()
}
// const Profile = {
//   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
//   data() {
//     return {
//       firstName: 'Walter',
//       lastName: 'White',
//       alias: 'Heisenberg'
//     }
//   }
// }

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
</style>
