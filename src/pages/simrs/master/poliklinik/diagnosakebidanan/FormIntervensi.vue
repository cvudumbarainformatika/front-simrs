<template>
  <div class="col-auto bg-teal text-white">
    <div class="q-pa-sm text-weight-bold">
      FORM MASTER INTERVENSI  <div class="text-dark">
        {{ store?.diagnosa?.kode }} {{ store.diagnosa?.nama }}
      </div>
    </div>
  </div>
  <div class="col full-height scroll">
    <div class="q-pa-md">
      <div class="row justify-between">
        <q-input
          v-model="groupIntervernsi"
          label="Tambah Group Intervensi"
          outlined
          standout="bg-yellow-3"
          dense
          autofocus
          style="width: 250px;"
          placeholder="Enter untuk Menambahkan"
          @keyup.enter="addingGroupIntervensi"
        />

        <q-btn
          color="dark"
          @click="store.setIntervensi(null)"
        >
          Kembali
        </q-btn>
      </div>

      <div class="column">
        <q-separator class="q-mt-md q-mb-sm" />
        <template
          v-for="(gr, i) in store.groupIntervensis"
          :key="i"
        >
          <div class="row full-width items-center">
            <div class="text-weight-bold">
              {{ gr.group }}
              <q-popup-edit
                v-slot="scope"
                v-model="gr.group"
                :persistent="gr.group === null || gr.group === ''"
                :cover="false"
                :offset="[0, -10]"
                class=""
                :validate="val => val.length > 0"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  outlined
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
            <q-btn
              size="sm"
              flat
              color="primary"
              class="q-ml-lg"
            >
              Tambah Data
              <q-popup-edit
                v-slot="scope"
                v-model="store.intervensi"
                :validate="val => val.length > 0"
                style="width: 30% !important;"
                :cover="false"
                :offset="[0, 10]"
              >
                <q-input
                  v-model="scope.value"
                  autofocus
                  dense
                  :model-value="scope.value"
                  :hint="`Tambah ${gr.group}`"
                  :rules="[
                    val => scope.validate(val) || 'Harap diisi'
                  ]"
                  @keyup.enter="setScope(scope, gr.group)"
                />
              </q-popup-edit>
            </q-btn>
          </div>
          <q-separator class="q-mt-sm q-mb-xs" />
          <q-list
            dense
            separator
          >
            <q-item
              v-for="(item, x) in filterredIntervensis(gr.group)"
              :key="x"
            >
              <div class="row full-width items-center justify-between">
                <div class="flex">
                  <div>{{ x + 1 }}  <span class="q-px-sm"> - </span> </div>
                  <div class="q-ml-md text-blue-5">
                    {{ item?.nama }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="item.nama"
                      :persistent="item.nama === null || item.nama === ''"
                      :cover="false"
                      :offset="[0, -10]"
                      class=""
                      :validate="val => val.length > 0"
                    >
                      <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        outlined
                        standout="bg-yellow-3"
                        :rules="[val => !!val || 'Harap diisi']"
                        hide-bottom-space
                        @keyup.enter="setScope(scope, gr.group, item)"
                      />
                    </q-popup-edit>
                  </div>
                </div>

                <div class="kanan">
                  <q-btn
                    icon="icon-mat-delete"
                    flat
                    size="xs"
                    round
                    color="negative"
                    @click="store.deleteIntervensi(item.id)"
                  />
                </div>
              </div>
            </q-item>
            <q-separator class="q-mt-xs q-mb-sm" />
          </q-list>
        </template>
      </div>

      <q-btn
        color="dark"
        class="q-my-lg"
        @click="store.setIntervensi(null)"
      >
        Kembali
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { useMasterDiagnosaKebidanan } from 'src/stores/simrs/master/poliklinik/diagnosakebidanan'
import { ref } from 'vue'

const store = useMasterDiagnosaKebidanan()
const groupIntervernsi = ref(null)

function addingGroupIntervensi(evt) {
  store.addGroupIntervensi(evt?.target?.value)
    .then(() => {
      groupIntervernsi.value = null
    })
}

function setScope(scope, group, row) {
  scope.set()
  store.saveIntervensi(group, row)
}

function filterredIntervensis(by) {
  const arr = store?.diagnosa?.intervensis
  return arr.length ? arr.filter(x => x.group === by) : []
}
</script>
