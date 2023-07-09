import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'
// import { VueNodeViewRenderer } from '@tiptap/vue-3'
// import OImageView from '../components/OImageView.vue'

export default Image.extend({
  name: 'custom-image',

  addOptions: {
    ...Image.options,
    sizes: ['small', 'medium', 'large'],
    isDraggable: [true, false]
  },

  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      size: {
        default: 'small',
        rendered: false
      }

    }
  },

  // addCommands() {
  //   return {
  //     setImage: (options) => ({ tr, commands }) => {
  //       if (tr.selection?.node?.type?.name === 'custom-image') {
  //         return commands.updateAttributes('custom-image', options)
  //       } else {
  //         return commands.insertContent({
  //           type: this.name,
  //           attrs: options
  //         })
  //       }
  //     }
  //   }
  // },

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
      setSize: (attributes) => ({ tr, dispatch }) => {
        // Check it's a valid size option
        if (!this.options.sizes.includes(attributes.size)) {
          return false
        }

        const { selection } = tr

        const options = {
          ...selection.node.attrs,
          ...attributes
        }

        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
      }

      // toggleResizable: (attributes) => ({ tr, dispatch }) => {
      //   // Check it's a valid size option
      //   // if (!this.options.sizes.includes(attributes.size)) {
      //   //   return false
      //   // }

      //   const { node } = tr?.selection

      //   if (node?.type?.name === 'custom-image') {
      //     node.attrs.isDraggable = !node.attrs.isDraggable
      //   }
      // }
    }
  },

  // addNodeView() {
  //   return VueNodeViewRenderer(OImageView)
  // },

  renderHTML({ node, HTMLAttributes }) {
    const size = node.attrs.size
    // const isDraggable = node.attrs.isDraggable
    HTMLAttributes.class = ' custom-image-' + size

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  }

})
