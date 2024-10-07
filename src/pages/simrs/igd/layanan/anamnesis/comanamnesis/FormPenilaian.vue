<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
    style="overflow: hidden;"
  >
    <q-form
      ref="refForm"
      class="full-height"
      @submit="onSubmit"
    >
      <q-card-section class="q-px-md q-py-xs bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="f-12 text-weight-bold">
            Form Penilaian Kajian Resiko Jatuh
          </div>
          <div>
            <q-btn
              flat
              dense
              size="md"
              icon="icon-mat-history"
            >
              <q-tooltip class="bg-dark text-white">
                {{ tooltip }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="full-height scroll"
      >
        <div class="q-px-md q-py-xs q-pt-xs bg-grey-4 text-weight-bold">
          {{ storepenilaian?.formpenilaians?.desc }}
        </div>
        <q-card-section

          class="full-height "
        >
          <div class="row">
            <div class="col-12 ">
              <div
                v-for="(item , n) in storepenilaian?.formpenilaians?.form"
                :key="n"
              >
                <div class="row ">
                  <div class="col-12 text-weight-bold ">
                    {{ item.label }}
                  </div>
                  <div class="row" v-for="(submenu , x) in item?.submenu" :key="x">
                    <div class="col-12" v-if="item.submenu.length > 0">
                      <span>
                        - {{ submenu.label }}
                      </span>
                      <span v-for="(kategori , xl) in submenu?.categories" :key="xl">
                        <q-radio
                          class="q-py-xs q-pa-sm"
                          v-model="storepenilaian.form[storepenilaian?.formpenilaians?.kode][item.kode][submenu.kode]"
                          :val="kategori"
                          dense
                          :label="kategori.label"
                          color="primary"
                          @update:model-value="updateSelection($event,item)"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <span
                    v-for="(kategori , xl) in item.categories"
                    :key="xl"
                  >
                    <q-radio
                      class="q-py-xs q-pa-sm"
                      v-model="storepenilaian.form[storepenilaian?.formpenilaians?.kode][item.kode]"
                      :val="kategori"
                      dense
                      :label="kategori.label"
                      color="primary"
                      @update:model-value="updateSelection($event,item)"
                    /></span>
                </div>
                <q-separator class="q-my-xs" />
              </div>
            </div>
            <div class="col-12">
              <div
                class="text-right"
                style="margin-bottom: 50px;"
              >
                <app-btn
                  color="primary"
                  label="Simpan Penilaian"
                  tooltip="Simpan Data"
                  type="submit"
                  tip
                  :loading="storepenilaian.loadingForm"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card-section
          v-else
          class="full-height scroll"
        >
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div
                class="row items-center" v-for="(item , n) in storepenilaian?.formpenilaians?.form"
                :key="n"
              >
                <div class="col-4">
                  {{ item.label }} :
                </div>
                <div class="col-8 text-weight-bold">
                  <span
                    v-for="(kategori , x) in item.categories"
                    :key="x"
                  ><q-radio v-model="storepenilaian.olahform" :val="kategori" :label="kategori.label" color="primary" @update:model-value="updateSelection" /></span>
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div
                    class="text-right"
                    style="margin-bottom: 50px;"
                  >
                    <app-btn
                      color="primary"
                      label="Simpan Penilaian"
                      tooltip="Simpan Data"
                      type="submit"
                      tip
                      :loading="storepenilaian.loadingForm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section> -->
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis'
import { ref } from 'vue'

const storepenilaian = usePenilaianAnamnesisIgd()
const refForm = ref(null)
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

function onSubmit () {
  storepenilaian.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}
function updateSelection (evt, item, val) {
  console.log('val', storepenilaian?.form.humpty_dumpty)
}

</script>
