# DKeeper App

## ✨ Overview
The DKeeper App is a decentralized application (dApp) built using Motoko and the Internet Computer (IC) platform. It allows users to create, edit, and delete notes in a decentralized manner.

## ⚒️ Project Structure

### Backend
The backend is implemented in Motoko and handles the core logic of the application. It includes the following files:
- `dfx.json`: Configuration file for the DFINITY SDK.
- `package.json`: Contains dependencies and scripts for the backend.
- `tsconfig.json`: TypeScript configuration file.
- `src/dkeeperApp_backend/`: Contains the Motoko source code for the backend logic.

### Frontend
The frontend is implemented using modern web technologies and includes the following files:
- `index.html`: The main HTML file for the frontend.
- `package.json`: Contains dependencies and scripts for the frontend.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.js`: Configuration file for Vite.
- `public/styles.css`: Contains the styles for the application.
- `src/`: Contains the React components and other frontend logic.
  - `components/`: Includes React components such as `App.tsx`, `CreateArea.tsx`, `Footer.tsx`, and `Header.tsx`.

## 💫 Features
- Create notes with a title and content.
- Edit existing notes.
- Delete notes.
- Decentralized storage of notes on the Internet Computer.

## 💬 How to Run

### Prerequisites
- Install [DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) to run the backend.
- Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) for the frontend.

### Steps
1. Clone the repository.
2. Navigate to the `dkeeperApp` directory.
3. Start the backend:
   ```bash
   dfx start
   ```
4. Navigate to the `dkeeperApp_frontend` directory and install dependencies:
   ```bash
   npm install
   ```
5. Deploy the canisters:
   ```bash
   dfx deploy
   ```
6. Open the link provided in the terminal: (example below)
   ```bash
   URLs:
    Frontend canister via browser:
      dkeeperApp_frontend:
        - http://ulvla-h7777-77774-qaacq-cai.localhost:0000/ (Recommended)
        - http://127.0.0.1:0000/?canisterId=ulvla-h7777-77774-qaacq-cai (Legacy)
    Backend canister via Candid interface:
      dkeeperApp_backend: http://127.0.0.1:0000/?canisterId=abcd-ef123-45678-ghijk-lmn&id=abcde-ef123-45678-ghijk-lmn

## 📚 Reference
To find out more, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)
