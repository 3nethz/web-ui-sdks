<template>
  <div class="container-center">
    <div class="card-container">
      <img alt="vue-logo" :src="INFO_ICON" class="small-icon" />
      <p class="p-description max-width">{{ message }}</p>
    </div>
    <div class="table-container">
      <button class="btn btn-margin-top" @click="handleApiCall">Invoke API</button>
      <br />
      <h3>Output</h3>
      <pre id="contentToCopy">
          {{ JSON.stringify(userInfo, null, 2) }}
        </pre
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getExternalApi } from '../api/external-api'
import INFO_ICON from '../images/info.png'

const userInfo = ref(null)
const message =
  'Initiate a request to an external API and retrieve the response by clicking on the button below. ' +
  'This involves communicating with an external server through a ' +
  'designated API.'

const handleApiCall = async () => {
  try {
    const response = await getExternalApi()
    userInfo.value = response
  } catch (error) {
    console.error('Error calling API:', error)
  }
}
</script>
