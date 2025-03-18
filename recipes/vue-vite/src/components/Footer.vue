<template>
  <div class="footer">
    <footer class="page-footer font-small blue">
      <p>
        © {{ year }}
        <a href="https://wso2.com/"> WSO2 LLC.</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
// Add the date.
const year = new Date().getFullYear()
</script>
