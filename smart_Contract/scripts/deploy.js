const hre = require("hardhat");

async function main() {
  console.log("Deploying VoteShield contract...");

  const VoteShield = await hre.ethers.getContractFactory("VoteShield");
  const voteShield = await VoteShield.deploy();

  await voteShield.waitForDeployment();

  console.log(`✅ VoteShield contract deployed at: ${await voteShield.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
