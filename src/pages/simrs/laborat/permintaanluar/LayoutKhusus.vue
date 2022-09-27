<template>
  <q-page
    class="layout--khusus"
    padding
  >
    <app-title-admin
      title="Permintaan Laborat (Luar )"
      subtitle="Manage Data Permintaan Laborat dari Luar "
      tooltip-add="Form Penerimaan Luar"
      to="/admin/laborat/permintaan-luar"
    />
    <div class="page--laborat">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </q-page>
</template>

<script setup>
</script>
