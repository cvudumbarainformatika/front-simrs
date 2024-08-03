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
        handler: insertImage
      },

    }"
    :toolbar="toolbar"
    :fonts="fonts"
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
  </q-editor>
  <div
    v-show="false"
    ref="renderC"
  >
    <component
      :is="renderTheseComponent"
      v-bind="renderTheseProps"
    />
  </div>
  <app-dialog
    v-model="dialogImage"
    label="File Image Manager"
    @on-ok="getImage"
  >
    <template #default>
      <app-gallery @select-image="imageGetter" />
    </template>
  </app-dialog>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useToolbar } from 'src/components/~componentEdior/toolbars/toolbar'
import { notifErrVue } from 'src/modules/utils'

const style = useStyledStore()
const { toolbar, fonts } = useToolbar()
const refQeditor = ref()
const token = ref()
const editor = ref('Select some text,' + ' then select a highlight or text color!')
const renderC = ref()
const renderTheseComponent = ref('q-btn')
const renderTheseProps = ref({})
const dialogImage = ref(false)
const imageSelected = ref(null)

const foreColor = ref('#000000')
const highlight = ref('#ffff00aa')

onMounted(() => {
  // console.log(refQeditor.value)
  const toolbar = refQeditor.value.$el.children[0]
  toolbar.classList.add('fixed--toolbar')
  toolbar.firstChild.classList.remove('no-wrap')
  console.log(toolbar.firstChild.classList)
  imageSelected.value = null
})

function pageFull () {
  style.setComponentFull()
}

async function insertComponent (name, props) {
  const edit = refQeditor.value
  const render = renderC.value
  renderTheseComponent.value = name
  renderTheseProps.value = props
  await nextTick()
  edit.caret.restore()
  edit.runCmd('insertHTML', render.innerHTML)
  edit.focus()
}

function insertImage () {
  dialogImage.value = true
}
function imageGetter (val) {
  imageSelected.value = val
}
function getImage () {
  // console.log(e)

  if (imageSelected.value === null) {
    return notifErrVue('pilih Gambar terlebih dahulu')
  }
  insertComponent('add-image', { url: imageSelected.value, width: 100, ref: uniqueI('id') })

  dialogImage.value = false
}
function uniqueI (prefix) {
  let uniqueId = null
  if (!uniqueId) uniqueId = (new Date()).getTime()
  return (prefix || 'id') + (uniqueId++)
}

function Saved () {
  console.log('ok')
}
function colorChange (cmd, name) {
  const edit = refQeditor.value
  token.value.hide()
  edit.caret.restore()
  edit.runCmd(cmd, name)
  edit.focus()
  // console.log(edit)
}

function pasteCapture (evt) {
  console.log('paste', evt)
}
function dropCapture (evt) {
  console.log('drop', evt)
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
