import { PROVIDER_ID } from '../../constants';
import { DecodedSignedTransaction, DecodedTransaction, Network } from '../../types/node';
import type { InitParams } from '../../types/providers';
import BaseClient from '../base';
import type { LuteClientConstructor, LuteConnectOptions } from './types';
declare class LuteClient extends BaseClient {
    #private;
    clientOptions?: LuteConnectOptions;
    network: Network;
    constructor({ metadata, client, clientOptions, algosdk, algodClient, network }: LuteClientConstructor);
    static metadata: {
        id: PROVIDER_ID;
        name: string;
        icon: string;
        isWalletConnect: boolean;
    };
    static init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network }: InitParams<PROVIDER_ID.LUTE>): Promise<BaseClient | null>;
    connect(): Promise<{
        accounts: {
            name: string;
            address: string;
            providerId: PROVIDER_ID;
        }[];
        id: PROVIDER_ID;
        name: string;
        icon: string;
        isWalletConnect: boolean;
    }>;
    reconnect(): Promise<null>;
    disconnect(): Promise<void>;
    shouldSignTxnObject(txn: DecodedTransaction | DecodedSignedTransaction, addresses: string[], indexesToSign: number[] | undefined, idx: number): boolean;
    signTransactions(connectedAccounts: string[], transactions: Uint8Array[], indexesToSign?: number[], returnGroup?: boolean): Promise<Uint8Array[]>;
}
export default LuteClient;
