<template>
  <div class="column full-height">
    <div class="col-auto">
      <q-bar>
        <q-btn
          flat
          rounded
          padding="xs"
          size="xs"
          icon="icon-mat-close"
          @click="emits('close')"
        />
        <q-space />
        <div>History Pasien</div>
      </q-bar>
    </div>
    <div class="col full-height">
      <div class="col-auto bg-red">
        <!-- <q-tabs
          v-model="store.tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item"
            :label="item"
          />
        </q-tabs> -->
      </div>
    </div>
  </div>
</template>

<script setup>

const emits = defineEmits(['close'])
</script>
