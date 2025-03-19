<template>
  <div class="container-center">
    <div class="card-container">
      <img alt="vue-logo" :src="INFO_ICON" class="small-icon" />
      <p class="p-description center-text max-width">{{ message }}</p>
    </div>
    <div class="table-container">
      <button class="btn btn-margin-top" @click="handleApiCall">Invoke API</button>
      <br />
      <h3 class="center-text">Output</h3>
      <div class="output-container">
        <pre id="contentToCopy" class="output-box">{{ JSON.stringify(userInfo, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style>
.container-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: sans-serif;
  padding: 20px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  width: 100%;
}

.p-description {
  text-align: center;
  margin: 0 auto;
}

.max-width {
  max-width: 600px;
}

.table-container {
  text-align: center;
  font-family: sans-serif;
  width: 100%;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-margin-top {
  margin-top: 10px;
}

.center-text {
  text-align: center;
}

.output-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.output-box {
  text-align: center;
  margin: 10px 0;
  white-space: pre-wrap;
  overflow-x: auto;
  display: inline-block;
}

.small-icon {
  margin-bottom: 10px;
}
</style>

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
