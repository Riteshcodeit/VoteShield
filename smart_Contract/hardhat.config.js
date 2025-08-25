// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };



// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     holesky: {
//       url: "https://ethereum-holesky-rpc.publicnode.com",
//       accounts: "f0c7103ed7a90609060898b60be5855b07d6eeb5f3491bf1ca6ea02ceb0aad0b",
//       chainId: 17000,
//     },
//   },
// };




require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); 

module.exports = {
  solidity: "0.8.17",
  networks: {
    holesky: {
      url: process.env.HOLESKY_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY],
      chainId: 17000,
    },
  },
};

