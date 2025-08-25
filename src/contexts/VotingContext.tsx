// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { ethers } from 'ethers';

// // Mock contract ABI - this would be replaced with the actual ABI from your compiled contract
// const contractABI = [
//   "function registerVoter(string memory voterHash) public returns (string memory)",
//   "function castVote(string memory tokenHash, string memory encryptedVote) public returns (string memory)",
//   "function getTotalVotes() public view returns (string memory)"
// ];

// // Mock contract address - this would be replaced with your deployed contract address
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// interface VotingContextType {
//   isRegistered: boolean;
//   votingToken: string | null;
//   hasVoted: boolean;
//   candidates: { id: number; name: string }[];
//   registerVoter: (name: string, voterId: string, faceData: string) => Promise<string>;
//   castVote: (token: string, candidateId: number) => Promise<boolean>;
//   getResults: () => Promise<Record<string, number>>;
// }

// const VotingContext = createContext<VotingContextType | undefined>(undefined);

// export const useVoting = () => {
//   const context = useContext(VotingContext);
//   if (context === undefined) {
//     throw new Error('useVoting must be used within a VotingProvider');
//   }
//   return context;
// };

// interface VotingProviderProps {
//   children: ReactNode;
// }

// export const VotingProvider: React.FC<VotingProviderProps> = ({ children }) => {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [votingToken, setVotingToken] = useState<string | null>(null);
//   const [hasVoted, setHasVoted] = useState(false);
  
//   // Mock candidates
//   const candidates = [
//     { id: 1, name: "Candidate A" },
//     { id: 2, name: "Candidate B" },
//     { id: 3, name: "Candidate C" }
//   ];

//   // Mock blockchain connection
//   const getContract = async () => {
//     try {
//       // In a real implementation, this would connect to an actual Ethereum provider
//       console.log("Connecting to blockchain...");
      
//       // For demo purposes, we'll mock the contract functionality instead of trying to connect
//       // to a real blockchain, which would fail in this environment
//       return {
//         registerVoter: async (voterHash: string) => {
//           console.log("Mock contract: registerVoter called with", voterHash);
//           return "Voter registered successfully";
//         },
//         castVote: async (tokenHash: string, encryptedVote: string) => {
//           console.log("Mock contract: castVote called with", tokenHash, encryptedVote);
//           return "Vote cast successfully";
//         },
//         getTotalVotes: async () => {
//           console.log("Mock contract: getTotalVotes called");
//           return "Total votes: 99";
//         }
//       };
//     } catch (error) {
//       console.error("Error creating mock contract:", error);
//       throw new Error("Failed to create mock contract");
//     }
//   };

//   // Mock face verification
//   const verifyFace = async (faceData: string): Promise<boolean> => {
//     // In a real implementation, this would call a face verification API
//     console.log("Verifying face data:", faceData ? "Data provided" : "No data");
    
//     // For demo purposes, always return true
//     return true;
//   };

//   // Mock homomorphic encryption
//   const encryptVote = (vote: number): string => {
//     // In a real implementation, this would use a homomorphic encryption library
//     console.log("Encrypting vote:", vote);
    
//     // For demo purposes, just return a string representation
//     return `encrypted_${vote}_${Date.now()}`;
//   };

//   // Register voter
//   const registerVoter = async (name: string, voterId: string, faceData: string): Promise<string> => {
//     try {
//       // Verify face
//       const isVerified = await verifyFace(faceData);
//       if (!isVerified) {
//         throw new Error("Face verification failed");
//       }
      
//       // Generate a random token
//       const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
//       // Hash voter data for privacy
//       const voterHash = ethers.keccak256(ethers.toUtf8Bytes(`${name}-${voterId}-${token}`));
      
//       // Register on blockchain
//       const contract = await getContract();
//       await contract.registerVoter(voterHash);
      
//       // Update state
//       setIsRegistered(true);
//       setVotingToken(token);
      
//       return token;
//     } catch (error) {
//       console.error("Registration error:", error);
//       throw new Error("Registration failed. Please try again later.");
//     }
//   };

//   // Cast vote
//   const castVote = async (token: string, candidateId: number): Promise<boolean> => {
//     try {
//       if (!token) {
//         throw new Error("No voting token provided");
//       }
      
//       // Encrypt the vote using homomorphic encryption
//       const encryptedVote = encryptVote(candidateId);
      
//       // Hash the token for privacy
//       const tokenHash = ethers.keccak256(ethers.toUtf8Bytes(token));
      
//       // Send to blockchain
//       const contract = await getContract();
//       await contract.castVote(tokenHash, encryptedVote);
      
//       // Update state
//       setHasVoted(true);
      
//       return true;
//     } catch (error) {
//       console.error("Voting error:", error);
//       throw new Error("Voting failed. Please try again later.");
//     }
//   };

//   // Get results
//   const getResults = async (): Promise<Record<string, number>> => {
//     try {
//       // In a real implementation, this would decrypt the homomorphically encrypted results
//       const contract = await getContract();
//       await contract.getTotalVotes();
      
//       // For demo purposes, return mock results
//       return {
//         "Candidate A": 42,
//         "Candidate B": 36,
//         "Candidate C": 21
//       };
//     } catch (error) {
//       console.error("Results error:", error);
//       throw new Error("Failed to fetch results. Please try again later.");
//     }
//   };

//   const value = {
//     isRegistered,
//     votingToken,
//     hasVoted,
//     candidates,
//     registerVoter,
//     castVote,
//     getResults
//   };

//   return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
// };

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { BrowserProvider, Contract, ethers } from "ethers";
// import { createClient } from "@supabase/supabase-js";
// import seal from "node-seal"; // Corrected default import



// // Extend TypeScript to recognize MetaMask
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// // Connect to Supabase
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL as string,
//   import.meta.env.VITE_SUPABASE_ANON_KEY as string
// );

// // Smart contract details
// const contractABI = [
//   "function registerVoter(string memory voterHash) public returns (string memory)",
//   "function castVote(string memory tokenHash, string memory encryptedVote) public returns (string memory)",
//   "function getTotalVotes() public view returns (string memory)"
// ];
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// // Voting Context Interface
// interface VotingContextType {
//   isRegistered: boolean;
//   votingToken: string | null;
//   hasVoted: boolean;
//   candidates: { id: number; name: string }[];
//   loading: boolean;
//   registerVoter: (name: string, voterId: string, faceData: string) => Promise<string>;
//   castVote: (token: string, candidateId: number) => Promise<boolean>;
//   getResults: () => Promise<Record<string, number>>;
// }

// // Initialize SEAL encryption
// let sealContext: any = null;
// let publicKey: any = null;

// const initHomomorphicEncryption = async () => {
//   try {
//     const SEAL = await seal();
//     const schemeType = SEAL.SchemeType.bfv;
//     const polyModulusDegree = 4096;
//     const bitSizes = [36, 36, 37];
//     const bitSize = 20;

//     const encryptionParams = SEAL.EncryptionParameters(schemeType);
//     encryptionParams.setPolyModulusDegree(polyModulusDegree);
//     encryptionParams.setCoeffModulus(SEAL.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
//     encryptionParams.setPlainModulus(SEAL.PlainModulus.Batching(polyModulusDegree, bitSize));

//     sealContext = SEAL.Context(encryptionParams, true, SEAL.SecurityLevel.tc128);
//     const keyGenerator = SEAL.KeyGenerator(sealContext);
//     publicKey = keyGenerator.createPublicKey();

//     return true;
//   } catch (error) {
//     console.error("Failed to initialize encryption:", error);
//     return false;
//   }
// };

// // Create Voting Context
// const VotingContext = createContext<VotingContextType | undefined>(undefined);
// export const useVoting = () => {
//   const context = useContext(VotingContext);
//   if (!context) {
//     throw new Error("useVoting must be used within a VotingProvider");
//   }
//   return context;
// };

// export const VotingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [votingToken, setVotingToken] = useState<string | null>(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [candidates, setCandidates] = useState<{ id: number; name: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [encryptionReady, setEncryptionReady] = useState(false);

//   useEffect(() => {
//     initHomomorphicEncryption().then(setEncryptionReady);
//   }, []);

//   const getContract = async () => {
//     if (!window.ethereum) {
//       console.error("MetaMask not found. Install it.");
//       throw new Error("Ethereum provider not found. Install MetaMask.");
//     }

//     const provider = new BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     return new Contract(contractAddress, contractABI, signer);
//   };

//   // Encrypt vote (Fixing PlainText error)
//   const encryptVote = async (candidateId: number): Promise<string> => {
//     if (!sealContext || !publicKey) {
//       throw new Error("Homomorphic encryption not initialized");
//     }

//     try {
//       const SEAL = await seal();
//       const encoder = SEAL.BatchEncoder(sealContext);

//       const voteValue = Int32Array.from([candidateId]);
//       const plaintext = encoder.encode(voteValue);

//       if (!plaintext) {
//         throw new Error("Failed to encode plaintext.");
//       }

//       const encryptor = SEAL.Encryptor(sealContext, publicKey);
//       const ciphertext = encryptor.encrypt(plaintext);

//       if (!ciphertext) {
//         throw new Error("Encryption failed.");
//       }

//       return ciphertext.save();
//     } catch (error) {
//       console.error("Encryption error:", error);
//       throw new Error("Failed to encrypt vote.");
//     }
//   };

//   // Register voter
//   const registerVoter = async (name: string, voterId: string, faceData: string): Promise<string> => {
//     try {
//       setLoading(true);

//       // Generate voter hash
//       const voterHash = ethers.keccak256(ethers.toUtf8Bytes(`${name}-${voterId}`));

//       const contract = await getContract();
//       await contract.registerVoter(voterHash);

//       setIsRegistered(true);
//       setVotingToken(voterHash);
//       return voterHash;
//     } catch (error) {
//       console.error("Registration error:", error);
//       throw new Error("Registration failed. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cast vote
//   const castVote = async (token: string, candidateId: number): Promise<boolean> => {
//     try {
//       if (!token) throw new Error("No voting token provided");
//       if (!encryptionReady) throw new Error("Encryption system not ready");

//       const encryptedVote = await encryptVote(candidateId);
//       const tokenHash = ethers.keccak256(ethers.toUtf8Bytes(token));

//       const contract = await getContract();
//       await contract.castVote(tokenHash, encryptedVote);

//       setHasVoted(true);
//       return true;
//     } catch (error) {
//       console.error("Voting error:", error);
//       throw new Error("Voting failed. Please try again later.");
//     }
//   };

//   // Fetch candidates from Supabase
//   const getCandidates = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("candidates")
//         .select("id, name")
//         .order("name");

//       if (error) throw new Error(error.message);
//       setCandidates(data || []);
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//     }
//   };

//   // Get total votes
//   const getResults = async (): Promise<Record<string, number>> => {
//     try {
//       const contract = await getContract();
//       await contract.getTotalVotes();

//       return { "Candidate A": 42, "Candidate B": 36, "Candidate C": 21 };
//     } catch (error) {
//       console.error("Results error:", error);
//       throw new Error("Failed to fetch results. Please try again later.");
//     }
//   };

//   return (
//     <VotingContext.Provider
//       value={{
//         isRegistered,
//         votingToken,
//         hasVoted,
//         candidates,
//         loading,
//         registerVoter,
//         castVote,
//         getResults,
//       }}
//     >
//       {children}
//     </VotingContext.Provider>
//   );
// };

// export default VotingProvider;

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
import seal from "node-seal"; // Corrected default import
import VoteShield from "../../smart_Contract/artifacts/contracts/VoteShield.sol/VoteShield.json"; //today


// Extend TypeScript to recognize MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Connect to Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

// Smart contract details
const contractABI = VoteShield.abi;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Voting Context Interface
interface VotingContextType {
  isRegistered: boolean;
  votingToken: string | null;
  hasVoted: boolean;
  candidates: { id: number; name: string }[];
  loading: boolean;
  registerVoter: (name: string, voterId: string, faceData: string) => Promise<string>;
  castVote: (token: string, candidateId: number) => Promise<boolean>;
  getResults: () => Promise<Record<string, number>>;
}

// Initialize SEAL encryption
let sealContext: any = null;
let publicKey: any = null;

// At the top of your file
let SEAL: any = null;
let encryptor: any = null;
let encoder: any = null;

const initHomomorphicEncryption = async () => {
  try {
    const SEAL = await seal();
    const schemeType = SEAL.SchemeType.bfv;
    const polyModulusDegree = 4096;
    const bitSizes = [36, 36, 37];
    const bitSize = 20;

    const encryptionParams = SEAL.EncryptionParameters(schemeType);
    encryptionParams.setPolyModulusDegree(polyModulusDegree);
    encryptionParams.setCoeffModulus(SEAL.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
    encryptionParams.setPlainModulus(SEAL.PlainModulus.Batching(polyModulusDegree, bitSize));

    sealContext = SEAL.Context(encryptionParams, true, SEAL.SecurityLevel.tc128);
    
    // Create these once and reuse them
    const keyGenerator = SEAL.KeyGenerator(sealContext);
    publicKey = keyGenerator.createPublicKey();
    encryptor = SEAL.Encryptor(sealContext, publicKey);
    encoder = SEAL.BatchEncoder(sealContext);

    return true;
  } catch (error) {
    console.error("Failed to initialize encryption:", error);
    return false;
  }
};

// Create Voting Context
const VotingContext = createContext<VotingContextType | undefined>(undefined);
export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
};

export const VotingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [votingToken, setVotingToken] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [candidates, setCandidates] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [encryptionReady, setEncryptionReady] = useState(false);

  useEffect(() => {
    // Initialize encryption and fetch candidates on component mount
    const initializeApp = async () => {
      await initHomomorphicEncryption().then(setEncryptionReady);
      await getCandidates();
      setLoading(false);
    };
    
    initializeApp();
  }, []);

  const getContract = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not found. Install it.");
      throw new Error("Ethereum provider not found. Install MetaMask.");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(contractAddress, contractABI, signer);
  };

  // Encrypt vote (Fixing PlainText error)
  const encryptVote = async (candidateId: number): Promise<string> => {
    if (!sealContext || !publicKey) {
      throw new Error("Homomorphic encryption not initialized");
    }

    try {
      const voteValue = Int32Array.from([candidateId]);
      const plaintext = encoder.encode(voteValue);
  
      if (!plaintext) {
        throw new Error("Failed to encode plaintext.");
      }
  
      const ciphertext = encryptor.encrypt(plaintext);
  
      if (!ciphertext) {
        throw new Error("Encryption failed.");
      }
  
      return ciphertext.save();
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt vote.");
    }
  };

  // Register voter
  const registerVoter = async (name: string, voterId: string, faceData: string): Promise<string> => {
    try {
      setLoading(true);

      // Generate voter hash
      const voterHash = ethers.keccak256(ethers.toUtf8Bytes(`${name}-${voterId}`));

      // Register on blockchain
      const contract = await getContract();
      await contract.registerVoter(voterHash);

      // Store voter information in Supabase
      const { error } = await supabase.from("voters").insert([
        {
          name: name,
          voter_id: voterId,
          token_hash: voterHash,
          has_voted: false,
          // Store face data hash instead of actual face data for privacy
          face_data: ethers.keccak256(ethers.toUtf8Bytes(faceData))
        }
      ]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Database registration failed: " + error.message);
      }

      setIsRegistered(true);
      setVotingToken(voterHash);
      return voterHash;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Cast vote
  const castVote = async (token: string, candidateId: number): Promise<boolean> => {
    try {
      if (!token) throw new Error("No voting token provided");
      if (!encryptionReady) throw new Error("Encryption system not ready");

      const encryptedVote = await encryptVote(candidateId);
      const tokenHash = ethers.keccak256(ethers.toUtf8Bytes(token));

      const contract = await getContract();
      await contract.castVote(tokenHash, encryptedVote);

      const receiptData = `${token}-${Date.now()}`;
      const receiptHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(receiptData));
      const receiptId = btoa(String.fromCharCode(...new Uint8Array(receiptHash))).substring(0, 16);

      const { error } = await supabase
        .from("votes")
        .insert([{ token_hash: token, voter_id: candidateId, encrypted_vote: encryptedVote, receipt_id: receiptId }]);

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error("Failed to store vote: " + error.message);
      }

      setHasVoted(true);
      return true;
    } catch (error) {
      console.error("Voting error:", error);
      throw new Error("Voting failed. Please try again later.");
    }
  };

  // Fetch candidates from Supabase
  const getCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from("candidates")
        .select("id, name")
        .order("name");

      if (error) throw new Error(error.message);
      setCandidates(data || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Get total votes
// Get election results
const getResults = async (): Promise<Record<string, number>> => {
  try {
    setLoading(true);
    
    // Get total votes from blockchain
    const contract = await getContract();
    const totalVotesFromChain = await contract.getTotalVotes();
    console.log(`Total votes on blockchain: ${totalVotesFromChain}`);
    
    // Fetch vote data from Supabase for counting
    const { data: votesData, error: votesError } = await supabase
      .from('votes')
      .select('voter_id');
      
    if (votesError) throw new Error(votesError.message);
    
    // Get candidates for the results mapping
    const { data: candidatesData, error: candidatesError } = await supabase
      .from('candidates')
      .select('id, name');
      
    if (candidatesError) throw new Error(candidatesError.message);
    
    // Initialize results for all candidates with zero votes
    const results: Record<string, number> = {};
    candidatesData.forEach((candidate: { id: string, name: string }) => {
      results[candidate.name] = 0;
    });
    
    // Count votes per candidate
    votesData.forEach((vote: { voter_id: string }) => {
          const candidate = candidatesData.find((c: { id: string }) => c.id === vote.voter_id);
          if (candidate) {
            results[candidate.name] += 1;
          }
        });
    
    console.log("Election Results:", results);
    
    return results;
  } catch (error) {
    console.error('Results error:', error);
    throw new Error('Failed to fetch results. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  return (
    <VotingContext.Provider
      value={{
        isRegistered,
        votingToken,
        hasVoted,
        candidates,
        loading,
        registerVoter,
        castVote,
        getResults,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default VotingProvider;