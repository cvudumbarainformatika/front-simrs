<template>
  <q-menu
    transition-show="flip-left"
    transition-hide="flip-right"
    :offset="[0,10]"
  >
    <q-card style="width: 250px;">
      <img :src="photo">
      <q-card-section class="bg-grey-2">
        <div class="row wrap items-center">
          <div class="col f-20">
            {{ user? user?.nama:'-' }}
          </div>
        </div>
      </q-card-section>
      <q-list>
        <!-- <q-item
          v-close-popup
          clickable
        >
          <q-item-section avatar>
            <q-icon
              name="icon-mat-account_circle"
              size="16px"
            />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item
          v-close-popup
          clickable
        >
          <q-item-section avatar>
            <q-icon
              name="icon-mat-settings"
              size="16px"
            />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item> -->
        <q-separator />
        <q-item
          v-close-popup
          clickable
          @click="signOut"
        >
          <q-item-section avatar>
            <q-icon
              name="icon-mat-exit_to_app"
              size="16px"
            />
          </q-item-section>
          <q-item-section>Logout </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-menu>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'

const store = useAuthStore()

defineProps({
  user: {
    type: Object,
    default: null
  },
  photo: {
    type: String,
    default: null
  }
})

function signOut () {
  store.logout()
}
</script>
