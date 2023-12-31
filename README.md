# Setting up the Project

## 1). Installing the Project 

Open the directory where you want to install the repository and run **git clone https://github.com/bhavya20428/EverythingAboutProduct/**

## 2). Setting the repo 

Go to the installed repo and in the terminal **run npm install** and make sure that meta mask extension is installed in the browser

## 3). Running the Dapp

Go to the installed repo and in the terminal **run npm start**

# Bounties
## 1). To Infura and Beyond:

**• justification of endpoints:** <br/>

Infura Linea Testnet Endpoint has been used while creating and deploying it with Truffle  
Endpoint : https://linea-goerli.infura.io/v3/dc976cf7c22b451496c9719fef85af97


## 2). IYKYK Linea edition:
**• What the project is:** <br/>
We have developed a product that utilizes blockchain technology to store product reviews and generative AI to extract meaningful information from those reviews. This allows the customers to access helpful information about a product before making a purchase, helping them make informed decisions.

**• What it aims to accomplish:** <br/>
Customers find it difficult to get proper product reviews in offline stores instantly. They rely on the information provided by staff or need to search on the net manually. This is a bad user experience. Moreover, irrespective of the medium online or offline, they don't want to waste time reading hundreds of reviews and making some sense of it. Lastly, they also have trust issues regarding the authenticity of the reviews present on the product. Our solution aims to solve all these problems. 

**• Steps to run it locally:** <br/>

**• Link for deployed smart contract on blockscout:** <br/>
https://explorer.goerli.linea.build/address/0x0b0615a0b71a20126CEf157dE230bcE07001eF89

**• The Linea network configured in Truffle and HardHat:** <br/>
```
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    linea: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: '59140',
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
```

## 3). Make a Dapp That Slaps, No Cap: 
**• What the project is:** <br/>
We have developed a product that utilizes blockchain technology to store product reviews and generative AI to extract meaningful information from those reviews. This allows the customers to access helpful information about a product before making a purchase, helping them make informed decisions.

**• What it aims to accomplish:** <br/>
Customers find it difficult to get proper product reviews in offline stores instantly. They rely on the information provided by staff or need to search on the net manually. This is a bad user experience. Moreover, irrespective of the medium online or offline, they don't want to waste time reading hundreds of reviews and making some sense of it. Lastly, they also have trust issues regarding the authenticity of the reviews present on the product. Our solution aims to solve all these problems. 

**-> Proof of what Consensys products you used:** <br/>

Use of Solidity Visual Developer and Surya 
![image](https://github.com/bhavya20428/EverythingAboutProduct/assets/60835814/0a664e96-06fe-4835-97f7-0cddbf699ed4)

Legions: 
![image](https://github.com/bhavya20428/EverythingAboutProduct/assets/60835814/ebe907ae-ac09-4d8d-a1e5-5b3bd9622f26)

