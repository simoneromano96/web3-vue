<template>
  <suspense>
    <metamask-inner>
      <slot> </slot>
    </metamask-inner>
  </suspense>
</template>

<script setup lang="ts">
import MetamaskInner from "./MetamaskInner.vue"
</script>