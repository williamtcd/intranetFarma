<script super lang="ts">
import Calculadora from '@/components/calc/CalcPreco.vue'

export default {
  components: {
    Calculadora
  },
  data: () => ({})
}
</script>
<template>
  <div class="d-flex justify-center">
    <div class="flex-1-1-100 mt-5" style="max-width: 900px">
      <v-card color="white" flat min-height="200px" rounded="2">
        <v-toolbar color="#F5F5F5" dark density="comfortable">
          <v-toolbar-title>
            <span class="font-weight-bold font-italic">Calculadora de precificação</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-item>
          <Calculadora />
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>
