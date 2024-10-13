<template>
  <div class="full-width full-height q-pa-sm" :class="items.length ? 'scroll' : ''">
    <div v-if="!items?.length" class="q-pa-md column full-height flex-center">
      <div>Belum Ada Data Tersimpan</div>
    </div>
    <q-card v-else v-for="(item, n) in items" :key="n" flat bordered rouunded class="full-width q-mb-sm">
      <q-list bordered class="rounded-borders">
        <q-expansion-item>
          <template #header>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ item?.nakes==='2'? 'Ns' : (item?.nakes==='1'? 'Dr' : 'Bd') }}
              </q-avatar>
            </q-item-section>

            <q-item-section caption>
              <div class="">
                <span class="text-weight-bold">PPA</span> <span class="text-weight-medium">- {{ item?.petugas?.nama }}</span>
              </div>
            </q-item-section>

            <q-item-section side>
              <div class="text-grey-8">
                <span class="text-weight-bold">Tgl</span> <em class="text-weight-medium"> {{ dateFullFormat(item?.tgl) }}</em>
              </div>
              <div class="text-grey-8">
                <span class="text-weight-bold">Jam</span> <em class="text-weight-medium"> {{ jamTnpDetik(item?.tgl) }}</em>
              </div>
            </q-item-section>
          </template>

          <q-card bordered flat class="bg-grey-4">
            <div class="q-pa-md row">
              <div class="row q-col-gutter-sm">
                <!-- subjective -->
                <div class="col-3">
                  <q-card flat bordered class="column full-height full-width" style="min-height: 300px; max-width: 100%;">
                    <q-card-section class="col-auto flex justify-between items-center">
                      <div class="f-20">
                        Subjective
                      </div>
                      <q-btn
                        dense bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                          editFormAnamnesis(item)
                        }"
                      />
                    </q-card-section>

                    <q-separator inset />

                    <q-card-section class="col full-height scroll">
                      <div class="column q-mb-sm">
                        <div><b>Keluhan Utama : </b></div>
                        <div class="q-ml-sm">
                          <span v-html="getNewLine(item?.anamnesis?.keluhanUtama)" />
                        </div>

                        <div class="column q-mb-sm">
                          <div><b>Nyeri :</b></div>
                          <!-- pediatrik -->
                          <!-- <div class="q-ml-sm column" v-if="item?.anamnesis?.pediatrik">
                            <div class="flex flex-wrap">
                              <div class="flex">
                                <span> {{ item?.anamnesis?.keluhannyeri?.pediatrik?.ket }}</span>
                              </div>
                              <div
                                v-if="(item?.anamnesis?.keluhannyeri?.pediatrik?.kajianNyeri !== 'Wong Baker Face Scale')" class="column q-ml-sm"
                              >
                                <span v-for="(sub, key) in item?.anamnesis?.keluhannyeri?.pediatrik?.form" :key="key"> {{ sub?.text }}</span>
                              </div>
                            </div>
                            <div class="flex">
                              <div>Skor : </div> <div class="q-ml-sm">
                                {{ item?.anamnesis?.keluhannyeri?.pediatrik?.skorNyeri }}
                              </div>
                            </div>
                          </div> -->
                          <item-nyeri :item="item?.anamnesis?.keluhannyeri?.pediatrik" v-if="item?.anamnesis?.keluhannyeri?.pediatrik" />
                          <!-- neonatal -->
                          <item-nyeri :item="item?.anamnesis?.keluhannyeri?.neonatal" v-else-if="item?.anamnesis?.keluhannyeri?.neonatal" />
                          <item-nyeri :item="item?.anamnesis?.keluhannyeri?.kebidanan" v-else-if="item?.anamnesis?.keluhannyeri?.kebidanan" />
                          <item-nyeri :item="item?.anamnesis?.keluhannyeri?.dewasa" v-else :key="item" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- objective -->
                <div class="col-3">
                  <q-card flat bordered class="column full-height full-width" style="min-height: 300px; max-width: 100%;">
                    <q-card-section class="col-auto flex justify-between items-center">
                      <div class="f-20">
                        Objective
                      </div>
                      <q-btn
                        dense bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                          editFormPemeriksaan(item)
                        }"
                      />
                    </q-card-section>

                    <q-separator inset />

                    <q-card-section class="col full-height scroll">
                      <div class="column">
                        <div><b>Ku : </b> <span>{{ item?.pemeriksaan?.keadaanUmum }}</span></div>
                        <div><b>BB : </b> <span>{{ item?.pemeriksaan?.bb }} Kg</span></div>
                        <div><b>TB : </b> <span>{{ item?.pemeriksaan?.tb }} Cm</span></div>
                        <div><b>Nadi : </b> <span>{{ item?.pemeriksaan?.nadi }} (x/mnt)</span></div>
                        <div><b>Sis : </b> <span>{{ item?.pemeriksaan?.sistole }} (mmHg)</span></div>
                        <div><b>Dia : </b> <span>{{ item?.pemeriksaan?.diastole }} (mmHg)</span></div>
                        <div><b>RR : </b> <span>{{ item?.pemeriksaan?.pernapasan }} (x/mnt)</span></div>
                        <div><b>SpO2 : </b> <span>{{ item?.pemeriksaan?.spo }} (%)</span></div>
                        <div><b>Suhu : </b> <span>{{ item?.pemeriksaan?.suhu }} (C)</span></div>
                        <div><b>T/k : </b> <span>{{ item?.pemeriksaan?.tkKesadaranKet }}</span></div>

                        <q-separator class="q-my-xs" />
                        <!-- Penilaian -->
                        <div>
                          <div v-if="item?.penilaian?.norton">
                            <div v-for="(val, key) in item?.penilaian?.norton" :key="key" class="flex">
                              {{ storePenilaian?.nortons?.form?.find(x=>x?.kode === key)?.label ?? '-' }}  {{ val?.label }}
                            </div>
                          </div>
                          <q-separator class="q-my-xs" />
                          <div v-if="item?.penilaian?.humpty_dumpty">
                            <div class="column">
                              <b>Resiko Jatuh : </b>
                              <div> - {{ item?.penilaian?.humpty_dumpty?.skorHumpty?.label }} ({{ item?.penilaian?.humpty_dumpty?.skorHumpty?.skor }})</div>
                            </div>
                          </div>
                          <div v-if="item?.penilaian.morse_fall">
                            <div class="column">
                              <b>Resiko Jatuh : </b>
                              <div> - {{ item?.penilaian.morse_fall?.skorMorse?.label }} ({{ item?.penilaian.morse_fall?.skorMorse?.skor }})</div>
                            </div>
                          </div>
                          <div v-if="item?.penilaian?.ontario">
                            <div class="column">
                              <b>Resiko Jatuh : </b>
                              <div> - {{ item?.penilaian?.ontario?.skorOntario?.label }} ({{ item?.penilaian?.ontario?.skorOntario?.skor }})</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- asessment -->
                <div class="col-3">
                  <q-card flat bordered class="column full-height full-width" style="min-height: 300px; max-width: 100%;">
                    <q-card-section class="col-auto flex justify-between items-center">
                      <div class="f-20">
                        Asessment
                      </div>
                      <!-- <q-btn
                        dense bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                          editFormPemeriksaan(item)
                        }"
                      /> -->
                    </q-card-section>

                    <q-separator inset />

                    <q-card-section class="col full-height scroll">
                      <div class="column">
                        <q-input
                          ref="refInputAsessment"
                          v-model="item.asessment"
                          outlined
                          autogrow
                          stack-label
                          standout="bg-yellow-3"
                          label="Asessment"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                          :lazy-rules="true"
                          hide-bottom-space
                          readonly
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- plann -->
                <div class="col-3">
                  <q-card flat bordered class="column full-height full-width" style="min-height: 300px; max-width: 100%;">
                    <q-card-section class="col-auto flex justify-between items-center">
                      <div class="f-20">
                        Plann
                      </div>
                      <!-- <q-btn
                        dense bordered outline round icon="icon-mat-edit" size="sm" color="primary" @click="()=> {
                          editFormPemeriksaan(item)
                        }"
                      /> -->
                    </q-card-section>

                    <q-separator inset />

                    <q-card-section class="col full-height scroll">
                      <div class="column">
                        <q-input
                          ref="refInputPlann"
                          v-model="item.plann"
                          outlined
                          autogrow
                          stack-label
                          standout="bg-yellow-3"
                          label="Asessment"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                          :lazy-rules="true"
                          hide-bottom-space
                          readonly
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- ooo -->
                <div class="col-12">
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
                        v-model="item.instruksi"
                        outlined
                        autogrow
                        stack-label
                        standout="bg-yellow-3"
                        label="Instruksi"
                        :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        :lazy-rules="true"
                        hide-bottom-space
                        readonly
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card>
        </q-expansion-item>

        <q-separator />
      </q-list>
    </q-card>

    <DialogFormItem
      v-model="settings.isChildForm"
      :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :settings="settings"
      @on-hide="settings.isEdit=false"
      @on-click="()=> {
        // console.log('edit', settings);
        if (settings.formOpen === 'anamnesis') {
          updateToServerAnamnesis(props.kasus)
        } else if(settings.formOpen === 'pemeriksaan') {
          updateToServerPemeriksaan(props.kasus)
        }

      }"
    />
  </div>
</template>

<script setup>
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter'
import { computed, defineAsyncComponent } from 'vue'
import useForm from './useForm'

const ItemNyeri = defineAsyncComponent(() => import('./itemlist/ItemNyeri.vue'))
const DialogFormItem = defineAsyncComponent(() => import('./dialogformchild/DialogFormItem.vue'))

const props = defineProps({
  pasien: { type: Object, default: () => null },
  kasus: { type: Object, default: () => null },
  // items: { type: Array, default: () => [] },
  nakes: { type: String, default: null }

})

// eslint-disable-next-line no-unused-vars
const { settings, editFormAnamnesis, editFormPemeriksaan, updateToServerAnamnesis, updateToServerPemeriksaan, store, storePenilaian } = useForm(props?.pasien)

const items = computed(() => {
  return store.items
})

function getNewLine (text) {
  // console.log('text', text)

  return text?.replace(/\n/g, '<br/>')
}
</script>
