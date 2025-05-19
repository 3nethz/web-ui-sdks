<template>
  <button ref="buttonRef" :class="className" :style="style" v-bind="attrs" type="button" @click="handleClick">
    <slot>Sign Out</slot>
  </button>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useAsgardeo} from '../composables/useAsgardeo';
import {useAttrs} from 'vue';

defineProps<{
  className?: string;
  style?: Record<string, string>;
}>();

const {signOut} = useAsgardeo();
const buttonRef = ref<HTMLButtonElement | null>(null);
const attrs = useAttrs();

const handleClick = async () => {
  try {
    await signOut();
  } catch (error) {
    throw new Error('Sign out failed: ' + (error instanceof Error ? error.message : String(error)));
  }
};
</script>
