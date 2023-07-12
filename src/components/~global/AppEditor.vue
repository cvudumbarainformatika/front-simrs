<template>
  <div class="editor">
    <editor-button
      :editor="editor"
      :on-update-editor="updateModel"
      @onimportword="setcontenteditor"
    />
    <editor-content
      :editor="editor"
      class="content-editor-A4"
    />
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    />
  </div>
</template>

<script setup>
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
import BubbleMenu from '@tiptap/extension-bubble-menu'
// import CustomImage from '../~editor/extensions/custom-image'
import MyImage from '../~editor/extensions/my-image'
import { ref } from 'vue'
// import { computed } from 'vue'

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
    BubbleMenu.configure({
      pluginKey: 'bubleImage',
      element: document.querySelector('.menu-one')
    }),
    // CustomImage.configure({
    //   inline: true
    // })
    MyImage.configure({
      inline: true
    })
    // FontFamily
    // new TipTapCustomImage()
  ],
  onUpdate: ({ editor }) => {
    // console.log('onUpdate', editor)
    updateModel.value = true
  }
})

function setcontenteditor(content) {
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
</style>
