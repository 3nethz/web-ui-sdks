<template>
  <div class="row">
    <div class="column" v-for="(card, index) in cards" :key="index">
      <div class="card">
        <div class="card-header">
          <img alt="card-icon" :src="card?.icon" class="card-icon" />
          <h3>{{ card?.title }}</h3>
        </div>
        <p class="card-description">
          {{ card?.description }}
        </p>
        <p class="card-link">
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
    link: 'https://github.com/asgardeo/web-ui-sdks/blob/main/packages/vue/README.md',
    icon: USER_GUIDE,
  },
  {
    title: 'Github Repository',
    description:
      'Lets go through the application codebase and contribute to our Asgardeo Vue Sample application.',
    link: 'https://github.com/asgardeo/web-ui-sdks',
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

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.column {
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  padding: 0 10px;
}

.card {
  padding: 25px;
  background: #ffffff;
  height: 150px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  border-radius: 0.5rem;
  margin: 20px;
  transition:
    background-color 0.3s,
    border 0.3s;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.card h3 {
  font-size: medium;
  margin: 0;
}

.card-description {
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
  flex-grow: 1;
  margin: 10px 0;
}

.card-link {
  margin-top: auto;
}

.card a {
  text-decoration: none;
  color: var(--primary);
  font-weight: 500;
}

.card:hover {
  background-color: #f5f5f5;
  border: 1px solid var(--primary);
}
</style>
