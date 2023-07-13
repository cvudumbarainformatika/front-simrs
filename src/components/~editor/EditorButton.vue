<template>
  <div
    v-if="editor"
    class="fixed-top full-width"
    style="z-index: 1;"
  >
    <div class="row items-center bg-grey-2">
      <div class="col-auto">
        <div class="row items-center q-gutter-xs q-py-xs">
          <!-- <add-more-btn
        @code-block="editor.chain().focus().toggleCodeBlock().run()"
      /> -->

          <menu-bar-btn
            class="q-ml-sm"
            icon="icon-mat-save"
            tooltip="Simpan"
            :active="onUpdateEditor"
          />
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-undo"
            tooltip="kembali -1 langkah"
            @click="editor.chain().focus().undo().run()"
          />
          <menu-bar-btn
            icon="icon-mat-redo"
            tooltip="kembali +1 langkah"
            @click="editor.chain().focus().redo().run()"
          />
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-format_bold"
            :active="editor.isActive('bold')"
            tooltip="Huruf Tebal"
            @click="editor.chain().focus().toggleBold().run()"
          />
          <menu-bar-btn
            icon="icon-mat-format_italic"
            tooltip="Huruf Miring"
            :active="editor.isActive('italic')"
            @click="editor.chain().focus().toggleItalic().run()"
          />
          <menu-bar-btn
            icon="icon-mat-format_underlined"
            tooltip="Garis Bawah"
            :active="editor.isActive('underline')"
            @click="editor.chain().focus().toggleUnderline().run()"
          />
          <menu-bar-btn
            icon="icon-mat-strikethrough_s"
            tooltip="Garis tengah"
            :active="editor.isActive('strike')"
            @click="editor.chain().focus().toggleStrike().run()"
          />
          <menu-bar-btn
            icon="icon-mat-code"
            tooltip="Model Code"
            :active="editor.isActive('code')"
            @click="editor.chain().focus().toggleCode().run()"
          />
          <q-separator
            vertical
          />

          <!-- <heading-dropdown
        :headings="headings"
        icon="icon-mat-format_size"
        @paragraph="editor.chain().focus().setParagraph().run()"
        @heading="handleClickHeading"
      /> -->
          <btn-menu
            :items="headings"
            :item="heading"
            @set-text="handleClickHeading"
          />
          <heading-dropdown
            :headings="aligns"
            :item="align"
            avatar
            tooltip="Align format"
            @heading="handleAlign"
          />
          <btn-dropdown-color
            icon="icon-mat-text_format"
            @set-color="(val)=> editor.chain().focus().toggleHighlight({ color: val }).run()"
          />
          <btn-dropdown-color
            icon="icon-mat-edit"
            @set-color="(val)=> editor.chain().focus().setColor(val).run()"
          />
          <menu-bar-btn
            icon="icon-mat-subscript"
            tooltip="Subscript"
            :active="editor.isActive('subscript')"
            @click="editor.chain().focus().toggleSubscript().run()"
          />
          <menu-bar-btn
            icon="icon-mat-superscript"
            tooltip="Superscript"
            :active="editor.isActive('superscript')"
            @click="editor.chain().focus().toggleSuperscript().run()"
          />
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-format_quote"
            tooltip="Quote"
            :active="editor.isActive('blockquote')"
            @click="editor.chain().focus().toggleBlockquote().run()"
          />
          <menu-bar-btn
            icon="icon-mat-font_download"
            tooltip="Code Block"
            :active="editor.isActive('codeBlock')"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          />
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-format_list_bulleted"
            tooltip="Format list Bullet"
            :active="editor.isActive('bulletList')"
            @click="editor.chain().focus().toggleBulletList().run()"
          />
          <menu-bar-btn
            icon="icon-mat-format_list_numbered"
            tooltip="Format list Nomor"
            :active="editor.isActive('orderedList')"
            @click="editor.chain().focus().toggleOrderedList().run()"
          />
          <menu-bar-btn
            icon="icon-mat-check"
            tooltip="List Check"
            :active="editor.isActive('taskList')"
            @click="editor.chain().focus().toggleTaskList().run()"
          />
          <menu-bar-btn
            icon="icon-mat-horizontal_rule"
            tooltip="Garis Mendatar"
            @click="editor.chain().focus().setHorizontalRule().run()"
          />
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-format_clear"
            tooltip="Format Clear"
            @click="editor.chain().focus().unsetAllMarks().run()"
          />
          <menu-bar-btn
            icon="icon-mat-clear_all"
            tooltip="Clear Fiture"
            @click="editor.chain().focus().clearNodes().run()"
          />
          <q-separator
            vertical
          />
          <!-- <menu-bar-btn
        icon="icon-mat-image"
        tooltip="masukkan gambar"
      /> -->
          <menu-bar-btn
            icon="icon-mat-insert_photo"
            tooltip="gallery & upload gambar"
            @click="dialogGallery"
          />

          <!-- <menu-bar-btn
        icon="icon-my-word"
        tooltip="upload doc word"
        @click="pickFile"
      />
      <q-file
        ref="refWord"
        v-model="word"
        label="Word"
        dense
        accept=".doc, .docx"
        class="hidden"
        @update:model-value="startImport"
      /> -->
          <q-separator
            vertical
          />
          <menu-bar-btn
            icon="icon-mat-abc"
            tooltip="Ubah Font"
            @click="editor.chain().focus().setFontFamily('Inter').run()"
          />
          <q-separator
            vertical
          />

          <menu-bar-btn
            icon="icon-mat-table_view"
            tooltip="Table View"
            @click="editor.chain().focus().insertTable({ rows: 1, cols: 2, withHeaderRow: false }).run()"
          />
          <menu-bar-btn
            icon="icon-mat-backup_table"
            tooltip="Delete Table"
            @click="editor.chain().focus().deleteTable().run()"
          />
          <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
        </div>
      </div>
      <div class="col ">
        <div class="flex justify-end">
          <q-separator
            vertical
          />
          <menu-bar-btn
            class="q-mx-sm"
            :icon="fullpage?'icon-mat-close_fullscreen':'icon-mat-fullscreen'"
            tooltip="Full Page"
            :active="onUpdateEditor"
            @click="emits('onFullPage')"
          />
        </div>
      </div>
    </div>

    <!-- dialog gallery -->
    <app-dialog
      v-model="dialogImage"
      label="File Image Manager"
      @on-ok="getImage"
    >
      <template #default>
        <app-gallery @select-image="imageGetter" />
      </template>
    </app-dialog>
  </div>
</template>
<script setup>
// import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'

// import AddMoreBtn from 'src/components/~editor/components/AddMoreBtn.vue'
import MenuBarBtn from './components/MenuBarBtn.vue'
import HeadingDropdown from 'src/components/~editor/components/HeadingDropdown.vue'
import BtnMenu from './components/BtnMenu.vue'
import BtnDropdownColor from './BtnDropdownColor.vue'

const props = defineProps({
  editor: {
    type: Object,
    default: null
  },
  onUpdateEditor: {
    type: Boolean, default: false
  },
  fullpage: {
    type: Boolean, default: false
  }
})

onMounted(() => {
  heading.value = headings.value[0]
  align.value = aligns.value[0]
})

const emits = defineEmits(['onimportword', 'onFullPage'])

// const word = ref(null)
// const refWord = ref(null)
const dialogImage = ref(false)

const imageSelected = ref(null)

const heading = ref(null)
const headings = ref([
  { label: 'Paragraph', icon: 'Tt', value: 'p' },
  { label: 'Heading 1', icon: 'H1', value: 1 },
  { label: 'Heading 2', icon: 'H2', value: 2 },
  { label: 'Heading 3', icon: 'H3', value: 3 },
  { label: 'Heading 4', icon: 'H4', value: 4 },
  { label: 'Heading 5', icon: 'H5', value: 5 },
  { label: 'Heading 6', icon: 'H6', value: 6 }
])
function handleClickHeading(val) {
  if (val.value === 'p') {
    props.editor.chain().focus().setParagraph().run()
  } else {
    props.editor.chain().focus().toggleHeading({ level: val.value }).run()
  }

  heading.value = val
}

const align = ref(null)
const aligns = ref([
  { label: 'left', icon: 'icon-mat-format_align_left', value: 'left' },
  { label: 'right', icon: 'icon-mat-format_align_right', value: 'right' },
  { label: 'center', icon: 'icon-mat-format_align_center', value: 'center' },
  { label: 'justify', icon: 'icon-mat-format_align_justify', value: 'justify' }
])
function handleAlign(val) {
  align.value = val
  props.editor.chain().focus().setTextAlign(val.value).run()
}
// const listsMenu = ref([
//   { link: 'Upload Gambar', icon: 'cloud' },
//   { link: 'Gallery', icon: 'collections' }
// ])

function uniqueI(prefix) {
  let uniqueId = null
  if (!uniqueId) uniqueId = (new Date()).getTime()
  return (prefix || 'id') + (uniqueId++)
}

function getImage() {
  console.log('on-ok', imageSelected.value)

  if (imageSelected.value === null) {
    return notifErrVue('pilih Gambar terlebih dahulu')
  }
  props.editor.chain().focus().setImage({
    src: imageSelected.value,
    alt: imageSelected.value,
    ref: uniqueI('id'),
    width: 100,
    height: 100
  }).run()
  dialogImage.value = false
}
function imageGetter(val) {
  imageSelected.value = val
}

// function pickFile() {
//   refWord.value.pickFiles()
// }

// async function startImport() {
//   console.log('word', word.value)
//   console.log('word', api)
//   console.log('word', emits)
//   // const formData = new FormData()
//   // formData.append('doc', word.value)
//   // try {
//   //   await api.post('/v1/berita/upload_word', formData, {
//   //     headers: {
//   //       'Content-Type': 'multipart/form-data'
//   //     }
//   //   }).then((resp) => {
//   //     // console.log(resp)
//   //     emits('onimportword', resp.data)
//   //   })
//   // } catch (error) {
//   //   // this.loading = false
//   // }
// }

function dialogGallery() {
  dialogImage.value = true
}
</script>
