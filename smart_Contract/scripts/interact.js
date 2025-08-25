const hre = require("hardhat");

async function main() {
    const contractAddress = "0x8E0712fe08f88eB6c95aAAAa7fCacE49A9991652"; // Replace with actual address
    const VoteShield = await hre.ethers.getContractFactory("VoteShield");
    const voteShield = await VoteShield.attach(contractAddress);

    console.log("🔹 Fetching total votes...");
    console.log("✅ Total votes stored:", await voteShield.getTotalVotes());

    console.log("🔹 Storing an encrypted vote...");
    const encryptedVote = "0xabcd1234567890"; // Sample encrypted vote (backend will provide real data)
    const tx = await voteShield.storeEncryptedVote(encryptedVote);
    await tx.wait();

    console.log("✅ Encrypted vote stored!");
    console.log("🔹 Fetching updated vote count...");
    console.log("✅ Total votes stored:", await voteShield.getTotalVotes());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
