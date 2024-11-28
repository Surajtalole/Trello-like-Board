import React, { useState } from 'react';

const CardModal = ({ card, listId, onClose, updateCard }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const [status, setStatus] = useState(card.status || 'To-Do');

  const handleSave = () => {
    updateCard(listId, card.id, { title, description, dueDate, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg transform transition-all duration-300 scale-95 hover:scale-100 w-11/12 max-w-lg relative">
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      
        <div className="bg-gradient-to-r from-gray-800 to-indigo-600 p-6 rounded-t-xl text-center">
          <h2 className="text-2xl font-bold text-white">Edit Card</h2>
          <p className="text-sm text-gray-200 mt-2">Modify the details of your task below</p>
        </div>

   
        <div className="p-6 space-y-6">
      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter card title"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add more details"
              rows="4"
            ></textarea>
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
        </div>

      
        <div className="bg-gray-100 px-6 py-4 rounded-b-xl flex justify-end space-x-4">
         
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-gray-800 to-indigo-600 transition focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
