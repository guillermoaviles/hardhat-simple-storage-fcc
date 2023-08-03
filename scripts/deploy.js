const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
    console.log("hi");
    const provider = new ethers.JsonRpcProvider(
        "http://0.0.0.0:8545"
    );
    const wallet = new ethers.Wallet(
        "0xaeac1fd23966834d51a825fc6c17279595728211b57e9e8875cbaac6fa1201f8",
        provider
    );

    const abi = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./contracts_SimpleStorage_sol_SimpleStorage.bin", "utf8");

    // ContractFactory
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet); 

    console.log('Deploying, please wait...');
    const contract = await contractFactory.deploy();
    console.log(contract);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
