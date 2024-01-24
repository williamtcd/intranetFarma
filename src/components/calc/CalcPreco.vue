<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlus } from '@mdi/js'
import { mdiMinus } from '@mdi/js'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineComponent({
  name: 'Calculadora',
  components: {
    SvgIcon,
    VDataTable
  },
  data: () => ({
    plus: mdiPlus,
    minus: mdiMinus,
    percent: 0,
    parameters: {
      custo: 3,
      venda: 6,
      imposto: 6,
      desconto: 40,
      margemp2l3: 50,
      margemp3l4: 100,
      levemaispormenos: 30
    },
    rules: {
      required: (value) => !!value || 'não pode ficar sem valor'
    },
    resultado: [
      {
        name: 'Custo real',
        prefix: 'R$',
        sufix: '',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'Valor da venda',
        prefix: 'R$',
        sufix: '',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'Margem unidade',
        prefix: '',
        sufix: '%',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'MarkUp unidade',
        prefix: '',
        sufix: '%',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'Lucro unidade',
        prefix: 'R$',
        sufix: '',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'Margem leve + por -',
        prefix: '',
        sufix: '%',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'MarkUp leve + por -',
        prefix: '',
        sufix: '%',
        value: 0,
        valueTwo: 0
      },
      {
        name: 'Lucro leve + por -',
        prefix: 'R$',
        sufix: '',
        value: 0,
        valueTwo: 0
      }
    ],
    decisao: [
      {
        name: 'Lucro percentual',
        value: '',
        valueTwo: ''
      },
      {
        name: 'Resultado',
        value: '',
        valueTwo: ''
      }
    ]
  }),
  async created() {
    this.calc()
  },
  methods: {
    calc() {
      this.calculoLeveTresPagueDois()
      this.calculoLeveQuatroPagueTres()
    },
    calculoLeveTresPagueDois() {
      const leve = 3
      const pague = 2
      const custo = this.parameters.custo
      const venda = this.parameters.venda
      const margemLeveMaisPorMenos = this.parameters.margemp2l3

      const custoReal = this.parameters.custo * leve
      const valorVenda = this.parameters.venda * pague

      this.resultado[0].value = custoReal
      this.resultado[1].value = valorVenda

      const margemUnidade = Math.round((1 - this.parameters.custo / this.parameters.venda) * 100)
      this.resultado[2].value = margemUnidade

      const markupUnidade = venda / custo - 1
      this.resultado[3].value = Math.round(markupUnidade * 100)

      const imposto = this.parameters.imposto
      const impostoPercentual = (imposto / 100).toFixed(2)
      const lucroUnidade = venda - custo - venda * Number(impostoPercentual)
      this.resultado[4].value = Number(lucroUnidade.toFixed(2))

      const margemLeveMais = 1 - custoReal / valorVenda
      const margemLeveMaisPerc = margemLeveMais * 100
      this.resultado[5].value = Math.round(margemLeveMaisPerc)

      const markUpLeveMaisPorMenos = Math.round((valorVenda / custoReal - 1) * 100)
      this.resultado[6].value = markUpLeveMaisPorMenos

      const lucroLeveMaisPorMenos = valorVenda - custoReal - valorVenda * Number(impostoPercentual)
      this.resultado[7].value = Number(lucroLeveMaisPorMenos.toFixed(2))

      const decisaoPerc = (lucroLeveMaisPorMenos / lucroUnidade - 1) * 100
      if (lucroUnidade < 0) {
        this.decisao[0].value = 'Lucro Negativo'
      } else {
        this.decisao[0].value = Math.round(decisaoPerc) + `%`
      }

      const margemPg2Lv3 = (margemLeveMaisPorMenos * 100).toFixed(2)

      if (this.decisao[0].value === 'Lucro Negativo' || this.decisao[0].value < margemPg2Lv3) {
        this.decisao[1].value = 'Não'
      } else {
        this.decisao[1].value = 'Sim'
      }
    },
    calculoLeveQuatroPagueTres() {
      const leve = 4
      const pague = 3
      const custo = this.parameters.custo
      const venda = this.parameters.venda
      const custoReal = this.parameters.custo * leve
      const margemLeveMaisPorMenos = this.parameters.margemp3l4
      this.resultado[0].valueTwo = custoReal

      const valorVenda = this.parameters.venda * pague
      this.resultado[1].valueTwo = valorVenda

      const margemUnidade = Math.round((1 - this.parameters.custo / this.parameters.venda) * 100)
      this.resultado[2].valueTwo = margemUnidade

      const markupUnidade = venda / custo - 1
      this.resultado[3].valueTwo = Math.round(markupUnidade * 100)

      const imposto = this.parameters.imposto
      const impostoPercentual = (imposto / 100).toFixed(2)
      const lucroUnidade = venda - custo - venda * Number(impostoPercentual)
      this.resultado[4].valueTwo = Number(lucroUnidade.toFixed(2))

      const margemLeveMais = 1 - custoReal / valorVenda
      const margemLeveMaisPerc = margemLeveMais * 100
      this.resultado[5].valueTwo = Math.round(margemLeveMaisPerc)

      const markUpLeveMaisPorMenos = Math.round((valorVenda / custoReal - 1) * 100)
      this.resultado[6].valueTwo = markUpLeveMaisPorMenos

      const lucroLeveMaisPorMenos = valorVenda - custoReal - valorVenda * Number(impostoPercentual)
      this.resultado[7].valueTwo = Number(lucroLeveMaisPorMenos.toFixed(2))

      const decisaoPerc = (lucroLeveMaisPorMenos / lucroUnidade - 1) * 100
      if (lucroUnidade < 0) {
        this.decisao[0].valueTwo = 'Lucro Negativo'
      } else {
        this.decisao[0].valueTwo = Math.round(decisaoPerc) + `%`
      }

      const margemPg2Lv3 = (margemLeveMaisPorMenos * 100).toFixed(2)

      if (
        this.decisao[0].valueTwo === 'Lucro Negativo' ||
        this.decisao[0].valueTwo < margemPg2Lv3
      ) {
        this.decisao[1].valueTwo = 'Não'
      } else {
        this.decisao[1].valueTwo = 'Sim'
      }
    }
  }
})
</script>
<template>
  <div class="d-flex flex-column flex-md-row justify-space-between">
    <div>
      <v-card class="mx-5 my-5" width="240">
        <v-card-item title="Insira os parametros:" />
        <v-card-text class="d-flex justify-center">
          <v-responsive class="pt-2" max-width="230">
            <v-text-field
              v-model="parameters.custo"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Custo"
              prefix="R$"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.venda"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Valor de venda"
              prefix="R$"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.imposto"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Imposto"
              suffix="%"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.desconto"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Desconto 2 unidade"
              suffix="%"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.margemp2l3"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Margem pague 2 leve 3"
              suffix="%"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.margemp3l4"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Margem pague 3 leve 4"
              suffix="%"
              min="0"
              @change="calc"
            />
            <v-text-field
              v-model="parameters.levemaispormenos"
              :rules="[rules.required]"
              type="number"
              variant="underlined"
              density="compact"
              label="Leve mais por menos"
              suffix="%"
              min="0"
              @change="calc"
            />
          </v-responsive>
        </v-card-text>
      </v-card>
    </div>
    <div>
      <v-table class="mt-10" height="500px" width="550px" density="compact">
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Pague 2 Leve 3</th>
            <th class="text-left">Pague 3 Leve 4</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in resultado" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.prefix }}{{ item.value }}{{ item.sufix }}</td>
            <td>{{ item.prefix }}{{ item.valueTwo }}{{ item.sufix }}</td>
          </tr>
          <tr>
            <th class="text-center" colspan="3">Decisão</th>
          </tr>
          <tr>
            <td>{{ decisao[0].name }}</td>
            <td>{{ decisao[0].value }}</td>
            <td>{{ decisao[0].valueTwo }}</td>
          </tr>
          <tr>
            <td>{{ decisao[1].name }}</td>
            <td>
              <v-chip :color="decisao[1].value === 'Não' ? 'red' : 'green'">{{
                decisao[1].value
              }}</v-chip>
            </td>
            <td>
              <v-chip :color="decisao[1].valueTwo === 'Não' ? 'red' : 'green'">{{
                decisao[1].valueTwo
              }}</v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
