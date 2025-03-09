// src/lib/wagmiConfig.ts
import { http, createConfig } from 'wagmi'
import { injected } from '@wagmi/connectors'
import { coreTestnet2 } from './coreTestnet'

export const config = createConfig({
  chains: [coreTestnet2],
  connectors: [injected()],
  transports: {
    [coreTestnet2.id]: http(),
  },
  ssr: false, // optional for client-side apps
})
