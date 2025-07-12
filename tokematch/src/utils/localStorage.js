// utils/localStorage.js

export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem('watchlist')) || [];
};

export const addToWatchlist = (token) => {
  const watchlist = getWatchlist();
  const existing = watchlist.find(t => t.address === token.address);
  if (!existing) {
    watchlist.push(token);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
};

export const removeFromWatchlist = (address) => {
  const watchlist = getWatchlist().filter(t => t.address !== address);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

// ✅ Add Skipped Token Management
export const getSkipped = () => {
  return JSON.parse(localStorage.getItem('skipped')) || [];
};

export const addToSkipped = (token) => {
  const skipped = getSkipped();
  const existing = skipped.find(t => t.address === token.address);
  if (!existing) {
    skipped.push(token);
    localStorage.setItem('skipped', JSON.stringify(skipped));
  }
};
