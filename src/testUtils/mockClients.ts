/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import LuteConnect from 'lute-connect'
import { WalletConnectModalSign } from '@walletconnect/modal-sign-html'
import algosdk from 'algosdk'
import AlgoSignerClient from '../clients/algosigner/client'
import DaffiWalletClient from '../clients/daffi/client'
import DeflyWalletClient from '../clients/defly/client'
import ExodusClient from '../clients/exodus/client'
import LuteClient from '../clients/lute/client'
import KibisisClient from '../clients/kibisis/client'
import KMDWalletClient from '../clients/kmd/client'
import MnemonicWalletClient from '../clients/mnemonic/client'
import MyAlgoWalletClient from '../clients/myalgo/client'
import PeraWalletClient from '../clients/pera/client'
import WalletConnectClient from '../clients/walletconnect2/client'
import { PROVIDER_ID } from '../constants'
import type { AlgoSigner } from '../clients/algosigner/types'
import type { Exodus } from '../clients/exodus/types'
import type { Account, ClientOptions } from '../types'
import CustomWalletClient from '../clients/custom/client'
import MagicAuthClient from '../clients/magic/client'
import { AlgorandExtension } from '@magic-ext/algorand'
import { Magic } from 'magic-sdk'

type ClientTypeMap = {
  [PROVIDER_ID.ALGOSIGNER]: AlgoSignerClient
  [PROVIDER_ID.CUSTOM]: CustomWalletClient
  [PROVIDER_ID.DAFFI]: DaffiWalletClient
  [PROVIDER_ID.DEFLY]: DeflyWalletClient
  [PROVIDER_ID.EXODUS]: ExodusClient
  [PROVIDER_ID.KMD]: KMDWalletClient
  [PROVIDER_ID.MNEMONIC]: MnemonicWalletClient
  [PROVIDER_ID.MYALGO]: MyAlgoWalletClient
  [PROVIDER_ID.PERA]: PeraWalletClient
  [PROVIDER_ID.WALLETCONNECT]: WalletConnectClient
  [PROVIDER_ID.LUTE]: LuteClient
  [PROVIDER_ID.KIBISIS]: KibisisClient
  [PROVIDER_ID.MAGIC]: MagicAuthClient
}

export const createMockClient = <T extends PROVIDER_ID>(
  providerId: T,
  clientOptions?: ClientOptions,
  accounts?: Array<Account>
): ClientTypeMap[T] => {
  const mockClientFactoryMap: {
    [K in PROVIDER_ID]: (
      clientOptions?: ClientOptions,
      accounts?: Array<Account>
    ) => ClientTypeMap[K]
  } = {
    [PROVIDER_ID.ALGOSIGNER]: createAlgoSignerMockInstance,
    [PROVIDER_ID.DAFFI]: createDaffiMockInstance,
    [PROVIDER_ID.DEFLY]: createDeflyMockInstance,
    [PROVIDER_ID.EXODUS]: createExodusMockInstance,
    [PROVIDER_ID.KMD]: createKmdMockInstance,
    [PROVIDER_ID.CUSTOM]: createCustomMockInstance,
    [PROVIDER_ID.MNEMONIC]: createMnemonicMockInstance,
    [PROVIDER_ID.MYALGO]: createMyAlgoMockInstance,
    [PROVIDER_ID.PERA]: createPeraMockInstance,
    [PROVIDER_ID.WALLETCONNECT]: createWalletConnectMockInstance,
    [PROVIDER_ID.LUTE]: createLuteMockInstance,
    [PROVIDER_ID.KIBISIS]: createKibisisMockInstance,
    [PROVIDER_ID.MAGIC]: createMagicMockInstance
  }

  return mockClientFactoryMap[providerId](clientOptions, accounts)
}

// ALGOSIGNER
export const createAlgoSignerMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): AlgoSignerClient => {
  // Mock object with the same properties as `window.algorand`
  const mockClient: AlgoSigner = {
    enable: () => Promise.resolve({ genesisID: '', genesisHash: '', accounts: [] }),
    signTxns: () => Promise.resolve([]),
    encoding: {
      msgpackToBase64: () => '',
      byteArrayToString: () => ''
    }
  }

  const mockAlgoSignerClient = new AlgoSignerClient({
    metadata: {
      id: PROVIDER_ID.ALGOSIGNER,
      name: 'AlgoSigner',
      icon: 'algosigner-icon-b64',
      isWalletConnect: false
    },
    client: mockClient,
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockAlgoSignerClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockAlgoSignerClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockAlgoSignerClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockAlgoSignerClient
}

// DAFFI
export const createDaffiMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): DaffiWalletClient => {
  const mockDaffiWalletClient = new DaffiWalletClient({
    metadata: {
      id: PROVIDER_ID.DAFFI,
      name: 'Daffi',
      icon: 'daffi-icon-b64',
      isWalletConnect: true
    },
    client: new DaffiWalletConnect(),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockDaffiWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockDaffiWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockDaffiWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockDaffiWalletClient
}

// DEFLY
export const createDeflyMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): DeflyWalletClient => {
  const mockDeflyWalletClient = new DeflyWalletClient({
    metadata: {
      id: PROVIDER_ID.DEFLY,
      name: 'Defly',
      icon: 'defly-icon-b64',
      isWalletConnect: true
    },
    client: new DeflyWalletConnect(),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockDeflyWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockDeflyWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockDeflyWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockDeflyWalletClient
}

// EXODUS
export const createExodusMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): ExodusClient => {
  // Mock object with the same properties as `window.exodus.algorand`
  const mockClient: Exodus = {
    isConnected: false,
    address: null,
    connect: () => Promise.resolve({ address: '' }),
    disconnect: () => {
      return
    },
    signAndSendTransaction: () => Promise.resolve({ txId: '' }),
    signTransaction: (transactions: Array<Readonly<Uint8Array>>) => Promise.resolve(transactions)
  }

  const mockExodusClient = new ExodusClient({
    metadata: {
      id: PROVIDER_ID.EXODUS,
      name: 'Exodus',
      icon: 'exodus-icon-b64',
      isWalletConnect: false
    },
    client: mockClient,
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    clientOptions: {
      onlyIfTrusted: false,
      ...clientOptions
    }
  })

  // Mock the connect method
  mockExodusClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockExodusClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockExodusClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockExodusClient
}

// LUTE
export const createLuteMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): LuteClient => {
  const mockLuteClient = new LuteClient({
    metadata: {
      id: PROVIDER_ID.LUTE,
      name: 'Lute',
      icon: 'lute-icon-b64',
      isWalletConnect: false
    },
    client: new LuteConnect('Test'),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockLuteClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockLuteClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockLuteClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockLuteClient
}

// KIBISIS
export const createKibisisMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): KibisisClient => {
  // Mock object with the same properties as `window.exodus.algorand`
  const mockKibisisClient = new KibisisClient({
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    genesisHash: 'a2liaXNpcy10ZXN0LW5ldHdvcms=',
    methods: ['enable', 'signTxns'],
    metadata: {
      id: PROVIDER_ID.KIBISIS,
      name: 'Kibisis',
      icon: 'kibisis-icon-b64',
      isWalletConnect: false
    },
    network: 'test-network'
  })

  // Mock the connect method
  mockKibisisClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockKibisisClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockKibisisClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockKibisisClient
}

// KMD
export const createKmdMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): KMDWalletClient => {
  const mockKmdWalletClient = new KMDWalletClient({
    metadata: {
      id: PROVIDER_ID.KMD,
      name: 'KMD',
      icon: 'kmd-icon-b64',
      isWalletConnect: false
    },
    client: new algosdk.Kmd('a'.repeat(64), 'http://localhost', '4002'),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    wallet: 'mock-wallet',
    password: 'mock-password',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockKmdWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockKmdWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockKmdWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockKmdWalletClient
}

// CUSTOM
export const createCustomMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): CustomWalletClient => {
  const mockCustomWalletClient = new CustomWalletClient({
    metadata: {
      id: PROVIDER_ID.CUSTOM,
      name: 'CUSTOM',
      icon: 'custom-icon-b64',
      isWalletConnect: false
    },
    providerProxy: undefined as any,
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockCustomWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockCustomWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockCustomWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockCustomWalletClient
}

// MNEMONIC
export const createMnemonicMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): MnemonicWalletClient => {
  const mockMnemonicWalletClient = new MnemonicWalletClient({
    metadata: {
      id: PROVIDER_ID.MNEMONIC,
      name: 'Mnemonic',
      icon: 'mnemonic-icon-b64',
      isWalletConnect: false
    },
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockMnemonicWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockMnemonicWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockMnemonicWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockMnemonicWalletClient
}

// MYALGO
export const createMyAlgoMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): MyAlgoWalletClient => {
  const mockMyAlgoWalletClient = new MyAlgoWalletClient({
    metadata: {
      id: PROVIDER_ID.MYALGO,
      name: 'MyAlgo',
      icon: 'myalgo-icon-b64',
      isWalletConnect: false
    },
    client: new MyAlgoConnect(),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockMyAlgoWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockMyAlgoWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockMyAlgoWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockMyAlgoWalletClient
}

// PERA
export const createPeraMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): PeraWalletClient => {
  const mockPeraWalletClient = new PeraWalletClient({
    metadata: {
      id: PROVIDER_ID.PERA,
      name: 'Pera',
      icon: 'pera-icon-b64',
      isWalletConnect: true
    },
    client: new PeraWalletConnect(),
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    ...(clientOptions && clientOptions)
  })

  // Mock the connect method
  mockPeraWalletClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockPeraWalletClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockPeraWalletClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockPeraWalletClient
}

// WALLETCONNECT
export const createWalletConnectMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): WalletConnectClient => {
  const options = {
    projectId: 'project-id',
    metadata: {
      name: 'Example Dapp',
      description: 'Example Dapp',
      url: '#',
      icons: ['https://walletconnect.com/walletconnect-logo.png']
    },
    ...(clientOptions && clientOptions)
  }

  const mockWalletConnectClient = new WalletConnectClient({
    metadata: {
      id: PROVIDER_ID.WALLETCONNECT,
      name: 'WalletConnect',
      icon: 'walletconnect-icon-b64',
      isWalletConnect: true
    },
    client: new WalletConnectModalSign(options),
    clientOptions: {
      ...options
    },
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network',
    chain: 'algorand:testnet'
  })

  // Mock the connect method
  mockWalletConnectClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockWalletConnectClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockWalletConnectClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockWalletConnectClient
}

// MAGIC
export const createMagicMockInstance = (
  clientOptions?: ClientOptions,
  accounts: Array<Account> = []
): MagicAuthClient => {
  const mockMagicAuthClient = new MagicAuthClient({
    metadata: {
      id: PROVIDER_ID.MAGIC,
      name: 'Magic',
      icon: 'magic-icon-b64',
      isWalletConnect: false
    },
    client: new Magic('mock-api-key', {
      extensions: {
        algorand: new AlgorandExtension({
          rpcUrl: ''
        })
      }
    }),
    clientOptions: {
      apiKey: 'mock-api-key'
    },
    algosdk,
    algodClient: {
      accountInformation: () => ({
        do: () => Promise.resolve({})
      })
    } as any,
    network: 'test-network'
  })

  // Mock the connect method
  mockMagicAuthClient.connect = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...mockMagicAuthClient.metadata,
      accounts
    })
  )

  // Mock the disconnect method
  mockMagicAuthClient.disconnect = jest.fn().mockImplementation(() => Promise.resolve())

  return mockMagicAuthClient
}
