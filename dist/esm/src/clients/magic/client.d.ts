import BaseClient from '../base';
import { PROVIDER_ID } from '../../constants';
import type { Network } from '../../types/node';
import type { InitParams } from '../../types/providers';
import type { Wallet } from '../../types/wallet';
import type { MagicAuthConstructor, MagicAuthConnectOptions } from './types';
declare class MagicAuth extends BaseClient {
    #private;
    clientOptions?: MagicAuthConnectOptions;
    network: Network;
    constructor({ metadata, client, clientOptions, algosdk, algodClient, network }: MagicAuthConstructor);
    static metadata: {
        id: PROVIDER_ID;
        name: string;
        icon: string;
        isWalletConnect: boolean;
    };
    static init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network }: InitParams<PROVIDER_ID.MAGIC>): Promise<BaseClient | null>;
    connect(_: () => void, email: string): Promise<Wallet>;
    reconnect(): Promise<{
        accounts: {
            name: string;
            address: string;
            providerId: PROVIDER_ID;
            email: string;
        }[];
        id: PROVIDER_ID;
        name: string;
        icon: string;
        isWalletConnect: boolean;
    } | null>;
    disconnect(): Promise<void>;
    signTransactions(connectedAccounts: string[], txnGroups: Uint8Array[] | Uint8Array[][], indexesToSign?: number[], returnGroup?: boolean): Promise<Uint8Array[]>;
}
export default MagicAuth;
