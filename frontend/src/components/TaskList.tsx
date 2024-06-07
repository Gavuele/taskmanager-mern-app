// TaskList.tsx
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Form from './Form';

interface Task {
  id: string;
  name: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://taskmanager-mern-app-backend.onrender.com/api/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className='flex flex-col gap-2 w-dvh items-center'>
      <h1 className="text-[6vw]">Ваши задачи</h1>
      <Form onTaskAdded={handleTaskAdded} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={handleTaskDeleted} />
      ))}
    </div>
  );
};

export default TaskList;
