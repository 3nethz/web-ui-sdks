<template>
  <div class="row">
    <div class="container">
      <div class="container-column">
        <a
          href="https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex"
        >
          <img alt="user-guide-logo" :src="USER_GUIDE" class="link-logo-image-small logo" />
        </a>
        <a
          href="https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex"
        >
          User Guide
        </a>
      </div>
      <div class="container-column">
        <a href="https://github.com/dasuni-30/asgardeo-react-sample-app">
          <img alt="github-logo" :src="GITHUB_ICON" class="link-logo-image-small logo" />
        </a>
        <a href="https://github.com/dasuni-30/asgardeo-react-sample-app"> Github </a>
      </div>
      <div class="container-column">
        <a href="https://wso2.com/asgardeo/docs/">
          <img
            alt="asgardeo-docs-logo"
            :src="DOCUMENTATION_LOGO"
            class="link-logo-image-small logo"
          />
        </a>
        <a href="https://wso2.com/asgardeo/docs/"> Asgardeo </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import GITHUB_ICON from '../images/github.png'
import USER_GUIDE from '../images/user.png'
import DOCUMENTATION_LOGO from '../images/docs.png'
</script>
