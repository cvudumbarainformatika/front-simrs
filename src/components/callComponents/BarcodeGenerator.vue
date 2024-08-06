<script>
// importing hyperscript from vue to create the HTML element
import { h } from 'vue'
// importing jsbarcode method from jsbarcode library
// const JsBarcode = require('jsbarcode')
import JsBarcode from 'jsbarcode'

export default {
  name: 'BarcodeGenerator',
  // defining props and props type to be used in BarcodeGenerator component
  props: {
    value: {
      type: [String, Number],
      default: '123456789'
    },
    format: {
      type: String,
      default: 'CODE128'
    },
    width: {
      type: [String, Number],
      default: 2
    },
    height: {
      type: [String, Number],
      default: 60
    },
    displayValue: {
      type: [String, Boolean],
      default: true
    },
    text: {
      type: [String, Number],
      default: 'Barcode'
    },
    fontOptions: {
      type: String,
      default: ''
    },
    font: {
      type: String,
      default: ''
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    textPosition: {
      type: String,
      default: 'bottom'
    },
    textMargin: {
      type: [String, Number],
      default: 2
    },
    fontSize: {
      type: [String, Number],
      default: 12
    },
    background: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: ''
    },
    margin: {
      type: [String, Number],
      default: 0
    },
    marginTop: {
      type: [String, Number],
      default: 0
    },
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    marginLeft: {
      type: [String, Number],
      default: 0
    },
    marginRight: {
      type: [String, Number],
      default: 0
    },
    flat: {
      type: Boolean,
      default: false
    },
    ean128: {
      type: Boolean,
      default: false
    },
    elementTag: {
      type: String,
      default: 'svg',
      validator: function (value) {
        return ['canvas', 'svg', 'img'].indexOf(value) !== -1
      }
    }
  },
  // render function to create the HTML element

  render () {
    return h(this.elementTag, { id: ['barcodegen'] })
  },

  // calling custom function (generateBarcode) inside mounted lifecycle method
  mounted: function () {
    generateBarcode.call(this)
  }
}
// custom function for taking props from the component and passing that to jsbarcode method and generating the barcode
function generateBarcode () {
  const that = this
  const settings = {
    format: this.format,
    width: this.width,
    height: this.height,
    displayValue: this.displayValue,
    text: this.text,
    fontOptions: this.fontOptions,
    font: this.font,
    textAlign: this.textAlign,
    textPosition: this.textPosition,
    textMargin: this.textMargin,
    fontSize: this.fontSize,
    background: this.background,
    lineColor: this.lineColor,
    margin: this.margin,
    marginTop: this.marginTop,
    marginBottom: this.marginBottom,
    marginLeft: this.marginLeft,
    marginRight: this.marginRight,
    flat: this.flat,
    ean128: this.ean128,
    valid: function (valid) {
      that.valid = valid
    },
    elementTag: this.elementTag
  }

  // custom function calling to remove the undefined objects from the settings
  removeUndefinedProps(settings)
  // calling jsbarcode function and passing element, value and settings to generate the barcode
  JsBarcode(this.$el, this.value, settings)
}
// custom function to remove undefined objects from the settings
function removeUndefinedProps (obj) {
  Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})
}
</script>
