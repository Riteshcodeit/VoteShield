import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VotingProvider } from './contexts/VotingContext';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register2';
import Vote from './pages/Vote';
import Results from './pages/Results';
import Footer from './components/Footer';

function App() {
  return (
    <VotingProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </VotingProvider>
  );
}

export default App;