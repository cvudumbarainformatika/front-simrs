<template>
  <div class="q-pa-sm text-weight-bold">
    Edukasi
    <span class="q-ml-sm cursor-pointer text-primary text-weight-light">
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
          hint="Tambah Edukasi"
          :rules="[
            val => scope.validate(val) || 'Harap diisi'
          ]"
          @keyup.enter="setScope(scope)"
        />
      </q-popup-edit>
    </span>
  </div>
  <q-separator />
  <div class="q-pa-sm">
    <div
      v-if="!edukasis?.length"
      class="text-center"
    >
      <em>Data Edukasi Belum Ada</em>
    </div>
    <div v-else>
      <div
        v-for="(row, i) in edukasis"
        :key="row.id"
        class="row"
        style="border-bottom: 1px rgb(226, 224, 224) solid;"
        @click="intervensi = row.nama"
      >
        <div style="width:3%;">
          {{ i + 1 }}
        </div>
        <div style="width:2%">
          -
        </div>
        <div style="width:90%">
          <em class="q-mx-sm cursor-pointer text-blue">{{ row.nama }}
            <q-popup-edit
              v-slot="scope"
              v-model="row.nama"
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
                hint="Edit Edukasi"
                :rules="[
                  val => scope.validate(val) || 'Harap diisi'
                ]"
                @keyup.enter="editIntervensi(scope, row)"
              />
            </q-popup-edit>
          </em>
        </div>
        <div style="width:5%">
          <span> ~~ </span>
          <q-btn
            icon="icon-mat-delete"
            size="6px"
            color="negative"
            round
            flat
            @click="deleteInt(row?.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useMasterDiagnosaKeperawatan } from 'src/stores/simrs/master/poliklinik/diagnosakeperawatan'
import { computed, ref } from 'vue'

const store = useMasterDiagnosaKeperawatan()

const edukasis = computed(() => {
  const arr = store?.diagnosa?.intervensis?.filter(x => x?.group === 'edukasi' && x?.mdiagnosakeperawatan_kode === store?.diagnosa?.kode)
  return arr
})

const $q = useQuasar()

const intervensi = ref('')

function setScope(scope) {
  scope.set()
  // console.log(scope)
  store.saveIntervensi('edukasi', null)
}
function editIntervensi(scope, row) {
  scope.set()
  store.saveIntervensi('edukasi', row)
}

function deleteInt (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.deleteIntervensi(id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
