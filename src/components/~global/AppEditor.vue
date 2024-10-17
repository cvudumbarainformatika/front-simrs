<template>
  <div class="editor">
    <editor-button
      :editor="editor"
      :on-update-editor="updateModel"
      :fullpage="style.componentfull"
      @onimportword="setcontenteditor"
      @on-full-page="style.setComponentFull"
    />
    <editor-content
      :editor="editor"
      class="content-editor-A4"
    />
    <!-- <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
    <menu-bar-btn
      icon="icon-mat-format_bold"
      :active="editor.isActive('bold')"
      tooltip="Huruf Tebal"
      @click="editor.chain().focus().toggleBold().run()"
    />
  </bubble-menu> -->
  </div>
</template>

<script setup>
// import MenuBarBtn from '../~editor/components/MenuBarBtn.vue'
import EditorButton from '../~editor/EditorButton.vue'
// import BubbleImage from 'src/components/~editor/BubbleImage.vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// plugins
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
// import BubbleMenu from '@tiptap/extension-bubble-menu'
// import CustomImage from '../~editor/extensions/custom-image'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import MyImage from '../~editor/extensions/my-image'
import { ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
// import { computed } from 'vue'

const style = useStyledStore()

const updateModel = ref(false)

const editor = useEditor({
  content: '<p>Silahkan Ketik Berita disini</p>',
  editable: true,
  showToolbar: true,
  extensions: [
    StarterKit,
    Underline,
    Superscript,
    Subscript,
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
    TaskList, TaskItem,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    FontFamily,
    // BubbleMenu.configure({
    //   element: document.querySelector('.menu-one')
    // }),
    // CustomImage.configure({
    //   inline: true
    // })
    MyImage.configure({
      inline: true
    }),
    // FontFamily
    // new TipTapCustomImage()
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell
  ],
  onUpdate: ({ editor }) => {
    // console.log('onUpdate', editor)
    updateModel.value = true
  }
})

function setcontenteditor (content) {
  // console.log($content)
  const isSame = editor.value.getHTML() === content
  if (isSame) {
    return
  }

  const index = content.indexOf('{"result":')
  editor.value.commands.setContent(content.substring(0, index - 1), false)
}

</script>

<style lang="scss">
  .editor {
    border:1px solid $grey-3;
  }
  hr.ProseMirror-selectednode {
  border-top: 1px solid $grey-4;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
  p {
    margin: 0;
    line-height: 0.8rem;
  }

  li {
    display: flex;
    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }
}

.ProseMirror{
  width: 100% !important;
  overflow: auto !important;
  min-height:400px;
  padding: 5px;
  // font-family: 'Courier New', Courier, monospace;
  // font-family: 'Times New Roman', Times, serif;
  // font-family: Arial, Helvetica, sans-serif;
  // font-family: Impact, 'Arial Narrow Bold', sans-serif;
  // font-family: 'Times';
  // font-size: 12pt;
  // display: flex;
  // flex-direction: column;
  h1,h2,h3,h4,h5,h6 {
    margin: 0
  }
  p {
    // display:flex;
    img{
      margin:5px;
    }
    // .img-absolute{
    //   display: flex;
    // }
  }

   pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 10px;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid $primary;
    }
  }

  .custom-image-small {
    width: 200px;
    height: auto;
  }
  .custom-image-medium {
    width: 500px;
    height: auto;
  }
  .custom-image-large {
    width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: .75rem;
    border-left: 3px solid rgba(#0D0D0D, 0.1);
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

</style>
