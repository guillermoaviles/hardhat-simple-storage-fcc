const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
    console.log("hi");
    const provider = new ethers.JsonRpcProvider(
        "http://0.0.0.0:8545"
    );
    const wallet = new ethers.Wallet(
        "0x96ec55b6d24294f77600656ae8b52e6ecebd88c159907ee4d39121ea4c9ec74d",
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

    const tx = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: 6721975,
        to: null,
        value: value,
        data: bytecode,
        chainId: chainId,
    };
    
    const sentTxResponse = await wallet.sendTransaction(tx);
    await sentTxResponse.wait(1);
    console.log('sentTxResponse', sentTxResponse);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
