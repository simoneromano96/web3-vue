<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, provide, PropType } from "vue"
import { getAddress } from "@ethersproject/address"
import { Connector, ConnectorEvents, ProviderTypes } from "web3-core/lib/index"

import { AddressKey, ConnectorKey, NetworkKey, ProviderKey, SignerKey } from "../../types/symbols"

const props = defineProps({
  providerType: {
    type: String as PropType<ProviderTypes>,
    required: true,
  },
})

const connector = new Connector(props.providerType)

await connector.initProvider()

const provider = connector.provider
const signer = connector.signer

// Handle change of active account.
const address = ref()
connector.eventEmitter.on(ConnectorEvents.AccountsChanged, (accounts) => {
  address.value = getAddress(accounts[0])
})

// Handle change of active network.
const network = ref()
connector.eventEmitter.on(ConnectorEvents.NetworkChanged, (newNetwork) => {
  network.value = newNetwork
})

provide(ProviderKey, provider)
provide(SignerKey, signer)
provide(ConnectorKey, connector)
provide(AddressKey, address)
provide(NetworkKey, network)
</script>
