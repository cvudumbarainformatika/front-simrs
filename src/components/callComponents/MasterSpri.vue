<template>
  <div
    id="pdfDoc"
    ref="rePdfDoc"
    class="page-A4 f-12 bg-white"
  >
    <div class="contentx">
      <kop-surat />
      <div class="b-a q-mt-sm q-pa-sm">
        <div
          id="htmlC"
          ref="refMaster"
          class="mirror-editor"
          v-html="parse(store.isi)"
        />
        <q-popup-edit
          v-if="props.editableMaster"
          v-model="store.isi"
          max-width="750px"
        >
          <q-editor
            ref="editorRef"
            v-model="store.isi"
            min-height="5rem"
            paragraph-tag="div"
            placeholder="Silahkan Ketik disini .."
            @keydown="onKeydown"
            :definitions="{
              save: {
                tip: 'Save your work',
                icon: 'icon-mat-save',
                label: 'Save',
                handler: saveWork
              }
            }"
            :toolbar="props.editableMaster? [
              ['save'],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['left', 'center', 'right', 'justify'],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
              ['viewsource']
            ]:[]"
          />
        </q-popup-edit>

        <BottomTtd :pasien="props.pasien" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMasterDokumenPasienStore } from 'src/stores/simrs/master/dokumen/document'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const KopSurat = defineAsyncComponent(() => import('./compSpri/KopSurat.vue'))
const BottomTtd = defineAsyncComponent(() => import('./compSpri/BottomTtd.vue'))
const props = defineProps({
  editableMaster: {
    type: Boolean,
    default: true
  },
  pasien: {
    type: Object,
    default: null
  }
})

const refMaster = ref(null)
const editorRef = ref(null)

const store = useMasterDokumenPasienStore()

onMounted(() => {
  store.params.kelompok = 'spri'
  store.getDokumen()
})

function parse (html) {
  let str = html?.replace('{pasien}', `<b>${props.pasien?.nama_panggil ?? '-'}</b>`)
  str = str?.replace('{norm}', `<b>${props.pasien?.norm ?? '-'}</b>`)
  str = str?.replace('{tempat_lahir}', `<b>${props.pasien?.templahir ?? '-'}</b>`)
  str = str?.replace('{tgl_lahir}', `<b>${props.pasien?.tgllahir ?? '-'}</b>`)
  str = str?.replace('{kelamin}', `<b>${props.pasien?.kelamin ?? '-'}</b>`)
  str = str?.replace('{alamat}', `${props.pasien?.alamat ?? '-'}`)
  str = str?.replace('{ruang}', `<b>${props.pasien?.ruangan ?? '-'}</b>`)
  str = str?.replace('{tipe}', `<b>${props.pasien?.group_ruangan ?? '-'}</b>`)
  str = str?.replace('{status_operasional}', `<b>${props.pasien?.nomorbed ?? '-'}</b>`)

  str = str?.replace('{indikator}', `<b>${props.pasien?.indikator ?? '-'}</b>`)
  str = str?.replace('{kelas}', `<b>${props.pasien?.kelasruangan ?? '-'}</b>`)

  return str
}

const saveWork = () => {
  // console.log('isi', editorRef.value)
  store.changeIsi('spri')
}

const onKeydown = (e) => {
  if (e.code === 'Tab') {
    e.preventDefault()
    const cmd = e.shiftKey ? 'outdent' : 'indent'
    document.execCommand(cmd, false, '')
  }
}

</script>

<style lang="scss" scoped>
.page-A4{
  // background: white;
  display: block;
  margin-left: auto;
  margin-right: auto;

  //width: 21cm;
  width: 21.59cm;
  height: 33cm;
  // margin: 30mm 45mm
  .contentx{
    padding: 5mm 5mm
  }

  .b-a{
    border: 1px solid black;
  }
  .b-l{
    border-left: 1px solid black;
  }
  .b-r{
    border-right: 1px solid black;
  }
}

// .pt12 {
//   font-size: 12pt !important;
// }

table {
  width: 100%;
  td {
    vertical-align: top;
  }
}
</style>
