<template>
  <div class="pad-xxxl q-py-lg">
    <div class="text-h6  q-py-md">
      Settings Menu
    </div>
    <q-separator class="q-my-md" />
    <div class="q-py-md">
      <q-btn
        round
        color="primary"
        icon="icon-mat-add"
        size="sm"
        @click="store.addNew"
      />
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-md-4">
        <q-list
          v-if="store.items.length === 0"
          bordered
          class="bg-white"
          padding
        >
          <q-item class="q-pa-lg">
            <div
              class="column"
            >
              Belum Ada Data
            </div>
          </q-item>
        </q-list>
        <q-list
          v-else
          bordered
          class="bg-white"
          separator
        >
          <q-item
            v-for="(menu, i) in store.items"
            :key="i"
            v-ripple
            class="q-my-sm"
            clickable
            :active="link === i"
            active-class="my-menu-link"
            @click="link = i"
          >
            <q-item-section avatar>
              <q-avatar
                color="secondary"
                text-color="white"
              >
                {{ menu.nama.charAt(0) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ menu.nama }}</q-item-label>
              <q-item-label
                class="f-10"
                lines="1"
              >
                description
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div>
                <q-btn
                  flat
                  size="sm"
                  padding="xs"
                  round
                  icon="icon-mat-edit"
                  color="grey"
                  @click="store.editData(menu)"
                />
                <q-btn
                  flat
                  size="sm"
                  padding="xs"
                  round
                  icon="icon-mat-delete_sweep"
                  color="negative"
                  :loading="store.loading && link === i"
                  @click="deleteData(menu.id)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-md-8">
        <submenu-lists
          :menu="link"
          :items="store.items"
          @add-submenu="(val) => store.addNewSub(val)"
          @edit-submenu="val => cobaEditSubmenu(val)"
        />
      </div>
    </div>

    <!-- q-dialog -->
    <app-dialog-form
      v-model="store.dialog"
      title="Form Tambah Menu"
      :loading="store.loading"
      @save-form="saveForm"
    >
      <app-input
        ref="refNama"
        v-model="store.form.nama"
        label="Menu"
        outlined
      />
    </app-dialog-form>
    <!-- q-dialog sub -->
    <app-dialog-form
      v-model="store.dialogSub"
      title="Form Tambah SubMenu"
      :loading="store.loading"
      @save-form="saveSubForm"
    >
      <app-input
        ref="refNamaSub"
        v-model="store.subForm.nama"
        label="Nama Submenu"
        class="q-mb-sm"
        outlined
      />
      <app-input
        ref="refIcon"
        v-model="store.subForm.icon"
        label="Icon"
        outlined
      />
    </app-dialog-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTableMenu } from 'src/stores/simrs/settings/menu/table'
import SubmenuLists from './SubmenuLists.vue'
import { useQuasar } from 'quasar'
import AppDialogAlert from 'src/components/~global/AppDialogAlert.vue'

const link = ref(0)

const store = useTableMenu()
const $q = useQuasar()

onMounted(() => {
  store.getData()
})

const refNama = ref(null)
const refNamaSub = ref(null)
const refIcon = ref(null)
function saveForm() {
  store.saveForm().then(resp => {
    refNama.value.refInput.resetValidation()
    // console.log(refNama.value.refInput)
  })
}
function saveSubForm() {
  store.saveSubForm().then(resp => {
    refNamaSub.value.refInput.resetValidation()
    refIcon.value.refInput.resetValidation()
    // console.log(refNama.value.refInput)
  })
}

function deleteData(id) {
  $q.dialog({
    component: AppDialogAlert,

    // props forwarded to your custom component
    componentProps: {
      msg: 'Apakah Menu ini akan dihapus?',
      color: 'negative'
    }
  }).onOk(() => {
    store.deleteData(id).then(resp => {
      link.value = 0
    })
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

function cobaEditSubmenu(params) {
  console.log(params)
}

</script>

<style lang="scss" scoped>
.pad-xxxl {
  padding-left:15%;
  padding-right:15%;
}

.my-menu-link{
  color: white;
  background: $primary;
}
</style>
