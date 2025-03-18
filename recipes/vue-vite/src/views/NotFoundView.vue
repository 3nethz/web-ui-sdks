<template>
  <div>
    <h3>404: Page not found</h3>
    <button class="btn primary" @click="goToHome">Go back to home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>
