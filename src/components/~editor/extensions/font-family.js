import TextStyle from '@tiptap/extension-text-style'

export default TextStyle.extend({

  addOptions: {
    ...TextStyle.options,
    fonts: ['Courier', 'Times', 'Arial', 'Impact'],
    isDraggable: [true, false]
  },

  addAttributes() {
    return {
      ...TextStyle.addAttributes(),
      font: {
        default: null,
        rendered: false
      }

    }
  },
  addCommands() {
    return {
      setFontFamily: (attributes) => ({ tr, dispatch }) => {
        if (!this.options.fonts.includes(attributes.font)) {
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
    }
  }
})
