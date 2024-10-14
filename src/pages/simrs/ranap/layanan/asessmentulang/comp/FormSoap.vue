<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed, defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import useForm from './useForm.js'
import { notifCenterVue, notifErrVue, notifSuccess, notifSuccessVue } from 'src/modules/utils.js'

// const FormAnamnesis = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/anamnesis/FormAnamnesis.vue'))
// const FormPemeriksaanUmum = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/pemeriksaanUmum/FormPemeriksaanUmum.vue'))
// const FormComp = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue'))

const ItemNyeri = defineAsyncComponent(() => import('./itemlist/ItemNyeri.vue'))
const DialogFormItem = defineAsyncComponent(() => import('./dialogformchild/DialogFormItem.vue'))
// const FormComp = import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue')

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['exit'])

const myForm = ref(null)

const SET = reactive({
  radius: '5px',
  headerClass: 'bg-grey-6 text-white',
  expandIconClass: 'text-white',
  classes: 'shadow-1 overflow-hidden q-mb-xs'
})

// eslint-disable-next-line no-unused-vars
const {
  storeAnamnesis, storePenilaian, storePemeriksaanUmum,
  settings, store
} = useForm(props.pasien)

onMounted(() => {
  storeAnamnesis.initReset(null)
  storePemeriksaanUmum.initReset()
  storePenilaian.getUsia(props.pasien)
  storePenilaian.initReset(props.pasien)

  // console.log('asesment :ulang="true"', storePenilaian.humptys)
})

const jnsKasusKep = computed(() => {
  if (props.kasus) {
    return props.kasus?.gruping
  }
  return null
})

const validate = () => {
  // console.log(formRef.value?.refInputKu)

  myForm.value.validate().then(success => {
    if (success) {
      if (storePemeriksaanUmum.form.keadaanUmum === null) {
        notifErrVue('Harap isi form Objective Terlebih dahulu!')
        return
      }
      store.saveCppt(props.pasien, props.kasus)
        .then((res) => {
          emits('exit')
          notifSuccessVue('Data Berhasil disimpan')
        })
    }
    else {
      // oh no, user has filled in
      // at least one invalid value
      notifErrVue('Harap isi form dengan lengkap')
      console.log('failed')
      // formRef.value?.refInputKu.focus()
      // scrollToElement(formRef.value?.refInputKu.$el)
    }
  })
}

</script>

<template>
  <q-form ref="myForm" class="fit scroll">
    <div class="row q-col-gutter-md ">
      <!-- subjective -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; ">
          <q-card-section class="col-auto flex justify-between items-center">
            <div class="f-20">
              Subjective
            </div>
            <q-btn
              bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                settings.formOpen = 'anamnesis'
                settings.isChildForm = true
              }"
            />
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <div class="column q-mb-sm">
              <div><b>Keluhan Utama : </b></div>
              <div class="q-ml-sm">
                <!-- <q-input v-model="storeAnamnesis.form.keluhanUtama" type="textarea" class="full-width" /> -->
                <q-input
                  ref="refInputKeluhanUtama"
                  v-model="storeAnamnesis.form.keluhanUtama"
                  outlined
                  autogrow
                  stack-label
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :lazy-rules="true"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="column q-mb-sm">
              <div><b>Nyeri :</b></div>
              <ItemNyeri :item="storeAnamnesis?.form?.keluhannyeri" v-if="kasus?.gruping === '4.1'" />
              <ItemNyeri :item="storeAnamnesis?.formKebidanan?.keluhannyeri" v-if="kasus?.gruping === '4.2'" />
              <ItemNyeri :item="storeAnamnesis?.formNeoNatal?.keluhannyeri" v-if="kasus?.gruping === '4.3'" />
              <ItemNyeri :item="storeAnamnesis?.formPediatrik?.keluhannyeri" v-if="kasus?.gruping === '4.4'" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- objective -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px;">
          <q-card-section class="col-auto flex justify-between items-center">
            <div class="f-20">
              Objective
            </div>
            <q-btn
              bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                settings.formOpen = 'pemeriksaan'
                settings.isChildForm = true
              }"
            />
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <div class="column" v-if="storePemeriksaanUmum?.form?.keadaanUmum">
              <div><b>Ku : </b> <span>{{ storePemeriksaanUmum?.form?.keadaanUmum }}</span></div>
              <div><b>BB : </b> <span>{{ storePemeriksaanUmum?.form?.bb }} Kg</span></div>
              <div><b>TB : </b> <span>{{ storePemeriksaanUmum?.form?.tb }} Cm</span></div>
              <div><b>Nadi : </b> <span>{{ storePemeriksaanUmum?.form?.nadi }} (x/mnt)</span></div>
              <div><b>Sis : </b> <span>{{ storePemeriksaanUmum?.form?.sistole }} (mmHg)</span></div>
              <div><b>Dia : </b> <span>{{ storePemeriksaanUmum?.form?.diastole }} (mmHg)</span></div>
              <div><b>RR : </b> <span>{{ storePemeriksaanUmum?.form?.pernapasan }} (x/mnt)</span></div>
              <div><b>SpO2 : </b> <span>{{ storePemeriksaanUmum?.form?.spo }} (%)</span></div>
              <div><b>Suhu : </b> <span>{{ storePemeriksaanUmum?.form?.suhu }} (C)</span></div>
              <div><b>T/k : </b> <span>{{ storePemeriksaanUmum?.form?.tkKesadaranKet }}</span></div>

              <q-separator class="q-my-xs" />
              <!-- Penilaian -->
              <div>
                <div v-if="storePenilaian?.nortons?.grupings?.includes(jnsKasusKep)">
                  <div v-for="(val, key) in storePenilaian?.formNorton" :key="key">
                    {{ storePenilaian?.nortons?.form.find(x => x.kode === key)?.label ?? '' }} {{ val?.label }}
                  </div>
                </div>
                <q-separator class="q-my-xs" />
                <div v-if="storePenilaian?.humptys?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia < 18)">
                  <div class="column">
                    <b>Resiko Jatuh : </b>
                    <div> - {{ storePenilaian?.formHumpty?.skorHumpty?.label }} ({{ storePenilaian?.formHumpty?.skorHumpty?.skor }})</div>
                  </div>
                </div>
                <div v-if="storePenilaian?.morses?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia >= 18 && storePenilaian.usia < 60)">
                  <div class="column">
                    <b>Resiko Jatuh : </b>
                    <div> - {{ storePenilaian?.formMorse?.skorMorse?.label }} ({{ storePenilaian?.formMorse?.skorMorse?.skor }})</div>
                  </div>
                </div>
                <div v-if="storePenilaian?.ontarios?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia >= 60)">
                  <div class="column">
                    <b>Resiko Jatuh : </b>
                    <div> - {{ storePenilaian?.formOntario?.skorOntario?.label }} ({{ storePenilaian?.formOntario?.skorOntario?.skor }})</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- assessment -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; max-height: 350px;">
          <q-card-section class="col-quto">
            <div class="f-20">
              Assessment
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <q-input
              ref="refInputAsessment"
              v-model="store.form.asessment"
              outlined
              autogrow
              stack-label
              standout="bg-yellow-3"
              label="Asessment"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              :lazy-rules="true"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- planning -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; max-height: 350px;">
          <q-card-section class="col-quto">
            <div class="f-20">
              Plan
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <q-input
              ref="refInputPlann"
              v-model="store.form.plann"
              outlined
              autogrow
              stack-label
              standout="bg-yellow-3"
              label="Plann"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              :lazy-rules="true"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- instruksi -->
      <div class="col-8">
        <q-card flat bordered class="col-12">
          <q-card-section>
            <div class="text-h6">
              Instruksi PPA
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <q-input
              ref="refInputInstruksi"
              v-model="store.form.instruksi"
              outlined
              autogrow
              stack-label
              standout="bg-yellow-3"
              label="Instruksi"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              :lazy-rules="true"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>
      <!-- <div class="col-4">
        <q-card flat bordered class="col-12">
          <q-card-section>
            Verif
          </q-card-section>
        </q-card>
      </div> -->
      <div style="margin-bottom: 350px;" />
    </div>

    <div class="fixed-bottom full-width">
      <!-- <div class="col-12"> -->
      <q-card flat bordered class="q-pa-sm">
        <q-card-actions align="right" class="q-py-md">
          <q-btn :loading="store.loadingSave" :disabled="store.loadingSave" size="md" outline rounded color="primary" @click="validate">
            <div class="q-px-lg">
              Simpan Catatan Pasien
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
      <!-- </div> -->
    </div>

    <!-- dialog form -->
    <DialogFormItem
      v-model="settings.isChildForm" :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :settings="settings"
      @on-click="()=> {
        console.log('ok');
        settings.isChildForm = false
      }"
    />
  </q-form>
</template>
