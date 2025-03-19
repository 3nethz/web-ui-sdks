<template>
  <div class="app-section">
    <header class="app-header-sub-section">
      <div class="centered-content">
        <h1 class="center-text">External API</h1>
        <p class="p-description center-text max-width">
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

<style scoped>
.app-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.app-header-sub-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.centered-content {
  text-align: center;
  width: 100%;
}

.center-text {
  text-align: center;
}

.p-description {
  margin: 0 auto;
}

.max-width {
  max-width: 600px;
}
</style>
