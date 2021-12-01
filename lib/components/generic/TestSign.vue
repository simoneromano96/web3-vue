<template>
  <h1>Test use provider and signer</h1>
  <p>Active address: {{address}}</p>
  <button @click="activate"> Activate </button>
  <button @click="getBlockNumber">Get last block number [Current: {{ blockNumber }}]</button>
  <button @click="getBalance">Get account balance [Current: {{ balance }}]</button>
  <button @click="signMessage">Sign a message</button>
  <p>Signed message: {{signedMessage}}</p>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

import { formatEther } from "@ethersproject/units"
import { getAddress } from "@ethersproject/address"
import { ConnectorEvents } from "web3-core/lib"
import { ConnectorKey, ProviderKey, SignerKey } from "../../types/symbols"

const provider = inject(ProviderKey)
const signer = inject(SignerKey)
const connector = inject(ConnectorKey)

const blockNumber = ref(0)
const getBlockNumber = async () => {
  const lastBlockNumber = await provider?.getBlockNumber()
  blockNumber.value = lastBlockNumber ?? 0
}

const balance = ref("")
const getBalance = async () => {
  const lastBalance = await signer?.getBalance()
  balance.value = formatEther(lastBalance ?? "")
}

const activate = async () => {
  try {
    await connector?.activate()
  } catch (error) {
    console.error(error)
  }
}

const address = ref("")
connector?.eventEmitter.on(ConnectorEvents.AccountsChanged, (accounts) => {
  console.log(accounts);
  address.value = getAddress(accounts[0])
})

const signedMessage = ref("")
const signMessage = async () => {
  const message = await signer?.signMessage("Hello, world!")
  signedMessage.value = message ?? ""
}
</script>