import React, { useState } from 'react';
import List from './List';

const Board = ({ board, setBoard }) => {
  const [newListTitle, setNewListTitle] = useState('');


  const deleteList = (listId) => {
    const updatedBoard = board.filter((list) => list.id !== listId);
    setBoard(updatedBoard);
  };


  const addList = () => {
    if (newListTitle.trim()) {
      const newList = {
        id: Date.now(), 
        title: newListTitle, 
        cards: [], 
      };
      setBoard((prevBoard) => [...prevBoard, newList]); 
      setNewListTitle(''); 
    }
  };


  const moveCard = (fromListId, toListId, cardId) => {
    const updatedBoard = [...board];
    const fromList = updatedBoard.find((list) => list.id === fromListId);
    const toList = updatedBoard.find((list) => list.id === toListId);
    const card = fromList.cards.find((card) => card.id === cardId);

    
    fromList.cards = fromList.cards.filter((card) => card.id !== cardId);
    toList.cards.push(card);

    setBoard(updatedBoard); 
  };

  
  const moveList = (fromIndex, toIndex) => {
    const updatedBoard = [...board];
    const [movedList] = updatedBoard.splice(fromIndex, 1);
    updatedBoard.splice(toIndex, 0, movedList);
    setBoard(updatedBoard); 
  };

  return (
    <div className="board-area">
      <div className="flex overflow-x-auto space-x-4 p-4">
      
        {board.map((list, index) => (
          <List
            key={list.id}
            list={list}
            index={index}
            setBoard={setBoard}
            moveList={moveList}
            moveCard={moveCard}
            deleteList={deleteList}
          />
        ))}
        
        <div className="add-list bg-gray-100 border-dashed border-2 border-gray-300 p-4 w-60 flex-shrink-0">
          <input
            type="text"
            placeholder="Enter List Title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-2"
          />
          <button
            className="bg-gradient-to-r from-gray-800 to-indigo-600 hover:bg-gray-500 text-white py-2 px-4 w-full rounded"
            onClick={addList}
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
