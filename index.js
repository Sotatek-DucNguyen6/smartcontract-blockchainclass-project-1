const Web3 = require("web3");
require('dotenv').config();
const private_key = process.env.PRIVATE_KEY;//My test wallet: replace by your wallet infor if you want to use
const from_address = process.env.FROM_ADDRESS;//My test wallet: replace by your wallet infor if you want to use
const to_address = process.env.TO_ADDRESS;//My test wallet: replace by your wallet infor if you want to use
const provider_key = process.env.PROVIDER_KEY;

const provider = "https://rinkeby.infura.io/v3/"+provider_key;//replace by your infor if you want to use

(async () => {
  const web3 = new Web3(provider);

  const nonce = await web3.eth.getTransactionCount(from_address, "latest");

  const transaction = {
    to: to_address,
    value: 10000000000000,
    gas: 30000,
    maxFeePerGas: 2600000000,
    nonce: nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    private_key
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log("The hash of your transaction is: ", hash);
      } else {
        console.log(
          "Something went wrong while submitting your transaction:",
          error
        );
      }
    }
  );
})();
