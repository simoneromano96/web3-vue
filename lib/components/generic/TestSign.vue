<template>
  <h1>Test use provider and signer</h1>
  <p>Active address: {{connectorProvider.addressList}}</p>
  <button @click="activate"> Activate </button>
  <button @click="getBlockNumber">Get last block number [Current: {{ blockNumber }}]</button>
  <button @click="getBalance">Get account balance [Current: {{ balance }}]</button>
  <button @click="signMessage">Sign a message</button>
  <p>Signed message: {{signedMessage}}</p>
  <p>Network chain id: {{connectorProvider.network.value?.chainId}}</p>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

import { formatEther } from "@ethersproject/units"
import { ConnectorProviderKey } from "../ConnectorProvider/ConnectorProvider"

const connectorProvider = inject(ConnectorProviderKey)

if (!connectorProvider) {
  throw new Error("ConnectorProvider must be initialized!")
}

const blockNumber = ref(0)
const getBlockNumber = async () => {
  const lastBlockNumber = await connectorProvider.provider.getBlockNumber()
  blockNumber.value = lastBlockNumber ?? 0
}

const balance = ref("")
const getBalance = async () => {
  const lastBalance = await connectorProvider.signer.getBalance()
  balance.value = formatEther(lastBalance ?? "")
}

const activate = async () => {
  try {
    await connectorProvider.connector.activate()
  } catch (error) {
    console.error(error)
  }
}

const signedMessage = ref("")
const signMessage = async () => {
  const message = await connectorProvider.signer.signMessage("Hello, world!")
  signedMessage.value = message ?? ""
}
</script>