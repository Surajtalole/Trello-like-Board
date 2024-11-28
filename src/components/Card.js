import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; 

const Card = ({ card, listId, updateCard, deleteCard, moveCard, openModal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { cardId: card.id, fromListId: listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    hover: (item) => {
      if (item.fromListId !== listId) {
        moveCard(item.fromListId, listId, item.cardId); 
        item.fromListId = listId; 
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card bg-white rounded-lg p-4 mb-4 shadow-lg cursor-move transform transition duration-200 hover:scale-105 hover:shadow-xl ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
    
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">{card.title}</h3>
        <div className="flex space-x-2">
      
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            onClick={openModal}
          >
            <PencilIcon className="h-5 w-5 text-gray-800" />
          </button>

        
          <button
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            onClick={() => deleteCard(listId, card.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

    
      <p
        className="text-sm text-gray-600 mt-2 overflow-hidden text-ellipsis whitespace-pre-wrap break-words max-h-16"
        style={{ maxHeight: '4rem', overflowY: 'auto' }} 
      >
        {card.description}
      </p>
    </div>
  );
};

export default Card;
