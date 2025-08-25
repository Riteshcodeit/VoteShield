import React from 'react';
import { Github, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">SecureVote</span>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>Blockchain-based voting system with homomorphic encryption</p>
            <p>© {new Date().getFullYear()} SecureVote. All rights reserved.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;