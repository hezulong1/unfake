<script setup lang="ts">
import { computed, onMounted, ref, type CSSProperties } from 'vue';
import { useEventListener } from '@vueuse/core';

const props = defineProps({
  /**
   * 启用纵横比
   */
  preserveAspectRatio: Boolean,
  /**
   * 横向宽度，当“启用纵横比“有效
   */
  naturalWidth: Number,
  /**
   * 纵向高度，当“启用纵横比“有效
   */
  naturalHeight: Number,
});

const mergedStyle = ref<CSSProperties>({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
});
const flexible = computed(() => {
  const {
    naturalWidth,
    naturalHeight,
    preserveAspectRatio,
  } = props;
  return preserveAspectRatio && (naturalWidth! >= 150 && naturalHeight! >= 150);
});

function onResize() {
  if (!flexible.value) return;

  const { innerWidth: clientWidth, innerHeight: clientHeight } = window;
  const { naturalWidth = clientWidth, naturalHeight = clientHeight } = props;

  const style: CSSProperties = {
    transformOrigin: 'top left',
    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    width: `${naturalWidth}px`,
    height: `${naturalHeight}px`,
    backgroundSize: `${naturalWidth}px ${naturalHeight}px`,
  };

  if (clientWidth > 0 && clientHeight > 0) {
    const scale = Math.min(clientWidth / naturalWidth, clientHeight / naturalHeight);
    const offsetX = (clientWidth - naturalWidth * scale) / 2;
    const offsetY = (clientHeight - naturalHeight * scale) / 2;
    style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  mergedStyle.value = { ...mergedStyle.value, ...style };
}

onMounted(() => {
  if (flexible.value) {
    onResize();
    useEventListener(window, 'resize', onResize);
  }
});
</script>

<template>
  <div
    unfake-component
    :class="{ flexible }"
    :natural-width="flexible ? naturalWidth : undefined"
    :natural-height="flexible ? naturalHeight : undefined"
    :style="mergedStyle"
  >
    <slot />
  </div>
</template>
