<script super lang="ts">
import DefaultLayout from '@/layouts/Default-layout.vue'
import AuthLayout from '@/layouts/Auth-layout.vue'
import { useLayoutStore } from './stores/layout'
import api from '@/api/api.js'

export default {
  components: {
    DefaultLayout,
    AuthLayout
  },

  computed: {
    layout() {
      return useLayoutStore()
    }
  },
  async created() {
    console.log('começou')
    console.log(await api.checkStatus())
  }
}
</script>

<template>
  <component :is="layout.showLayout" v-if="layout.showLayout !== ''">
    <RouterView class="fill-height" />
  </component>
</template>

<style scoped></style>
