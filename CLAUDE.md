# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **儒家复兴计划 (Confucian Revival Plan)** - a blockchain-based project combining "科学法律和儒学的融合，个人社会和宇宙的交响 (The fusion of scientific law and Confucianism, a symphony of individual society and universe)". It's a full-stack DApp built on the Juno blockchain featuring a CW20 token called NIUBI (Confucian V2).

## Development Commands

### Frontend (React + Vite)
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Backend (Express + CosmJS)
```bash
cd confucian-backend
pnpm install

# Start development server with nodemon
pnpm run dev

# Start production server
pnpm run start
```

### Smart Contract Deployment
```bash
# Deploy NIUBI token to Juno mainnet
node deploy-niubi-mainnet.js

# Query token information
node query_token.mjs
```

## Project Architecture

### Frontend Stack
- **React 19** with JSX for UI components
- **Vite** as build tool and dev server
- **TailwindCSS 4.x** for styling (with custom inline styles as fallback)
- **Lucide React** for icons
- **CosmJS** libraries for Cosmos blockchain interaction:
  - `@cosmjs/cosmwasm-stargate` - CosmWasm smart contract interaction
  - `@cosmjs/proto-signing` - Transaction signing
  - `@cosmjs/stargate` - Cosmos SDK interaction

### Backend Stack
- **Express.js** server with CORS support
- **CosmJS** for blockchain operations
- **dotenv** for environment configuration
- Memory-based claim tracking (should use database in production)

### Blockchain Integration
- **Network**: Juno mainnet (juno-1)
- **Token Standard**: CW20 (CosmWasm-20)
- **RPC Endpoint**: https://juno-rpc.polkachu.com
- **Contract Address**: `juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz`

## Key Features

### Wallet Connection
- Supports Leap and Keplr wallets
- Automatic wallet detection and connection
- Real-time balance queries from smart contract

### Token Operations
- Transfer NIUBI tokens between addresses
- Real-time balance checking
- Transaction history tracking
- Faucet system for free token distribution

### Faucet System
- 24-hour cooldown per address
- 100 NIUBI tokens per claim
- Backend validation and rate limiting
- Local storage for frontend cooldown tracking

## Configuration

### Environment Variables (Backend)
Create `confucian-backend/.env`:
```
ADMIN_MNEMONIC="your admin wallet mnemonic here"
CON_CONTRACT="juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz"
RPC_ENDPOINT="https://juno-rpc.polkachu.com"
FAUCET_AMOUNT="100000000"
COOLDOWN_HOURS="24"
PORT="3001"
```

### Frontend Configuration
Token configuration is in `src/main.jsx`:
```javascript
const CONFIG = {
  RPC_ENDPOINT: "https://juno-rpc.polkachu.com",
  CON_CONTRACT: "juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz",
  CHAIN_ID: "juno-1",
  GAS_PRICE: GasPrice.fromString("0.025ujuno"),
};
```

## Important File Structure

```
confucian-dapp/
├── src/
│   ├── main.jsx              # Main React app with wallet integration
│   └── index.css             # TailwindCSS styles
├── confucian-backend/
│   ├── server.js             # Express server with faucet API
│   └── package.json          # Backend dependencies
├── deploy-niubi-mainnet.js   # Smart contract deployment script
├── query_token.mjs           # Token information query script
├── cw20_base.wasm           # CW20 smart contract bytecode
├── package.json             # Frontend dependencies
└── index.html               # HTML entry point
```

## Development Workflow

### Running the Full Stack
1. Start backend server: `cd confucian-backend && pnpm run dev`
2. Start frontend dev server: `pnpm run dev`
3. Connect wallet and test features

### Testing Token Operations
1. Use `query_token.mjs` to check token info and balances
2. Test wallet connection and balance queries
3. Test faucet claims (24h cooldown applies)
4. Test token transfers between addresses

## Gas and Fee Configuration
- Standard gas price: 0.025ujuno for queries
- Higher gas price: 0.075ujuno for transactions
- Auto gas estimation for smart contract calls

## Token Details
- **Name**: Confucian V2
- **Symbol**: NIUBI
- **Decimals**: 6
- **Total Supply**: 1,000,000,000,000 NIUBI
- **Contract Standard**: CW20 (CosmWasm-20)

## Security Notes
- Never commit private keys or mnemonics to repository
- Use environment variables for sensitive configuration
- Validate all user inputs on both frontend and backend
- Implement proper error handling for blockchain operations

## Common Debugging Steps
1. Check wallet connection and network
2. Verify contract address and RPC endpoint
3. Ensure sufficient JUNO balance for gas fees
4. Check browser console for CosmJS errors
5. Verify backend server is running on port 3001