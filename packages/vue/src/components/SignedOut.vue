<template>
  <template v-if="!isSignedIn">
    <slot />
  </template>
  <template v-else>
    <slot name="fallback" />
  </template>
</template>

<script setup lang="ts">
import {useAsgardeo} from '../composables/useAsgardeo';

const {isSignedIn} = useAsgardeo();
</script>
