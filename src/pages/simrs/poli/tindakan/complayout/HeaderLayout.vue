<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <q-btn
          color="yellow"
          :label="`DPJP || ${pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter}`"
          dense
          class="q-px-sm"
          outline
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="f12 q-mt-md q-mb-xs">
                  {{ pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter }}
                </div>
              </div>
              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />
              <div class="column">
                <div class="f-14 text-weight-bold ">
                  Ganti DPJP ?
                </div>
                <q-separator class="q-my-sm" />
                <q-form @submit="gantiDpjp">
                  <q-input
                    label="cari dpjp"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    class="q-mb-sm"
                    :rules="[val => !!val || 'Harus diisi']"
                  />
                  <q-separator class="q-my-md" />
                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Simpan"
                    push
                    size="sm"
                    type="submit"
                  />
                </q-form>
              </div>
            </div>
          </q-menu>
        </q-btn>
        <q-badge
          outline
          color="orange"
        >
          {{ pasien?.poli??'---' }}
        </q-badge>
      </div>
    </q-toolbar-title>

    <div>
      <q-btn
        label="selesaikan layanan"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
      />
      <q-btn
        v-close-popup
        dense
        flat
        icon="icon-mat-close"
      >
        <q-tooltip class="bg-white text-primary">
          Close
        </q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup>
const emits = defineEmits(['toggleLeftDrawer'])
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function gantiDpjp() {
  console.log('ok')
}
</script>
