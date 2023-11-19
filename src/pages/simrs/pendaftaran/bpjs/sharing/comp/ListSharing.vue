<template>
  <div>
    <app-loading v-if="loading" />
    <div v-else>
      <div v-if="items.length <= 0">
        <div
          class="column flex-center"
          style="min-height:50vh"
        >
          <div class="text-h3 q-mb-md">
            🏷️
          </div>
          <div class="f-14">
            Belum Ada Data
          </div>
        </div>
      </div>
      <q-list
        v-else
        separator
      >
        <q-separator
          spaced
          inset
        />

        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ item?.nama }} | <span class="text-primary">{{ item?.norm }}</span>
            </q-item-label>
            <q-item-label>
              NOREG : <span class="text-weight-bold">{{ item?.noreg }} </span>  | HP : <span class="text-weight-bold">{{ item?.nohp }}</span>
            </q-item-label>
            <q-item-label caption>
              KTP : <span class="text-weight-bold">{{ item?.nktp }}</span>  | NO KA BPJS : <span class="text-weight-bold">{{ item?.noka }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item?.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item?.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              Tgl entri : <span class="text-weight-bold text-accent"> {{ dateFullFormat(item?.tglEntry) }} </span> | jam : {{ formatJam(item?.tglEntry) }}
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-item-label caption>
              <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    color="teal"
                    :loading="loadingP && temp===item?.noka"
                    label="Buka"
                    @click="buka(item)"
                  />
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset
        />
      </q-list>
    </div>
    <app-dialog-form
      v-model="dialog"
      title="Sharing"
      :loading="store.loadingSave"
      @save-form="simpanForm"
    >
      <template #default>
        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-4">
            Klaim BPJS
          </div>
          <div class="col-8">
            <app-input
              v-model="store.form.klaimbpjs"
              label="Klaim BPJS"
              outlined
              @update:model-value="setNumber($event,'klaimbpjs')"
            />
          </div>
        </div>
      </template>
    </app-dialog-form>
  </div>
</template>

<script setup>
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { usePasienSharingStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sharing'
import { ref } from 'vue'

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

const store = usePasienSharingStore()
const temp = ref(null)
const loadingP = ref(false)
const dialog = ref(false)
function buka(val) {
  temp.value = val.noka
  store.setForm('noreg', val.noreg)
  store.setForm('kodepoli', val.kdRuang)
  dialog.value = true
  // simpanKunjungan()
}
// eslint-disable-next-line no-unused-vars
function setNumber(evt, form) {
  const num = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  store.setForm(form, num)
}
// eslint-disable-next-line no-unused-vars
function simpanForm() {
  console.log('form', store.form)
  store.simpan().then(() => {
    dialog.value = false
  })
}

</script>
<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

</style>
