const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    console.log("hi");
    const provider = new ethers.JsonRpcProvider(
        process.env.RPC_URL
    );
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );

    const abi = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.bin", "utf8");

    // Ensure the contract bytecode is properly hex-encoded
    const bytecode = "0x" + binary.trim(); // Add '0x' prefix

    // Use the correct chainId for the network you're using
    const chainId = await provider.getNetwork().then(network => network.chainId);

    const nonce = await provider.getTransactionCount(wallet.address);

    const gasPrice = ethers.parseUnits("2", "gwei"); // Convert to Wei
    const value = ethers.parseEther("0"); // Convert to Wei


    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying, please wait...');
    const contract = await contractFactory.deploy();
    await contract.deploymentTransaction().wait(1);
    

    // const tx = {
    //     nonce: nonce,
    //     gasPrice: gasPrice,
    //     gasLimit: 6721975,
    //     to: null,
    //     value: value,
    //     data: bytecode,
    //     chainId: chainId,
    // };
    
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // await sentTxResponse.wait(1);
    // console.log('sentTxResponse', sentTxResponse);

    const currentFavoriteNumber = await contract.retrieve();

    console.log('currentFavoriteNumber: ', currentFavoriteNumber.toString());
    const transactionReponse = await contract.store("7");
    const transactionReceipt = await transactionReponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log('updatedFavoriteNumber: ', updatedFavoriteNumber.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);   
        process.exit(1);
    });
