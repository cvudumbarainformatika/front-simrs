<template>
  <div v-if="editor">
    <q-btn-group rounded>
      <q-btn
        color="primary"
        size="xs"
        rounded
        glossy
        label="Small"
        @click="editor.chain().focus().setSize({ size: 'small' }).run()"
      />
      <q-btn
        size="xs"
        color="primary"
        rounded
        glossy
        label="Medium"
        @click="editor.chain().focus().setSize({ size: 'medium' }).run()"
      />
      <q-btn
        size="xs"
        color="primary"
        rounded
        glossy
        label="Large"
        @click="editor.chain().focus().setSize({ size: 'large' }).run()"
      />
    </q-btn-group>
  </div>
</template>
<script setup>
defineProps({
  editor: {
    type: Object,
    default: null
  }
})
// console.log('bubble-image', props.editor)
</script>
