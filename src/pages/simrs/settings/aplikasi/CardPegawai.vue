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
