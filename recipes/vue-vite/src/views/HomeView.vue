<template>
  <div v-if="isAuthenticated" class="authenticated-container">
    <header class="auth-header">
      <div class="header-content">
        <div class="user-avatar">
          <img alt="user-logo" :src="USER_LOGO" />
        </div>
        <h1 class="welcome-heading">Hello {{ displayName || username }}</h1>
        <h4 class="welcome-subheading">Welcome to the Vue + Asgardeo demonstration app!</h4>
        <p class="welcome-description">
          From here on you can experience the basic business application use cases integrated with
          Asgardeo for user profile management and other capabilities.
        </p>
      </div>
    </header>
    <h3 class="section-heading">What can you do next?</h3>
    <div class="cards-container">
      <Cards />
    </div>
  </div>
  <header v-else class="login-header">
    <div class="login-content">
      <div class="vue-logo-container">
        <img alt="Vue-logo" :src="VUE_LOGO" class="vue-logo" />
      </div>
      <div class="title-container">
        <h1 class="main-heading">
          Enhance your application's IAM experience with
          <img alt="asgardeo-logo" :src="ASGARDEO_LOGO" class="asgardeo-logo" />
        </h1>
      </div>
      <p class="app-description">
        This sample demonstrates the authentication flow of a Vue application using Asgardeo.
      </p>
      <div class="button-group">
        <button class="button primary rounded" @click="signInHandler">Sign In</button>
        <a :href="signUpURL" target="_blank" rel="noopener noreferrer">
          <button class="button outline rounded">Create an account</button>
        </a>
      </div>
      <div class="github-link-container">
        <a href="TODO" target="_blank" rel="noopener noreferrer" class="github-link">
          <img alt="github-logo" :src="GITHUB_LOGO" class="github-logo" />
          <span>Explore the source code</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Container styles */
.authenticated-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 90vh;
}

/* Authenticated user view */
.auth-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 0.5rem; /* Reduced from 2rem */
  padding-top: 1rem;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-heading {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-family: Gilmer;
}

.welcome-subheading {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 1rem;
}

.welcome-description {
  max-width: 800px;
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 0.5rem; /* Adjusted for better spacing */
}

.section-heading {
  font-size: 1.5rem;
  margin-top: 0; /* Removed top margin to reduce gap */
  margin-bottom: 0.5rem;
  text-align: center;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.login-header {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers vertically */
  align-items: center; /* Centers horizontally */
  min-height: 90vh;
}

.login-content {
  max-width: 800px;
  text-align: center;
}

.vue-logo-container {
  margin-bottom: 1rem;
}

.vue-logo {
  height: 100px;
  margin: 0 auto;
}

.title-container {
  margin-bottom: 1rem;
}

.main-heading {
  font-size: 2rem; /* Increase font size */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap; /* Allow wrapping */
  gap: 0.5rem;
  text-align: center;
  font-weight: normal;
  font-family: 'Gilmer';
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .main-heading {
    font-size: 1.5rem; /* Scale down font size on smaller screens */
  }
}

.asgardeo-logo {
  height: 2rem; /* Increase logo size */
  vertical-align: middle; /* Align with text */
  margin-bottom: 1px; /* Fine-tune vertical alignment */
}

.app-description {
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.6;
  font-family: Gilmer;
  color: #777;
}
.button-group {
  display: flex;
  flex-direction: column; /* Change to column to stack buttons */
  align-items: center; /* Center the buttons horizontally */
  gap: 1rem;
  margin-bottom: 1rem;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 25px; /* Make buttons more round */
  cursor: pointer;
  font-weight: bold;
  min-width: 200px; /* Optional: set a minimum width for the buttons */
  transition: background-color 0.3s ease; /* Add transition for hover effect */
}

.button.primary {
  background-color: #ff6b00;
  color: white;
  border: none;
}

.button.primary:hover {
  background-color: #e05d00;
}

.button.outline {
  background-color: transparent;
  color: #ff6b00;
  border: 1px solid #ff6b00;
}

.button.outline:hover {
  background-color: rgba(255, 107, 0, 0.1);
}

.github-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
  text-align: center;
}

.github-logo {
  width: 24px;
  height: 24px;
}
</style>

<script setup>
import { computed } from 'vue'
import ASGARDEO_LOGO from '../images/asgardeo-logo.svg'
import GITHUB_LOGO from '../images/github.png'
import USER_LOGO from '../images/user.png'
import VUE_LOGO from '../images/vue-logo.png'
import Cards from '../components/Cards.vue'
import { useAsgardeo } from '@asgardeo/vue'

const VITE_ASGARDEO_SIGN_UP_URL = import.meta.env.VITE_ASGARDEO_SIGN_UP_URL
const VITE_ASGARDEO_CLIENT_ID = import.meta.env.VITE_ASGARDEO_CLIENT_ID
const VITE_ASGARDEO_APPLICATION_NAME = import.meta.env.VITE_ASGARDEO_APPLICATION_NAME
const VITE_ASGARDEO_SIGN_IN_REDIRECT_URL = import.meta.env.VITE_ASGARDEO_SIGN_IN_REDIRECT_URL

const { state, signIn } = useAsgardeo()

const isAuthenticated = computed(() => state.isAuthenticated)
const displayName = computed(() => state.displayName)
const username = computed(() => state.username)

const signUpURL = `${VITE_ASGARDEO_SIGN_UP_URL}${VITE_ASGARDEO_CLIENT_ID}&sp=${VITE_ASGARDEO_APPLICATION_NAME}&redirect_url=${VITE_ASGARDEO_SIGN_IN_REDIRECT_URL}`

const signInHandler = () => {
  signIn()
}
</script>

<style scoped>
.app-header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: rgb(0, 0, 0);
  min-height: 100vh; /* Changed to min-height to accommodate content */
  padding-bottom: 20px;
}

.app-header-length {
  min-height: 40vh; /* Adjusted to min-height */
}

.avatar-large {
  margin-bottom: 20px;
}

.logo {
  /* If you need specific styling for the logo beyond global.css */
}

.large-button {
  /* If you need specific styling for this button beyond global.css */
}
</style>
