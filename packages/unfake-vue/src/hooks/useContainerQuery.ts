import type { QueryRules } from '@/logic';
import type { MaybeComputedElementRef, MaybeRefOrGetter, UseResizeObserverOptions } from '@vueuse/core';

import { computed } from 'vue';
import { toValue, useElementSize } from '@vueuse/core';
import { matchQueries } from '@/logic';

export function useMatchQueries<R extends QueryRules>(rules: MaybeRefOrGetter<R>) {
  return computed(() => matchQueries(toValue(rules)));
}

export function useContainerQuery<R extends QueryRules>(
  target: MaybeComputedElementRef,
  rules: MaybeRefOrGetter<R>,
  options: UseResizeObserverOptions = {},
) {
  const { width, height, stop } = useElementSize(target, undefined, options);
  const query = useMatchQueries(rules);
  const state = computed(() => query.value({ width: width.value, height: height.value }));

  return {
    state,
    stop,
  };
}
