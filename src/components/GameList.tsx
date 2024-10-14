import React from 'react';

interface Game {
  headers: {
    White: string;
    Black: string;
    Event: string;
    Date: string;
  };
}

interface GameListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onGameSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {games.map((game, index) => (
          <li key={index}>
            <button
              onClick={() => onGameSelect(game)}
              className="block hover:bg-gray-50 dark:hover:bg-gray-600 w-full text-left"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                    {game.headers.White} vs {game.headers.Black}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      {game.headers.Event}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      {game.headers.Date}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;