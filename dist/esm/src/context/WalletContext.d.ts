import React from 'react';
import type { SupportedProviders } from '../types/providers';
export declare const useWalletContext: () => SupportedProviders | null;
export interface WalletProviderProps {
    children: React.ReactNode;
    value: SupportedProviders | null;
}
export declare const WalletProvider: ({ children, value }: WalletProviderProps) => React.JSX.Element;
