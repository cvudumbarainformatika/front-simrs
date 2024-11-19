<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <div class="col-3">
            Layanan yg diminta
          </div>
          <q-select
            dense label="Tindakan" outlined standout="bg-yellow-3"
            v-model="store.form.tindakan" :options="store.optionsApheresis" hide-bottom-space class="col-9"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            option-label="namatindakan" option-value="kodetindakan"
            map-options emit-value
            @update:model-value="setJsJp"
          />
          <div class="col-3">
            Golongan Darah
          </div>
          <div class="col-9 q-gutter-sm q-mb-sm">
            <q-radio dense size="sm" v-model="store.form.gol" v-for="item in bankdarah.optionsGol" :key="item" :val="item?.nama" :label="item?.nama" />
          </div>
          <!-- <div class="col-3">
            Rhesus
          </div>
          <div class="col-9 q-gutter-sm">
            <q-radio dense size="sm" v-model="store.form.rhesus" v-for="item in store.optionsRhesus" :key="item" :val="item" :label="item" />
          </div> -->
          <!-- <div class="col-3">
            Sifat Permintaan
          </div>
          <div class="col-9 q-gutter-sm">
            <q-select
              dense label="Permintaan" outlined standout="bg-yellow-3"
              v-model="store.form.sifatpermintaan" :options="store.permintaans" hide-bottom-space class="col-9"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              option-label="nama" option-value="nama"
              map-options emit-value
            />
          </div> -->
          <div class="col-3">
            Jumlah
          </div>
          <div class="col-9">
            <div class="flex items-center q-gutter-sm">
              <app-input-simrs
                v-model="store.form.jumlah"
                label="Jumlah"
                style="width: 30%;"
                :valid="{ required: true, number: true }"
              />
              <div>Bag</div>
            </div>
          </div>
          <div class="col-3">
            Transfusi Ke
          </div>
          <div class="col-9">
            <div class="flex items-center q-gutter-sm">
              <app-input-simrs
                v-model="store.form.transfusike"
                label="Ke"
                style="width: 20%;"
                :valid="{ required: true, number: true }"
              />
            </div>
          </div>
          <div class="col-3">
            Reaksi stl Transfusi
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refReaksi"
              :model="store.form.reaksi"
              label="Reaksi"
              autocomplete="label"
              option-value="label"
              option-label="label"
              outlined
              :source="bankdarah.reaksis"
              @on-select="(val)=> {
                store.form.reaksi=val
              }"
            />
          </div>
          <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <q-input v-model="store.form.keterangan" label="Keterangan" outlined standout="bg-yellow-3" type="textarea" rows="3" />
          </div>
          <!-- <div class="col-3">
            Pengirim
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPengirim"
              :model="store.form.pengirim"
              label="Pengirim"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              :source="store.dokters"
              @on-select="(val)=> store.form.pengirim=val"
            />
          </div> -->
          <div class="col-3">
            Yg Meminta
          </div>
          <div class="col-9">
            <!-- INI DOKTER -->
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.kodeperawat"
              label="Dokter"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              :source="store.dokters"
              @on-select="(val)=> {
                store.form.kodeperawat = val
                const ceck = store.dokters.find(item => item.kdpegsimrs === val) ?? null
                store.form.perawatyanmeminta = ceck?.nama

              }"
            />
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
import { usePermintaanApheresisStore } from 'src/stores/simrs/ranap/apheresis'
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'
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

const store = usePermintaanApheresisStore()
// eslint-disable-next-line no-unused-vars
const bankdarah = usePermintaanBankDarahStore()
const formRef = ref(null)

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

const setJsJp = (val) => {
  const master = store.optionsApheresis.find(item => item?.kodetindakan === val)
  const groupRuang = props?.pasien?.kdgroup_ruangan
  const klsRuang = props?.pasien?.kelas_ruangan
  let js = 0
  let jp = 0
  if (groupRuang === 'BR') {
    if (klsRuang === '3') {
      js = master?.js_nonprivate
      jp = master?.jp_nonprivate
    }
    else if (klsRuang === '2') {
      js = master?.js_private
      jp = master?.jp_private
    }
    else if (klsRuang === '1' || klsRuang === 'IC' || klsRuang === 'ICC' || klsRuang === 'NICU' || klsRuang === 'IN') {
      js = master?.js_private
      jp = master?.jp_private
    }
    else if (klsRuang === 'Utama' || klsRuang === 'VIP' || klsRuang === 'VVIP') {
      js = master?.js_private
      jp = master?.jp_private
    }
    else {
      js = master?.js_private
      jp = master?.jp_private
    }
  }
  else {
    js = master?.js_private
    jp = master?.jp_private
  }

  store.form.js = js
  store.form.jp = jp

  console.log('val', val, master, props?.pasien, groupRuang, klsRuang, js, jp)
}

</script>
