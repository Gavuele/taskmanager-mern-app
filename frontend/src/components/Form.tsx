// Form.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormProps {
  onTaskAdded: (task: Task) => void;
}

interface Task {
  id?: string;
  name: string;
}

const Form: React.FC<FormProps> = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!taskName) return;

    const newTask: Task = { name: taskName };

    try {
      const response = await fetch('https://taskmanager-mern-app-backend.onrender.com/api/tasks/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Error creating task');
      }

      const createdTask: Task = await response.json();
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
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
