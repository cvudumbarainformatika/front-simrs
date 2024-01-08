<template>
  <q-dialog persistent>
    <q-card style="width: 70%;">
      <q-bar>
        <q-icon name="icon-eva-home-outline" />
        <div>Data Departement</div>

        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col-6">
            <q-list
              bordered
              separator
              dense
            >
              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  <q-item-label overline>
                    NAMA DEPARTEMMENT
                  </q-item-label>
                  <q-item-label>
                    {{ store?.item?.nama }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="store.item.nama"
                      :validate="inputValiation"
                      @hide="inputValiation"
                    >
                      <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        outlined
                        standout="bg-yellow-3"
                        hint="Nama Departement"
                        :error="errorInput"
                        :error-message="errorMessage"
                        @keyup.enter="scope.set"
                      />
                    </q-popup-edit>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  <q-item-label overline>
                    TELEPHONE
                  </q-item-label>
                  <q-item-label>
                    {{ store?.item?.phone }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="store.item.phone"
                      :validate="inputValiation"
                      @hide="inputValiation"
                    >
                      <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        outlined
                        standout="bg-yellow-3"
                        hint="Input Telephone"
                        :error="errorInput"
                        :error-message="errorMessage"
                        @keyup.enter="scope.set"
                      />
                    </q-popup-edit>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6">
            <q-list
              bordered
              separator
              dense
            >
              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  <q-item-label overline>
                    EMAIL
                  </q-item-label>
                  <q-item-label>
                    {{ store?.item?.email }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="store.item.email"
                      :validate="inputValiation"
                      @hide="inputValiation"
                    >
                      <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        outlined
                        standout="bg-yellow-3"
                        hint="Input Email"
                        :error="errorInput"
                        :error-message="errorMessage"
                        @keyup.enter="scope.set"
                      />
                    </q-popup-edit>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  <q-item-label overline>
                    Website
                  </q-item-label>
                  <q-item-label>
                    {{ store?.item?.website }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="store.item.website"
                      :validate="inputValiation"
                      @hide="inputValiation"
                    >
                      <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        outlined
                        standout="bg-yellow-3"
                        hint="Input Website"
                        :error="errorInput"
                        :error-message="errorMessage"
                        @keyup.enter="scope.set"
                      />
                    </q-popup-edit>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section
        style="max-height: 50vh"
        class="scroll bg-dark text-white"
      >
        <div
          v-if="store?.item?.satset===null"
          class="column full-height flex-center"
        >
          <div>Data Satu Sehat di Database Belum Ada</div>
        </div>
        <div v-else>
          <pre class="text-yellow">{{ store.item?.satset?.response }}</pre>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions
        class="bg-primary"
      >
        <div class="row justify-between full-width">
          <div class="kiri">
            <q-btn
              label="Update Satu Sehat"
              color="teal"
              :loading="store.loadingSatset"
              :disable="store.loadingSatset"
              @click="store.kirimSatset(store.item)"
            />
          </div>
          <div class="kanan q-gutter-sm">
            <q-btn
              label="Update Data Departement"
              color="orange"
              :loading="store.loading"
              :disable="store.loading"
              @click="store.updateDataRs"
            />
            <q-btn
              v-close-popup
              label="Tutup"
              color="dark"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { ref } from 'vue'
import { ref } from 'vue'
import { useOrganisasiStore } from '../../../../stores/satset/organisasi'

const store = useOrganisasiStore()
const errorInput = ref(false)
const errorMessage = ref('')
function inputValiation(val) {
  if (val === '' || val === null) {
    errorInput.value = true
    errorMessage.value = 'Harap diisi!!'
    return false
  }
  errorInput.value = false
  errorMessage.value = ''
  return true
}

</script>
