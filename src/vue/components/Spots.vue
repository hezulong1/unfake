<script setup lang="ts">
import { type CSSProperties, ref, onMounted } from 'vue';

defineOptions({
  name: 'Spots',
});

const props = withDefaults(defineProps<{ size?: number }>(), { size: 10 });

const colors = [
  '#c91b00', '#e92224', '#ff5600', '#392673', '#e92224',
  '#392673', '#003e87', '#175aab', '#0087e7', '#82868a',
  '#25b895', '#1a73e8', '#e6a545', '#e65d6e', '#3d7eff',
  '#3bad8b', '#faba0a', '#6806c1', '#03c2e6', '#3845ff',
  '#4b89fc',
];

const items = ref<CSSProperties[]>([]);

function getItem(index: number, length: number) {
  const size = Math.floor(Math.random() * 10 + 10) + Math.floor(Math.random() * 30 + 10);
  const color = colors[Math.floor(Math.random() * colors.length)];

  const base = 100 / length;
  const left = base * (index + 1);
  const style: CSSProperties = {
    background: color,
    width: `${size}px`,
    height: `${size}px`,
    marginTop: `-${size / 2}px`,
    marginLeft: `-${size / 2}px`,
    top: `${Math.random() * 100}%`,
    left: `${left - (base / 2)}%`,
  };

  return style;
}

onMounted(() => {
  for (let i = 0; i < props.size; i++) {
    items.value.push(getItem(i, props.size));
  }
});
</script>

<template>
  <div>
    <span
      v-for="(item, index) in items"
      :key="index"
      class="decorate"
      :style="item"
    />
  </div>
</template>

<style scoped>
.decorate {
  position: absolute;
  border-radius: 50%;
  opacity: .13;
}
</style>
