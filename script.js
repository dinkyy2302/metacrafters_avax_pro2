// Replace with your deployed contract address
const contractAddress ='0x1542422b513C6E75e1bFb6F01e3bfe45b5B65019';

// ABI for SocialMedia contract
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                }
            ],
            "name": "Post_create",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bio",
                    "type": "string"
                }
            ],
            "name": "Profile_create",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "posts",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Posts_get",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "content",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct SocialMedia.Post[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "profiles",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bio",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

let provider;
let signer;
let contract;


async function connect() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);
            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}

async function createProfile() {
    const name = document.getElementById('profileName').value;
    const bio = document.getElementById('profileBio').value;

    try {
        // Send transaction to create profile
        const result = await contract.methods.Profile_create(name, bio).send({ from: ethereum.selectedAddress });
        
        // Log the transaction result
        console.log('Profile creation transaction result:', result);

        // Show success message to user
        alert('Profile created successfully!');
    } catch (error) {
        // Log and alert error message
        console.error('Error creating profile:', error);
        alert('Error creating profile. Check console for details.');
    }
}

// Function to create a new post
async function createPost() {
    const content = document.getElementById('postContent').value;

    try {
        // Assuming contract.Post_create() is an asynchronous function that interacts with your smart contract
        await contract.Post_create(content);
        alert('Post created successfully!');
        console.log('Post created successfully:', content);

        // Optional: Update UI or perform additional actions after post creation
        // Example: Fetch and display updated list of posts after post creation
        await fetchPosts();
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Check console for details.');
    }
}

// Function to fetch all posts
async function fetchPosts() {
    try {
        // Assuming contract.Posts_get() is an asynchronous function that fetches posts from your smart contract
        const posts = await contract.Posts_get();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Error fetching posts. Check console for details.');
    }
}

// Display posts on the UI
function displayPosts(posts) {
    const postsElement = document.getElementById('posts');
    postsElement.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('li');
        postElement.innerHTML = `<strong>Author:</strong> ${post.author}<br><strong>Content:</strong> ${post.content}<br><br>`;
        postsElement.appendChild(postElement);
    });
}
