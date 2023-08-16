const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
    console.log("hi");
    const provider = new ethers.JsonRpcProvider(
        "http://0.0.0.0:8545"
    );
    const wallet = new ethers.Wallet(
        "0x1e049a6503d352bfad84176e83f606eca280de9bf50c769d272e859954b589d1",
        provider
    );

    const abi = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.bin", "utf8");

    // Ensure the contract bytecode is properly hex-encoded
    const bytecode = "0x" + binary.trim(); // Add '0x' prefix

    // Use the correct chainId for the network you're using
    const chainId = await provider.getNetwork().then(network => network.chainId);

    const tx = {
        nonce: 5,
        gasPrice: 20000000000, // Use parseUnits to convert to Wei
        gasLimit: 6721975,
        to: null,
        value: 0,
        data: bytecode, // Use the properly hex-encoded bytecode here
        chainId: chainId, // Use the actual chainId of the network
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
