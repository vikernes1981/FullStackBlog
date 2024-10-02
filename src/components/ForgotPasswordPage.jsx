import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., API call)
    setMessage('If an account with that email exists, a password reset link has been sent.');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-400 to-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>

        {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
