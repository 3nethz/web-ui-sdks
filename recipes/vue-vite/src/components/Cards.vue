<template>
  <div class="row">
    <div class="column" v-for="(card, index) in cards" :key="index">
      <div class="card">
        <div class="card-container">
          <img alt="card-icon" :src="card?.icon" class="link-logo-image-small" />
          <h3>
            {{ card?.title }}
          </h3>
        </div>
        <p>
          {{ card?.description }}
        </p>
        <p>
          <a :href="card?.link" target="_blank" rel="noopener noreferrer">Check it out</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import GITHUB_ICON from '../images/github.png'
import USER_GUIDE from '../images/user-guide.png'
import DOCUMENTATION_LOGO from '../images/docs.png'

const cards = [
  {
    title: 'User Guide',
    description:
      'Check out our user guide and you will guide you to integrate your applications with Asgardeo.',
    link: 'https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex',
    icon: USER_GUIDE,
  },
  {
    title: 'Github Repository',
    description:
      'Lets go through the application codebase and contribute to our Asgardeo Vue Sample application.',
    link: "TODO: Add the link to the GitHub repository",
    icon: GITHUB_ICON,
  },
  {
    title: 'Asgardeo Docs',
    description:
      'Read our Docs for the guides to provide the instructions for building IAM uses cases.',
    link: 'https://wso2.com/asgardeo/docs/',
    icon: DOCUMENTATION_LOGO,
  },
]
</script>
