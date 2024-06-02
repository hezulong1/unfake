import { getCurrentInstance } from 'vue';

export function useEmit() {
  const vm = getCurrentInstance();
  if (!vm) return;
  // @ts-ignore
  return vm.emit || vm.$emit?.bind(vm) || vm.proxy?.$emit?.bind(vm.proxy);
}
