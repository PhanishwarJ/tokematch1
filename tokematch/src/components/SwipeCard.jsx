import React from 'react';
import TinderCard from 'react-tinder-card';
import JupiterSwapButton from './JupiterSwapButton';

const SwipeCard = ({ token, onSwipe }) => {
  return (
    <TinderCard
      className="swipe"
      key={token.address || token.mint}
      onSwipe={(dir) => onSwipe(dir, token)}
    >
      <div className="bg-white shadow-xl p-4 rounded-lg w-72 h-[30rem] flex flex-col justify-between">
        <img src={token.logoURI || token.logo_uri} alt={token.symbol} className="w-24 h-24 mx-auto" />
        <h2 className="text-xl font-bold text-center">{token.symbol}</h2>
        <p className="text-center text-gray-500">{token.name}</p>
        <p className="text-center text-sm text-gray-600">
          Volume (24h): ${(token.daily_volume || 0).toLocaleString('en-US')}
        </p>
        <JupiterSwapButton token={token} />
      </div>
    </TinderCard>
  );
};


export default SwipeCard;
