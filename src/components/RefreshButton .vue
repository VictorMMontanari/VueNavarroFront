<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps(['onRefresh']);

const handleClick = () => {
  // Emitir evento para o componente pai
  props.onRefresh();
};
</script>

<template>
  <div class="d-grid gap-2 d-md-block" style="padding-top: 10px;">
    <button class="btn d-flex justify-content-center align-items-center" type="button" @click="handleClick">
      <i class="material-symbols-outlined" style="font-size: 2rem; color: white;">refresh</i>
    </button>
  </div>
</template>
