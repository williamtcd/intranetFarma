<script super lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import NovoCliente from '@/components/receita-digital/novo-cliente.vue'
import NovaReceita from '@/components/receita-digital/nova-receita.vue'
import ExibeCliente from '@/components/receita-digital/exibe-cliente.vue'
import { reactive, readonly, ref, onMounted } from 'vue'
import api from '@/api/api.js'

export default {
  components: {
    VDataTable,
    NovoCliente,
    NovaReceita,
    ExibeCliente
  },
  setup() {
    const expanded = reactive([])
    const search = ref('')
    let exibirCliente: any = ref(false)
    let userId = ref('')
    let lista: any = ref([{}])

    const desserts = reactive([
      {
        name: 'Frozen Yogurt',
        cpf: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: 1
      },
      {
        name: 'Ice cream sandwich',
        cpf: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: 1
      },
      {
        name: 'Eclair',
        cpf: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: 7
      },
      {
        name: 'Cupcake',
        cpf: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: 8
      },
      {
        name: 'Gingerbread',
        cpf: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: 16
      },
      {
        name: 'Jelly bean',
        cpf: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: 0
      },
      {
        name: 'Lollipop',
        cpf: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: 2
      },
      {
        name: 'Honeycomb',
        cpf: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: 45
      },
      {
        name: 'Donut',
        cpf: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: 22
      },
      {
        name: 'KitKat',
        cpf: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: 6
      }
    ])
    const headers: any = readonly([
      {
        title: 'Nome',
        align: 'start',
        key: 'nome'
      },
      {
        title: 'CPF',
        align: 'start',
        key: 'cpf'
      },
      { title: '',
        align: 'end', key: 'actions', sortable: false },
    ])
    async function getList () {
      console.log('obtem a lista')
      lista.value = await api.listaClientes()
    }
    async function getUser (idCliente) {
      console.log('obtem usuario')
      const data = await api.exibeCliente(idCliente)
      console.log(data)
    }
    async function consoles (data) {
      console.log(data)
    }
    async function defineUser (data) {
      // console.log(data)
      userId.value = data
      // console.log(userId)
      exibirCliente.value = true
    }
    async function getReceitas (idCliente) {
      console.log('obtem receitas')
      const data = await api.exibeReceita(idCliente)
      console.log(data)
    }
    async function cadReceita (data, idCliente) {
      console.log('cadastra receita')
      data = {
        idCliente: idCliente,
        ...data
      }
      await api.cadatraReceita(data)
    }
    return { headers, desserts, expanded, search, getList, lista, getUser, cadReceita, getReceitas, consoles, userId, defineUser, exibirCliente }
  },

  mounted() {
    this.getList()
  }
}
</script>
<template>
  <div class="d-flex justify-center">
    <div class="flex-1-1-100 mt-5" style="max-width: 900px">
      <ExibeCliente
        :show="exibirCliente"
        :user="userId"
        @close="exibirCliente = false"
      />
      <v-card color="white" flat min-height="200px" rounded="2">
        <v-toolbar color="#1E88E5" density="comfortable">
          <v-toolbar-title>
            <span class="font-weight-bold font-italic text-white">Clientes</span>
          </v-toolbar-title>
            <NovoCliente 
              @reload="getList"
            />
        </v-toolbar>
        <v-card-item>
          <v-data-table
            v-model="expanded"
            :items-per-page="5"
            :headers="headers"
            :items="lista"
            :search="search"
            item-value="id"
            no-data-text="nenhum cliente cadastrado"
            class="elevation-1"
          >
            <template v-slot:top>
              <div class="my-5">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Pesquise pelo nome ou cpf do cliente"
                  variant="underlined"
                  density="compact"
                  hide-details
                />
              </div>
            </template>

            
            <!-- <template v-slot:item="props">
              <tr @click="consoles(props.item.raw.id)" style="cursor: pointer;">
                <td>{{ props.item.raw.nome }}</td>
                <td>{{ props.item.raw.cpf }}</td>
              </tr>
          </template> -->
          <template v-slot:item.actions="{ item }">
            <!-- <ExibeCliente
              :user-id="item.raw.id"
            /> -->
            <v-icon
              size="small"
              class="me-2"
              @click="defineUser(item.raw.id)"
            >
              mdi-eye-outline
            </v-icon>
          </template>
            <!-- <template v-slot:expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length">listar receitas de {{ item.raw.nome }}
                  <NovaReceita
                    @novareceita="cadReceita($event, item.raw.id)"
                  />
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="getReceitas(item.raw.id)"
                  >
                    buscar receitas
                  </v-btn>
                </td>
              </tr>
            </template> -->
          </v-data-table>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>
