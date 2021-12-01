<template>
  <h1>Inner</h1>
  <button @click="getBlockNumber">Get last block number [Current: {{ blockNumber }}]</button>
  <button @click="getAddress">Get account address [Current: {{ address }}]</button>
  <button @click="getBalance">Get account balance [Current: {{ balance }}]</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { formatEther } from "@ethersproject/units"
import { Connector, ConnectorEvents, ProviderTypes } from "web3-core/lib/index"

const connector = new Connector(ProviderTypes.Metamask)

const { provider, signer } = await connector.initProvider()
// await provider.send("eth_requestAccounts", [])
const blockNumber = ref(0)
const getBlockNumber = async () => {
  const lastBlockNumber = await provider.getBlockNumber()
  blockNumber.value = lastBlockNumber
}
const address = ref("")
const getAddress = async () => {
  const currentAddress = await signer.getAddress()
  address.value = currentAddress
}
const balance = ref("")
const getBalance = async () => {
  const lastBalance = await signer.getBalance()
  balance.value = formatEther(lastBalance)
}

connector.addEventListener(ConnectorEvents.AccountsChanged, (event) => {
  console.log(event);
  address.value = (event as unknown as any).detail[0]
})

</script>