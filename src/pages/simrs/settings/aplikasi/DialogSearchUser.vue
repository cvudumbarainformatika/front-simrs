<template>
  <q-dialog
    persistent
    position="top"
    class="q-mt-lg"
  >
    <q-card
      dark
      style="min-width:360px"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Cari Data Pegawai
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-clear"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section>
        <q-select
          v-model="search"
          dark
          dense
          outlined
          label="Cari Data"
          use-input
          clearable
          option-value="id"
          option-label="nama"
          :options="options"
          behavior="menu"
          hide-dropdown-icon
          @filter="filterOptions"
          @update:model-value="(val)=>$emit('updated', val)"
        >
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
                  <img :src="getImage(scope.opt)">
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
// import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { ref } from 'vue'

defineEmits(['updated'])

const search = ref('')
const options = ref(null)

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
