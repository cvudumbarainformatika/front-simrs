<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable no-lone-blocks -->
<!-- eslint-disable func-call-spacing -->
<!-- eslint-disable func-call-spacing -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div
    id="signatureDiv"
  >
    <canvas
      v-show="imgTtd === null"
      id="signatureCanvas"
      ref="canvasRef"
      width="320"
      height="200"
      style="border:4px solid rgb(122, 122, 122)"
    />
    <div v-show=" imgTtd !==null">
      <q-img
        v-if="SIGNATUREIMAGE !== null"
        :key="SIGNATUREIMAGE"
        :src="SIGNATUREIMAGE"
        style="border:4px solid rgb(122, 122, 122)"
      />
      <q-img
        v-else
        :key="imgTtd"
        :src="getImage()"
        style="border:4px solid rgb(122, 122, 122)"
      />
    </div>
  </div>
  <div class="q-mt-md">
    <q-btn
      icon="icon-mat-add"
      size="sm"
      round
      flat
      color="primary"
      @click="tabletDemo"
    >
      <q-tooltip>Tanda Tangan</q-tooltip>
    </q-btn>
    <!-- <q-btn
      icon="icon-mat-delete"
      size="sm"
      round
      flat
      color="negative"
      @click="clearPad"
    >
      <q-tooltip>Hapus TTd</q-tooltip>
    </q-btn> -->
  </div>
</template>

<script setup>
import Q from 'q'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { WacomGSS } from 'src/modules/wacom/sdkstu'
// eslint-disable-next-line no-unused-vars
import { pathImg } from 'src/boot/axios'

const props = defineProps({ ttd: { type: String, default: null } })
const emits = defineEmits(['saveTtd'])

// const imgTtd = computed({
//   get() {
//     return props.ttd
//   },
//   set(nwVal) {
//     emits('saveTtd', nwVal)
//   }
// })

const imgTtd = computed(() => {
  return props.ttd
})

let retry = 0
const MAXRETRIES = 20
const TIMEOUT_LONG = 1000
// eslint-disable-next-line no-unused-vars
let tablet
// eslint-disable-next-line no-unused-vars
const MIMGDATA = ref()
const USBDEVICES = ref()

const INKTHRESHOLD = ref()
const CAPABILITY = ref()
const ENCODINGMODE = ref()
const LASTPOINT = ref()
const ISDOWN = ref()
const MPENDATA = ref([])
const MBTNS = ref([])

const BTN_TEXT_OK = ref('OK')
const BTN_TEXT_CANCEL = ref('CANCEL')
const BTN_TEXT_CLEAR = ref('CLEAR')
const MCLICKBTN = ref(-1)

const WIDTH = ref('320px')
const HEIGHT = ref('200px')
const FORMTOP = ref('320px')
const FORMLEFT = ref('200px')
// eslint-disable-next-line no-unused-vars
const SIGNATUREIMAGE = ref(null)

// const imgTtd = ref(null)

const canvasRef = ref()
// eslint-disable-next-line no-unused-vars
const ctx = ref()

onMounted(() => {
  ctx.value = canvasRef.value.getContext('2d')
  setTimeout(checkForSigCaptX, 500)
  SIGNATUREIMAGE.value = null
  // // console.log('Q', SDKSTU)
})

onBeforeUnmount(() => {
  // const confirmationMessage = ''
  // WacomGSS?.STU?.close()
  disconnect()
})

function checkForSigCaptX () {
  retry = retry + 1
  if (WacomGSS.STU?.isServiceReady()) {
    retry = 0
    // console.log('SigCaptX Web Service: ready')
  }
  else {
    // console.log('SigCaptX Web Service: not connected')
    if (retry < MAXRETRIES) {
      setTimeout(checkForSigCaptX, TIMEOUT_LONG)
    }
    else {
      alert('Unable to establish connection to SigCaptX')
    }
  }
}

function onDCAtimeout () {
  // Device Control App has timed-out and shut down
  // For this sample, we just closedown tabletDemo (assuming it's running)
  // console.log('DCA disconnected')
  setTimeout(close, 0)
}

// eslint-disable-next-line no-unused-vars
function Point (x, y) {
  this.x = x
  this.y = y
}

function getImage () {
  // if (!imgTtd.value) {
  //   return SIGNATUREIMAGE.value
  // }
  // if (imgTtd.value !== null && SIGNATUREIMAGE.value !== null) {
  //   return SIGNATUREIMAGE.value
  // }
  // SIGNATUREIMAGE.value = pathImg + imgTtd.value
  // return pathImg + imgTtd.value
  return imgTtd.value
}

// eslint-disable-next-line no-unused-vars
function disconnect () {
  const deferred = Q.defer()

  if (!(undefined === tablet || tablet === null)) {
    const p = new WacomGSS.STU.Protocol()
    tablet.setInkingMode(p.InkingMode.InkingMode_Off)
      .then(function (message) {
        // console.log('received: ' + JSON.stringify(message))
        return tablet.endCapture()
      })
      .then(function (message) {
        // console.log('received: ' + JSON.stringify(message))
        if (MIMGDATA.value !== null) {
          return MIMGDATA.value.remove()
        }
        else {
          return message
        }
      })
      .then(function (message) {
        // console.log('received: ' + JSON.stringify(message))
        MIMGDATA.value = null
        return tablet.setClearScreen()
      })
      .then(function (message) {
        // console.log('received: ' + JSON.stringify(message))
        return tablet.disconnect()
      })
      .then(function (message) {
        // console.log('received: ' + JSON.stringify(message))
        tablet = null
        clearCanvas(canvasRef.value, ctx.value)
      })
      .then(function (message) {
        deferred.resolve()
      })
      .fail(function (message) {
        // console.log('disconnect error: ' + message)
        deferred.resolve()
      })
  }
  else {
    deferred.resolve()
  }
  return deferred.promise
}

function DCANotReady () { }
DCANotReady.prototype = new Error()

function tabletDemo () {
  clearPad()
  const p = new WacomGSS.STU.Protocol()
  let intf
  let mencH
  let mencH2
  // let mencH2Impl
  // console.log('wacom', p)

  WacomGSS.STU.isDCAReady()
    .then((message) => {
      if (!message) {
        throw new DCANotReady()
      }
      WacomGSS.STU.onDCAtimeout = onDCAtimeout
      return WacomGSS.STU.getUsbDevices()
    })
    .then((message) => {
      if (message === null || message.length === 0) {
        throw new Error('No STU devices found')
      }
      // console.log('received 1: ', JSON.stringify(message))
      console.log('received 1: ', message)
      USBDEVICES.value = message
      return WacomGSS.STU.isSupportedUsbDevice(USBDEVICES.value[0]?.idVendor, USBDEVICES.value[0]?.idProduct)
    })
    .then((message) => {
      // console.log('received 2: ', JSON.stringify(message))
      console.log('received 2: ', message)
      intf = new WacomGSS.STU.UsbInterface()
      return intf.Constructor()
    })
    .then(function (message) {
      // console.log('received 3: ', JSON.stringify(message))
      console.log('received 3: ', message)
      return intf.connect(USBDEVICES.value[0], true)
      // console.log('intf', intf)
    })
    .then(function (message) {
      // console.log('received 4: ', JSON.stringify(message))
      console.log('received 4: ', message)
      tablet = new WacomGSS.STU.Tablet()
      return tablet.Constructor(intf, mencH, mencH2)
    })
    .then(function (message) {
      // console.log('received 5: ' + JSON.stringify(message))
      console.log('received 5: ', message)
      intf = null
      return tablet.getInkThreshold()
    })
    .then(function (message) {
      // console.log('received 6: ' + JSON.stringify(message))
      console.log('received 6: ', message)
      INKTHRESHOLD.value = message
      return tablet.getCapability()
    })
    .then(function (message) {
      // console.log('received 7: ' + JSON.stringify(message))
      console.log('received 7: ', message)
      CAPABILITY.value = message
      WIDTH.value = message?.screenWidth + 'px'
      HEIGHT.value = message?.screenHeight + 'px'
      createModalWindow(WIDTH.value, HEIGHT.value)
      return tablet.getInformation()
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 8: ', message)
      return tablet.getInkThreshold()
    })
    .then(function (message) {
      console.log('received 9: ', message)
      return tablet.getProductId()
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 10: ', message)
      console.log('received 10 capability: ', CAPABILITY.value)
      return WacomGSS.STU.ProtocolHelper.simulateEncodingFlag(message, CAPABILITY.value?.encodingFlag)
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 11: ', message)
      console.log('received 11p: ', p)
      const encodingFlag = message
      if ((encodingFlag & p?.EncodingFlag?.EncodingFlag_24bit) !== 0) {
        return tablet.supportsWrite()
          .then(function (message) {
            ENCODINGMODE.value = message ? p?.EncodingMode?.EncodingMode_24bit_Bulk : p?.EncodingMode?.EncodingMode_24bit
          })
      }
      else if ((encodingFlag & p?.EncodingFlag?.EncodingFlag_16bit) !== 0) {
        return tablet.supportsWrite()
          .then(function (message) {
            ENCODINGMODE.value = message ? p?.EncodingMode?.EncodingMode_16bit_Bulk : p?.EncodingMode?.EncodingMode_16bit
          })
      }
      else { // assumes 1bit is available
        ENCODINGMODE.value = p?.EncodingMode?.EncodingMode_1bit
      }
    })
    .then(function (message) {
      console.log('received 12: ', message)
      return tablet.setClearScreen()
    })
    .then(function (message) {
      console.log('received 13: ', message)
      return message
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 14: ', message)
      return tablet.isSupported(p?.ReportId?.ReportId_PenDataOptionMode)
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 15: ', message)
      if (message) {
        return tablet.getProductId()
          .then(function (message) {
            let penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_None
            switch (message) {
              case WacomGSS.STU.ProductId.ProductId_520A:
                penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_TimeCount
                break
              case WacomGSS.STU.ProductId.ProductId_430:
              case WacomGSS.STU.ProductId.ProductId_530:
              case WacomGSS.STU.ProductId.ProductId_540:
                penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_TimeCountSequence
                break
              default:
                console.log('Unknown tablet supporting PenDataOptionMode, setting to None.')
            };
            return tablet.setPenDataOptionMode(penDataOptionMode)
          })
      }
      else {
        ENCODINGMODE.value = p.EncodingMode.EncodingMode_1bit
        return ENCODINGMODE.value
      }
    })
    .then(function (message) {
      // console.log('received: ' + JSON.stringify(message))
      console.log('received 16: ', message)
      addButtons()
      const canvasImage = canvasRef.value.toDataURL('image/jpeg')
      console.log('cancasImage', canvasImage)
      return WacomGSS.STU.ProtocolHelper.resizeAndFlatten(canvasImage, 0, 0, 0, 0, CAPABILITY.value?.screenWidth, CAPABILITY.value?.screenHeight, ENCODINGMODE.value, 1, false, 0, true)
    })
    .then(function (message) {
      console.log('received 17: ', message)
      console.log('received 17encodingmode: ', ENCODINGMODE.value)
      MIMGDATA.value = message
      return tablet.writeImage(ENCODINGMODE.value, message)
    })
    .then(function (message) {
      console.log('received 18: ', message)
      return tablet.setInkingMode(p.InkingMode.InkingMode_On)
    })
    .then(function (message) {
      console.log('received 19: ', message)
      const reportHandler = new WacomGSS.STU.ProtocolHelper.ReportHandler()
      LASTPOINT.value = { x: 0, y: 0 }
      ISDOWN.value = false
      ctx.value.lineWidth = 1

      const penData = function (report) {
        processButtons(report, canvasRef.value)
        processPoint(report, canvasRef.value, ctx.value)
        MPENDATA.value.push(report)
      }
      const penDataEncryptedOption = function (report) {
        // console.log("reportOp: " + JSON.stringify(report));
        processButtons(report.penData[0], canvasRef.value)
        processPoint(report.penData[0], canvasRef.value, ctx.value)
        processButtons(report.penData[1], canvasRef.value)
        processPoint(report.penData[1], canvasRef.value, ctx.value)
        MPENDATA.value.push(report.penData[0], report.penData[1])
      }

      const log = function (report) {
        // console.log('report 20: ', report)
      }
      const decrypted = function (report) {
        // console.log("decrypted: " + JSON.stringify(report));
      }
      // eslint-disable-next-line no-array-constructor
      // MPENDATA.value = new Array()
      reportHandler.onReportPenData = penData
      reportHandler.onReportPenDataOption = penData
      reportHandler.onReportPenDataTimeCountSequence = penData
      reportHandler.onReportPenDataEncrypted = penDataEncryptedOption
      reportHandler.onReportPenDataEncryptedOption = penDataEncryptedOption
      reportHandler.onReportPenDataTimeCountSequenceEncrypted = penData
      reportHandler.onReportDevicePublicKey = log
      reportHandler.onReportEncryptionStatus = log
      reportHandler.decrypt = decrypted

      // console.log('pendata', MPENDATA.value)
      // console.log('reportHandler', reportHandler)
      // console.log('log', log)
      return reportHandler.startReporting(tablet, true)
    })
    .fail(function (ex) {
      console.log('wacom error', ex)

      if (ex instanceof DCANotReady) {
        // Device Control App not detected
        // Reinitialize and re-try
        WacomGSS.STU.Reinitialize()
        setTimeout(tabletDemo, TIMEOUT_LONG)
      }
      else {
        // Some other error - Inform the user and closedown
        alert('tabletDemo failed:\n' + ex)
        setTimeout(close(), 0)
      }
    })
}

function Button () {
  // eslint-disable-next-line no-unused-expressions
  this.Bounds // in Screen coordinates
  // eslint-disable-next-line no-unused-expressions
  this.Text
  // eslint-disable-next-line no-unused-expressions
  this.Click
};

function addButtons () {
  // // console.log('addButtons', MBTNS.value)
  MBTNS.value = new Array(3)
  MBTNS.value[0] = new Button()
  MBTNS.value[1] = new Button()
  MBTNS.value[2] = new Button()
  // // console.log('addButtons', MBTNS.value)
  // // console.log('USBDEVICES', USBDEVICES.value)

  if (USBDEVICES.value[0].idProduct !== WacomGSS.STU.ProductId.ProductId_300) {
    // Place the buttons across the bottom of the screen.
    const w2 = CAPABILITY.value.screenWidth / 3
    const w3 = CAPABILITY.value.screenWidth / 3
    const w1 = CAPABILITY.value.screenWidth - w2 - w3
    const y = CAPABILITY.value.screenHeight * 6 / 7
    const h = CAPABILITY.value.screenHeight - y

    MBTNS.value[0].Bounds = new Rectangle(0, y, w1, h)
    MBTNS.value[1].Bounds = new Rectangle(w1, y, w2, h)
    MBTNS.value[2].Bounds = new Rectangle(w1 + w2, y, w3, h)
    // console.log('if idProduct !== WagomGss ', MBTNS.value)
  }
  else {
    // The STU-300 is very shallow, so it is better to utilise
    // the buttons to the side of the display instead.

    const x = CAPABILITY.value.screenWidth * 3 / 4
    const w = CAPABILITY.value.screenWidth - x

    const h2 = CAPABILITY.value.screenHeight / 3
    const h3 = CAPABILITY.value.screenHeight / 3
    const h1 = CAPABILITY.value.screenHeight - h2 - h3

    MBTNS.value[0].Bounds = new Rectangle(x, 0, w, h1)
    MBTNS.value[1].Bounds = new Rectangle(x, h1, w, h2)
    MBTNS.value[2].Bounds = new Rectangle(x, h1 + h2, w, h3)
    // console.log('else addButtons', MBTNS.value)
  }

  MBTNS.value[0].Text = BTN_TEXT_OK.value
  MBTNS.value[1].Text = BTN_TEXT_CLEAR.value
  MBTNS.value[2].Text = BTN_TEXT_CANCEL.value
  MBTNS.value[0].Click = btnOkClick
  MBTNS.value[1].Click = btnClearClick
  MBTNS.value[2].Click = btnCancelClick
  clearCanvas(canvasRef.value, ctx.value)
  drawButtons()
}

function drawButtons () {
  // This application uses the same bitmap for both the screen and client (window).

  ctx.value.save()
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)

  ctx.value.beginPath()
  ctx.value.lineWidth = 1
  ctx.value.strokeStyle = 'black'
  ctx.value.font = '20px Arial'

  // Draw the buttons
  for (let i = 0; i < MBTNS.value.length; ++i) {
    // if (useColor)
    // // console.log('for draw', MBTNS.value[i].Bounds.width)
    // eslint-disable-next-line no-lone-blocks
    {
      ctx.value.fillStyle = 'lightgrey'
      ctx.value.fillRect(MBTNS.value[i].Bounds.x, MBTNS.value[i].Bounds.y, MBTNS.value[i].Bounds.width, MBTNS.value[i].Bounds.height)
    }

    ctx.value.fillStyle = 'black'
    ctx.value.rect(MBTNS.value[i].Bounds.x, MBTNS.value[i].Bounds.y, MBTNS.value[i].Bounds.width, MBTNS.value[i].Bounds.height)
    const xPos = MBTNS.value[i].Bounds.x + ((MBTNS.value[i].Bounds.width / 2) - (ctx.value.measureText(MBTNS.value[i].Text).width / 2))
    let yOffset
    if (USBDEVICES.value[0].idProduct === WacomGSS.STU.ProductId.ProductId_300) { yOffset = 28 }
    else if (USBDEVICES.value[0].idProduct === WacomGSS.STU.ProductId.ProductId_430) { yOffset = 26 }
    else { yOffset = 40 }
    ctx.value.fillText(MBTNS.value[i].Text, xPos, MBTNS.value[i].Bounds.y + yOffset)
    // // console.log('yOffset', yOffset)
  }
  ctx.value.stroke()
  ctx.value.closePath()

  ctx.value.restore()
  // console.log('ctx', ctx.value)
  // console.log(canvasRef.value)
}

function btnOkClick () {
  // You probably want to add additional processing here.
  generateImage()
  // console.log('ok')
  setTimeout(close, 0)
}

function btnCancelClick () {
  // You probably want to add additional processing here.
  // console.log('cancel')
  setTimeout(close, 0)
}

function btnClearClick () {
  // You probably want to add additional processing here.
  // console.log('clear!')
  clearScreen()
}

function clearScreen () {
  clearCanvas(canvasRef.value, ctx.value)
  drawButtons()
  // eslint-disable-next-line no-array-constructor
  MPENDATA.value = new Array()
  tablet?.writeImage(ENCODINGMODE.value, MIMGDATA.value)
  SIGNATUREIMAGE.value = null
  emits('saveTtd', null)
}

function createModalWindow (w, h) {
  const canvas = canvasRef.value
  if (canvas.addEventListener) {
    canvas.addEventListener('click', onCanvasClick, false)
  }
  else if (canvas.attachEvent) {
    canvas.attachEvent('onClick', onCanvasClick)
  }
  else {
    canvas.onClick = onCanvasClick
  }

  // // console.log('parse createModalWindow', parseInt(w))
  FORMTOP.value = (window.innerHeight / 2) - (parseInt(h) / 2) + 'px'
  FORMLEFT.value = (window.innerWidth / 2) - (parseInt(w) / 2) + 'px'
}

function clearCanvas (canvas, cx) {
  // console.log('clearCanvasCx', cx)
  // console.log('clearCanvasCanvas', canvas)
  cx.save()
  cx.setTransform(1, 0, 0, 1, 0, 0)
  cx.fillStyle = 'white'
  cx.fillRect(0, 0, canvas.width, canvas.height)
  cx.restore()
}

const clearPad = () => {
  clearCanvas(canvasRef.value, ctx.value)
  clearScreen()
  setTimeout(close, 0)
}

function processButtons (point, inCanvas) {
  // // console.log('processButton', point)
  // // console.log('processButtonCanvas', inCanvas)
  const nextPoint = {}
  nextPoint.x = Math.round(inCanvas.width * point.x / CAPABILITY.value.tabletMaxX)
  nextPoint.y = Math.round(inCanvas.height * point.y / CAPABILITY.value.tabletMaxY)
  const isDown2 = (ISDOWN.value ? !(point.pressure <= INKTHRESHOLD.value.offPressureMark) : (point.pressure > INKTHRESHOLD.value.onPressureMark))

  let btn = -1
  for (let i = 0; i < MBTNS.value.length; ++i) {
    if (MBTNS.value[i].Bounds.Contains(nextPoint)) {
      btn = i
      break
    }
  }

  if (ISDOWN.value && !isDown2) {
    if (btn !== -1 && MCLICKBTN.value === btn) {
      MBTNS.value[btn].Click()
    }
    MCLICKBTN.value = -1
  }
  else if (btn !== -1 && !ISDOWN.value && isDown2) {
    MCLICKBTN.value = btn
  }
  return (btn === -1)
}

function processPoint (point, inCanvas, cx) {
  const nextPoint = {}
  nextPoint.x = Math.round(inCanvas.width * point.x / CAPABILITY.value.tabletMaxX)
  nextPoint.y = Math.round(inCanvas.height * point.y / CAPABILITY.value.tabletMaxY)
  const isDown2 = (ISDOWN.value ? !(point.pressure <= INKTHRESHOLD.value.offPressureMark) : (point.pressure > INKTHRESHOLD.value.onPressureMark))

  if (!ISDOWN.value && isDown2) {
    LASTPOINT.value = nextPoint
  }

  if ((isDown2 && distance(LASTPOINT.value, nextPoint) > 10) || (ISDOWN.value && !isDown2)) {
    cx.beginPath()
    cx.moveTo(LASTPOINT.value.x, LASTPOINT.value.y)
    cx.lineTo(nextPoint.x, nextPoint.y)
    cx.stroke()
    cx.closePath()
    LASTPOINT.value = nextPoint
  }

  ISDOWN.value = isDown2
}

function distance (a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
}

function generateImage () {
  const signatureCanvas = canvasRef.value
  const signatureCtx = ctx.value

  clearCanvas(signatureCanvas, signatureCtx)
  signatureCtx.lineWidth = 1
  signatureCtx.strokeStyle = 'black'
  LASTPOINT.value = { x: 0, y: 0 }
  ISDOWN.value = false

  for (let i = 0; i < MPENDATA.value.length; i++) {
    processPoint(MPENDATA.value[i], signatureCanvas, signatureCtx)
  }
  const imageUrl = signatureCanvas.toDataURL('image/jpeg')
  // console.log('ttd jadi', imageUrl)
  SIGNATUREIMAGE.value = imageUrl
  emits('saveTtd', imageUrl)
}

function close () {
  WacomGSS.STU.onDCAtimeout = null
  disconnect()
}

function Rectangle (x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height

  this.Contains = function (pt) {
    if (((pt.x >= this.x) && (pt.x <= (this.x + this.width))) &&
          ((pt.y >= this.y) && (pt.y <= (this.y + this.height)))) {
      return true
    }
    else {
      return false
    }
  }
}

function onCanvasClick (event) {
  const posX = event.layerX
  const posY = event.layerY

  for (let i = 0; i < MBTNS.value.length; i++) {
    // console.log('event mbtns', MBTNS.value[i].Bounds.Contains(new Point(posX, posY)))
    if (MBTNS.value[i].Bounds.Contains(new Point(posX, posY))) {
      MBTNS.value[i].Click()
      break
    }
  }
}
</script>

<style lang="scss" scoped>

#signatureDiv {
  width:320px;
  height:200px;
  width:v-bind(WIDTH);
  height:v-bind(HEIGHT);
  display:block;
  margin: 0 auto;
  position: relative;
}

.brder{

  border: 4px solid rgb(126, 126, 126);
}

#signatureImage {
  width:320px;
  height:200px;

}
</style>
