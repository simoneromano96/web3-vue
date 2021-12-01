<template>
<slot> </slot>
  <!-- <h1>Inner</h1>
  <p>Active address: {{address}}</p>
  <button @click="activate"> Activate </button>
  <button @click="getBlockNumber">Get last block number [Current: {{ blockNumber }}]</button>
  <button @click="getBalance">Get account balance [Current: {{ balance }}]</button>
  <button @click="signMessage">Sign a message</button>
  <p>Signed message: {{signedMessage}}</p> -->
</template>

<script setup lang="ts">
import { ref, provide } from "vue"
import { formatEther } from "@ethersproject/units"
import { getAddress } from "@ethersproject/address"

import { Connector, ConnectorEvents, ProviderTypes } from "web3-core/lib/index"
import { ConnectorKey, ProviderKey, SignerKey } from "../../types/symbols"

const connector = new Connector(ProviderTypes.Metamask)

const { provider, signer } = await connector.initProvider()

// const blockNumber = ref(0)
// const getBlockNumber = async () => {
//   const lastBlockNumber = await provider.getBlockNumber()
//   blockNumber.value = lastBlockNumber
// }

// const balance = ref("")
// const getBalance = async () => {
//   const lastBalance = await signer.getBalance()
//   balance.value = formatEther(lastBalance)
// }

// const activate = async () => {
//   try {
//     await connector.activate()
//   } catch (error) {
//     console.error(error)
//   }
// }

// const address = ref("")
// connector.eventEmitter.on(ConnectorEvents.AccountsChanged, (accounts) => {
//   console.log(accounts);
//   address.value = getAddress(accounts[0])
// })

// const signedMessage = ref("")
// const signMessage = async () => {
//   const message = await signer.signMessage("Hello, world!")
//   signedMessage.value = message
// }

provide(ProviderKey, provider)
provide(SignerKey, signer)
provide(ConnectorKey, connector)
</script>