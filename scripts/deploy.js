// imports

// async main
async function main() { 
  // HTTP://127.0.0.1:7545
  console.log('hi');
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })