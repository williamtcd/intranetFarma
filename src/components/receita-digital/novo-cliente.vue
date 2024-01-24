<script lang="ts">
import api from '@/api/api.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NovoCliente',
  components: {},
  data: () => ({
    dialog: false,
    nome: '',
    cpf: ''
  }),
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    async cadastrar () {
      const data = {
        nome: this.nome,
        cpf: this.cpf
      }
      try {
        await api.cadastraCliente(data)
        // const response = await api.cadastraCliente(data)
        // console.log(response)
        this.$emit('reload')
        this.dialog = false
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>
<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="#B3E5FC"
          v-bind="props"
        >
          <span class="font-weight-bold">Novo Cliente</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="nome"
                  label="Nome completo"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="cpf"
                  label="CPF"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="cadastrar"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
<style></style>
