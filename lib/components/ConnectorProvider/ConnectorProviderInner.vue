<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { PropType, toRefs } from "vue"
import type { Network } from "@ethersproject/providers";

import { provide, reactive, readonly } from "vue"

import { getAddress } from "@ethersproject/address"
import { Connector, ConnectorEvents, ProviderTypes } from "web3-core/lib/index"

import { ConnectorProviderKey } from "./ConnectorProvider"

const props = defineProps({
  providerType: {
    type: String as PropType<ProviderTypes>,
    required: true,
  },
})

const connector = new Connector(props.providerType)

await connector.initProvider()

if (!connector.provider) {
  throw new Error("Could not initialize provider")
}

if (!connector.signer) {
  throw new Error("Could not initialize signer")
}

const provider = connector.provider
const signer = connector.signer

interface ConnectorProviderState {
  addressList?: string[]
  network?: Network
}

// Connector state
const connectorState = reactive<ConnectorProviderState>({
  addressList: undefined,
  network: undefined,
})

// Handle change of active account.
connector.eventEmitter.on(ConnectorEvents.AccountsChanged, (addresses) => {
  connectorState.addressList = addresses.map(getAddress)
})

// Handle change of active network.
connector.eventEmitter.on(ConnectorEvents.NetworkChanged, (network) => {
  connectorState.network = network
})

// Make sure the properties are readonly, and deconstruct the properties
const { addressList, network } = toRefs(readonly(connectorState))

provide(ConnectorProviderKey, {
  connector,
  provider,
  signer,
  addressList,
  network,
})
</script>
