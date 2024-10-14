import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface ChessBoardProps {
  position: string;
  onPositionChange: (fen: string) => void;
  isDarkMode: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ position, onPositionChange, isDarkMode }) => {
  const chess = new Chess(position);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to queen for simplicity
      });

      if (move === null) return false;
      onPositionChange(chess.fen());
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        boardWidth={400}
        customDarkSquareStyle={{ backgroundColor: isDarkMode ? '#779952' : '#b58863' }}
        customLightSquareStyle={{ backgroundColor: isDarkMode ? '#edeed1' : '#f0d9b5' }}
      />
    </div>
  );
};

export default ChessBoard;