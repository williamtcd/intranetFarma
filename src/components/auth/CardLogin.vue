<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api/api.js'

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEyeOutline } from '@mdi/js'
import { mdiEyeOffOutline } from '@mdi/js'

export default defineComponent({
  name: 'CardLogin',
  components: {
    SvgIcon
  },
  data: () => ({
    eye: mdiEyeOutline,
    eyeOff: mdiEyeOffOutline,
    showPass: false,
    login: '',
    senha: '',
    loading: false,
    emailRules: [
      (value: string) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'informe um e-mail válido'
      }
    ],
    passwordRules: [
      (value: string) => {
        if (value?.length >= 6) return true
        return 'senha deve conter pelo menos 6 caracteres'
      }
    ],
    errorEmail: false,
    errorPassword: false
  }),
  methods: {
    async requestlogin() {
      this.errorEmail = false
      this.errorPassword = false
      this.loading = true
      try {
        await api.login(this.login, this.senha)
        this.$router.push({ name: 'home' })
      } catch (e: any) {
        switch (e.code) {
          case 'auth/user-not-found':
            this.errorEmail = true
            break
          case 'auth/wrong-password':
            this.errorPassword = true
            break
          default:
            this.errorEmail = true
            this.errorPassword = true
            break
        }
        this.loading = false
      }
      this.loading = false
    }
  }
})
</script>

<template>
  <v-card class="px-6 pb-8 pt-2" width="300">
    <div class="mb-5 mt-5" style="max-width: 250px">
      <img src="@/assets/nr-logo.webp" style="max-width: 100%" />
    </div>
    <v-form @submit.prevent>
      <v-text-field
        v-model="login"
        label="E-mail"
        variant="underlined"
        :rules="emailRules"
        :error-messages="errorEmail ? 'E-mail inválido' : ''"
        :disabled="loading"
        @input="errorEmail = false"
      />
      <v-text-field
        v-model="senha"
        class="mb-5"
        label="Senha"
        variant="underlined"
        :type="showPass ? 'text' : 'password'"
        :rules="passwordRules"
        :error-messages="errorPassword ? 'Senha inválida' : ''"
        :disabled="loading"
        @input="errorPassword = false"
        @keydown.enter="requestlogin"
      >
        <template v-slot:append-inner>
          <svg-icon
            style="cursor: pointer"
            type="mdi"
            :path="showPass ? eye : eyeOff"
            @click="showPass = !showPass"
          />
        </template>
      </v-text-field>
      <v-btn block class="mt-2 text-white" color="#00AFF0" :loading="loading" @click="requestlogin">
        <span class="font-weight-medium"> Login </span>
      </v-btn>
    </v-form>
  </v-card>
</template>

<style scoped></style>
