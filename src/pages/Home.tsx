import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, UserCheck, Vote } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
          Secure, Private, and Transparent Voting
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A blockchain-based voting system with face verification, anonymized voting, and homomorphic encryption.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Register to Vote
          </Link>
          <Link to="/vote" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition-colors">
            Cast Your Vote
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Registration</h3>
            <p className="text-gray-600">
              Register with your ID and face verification. Receive a unique anonymous voting token.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Vote className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Anonymous Voting</h3>
            <p className="text-gray-600">
              Use your token to vote anonymously. Your vote is encrypted and cannot be traced back to you.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Private Tallying</h3>
            <p className="text-gray-600">
              Votes are tallied using homomorphic encryption, allowing counting without decrypting individual votes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-indigo-50 rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-800">Why Blockchain Voting?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Immutable record of votes that cannot be tampered with</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Complete privacy through homomorphic encryption</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Transparent process with verifiable results</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Eliminates fraud and double-voting</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Blockchain Technology" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;