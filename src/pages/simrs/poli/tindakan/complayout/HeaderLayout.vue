<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <!-- <q-btn
          color="yellow"
          :label="`DPJP || ${pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter}`"
          dense
          class="q-px-sm"
          outline
        > -->
        <q-btn
          color="primary"
          class="q-pl-xs"
          flat
        >
          <div class="row items-center no-wrap q-gutter-sm text-white">
            <q-avatar size="30px">
              <img :src="getImage()">
            </q-avatar>
            <div class="column f-12">
              <div>
                DPJP | {{ pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter }}
              </div>
            </div>
          </div>
          <q-menu style="width: 360px;">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="getImage()">
                </q-avatar>

                <div class="f12 q-mt-md q-mb-xs">
                  {{ pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter }}
                </div>
              </div>
              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />
              <div class="column">
                <div class="f-14 text-weight-bold ">
                  Ganti DPJP ?
                </div>
                <q-separator class="q-my-sm" />
                <q-form @submit="gantiDpjp">
                  <q-select
                    v-model="search"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Cari Dpjp"
                    use-input
                    clearable
                    option-value="id"
                    option-label="nama"
                    :options="options"
                    behavior="menu"
                    hide-dropdown-icon
                    @filter="filterOptions"
                  >
                    <!-- @update:model-value="(val)=>$emit('updated', val)" -->
                    <template #prepend>
                      <q-icon name="icon-mat-search" />
                    </template>
                    <template #no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
                          <q-avatar size="60px">
                            <img :src="getImage(scope?.opt?.kelamin,scope.opt)">
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.nama }}</q-item-label>
                          <q-item-label caption>
                            <strong>Nip : </strong> {{ scope.opt.nip }}
                          </q-item-label>
                          <q-item-label caption>
                            <strong>Ruangan : </strong> {{ scope.opt.ruangan? scope.opt.ruangan.namaruang : '-' }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <!-- <q-input
                    label="cari dpjp"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    class="q-my-sm"
                    :rules="[val => !!val || 'Harus diisi']"
                    readonly
                  /> -->
                  <q-separator class="q-my-md" />
                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Simpan"
                    push
                    size="sm"
                    type="submit"
                  />
                </q-form>
              </div>
            </div>
          </q-menu>
        </q-btn>
        <q-badge
          outline
          color="orange"
        >
          {{ pasien?.poli??'---' }}
        </q-badge>
      </div>
    </q-toolbar-title>

    <div>
      <q-btn
        label="selesaikan layanan"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
      />
      <q-btn
        v-close-popup
        dense
        flat
        icon="icon-mat-close"
      >
        <q-tooltip class="bg-white text-primary">
          Close
        </q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const emits = defineEmits(['toggleLeftDrawer'])

const search = ref('')
const options = ref([])
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function gantiDpjp() {
  console.log('ok')
}

function getImage(kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || !row) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val
    }
  }
  // console.log('q :', val)
  const resp = await api.get('/v1/settings/appmenu/cari_pegawai', params)
  console.log('cari', resp)
  update(
    () => (options.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
</script>
