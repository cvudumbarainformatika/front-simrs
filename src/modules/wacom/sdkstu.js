/* eslint-disable no-unreachable */
/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */
/* eslint-disable no-new-object */
/* eslint-disable func-call-spacing */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-useless-constructor */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */
//==============================================================================
// wgssStuSdk.js
// Copyright (c) 2015-2017 Wacom Co.,Ltd.
//
// 15/10/2015  FRE Created
//==============================================================================
//NOTE: Requires q lib https://github.com/kriskowal/q/raw/v1/q.js

// global namespace
import Q from 'q'
const WacomGSS = {}

// UTF-8 helper functions
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
// Note: btoa and atob are not supported on IE 9 or lower
// function utf8_to_b64(str) {
//   return window.btoa(unescape(encodeURIComponent(str)))
// }

// function b64_to_utf8(str) {
//   return decodeURIComponent(escape(window.atob(str)))
// }

WacomGSS.STUConstructor = (function () {
  let websocket

  const MaxChunkSize = 65535 // size of chunks to split the message into

  let ticketCount = 0
  let streamCount = 0
  const table = {}
  const stream = {}
  function checkExists(obj) {
    return typeof obj !== 'undefined'
  }

  function getTicket() {
    return ticketCount++
  }

  function getStream() {
    return streamCount++
  }

  // Constructor
  class STU {
    constructor(port) {
      const defPort = 9000
      const self = this
      if (!checkExists(port)) {
        port = defPort
      }

      this.onDCAtimeout = null

      websocket = new WebSocket('wss://localhost:' + port.toString() + '/ws')

      websocket.onopen = function () {
        console.log('connected')
      }
      websocket.onmessage = receive
      websocket.onclose = function () {
        console.log('disconnected')
        if (typeof self.onDCAtimeout === 'function') {
          self.onDCAtimeout()
        }
      }
    }

    Reinitialize() {
      WacomGSS.STU = new WacomGSS.STUConstructor()
    }

    isServiceReady() {
      return websocket.readyState == 1
    }

    isDCAReady() {
      const deferred = Q.defer()
      if (!WacomGSS.STU.isServiceReady()) {
        deferred.resolve(false)
      } else {
        setTimeout(function () {
          if (deferred.promise.isPending()) {
            if (WacomGSS.STU.isServiceReady()) {
              WacomGSS.STU.close()
            }
            deferred.resolve(false)
          }
        }, 1000)
        WacomGSS.STU.getUsbDevices()
          .then(function (message) {
            if (deferred.promise.isPending()) {
              deferred.resolve(true)
            }
          })
          .fail(function (message) {
            if (deferred.promise.isPending()) {
              deferred.resolve(true)
            }
          })
      }
      return deferred.promise
    }

    close() {
      websocket.close()
    }

    send(object) {
      const deferred = Q.defer()
      try {
        const ticket = getTicket()
        object.ticket = ticket
        const str = JSON.stringify(object)
        wsSend(str)
        table[ticket] = deferred
        //console.log("send: " + JSON.stringify(object));
      } catch (err) {
        deferred.reject(err)
      }
      return deferred.promise
    }

    sendNoReturn(object) {
      const str = JSON.stringify(object)
      wsSend(str)
      //console.log("send: " + str);
    }

    setStream(functor) {
      const streamId = getStream()
      stream[streamId] = functor
      return streamId
    }

    removeStream(streamId) {
      delete stream[streamId]
    }

    getUsbDevices() {
      return WacomGSS.STU.send({
        scope: 'WacomGSS.STU.GetUsbDevices',
        function: 'getUsbDevices'
      })
    }

    getTlsDevices() {
      return WacomGSS.STU.send({
        scope: 'WacomGSS.STU.GetTlsDevices',
        function: 'getTlsDevices'
      })
    }

    isSupportedUsbDevice(idVendor, idProduct) {
      return WacomGSS.STU.send({
        scope: 'WacomGSS.STU.GetUsbDevices',
        function: 'isSupportedUsbDevice',
        idVendor,
        idProduct
      })
    }

    // usbDevice type is UsbDevice
    getStringUsbDevice(usbDevice) {
      function get4DigitsHex(number) {
        return ('0000' + number.toString(16)).substr(-4)
      }

      return get4DigitsHex(usbDevice.idVendor) + ':' +
                get4DigitsHex(usbDevice.idProduct) + ':' +
                get4DigitsHex(usbDevice.bcdDevice)
    }

    getSerialPorts() {
      return WacomGSS.STU.send({
        scope: 'WacomGSS.STU.GetSerialPorts',
        function: 'getSerialPorts'
      })
    }
  }

  function receive(message) {
    // if (typeof message?.data !== 'undefined' && message?.data !== '') {
    // console.log('receivedddd: ', message)
    if (message.data) {
      const arg = JSON.parse(message.data)
      // console.log('receivedddd: ', arg)
      if (checkExists(arg.ticket) && checkExists(table[arg.ticket])) {
        if (checkExists(arg.success) && arg.success == true && checkExists(arg.data)) {
          table[arg?.ticket]?.resolve(arg.data)
        } else {
          table[arg?.ticket]?.reject(new Error(checkExists(arg?.error) ? arg.error : ''))
        }
        delete table[arg.ticket]
      } else if (checkExists(arg.stream) && checkExists(stream[arg.stream]) && checkExists(arg.data)) {
        stream[arg.stream].stream(arg.data)
      } else {
        throw new Error('websocket invalid message: ' + message.data)
      }
    } else {
      console.log('Unexpected message type ' + typeof message + ' = ' + JSON.stringify(message))
    }
  }

  // sends unlimited sized message strings
  function wsSend(myString) {
    //console.log("Sending " + myString);
    const length = myString.length
    let pos = 0

    while (pos < length) {
      const header = (pos + MaxChunkSize < length) ? '0' : '1'
      const chunk = myString.substr(pos, MaxChunkSize)

      websocket.send(header + chunk)
      pos += MaxChunkSize
    }
  }
  // USB device Vendor ID for Wacom.
  STU.prototype.VendorId =
    {
      VendorId_Wacom: 0x056a
    }
    // brief USB device Product IDs for STU tablets.
  STU.prototype.ProductId =
    {
      ProductId_500: 0x00a1, // STU-500
      ProductId_300: 0x00a2, // STU-300
      ProductId_520A: 0x00a3, // STU-520
      ProductId_430: 0x00a4, // STU-430
      ProductId_530: 0x00a5, // STU-530
      ProductId_430V: 0x00a6, // STU-430V
      ProductId_540: 0x00a8, // STU-540
      ProductId_541: 0x00a9 // STU-541
    }
  STU.prototype.ProductId_min = 0x00a1
  STU.prototype.ProductId_max = 0x00af

  STU.prototype.SerialPort =
    {
      Type:
        {
          Unknown: 0,
          Physical: 1,
          Virtual: 2,
          Remote: 3
        }
    }

  STU.prototype.UsbInterface = (function () {
    const scope = 'WacomGSS.STU.UsbInterface'
    let id = ''
    // Constructor
    class UsbInterface {
      constructor() {
      }

      Constructor() {
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor'
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      connect(usbDevice, exclusiveLock) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'connect',
          usbDevice,
          exclusiveLock
        })
      }

      toJSON() {
        return { id, scope }
      }

      disconnect() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'disconnect'
        })
      }

      isConnected() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'isConnected'
        })
      }

      queueNotifyAll() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'queueNotifyAll'
        })
      }

      // predicate type is Boolean
      queueSetPredicateAll(predicate) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'queueSetPredicateAll',
          predicate
        })
      }

      // length type is an integer
      get(length) {
        return WacomGSS.STU.send // returns a Base64-encoded string
        ({
          scope,
          id,
          function: 'get_', // the '_' is deliberate
          length
        })
      }

      // base64Data is a base64-encoded image string, or a DataStore reference to it
      set(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'set',
          base64Data
        })
      }

      supportsWrite() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'supportsWrite'
        })
      }

      // base64Data type is a base64-encoded image string, or a DataStore reference to it
      write(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'write',
          base64Data
        })
      }

      getReportCountLengths() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportCountLengths'
        })
      }

      getProductId() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getProductId'
        })
      }
    }

    return UsbInterface
  })()

  STU.prototype.Protocol = (function () {
    const scope = 'WacomGSS.STU.Protocol'
    let id = ''
    let intf = {}

    // Constructor
    class Protocol {
      constructor() {
      }

      toJSON() {
        return { id, scope }
      }

      Constructor(_intf) {
        intf = _intf
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor',
          intf: intf.toJSON()
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      getInterface() {
        return intf
      }

      getInformation() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInformation'
        })
      }

      getPenDataOptionMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getPenDataOptionMode'
        })
      }

      // pendDataOptionMode is a Protocol.PenDataOptionMode
      setPenDataOptionMode(penDataOptionMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setPenDataOptionMode',
          penDataOptionMode
        })
      }

      // operationMode is OperationMode_Normal, _PinPad, _SlideShow, _KeyPad or _Signature
      setOperationMode(operationMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setOperationMode',
          operationMode
        })
      }

      getOperationMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getOperationMode'
        })
      }

      // romStartImage type is Protocol.RomStartImageData_PinPad, _SlideShow, _KeyPad, _Signature or _MessageBox
      setRomStartImageData(romStartImage) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomStartImageData',
          romStartImage
        })
      }

      // operationModeType is Protocol.OperationModeType value
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..10 depending on operation mode
      setRomImageHash(operationModeType, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageHash',
          operationModeType,
          imageType,
          imageNumber
        })
      }

      getRomImageHash() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getRomImageHash'
        })
      }

      // romImageDeleteMode is Protocol.RomImageDeleteMode value
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..10 depending on delete mode
      setRomImageDelete(romImageDeleteMode, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageDelete',
          romImageDeleteMode,
          imageType,
          imageNumber
        })
      }

      getCurrentImageArea() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getCurrentImageArea'
        })
      }

      // operationModeType is Protocol.OperationModeType value
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..10 depending on operationModeType mode
      setRomImageDisplay(operationModeType, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageDisplay',
          operationModeType,
          imageType,
          imageNumber
        })
      }

      getEserial() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEserial'
        })
      }

      setClearScreen() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setClearScreen'
        })
      }

      // inkingMode is a Protocol.InkingMode
      setInkingMode(inkingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setInkingMode',
          inkingMode
        })
      }

      // intf type is WacomGSS.STU.UsbInterface or WacomGSS.STU.SerialInterface
      rebind(_intf) {
        const foo = _intf
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'rebind',
          intf: _intf.toJSON()
        })
          .then(function (message) {
            if (message === null) {
              intf = foo
            }
          })
      }

      getStatus() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getStatus'
        })
      }

      // flag type is WacomGSS.STU.Protocol.ResetFlag
      setReset(flag) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setReset',
          flag
        })
      }

      getHidInformation() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHidInformation'
        })
      }

      getCapability() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getCapability'
        })
      }

      getUid() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getUid'
        })
      }

      // uid is an integer
      setUid(uid) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setUid',
          uid
        })
      }

      getUid2() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getUid2'
        })
      }

      // defaultMode type is Protocol.DefaultMode
      setDefaultMode(defaultMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDefaultMode',
          defaultMode
        })
      }

      getDefaultMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDefaultMode'
        })
      }

      getHostPublicKey() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHostPublicKey'
        })
      }

      // hostPublicKey is an integer Array[16]
      setHostPublicKey(hostPublicKey) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHostPublicKey',
          hostPublicKey
        })
      }

      getDevicePublicKey() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDevicePublicKey'
        })
      }

      // sessionId is an integer
      setStartCapture(sessionId) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setStartCapture',
          sessionId
        })
      }

      setEndCapture() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setEndCapture'
        })
      }

      getDHprime() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDHprime'
        })
      }

      // prime is an integer Array [16]
      setDHprime(prime) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDHprime',
          prime
        })
      }

      getDHbase() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDHbase'
        })
      }

      // base is an integer Array [2]
      setDHbase(prime) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDHbase',
          base
        })
      }

      // area is a Protocol.Rectangle
      setClearScreenArea(area) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setClearScreenArea',
          area
        })
      }

      getInkingMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInkingMode'
        })
      }

      getInkThreshold() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInkThreshold'
        })
      }

      // inkThreshold type is Protocol.InkThreshold
      setInkThreshold(inkThreshold) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setInkThreshold',
          inkThreshold
        })
      }

      // encodingMode type is Protocol.EncodingMode
      setStartImageData(encodingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setStartImageData',
          encodingMode
        })
      }

      // encodingMode type is Protocol.EncodingMode
      // area type is Protocol.Rectangle
      setStartImageDataArea(encodingMode, area) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setStartImageDataArea',
          encodingMode,
          area
        })
      }

      // imageDataBlock is a Base64-encoded string, where the underlying data maximum size is 2557 bytes
      setImageDataBlock(imageDataBlock) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setEndImageData',
          imageDataBlock
        })
      }

      // endImageDataFlag type is Protocol.EndImageDataFlag
      setEndImageData(encodingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setEndImageData',
          endImageDataFlag
        })
      }

      getHandwritingThicknessColor() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingThicknessColor'
        })
      }

      // handwritingThicknessColor type is Protocol.HandwritingThicknessColor
      setHandwritingThicknessColor(handwritingThicknessColor) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingThicknessColor',
          handwritingThicknessColor
        })
      }

      getHandwritingThicknessColor24() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingThicknessColor24'
        })
      }

      // handwritingThicknessColor24 type is Protocol.HandwritingThicknessColor24
      setHandwritingThicknessColor24(handwritingThicknessColor24) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingThicknessColor24',
          handwritingThicknessColor24
        })
      }

      getBackgroundColor() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBackgroundColor'
        })
      }

      // backgroundColor type is Integer
      setBackgroundColor(backgroundColor) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBackgroundColor',
          backgroundColor
        })
      }

      getBackgroundColor24() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBackgroundColor24'
        })
      }

      // backgroundColor24 type is Integer
      setBackgroundColor24(backgroundColor24) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBackgroundColor24',
          backgroundColor24
        })
      }

      // sets whether the boot image is shown at start up.
      setBootScreen(bootScreenFlag) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBootScreen',
          bootScreenFlag
        })
      }

      // retrieves whether the boot image is shown at start up.
      getBootScreen() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBootScreen'
        })
      }

      getHandwritingDisplayArea() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingDisplayArea'
        })
      }

      // handwritingDisplayArea type is Protocol.Rectangle
      setHandwritingDisplayArea(handwritingDisplayArea) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingDisplayArea',
          handwritingDisplayArea
        })
      }

      getBacklightBrightness() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBacklightBrightness'
        })
      }

      // backlightBrightness type is Integer
      setBacklightBrightness(backlightBrightness) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBacklightBrightness',
          backlightBrightness
        })
      }

      getScreenContrast() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getScreenContrast'
        })
      }

      // screenContrast type is Integer
      setScreenContrast(screenContrast) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setScreenContrast',
          screenContrast
        })
      }

      getEncryptionStatus() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEncryptionStatus'
        })
      }

      // encryptionCommandNumber type is Protocol.EncryptionCommandNumber
      getEncryptionCommand(encryptionCommandNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEncryptionCommand',
          encryptionCommandNumber
        })
      }

      getReportSizeCollection() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportSizeCollection'
        })
      }

      // reportRate is an integer
      setReportRate(reportRate) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setReportRate',
          reportRate
        })
      }

      getReportRate() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportRate'
        })
      }

      // renderingMode is Protocol.RenderingMode
      setRenderingMode(renderingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRenderingMode',
          renderingMode
        })
      }

      getRenderingMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getRenderingMode'
        })
      }
    }

    Protocol.prototype.PenDataOptionMode =
        {
          PenDataOptionMode_None: 0x00, // Report PenData/PenDataEncrypted.
          PenDataOptionMode_TimeCount: 0x01, // Report PenDataOption/PenDataEncryptedOption with timeCount field set. (520 only)
          PenDataOptionMode_SequenceNumber: 0x02, // Report PenDataOption/PenDataEncryptedOption with sequenceNumber field set.
          PenDataOptionMode_TimeCountSequence: 0x03 // Report PenDataTimeCountSequence/PenDataTimeCountSequenceEncrypted with sequenceNumber field set. (430/530 only)
        }

    Protocol.prototype.InkingMode =
        {
          InkingMode_Off: 0x00,
          InkingMode_On: 0x01
        }

    Protocol.prototype.ReportId =
        {
          ReportId_PenData: 0x01, // <b>Mode:</b> in         <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_Status: 0x03, // <b>Mode:</b>    get     <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_Reset: 0x04, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          //ReportId_05                                : 0x05, //   <b>Mode:</b> -internal- <b>Compatibility:</b> 300fw2
          ReportId_HidInformation: 0x06, // <b>Mode:</b>    get     <b>Compatibility:</b>  -   -   -   430V -  540
          ReportId_Information: 0x08, // <b>Mode:</b>    get     <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_Capability: 0x09, // <b>Mode:</b>    get     <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_Uid: 0x0a, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_Uid2: 0x0b, // <b>Mode:</b>    get     <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_DefaultMode: 0x0c, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -   430V    540
          ReportId_ReportRate: 0x0d, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -   430V    540
          ReportId_RenderingMode: 0x0e, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_Eserial: 0x0f, // <b>Mode:</b>    get     <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_PenDataEncrypted: 0x10, // <b>Mode:</b> in         <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_HostPublicKey: 0x13, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A  -   -   -
          ReportId_DevicePublicKey: 0x14, // <b>Mode:</b> in/get     <b>Compatibility:</b> 300 500 520A  -   -   -
          ReportId_StartCapture: 0x15, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_EndCapture: 0x16, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_DHprime: 0x1a, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A  -   -   -
          ReportId_DHbase: 0x1b, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A  -   -   -
          ReportId_ClearScreen: 0x20, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_InkingMode: 0x21, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_InkThreshold: 0x22, // <b>Mode:</b>    get/set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_ClearScreenArea: 0x23, // <b>Mode:</b>        set <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_StartImageDataArea: 0x24, // <b>Mode:</b>        set <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_StartImageData: 0x25, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_ImageDataBlock: 0x26, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_EndImageData: 0x27, // <b>Mode:</b>        set <b>Compatibility:</b> 300 500 520A 430 530 540
          ReportId_HandwritingThicknessColor: 0x28, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -  520A 430 530 540  *430:thickness only
          ReportId_BackgroundColor: 0x29, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -  520A  -  530 540
          ReportId_HandwritingDisplayArea: 0x2a, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -  520A 430 530 540
          ReportId_BacklightBrightness: 0x2b, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -  520A  -  530 540
          ReportId_ScreenContrast: 0x2c, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -  520A  -  530 540
          ReportId_HandwritingThicknessColor24: 0x2d, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -   430 530 540  *430:thickness only
          ReportId_BackgroundColor24: 0x2e, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -  530 540
          ReportId_BootScreen: 0x2f, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_PenDataOption: 0x30, // <b>Mode:</b> in         <b>Compatibility:</b>  -   *  520A  -   -   -   *500:fw2.03 only
          ReportId_PenDataEncryptedOption: 0x31, // <b>Mode:</b> in         <b>Compatibility:</b>  -   *  520A  -   -   -   *500:fw2.03 only
          ReportId_PenDataOptionMode: 0x32, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   *  520A 430 530 540  *500:fw2.03 only
          ReportId_PenDataTimeCountSequenceEncrypted: 0x33, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_PenDataTimeCountSequence: 0x34, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_EncryptionCommand: 0x40, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_EncryptionStatus: 0x50, // <b>Mode:</b> in/get     <b>Compatibility:</b>  -   -   -   430 530 540
          //ReportId_60                                : 0x60, //   <b>Mode:</b> -internal- <b>Compatibility:</b>  -   -   -   430 530 540
          ReportId_GetReport: 0x80, // <b>Mode:</b>        set <b>Compatibility:</b> SERIAL ONLY
          ReportId_SetResult: 0x81, // <b>Mode:</b> in         <b>Compatibility:</b> SERIAL ONLY
          ReportId_PinPadData: 0x90, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_PinPadDataEncrypted: 0x91, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_PinOperationMode: 0x92, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_OperationMode: 0x93, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_RomStartImageData: 0x94, // <b>Mode:</b>        set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_RomImageOccupancy: 0x95, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_RomImageHash: 0x96, // <b>Mode:</b>    get/set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_RomImageDelete: 0x97, // <b>Mode:</b>        set <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_CurrentImageArea: 0x98, // <b>Mode:</b>    get     <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_EventData: 0x99, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_EventDataEncrypted: 0x9a, // <b>Mode:</b> in         <b>Compatibility:</b>  -   -   -    -   -  540
          ReportId_RomImageDisplay: 0x9b, // <b>Mode:</b>        set <b>Compatibility:</b>  -   -   -    -   -  540
          //,ReportId_a0                                : 0xa0, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a2                                : 0xa2, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a3                                : 0xa3, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a5                                : 0xa5, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a6                                : 0xa6, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a7                                : 0xa7, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a8                                : 0xa8, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_a9                                : 0xa9, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_aa                                : 0xaa, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_ab                                : 0xab, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_ac                                : 0xac, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_ad                                : 0xad, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_ae                                : 0xae, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_af                                : 0xaf, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_b0                                : 0xb0, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_b2                                : 0xb2, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_b3                                : 0xb3, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          //ReportId_b4                                : 0xb4, //   <b>Mode:</b> -internal- <b>Compatibility:</b>
          ReportId_ReportSizeCollection: 0xff, // <b>Mode:</b>    get     <b>Compatibility:</b>  -   -   -   430V -   -

          // SigCaptX specific
          Decrypt: 0x100, // for backwards compatibility
          SigCaptX_Decrypt: 0x100,
          SigCaptX_TabletDisconnected: 0x101

        }

    Protocol.prototype.DefaultMode =
        {
          DefaultMode_HID: 0x1, // communications protocol will be STU/HID/USB
          DefaultMode_Serial: 0x2 // communications protocol will be STU/Serial/USB
        }

    Protocol.prototype.StatusCode =
        {
          StatusCode_Ready: 0x00, // Normal state; tablet is transferring pen coordinates. Ready to receive commands.
          StatusCode_Image: 0x01, // %Tablet switches to this after ReportId_StartImageData.
          StatusCode_Capture: 0x02, // %Tablet switches to this after ReportId_StartCapture; tablet is transferring encrypted pen coordinates. Ready to receive commands.
          StatusCode_Calculation: 0x03, // %Tablet is calculating encryption keys.
          StatusCode_Image_Boot: 0x04, // %Tablet is displaying the boot image. The tablet will automatically change to Ready when finished.
          StatusCode_RomBusy: 0x05, // %Tablet is accessing the ROM.
          StatusCode_SystemReset: 0xff // %Tablet is resetting. So, any function isn't available.
        }

    Protocol.prototype.ErrorCode =
        {
          ErrorCode_None: 0x00, // Operation completed successfully.
          ErrorCode_WrongReportId: 0x01, // Wrong ReportId in received command.
          ErrorCode_WrongState: 0x02, // Command was received when the tablet was in the wrong state, it cannot be processed.

          ErrorCode_CRC: 0x03, // CRC error was detected in packed received by the tablet (serial interface only).
          ErrorCode_GraphicsWrongEncodingType: 0x10, // Wrong encoding type in report data.
          ErrorCode_GraphicsImageTooLong: 0x11, // Trying to draw outside video memory.
          ErrorCode_GraphicsZlibError: 0x12, // An error was returned by the ZLIB inflate function.

          ErrorCode_GraphicsWrongParameters: 0x15, // Image area or handwriting display area is invalid.

          ErrorCode_PadNotExist: 0x20, // The image for this pad setting does not exist, only used for PINpad and KEYpad mode.
          ErrorCode_RomSizeOverflow: 0x33, // The image size exceed the limitation
          ErrorCode_RomInvalidParameter: 0x34, // Parameter is not valid when using ROM image, such as wrong image number
          ErrorCode_RomErrorCRC: 0x35 // CRC error occurs when writing image to ROM

          //ErrorCode_GraphicsSprleImageOverflow  : 0x1E,   // undocumented
          //ErrorCode_GraphicsSprleBlockOverflow  : 0x1F,   // undocumented

          //ErrorCode_Crypt_errors                : 0x20,   // undocumented
          //ErrorCode_Crypt_dh_zero_input         : 0x21,   // undocumented
          //ErrorCode_Crypt_dh_test_failed        : 0x22,   // undocumented
          //ErrorCode_Crypt_dh_wrong_module       : 0x23,   // undocumented
          //ErrorCode_Crypt_dh_wrong_base         : 0x24,   // undocumented
          //ErrorCode_Crypt_dh_wrong_openkey      : 0x25,   // undocumented
          //ErrorCode_Crypt_dh_key_invalid        : 0x26,   // undocumented
          //ErrorCode_Crypt_engine_invalid        : 0x27,   // undocumented

          //ErrorCode_Internal                    :  0x80 ~ 0xff
        }

    Protocol.prototype.Rectangle =
        {
          upperLeftXpixel: 0,
          upperLeftYpixel: 0,
          lowerRightXpixel: 0,
          lowerRightYpixel: 0
        }

    Protocol.prototype.InkThreshold =
        {
          onPressureMark: 0,
          offPressureMark: 0
        }

    Protocol.prototype.HandwritingThicknessColor =
        {
          penColor: 0,
          penThickness: 0
        }

    Protocol.prototype.HandwritingThicknessColor24 =
        {
          penColor: 0,
          penThickness: 0
        }

    Protocol.prototype.EncryptionCommandNumber =
        {
          EncryptionCommandNumber_SetEncryptionType: 0x01,
          EncryptionCommandNumber_SetParameterBlock: 0x02,
          EncryptionCommandNumber_GetStatusBlock: 0x03,
          EncryptionCommandNumber_GetParameterBlock: 0x04,
          EncryptionCommandNumber_GenerateSymmetricKey: 0x05
          //EncryptionCommandNumber_Reserved_06          : 0x06,
          //EncryptionCommandNumber_Reserved_07          : 0x07,
          //EncryptionCommandNumber_Reserved_08          : 0x08,
          //EncryptionCommandNumber_Reserved_09          : 0x09
        }

    Protocol.prototype.EncodingMode =
        {
          EncodingMode_1bit: 0x00, // uncompressed monochrome
          EncodingMode_1bit_Zlib: 0x01, // Zlib-compressed monochrome
          EncodingMode_16bit: 0x02, // uncompressed color
          EncodingMode_24bit: 0x04, // uncompressed color (530 only)
          EncodingMode_1bit_Bulk: 0x10, // data will be sent using Interface::write() instead of Interface::set().
          EncodingMode_16bit_Bulk: 0x12, // data will be sent using Interface::write() instead of Interface::set().
          EncodingMode_24bit_Bulk: 0x14 // data will be sent using Interface::write() instead of Interface::set() (530 only).
        }

    Protocol.prototype.EndImageDataFlag =
        {
          EndImageDataFlag_Commit: 0x00,
          EndImageDataFlag_Abandon: 0x01
        }

    Protocol.prototype.ResetFlag =
        {
          ResetFlag_Software: 0x00, // Perform a soft reset.
          ResetFlag_Hardware: 0x01 // Perform a hard reset.
        }

    Protocol.prototype.EncodingFlag =
        {
          EncodingFlag_Zlib: 0x01, // set if ZLIB is supported for color compression (not bulk).
          EncodingFlag_1bit: 0x02,
          EncodingFlag_16bit: 0x04,
          EncodingFlag_24bit: 0x08
        }

    Protocol.prototype.StatusCodeRSA =
        {
          StatusCodeRSA_Ready: 0x00,
          StatusCodeRSA_Calculating: 0xFA,
          StatusCodeRSA_Even: 0xFB,
          StatusCodeRSA_Long: 0xFC,
          StatusCodeRSA_Short: 0xFD,
          StatusCodeRSA_Invalid: 0xFE,
          StatusCodeRSA_NotReady: 0xFF
        }

    Protocol.prototype.ErrorCodeRSA =
        {
          ErrorCodeRSA_None: 0x00,
          ErrorCodeRSA_BadParameter: 0x01,
          ErrorCodeRSA_ParameterTooLong: 0x02,
          ErrorCodeRSA_PublicKeyNotReady: 0x03,
          ErrorCodeRSA_PublicExponentNotReady: 0x04,
          ErrorCodeRSA_SpecifiedKeyInUse: 0x05,
          ErrorCodeRSA_SpecifiedKeyNotInUse: 0x06,
          ErrorCodeRSA_BadCommandCode: 0x07,
          ErrorCodeRSA_CommandPending: 0x08,
          ErrorCodeRSA_SpecifiedKeyExists: 0x09,
          ErrorCodeRSA_SpecifiedKeyNotExist: 0x0A,
          ErrorCodeRSA_NotInitialized: 0x0B
        }

    Protocol.prototype.SymmetricKeyType =
        {
          SymmetricKeyType_AES128: 0,
          SymmetricKeyType_AES192: 1,
          SymmetricKeyType_AES256: 2
        }

    Protocol.prototype.AsymmetricKeyType =
        {
          AsymmetricKeyType_RSA1024: 0,
          AsymmetricKeyType_RSA1536: 1,
          AsymmetricKeyType_RSA2048: 2
        }

    Protocol.prototype.AsymmetricPaddingType =
        {
          AsymmetricPaddingType_None: 0,
          AsymmetricPaddingType_PKCS1: 1,
          AsymmetricPaddingType_OAEP: 2
        }

    Protocol.prototype.AsymmetricPaddingType =
        {
          EncryptionCommandParameterBlockIndex_RSAe: 0,
          EncryptionCommandParameterBlockIndex_RSAn: 1,
          EncryptionCommandParameterBlockIndex_RSAc: 2,
          EncryptionCommandParameterBlockIndex_RSAm: 3
        }

    Protocol.prototype.RomImageDeleteMode =
        {
          RomImageDeleteMode_All: 0x00,
          RomImageDeleteMode_PinPad_All: 0x01,
          RomImageDeleteMode_SlideShow_All: 0x02,
          RomImageDeleteMode_KeyPad_All: 0x03,
          RomImageDeleteMode_Signature_All: 0x04,
          RomImageDeleteMode_MessageBox_All: 0x05,
          RomImageDeleteMode_PinPad_Number: 0x06,
          RomImageDeleteMode_SlideShow_Number: 0x07,
          RomImageDeleteMode_KeyPad_Number: 0x08,
          RomImageDeleteMode_Signature_Number: 0x09,
          RomImageDeleteMode_MessageBox_Number: 0x0a
        }

    Protocol.prototype.OperationModeType =
        {
          OperationModeType_Normal: 0x00, // Tablet will return PenData
          OperationModeType_PinPad: 0x01, // Tablet will return PinPadData
          OperationModeType_SlideShow: 0x02, // Tablet will display bitmaps and not return pen data
          OperationModeType_KeyPad: 0x03, // Tablet will return KeyPadData
          OperationModeType_Signature: 0x04, // Tablet will display signature capture screen and buttons
          OperationModeType_MessageBox: 0x05 // not used in setOperationMode, @see setRomStartImage
        }

    Protocol.prototype.ImageDataBlock_maxLengthHID = 253
    Protocol.prototype.ImageDataBlock_maxLengthSerial = 2557
    Protocol.prototype.ImageDataBlock_maxLength540 = 2557

    Protocol.prototype.OperationMode_Normal = (function () {
      class OperationMode_Normal {
        constructor() {
          this.operationMode = 0x00 // Protocol.OperationModeType.OperationModeType_Normal
          this.data = []
        }
      }

      return OperationMode_Normal
    })()

    // screenSelect     1..3
    // pinBypass        When bypass is enable, digit 0 is approved if minDigit is not 0
    // minDigit         0..12  (minimum digit must be less than maximum digit)
    // maxDigit         0..12
    // numberHiddenMode 0=disable, 1=enable (number is changed to *)
    // idAfterEnter     0=blank screen; 1-6 message box screen
    // idAfterCancel    0=blank screen; 1-6 message box screen
    Protocol.prototype.OperationMode_PinPad = (function () {
      class OperationMode_PinPad {
        constructor(screenSelect, pinBypass, minDigit, maxDigit, numberHiddenMode, idAfterEnter, idAfterCancel) {
          this.operationMode = 0x01 // Protocol.OperationModeType.OperationModeType_PinPad
          this.data = []

          this.data[0] = screenSelect
          this.data[1] = Number(pinBypass)
          this.data[2] = minDigit
          this.data[3] = maxDigit
          this.data[4] = Number(numberHiddenMode)
          this.data[5] = idAfterEnter
          this.data[6] = idAfterCancel
        }
      }

      return OperationMode_PinPad
    })()

    // workingMode      0=round robin (need to set number and slideNumber accordingly); 1-10=slide number (only one slide shown)
    // numberOfSlides   2..10 number of slides to show
    // slideNumber      array of numbers of slides to show
    // interval         2..120 interval in seconds.
    Protocol.prototype.OperationMode_SlideShow = (function () {
      class OperationMode_SlideShow {
        constructor(workingMode, numberOfSlides, slideNumber, interval) {
          this.operationMode = 0x02 // Protocol.OperationModeType.OperationModeType_SlideShow,
          this.data = []

          this.data[0] = workingMode
          this.data[1] = numberOfSlides

          this.data[2] = ((slideNumber[0] & 0x0f) << 4) | (slideNumber[1] & 0x0f)
          this.data[3] = ((slideNumber[2] & 0x0f) << 4) | (slideNumber[3] & 0x0f)
          this.data[4] = ((slideNumber[4] & 0x0f) << 4) | (slideNumber[5] & 0x0f)
          this.data[5] = ((slideNumber[6] & 0x0f) << 4) | (slideNumber[7] & 0x0f)
          this.data[6] = ((slideNumber[8] & 0x0f) << 4) | (slideNumber[9] & 0x0f)

          this.data[7] = ((interval >> 24) & 0xff)
          this.data[8] = ((interval >> 16) & 0xff)
          this.data[9] = ((interval >> 8) & 0xff)
          this.data[10] = ((interval) & 0xff)
        }
      }

      return OperationMode_SlideShow
    })()

    // screenSelect   1..3
    // idAfterSelect  0=blank screen; 1-6 message box screen
    Protocol.prototype.OperationMode_KeyPad = (function () {
      class OperationMode_KeyPad {
        constructor(screenSelect, idAfterSelect) {
          this.operationMode = 0x03 // Protocol.OperationModeType.OperationModeType_KeyPad,
          this.data = []

          this.data[0] = screenSelect
          this.data[1] = idAfterSelect
        }
      }

      return OperationMode_KeyPad
    })()

    // signatureScreen  1 to 3: screen pattern select
    // keyDefinition    0=Cancel; 1=Enter; 2=Clear. The 3 keys must be defined differently
    // idAfterEnter     0=blank screen; 1-6 message box screen
    // idAfterCancel    0=blank screen; 1-6 message box screen
    Protocol.prototype.OperationMode_Signature = (function () {
      class OperationMode_Signature {
        constructor(signatureScreen, keyDefinition, idAfterEnter, idAfterCancel) {
          this.operationMode = 0x04 // Protocol.OperationModeType.OperationModeType_Signature,
          this.data = []

          this.data[0] = signatureScreen
          this.data[1] = keyDefinition[0]
          this.data[2] = keyDefinition[1]
          this.data[3] = keyDefinition[2]
          this.data[4] = idAfterEnter
        }
      }

      return OperationMode_Signature
    })()

    Protocol.prototype.RomStartImageData_PinPad = (function () {
      // encodingMode Protocol.EncodingMode (must be 24-bit)
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..3
      // padType      1 = numbers only; 2 = include '*' & '#' keys; 3 =  include '.' & '00' keys
      // keyLayout    1..5
      class RomStartImageData_PinPad {
        constructor(encodingMode, imageType, imageNumber, padType, keyLayout) {
          this.encodingMode = encodingMode
          this.operationMode = 0x01 // Protocol.OperationModeType.OperationModeType_PinPad
          this.imageType = imageType
          this.imageNumber = imageNumber
          this.data = [padType, keyLayout, 0]
        }
      }

      return RomStartImageData_PinPad
    })()

    Protocol.prototype.RomStartImageData_SlideShow = (function () {
      // encodingMode Protocol.EncodingMode (must be 24-bit)
      // imageType    not used
      // imageNumber  1..10
      class RomStartImageData_SlideShow {
        constructor(encodingMode, imageType, imageNumber) {
          this.encodingMode = encodingMode
          this.operationMode = 0x02 // Protocol.OperationModeType.OperationModeType_SlideShow
          this.imageType = imageType
          this.imageNumber = imageNumber
          this.data = [0, 0, 0]
        }
      }

      return RomStartImageData_SlideShow
    })()

    Protocol.prototype.RomStartImageData_KeyPad = (function () {
      // encodingMode Protocol.EncodingMode (must be 24-bit)
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..3
      // padType      1 = 9 button layout; 2 = 6 button layout; 3 = 4 button layout
      // keyEnabled   array of 9, 6 or 4 key enabled states
      class RomStartImageData_KeyPad {
        constructor(encodingMode, imageType, imageNumber, padType, keyEnabled) {
          this.encodingMode = encodingMode
          this.operationMode = 0x03 // Protocol.OperationModeType.OperationModeType_KeyPad
          this.imageType = imageType
          this.imageNumber = imageNumber
          this.data = []
          this.data[0] = padType
          this.data[1] = (keyEnabled.length > 8 && keyEnabled[8]) ? 0x01 : 0
          this.data[2] = ((keyEnabled.length > 7 && keyEnabled[7]) ? 0x80 : 0) |
                        ((keyEnabled.length > 6 && keyEnabled[6]) ? 0x40 : 0) |
                        ((keyEnabled.length > 5 && keyEnabled[5]) ? 0x20 : 0) |
                        ((keyEnabled.length > 4 && keyEnabled[4]) ? 0x10 : 0) |
                        ((keyEnabled.length > 3 && keyEnabled[3]) ? 0x08 : 0) |
                        ((keyEnabled.length > 2 && keyEnabled[2]) ? 0x04 : 0) |
                        ((keyEnabled.length > 1 && keyEnabled[1]) ? 0x02 : 0) |
                        ((keyEnabled.length > 0 && keyEnabled[0]) ? 0x01 : 0)
        }
      }

      return RomStartImageData_KeyPad
    })()

    Protocol.prototype.RomStartImageData_Signature = (function () {
      // encodingMode Protocol.EncodingMode (must be 24-bit)
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..3
      // keyEnabled
      class RomStartImageData_Signature {
        constructor(encodingMode, imageType, imageNumber, keyEnabled) {
          this.encodingMode = encodingMode
          this.operationMode = 0x04 // Protocol.OperationModeType.OperationModeType_Signature
          this.imageType = imageType
          this.imageNumber = imageNumber
          this.data = []
          this.data[0] = (keyEnabled[2] ? 0x04 : 0) |
                        (keyEnabled[1] ? 0x02 : 0) |
                        (keyEnabled[0] ? 0x01 : 0)
        }
      }

      return RomStartImageData_Signature
    })()

    Protocol.prototype.RomStartImageData_MessageBox = (function () {
      // encodingMode Protocol.EncodingMode (must be 24-bit)
      // imageType    not used
      // imageNumber  1..6
      class RomStartImageData_MessageBox {
        constructor(encodingMode, imageNumber) {
          this.encodingMode = encodingMode
          this.operationMode = 0x05 // Protocol.OperationModeType.OperationModeType_MessageBox
          this.imageType = false
          this.imageNumber = imageNumber
          this.data = [0, 0, 0]
        }
      }

      return RomStartImageData_MessageBox
    })()

    // governs operation of boot screen image display
    Protocol.prototype.BootScreenFlag =
        {
          Disable: 0x00,
          Enable: 0x01
        }

    Protocol.prototype.EncryptionCommand = (function () {
      const scope = 'WacomGSS.STU.Protocol'

      class copyData {
        constructor(other) {
          this.encryptionCommandNumber = other.encryptionCommandNumber
          this.parameter = other.parameter
          this.lengthOrIndex = other.lengthOrIndex
          this.data = other.data
        }
      }

      class EncryptionCommand {
        constructor() {
          this.encryptionCommandNumber = 0 // type is Protocol.EncryptionCommandNumber
          this.parameter = 0 // unsigned 8-bit integer
          this.lengthOrIndex = 0 // unsigned 8-bit integer
          this.data = [] // array of 64 unsigned 8-bit integers (512 bits)
        }

        // symmetricKeyType type is Protocol.SymmetricKeyType
        // asymmetricPaddingType type is Protocol.AsymmetricPaddingType
        // asymmetricKeyType type is Protocol.AsymmetricKeyType
        initializeSetEncryptionType(symmetricKeyType, asymmetricPaddingType, asymmetricKeyType) {
          return WacomGSS.STU.send({
            scope,
            function: 'EncryptionCommand_initializeSetEncryptionType',
            symmetricKeyType,
            asymmetricPaddingType,
            asymmetricKeyType
          })
            .then(function (message) {
              copyData.call(this, message)
              return this
            })
        }

        // index type is EncryptionCommandParameterBlockIndex
        // data is an integer array
        initializeSetParameterBlock(index, data) {
          return WacomGSS.STU.send({
            scope,
            function: 'EncryptionCommand_initializeSetParameterBlock',
            index,
            data
          })
            .then(function (message) {
              copyData.call(this, message)
              return this
            })
        }

        initializeGenerateSymmetricKey() {
          return WacomGSS.STU.send({
            scope,
            function: 'EncryptionCommand_initializeGenerateSymmetricKey'
          })
            .then(function (message) {
              copyData.call(this, message)
              return this
            })
        }

        // index type is EncryptionCommandParameterBlockIndex
        // offset is an integer
        initializeGetParameterBlock(index, offset) {
          return WacomGSS.STU.send({
            scope,
            function: 'EncryptionCommand_initializeGetParameterBlock'
          })
            .then(function (message) {
              copyData.call(this, message)
              return this
            })
        }
      }

      return EncryptionCommand
    })()

    // Selects ink algorithm to use
    Protocol.prototype.RenderingMode =
        {
          RenderingMode_Legacy: 0x00, // legacy rendering (default)
          RenderingMode_WILL: 0x01 // high quality WILL rendering
        }

    return Protocol
  })()

  STU.prototype.ProtocolHelper =
    {
      ReportHandler: (function () {
        const scope = 'WacomGSS.STU.ProtocolHelper.ReportHandler'
        let streamId = null
        let id = null

        class ReportHandler {
          constructor() {
            this.onReportPenData = function (message) { }
            this.onReportPenDataOption = function (message) { }
            this.onReportPenDataTimeCountSequence = function (message) { }
            this.onReportPenDataEncrypted = function (message) { }
            this.onReportPenDataEncryptedOption = function (message) { }
            this.onReportPenDataTimeCountSequenceEncrypted = function (message) { }
            this.onReportDevicePublicKey = function (message) { }
            this.onReportEncryptionStatus = function (message) { }
            this.onReportEventDataPinPad = function (message) { }
            this.onReportEventDataKeyPad = function (message) { }
            this.onReportEventDataSignature = function (message) { }
            this.onReportEventDataPinPadEncrypted = function (message) { }
            this.onReportEventDataKeyPadEncrypted = function (message) { }
            this.onReportEventDataSignatureEncrypted = function (message) { }

            this.decrypt = function (message) { }
            this.tabletDisconnected = function (message) { }

            this.stream = function (message) {
              const protocol = new WacomGSS.STU.Protocol()
              switch (message.reportId) {
                case protocol.ReportId.ReportId_PenData:
                  this.onReportPenData(message)
                  break
                case protocol.ReportId.ReportId_PenDataOption:
                  this.onReportPenDataOption(message)
                  break
                case protocol.ReportId.ReportId_PenDataTimeCountSequence:
                  this.onReportPenDataTimeCountSequence(message)
                  break
                case protocol.ReportId.ReportId_PenDataEncrypted:
                  this.onReportPenDataEncrypted(message)
                  break
                case protocol.ReportId.ReportId_PenDataEncryptedOption:
                  this.onReportPenDataEncryptedOption(message)
                  break
                case protocol.ReportId.ReportId_PenDataTimeCountSequenceEncrypted:
                  this.onReportPenDataTimeCountSequenceEncrypted(message)
                  break
                case protocol.ReportId.ReportId_DevicePublicKey:
                  this.onReportDevicePublicKey(message)
                  break
                case protocol.ReportId.ReportId_EncryptionStatus:
                  this.onReportEncryptionStatus(message)
                  break
                case protocol.ReportId.ReportId_EventData:
                  this.onEventData(protocol, message)
                  break
                case protocol.ReportId.ReportId_EventDataEncrypted:
                  this.onEventDataEncrypted(protocol, message)
                  break

                case protocol.ReportId.SigCaptX_Decrypt:
                  this.decrypt(message)
                  break
                case protocol.ReportId.SigCaptX_TabletDisconnected:
                  this.tabletDisconnected(message)
                  break

                default:
                  break
              }
            }
          }

          // _interfaceQueueHolder can be a UsbInterface, SerialInterface or Tablet
          // tabletDecrypt is a Boolean. If true it will set callback to tablet.decrypt()
          startReporting(_interfaceQueueHolder, tabletDecrypt) {
            streamId = WacomGSS.STU.setStream(this)
            return WacomGSS.STU.send({
              interfaceQueueHolder: _interfaceQueueHolder.toJSON(),
              scope,
              function: 'startReporting',
              streamId,
              tabletDecrypt: (tabletDecrypt === true)
            })
              .then(function (message) {
                id = message.id
                return message
              })
          }

          stopReporting() {
            if (streamId === null) {
              throw 'Error: trying to stop reporting before starting'
            }
            return WacomGSS.STU.send({
              id,
              scope,
              function: 'stopReporting'
            })
              .then(function (message) {
                WacomGSS.STU.removeStream(streamId)
                return message
              })
          }

          onEventData(protocol, message) {
            switch (message.operationModeType) {
              case protocol.OperationModeType.OperationModeType_PinPad:
                this.onReportEventDataPinPad(message)
                break
              case protocol.OperationModeType.OperationModeType_KeyPad:
                this.onReportEventDataKeyPad(message)
                break
              case protocol.OperationModeType.OperationModeType_Signature:
                this.onReportEventDataSignature(message)
                break
              default:
                break
            }
          }

          onEventDataEncrypted(protocol, message) {
            switch (message.operationModeType) {
              case protocol.OperationModeType.OperationModeType_PinPad:
                this.onReportEventDataPinPadEncrypted(message)
                break
              case protocol.OperationModeType.OperationModeType_KeyPad:
                this.onReportEventDataKeyPadEncrypted(message)
                break
              case protocol.OperationModeType.OperationModeType_Signature:
                this.onReportEventDataSignatureEncrypted(message)
                break
              default:
                break
            }
          }
        }

        return ReportHandler
      })(),
      InkState_isOff: 0x01,
      InkState_isOn: 0x02,
      InkState_isInk: 0x04,
      InkState_isFirst: 0x08,
      InkState_isLast: 0x10,
      InkState:
        {
          //               InkState_isOff|InkState_isOn|InkState_isInk|InkState_isFirst|InkState_isLast
          InkState_Up: 0x01, // No ink is being drawn
          InkState_Down: 0x02, // No ink is being drawn
          InkState_Inking: 0x02 | 0x04, // Ink is being drawn
          InkState_First: 0x02 | 0x04 | 0x08, // This is the first point of ink to draw.
          InkState_Last: 0x01 | 0x10 // This marks that inking has finished. You should not draw this point.
        },
      OpDirection:
        {
          OpDirection_Get: 0x0100,
          OpDirection_Set: 0x0200
        },
      // statusCode is an Integer
      // reportId is an Integer
      // opDirection type is ProtocolHelper.OpDirection
      statusCanSend: function (statusCode, reportId, opDirection) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'statusCanSend',
          statusCode,
          reportId,
          opDirection
        })
      },
      // protocol type is WacomGSS.STU.Procotol
      // reportId type is Protocol.ReportId
      // opDirection type is ProtocolHelper.OpDirection
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      waitForStatusToSend: function (protocol, reportId, opDirection, retries, sleepBetweenRetries) {
        const deferred = Q.defer()
        function myLoop() {
          protocol.getStatus()
            .then(function (status) {
              return WacomGSS.STU.ProtocolHelper.statusCanSend(status.statusCode, reportId, opDirection)
            })
            .then(function (canSend) {
              if (canSend === true) {
                deferred.resolve()
                return
              }
              if (retries <= 0) {
                deferred.reject(new Error('timeout error'))
                return
              }
              retries--
              setTimeout(myLoop, sleepBetweenRetries)
            })
        }
        setTimeout(myLoop, 0)
        return deferred.promise
      },
      // protocol type is WacomGSS.STU.Procotol
      // statusCode type is Protocol.StatusCode
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      waitForStatus: function (protocol, statusCode, retries, sleepBetweenRetries) {
        const deferred = Q.defer()
        function myLoop() {
          protocol.getStatus()
            .then(function (status) {
              if (status.statusCode === statusCode) {
                deferred.resolve()
                return
              }
              if (retries <= 0) {
                deferred.reject(new Error('timeout error'))
                return
              }
              retries--
              setTimeout(myLoop, sleepBetweenRetries)
            })
        }
        setTimeout(myLoop, 0)
        return deferred.promise
      },
      // protocol type is WacomGSS.STU.Procotol
      supportsEncryption: function (protocol) {
        const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Get
        return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol, WacomGSS.STU.Protocol.ReportId.ReportId_DHprime, opDirection, 25, 50)
          .then(function (message) {
            return WacomGSS.STU.send
            ({
              scope: 'WacomGSS.STU.ProtocolHelper',
              function: 'supportsEncryption',
              protocol
            })
          })
      },
      // dhPrime is an Integer array (16 bytes)
      supportsEncryption_DHprime: function (dhPrime) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'supportsEncryption_DHprime',
          dhPrime
        })
      },
      // protocol type is WacomGSS.STU.Procotol
      // hostPublicKey type is an Integer Array (16 bytes)
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      setHostPublicKeyAndPollForDevicePublicKey: function (protocol, hostPublicKey, retries, sleepBetweenRetries) {
        return protocol.setHostPublicKey(hostPublicKey)
          .then(function (message) {
            const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Get
            return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol, WacomGSS.STU.Protocol.ReportId.ReportId_DevicePublicKey, opDirection, retries, sleepBetweenRetries)
          })
          .then(function (message) {
            return protocol.getDevicePublicKey()
          })
          .then(function (message) {
            if (message.length !== hostPublicKey.length) {
              throw new Error('Unexpected key size')
            }
            return message
          })
      },
      // protocol type is WacomGSS.STU.Procotol
      // encodingMode type is Protocol.EncodingMode
      // imageData type is a base64-encoded image string, or a DataStore reference to it
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      writeImage: function (protocol, encodingMode, imageData, retries, sleepBetweenRetries) {
        retries = (typeof retries === 'undefined') ? 25 : retries
        sleepBetweenRetries = (typeof sleepBetweenRetries === 'undefined') ? 25 : sleepBetweenRetries
        const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Set
        return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol, WacomGSS.STU.Protocol.ReportId.ReportId_StartImageData, opDirection, retries, sleepBetweenRetries)
          .then(function (message) {
            return protocol.setStartImageData(encodingMode)
          })
          .then(function (message) {
            const maxImageBlockSize = protocol.ImageDataBlock_maxLengthHID
            return WacomGSS.STU.ProtocolHelper.writeImageCommon(protocol, encodingMode, maxImageBlockSize, imageData, retries, sleepBetweenRetries)
          })
      },
      // protocol type is WacomGSS.STU.Procotol
      // encodingMode type is Protocol.EncodingMode
      // maxImageBlockSize type is Integer
      // imageData type is a base64-encoded image string, or a DataStore reference to it
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      writeImageCommon: function (protocol, encodingMode, maxImageBlockSize, imageData, retries, sleepBetweenRetries) {
        if (maxImageBlockSize > protocol.ImageDataBlock_maxLengthSerial) {
          throw new Error('Invalid maxImageBlockSize')
        }
        const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Set
        return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol, WacomGSS.STU.Protocol.ReportId.ReportId_ImageDataBlock, opDirection, retries, sleepBetweenRetries)
          .then(function (message) {
            return WacomGSS.STU.send
            ({
              scope: 'WacomGSS.STU.ProtocolHelper',
              function: 'writeImageCommon',
              protocol: protocol.toJSON(),
              intf: protocol.getInterface().toJSON(),
              encodingMode,
              imageData,
              maxImageBlockSize
            })
          })
      },
      // b64Data type is a base64-encoded image string, or a DataStore reference to it
      // screenWidth type is Integer
      // screenHeight type is Integer
      // dataStore type is Boolean. If true, flattenMonochrome will return a DataStore object, otherwise it will return the raw b64-encoded data
      flattenMonochrome: function (b64Data, screenWidth, screenHeight, dataStore) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'flattenMonochrome',
          b64Data,
          screenWidth,
          screenHeight,
          dataStore: (dataStore === true)
        })
          .then(function (message) {
            if (typeof message === 'string') {
              return message
            }
            const dataStore = new WacomGSS.STU.DataStore()
            dataStore.setId(message.id)
            return dataStore
          })
      },
      // encodingMode type is Protocol.EncodingMode
      // b64Data type is a base64-encoded image string, or a DataStore reference to it
      // screenWidth type is Integer
      // screenHeight type is Integer
      // dataStore type is Boolean. If true, resizeAndFlatten will return a DataStore object, otherwise it will return the raw b64-encoded data
      flatten: function (encodingMode, b64Data, screenWidth, screenHeight, dataStore) {
        const p = new WacomGSS.STU.Protocol()
        switch (encodingMode) {
          case p.EncodingMode.EncodingMode_24bit:
          case p.EncodingMode.EncodingMode_24bit_Bulk:
            return WacomGSS.STU.ProtocolHelper.flattenColor24(b64Data, screenWidth, screenHeight, dataStore)
            break
          case p.EncodingMode.EncodingMode_16bit:
          case p.EncodingMode.EncodingMode_16bit_Bulk:
            return WacomGSS.STU.ProtocolHelper.flattenColor16(b64Data, screenWidth, screenHeight, dataStore)
            break
          case p.EncodingMode.EncodingMode_1bit:
          case p.EncodingMode.EncodingMode_1bit_Bulk:
            return WacomGSS.STU.ProtocolHelper.flattenMonochrome(b64Data, screenWidth, screenHeight, dataStore)
            break
        }
      },
      // b64Data type is a base64-encoded image string, or a DataStore reference to it
      // offsetX type is Integer
      // offsetY type is Integer
      // bitmapWidth type is Integer
      // bitmapHeight type is Integer
      // screenWidth type is Integer
      // screenHeight type is Integer
      // encodingMode type is Integer
      // scale type is Integer
      // backgroundColor type is Integer
      // clip type is Integer
      // dataStore type is Boolean. If true, resizeAndFlatten will return a DataStore object, otherwise it will return the raw b64-encoded data
      resizeAndFlatten: function (b64Data, offsetX, offsetY, bitmapWidth, bitmapHeight, screenWidth, screenHeight, encodingMode, scale, backgroundColor, clip, dataStore) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'resizeAndFlatten',
          b64Data,
          offsetX,
          offsetY,
          bitmapWidth,
          bitmapHeight,
          screenWidth,
          screenHeight,
          encodingMode,
          scale,
          backgroundColor,
          clip,
          dataStore: (dataStore === true)
        })
          .then(function (message) {
            if (typeof message === 'string') {
              return message
            }
            const dataStore = new WacomGSS.STU.DataStore()
            dataStore.setId(message.id)
            return dataStore
          })
      },
      // screenWidth type is Integer
      encodingFlagSupportsColor: function (screenWidth) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'encodingFlagSupportsColor',
          screenWidth
        })
      },
      // b64Data type is a base64-encoded image string, or a DataStore reference to it
      // screenWidth type is Integer
      // screenHeight type is Integer
      // dataStore type is Boolean. If true, flattenColor16 will return a DataStore object, otherwise it will return the raw b64-encoded data
      flattenColor16: function (b64Data, screenWidth, screenHeight, dataStore) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'flattenColor16',
          b64Data,
          screenWidth,
          screenHeight,
          dataStore: (dataStore === true)
        })
          .then(function (message) {
            if (typeof message === 'string') {
              return message
            }
            const dataStore = new WacomGSS.STU.DataStore()
            dataStore.setId(message.id)
            return dataStore
          })
      },
      // b64Data type is a base64-encoded image string, or a DataStore reference to it
      // screenWidth type is Integer
      // screenHeight type is Integer
      // dataStore type is Boolean. If true, flattenColor24 will return a DataStore object, otherwise it will return the raw b64-encoded data
      flattenColor24: function (b64Data, screenWidth, screenHeight, dataStore) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'flattenColor24',
          b64Data,
          screenWidth,
          screenHeight,
          dataStore: (dataStore === true)
        })
          .then(function (message) {
            if (typeof message === 'string') {
              return message
            }
            const dataStore = new WacomGSS.STU.DataStore()
            dataStore.setId(message.id)
            return dataStore
          })
      },
      // protocol type is WacomGSS.STU.Procotol
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      // timeout is an Integer (milliseconds)
      generateSymmetricKeyAndWaitForEncryptionStatus: function (protocol, retries, sleepBetweenRetries, timeout) {
        const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Set
        const deferred = Q.defer()
        const ticket2 = getTicket()
        table[ticket2] = deferred

        return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol,
          WacomGSS.STU.Protocol.ReportId.ReportId_EncryptionCommand,
          opDirection,
          retries,
          sleepBetweenRetries)
          .then(function (message) {
            return WacomGSS.STU.send
            ({
              scope: 'WacomGSS.STU.ProtocolHelper',
              function: 'generateSymmetricKeyAndWaitForEncryptionStatus',
              protocol: protocol.toJSON(),
              intf: protocol.getInterface().toJSON(),
              timeout,
              sleepBetweenRetries,
              ticket2
            })
              .then(function (message) {
                return deferred.promise
              })
          })
      },
      // idProduct type is Integer
      // encodingFlag type is Integer
      simulateEncodingFlag: function (idProduct, encodingFlag) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'simulateEncodingFlag',
          idProduct,
          encodingFlag: (typeof obj === 'undefined' ? 0 : encodingFlag)
        })
      },
      // protocol type is WacomGSS.STU.Procotol
      // encodingMode type is Protocol.EncodingMode
      // area type is Protocol.Rectangle
      // imageData type is a base64-encoded image string, or a DataStore reference to it
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      writeImageArea: function (protocol, encodingMode, area, imageData, retries, sleepBetweenRetries) {
        retries = (typeof retries === 'undefined') ? 25 : retries
        sleepBetweenRetries = (typeof sleepBetweenRetries === 'undefined') ? 25 : sleepBetweenRetries
        const opDirection = WacomGSS.STU.ProtocolHelper.OpDirection.OpDirection_Set
        return WacomGSS.STU.ProtocolHelper.waitForStatusToSend(protocol,
          WacomGSS.STU.Protocol.ReportId.ReportId_StartImageDataArea,
          opDirection,
          retries,
          sleepBetweenRetries)
          .then(function (message) {
            return protocol.setStartImageDataArea(encodingMode, area)
          })
          .then(function (message) {
            const maxImageBlockSize = protocol.ImageDataBlock_maxLengthHID
            return WacomGSS.STU.ProtocolHelper.writeImageCommon(protocol,
              encodingMode,
              maxImageBlockSize,
              imageData,
              retries,
              sleepBetweenRetries)
          })
      },
      // protocol type is WacomGSS.STU.Procotol
      // encodingMode type is Protocol.EncodingMode
      // imageData type is a base64-encoded image string, or a DataStore reference to it
      // retries is an Integer
      // sleepBetweenRetries is an Integer (milliseconds)
      writeRomImage: function (protocol, romStartImageData, maxImageBlockSize, imageData, retries, sleepBetweenRetries) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.ProtocolHelper',
          function: 'writeRomImage',
          protocol,
          romStartImageData,
          maxImageBlockSize,
          imageData,
          retries,
          sleepBetweenRetries
        })
      }
    }

  STU.prototype.Tablet = (function () {
    const scope = 'WacomGSS.STU.Tablet'
    let id = null

    class Tablet {
      constructor() {
      }

      toJSON() {
        return { id, scope }
      }

      // intf can be a UsbInterface, SerialInterface
      // encryptionHandler is a WacomGSS.STU.EncryptionHandler.
      // encryptionHandler2 is a WacomGSS.STU.EncryptionHandler2.
      Constructor(intf, encryptionHandler, encryptionHandler2) {
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor',
          hasIntf: (typeof intf !== 'undefined'),
          intf: (typeof intf === 'undefined') ? null : intf.toJSON(),
          encryptionHandler: (typeof encryptionHandler === 'undefined' || encryptionHandler === null) ? null : encryptionHandler.toJSON(),
          encryptionHandler2: (typeof encryptionHandler2 === 'undefined' || encryptionHandler2 === null) ? null : encryptionHandler2.toJSON()
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      // intf  can be a UsbInterface, SerialInterface
      attach(intf) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'attach',
          intf: (typeof intf === 'undefined') ? null : intf.toJSON()
        })
      }

      detach(intf) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'detach'
        })
          .then(function (message) {
            let ret
            if (checkExists(message.scope) && checkExists(message.id)) {
              if (message.scope === 'WacomGSS.STU.UsbInterface') {
                ret = new STU.UsbInterface()
                ret.id = message.id
              } else if (message.scope === 'WacomGSS.STU.SerialInterface') {
                ret = new STU.SerialInterface()
                ret.id = message.id
              }
            }
            return ret
          })
      }

      getInformation() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInformation'
        })
      }

      setClearScreen() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setClearScreen'
        })
      }

      // reportId type is Protocol.ReportId
      isSupported(reportId) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'isSupported',
          reportId
        })
      }

      getProductId(reportId) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getProductId'
        })
      }

      // penDataOptionMode type is Protocol.PenDataOptionMode
      setPenDataOptionMode(penDataOptionMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setPenDataOptionMode',
          penDataOptionMode
        })
      }

      getDHprime() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDHprime'
        })
      }

      // sessionId is an integer
      startCapture(sessionId) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'startCapture',
          sessionId
        })
      }

      // inkingMode is an Protocol.InkingMode
      setInkingMode(inkingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setInkingMode',
          inkingMode
        })
      }

      // predicate is a Boolean
      queueSetPredicateAll(predicate) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'queueSetPredicateAll',
          predicate
        })
      }

      endCapture() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'endCapture'
        })
      }

      disconnect() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'disconnect'
        })
      }

      empty() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'empty'
        })
      }

      isConnected() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'isConnected'
        })
      }

      supportsWrite() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'supportsWrite'
        })
      }

      getReportCountLengths() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportCountLengths'
        })
      }

      getStatus() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getStatus'
        })
      }

      reset() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'reset'
        })
      }

      getHidInformation() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHidInformation'
        })
      }

      getCapability() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getCapability'
        })
      }

      getUid() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getUid'
        })
      }

      // uid is an integer
      setUid(uid) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setUid',
          uid
        })
      }

      getUid2() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getUid2'
        })
      }

      // defaultMode type is Protocol.DefaultMode
      setDefaultMode(defaultMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDefaultMode',
          defaultMode
        })
      }

      getDefaultMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDefaultMode'
        })
      }

      getHostPublicKey() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHostPublicKey'
        })
      }

      getDevicePublicKey() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDevicePublicKey'
        })
      }

      // prime is an integer Array [16]
      setDHprime(prime) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDHprime',
          prime
        })
      }

      getDHbase() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getDHbase'
        })
      }

      // base is an integer Array [2]
      setDHbase(prime) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setDHbase',
          base
        })
      }

      // area is a Protocol.Rectangle
      setClearScreenArea(area) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setClearScreenArea',
          area
        })
      }

      getInkingMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInkingMode'
        })
      }

      getInkThreshold() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getInkThreshold'
        })
      }

      // inkThreshold type is Protocol.InkThreshold
      setInkThreshold(inkThreshold) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setInkThreshold',
          inkThreshold
        })
      }

      // encodingMode type is Protocol.EncodingMode
      // b64data type is a base64-encoded image string, or a DataStore reference to it
      writeImage(encodingMode, b64Data) {
        let data = null
        if (typeof b64Data === 'string') {
          data = b64Data
        } else {
          data = b64Data.toJSON()
        }
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'writeImage',
          encodingMode,
          b64Data: data
        })
      }

      // encodingMode type is Protocol.EncodingMode
      // area type is Protocol.Rectangle
      // b64data type is a base64-encoded image string, or a DataStore reference to it
      writeImageArea(encodingMode, area, b64Data) {
        let data = null
        if (typeof b64Data === 'string') {
          data = b64Data
        } else {
          data = b64Data.toJSON()
        }
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'writeImageArea',
          encodingMode,
          area,
          b64Data: data
        })
      }

      // endImageDataFlag type is Protocol.EndImageDataFlag
      endImageData(endImageDataFlag) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'endImageData'
        })
      }

      getHandwritingThicknessColor() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingThicknessColor'
        })
      }

      // handwritingThicknessColor type is Protocol.HandwritingThicknessColor
      setHandwritingThicknessColor(handwritingThicknessColor) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingThicknessColor',
          handwritingThicknessColor
        })
      }

      getHandwritingThicknessColor24() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingThicknessColor24'
        })
      }

      // handwritingThicknessColor24 type is Protocol.HandwritingThicknessColor24
      setHandwritingThicknessColor24(handwritingThicknessColor24) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingThicknessColor24',
          handwritingThicknessColor24
        })
      }

      getBackgroundColor() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBackgroundColor'
        })
      }

      // backgroundColor type is Integer
      setBackgroundColor(backgroundColor) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBackgroundColor',
          backgroundColor
        })
      }

      getBackgroundColor24() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBackgroundColor24'
        })
      }

      // backgroundColor24 type is Integer
      setBackgroundColor24(backgroundColor24) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBackgroundColor24',
          backgroundColor24
        })
      }

      getHandwritingDisplayArea() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getHandwritingDisplayArea'
        })
      }

      // handwritingDisplayArea type is Protocol.Rectangle
      setHandwritingDisplayArea(handwritingDisplayArea) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setHandwritingDisplayArea',
          handwritingDisplayArea
        })
      }

      getBacklightBrightness() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getBacklightBrightness'
        })
      }

      // backlightBrightness type is Integer
      setBacklightBrightness(backlightBrightness) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setBacklightBrightness',
          backlightBrightness
        })
      }

      getScreenContrast() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getScreenContrast'
        })
      }

      // screenContrast type is Integer
      setScreenContrast(screenContrast) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setScreenContrast',
          screenContrast
        })
      }

      getPenDataOptionMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getPenDataOptionMode'
        })
      }

      getEncryptionStatus() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEncryptionStatus'
        })
      }

      // encryptionCommandNumber type is Protocol.EncryptionCommandNumber
      getEncryptionCommand(encryptionCommandNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEncryptionCommand',
          encryptionCommandNumber
        })
      }

      // data type is Integer Array[16] (16-byte block of data to decrypt)
      decrypt(data) {
        return WacomGSS.STU.send // return the decrypted 16-byte array
        ({
          scope,
          id,
          decrypt: 'decrypt',
          data
        })
      }

      // reportRate is an integer
      setReportRate(reportRate) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setReportRate',
          reportRate
        })
      }

      getReportRate() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportRate'
        })
      }

      // renderingMode is Protocol.RenderingMode
      setRenderingMode(renderingMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRenderingMode',
          renderingMode
        })
      }

      getRenderingMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getRenderingMode'
        })
      }

      // operationMode is Protocol.OperationMode_Normal, _PinPad, _SlideShow, _KeyPad or _Signature
      setOperationMode(operationMode) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setOperationMode',
          operationMode
        })
      }

      getOperationMode() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getOperationMode'
        })
      }

      // romStartImage type is Protocol.RomStartImageData_PinPad, _SlideShow, _KeyPad, _Signature or _MessageBox
      writeRomImage(romStartImageData, imageData) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'writeRomImage',
          romStartImageData,
          imageData
        })
      }

      setRomImageHash(operationModeType, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageHash',
          operationModeType,
          imageType,
          imageNumber
        })
      }

      getRomImageHash() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getRomImageHash'
        })
      }

      // romImageDeleteMode is Protocol.RomImageDeleteMode value
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..10 depending on delete mode
      setRomImageDelete(romImageDeleteMode, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageDelete',
          romImageDeleteMode,
          imageType,
          imageNumber
        })
      }

      getCurrentImageArea() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getCurrentImageArea'
        })
      }

      // operationModeType is Protocol.OperationModeType value
      // imageType    false=not pushed; true=pushed
      // imageNumber  1..10 depending on operation mode
      setRomImageDisplay(operationModeType, imageType, imageNumber) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setRomImageDisplay',
          operationModeType,
          imageType,
          imageNumber
        })
      }

      getEserial() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getEserial'
        })
      }
    }

    return Tablet
  })()

  STU.prototype.SerialInterface = (function () {
    const scope = 'WacomGSS.STU.SerialInterface'
    let id = ''
    // Constructor
    class SerialInterface {
      constructor() {
      }

      Constructor() {
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor'
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      // fileName is a string
      // baudRate is an int
      // useCrc is a Boolean
      connect(fileName, baudRate, useCrc) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'connect',
          fileName,
          baudRate,
          useCrc
        })
      }

      toJSON() {
        return { id, scope }
      }

      disconnect() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'disconnect'
        })
      }

      isConnected() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'isConnected'
        })
      }

      queueNotifyAll() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'queueNotifyAll'
        })
      }

      // predicate type is Boolean
      queueSetPredicateAll(predicate) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'queueSetPredicateAll',
          predicate
        })
      }

      // length type is an integer
      get(length) {
        return WacomGSS.STU.send // returns a Base64-encoded string
        ({
          scope,
          id,
          function: 'get_', // the '_' is deliberate
          length
        })
      }

      // base64Data is a base64-encoded image string, or a DataStore reference to it
      set(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'set',
          base64Data
        })
      }

      supportsWrite() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'supportsWrite'
        })
      }

      // base64Data is a base64-encoded image string, or a DataStore reference to it
      write(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'write',
          base64Data
        })
      }

      getReportCountLengths() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportCountLengths'
        })
      }

      getProductId() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getProductId'
        })
      }
    }

    SerialInterface.prototype.BaudRate_STU500 = 115200
    SerialInterface.prototype.BaudRate_STU430_530_prerelease = 460800
    SerialInterface.prototype.BaudRate_STU430_530 = 3000000

    return SerialInterface
  })()

  STU.prototype.TlsInterface = (function () {
    const scope = 'WacomGSS.STU.TlsInterface'
    let id = ''
    // Constructor
    class TlsInterface {
      constructor() {
      }

      Constructor() {
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor'
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      // fileName is a string
      // connectOption is ConnectOption
      connect(fileName, connectOption) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'connect',
          fileName,
          connectOption
        })
      }

      toJSON() {
        return { id, scope }
      }

      disconnect() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'disconnect'
        })
      }

      isConnected() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'isConnected'
        })
      }

      // length type is an integer
      get(length) {
        return WacomGSS.STU.send // returns a Base64-encoded string
        ({
          scope,
          id,
          function: 'get_', // the '_' is deliberate
          length
        })
      }

      // base64Data is a base64-encoded image string, or a DataStore reference to it
      set(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'set',
          base64Data
        })
      }

      supportsWrite() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'supportsWrite'
        })
      }

      // base64Data is a base64-encoded image string, or a DataStore reference to it
      write(base64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'write',
          base64Data
        })
      }

      getReportCountLengths() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getReportCountLengths'
        })
      }

      getProductId() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getProductId'
        })
      }
    }

    TlsInterface.prototype.ConnectOption =
        {
          ConnectOption_OOB: 0x1,
          ConnectOption_SSL: 0x2
        }

    /*
        TlsInterface.prototype.getPeerCertificate = function () {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "getPeerCertificate"
              });
        }

        TlsInterface.prototype.isConnectedOOB = function () {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "isConnectedOOB"
              });
        }

        TlsInterface.prototype.setOOB = function (base64Data) {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "setOOB",
                "base64Data": base64Data
              });
        }

        TlsInterface.prototype.getOOB = function () {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "getOOB",
              });
        }

        TlsInterface.prototype.send = function (base64Data) {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "send",
                "base64Data": base64Data,
              });
        }

        // Report
        TlsInterface.prototype.send2 = function (base64Data) {
          return WacomGSS.STU.send
              ({
                "scope": scope,
                "id": id,
                "function": "send2",
                "base64Data": base64Data
              });
        }
        */
    return TlsInterface
  })()

  STU.prototype.DataStore = (function () {
    const scope = 'WacomGSS.STU.DataStore'
    let id = null

    class DataStore {
      constructor() {
      }

      setId(_id) {
        id = _id
      }

      toJSON() {
        return { id, scope }
      }

      // b64Data is a base64-encoded string
      Constructor(b64Data) {
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor',
          b64Data
        })
      }

      getData() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getData'
        })
      }

      getRemove() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'getRemove'
        })
          .then(function (message) {
            id = null
            return message
          })
      }

      remove() {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'remove'
        })
          .then(function (message) {
            id = null
            return message
          })
      }

      // b64Data is a base64-encoded string
      setData(b64Data) {
        return WacomGSS.STU.send({
          scope,
          id,
          function: 'setData',
          b64Data
        })
      }
    }

    return DataStore
  })()

  STU.prototype.SerialProtocol =
    {
      getHeaderLength: function () {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'getHeaderLength'
        })
      },
      // _byte is an Integer (a byte)
      isStartReport: function (_byte) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'isStartReport',
          byte: _byte
        })
      },
      // header1 is an Integer (a byte)
      decodeHasCrc: function (header1) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'decodeHasCrc',
          header1
        })
      },
      // header1 is an Integer (a byte)
      // header2 is an Integer (a byte)
      decodeEncodedDataLength: function (header1, header2) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'decodeEncodedDataLength',
          header1,
          header2
        })
      },
      /*maxEncodedDataLength : function() {
          return WacomGSS.STU.send
              ({
             "scope": "WacomGSS.STU.SerialProtocol",
            "function": "maxEncodedDataLength"
              });
        },*/
      // useCrc is a Boolean
      // length is an Integer
      calcEncodedDataLength: function (useCrc, length) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'calcEncodedDataLength',
          useCrc,
          length
        })
      },
      // encodedData is an Integer array
      // useCrc is a Boolean
      // encodedDataLength is an Integer
      encodeHeader: function (encodedData, useCrc, encodedDataLength) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'encodeHeader',
          encodedData,
          useCrc,
          encodedDataLength
        })
      },
      // report is an Integer array
      // useCrc is a Boolean
      encodeReport: function (report, useCrc) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'encodeReport',
          report,
          useCrc
        })
      },
      // data is an Integer array
      decodeData: function (data) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'decodeData',
          data
        })
      },
      // container is an Integer array
      checkCrcAndRemove: function (container) {
        return WacomGSS.STU.send
        ({
          scope: 'WacomGSS.STU.SerialProtocol',
          function: 'checkCrcAndRemove',
          container
        })
      }
    }

  STU.prototype.EncryptionHandler = (function () {
    const scope = 'WacomGSS.STU.EncryptionHandler'
    let streamId = null
    let id = null
    let m_impl = null
    const details = new Object()

    class EncryptionHandler {
      constructor(_impl) {
        m_impl = _impl
        this.stream = function (message) {
          try {
            details[message.function](message)
          } catch (error) {
            throw new Error('EncryptionHandler.' + message.function + ' : ' + error + '\nmessage was:\n' + JSON.stringify(message))
          }
        }
      }

      Constructor() {
        streamId = WacomGSS.STU.setStream(this)
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor',
          streamId
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      toJSON() {
        return { id, scope }
      }
    }

    details.reset = function (message) {
      m_impl.reset()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.clearKeys = function (message) {
      m_impl.clearKeys()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.requireDH = function (message) {
      const requireDH = m_impl.requireDH()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: requireDH
      })
    }

    details.setDH = function (message) {
      m_impl.setDH(message.data.dhPrime, message.data.dhBase)
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.generateHostPublicKey = function (message) {
      const generateHostPublicKey = m_impl.generateHostPublicKey()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: generateHostPublicKey
      })
    }

    details.computeSharedKey = function (message) {
      m_impl.computeSharedKey(message.data)
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.decrypt = function (message) {
      const data = m_impl.decrypt(message.data)
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data
      })
    }

    return EncryptionHandler
  })()

  STU.prototype.EncryptionHandler2 = (function () {
    const scope = 'WacomGSS.STU.EncryptionHandler2'
    let streamId = null
    let id = null
    let m_impl = null
    const details = new Object()

    class EncryptionHandler2 {
      constructor(_impl) {
        m_impl = _impl
        this.stream = function (message) {
          try {
            details[message.function](message)
          } catch (error) {
            throw new Error('EncryptionHandler2.' + message.function + ' : ' + error + '\nmessage was:\n' + JSON.stringify(message))
          }
        }
      }

      Constructor() {
        streamId = WacomGSS.STU.setStream(this)
        return WacomGSS.STU.send({
          scope,
          function: 'Constructor',
          streamId
        })
          .then(function (message) {
            id = message.id
            return message
          })
      }

      toJSON() {
        return { id, scope }
      }
    }

    details.reset = function (message) {
      m_impl.reset()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.clearKeys = function (message) {
      m_impl.clearKeys()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.getParameters = function (message) {
      const tuple = m_impl.getParameters(message.data.symmetricKeyType, message.data.asymmetricPaddingType, message.data.asymmetricKeyType)
      const symmetricKeyType = tuple[0]
      const asymmetricPaddingType = tuple[1]
      const asymmetricKeyType = tuple[2]
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data:
                    {
                      symmetricKeyType,
                      asymmetricPaddingType,
                      asymmetricKeyType
                    }
      })
    }

    details.getPublicExponent = function (message) {
      const getPublicExponent = m_impl.getPublicExponent()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: getPublicExponent
      })
    }

    details.generatePublicKey = function (message) {
      const generatePublicKey = m_impl.generatePublicKey()
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: generatePublicKey
      })
    }

    details.computeSessionKey = function (message) {
      m_impl.computeSessionKey(message.data)
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data: null
      })
    }

    details.decrypt = function (message) {
      const data = m_impl.decrypt(message.data)
      WacomGSS.STU.sendNoReturn
      ({
        scope,
        function: 'set_value',
        promiseId: message.promiseId,
        data
      })
    }

    return EncryptionHandler2
  })()

  return STU
})()

WacomGSS.STU = new WacomGSS.STUConstructor()
export { WacomGSS }
