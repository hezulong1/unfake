<script setup lang="ts">
import FlexibleScreen from '@local/vue/components/FlexibleScreen.vue';
</script>

<template>
  <div class="demo">
    <FlexibleScreen :natural-width="600" :natural-height="480" preserve-aspect-ratio>
      <div style="background: red; width: 100%; height: 100%">
        <span>1</span>
      </div>
    </FlexibleScreen>
  </div>
</template>
