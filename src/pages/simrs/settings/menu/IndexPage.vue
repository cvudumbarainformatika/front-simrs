<template>
  <div class="pad-xxxl q-py-lg">
    <div class="text-h6  q-py-lg">
      Settings Menu
    </div>
    <q-separator class="q-my-lg" />
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
        <q-list bordered>
          <q-item
            v-for="menu in store.items"
            :key="menu.id"
            v-ripple
            class="q-my-sm"
            clickable
            :active="link === menu.id"
            active-class="my-menu-link"
            @click="link = menu.id"
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
          </q-item>
        </q-list>
      </div>
      <div class="col-md-8">
        <submenu-lists
          :menu="link"
          :items="store.items"
        />
      </div>
    </div>

    <!-- q-dialog -->
    <app-dialog-form
      v-model="store.dialog"
      title="Form Tambah Menu"
      :loading="store.loading"
      @save-form="store.saveForm"
    >
      <app-input
        v-model="store.form.nama"
        label="Menu"
        outlined
      />
    </app-dialog-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTableMenu } from 'src/stores/simrs/settings/menu/table'
import SubmenuLists from './SubmenuLists.vue'

const link = ref(1)

const store = useTableMenu()

onMounted(() => {
  store.getData()
})

// function saveForm() {
//   console.log('form derih dialog')
// }
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
