import type { InjectionKey } from "vue";
import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import type { Connector } from "web3-core/lib/index";

export const ProviderKey: InjectionKey<Web3Provider> = Symbol("Provider");
export const SignerKey: InjectionKey<JsonRpcSigner> = Symbol("Signer");
export const ConnectorKey: InjectionKey<Connector> = Symbol("Connector");
