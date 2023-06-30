<template>
  <div>
    <app-loading v-if="loading" />
    <div v-else>
      <div v-if="items.length <= 0">
        <div
          class="column flex-center"
          style="min-height:40vh"
        >
          <div class="text-h3">
            👨🏽‍🍼
          </div>
          <div class="f-14">
            Belum Ada Data
          </div>
        </div>
      </div>
      <q-list
        v-else
        separator
      >
        <q-separator
          spaced
          inset
        />

        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item.masterpasien"
              width="50px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ item.masterpasien.nama }} | <span class="text-primary">{{ item.rs2 }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-negative">DPJP : {{ item.dokter.dokter }}</span> | <span class="text-teal"> RUANGAN : {{ item.relmpoli.namapoli }}</span>
            </q-item-label>
            <q-item-label caption>
              <span class="text-weight-bold">USIA : {{ item.masterpasien.usia }}</span>  | Kelamin : {{ item.masterpasien.kelamin }}
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
    </div>
  </div>
</template>

<script setup>

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})
</script>
