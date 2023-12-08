<template>
  <div>
    <div style="margin-bottom: 100px;">
      <q-list
        square
        separator
      >
        <q-item
          v-for="n in 100"
          :key="n"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-avatar
              rounded
              color="purple"
              text-color="white"
              icon="icon-mat-close"
            />
          </q-item-section>

          <q-item-section>Rounded avatar-type icon</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>

</script>
