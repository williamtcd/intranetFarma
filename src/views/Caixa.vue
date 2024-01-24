<script super lang="ts">
import Despesas from '@/components/caixa/Despesas.vue'
import Retirada from '@/components/caixa/Retirada.vue'
import Pagamentos from '@/components/caixa/Pagamentos.vue'
import moment from 'moment'

export default {
  components: {
    Despesas,
    Retirada,
    Pagamentos
  },
  data: () => ({
    despesas: [
      {
        descricao: 'Saco de lixo',
        valor: 20
      }
    ],
    retiradas: []
  }),

  methods: {
    save(data) {
      this.despesas = this.despesas.concat(data)
    },
    saveR(data) {
      this.retiradas = this.retiradas.concat(data)
    },
    moment
  }
}
</script>
<template>
  <div class="d-flex justify-center">
    <div class="flex-1-1-100 mt-5" style="max-width: 900px">
      <v-card color="white" flat min-height="200px" rounded="2">
        <v-toolbar color="#F5F5F5" dark density="comfortable">
          <v-toolbar-title>
            <span class="font-weight-bold font-italic">Registro de caixa</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-item>
          <div class="d-flex flex-column flex-sm-row">
            <div class="mb-5 mx-1" style="min-width: 335px">
              <Retirada />
            </div>
            <div class="mb-5 mx-1 flex-fill">
              <Despesas />
            </div>
          </div>
          <div class="mb-5 mx-1">
            <Pagamentos />
          </div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>
