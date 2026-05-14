import type { MaybeRefOrGetter } from 'vue';
import type { MaybeComputedElementRef, UseResizeObserverOptions } from '@vueuse/core';
import type { QueryRules } from 'unfake/logic';

import { computed, toValue } from 'vue';
import { useElementSize } from '@vueuse/core';
import { matchQueries } from 'unfake/logic';

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
