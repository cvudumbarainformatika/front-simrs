<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="kiri q-gutter-sm row items-center">
      <q-input
        v-model="store.params.q"
        dense
        outlined
        standout="bg-yellow-3"
        placeholder="Cari Data Kunjungan ... ENTER"
        style="width: 250px;"
        clearable
        clear-icon="icon-mat-close"
        @keyup.enter="searchEnter"
      >
        <template #prepend>
          <q-icon
            name="icon-mat-search"
            size="sm"
          />
        </template>
      </q-input>
      <q-input
        v-model="store.params.to"
        dense
        outlined
        standout="bg-yellow-3"
        placeholder="Cari Data Kunjungan ..."
        style="width: 140px;"
        @click="showDate"
      >
        <template #prepend>
          <q-icon
            name="icon-mat-event"
            size="sm"
            color="primary"
          >
            <q-popup-proxy
              ref="refPopup"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <!-- <q-menu v-model="showing"> -->
              <q-date
                v-model="store.params.to"
                mask="YYYY-MM-DD"
                today-btn
                minimal
                no-unset
                @update:model-value="closeDate()"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    label="Close"
                    color="primary"
                    flat
                    @click="closeDate()"
                  />
                </div>
              </q-date>

            <!-- </q-menu> -->
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="kanan">
      .
    </div>
  </div>
</template>

<script setup>
import { dateDbFormat } from 'src/modules/formatter'
import { useSatsetRajalStore } from 'src/stores/satset/rajal'
import { onMounted, ref } from 'vue'

const store = useSatsetRajalStore()
const refPopup = ref()

onMounted(() => {
  defaultDate()
})

function defaultDate() {
  const dt = dateDbFormat(new Date())
  store.params.to = dt
  store.params.from = dt
}

function showDate () {
  refPopup.value.show()
}

function closeDate() {
  // if (store.params.to === '' || store.params.to === null) {
  //   notifErrVue('Maaf Tanggal harus dipilih')
  //   return
  // }
  store.params.from = store.params.to
  refPopup.value.hide()
  store.getData()
}

function searchEnter(evt) {
  console.log(evt.target.value)
  const val = evt.target.value
  store.params.q = val
  store.params.page = 1
  store.getData()
}
</script>
