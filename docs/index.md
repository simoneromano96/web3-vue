<script setup>
// import CustomComponent from '../lib/components/HelloWorld.vue'
import ConnectorProvider from '../lib/components/ConnectorProvider/ConnectorProvider.vue'
import TestSign from '../lib/components/generic/TestSign.vue'
</script>

# Docs

For nomenclature purposes, a wallet can have multiple accounts.

<!-- 
This is a .md using a custom component
<CustomComponent /> 
-->

## Metamask 

<connector-provider provider-type="Metamask">
  <TestSign />
</connector-provider>

## Wallet Connect 

<connector-provider provider-type="WalletConnect">
  <TestSign />
</connector-provider>
