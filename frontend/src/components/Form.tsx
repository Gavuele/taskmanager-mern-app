import React, { useState } from 'react';

const Form = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskName) return;

    const newTask = { name: taskName };

    try {
      const response = await fetch('http://localhost:5000/api/tasks/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Error creating task');
      }

      const createdTask = await response.json();
      onTaskAdded(createdTask);
      setTaskName('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4 text-black">
        <input
          type="text"
          placeholder="Введите задачу"
          name="name"
          className="h-16 text-2xl border-2 hover:border-sky-600 border-sky-300 w-[35vw] sm:w-[30vw]"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white border-2 flex justify-center h-16 sm:text-[2vw] items-center text-[3vw] w-[20vw] sm:w-[15vw] border-gray-100 hover:border-sky-300 hover:bg-gray-100 p-4"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default Form;
