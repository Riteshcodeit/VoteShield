import React, { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Lock } from 'lucide-react';
import { useVoting } from '../contexts/VotingContext';

const Results: React.FC = () => {
  const { getResults } = useVoting();
  
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getResults();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchResults();
  }, []);
  
  // Calculate total votes and percentages
  const totalVotes = results ? Object.values(results).reduce((sum, count) => sum + count, 0) : 0;
  
  // Find the winner
  const winner = results 
    ? Object.entries(results).reduce((max, [name, count]) => 
        count > (max.count || 0) ? { name, count } : max, 
        { name: '', count: 0 }
      ).name
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Election Results</h1>
        
        <button
          onClick={fetchResults}
          disabled={loading}
          className="flex items-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchResults}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <RefreshCw className="h-12 w-12 text-indigo-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading results...</p>
        </div>
      ) : results ? (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-indigo-800">Current Results</h2>
                <p className="text-gray-600">
                  Total Votes: <span className="font-semibold">{totalVotes}</span>
                </p>
              </div>
              
              {winner && (
                <div className="bg-green-100 py-1 px-3 rounded-full text-green-800 text-sm font-medium">
                  Current Leader: {winner}
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {Object.entries(results).map(([name, count]) => {
                  const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                  const isWinner = name === winner;
                  
                  return (
                    <div key={name}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="font-medium">{name}</span>
                          {isWinner && (
                            <span className="ml-2 bg-green-100 py-0.5 px-2 rounded-full text-green-800 text-xs">
                              Leading
                            </span>
                          )}
                        </div>
                        <div className="text-gray-700">
                          <span className="font-semibold">{count}</span> votes 
                          <span className="ml-2 text-sm">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isWinner ? 'bg-green-500' : 'bg-indigo-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex items-start">
              <Lock className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-indigo-800 mb-2">How are votes counted securely?</h3>
                <p className="text-gray-700 mb-3">
                  Our system uses homomorphic encryption to count votes without decrypting individual ballots.
                  This means:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Individual votes remain encrypted and private</li>
                  <li>Only the final tally is decrypted</li>
                  <li>No one can see who you voted for</li>
                  <li>Results are mathematically verifiable</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No results available</p>
        </div>
      )}
    </div>
  );
};

export default Results;