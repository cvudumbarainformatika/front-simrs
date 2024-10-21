<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <!-- <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <q-input v-model="store.form.keterangan" label="Keterangan" outlined standout="bg-yellow-3" type="textarea" rows="3" />
          </div> -->

          <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.tindakan"
              label="Keterangan Tindakan"
              autocomplete="rs2"
              option-value="rs1"
              option-label="rs2"
              outlined
              :source="store.options"
              @on-select="(val)=> {
                store.form.tindakan = val
                setJsJp(val)
              }"
              @clear="store.form.tindakan = ''"
            />
          </div>
          <div class="col-3">
            Jumlah
          </div>
          <div class="col-9">
            <app-input-simrs v-model="store.form.jumlah" label="Qty" :valid="{ required: true, number: true }" style="width: 20%;" />
          </div>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div class="row full-width justify-end">
        <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Kirim Permintaan" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePermintaanOksigenStore } from 'src/stores/simrs/ranap/oksigen'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const store = usePermintaanOksigenStore()
const formRef = ref(null)

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

const setJsJp = (val) => {
  const master = store.options.find(item => item?.rs1 === val)
  const groupRuang = props?.pasien?.kdgroup_ruangan
  const klsRuang = props?.pasien?.kelas_ruangan
  let js = 0
  let jp = 0
  // if (groupRuang === 'BR') {
  if (klsRuang === '3' || klsRuang === 'IC' || klsRuang === 'ICC' || klsRuang === 'NICU' || klsRuang === 'IN') {
    js = master?.rs6
    jp = master?.rs7
  }
  else if (klsRuang === '2') {
    js = master?.rs8
    jp = master?.rs9
  }
  else if (klsRuang === '1') {
    js = master?.rs10
    jp = master?.rs11
  }
  else if (klsRuang === 'Utama') {
    js = master?.rs12
    jp = master?.rs13
  }
  else if (klsRuang === 'VIP') {
    js = master?.rs14
    jp = master?.rs15
  }
  else if (klsRuang === 'VVIP') {
    js = master?.rs16
    jp = master?.rs17
  }

  // }
  // else {
  //   js = master?.js_private
  //   jp = master?.jp_private
  // }

  store.form.js = js
  store.form.jp = jp

  console.log('val', val, master, props?.pasien, groupRuang, klsRuang, js, jp)
}

</script>
