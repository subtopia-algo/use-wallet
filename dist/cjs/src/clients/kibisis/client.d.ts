import BaseClient from '../base';
import { PROVIDER_ID } from '../../constants';
import type { InitParams, Network, Wallet } from '../../types';
import type { Arc0027Account, KibisisClientConstructor, ProviderMethods, SendRequestWithTimeoutOptions } from './types';
declare class KibisisClient extends BaseClient {
    genesisHash: string;
    methods: ProviderMethods[];
    network: Network;
    constructor({ metadata, algosdk, algodClient, genesisHash, methods, network }: KibisisClientConstructor);
    static metadata: {
        id: PROVIDER_ID;
        icon: string;
        isWalletConnect: boolean;
        name: string;
    };
    /**
     * public static functions
     */
    static init({ algodOptions, algosdkStatic, network }: InitParams<PROVIDER_ID.KIBISIS>): Promise<BaseClient | null>;
    static mapAccountsToWallet(accounts: Arc0027Account[]): Wallet;
    static sendRequestWithTimeout<Params, Result>({ method, params, timeout, reference }: SendRequestWithTimeoutOptions<Params>): Promise<Result | undefined>;
    /**
     * private functions
     */
    private convertBytesToBase64;
    private convertBase64ToBytes;
    /**
     * Calls the enable method on the provider that returns the authorized accounts.
     * @returns {Arc0027Account[]} the authorized accounts.
     * @throws {METHOD_CANCELED_ERROR} if the method was cancelled by the user.
     * @throws {METHOD_NOT_SUPPORTED_ERROR} if the method is not supported for the configured network.
     * @throws {METHOD_TIMED_OUT_ERROR} if the method timed out by lack of response.
     * @throws {NETWORK_NOT_SUPPORTED_ERROR} if the network is not supported for the configured network.
     * @throws {UNKNOWN_ERROR} if the response result was empty.
     */
    private enable;
    /**
     * Convenience function that gets the provider information and updates the supported methods. This should be called
     * before interacting with the provider to ensure methods are supported.
     * @throws {METHOD_TIMED_OUT_ERROR} if the method timed out by lack of response.
     * @throws {NETWORK_NOT_SUPPORTED_ERROR} if the network is not supported for the configured network.
     * @throws {UNKNOWN_ERROR} if the response result was empty.
     */
    private refreshSupportedMethods;
    /**
     * Calls the signTxns methods to sign the supplied transactions.
     * @param {Arc0001SignTxns[]} txns -  the unsigned or signed transactions as defined in ARC-0001.
     * @returns {(string | null)[]} the authorized accounts.
     * @throws {INVALID_INPUT_ERROR} if computed group ID for the txns does not match the assigned group ID.
     * @throws {INVALID_GROUP_ID_ERROR} if the unsigned txns is malformed or not conforming to ARC-0001.
     * @throws {METHOD_CANCELED_ERROR} if the method was cancelled by the user.
     * @throws {METHOD_NOT_SUPPORTED_ERROR} if the method is not supported for the configured network.
     * @throws {METHOD_TIMED_OUT_ERROR} if the method timed out by lack of response.
     * @throws {NETWORK_NOT_SUPPORTED_ERROR} if the network is not supported for the configured network.
     * @throws {UNAUTHORIZED_SIGNER_ERROR} if a signer in the request is not authorized by the provider.
     * @throws {UNKNOWN_ERROR} if the response result was empty.
     */
    private signTxns;
    /**
     * Validates whether a method is supported with the provider.
     * @param {ProviderMethods} method -  the method to validate.
     * @throws {METHOD_NOT_SUPPORTED_ERROR} if the method is not supported for the configured network.
     */
    private validateMethod;
    /**
     * public functions
     */
    connect(): Promise<Wallet>;
    disconnect(): Promise<void>;
    reconnect(): Promise<Wallet | null>;
    signTransactions(connectedAccounts: string[], transactions: Uint8Array[], indexesToSign?: number[], returnGroup?: boolean): Promise<Uint8Array[]>;
}
export default KibisisClient;
