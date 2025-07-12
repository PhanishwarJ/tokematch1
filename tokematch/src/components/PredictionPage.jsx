// File: src/pages/PredictionPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../context/WalletContextProvider';
import { getPredictions } from '../utils/predictionStore';
import useJupiterTokens from '../hooks/useJupiterTokens';

const PredictionPage = () => {
  const { connected, publicKey } = useContext(WalletContext);
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [side, setSide] = useState('YES');
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState('');

  const jupiterTokens = useJupiterTokens();

  useEffect(() => {
    setPredictions(getPredictions());
  }, []);

  const handleSubmit = () => {
    if (!connected || !publicKey) return alert('Connect your wallet');
    console.log('Prediction entry:', {
      user: publicKey,
      question: selectedPrediction,
      side,
      token,
      amount
    });
    alert('Prediction submitted (mock)');
  };

  return (
    <div className="p-6 text-lime-300 font-retro min-h-screen bg-black">
      <h1 className="text-2xl mb-6">🔮 Token Challenge</h1>
      {!connected && <p className="text-red-400">Please connect your wallet to participate.</p>}

      <div className="mb-4">
        <label className="block mb-1">Select Prediction</label>
        <select className="w-full p-2 text-black" onChange={e => setSelectedPrediction(e.target.value)}>
          <option value="">-- Select a question --</option>
          {predictions.map((q, i) => (
            <option key={i} value={q}>{q}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Choose Side</label>
        <div className="flex gap-4">
          <button onClick={() => setSide('YES')} className={`px-4 py-2 rounded ${side === 'YES' ? 'bg-green-600' : 'bg-gray-700'}`}>YES</button>
          <button onClick={() => setSide('NO')} className={`px-4 py-2 rounded ${side === 'NO' ? 'bg-red-600' : 'bg-gray-700'}`}>NO</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Token</label>
        <select className="w-full p-2 text-black" onChange={e => setToken(e.target.value)}>
          <option value="">-- Choose token --</option>
          {jupiterTokens.map((t) => (
            <option key={t.address} value={t.symbol}>{t.symbol}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Enter Amount</label>
        <input
          type="number"
          className="w-full p-2 text-black"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <button className="bg-blue-600 px-6 py-2 rounded" onClick={handleSubmit}>Submit Prediction</button>
    </div>
  );
};

export default PredictionPage;