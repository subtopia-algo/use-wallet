import BaseClient from '../base';
import { PROVIDER_ID } from '../../constants';
import type { Network } from '../../types/node';
import type { InitParams } from '../../types/providers';
import type { Metadata, Wallet } from '../../types/wallet';
import type { CustomProvider, CustomWalletClientConstructor } from './types';
declare class CustomWalletClient extends BaseClient {
    network: Network;
    providerProxy: CustomProvider;
    static metadata: Metadata;
    constructor({ providerProxy, metadata, algosdk, algodClient, network }: CustomWalletClientConstructor);
    static init({ clientOptions, algodOptions, algosdkStatic, network }: InitParams<PROVIDER_ID.CUSTOM>): Promise<BaseClient | null>;
    connect(): Promise<Wallet>;
    disconnect(): Promise<void>;
    reconnect(): Promise<Wallet | null>;
    signTransactions(connectedAccounts: string[], txnGroups: Uint8Array[] | Uint8Array[][], indexesToSign?: number[], returnGroup?: boolean): Promise<Uint8Array[]>;
}
export default CustomWalletClient;
