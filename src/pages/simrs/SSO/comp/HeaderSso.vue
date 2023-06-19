<template>
  <div class="row justify-between q-pa-md">
    <div class="">
      <div class="row items-center">
        <div>
          <q-avatar size="40px">
            <img src="~assets/logos/logo-rsud.png">
          </q-avatar>
        </div>
        <div class="q-ml-sm text-white">
          <div class="text-h6">
            UOBK RSUD MOHAMAD SALEH
          </div>
          <!-- <div class="text-subtitle">
            KOTA PROBOLINGGO
          </div> -->
        </div>
      </div>
    </div>
    <div class="">
      <div class="row items-center text-white">
        <div
          :key="user"
          class="q-mr-md text-subtitle"
        >
          {{ user? user.nama:'-' }}
        </div>
        <q-avatar
          size="40px"
          class="cursor-pointer bg-grey"
        >
          <img src="~assets/images/actor.svg">
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            :offset="[0,10]"
          >
            <q-list style="min-width: 131px">
              <q-item
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
              </q-item>
              <q-separator />
              <q-item
                v-close-popup
                clickable
                @click="emits('signOut')"
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
          </q-menu>
        </q-avatar>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['signOut'])
defineProps({
  user: {
    type: Object,
    default: null
  }
})
</script>
