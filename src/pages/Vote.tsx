import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Lock } from 'lucide-react';
import { useVoting } from '../contexts/VotingContext';

const Vote: React.FC = () => {
  const { votingToken: contextToken, candidates, castVote, hasVoted } = useVoting();
  const navigate = useNavigate();
  
  const [token, setToken] = useState(contextToken || '');
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!token) {
        throw new Error('Please enter your voting token');
      }
      
      if (selectedCandidate === null) {
        throw new Error('Please select a candidate');
      }
      
      const result = await castVote(token, selectedCandidate);
      
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/results');
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Voting failed');
    } finally {
      setLoading(false);
    }
  };

  // If already voted, show success message
  if (hasVoted || success) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vote Cast Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your vote has been encrypted and recorded on the blockchain. It cannot be traced back to you.
        </p>
        <button
          onClick={() => navigate('/results')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          View Results
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Cast Your Vote</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-indigo-50 border-b border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-800">Secure and Anonymous Voting</h2>
          <p className="text-gray-600">
            Your vote will be encrypted and cannot be traced back to you.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Voting Token
            </label>
            <div className="relative">
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your voting token"
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select a Candidate
            </label>
            
            <div className="space-y-3">
              {candidates.map((candidate) => (
                <label
                  key={candidate.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCandidate === candidate.id
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="candidate"
                      value={candidate.id}
                      checked={selectedCandidate === candidate.id}
                      onChange={() => setSelectedCandidate(candidate.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-3 font-medium">{candidate.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Lock className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-800">Your vote is secure and private</h3>
                <p className="text-xs text-gray-600">
                  Your vote will be encrypted using homomorphic encryption and stored on the blockchain.
                  No one can see who you voted for, not even the system administrators.
                </p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !token || selectedCandidate === null}
            className={`w-full py-3 px-6 rounded-lg font-semibold ${
              loading || !token || selectedCandidate === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white transition-colors'
            }`}
          >
            {loading ? 'Processing...' : 'Cast My Vote'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;