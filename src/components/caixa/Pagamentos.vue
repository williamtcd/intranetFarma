<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete } from '@mdi/js'
import { mdiPlus } from '@mdi/js'
import { mdiMinus } from '@mdi/js'
import moment from 'moment'

export default defineComponent({
  name: 'Pagamentos',
  components: {
    SvgIcon
  },
  data: () => ({
    iconTrash: mdiDelete,
    iconAdd: mdiPlus,
    iconMinus: mdiMinus,
    panel: [0],
    valor: null,
    itemselected: '',
    retiradas: [
      {
        valor: null,
        dataehora: null
      }
    ],
    pagamentos: [
      {
        name: 'Rede crédito',
        values: [111.22, 2, 4]
      },
      {
        name: 'Rede débito',
        values: [215.81, 31]
      },
      {
        name: 'Bin crédito',
        values: [1, 6]
      },
      {
        name: 'Bin débito',
        values: []
      },
      {
        name: 'Cielo crédito',
        values: []
      },
      {
        name: 'Cielo débito',
        values: []
      },
      {
        name: 'Pix',
        values: []
      },
      {
        name: 'PicPay',
        values: []
      },
      {
        name: 'Funcional',
        values: []
      },
      {
        name: 'Cheque',
        values: []
      },
      {
        name: 'Fármacia Popular',
        values: []
      },
      {
        name: 'Recarga',
        values: []
      }
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159
      },
      {
        name: 'Ice cream sandwich',
        calories: 237
      },
      {
        name: 'Eclair',
        calories: 262
      },
      {
        name: 'Cupcake',
        calories: 305
      },
      {
        name: 'Gingerbread',
        calories: 356
      },
      {
        name: 'Jelly bean',
        calories: 375
      },
      {
        name: 'Lollipop',
        calories: 392
      },
      {
        name: 'Honeycomb',
        calories: 408
      },
      {
        name: 'Donut',
        calories: 452
      },
      {
        name: 'KitKat',
        calories: 518
      }
    ]
  }),

  computed: {
    items() {
      const items = this.pagamentos.map((item) => item.name)
      this.itemselected = items[0]
      return items
    }
  },
  watch: {},
  created() {},
  methods: {
    moment,
    addRetirada() {
      const retirada = {
        valor: null,
        dataehora: null
      }
      this.retiradas.push(retirada)
    },
    apagaRetirada(item, index) {
      const removeIndex = this.pagamentos.findIndex((element) => element.name === item.name)
      this.pagamentos[removeIndex].values.splice(index, 1)
    },
    addPagamento(valor) {
      const index = this.pagamentos.findIndex((item) => item.name === this.itemselected)
      this.pagamentos[index].values.push(valor)
      this.valor = null
    }
  }
})
</script>
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title color="blue-darken-2">
        <template v-slot:actions="{ expanded }">
          <svg-icon type="mdi" :path="expanded ? iconMinus : iconAdd" />
        </template>
        <span class="text-h6">Cartões</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="d-flex flex-row justify-end align-center">
          <v-select
            v-model="itemselected"
            :items="items"
            variant="underlined"
            single-line
            hide-details
            style="max-width: 200px; min-width: 150px"
            density="compact"
          />
          <v-text-field
            v-model="valor"
            type="number"
            variant="underlined"
            density="compact"
            :disabled="itemselected === '' ? true : false"
            style="max-width: 200px; min-width: 100px"
            single-line
            hide-details
          >
            <template v-slot:prepend> R$ </template>
          </v-text-field>
          <v-btn icon size="x-small" class="ml-2" @click="addPagamento(valor)">
            <svg-icon type="mdi" :path="iconAdd" />
          </v-btn>
        </div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left" v-for="item in pagamentos" :key="item.name">
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="item in pagamentos" :key="item.name" style="vertical-align: top">
                <v-list density="compact">
                  <v-list-item
                    v-for="(it, index) in item.values"
                    :key="index"
                    style="width: 120px; padding: 0px"
                  >
                    R$ {{ it }}
                    <v-btn
                      variant="text"
                      icon
                      size="x-small"
                      class="align-self-end"
                      @click="apagaRetirada(item, index)"
                    >
                      <svg-icon type="mdi" :path="iconTrash" />
                    </v-btn>
                  </v-list-item>
                </v-list>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
