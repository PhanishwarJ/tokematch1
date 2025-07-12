// src/components/PredictionAdminPanel.jsx
import React, { useState } from 'react';

const PredictionAdminPanel = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !deadline) return;
    onAdd({ question, deadline });
    setQuestion('');
    setDeadline('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-xl font-retro mb-4">🧠 Add a Prediction Challenge</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Prediction question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="p-2 bg-black text-lime-300 border border-lime-500 rounded"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 bg-black text-lime-300 border border-lime-500 rounded"
        />
        <button type="submit" className="bg-lime-500 text-black font-retro px-4 py-2 rounded hover:bg-lime-400">
          ➕ Add Prediction
        </button>
      </form>
    </div>
  );
};

export default PredictionAdminPanel;
