<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from 'vue'
import useForm from './useForm.js'
import { notifCenterVue, notifErrVue, notifSuccess, notifSuccessVue } from 'src/modules/utils.js'

// const FormAnamnesis = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/anamnesis/FormAnamnesis.vue'))
// const FormPemeriksaanUmum = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/pemeriksaanUmum/FormPemeriksaanUmum.vue'))
// const FormComp = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue'))

const ItemNyeri = defineAsyncComponent(() => import('./itemlist/ItemNyeri.vue'))
const DialogFormItem = defineAsyncComponent(() => import('./dialogformchild/DialogFormItem.vue'))
const ModalDiagnosaKeperawatan = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/complayanan/ModalDiagnosaKeperawatan.vue'))
const ModalDiagnosaKebidanan = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/complayanan/compDiagnosaKebidanan/ModalDiagnosaKebidanan.vue'))
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
  settings, storeDiagnosaKeperawatan, storeDiagnosaKebidanan, store
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
      if (!settings?.ppaTambahan?.includes(props.nakes)) { // jika bukan nakes 4, 5, dan 6
        if (storePemeriksaanUmum.form.keadaanUmum === null) {
          notifErrVue('Harap isi form Objective Terlebih dahulu!')
          return
        }
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

watch(() => storeDiagnosaKeperawatan.selectDiagnosa, (val) => {
  if (val) {
    const text = val?.map(x => '- ' + x.nama)?.join('\n')

    console.log('val', text)
    store.form.asessment = val.length ? text : null
  }
})
watch(() => storeDiagnosaKebidanan.selectDiagnosa, (val) => {
  // console.log('watch diagnosa kebidanan', val)
  if (val) {
    const text = val?.map(x => '- ' + x.nama)?.join('\n')
    store.form.asessment = val.length ? text : null
  }
})

watch(() => storeDiagnosaKeperawatan.selectIntervensis, (val) => {
  console.log('val', val)

  if (val) {
    storeDiagnosaKeperawatan.selectIntervensis = val
    const form = storeDiagnosaKeperawatan.tataForm(props.pasien, 'ranap')
    const justDetails = form?.diagnosa?.length ? form?.diagnosa?.map(x => x?.details)?.flat() : []
    const cariIntPlann = []
    const cariInt = []

    for (let i = 0; i < justDetails.length; i++) {
      const kddiag = justDetails[i]?.diagnosakeperawatan_kode
      const kdInt = justDetails[i]?.intervensi_id
      const diag = storeDiagnosaKeperawatan.selectDiagnosa.find(x => x?.kode === kddiag)?.intervensis ?? []
      const intPlann = diag.length ? diag.find(x => x?.id === parseInt(kdInt)) : null
      cariIntPlann.push(intPlann)
    }
    if (settings.categoryIntervensi === 'plann') {
      const plann = cariIntPlann?.filter(x => x?.group === 'plann')?.map(x => '- ' + x?.nama).join('\n')
      store.form.plann = cariIntPlann.length ? plann : null
    }
    else {
      const intX = cariIntPlann?.filter(x => x?.group !== 'plann')?.map(x => '- ' + x?.nama).join('\n')
      store.form.instruksi = cariIntPlann?.length ? intX : null
    }
  }
})

watch(() => storeDiagnosaKebidanan.selectIntervensis, (val) => {
  // console.log('val watch intervensi kebidanan', val)

  if (val) {
    storeDiagnosaKebidanan.selectIntervensis = val
    const form = storeDiagnosaKebidanan.tataForm(props.pasien, 'ranap')
    // console.log('form', form)

    const justDetails = form?.diagnosa?.length ? form?.diagnosa?.map(x => x?.details)?.flat() : []
    const cariIntPlann = []
    const cariInt = []

    for (let i = 0; i < justDetails.length; i++) {
      const kddiag = justDetails[i]?.diagnosakebidanan_kode
      const kdInt = justDetails[i]?.intervensi_id
      const diag = storeDiagnosaKebidanan.selectDiagnosa.find(x => x?.kode === kddiag)?.intervensis ?? []
      const intPlann = diag.length ? diag.find(x => x?.id === parseInt(kdInt)) : null
      cariIntPlann.push(intPlann)
    }
    if (settings.categoryIntervensi === 'plann') {
      const plann = cariIntPlann?.filter(x => x?.group === 'plann')?.map(x => '- ' + x?.nama).join('\n')
      store.form.plann = cariIntPlann.length ? plann : null
      console.log('val watch intervensi kebidanan', plann)
    }
    else {
      const intX = cariIntPlann?.filter(x => x?.group !== 'plann')?.map(x => '- ' + x?.nama).join('\n')
      store.form.instruksi = cariIntPlann?.length ? intX : null
    }
  }
})

watch(() => props.pasien?.diagnosamedis, (val) => {
  console.log('watch diagnosamedis', val)
  if (val) {
    store.initDiagnosaMedisToText(val)
  }
}, { deep: true })

</script>

<template>
  <q-form ref="myForm" class="fit q-pa-md scroll">
    <div class="row q-col-gutter-md ">
      <!-- subjective / adime(asessment)-->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; ">
          <q-card-section class="col-auto flex justify-between items-center">
            <div v-if="nakes !== '5'" class="f-20">
              Subjective
            </div>
            <div v-else class="f-20">
              Assessment
            </div>
            <q-btn
              v-if="nakes !== '4' && nakes !== '5' && nakes !== '6'"
              bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                settings.formOpen = 'anamnesis'
                settings.isChildForm = true
              }"
            />
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <div class="column q-mb-sm">
              <div v-if="nakes !== '5'">
                <b>Keluhan Utama : </b>
              </div>
              <div class="q-mt-sm">
                <!-- <q-input v-model="storeAnamnesis.form.keluhanUtama" type="textarea" class="full-width" /> -->
                <q-input
                  v-if="!settings?.ppaTambahan?.includes(nakes)"
                  ref="refInputKeluhanUtama"
                  v-model="storeAnamnesis.form.keluhanUtama"
                  outlined
                  type="textarea"
                  stack-label
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :lazy-rules="true"
                  rows="10"
                  hide-bottom-space
                />
                <q-input
                  v-else
                  ref="refSsambung"
                  v-model="store.form.s_sambung"
                  outlined
                  type="textarea"
                  stack-label
                  standout="bg-yellow-3"
                  :lazy-rules="true"
                  rows="10"
                  hide-bottom-space
                />
              </div>
            </div>
            <!-- <div class="column q-mb-sm">
              <div><b>Nyeri :</b></div>
              <ItemNyeri :item="storeAnamnesis?.form?.keluhannyeri" v-if="kasus?.gruping === '4.1'" />
              <ItemNyeri :item="storeAnamnesis?.formKebidanan?.keluhannyeri" v-if="kasus?.gruping === '4.2'" />
              <ItemNyeri :item="storeAnamnesis?.formNeoNatal?.keluhannyeri" v-if="kasus?.gruping === '4.3'" />
              <ItemNyeri :item="storeAnamnesis?.formPediatrik?.keluhannyeri" v-if="kasus?.gruping === '4.4'" />
            </div> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- objective / adime(diagnosa) -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px;">
          <q-card-section class="col-auto flex justify-between items-center">
            <div v-if="nakes !== '5'" class="f-20">
              Objective
            </div>
            <div v-else class="f-20">
              Diagnosa
            </div>
            <q-btn
              v-if="nakes !== '4' && nakes !== '5' && nakes !== '6'"
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
              <div><b>T/k : </b> <span>{{ storePemeriksaanUmum?.form?.tkKesadaran }}</span></div>

              <q-separator class="q-my-xs" />
              <!-- Penilaian -->
              <div>
                <!-- <div v-if="storePenilaian?.nortons?.grupings?.includes(jnsKasusKep)">
                  <div v-for="(val, key) in storePenilaian?.formNorton" :key="key">
                    {{ storePenilaian?.nortons?.form.find(x => x.kode === key)?.label ?? '' }} {{ val?.label }}
                  </div>
                </div> -->
                <!-- <q-separator class="q-my-xs" /> -->
                <div v-if="storePenilaian?.humptys?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia < 18)">
                  <div class="column">
                    <b>Skor Humpty Dumpty : </b>
                    <div> - {{ storePenilaian?.formHumpty?.skorHumpty?.label }} ({{ storePenilaian?.formHumpty?.skorHumpty?.skor }})</div>
                  </div>
                </div>
                <div v-if="storePenilaian?.morses?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia >= 18 && storePenilaian.usia < 60)">
                  <div class="column">
                    <b>Skor Morse Fall : </b>
                    <div> - {{ storePenilaian?.formMorse?.skorMorse?.label }} ({{ storePenilaian?.formMorse?.skorMorse?.skor }})</div>
                  </div>
                </div>
                <div v-if="storePenilaian?.ontarios?.grupings?.includes(jnsKasusKep) && (storePenilaian.usia >= 60)">
                  <div class="column">
                    <b>Skor Ontario : </b>
                    <div> - {{ storePenilaian?.formOntario?.skorOntario?.label }} ({{ storePenilaian?.formOntario?.skorOntario?.skor }})</div>
                  </div>
                </div>
              </div>

              <q-separator class="q-my-xs" />
              <div class="column q-mb-sm">
                <div><b>Skor Nyeri : </b> </div>
                <ItemNyeri :item="storeAnamnesis?.form?.keluhannyeri" v-if="kasus?.gruping === '4.1'" />
                <ItemNyeri :item="storeAnamnesis?.formKebidanan?.keluhannyeri" v-if="kasus?.gruping === '4.2'" />
                <ItemNyeri :item="storeAnamnesis?.formNeoNatal?.keluhannyeri" v-if="kasus?.gruping === '4.3'" />
                <ItemNyeri :item="storeAnamnesis?.formPediatrik?.keluhannyeri" v-if="kasus?.gruping === '4.4'" />
              </div>

              <!-- free text tambahan objective-->
              <q-input
                ref="refInputOsambung"
                v-model="store.form.o_sambung"
                outlined
                type="textarea"
                stack-label
                standout="bg-yellow-3"
                :lazy-rules="true"
                rows="5"
                hide-bottom-space
              />
            </div>
            <div v-if="nakes === '5' || nakes === '6' || nakes === '4'">
              <q-input
                ref="refInputOsambung"
                v-model="store.form.o_sambung"
                outlined
                type="textarea"
                stack-label
                standout="bg-yellow-3"
                :lazy-rules="true"
                rows="8"
                hide-bottom-space
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- assessment / adime(intervensi) -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; max-height: 350px;">
          <q-card-section class="col-quto">
            <div class="flex justify-between items-center">
              <div v-if="nakes !== '5'" class="f-20">
                Assessment
              </div>
              <div v-else class="f-20">
                Intervensi
              </div>
              <div class="">
                <q-btn
                  v-if="nakes !== '4' && nakes !== '5' && nakes !== '6'"

                  bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                    if (nakes === '2') {
                      settings.formOpen = 'asessment'
                      storeDiagnosaKeperawatan.modalOpen = true
                      console.log('perawat');

                    }
                    else if (nakes === '1') {
                      settings.formOpen = 'asessmentMedis'
                      settings.isChildForm = true
                    } else if (nakes === '3') {
                      settings.formOpen = 'asessmentKebidanan'
                      storeDiagnosaKebidanan.modalOpen = true
                    }
                    // console.log('settings.formOpen', settings.formOpen, nakes);

                  }"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <!-- {{ storeDiagnosaKeperawatan.selectDiagnosa }} -->
            <q-input
              ref="refInputAsessment"
              v-model="store.form.asessment"
              outlined
              stack-label
              type="textarea"
              standout="bg-yellow-3"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              :lazy-rules="true"
              rows="10"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- planning / adime(monitoring) -->
      <div class="col-3">
        <q-card flat bordered rounded class="column full-height" style="min-height: 350px; max-height: 350px;">
          <q-card-section class="col-quto">
            <div class="flex justify-between items-center">
              <div v-if="nakes !== '5'" class="f-20">
                Plann
              </div>
              <div v-else class="f-20">
                Monitoring
              </div>
              <div class="">
                <q-btn
                  v-if="nakes !== '4' && nakes !== '5' && nakes !== '6' && nakes !== '1'"
                  bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                    // settings.formOpen = nakes==='2'?'diagnosaKeperawatan': (nakes==='3'?'diagnosaKebidanan':'diagnosaMedik')
                    settings.isChildForm = true
                    if (nakes === '2') {
                      settings.formOpen = 'diagnosaKeperawatan'
                      settings.categoryIntervensi = 'plann'
                    } else if (nakes === '3') {
                      settings.formOpen = 'diagnosaKebidanan'
                      settings.categoryIntervensi = 'plann'
                    }
                  }"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="col full-height scroll">
            <q-input
              ref="refInputPlann"
              v-model="store.form.plann"
              outlined
              type="textarea"
              rows="10"
              stack-label
              standout="bg-yellow-3"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              :lazy-rules="true"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- instruksi / adime(evaluasi) -->
      <div class="col-8">
        <q-card flat bordered class="col-12">
          <q-card-section>
            <div class="flex justify-between items-center">
              <div v-if="nakes !== '5'" class="f-20">
                Instruksi PPA
              </div>
              <div v-else class="f-20">
                Evaluasi
              </div>
              <div class="">
                <q-btn
                  v-if="nakes !== '4' && nakes !== '5' && nakes !== '6' && nakes !== '1'"
                  bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                    // settings.formOpen = nakes==='2'?'diagnosaKeperawatan': (nakes==='3'?'diagnosaKebidanan':'diagnosaMedik')
                    settings.isChildForm = true
                    if (nakes === '2') {
                      settings.formOpen = 'diagnosaKeperawatan'
                      settings.categoryIntervensi = null
                    } else if (nakes === '3') {
                      settings.formOpen = 'diagnosaKebidanan'
                      settings.categoryIntervensi = null
                    }
                  }"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <q-input
              ref="refInputInstruksi"
              v-model="store.form.instruksi"
              outlined
              type="textarea"
              rows="10"
              stack-label
              standout="bg-yellow-3"
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
    </div>

    <div style="margin-bottom: 250px;" />

    <div class="fixed-bottom full-width">
      <!-- <div class="col-12"> -->
      <q-card flat bordered class="q-pa-sm">
        <q-card-actions class="q-py-md row justify-between">
          <q-btn
            rounded
            outline
            color="orange"
            icon="icon-mat-arrow_back"
            v-close-popup
          >
            <span class="text-orange-9 q-ml-sm">Kembali </span>
          </q-btn>

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
        // console.log('ok');
        settings.isChildForm = false
      }"
    />

    <!-- dialog diagnosa keperawatan -->
    <modal-diagnosa-keperawatan
      :key="props?.pasien"
      v-model="storeDiagnosaKeperawatan.modalOpen"
      :masters="storeDiagnosaKeperawatan.diagnosas"
      @ok="storeDiagnosaKeperawatan.modalOpen=false"
    />

    <!-- modal diagnosa -->
    <modal-diagnosa-kebidanan
      :key="props?.pasien"
      v-model="storeDiagnosaKebidanan.modalOpen"
      :masters="storeDiagnosaKebidanan.diagnosas"
      @ok="storeDiagnosaKebidanan.modalOpen=false"
    />
  </q-form>
</template>
