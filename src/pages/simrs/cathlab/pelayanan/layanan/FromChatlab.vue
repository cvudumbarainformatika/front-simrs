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
            Form Pelayanan Cathlab
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
        <div
          class="row items-center"
        >
          <div class="col-7">
            <q-select
              ref="reftindakan"
              v-model="store.tindakan"
              label="Tindakan CathLab"
              dense
              outlined
              :options="store.mastertarif"
              option-label="tindakan"
              option-value="kode"
              standout="bg-yellow-3"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt.tindakan }}
                    </q-item-label>
                    <q-item-label caption>
                      Rp. {{ formatDouble(scope.opt.total) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row items-center q-pt-sm">
          <div class="col-10">
            <q-input
              ref="refketerangan"
              v-model="store.form.keterangan"
              label="Keterangan"
              type="textarea"
              outlined
              standout="bg-yellow-3"
              clearable
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div
          class="text-right q-mt-md"
          style="margin-bottom: 50px;"
        >
          <app-btn
            color="primary"
            label="Simpan Triage"
            tooltip="Simpan Data"
            type="submit"
            tip
            :loading="store.loadingForm"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import { usePelayanaCahtlab } from 'src/stores/simrs/penunjang/cathlab/pelayanancathlab'
import { onMounted, ref } from 'vue'

const store = usePelayanaCahtlab()
const refForm = ref(null)
const reftindakan = ref(null)
const refketerangan = ref(null)

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
  // console.log('coba', store.tindakan)
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

onMounted(() => {
  store.tarifcatlab(props?.pasien?.kelas)
})
</script>
