<template>
  <q-list separator>
    <q-separator
      spaced
      inset
    />

    <q-item
      v-for="n in 50"
      :key="n"
    >
      <q-item-section avatar>
        <app-avatar-pasien />
      </q-item-section>
      <q-item-section>
        <q-item-label>Nama Pasien - No.RM</q-item-label>
        <q-item-label>
          NOREG / TANGGAL
        </q-item-label>
        <q-item-label>
          DPJP / RUANGAN
        </q-item-label>
        <q-item-label caption>
          Status Pasien:
        </q-item-label>
      </q-item-section>

      <q-item-section
        side
        top
      >
        <q-item-label caption>
          <div class="row">
            <div>Voted!</div>
            <div class="q-ml-sm">
              <q-badge
                color="teal"
                label="10k"
              />
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator
      spaced
      inset
    />
  </q-list>
</template>

<script setup>
</script>
