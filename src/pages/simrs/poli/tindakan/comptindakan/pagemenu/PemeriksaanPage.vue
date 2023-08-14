<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="absolute left-menu">
        <q-list
          padding
          class="rounded-borders text-primary"
        >
          <q-item
            v-for="n in 10"
            :key="n"
            v-ripple
            clickable
            active-class="my-menu-link"
            :active="n===active"
          >
            <q-item-section avatar>
              <div class="column flex-center items-center text-white">
                <q-icon
                  name="icon-mat-history"
                  size="lg"
                />
                <div>Inbox</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(1)
</script>
<style lang="scss" scoped>
.left-menu{
  background-color: rgba($color: $primary, $alpha: 0.8);
  width:70px;
  // height: calc(100% - 30px) !important;
  height:100%;
}
.my-menu-link{
  color: white;
  background: linear-gradient(90deg, rgb(255, 171, 45) 0%, rgba(255, 145, 0, 0.076) 100%);
  // background: #F2C037;
}

</style>
