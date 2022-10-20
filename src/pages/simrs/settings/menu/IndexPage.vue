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
        @click="addMenu"
      />
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-md-4">
        <q-list bordered>
          <q-item
            v-for="contact in contacts"
            :key="contact.id"
            v-ripple
            class="q-my-sm"
            clickable
            :active="link === contact.id"
            active-class="my-menu-link"
            @click="link = contact.id"
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
              >
                {{ contact.letter }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label
                caption
                lines="1"
              >
                {{ contact.email }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-md-8">
        w
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contacts = ref(
  [{
    id: 1,
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R'
  }, {
    id: 2,
    name: 'Mallorie Alessandrini',
    email: 'malessandrini1@marketwatch.com',
    letter: 'M'
  }, {
    id: 3,
    name: 'Elisabetta Wicklen',
    email: 'ewicklen2@microsoft.com',
    letter: 'E'
  }, {
    id: 4,
    name: 'Seka Fawdrey',
    email: 'sfawdrey3@wired.com',
    letter: 'S'
  }]
)

const link = ref(1)
function addMenu() {
  console.log('menu')
}
</script>

<style lang="scss" scoped>
.pad-xxxl {
  padding-left:15%;
  padding-right:15%;
}

.my-menu-link{
  color: white;
  background: #F2C037;
}
</style>
