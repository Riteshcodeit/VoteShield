import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">VoteShield</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/register" className="flex items-center hover:text-indigo-200 transition-colors">
                  <Vote className="h-5 w-5 mr-1" />
                  <span>Register</span>
                </Link>
              </li>
              <li>
                <Link to="/vote" className="flex items-center hover:text-indigo-200 transition-colors">
                  <Vote className="h-5 w-5 mr-1" />
                  <span>Vote</span>
                </Link>
              </li>
              <li>
                <Link to="/results" className="flex items-center hover:text-indigo-200 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-1" />
                  <span>Results</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;