import React, { useState, useEffect } from 'react';
import './TaskCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function TaskCategory() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://localhost:7248/api/tarefa');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          alert('Erro ao buscar tarefas');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) return;

    const newTask = {
      nome: taskName,
      descricao: taskDescription,
      status: taskStatus,
    };

    try {
      const response = await fetch('https://localhost:7248/api/tarefa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        setTaskName('');
        setTaskDescription('');
        setTaskStatus(1); // Reset to default status
      } else {
        alert('Erro ao adicionar a tarefa');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskDescription = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleEditTask = async () => {
    if (!newTaskName.trim() || !newTaskDescription.trim() || editingTaskId === null) return;
  
    const updatedTask = {
      nome: newTaskName,
      descricao: newTaskDescription,
      status: newTaskStatus,
    };
  
    try {
      const response = await fetch(`https://localhost:7248/api/tarefa/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.ok) {
        const updatedTaskData = await response.json();
        setTasks(tasks.map(task => task.id === editingTaskId ? updatedTaskData : task));
        setEditingTaskId(editingTaskId);
        setNewTaskName('');
        setNewTaskDescription('');
        setNewTaskStatus(1);
      } else {
        alert('Erro ao editar a tarefa');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://localhost:7248/api/tarefa/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        alert('Erro ao excluir a tarefa');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  return (
    <div className="container">
  <h2>Adicionar Tarefa</h2>
  <form onSubmit={handleAddTask} className="form">
    <div>
      <label>Nome:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Descrição:</label>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Status:</label>
      <select
        value={taskStatus}
        onChange={(e) => setTaskStatus(parseInt(e.target.value))}
      >
        <option value={1}>A FAZER</option>
        <option value={2}>EM ANDAMENTO</option>
        <option value={3}>CONCLUÍDO</option>
      </select>
    </div>
    <button type="submit">Adicionar</button>
  </form>
  <div>
    <h3>Tarefas:</h3>
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div className="task-header">
            <div className="task-details">
              <span className="name">{task.nome}</span>
              <span className={`status ${getStatusColor(task.status)}`}>
                {task.status === 1 ? 'A FAZER' : task.status === 2 ? 'EM ANDAMENTO' : 'CONCLUÍDO'}
              </span>
            </div>
          </div>
          <div className="task-controls">
            <button onClick={() => toggleTaskDescription(task.id)} className="toggle-description">
              Mostrar Descrição
            </button>
            <div className="task-actions">
              <button onClick={() => setEditingTaskId(task.id)} className="edit-task">
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="delete-task">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          {expandedTask === task.id && (
            <div className="task-description">
              {task.descricao}
            </div>
          )}
          {editingTaskId === task.id && (
            <form onSubmit={() => handleEditTask(task.id)} className="edit-form">
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Descrição:</label>
                <input
                  type="text"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(parseInt(e.target.value))}
                >
                  <option value={1}>A FAZER</option>
                  <option value={2}>EM ANDAMENTO</option>
                  <option value={3}>CONCLUÍDO</option>
                </select>
              </div>
              <button type="submit">Salvar</button>
            </form>
          )}
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}

export default TaskCategory;
