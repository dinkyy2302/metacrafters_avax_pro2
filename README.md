
# Social Media Contract

A basic Ethereum smart contract for a social media application is included in this project. On the blockchain, users have the ability to write posts and profiles.
### Prerequisites

- Node.js (for package management)
- Remix IDE ( for contract development to get your abi and contract addresss )
- MetaMask (or other Ethereum wallet)

### Installing


### Compiling and Deploying the Contract

1. Compile the Solidity contract (`SocialMedia.sol`) using Remix IDE or your preferred development environment.Using inject metamask and you will get contract adddress as well abi .

2. Deploy the compiled contract to your preferred Ethereum network (local, testnet, or mainnet).

### Frontend

1. Make index.html and style.css file for the frontend purpose
2. And to make it interact with create script.js where you will add your deployed abi as well as contract address and refercence provider,signer and contract.

### Usage

1. Open `index.html` in your web browser.

2. Connect your MetaMask wallet to the appropriate Ethereum network.

3. Use the form to create a profile by entering your name and bio.

4. View existing posts displayed on the page.

### Example Code

Below is an example of how to interact with the contract using script.js


// Function to connect to the wallet


async function connectWallet()

{
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            alert('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet. Check the console for more details.');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.');
    }
}

// Add event listener to connect wallet button


document.getElementById('connectWalletButton').addEventListener('click', connectWallet);

### License

This project is licensed under the MIT License .

###  Author
 Dinky Khurana
