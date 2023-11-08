<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        :full="style.componentfull"
        @fullscreen="style.setComponentFull"
        @refresh="store.getData"
      />
    </div>
    <div class="footer absolute-bottom bg-primary text-white z-top">
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      class="my-flex-1 scroll"
    >
      <ListSuratKontrol />
    </q-card>
    <app-dialog-form
      v-model="store.isOpen"
      title="Edit Surat Kontrol"
      @save-form="save"
    >
      <template #default>
        <div class="full-width">
          <app-input-date
            :model="store.form.tglrencanakontrol"
            outlined
            label="Tanggal Rencana Kontrol"
            :loading="store.loading"
            :disable="store.loading"
            @set-model="store.setForm('tglrencanakontrol', $event)"
          />
        </div>
      </template>
    </app-dialog-form>
  </q-page>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { useSuratKontrolPoliStore } from 'src/stores/simrs/pelayanan/poli/suratkontrol'
import HeaderComp from './comp/HeaderComp.vue'
import BottomComp from './comp/BottomComp.vue'
import ListSuratKontrol from './comp/ListSuratKontrol.vue'

const style = useStyledStore()
const store = useSuratKontrolPoliStore()

store.getData()
function save() {
  console.log(store.form)
  store.simpanEdit()
}
</script>
