<script setup lang="ts">
import Appbar from '@/components/home/Appbar.vue'
</script>

<template>
  <v-layout>
    <Appbar />
    <v-main style="background-color: #dee2e6" class="pb-10">
      <slot />
    </v-main>
  </v-layout>
</template>
