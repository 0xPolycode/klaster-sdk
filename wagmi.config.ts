import { defineConfig } from '@wagmi/cli'
const smartAccountAbi = require('./assets/abis/SmartAccount.json')

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'SmartAccount',
      abi: smartAccountAbi
    }
  ],
  plugins: [],
})