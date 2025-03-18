<template>
  <div class="app-section">
    <header class="app-header-sub-section">
      <h1>Settings</h1>
      <p class="p-description">Manage the theme related settings of the application.</p>
    </header>
    <div class="container-center">
      <form id="form" @submit.prevent="updateTheme">
        <div class="table-container">
          <table class="one-column-table">
            <tbody>
              <tr>
                <td>
                  <div class="card-container justify-center">
                    <img alt="info-icon" :src="INFO_ICON" class="small-icon" />
                    <p class="p-description justified-text">
                      Customize the theme color of the application user interfaces by switching
                      between the following buttons.
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="row">
                    <div class="column">
                      <div class="card theme-card-height">
                        <div class="card-container-theme">
                          <div class="row">
                            <input
                              type="radio"
                              id="blueTheme"
                              value="blueTheme"
                              name="theme"
                              v-model="selectedTheme"
                            />
                            <label for="blue"> Blue color theme </label>
                          </div>
                          <img class="theme-image" alt="blue-theme" :src="BLUE_THEME" />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="card theme-card-height">
                        <div class="card-container-theme">
                          <div class="row">
                            <input
                              type="radio"
                              id="orangeTheme"
                              value="orangeTheme"
                              name="theme"
                              v-model="selectedTheme"
                            />
                            <label for="orange"> Orange color theme </label>
                          </div>
                          <img class="theme-image" alt="orange-theme" :src="ORANGE_THEME" />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit" class="btn btn-margin-top">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BLUE_THEME from '../images/blue-theme.png'
import ORANGE_THEME from '../images/orange-theme.png'
import INFO_ICON from '../images/info.png'

const selectedTheme = ref('orangeTheme') // Default theme

// Get the root element
const r = document.documentElement

// Set default theme on mount
onMounted(() => {
  updateThemeColor(selectedTheme.value)
})

// Update the theme color.
const updateTheme = () => {
  updateThemeColor(selectedTheme.value)
}

const updateThemeColor = (theme) => {
  if (theme === 'blueTheme') {
    r.style.setProperty('--primary', '#1591EB')
  } else {
    r.style.setProperty('--primary', '#FF7300')
  }
}
</script>
