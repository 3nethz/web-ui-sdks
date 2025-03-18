<template>
  <div class="app-section">
    <header class="app-header-sub-section">
      <div>
        <h1>External API</h1>
        <p class="p-description justified-text max-width">
          Invoke an external API and retrieve the resulting response.
        </p>
      </div>
    </header>
    <APICall />
  </div>
</template>

<script setup>
import APICall from '../components/APICall.vue'
</script>
