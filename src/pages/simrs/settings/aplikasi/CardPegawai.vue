<template>
  <q-card
    style="width:100%"
    class="bg-primary text-white"
  >
    <q-card-section>
      <div class="row items-center">
        <div class="">
          <q-avatar size="60px">
            <img :src="getImage(item)">
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div class="flex flex-nowrap">
            <strong>Nip : </strong> {{ item.nip }}
          </div>
          <div class="ellipsis">
            <strong>Nip : </strong> {{ item.nama }}
          </div>
          <div class="ellipsis">
            <strong>Ruangan : </strong> {{ item.ruangan? item.ruangan.namaruang: '-' }}
          </div>
          <div class="ellipsis row items-center">
            <strong>Akses Ruang: </strong>
            <q-btn
              :label="item.ruang? item.ruang.uraian: 'tidak ada akses ruang'"
              no-caps
              flat
              size="12px"
              :loading="store.loadingRuang"
            >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item>
                    <app-input
                      v-model="store.par.q"
                      label="cari ruang"
                      debounce="800"
                      outlined
                      valid
                      :loading="store.loadingRuang"
                      @update:model-value="store.getRuang"
                    />
                  </q-item>
                  <q-item
                    v-for="(ruang,i) in store.ruangs"
                    :key="i"
                    v-close-popup
                    clickable
                    @click="store.setRuang(ruang)"
                  >
                    <q-item-section>{{ ruang.uraian }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="ellipsis">
            <strong>Akses Role : </strong>
            <q-btn
              :label="item.role? item.role.nama: 'tidak ada akses role'"
              no-caps
              flat
              size="12px"
              :loading="store.loadingRole"
            >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(role,i) in store.roles"
                    :key="i"
                    v-close-popup
                    clickable
                    @click="store.setRole(role)"
                  >
                    <q-item-section>{{ role.nama }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="ellipsis">
            <strong>Poli : </strong>
            <q-btn
              :label="item.poli? item.poli.rs2: 'tidak ada akses role'"
              no-caps
              flat
              size="12px"
              :loading="store.loadingPoli"
            >
              <q-menu>
                <app-input
                  v-model="filt"
                  outlined
                  label="cari poli"
                  autofocus
                  @update:model-value="filter"
                />
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(poli,i) in filtered"
                    :key="i"
                    v-close-popup
                    clickable
                    @click="store.setPoli(poli)"
                  >
                    <q-item-section>{{ poli?.polirs }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-card
    style="width:100%"
    class="q-mt-md"
  >
    <q-card-section>
      <q-list
        bordered
        separator
      >
        <q-item
          v-if="!menus.length"
          class="text-blue"
        >
          <q-item-section avatar>
            <q-icon
              name="icon-mat-receipt_long"
            />
          </q-item-section>
          <q-item-section>
            Belum ada Data
          </q-item-section>
        </q-item>
        <q-item
          v-if="menus.length"
          class="text-blue"
        >
          <q-item-section>
            <q-checkbox
              v-model="check"
              dense
              :disable="loading"
              @update:model-value="$emit('allCheck',check)"
            />

            <q-item-section>
              Full controll
            </q-item-section>
          </q-item-section>
        </q-item>
        <template v-if="menus.length">
          <q-expansion-item
            v-for="(app, i) in menus"
            :key="i"
            expand-icon-toggle
          >
            <template #header>
              <q-item-section>
                <q-checkbox
                  v-model="app.checked"
                  dense
                  :disable="loading"
                  @update:model-value="$emit('appCheck',{'app':app,'i':i})"
                />
              </q-item-section>
              <q-item-section avatar>
                <q-icon
                  :name="app.icon"
                />
              </q-item-section>
              <q-item-section>
                {{ app.julukan }}
              </q-item-section>
            </template>
            <template

              v-for="(menu, n) in app.menus"
              :key="n"
            >
              <q-item
                v-if="menu.submenus.length===0"
                v-ripple
                clickable
                class="q-ml-lg"
              >
                <q-item-section>
                  <q-checkbox
                    v-model="menu.checked"
                    dense
                    :disable="loading"
                    @update:model-value="$emit('menuCheck',{'menu':menu,'i':i,'n':n})"
                  />
                </q-item-section>
                <q-item-section>
                  <q-icon
                    :name="menu.icon"
                  />
                </q-item-section>
                <q-item-section>
                  {{ menu.nama }}
                </q-item-section>
              </q-item>
              <q-expansion-item
                v-else
                :label="menu.nama"
                expand-separator
                class="q-pl-lg"
                dense-toggle
                hide-expand-icon
              >
                <template #header>
                  <q-item-section>
                    <q-checkbox
                      v-model="menu.checked"
                      dense
                      :disable="loading"
                      @update:model-value="$emit('menuCheck',{'menu':menu,'i':i,'n':n})"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-icon
                      :name="menu.icon"
                    />
                  </q-item-section>
                  <q-item-section>
                    {{ menu.nama }}
                  </q-item-section>
                </template>
                <q-list
                  separator
                  class="q-pl-lg"
                >
                  <q-item
                    v-for="(sub, x) in menu.submenus"
                    :key="x"
                    v-ripple
                    clickable
                  >
                    <q-item-section>
                      <q-checkbox
                        v-model="sub.checked"
                        dense
                        :disable="loading"
                        @update:model-value="$emit('submenuCheck',{'sub':sub,'i':i,'n':n,'x':x})"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-icon
                        :name="sub.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      {{ sub.nama }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </template>
          </q-expansion-item>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
  <q-card>
    <!-- <q-card-actions
      v-if="menus.length"
      align="right"
    >
      <app-btn
        label="simpan"
        :loading="store.loading"
        :disable="store.loading"
        @click="$emit('simpan',menus)"
      />
    </q-card-actions> -->
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
const store = useSettingsAplikasi()
const filtered = ref(store.polis)
const filt = ref('')
function filter(val) {
  if (val) {
    filtered.value = store.polis.filter(a => a.polirs.toLowerCase().includes(val.toLowerCase()))
  }
}
defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  menus: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['simpan', 'allCheck', 'appCheck', 'menuCheck', 'submenuCheck'])
const check = ref(false)

function getImage(row) {
  const kelamin = row.kelamin
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

</script>
