import { Network } from '../types/node';
export declare enum PROVIDER_ID {
    KMD = "kmd",
    CUSTOM = "custom",
    PERA = "pera",
    DAFFI = "daffi",
    LUTE = "lute",
    MYALGO = "myalgo",
    ALGOSIGNER = "algosigner",
    DEFLY = "defly",
    EXODUS = "exodus",
    KIBISIS = "kibisis",
    WALLETCONNECT = "walletconnect",
    MNEMONIC = "mnemonic",
    MAGIC = "magic"
}
export declare const DEFAULT_NETWORK: Network;
export declare const DEFAULT_NODE_BASEURL = "https://mainnet-api.algonode.cloud";
export declare const DEFAULT_NODE_TOKEN = "";
export declare const DEFAULT_NODE_PORT = "";
