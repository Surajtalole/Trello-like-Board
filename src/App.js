import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Board from './components/Board';
import { getSavedBoard, saveBoard } from './utils/localStorage';
import Footer from './components/Footer';
const initialBoard = [
  {
    id: 1,
    title: 'To-Do',
    cards: [],
  },
  {
    id: 2,
    title: 'Doing',
    cards: [],
  },
  {
    id: 3,
    title: 'Done',
    cards: [],
  },
];

const App = () => {
  const [board, setBoard] = useState(getSavedBoard() || initialBoard);

  
  const resetBoard = () => {
    setBoard(initialBoard); 
    saveBoard(initialBoard);
  };

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="bg-gradient-to-r from-gray-800 to-indigo-600       text-white p-4 flex justify-between items-center">
          <h1 className="text-xl">Trello-like Board</h1>
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={resetBoard}
          >
            Reset Board
          </button>
        </header>
        <Board board={board} setBoard={setBoard} />
        <Footer /> 
      </div>
    </DndProvider>
  );
};

export default App;
