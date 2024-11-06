<script setup>
import { WacomgssSignatureSDK } from 'src/modules/wacomStu540/wgssSigCaptX.js'
import { onMounted, ref } from 'vue'

// import SignerName from './wacomstu540/SignerName.vue'
// import SigOptions from './wacomstu540/SigOptions.vue'
// import SigText from './wacomstu540/SigText.vue'
// import UserMessage from './wacomstu540/UserMessage.vue'

const SIGN_OBJ = ref(null)
const DYNCAPT = ref(null)
const imageBox = ref(null)
const TIME_DETECT = ref(null)
const hash = ref(null)
const TYPE = ref(null)
const fname = ref('')
const lname = ref('')
const CALLBACK = ref('')
const sigObj = ref('')
const sigCtl = ref('')
const userMsgBox = ref('')

//
const TIMEOUT = ref(1500)
const SERVICEPORT = ref(8000)
const BITMAP_BACKGROUNDCOLOR = ref(0x00FFFFFF)
const BITMAP_IMAGEFORMAT = ref('bmp')
const BITMAP_INKCOLOR = ref(0x00000000)
const BITMAP_INKWIDTH = ref(0.7)
const BITMAP_PADDING_X = ref(4)
const BITMAP_PADDING_Y = ref(4)
const LICENCEKEY = ref('eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA')

onMounted(() => {
  bodyonload()
})

const bodyonload = () => {
  userMsgBox.value = document.getElementById('txtDisplay')
  imageBox.value = document.getElementById('imageBox')

  // clearTextBox()
  actionWhenRestarted()
}

const capture = () => {
  console.log('Starting capture ..')
  console.log('capture', window?.wgssSignatureSDK)

  if (!window?.wgssSignatureSDK?.running || DYNCAPT.value === null) {
    console.log('Session error. Restarting the session.')

    actionWhenRestarted(window.Capture)
    return
  }

  // Construct a hash object to contain the hash
  const hash = new window.wgssSignatureSDK.Hash(onInitialHashConstructor)
  console.log('hash', hash)
}

const onInitialHashConstructor = (hashV, status) => {
  // console.log('onInitialHashConstructor', window.wgssSignatureSDK.ResponseStatus, hashV, status)

  if (window.wgssSignatureSDK.ResponseStatus.OK === status) {
    GetHash(hashV, 'INITIAL')
  }
  else {
    console.log('Hash Constructor error: ' + status)
    if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status) {
      console.log('Hash Constructor error: ' + status) // console.log('Error: invalid session. Restarting the session.')
      actionWhenRestarted(window.Capture)
    }
  }
}

const GetHash = (hash, type) => {
  hash.value = hash
  TYPE.value = type
  hash.value.Clear(onClear)
}
const onClear = (hashV, status) => {
  if (callbackStatusOK('Hash Clear', status)) {
    hashV.PutType(window.wgssSignatureSDK.HashType.HashMD5, onPutType)
  }
}

const onPutType = (hashV, status) => {
  if (callbackStatusOK('Hash PutType', status)) {
    const vFname = new window.wgssSignatureSDK.Variant()
    vFname.Set(fname)
    hashV.Add(vFname, onAddFname)
  }
}
const actionWhenRestarted = (callb) => {
  CALLBACK.value = callb
  SIGN_OBJ.value = null
  sigCtl.value = null
  window.wgssSignatureSDK = null

  if (imageBox.value != null) {
    if (imageBox.value.firstChild !== null) {
      imageBox.value.removeChild(imageBox.value.firstChild)
    }
  }
  window.timeout = setTimeout(TIME_DETECT.value, TIMEOUT.value)

  // pass the starting service port  number as configured in the registry
  window.wgssSignatureSDK = new WacomgssSignatureSDK(onDetectRunning, SERVICEPORT.value)
}

const onDetectRunning = () => {
  if (window.wgssSignatureSDK.running) {
    console.log('Signature SDK Service detected.')
    clearTimeout(window.timeout)
    start()
  }
  else {
    console.log('Signature SDK Service not detected.')
  }
}

const start = () => {
  console.log('start ...', window.wgssSignatureSDK.running)
  if (window.wgssSignatureSDK.running) {
    console.log('Checking components ...')
    sigCtl.value = new window.wgssSignatureSDK.SigCtl(onSigCtlConstructor)
    console.log('sigCtl.value ...', sigCtl.value)
  }
}

const onSigCtlConstructor = (sigCtlV, status) => {
  console.log('onSigCtlConstructor', sigCtlV, status)

  if (callbackStatusOK('SigCtl constructor', status)) {
    sigCtl.value.PutLicence(LICENCEKEY.value, onSigCtlPutLicence)
    console.log('sigCtl.value ...', sigCtl.value)
  }
}
const onSigCtlPutLicence = (sigCtlV, status) => {
  console.log('onSigCtlPutLicence', sigCtlV, status)

  if (callbackStatusOK('SigCtl PutLicence', status)) {
    DYNCAPT.value = new window.wgssSignatureSDK.DynamicCapture(onDynCaptConstructor)
    console.log('DYNCAPT.value...', DYNCAPT.value)
  }
}

const callbackStatusOK = (methodName, status) => {
  console.log('callbackStatusOK', methodName, status)

  if (window.wgssSignatureSDK.ResponseStatus.OK === status) {
    return true
  }
  else {
    console.log(methodName + ' error: ' + status)
    return false
  }
}

const onAddFname = (hashV, status) => {
  if (callbackStatusOK('Hash Add', status)) {
    const vLname = new window.wgssSignatureSDK.Variant()
    vLname.Set(lname)
    hashV.Add(vLname, onAddLname)
  }
}

const onAddLname = (hashV, status) => {
  if (callbackStatusOK('Hash Add', status)) {
    if (TYPE.value === 'INITIAL') {
      onGetInitialHash()
    }
    else {
      onGetHashForVerification()
    }
  }
}

const onGetInitialHash = () => {
  const fullName = this.$refs.signatory.fname + ' ' + this.$refs.signatory.lname

  DYNCAPT.value.Capture(sigCtl.value, fullName, 'Document Approval', hash.value, null, onDynCaptCapture)
}

const onGetHashForVerification = () => {
  sigObj.value.CheckSignedData(hash.value, onCheck1)
}
const onCheck1 = (hash, status) => {
  onCheckSignedData(hash, status)
}

const onDynCaptConstructor = (dynCaptV, status) => {
  if (callbackStatusOK('DynCapt constructor', status)) {
    sigCtl.value.GetSignature(onGetSignature)
  }
}
const onDynCaptCapture = (dynCaptV, SigObjV, status) => {
  let outputFlags = null

  if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status) {
    console.log('Error: invalid session. Restarting the session.')
    actionWhenRestarted(window.Capture)
  }
  else {
    /* Check the status returned from the signature capture */
    switch (status) {
      case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
        sigObj.value = SigObjV
        console.log('Signature captured successfully')

        /* Set the RenderBitmap flag depending on whether the user wants to use a picture image or B64 text value */

        // if (useB64Image) {
        //   outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputBase64 | window.wgssSignatureSDK.RBFlags.RenderColor32BPP
        // }
        // else {
        //   outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputPicture | window.wgssSignatureSDK.RBFlags.RenderColor32BPP
        // }
        outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputPicture | window.wgssSignatureSDK.RBFlags.RenderColor32BPP

        sigObj.value.RenderBitmap(BITMAP_IMAGEFORMAT.value,
          imageBox.value.clientWidth, imageBox.value.clientHeight, BITMAP_INKWIDTH.value,
          BITMAP_INKCOLOR.value, BITMAP_BACKGROUNDCOLOR.value, outputFlags, BITMAP_PADDING_X.value, BITMAP_PADDING_Y.value, onRenderBitmapFromSigText)
        break

      case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
        console.log('Signature capture cancelled')
        break

      case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
        console.log('No capture service available')
        break

      case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
        console.log('Tablet Error')
        break

      case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
        console.log('No valid Signature Capture licence found')
        break

      default:
        console.log('Capture Error ' + status)
        break
    }
  }
}

const onRenderBitmapFromSigText = (sigObjV, bmpObj, status) => {
  if (callbackStatusOK('Signature Render Bitmap', status)) {
    if (imageBox.value.firstChild === null) {
      imageBox.value.appendChild(bmpObj.image)
    }
    else {
      imageBox.value.replaceChild(bmpObj.image, imageBox.value.firstChild)
    }
  }
}

const onCheckSignedData = (hash, status) => {
  if (window.wgssSignatureSDK.SignedData.DataGood === status) {
    console.log('Signed Data OK')
  }
  else {
    console.log('Signed Data Has Changed')
  }
}

const onGetSignature = (sigCtlV, sigObjV, status) => {
  if (callbackStatusOK('SigCapt GetSignature', status)) {
    sigObj.value = sigObjV
    sigCtl.value.GetProperty('Component_FileVersion', onSigCtlGetFileVersion)
  }
}

const onSigCtlGetFileVersion = (sigCtlV, property, status) => {
  if (callbackStatusOK('SigCtl GetProperty', status)) {
    console.log('DLL: flSigCOM.dll  v' + property.text)
    DYNCAPT.value.GetProperty('Component_FileVersion', onDynCaptGetFileVersion)
  }
}

const onDynCaptGetFileVersion = (dynCaptV, property, status) => {
  if (callbackStatusOK('DynCapt GetProperty', status)) {
    console.log('DLL: flSigCapt.dll v' + property.text)
    console.log('Test application ready.')
    console.log('Press Capture or Start Wizard to capture a signature.')

    if (typeof (CALLBACK.value) === 'function') {
      console.log('Calling callback function')
      CALLBACK.value()
    }
  }
}
</script>
