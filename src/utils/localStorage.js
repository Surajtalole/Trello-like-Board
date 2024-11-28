export const getSavedBoard = () => {
  const savedBoard = localStorage.getItem('board');
  return savedBoard ? JSON.parse(savedBoard) : null; 
};

export const saveBoard = (board) => {
  localStorage.setItem('board', JSON.stringify(board)); 
};
