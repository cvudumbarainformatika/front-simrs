<template>
  <div v-if="store.loading">
    <app-loading />
  </div>
  <div v-if="!store.filteredItems?.length && !store.loading">
    <app-no-data />
  </div>
  <div v-if="store.filteredItems?.length && !store.loading">
    <q-list separator>
      <q-item
        v-for="(item, i) in store.filteredItems"
        :key="i"
        clickable
        @click="openForm(item)"
      >
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">{{ item?.nama }}</span> | <span class="text-primary ">{{ item?.noKartu }}</span>
          </q-item-label>
          <q-item-label>
            <span class="">{{ item?.noSuratKontrol }}</span> | <span class="text-secondary ">{{ item?.namaJnsKontrol }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-grey">{{ item?.jnsPelayanan }}</span> | <span class="text-primary ">{{ item?.namaPoliTujuan }}</span>
          </q-item-label>
          <q-item-label>
            <span class="">{{ dateFullFormat( item?.tglRencanaKontrol) }}</span> | <span class="text-cyan ">{{ item?.namaDokter }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import { useSuratKontrolPoliStore } from 'src/stores/simrs/pelayanan/poli/suratkontrol'
import { dateFullFormat } from 'src/modules/formatter'
import { notifCenterVue } from 'src/modules/utils'

const store = useSuratKontrolPoliStore()
function openForm(val) {
  console.log(val)
  if (val.namaJnsKontrol !== 'Surat Kontrol') return notifCenterVue('Mohon Maaf, Untuk sementara yang bisa di edit hanya surat Kontrol')
  store.setForm('noSuratKontrol', val.noSuratKontrol)
  store.setForm('noSepAsalKontrol', val.noSepAsalKontrol)
  store.setForm('kodeDokter', parseInt(val.kodeDokter))
  store.setForm('poliTujuan', val.poliTujuan)
  store.setOpen()
  store.getjadwalDokterDpjp()
}
</script>
