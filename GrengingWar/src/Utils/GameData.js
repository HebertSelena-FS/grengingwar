// GameProvider.js
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [clickedButton, setClickedButton] = useState({ row: 0, col: 0 });
  const [canMoveYellowDot, setCanMoveYellowDot] = useState(true);

  const toggleCanMoveYellowDot = () => {
    setCanMoveYellowDot(!canMoveYellowDot);
  };

  return (
    <GameContext.Provider
      value={{
        clickedButton,
        setClickedButton,
        canMoveYellowDot,
        toggleCanMoveYellowDot,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
