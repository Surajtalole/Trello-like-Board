import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from './Card';
import { TrashIcon } from '@heroicons/react/24/outline'; 
import CardModal from './CardModal';

const List = ({ list, index, setBoard, moveList, moveCard, deleteList }) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LIST',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'LIST',
    hover: (item) => {
      if (item.index !== index) {
        moveList(item.index, index);
        item.index = index;
      }
    },
  }));

  const addCard = () => {
    if (newCardTitle.trim()) {
      const newCard = { id: Date.now(), title: newCardTitle, description: '', dueDate: '' };
      setBoard((prevBoard) =>
        prevBoard.map((listItem) =>
          listItem.id === list.id ? { ...listItem, cards: [...listItem.cards, newCard] } : listItem
        )
      );
      setNewCardTitle('');
    }
  };

  const updateCard = (listId, cardId, updatedCard) => {
    setBoard((prevBoard) =>
      prevBoard.map((listItem) =>
        listItem.id === listId
          ? {
              ...listItem,
              cards: listItem.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCard } : card
              ),
            }
          : listItem
      )
    );
  };

  const deleteCard = (listId, cardId) => {
    setBoard((prevBoard) =>
      prevBoard.map((listItem) =>
        listItem.id === listId
          ? { ...listItem, cards: listItem.cards.filter((card) => card.id !== cardId) }
          : listItem
      )
    );
  };

  const openModal = (card) => {
    setSelectedCard(card); 
    setModalOpen(true);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="list bg-gray-200 rounded p-4 w-60 flex-shrink-0"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{list.title}</h2>
        <div className="flex space-x-2 items-center">
          
          <TrashIcon
            className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => deleteList(list.id)}
          />
        </div>
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="New Card Title"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-2"
        />
        <button
          className="bg-gradient-to-r from-gray-800 to-indigo-600 hover:bg-gray-500 text-white py-2 px-4 w-full rounded"
          onClick={addCard}
        >
          Add Card
        </button>
      </div>
      <div>
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            updateCard={updateCard}
            deleteCard={deleteCard}
            moveCard={moveCard} 
            openModal={() => openModal(card)} 
          />
        ))}
      </div>

     
      {isModalOpen && selectedCard && (
        <CardModal
          card={selectedCard}
          listId={list.id}
          onClose={() => setModalOpen(false)}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      )}
    </div>
  );
};

export default List;
