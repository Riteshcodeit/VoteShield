// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import { Camera, UserCheck, AlertCircle } from 'lucide-react';
// import { useVoting } from '../contexts/VotingContext';

// const Register: React.FC = () => {
//   const { registerVoter, isRegistered, votingToken } = useVoting();
//   const navigate = useNavigate();
//   const webcamRef = useRef<Webcam>(null);
  
//   const [name, setName] = useState('');
//   const [voterId, setVoterId] = useState('');
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [generatedToken, setGeneratedToken] = useState<string | null>(null);

//   const handleCapture = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setCapturedImage(imageSrc);
//       setShowCamera(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (!name || !voterId || !capturedImage) {
//         throw new Error('Please fill all fields and capture your photo');
//       }

//       // Call the registerVoter function from VotingContext.tsx
//       const token = await registerVoter(name, voterId, capturedImage);
//       setGeneratedToken(token); // Store token in state

//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/vote');
//       }, 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ If voter is already registered, show the "Registration Complete" screen
//   if (isRegistered && votingToken) {
//     return (
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
//         <div className="text-center mb-6">
//           <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//             <UserCheck className="h-8 w-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Registration Complete</h2>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
//           <p className="text-sm text-gray-600 mb-2">Your Voting Token:</p>
//           <p className="text-xl font-mono bg-white p-3 rounded border border-gray-300">{votingToken}</p>
//           <p className="text-sm text-red-600 mt-2">
//             Save this token! You'll need it to cast your vote.
//           </p>
//         </div>
        
//         <button
//           onClick={() => navigate('/vote')}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//         >
//           Proceed to Voting
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Voter Registration</h1>
      
//       {success ? (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//           <UserCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-green-800 mb-2">Registration Successful!</h2>
//           <p className="text-green-700 mb-4">
//             Your voting token has been generated. Redirecting to voting page...
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6 bg-indigo-50 border-b border-indigo-100">
//             <h2 className="text-xl font-semibold text-indigo-800">Step 1: Verify Your Identity</h2>
//             <p className="text-gray-600">
//               Please provide your information and take a photo for verification.
//             </p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="p-6">
//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <p className="text-red-700">{error}</p>
//               </div>
//             )}
            
//             <div className="mb-6">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
            
//             <div className="mb-6">
//               <label htmlFor="voterId" className="block text-sm font-medium text-gray-700 mb-1">
//                 Voter ID
//               </label>
//               <input
//                 type="text"
//                 id="voterId"
//                 value={voterId}
//                 onChange={(e) => setVoterId(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your voter ID number"
//                 required
//               />
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Face Verification
//               </label>
              
//               {showCamera ? (
//                 <div className="bg-gray-50 p-4 rounded-lg text-center">
//                   <Webcam
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={{ facingMode: "user" }}
//                     className="mx-auto rounded border border-gray-300 mb-4"
//                     height={300}
//                     width={400}
//                   />
//                   <button
//                     type="button"
//                     onClick={handleCapture}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Capture Photo
//                   </button>
//                 </div>
//               ) : capturedImage ? (
//                 <div className="bg-gray-50 p-4 rounded-lg text-center">
//                   <img src={capturedImage} alt="Captured" className="mx-auto rounded border border-gray-300 mb-4" />
//                   <button
//                     type="button"
//                     onClick={() => setShowCamera(true)}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Retake Photo
//                   </button>
//                 </div>
//               ) : (
//                 <button type="button" onClick={() => setShowCamera(true)}>
//                   <Camera className="h-5 w-5 mr-2" />
//                   Take Photo for Verification
//                 </button>
//               )}
//             </div>

//             <button type="submit" disabled={loading || !name || !voterId || !capturedImage}>
//               {loading ? 'Processing...' : 'Register to Vote'}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, UserCheck, AlertCircle, Loader } from 'lucide-react';
import { useVoting } from '../contexts/VotingContext';

const Register: React.FC = () => {
  const { registerVoter, isRegistered, votingToken, loading: contextLoading } = useVoting();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  
  const [name, setName] = useState('');
  const [voterId, setVoterId] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [saveTokenWarning, setSaveTokenWarning] = useState(false);

  // Check if user is already registered (e.g., on page refresh)
  useEffect(() => {
    if (isRegistered && votingToken) {
      setSaveTokenWarning(true);
    }
  }, [isRegistered, votingToken]);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setShowCamera(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!name || !voterId || !capturedImage) {
        throw new Error('Please fill all fields and capture your photo');
      }

      // Call the registerVoter function from VotingContext.tsx
      const token = await registerVoter(name, voterId, capturedImage);
      setGeneratedToken(token); // Store token in state
      setSaveTokenWarning(true);
      setSuccess(true);
      
      // Navigate after a delay so user can see their token
      setTimeout(() => {
        navigate('/vote');
      }, 5000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // If voter is already registered, show the "Registration Complete" screen
  if (isRegistered && votingToken) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Registration Complete</h2>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Your Voting Token:</p>
          <p className="text-xl font-mono bg-white p-3 rounded border border-gray-300 overflow-auto break-words">{votingToken}</p>
          <p className="text-sm text-red-600 mt-2 font-bold">
            IMPORTANT: Save this token! You'll need it to cast your vote.
          </p>
        </div>
        
        <button
          onClick={() => navigate('/vote')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Proceed to Voting
        </button>
      </div>
    );
  }

  // While context is still loading
  if (contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading registration system...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Voter Registration</h1>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <UserCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-800 mb-2">Registration Successful!</h2>
          <p className="text-green-700 mb-4">
            Your information has been securely stored.
          </p>
          
          <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
            <p className="text-sm text-gray-600 mb-2">Your Voting Token:</p>
            <p className="text-lg font-mono bg-gray-50 p-3 rounded border border-gray-300 overflow-auto break-words">{generatedToken}</p>
            <p className="text-sm text-red-600 mt-2 font-bold">
              IMPORTANT: Save this token! You'll need it to cast your vote.
            </p>
          </div>
          
          <p className="text-gray-600 text-sm">Redirecting to voting page in a few seconds...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-indigo-50 border-b border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-800">Step 1: Verify Your Identity</h2>
            <p className="text-gray-600">
              Please provide your information and take a photo for verification.
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="voterId" className="block text-sm font-medium text-gray-700 mb-1">
                Voter ID
              </label>
              <input
                type="text"
                id="voterId"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your voter ID number"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Face Verification
              </label>
              
              {showCamera ? (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "user" }}
                    className="mx-auto rounded border border-gray-300 mb-4"
                    height={300}
                    width={400}
                  />
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Capture Photo
                  </button>
                </div>
              ) : capturedImage ? (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <img src={capturedImage} alt="Captured" className="mx-auto rounded border border-gray-300 mb-4" height={300} width={400} />
                  <button
                    type="button"
                    onClick={() => setShowCamera(true)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Retake Photo
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setShowCamera(true)}
                  className="flex items-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo for Verification
                </button>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !name || !voterId || !capturedImage}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
                loading || !name || !voterId || !capturedImage
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </span>
              ) : (
                'Register to Vote'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;


