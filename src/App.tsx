import React, { useState, useEffect } from 'react';
import ChessBoard from './components/ChessBoard';
import FileUpload from './components/FileUpload';
import GameList from './components/GameList';
import NavigationControls from './components/NavigationControls';
import { Chess } from 'chess.js';
import { parse as parsePgn } from 'pgn-parser';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [games, setGames] = useState<any[]>([]);
  const [currentPosition, setCurrentPosition] = useState(new Chess().fen());
  const [matchingGames, setMatchingGames] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [chess, setChess] = useState(new Chess());

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    setIsDarkMode(darkModePreference === null ? true : darkModePreference === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const parsedGames = parsePgn(content);
      setGames(parsedGames);
      setMatchingGames(parsedGames);
    };
    reader.readAsText(file);
  };

  const handlePositionChange = (fen: string) => {
    setCurrentPosition(fen);
    const matches = games.filter(game => {
      const tempChess = new Chess();
      game.moves.some((move: any) => {
        tempChess.move(move.move);
        return tempChess.fen().split(' ')[0] === fen.split(' ')[0];
      });
      return tempChess.fen().split(' ')[0] === fen.split(' ')[0];
    });
    setMatchingGames(matches);
  };

  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setCurrentMoveIndex(-1);
    const newChess = new Chess();
    setChess(newChess);
    setCurrentPosition(newChess.fen());
  };

  const handleNavigation = (action: string) => {
    if (!selectedGame) return;

    let newIndex = currentMoveIndex;
    const newChess = new Chess();

    switch (action) {
      case 'start':
        newIndex = -1;
        break;
      case 'back':
        if (newIndex > -1) {
          newIndex--;
        }
        break;
      case 'forward':
        if (newIndex < selectedGame.moves.length - 1) {
          newIndex++;
        }
        break;
      case 'end':
        newIndex = selectedGame.moves.length - 1;
        break;
    }

    // Apply moves up to the new index
    for (let i = 0; i <= newIndex; i++) {
      newChess.move(selectedGame.moves[i].move);
    }

    setCurrentMoveIndex(newIndex);
    setChess(newChess);
    setCurrentPosition(newChess.fen());
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-gray-100 text-black'} p-8 transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Chess Position Search</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <FileUpload onFileUpload={handleFileUpload} />
          <ChessBoard position={currentPosition} onPositionChange={handlePositionChange} isDarkMode={isDarkMode} />
          <NavigationControls onNavigate={handleNavigation} />
        </div>
        <div>
          <GameList games={matchingGames} onGameSelect={handleGameSelect} />
        </div>
      </div>
      {games.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">Total games loaded: {games.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;