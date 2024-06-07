import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://taskmanager-mern-app-backend.onrender.com/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting task');
      }

      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='mt-2 flex flex-row justify-between w-full gap-[5vw] sm:gap-[15vw] items-center'>
      <p>{task.id}</p>
      <p>{task.name}</p>
      <button
        onClick={handleDelete}
        className='bg-red-400 p-2 rounded-xl border-white border-2'
      >
        Удалить
      </button>
    </div>
  );
};

export default TaskItem;
