<template>
  <div class="App">
    <Nav v-if="isAuthenticated"></Nav>
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Footer from '../src/components/Footer.vue'
import { useAsgardeo } from '@asgardeo/vue'
import { computed } from 'vue'

const { state } = useAsgardeo()
const isAuthenticated = computed(() => state.isAuthenticated)
</script>

<style>
@import './assets/index.css';
</style>
