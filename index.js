const Web3 = require("web3");
const private_key = 'cc2f844beb67482cd07fa8040c8dada8e2ee2922740ad7bb3d7d0311e71ef59e';//My test wallet: replace by your wallet infor if you want to use
const from_address = '0x15d9f9AdcD94E0392749FEc47eaEC7E60AD327e0';//My test wallet: replace by your wallet infor if you want to use
const to_address = '0xf29627a914CF17C50fC05c4D7A1Ac2cCa1f1dF40';//My test wallet: replace by your wallet infor if you want to use


const provider = "https://rinkeby.infura.io/v3/84581d9718b245a7980d0e379d4a3214";//replace by your infor if you want to use

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
