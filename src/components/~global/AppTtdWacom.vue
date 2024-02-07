<!-- eslint-disable no-lone-blocks -->
<!-- eslint-disable func-call-spacing -->
<!-- eslint-disable func-call-spacing -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div id="signatureDiv">
    <canvas
      v-show="imgTtd === null"
      ref="canvasRef"
      class="ttd-pad"
      height="150"
      width="300"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
    />
    <img
      v-show="imgTtd !== null"
      id="signatureImage"
    >

    <div class="absolute-bottom">
      <q-btn
        icon="icon-mat-add"
        size="sm"
        round
        flat
        color="primary"
        @click="tabletDemo"
      />
    </div>
  </div>
</template>

<script setup>
import Q from 'q'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { WacomGSS } from 'src/modules/wacom/sdkstu'

let retry = 0
const MAXRETRIES = 20
const TIMEOUT_LONG = 1000
// eslint-disable-next-line no-unused-vars
let tablet
// eslint-disable-next-line no-unused-vars
let MIMGDATA
let USBDEVICES

const INKTHRESHOLD = ref()
const CAPABILITY = ref()
const ENCODINGMODE = ref()
const LASTPOINT = ref()
const ISDOWN = ref()
const MPENDATA = ref()
const MBTNS = ref([])

const BTN_TEXT_OK = ref('OK')
const BTN_TEXT_CANCEL = ref('CANCEL')
const BTN_TEXT_CLEAR = ref('CLEAR')
const MCLICKBTN = ref(-1)
// eslint-disable-next-line no-unused-vars
const SIGNATUREIMAGE = ref()

const imgTtd = ref(null)

const canvasRef = ref()
// eslint-disable-next-line no-unused-vars
const ctx = ref()

onMounted(() => {
  setTimeout(checkForSigCaptX, 500)
  // console.log('Q', SDKSTU)
})

onBeforeUnmount(() => {
  // const confirmationMessage = ''
  WacomGSS?.STU?.close()
})

function checkForSigCaptX() {
  retry = retry + 1
  if (WacomGSS.STU?.isServiceReady()) {
    retry = 0
    console.log('SigCaptX Web Service: ready')
  } else {
    console.log('SigCaptX Web Service: not connected')
    if (retry < MAXRETRIES) {
      setTimeout(checkForSigCaptX, TIMEOUT_LONG)
    } else {
      alert('Unable to establish connection to SigCaptX')
    }
  }
}

function onDCAtimeout() {
  // Device Control App has timed-out and shut down
  // For this sample, we just closedown tabletDemo (assuming it's running)
  console.log('DCA disconnected')
  setTimeout(close, 0)
}

function Rectangle(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height

  this.Contains = function (pt) {
    if (((pt.x >= this.x) && (pt.x <= (this.x + this.width))) &&
          ((pt.y >= this.y) && (pt.y <= (this.y + this.height)))) {
      return true
    } else {
      return false
    }
  }
}

// function Point(x, y) {
//   this.x = x
//   this.y = y
// }

// eslint-disable-next-line no-unused-vars
function disconnect() {
  const deferred = Q.defer()

  if (!(undefined === tablet || tablet === null)) {
    const p = new WacomGSS.STU.Protocol()
    tablet.setInkingMode(p.InkingMode.InkingMode_Off)
      .then(function (message) {
        console.log('received: ' + JSON.stringify(message))
        return tablet.endCapture()
      })
      .then(function (message) {
        console.log('received: ' + JSON.stringify(message))
        if (MIMGDATA !== null) {
          return MIMGDATA.remove()
        } else {
          return message
        }
      })
      .then(function (message) {
        console.log('received: ' + JSON.stringify(message))
        MIMGDATA = null
        return tablet.setClearScreen()
      })
      .then(function (message) {
        console.log('received: ' + JSON.stringify(message))
        return tablet.disconnect()
      })
      .then(function (message) {
        console.log('received: ' + JSON.stringify(message))
        tablet = null
        clearCanvas(canvasRef.value, ctx.value)
      })
      .then(function (message) {
        deferred.resolve()
      })
      .fail(function (message) {
        console.log('disconnect error: ' + message)
        deferred.resolve()
      })
  } else {
    deferred.resolve()
  }
  return deferred.promise
}

function DCANotReady() { }
DCANotReady.prototype = new Error()

function tabletDemo() {
  const p = WacomGSS
  let intf
  let mencH
  let mencH2
  // let mencH2Impl
  console.log('wacom', p)

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
      console.log('received: ' + JSON.stringify(message))
      USBDEVICES = message
      return WacomGSS.STU.isSupportedUsbDevice(USBDEVICES[0].idVendor, USBDEVICES[0].idProduct)
    })
    .then((message) => {
      console.log('received: ' + JSON.stringify(message))
      intf = new WacomGSS.STU.UsbInterface()
      return intf.Constructor()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return intf.connect(USBDEVICES[0], true)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      tablet = new WacomGSS.STU.Tablet()
      return tablet.Constructor(intf, mencH, mencH2)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      intf = null
      return tablet.getInkThreshold()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      INKTHRESHOLD.value = message
      return tablet.getCapability()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      CAPABILITY.value = message
      // createModalWindow(CAPABILITY.screenWidth, CAPABILITY.screenHeight)
      return tablet.getInformation()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return tablet.getInkThreshold()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return tablet.getProductId()
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return WacomGSS.STU.ProtocolHelper.simulateEncodingFlag(message, CAPABILITY.value?.encodingFlag)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      const encodingFlag = message
      if ((encodingFlag & p?.EncodingFlag?.EncodingFlag_24bit) !== 0) {
        return tablet.supportsWrite()
          .then(function (message) {
            ENCODINGMODE.value = message ? p?.EncodingMode?.EncodingMode_24bit_Bulk : p?.EncodingMode?.EncodingMode_24bit
          })
      } else if ((encodingFlag & p?.EncodingFlag?.EncodingFlag_16bit) !== 0) {
        return tablet.supportsWrite()
          .then(function (message) {
            ENCODINGMODE.value = message ? p?.EncodingMode?.EncodingMode_16bit_Bulk : p?.EncodingMode?.EncodingMode_16bit
          })
      } else { // assumes 1bit is available
        ENCODINGMODE.value = p?.EncodingMode?.EncodingMode_1bit
      }
    })
    .then(function (message) {
      return tablet.setClearScreen()
    })
    .then(function (message) {
      console.log('received from setClearScreen: ' + JSON.stringify(message))
      return message
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return tablet.isSupported(p?.ReportId?.ReportId_PenDataOptionMode)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
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
      } else {
        ENCODINGMODE.value = p.EncodingMode.EncodingMode_1bit
        return ENCODINGMODE.value
      }
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      addButtons()
      const canvasImage = canvasRef.value.toDataURL('image/jpeg')
      // eslint-disable-next-line func-call-spacing
      return WacomGSS.STU.ProtocolHelper.resizeAndFlatten
      // eslint-disable-next-line no-unexpected-multiline
      (
        canvasImage,
        0,
        0,
        0,
        0,
        CAPABILITY.value?.screenWidth,
        CAPABILITY.value?.screenHeight,
        ENCODINGMODE.value,
        1,
        false,
        0,
        true
      )
    })
    .then(function (message) {
      MIMGDATA.value = message
      console.log('received: ' + JSON.stringify(message))
      return tablet.writeImage(ENCODINGMODE.value, message)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      return tablet.setInkingMode(p.InkingMode.InkingMode_On)
    })
    .then(function (message) {
      console.log('received: ' + JSON.stringify(message))
      const reportHandler = new WacomGSS.STU.ProtocolHelper.ReportHandler()
      LASTPOINT.value = { x: 0, y: 0 }
      ISDOWN.value = false
      ctx.value.lineWidth = 1

      const penData = function (report) {
        // console.log("report: " + JSON.stringify(report));
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
        // console.log("report: " + JSON.stringify(report));
      }

      const decrypted = function (report) {
        // console.log("decrypted: " + JSON.stringify(report));
      }
      // eslint-disable-next-line no-array-constructor
      MPENDATA.value = new Array()
      reportHandler.onReportPenData = penData
      reportHandler.onReportPenDataOption = penData
      reportHandler.onReportPenDataTimeCountSequence = penData
      reportHandler.onReportPenDataEncrypted = penDataEncryptedOption
      reportHandler.onReportPenDataEncryptedOption = penDataEncryptedOption
      reportHandler.onReportPenDataTimeCountSequenceEncrypted = penData
      reportHandler.onReportDevicePublicKey = log
      reportHandler.onReportEncryptionStatus = log
      reportHandler.decrypt = decrypted
      return reportHandler.startReporting(tablet, true)
    })
    .fail(function (ex) {
      console.log(ex)

      if (ex instanceof DCANotReady) {
        // Device Control App not detected
        // Reinitialize and re-try
        WacomGSS.STU.Reinitialize()
        setTimeout(tabletDemo, TIMEOUT_LONG)
      } else {
        // Some other error - Inform the user and closedown
        alert('tabletDemo failed:\n' + ex)
        setTimeout(close(), 0)
      }
    })
}

function addButtons() {
  // MBTNS.value = new Array(3)
  // MBTNS.value[0] = new Button()
  // MBTNS.value[1] = new Button()
  // MBTNS.value[2] = new Button()

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
  } else {
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
  }

  MBTNS.value[0].Text = BTN_TEXT_OK.value
  MBTNS.value[1].Text = BTN_TEXT_CLEAR.value
  MBTNS.value[2].Text = BTN_TEXT_CANCEL
  // MBTNS.value[0].Click = btnOk_Click
  // MBTNS.value[1].Click = btnClear_Click
  // MBTNS.value[2].Click = btnCancel_Click
  clearCanvas(canvasRef.value, ctx.value)
  drawButtons()
}

function drawButtons() {
  // This application uses the same bitmap for both the screen and client (window).

  ctx.value.save()
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)

  ctx.value.beginPath()
  ctx.value.lineWidth = 1
  ctx.value.strokeStyle = 'black'
  ctx.value.font = '30px Arial'

  // Draw the buttons
  for (let i = 0; i < MBTNS.value.length; ++i) {
    // if (useColor)
    // eslint-disable-next-line no-lone-blocks
    {
      ctx.value.fillStyle = 'lightgrey'
      ctx.value.fillRect(MBTNS.value[i].Bounds.x, MBTNS.value[i].Bounds.y, MBTNS.value[i].Bounds.width, MBTNS.value[i].Bounds.height)
    }

    ctx.value.fillStyle = 'black'
    ctx.value.rect(MBTNS.value[i].Bounds.x, MBTNS.value[i].Bounds.y, MBTNS.value[i].Bounds.width, MBTNS.value[i].Bounds.height)
    const xPos = MBTNS.value[i].Bounds.x + ((MBTNS.value[i].Bounds.width / 2) - (ctx.value.measureText(MBTNS.value[i].Text).width / 2))
    let yOffset
    if (USBDEVICES.value[0].idProduct === WacomGSS.STU.ProductId.ProductId_300) { yOffset = 28 } else if (USBDEVICES.value[0].idProduct === WacomGSS.STU.ProductId.ProductId_430) { yOffset = 26 } else { yOffset = 40 }
    ctx.value.fillText(MBTNS.value[i].Text, xPos, MBTNS.value[i].Bounds.y + yOffset)
  }
  ctx.value.stroke()
  ctx.value.closePath()

  ctx.value.restore()
}

// function clearScreen() {
//   clearCanvas(canvasRef.value, ctx.value)
//   drawButtons()
//   // eslint-disable-next-line no-array-constructor
//   MPENDATA.value = new Array()
//   tablet.writeImage(ENCODINGMODE.value, MIMGDATA.value)
// }

function clearCanvas(canvas, cx) {
  cx.save()
  cx.setTransform(1, 0, 0, 1, 0, 0)
  cx.fillStyle = 'white'
  cx.fillRect(0, 0, canvas.width, canvas.height)
  cx.restore()
}

function processButtons(point, inCanvas) {
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
  } else if (btn !== -1 && !ISDOWN.value && isDown2) {
    MCLICKBTN.value = btn
  }
  return (btn === -1)
}

function processPoint(point, inCanvas, cx) {
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

function distance(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
}

// function generateImage() {
//   SIGNATUREIMAGE.value = document.getElementById('SIGNATUREIMAGE.value')
//   const signatureCanvas = document.createElement('canvas')
//   signatureCanvas.id = 'signatureCanvas'
//   signatureCanvas.height = SIGNATUREIMAGE.value.height
//   signatureCanvas.width = SIGNATUREIMAGE.value.width
//   const signatureCtx = signatureCanvas.getContext('2d')

//   clearCanvas(signatureCanvas, signatureCtx)
//   signatureCtx.lineWidth = 1
//   signatureCtx.strokeStyle = 'black'
//   LASTPOINT.value = { x: 0, y: 0 }
//   ISDOWN.value = false

//   for (let i = 0; i < MPENDATA.value.length; i++) {
//     processPoint(MPENDATA.value[i], signatureCanvas, signatureCtx)
//   }
//   SIGNATUREIMAGE.value.src = signatureCanvas.toDataURL('image/jpeg')
//   console.log('ttd jadi', signatureCanvas.toDataURL('image/jpeg'))
// }

function close() {
  // Clear handler for Device Control App timeout
  WacomGSS.STU.onDCAtimeout = null

  disconnect()
  // document.getElementsByTagName('body')[0].removeChild(modalBackground)
  // document.getElementsByTagName('body')[0].removeChild(formDiv)
}

// function onCanvasClick(event) {
//   // ============================================================================================
//   // Enable the mouse to click on the simulated buttons that we have displayed.

//   // Note that this can add some tricky logic into processing pen data
//   // if the pen was down at the time of this click, especially if the pen was logically
//   // also 'pressing' a button! This demo however ignores any that.

//   // ============================================================================================

//   // const posX = event.pageX - formDiv.offsetLeft
//   // const posY = event.pageY - formDiv.offsetTop

//   // for (let i = 0; i < MBTNS.value.length; i++) {
//   //   if (MBTNS.value[i].Bounds.Contains(new Point(posX, posY))) {
//   //     MBTNS.value[i].Click()
//   //     break
//   //   }
//   // }
// }
</script>

<style lang="scss" scoped>

#signatureDiv {
  width:300px;
  height:200px;
  display:block;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;
}

#signatureImage {
  width:300px;
  height:200px;

}
</style>
