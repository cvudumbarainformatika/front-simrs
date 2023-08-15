import Image from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes } from '@tiptap/core'
import OImageView from '../components/OImageView.vue'

export default Image.extend({
  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      // size: {
      //   default: 'small',
      //   rendered: false
      // }
      width: { default: null },
      height: { default: null },
      src: { default: null },
      ref: { default: null },
      class: { default: 'center' }
    }
  },
  addCommands() {
    return {
      setImage: (options) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      },
      setImageAlignmentClass: (alignment) => ({ commands }) => {
        return commands.updateAttributes('image', { class: alignment })
      }
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    const size = node.attrs.size
    // const isDraggable = node.attrs.isDraggable
    HTMLAttributes.class = ' custom-image-' + size

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(OImageView)
  }
})
