<template>
  <div
    class="column q-pa-none"
    style="min-height: 20px;"
  >
    <div
      class="flex items-center q-pb-sm"
    >
      <!-- <div class="col-4">
        <div class="flex items-center">
          <q-icon
            :name="`${store.pasien? 'icon-mat-person':'icon-mat-bedroom_parent'}`"
            size="md"
            color="grey-8"
          />
          <div class="q-ml-sm">
            <div class="f-18">
              <b class="text-grey-8">{{ store.pasien? 'DETAILS PASIEN':'RAWAT INAP' }}</b>
            </div>
            <div class="f-10">
              List Tunggu Pasien
            </div>
          </div>
        </div>
      </div> -->
      <div class="col-8">
        <!-- <div
          v-if="store.pasien"
          class="full-width flex items-center q-gutter-sm"
        >
          <q-btn
            flat
            color="grey-8"
            padding="xs"
            size="md"
            round
            @click="store.pasien = null"
          >
            <q-icon name="icon-mat-close" />
            <q-tooltip>Refresh</q-tooltip>
          </q-btn>
        </div> -->
        <div
          class="full-width flex items-center q-gutter-x-sm justify-end"
        >
          <div>
            <q-input
              v-model="store.params.q"
              placeholder="Cari"
              class="bg-white"
              dense
              outlined
              @keypress.enter="store.setPage(1)"
            >
              <template #prepend>
                <div>
                  <q-icon
                    name="icon-mat-search"
                    size="xs"
                  />
                </div>
              </template>
              <template
                v-if="store.params.q"
                #append
              >
                <div class="cursor-pointer">
                  <q-icon
                    name="icon-mat-close"
                    size="xs"
                    @click="clearQ"
                  />
                </div>
              </template>
            </q-input>
          </div>
          <q-btn
            outline
            color="grey-8"
            class="bg-white"
            padding="sm"
            size="sm"
            no-caps
          >
            <div
              class="flex"
            >
              <transition>
                <q-icon
                  v-if="store.isViewList"
                  name="icon-mat-dataset"
                  size="16px"
                />
                <q-icon
                  v-else
                  name="icon-mat-format_list_numbered"
                  size="16px"
                />
              </transition>
              <div
                class="relative-position"
                style="width: 45px;"
              >
                <q-toggle
                  v-model="store.isViewList"
                  size="sm"
                  class="absolute"
                  style="top: -10px; right: 0;"
                />
              </div>
            </div>
          </q-btn>
          <q-btn
            outline
            color="grey-8"
            class="bg-white"
            padding="sm"
            size="sm"
            no-caps
          >
            <div class="flex items-center q-mx-xs">
              <div class="f-12 q-mr-sm">
                {{ store.header.periode }}
              </div>
              <transition>
                <q-icon
                  :name="`${showMenuPeriode?'icon-mat-keyboard_arrow_up':'icon-mat-keyboard_arrow_down'}`"
                  size="16px"
                />
              </transition>
            </div>

            <q-menu
              @show="showMenuPeriode=true"
              @hide="showMenuPeriode=false"
            >
              <div class="row no-wrap q-pa-sms">
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="item in store.periods"
                    :key="item"
                    clickable
                    :active="item === store.header.periode"
                    active-class="bg-primary text-white"
                    :disable="item === 'Custom'"
                    @click="store.setPeriode(item)"
                  >
                    <q-item-section>{{ item }}</q-item-section>
                  </q-item>
                </q-list>
                <q-separator
                  vertical
                  inset
                />

                <div class="column">
                  <div class="row q-pa-sm q-col-gutter-sm">
                    <div class="col">
                      <q-date
                        v-model="store.params.to"
                        minimal
                        bordered
                        flat
                        mask="YYYY-MM-DD"
                        @update:model-value="store.setPeriode('Custom')"
                      />
                      <div class="f-10 text-grey-8 q-mt-xs">
                        DARI TANGGAL : <b>{{ store.params.to }}</b>
                      </div>
                    </div>
                    <div class="col">
                      <q-date
                        v-model="store.params.from"
                        minimal
                        bordered
                        flat
                        mask="YYYY-MM-DD"
                        @update:model-value="store.setPeriode('Custom')"
                      />
                      <div class="f-10 text-grey-8 q-mt-xs">
                        SAMPAI TANGGAL : <b>{{ store.params.to }}</b>
                      </div>
                    </div>
                  </div>
                  <q-separator />
                  <div class="row q-pa-sm justify-end">
                    <q-btn
                      v-close-popup
                      color="primary"
                      label="Terapkan"
                      push
                      size="sm"
                      @click="store.getDataTable"
                    />
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            outline
            color="grey-8"
            class="bg-white"
            padding="sm"
            size="sm"
            no-caps
          >
            <div class="flex items-center q-mx-xs">
              <div class="f-12 q-mr-sm">
                {{ store.ruangans?.find(x => x.groups === store.params.ruangan)?.groups_nama }}
              </div>
              <transition>
                <q-icon
                  :name="`${showMenuRuangan?'icon-mat-keyboard_arrow_up':'icon-mat-keyboard_arrow_down'}`"
                  size="16px"
                />
              </transition>
            </div>

            <q-menu
              @show="showMenuRuangan=true"
              @hide="showMenuRuangan=false"
            >
              <div class="row no-wrap q-pa-sms">
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="item in store.ruangans"
                    :key="item"
                    clickable
                    v-close-popup
                    :active="item.groups === store.params.ruangan"
                    active-class="bg-primary text-white"
                    @click="store.setRuangan(item)"
                  >
                    <q-item-section>{{ item.groups_nama }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            v-for="(item, i) in store.statuses"
            :key="i"
            outline
            :color="`${item === store.params.status? 'white':'grey-8'}`"
            :class="`${item === store.params.status? i===0?'bg-grey-8': (i===1?'bg-teal':'bg-deep-orange-8')
              :'bg-white'}`"
            padding="sm"
            size="sm"
            @click="store.setStatus(item)"
          >
            <q-icon
              :name="`${i === 0 ? 'icon-cus-groups':(i===1?'icon-mat-done_all':'icon-mat-access_time')}`"
            />

            <q-tooltip>{{ item }}</q-tooltip>
          </q-btn>

          <q-btn
            outline
            color="grey-8"
            class="bg-white"
            padding="sm"
            size="sm"

            @click="store.getDataTable"
          >
            <q-icon name="icon-mat-refresh" />
            <q-tooltip>Refresh</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <q-separator />
    <div
      v-if="!store.pasien"
      class="row items-center q-px-sm q-py-xs"
    >
      <div class="col-6">
        <div class="f-12 text-grey-6">
          <b>DETAIL KUNJUNGAN </b> <span> > {{ store.header.periode }}</span> <span> > {{ store.params.status }}</span>
        </div>
      </div>
      <div class="col-6 flex justify-end">
        <div class="f-10 text-grey-8 flex">
          <div class="q-mr-xs">
            Urutkan :
          </div>
          <div class="cursor-pointer">
            {{ store.params.sort }}

            <q-menu>
              <q-list
                style="min-width: 100px"
                dense
                separator
              >
                <q-item
                  v-for="item in store.sorting"
                  :key="item"
                  v-close-popup
                  clickable
                  @click="store.setUrutan(item)"
                >
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </div>
    </div>
    <q-separator />
  </div>
</template>
<script setup>
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history'
import { ref } from 'vue'

// const search = ref('')

// eslint-disable-next-line no-unused-vars
const showMenuPeriode = ref(false)
const showMenuRuangan = ref(false)
// const showMenuStatus = ref(false)

const store = useListHistoryPendaftaranRanapStore()
// console.log(store)

// eslint-disable-next-line no-unused-vars
function clearQ () {
  store.params.q = ''
  store.setPage(1)
}
</script>
