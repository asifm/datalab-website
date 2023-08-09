<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
    <div class="imageFrame" :style="{backgroundImage:`url('${src}')`}">
    </div>
</template>


<style>
.imageFrame {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 45vh;
}
</style>


