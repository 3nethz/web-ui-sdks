<template>
  <div class="navbar-section">
    <div class="navbar">
      <div class="left-panel">
        <div @click="navigate(routesConfig.home)">
          <img alt="react-logo" :src="ASGARDEO_LOGO" class="asgardeo-logo-image-small" />
        </div>
      </div>
      <div class="center-panel" id="center-panel">
        <a href="#/" class="nav active" id="home" @click.prevent="routeHomeChange">Home</a>
        <a
          v-if="state.isAuthenticated"
          href="#/"
          class="nav"
          id="resource"
          @click.prevent="routeResourcesChange"
          >API Call</a
        >
        <a
          v-if="isResourcesAllowed && state.isAuthenticated"
          href="#/"
          class="nav"
          id="setting"
          @click.prevent="routeSettingsChange"
          >Settings</a
        >
      </div>
      <div class="right-panel">
        <a href="#/" @click.prevent="routeProfileChange">{{
          state.displayName ?? state.username
        }}</a>
        <div class="avatar-dropdown">
          <div class="avatar">
            <img alt="react-logo" :src="USER_LOGO" class="link-logo-image-small logo" />
            <span class="arrow small">&#9660;</span>
          </div>
          <ul class="dropdown-menu">
            <li>
              <a href="#/" class="nav" id="profile" @click.prevent="routeProfileChange">Profile</a>
            </li>
            <li><a href="#/" @click.prevent="signOut">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ASGARDEO_LOGO from '../images/asgardeo-logo.svg'
import USER_LOGO from '../images/user.png'
import { useAsgardeo } from '@asgardeo/vue'

const router = useRouter()
const route = useRoute()
const { state, signOut, getDecodedIDToken } = useAsgardeo()

const isResourcesAllowed = ref(false)
const isAuthenticated = computed(() => state.isAuthenticated)
const displayName = computed(() => state.displayName)
const username = computed(() => state.username)

// Route to profile page.
const routeProfileChange = () => {
  router.push({ name: 'Profile' })
}

// Route to API Call page.
const routeResourcesChange = () => {
  router.push({ name: 'Resources' })
}

// Route to settings page.
const routeSettingsChange = () => {
  router.push({ name: 'Settings' })
}

// Route to home page.
const routeHomeChange = () => {
  router.push({ name: 'Home' })
}

// Filter the display of API Call section based on the application role.
onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      const decodedIdToken = await getDecodedIDToken()
      if (decodedIdToken?.application_roles === 'React-App-Manager') {
        isResourcesAllowed.value = true
      }
    } catch (error) {
      console.error('Error decoding ID Token:', error)
    }
  }
})

// Helper function to check if a route is active
const isActive = (routeName) => {
  return route.name === routeName
}

const signOutHandler = () => {
  signOut()
}
</script>
