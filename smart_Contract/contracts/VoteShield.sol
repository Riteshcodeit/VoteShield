// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title VoteShield
 * @dev Stores encrypted votes. Encryption is handled by the backend.
 */
contract VoteShield {
    struct EncryptedVote {
        bytes encryptedData;  // The encrypted vote data
        uint256 timestamp;    // Timestamp of when the vote was submitted
    }

    EncryptedVote[] public votes; // Array storing encrypted votes

    event VoteStored(uint256 indexed voteId, bytes32 voteHash, uint256 timestamp);

    /**
     * @dev Stores an encrypted vote.
     * @param _encryptedVote The encrypted vote data (provided by backend).
     */
    function storeEncryptedVote(bytes calldata _encryptedVote) external {
        votes.push(EncryptedVote({encryptedData: _encryptedVote, timestamp: block.timestamp}));

        uint256 voteId = votes.length - 1;
        bytes32 voteHash = keccak256(_encryptedVote);

        emit VoteStored(voteId, voteHash, block.timestamp);
    }

    /**
     * @dev Returns the total number of votes stored.
     */
    function getTotalVotes() external view returns (uint256) {
        return votes.length;
    }

    /**
     * @dev Retrieves an encrypted vote by its index.
     * @param _index The index of the vote.
     * @return The encrypted vote data and its timestamp.
     */
    function getVote(uint256 _index) external view returns (bytes memory, uint256) {
        require(_index < votes.length, "Invalid index");
        return (votes[_index].encryptedData, votes[_index].timestamp);
    }
}
