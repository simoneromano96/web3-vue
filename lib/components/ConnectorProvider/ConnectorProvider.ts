import type { JsonRpcSigner, Network, Web3Provider } from "@ethersproject/providers";
import type { InjectionKey, Ref } from "@vue/runtime-core";
import type { Connector } from "web3-core/lib";

/**
 * The Connector Provider properties
 */
export interface ConnectorProvider {
  /**
   * Connector class
   */
  connector: Connector
  /**
   * The web3 provider, used to interrogate the blockchain
   */
  provider: Web3Provider
  /**
   * The signer, used to sign transactions and messages
   */
  signer: JsonRpcSigner
  /**
   * The checksummed addresses that this account provides
   */
  addressList: Ref<readonly string[] | undefined>
  /**
   * The account network
   */
  network: Ref<Network | undefined>
}

/**
 * Vue inject/provide key
 */
export const ConnectorProviderKey: InjectionKey<ConnectorProvider> = Symbol("ConnectorProvider");
