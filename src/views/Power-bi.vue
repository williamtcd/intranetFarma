<script setup lang="ts">
import { ref, onMounted } from 'vue'

const frame = ref()
const loaded = ref(false)

onMounted(() => {
  frame.value.onload = () => {
    console.log(frame.value.contentWindow.document)
  }
})
</script>

<!-- <script super lang="ts">
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
  setup() {

    const key = Date.now();

    const iframeRef = ref();

    const count = ref(0);

    return {
      key,
      iframeRef,
      count
    };
  },

  mounted () {
    // const frame: any = this.$refs.meyiframe
    // frame.value.onload = () => {
    //   console.log('deu certo')
    // }
    // const canvas: any = this.$refs.meyiframe
    // canvas.onload = function() { console.log('eita') }
    // var iframe = document.getElementById("myiframe");
    // console.log(iframe)
    // var doc = canvas
    // console.log(doc)
    // doc.innerHTML = "<p>Hello, World!</p>";

  },
  created () {
    // var iframe = document.getElementById("myiframe");
    var iframe = this.$refs.meyiframe
    console.log(iframe)
  },
  ready () 
    {
      var iframe : any = document.getElementById('myiframe')
      // var style = document.createElement('style')
      // style.textContent =
      //     'body {' +
      //     '  background-color: lime!important;' +
      //     '  color: pink;' +
      //     '}'
      // ;
      // iframe.contentDocument.head.appendChild(style)
      // var myFrame = document.getElementById('myFrame');

      iframe.contentWindow.foo = function(){
            console.log ("Look at me, executed inside an iframe!");
      }
    },
      
  data: () => ({
    despesas: [
      {
        descricao: 'Saco de lixo',
        valor: 20
      }
    ],
    retiradas: [
    ]
  }),

  methods: {
    onMyFrameLoad () {
      console.log('myframe is loaded')
    },
    saveR (data) {
      this.retiradas = this.retiradas.concat(data)
    },
    moment
  }
}

</script> -->
<template>
  <div class="d-flex justify-center">
    <iframe
      ref="frame"
      id="myiframe"
      title="Report Section"
      width="1024"
      height="804"
      src="https://app.powerbi.com/view?r=eyJrIjoiYTk4Zjc1NzUtOTBmNC00NTQyLTk3MjMtNjQxZDkwY2MzNDk4IiwidCI6IjBiZTMzZTBhLWU2NGMtNDE4My04ZDQ1LTBiNmIyMzRkZmI0YiJ9"
      frameborder="0"
      allowFullScreen="true"
    />
  </div>
</template>
