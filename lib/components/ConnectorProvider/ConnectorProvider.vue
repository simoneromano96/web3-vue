<template>
  <suspense>
    <connector-provider-inner :provider-type="props.providerType">
      <slot></slot>
    </connector-provider-inner>
  </suspense>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { ProviderTypes } from "web3-core/lib"

import ConnectorProviderInner from "./ConnectorProviderInner.vue"

const props = defineProps({
  providerType: {
    type: String as PropType<ProviderTypes>,
    required: true,
  },
})
</script>
